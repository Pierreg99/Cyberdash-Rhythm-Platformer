/**
 * CYBER DASH // GOOGLE DRIVE AUTOMATED SYNC
 * Authorizes using Google OAuth 2.0 Installed App flow, creates the 'cyber dash' folder,
 * and uploads/syncs all project files recursively to Google Drive.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname);
const CREDENTIALS_PATH = path.join(PROJECT_ROOT, 'credentials.json');
const TOKEN_PATH = path.join(PROJECT_ROOT, 'token.json');
const AUTH_PORT = 8090;
const REDIRECT_URI = `http://localhost:${AUTH_PORT}`;
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

function loadCredentials() {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        throw new Error(`Credentials file not found at: ${CREDENTIALS_PATH}`);
    }
    const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    return raw.installed || raw.web;
}

function httpsRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                let parsed = null;
                try {
                    parsed = JSON.parse(data);
                } catch (e) {
                    parsed = data;
                }
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve({ statusCode: res.statusCode, data: parsed });
                } else {
                    reject({ statusCode: res.statusCode, error: parsed });
                }
            });
        });
        req.on('error', reject);
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

function exchangeCodeForTokens(creds, code) {
    const postData = new URLSearchParams({
        code: code,
        client_id: creds.client_id,
        client_secret: creds.client_secret,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
    }).toString();

    const options = {
        hostname: 'oauth2.googleapis.com',
        path: '/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return httpsRequest(options, postData).then(res => res.data);
}

function refreshAccessToken(creds, refreshToken) {
    const postData = new URLSearchParams({
        client_id: creds.client_id,
        client_secret: creds.client_secret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
    }).toString();

    const options = {
        hostname: 'oauth2.googleapis.com',
        path: '/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return httpsRequest(options, postData).then(res => res.data);
}

async function getAccessToken(creds) {
    if (fs.existsSync(TOKEN_PATH)) {
        const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
        if (tokens.access_token) {
            // Test token or refresh if refresh_token available
            if (tokens.refresh_token) {
                try {
                    const refreshed = await refreshAccessToken(creds, tokens.refresh_token);
                    const updated = { ...tokens, ...refreshed };
                    fs.writeFileSync(TOKEN_PATH, JSON.stringify(updated, null, 2));
                    return updated.access_token;
                } catch (e) {
                    console.log('Token refresh failed, re-authenticating...');
                }
            } else {
                return tokens.access_token;
            }
        }
    }

    return new Promise((resolve, reject) => {
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${encodeURIComponent(creds.client_id)}` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&response_type=code` +
            `&scope=${encodeURIComponent(SCOPES)}` +
            `&access_type=offline` +
            `&prompt=consent`;

        console.log('\n=============================================================');
        console.log('GOOGLE OAUTH 2.0 AUTHORIZATION REQUIRED');
        console.log('Opening browser for Google authorization...');
        console.log('If browser did not open automatically, visit this URL:\n');
        console.log(authUrl);
        console.log('=============================================================\n');

        // Automatically open URL in default browser using PowerShell
        exec(`powershell.exe -NoProfile -Command "Start-Process '${authUrl}'"`, () => {});

        const server = http.createServer(async (req, res) => {
            const reqUrl = new URL(req.url, `http://localhost:${AUTH_PORT}`);
            const code = reqUrl.searchParams.get('code');
            const error = reqUrl.searchParams.get('error');

            if (code) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head><title>Cyber Dash // Google OAuth Authorized</title></head>
                    <body style="background:#050508; color:#00f0ff; font-family:sans-serif; text-align:center; padding-top:80px;">
                        <h1 style="font-size:36px; text-shadow:0 0 20px #00f0ff;">CYBER DASH // AUTH SUCCESSFUL</h1>
                        <p style="color:#ffd700; font-size:18px;">Google Drive connected. Uploading files to folder 'cyber dash'...</p>
                        <p style="color:#888;">You can close this tab and return to your terminal.</p>
                    </body>
                    </html>
                `);

                server.close();

                try {
                    const tokenData = await exchangeCodeForTokens(creds, code);
                    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2));
                    console.log('Authentication successful! Token saved to token.json.');
                    resolve(tokenData.access_token);
                } catch (err) {
                    reject(err);
                }
            } else if (error) {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end(`<h1>Authorization Error: ${error}</h1>`);
                server.close();
                reject(new Error(`OAuth Error: ${error}`));
            }
        });

        server.listen(AUTH_PORT, () => {
            console.log(`OAuth callback server listening on http://localhost:${AUTH_PORT}`);
        });
    });
}

// -------------------------------------------------------------
// GOOGLE DRIVE API OPERATIONS
// -------------------------------------------------------------

async function findOrCreateFolder(token, folderName, parentId = null) {
    let query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
    if (parentId) {
        query += ` and '${parentId}' in parents`;
    }

    const searchUrl = `/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`;
    const options = {
        hostname: 'www.googleapis.com',
        path: searchUrl,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await httpsRequest(options);
    if (res.data.files && res.data.files.length > 0) {
        console.log(`Found existing folder '${folderName}' (ID: ${res.data.files[0].id})`);
        return res.data.files[0].id;
    }

    // Create folder
    const meta = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
    };
    if (parentId) meta.parents = [parentId];

    const postData = JSON.stringify(meta);
    const createOptions = {
        hostname: 'www.googleapis.com',
        path: '/drive/v3/files',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const createRes = await httpsRequest(createOptions, postData);
    console.log(`Created new Google Drive folder '${folderName}' (ID: ${createRes.data.id})`);
    return createRes.data.id;
}

async function uploadFile(token, localFilePath, parentFolderId) {
    const fileName = path.basename(localFilePath);
    const fileContent = fs.readFileSync(localFilePath);
    const ext = path.extname(localFilePath).toLowerCase();

    let mimeType = 'text/plain';
    if (ext === '.html') mimeType = 'text/html';
    else if (ext === '.css') mimeType = 'text/css';
    else if (ext === '.js') mimeType = 'application/javascript';
    else if (ext === '.json') mimeType = 'application/json';
    else if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.svg') mimeType = 'image/svg+xml';

    const boundary = '-------CyberDashBoundary' + Date.now();
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const metadata = {
        name: fileName,
        parents: [parentFolderId]
    };

    const multipartBody = Buffer.concat([
        Buffer.from(delimiter + 'Content-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(metadata)),
        Buffer.from(delimiter + `Content-Type: ${mimeType}\r\n\r\n`),
        fileContent,
        Buffer.from(closeDelimiter)
    ]);

    const options = {
        hostname: 'www.googleapis.com',
        path: '/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `multipart/related; boundary=${boundary}`,
            'Content-Length': multipartBody.length
        }
    };

    const res = await httpsRequest(options, multipartBody);
    console.log(`  ✓ Uploaded: ${fileName} (${fileContent.length} bytes) -> File ID: ${res.data.id}`);
    return res.data;
}

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    const ignoreList = ['node_modules', '.git', 'credentials.json', 'token.json', 'gdrive_upload.js'];

    files.forEach(file => {
        if (ignoreList.includes(file)) return;
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });
    return arrayOfFiles;
}

async function syncAllToGoogleDrive() {
    try {
        console.log('1. Initializing Google OAuth credentials...');
        const creds = loadCredentials();
        const token = await getAccessToken(creds);

        console.log('\n2. Accessing / Creating Google Drive Root Folder "cyber dash"...');
        const rootFolderId = await findOrCreateFolder(token, 'cyber dash');

        console.log('\n3. Scanning workspace files...');
        const filesToUpload = getAllFiles(PROJECT_ROOT);
        console.log(`Found ${filesToUpload.length} files to push:\n`);

        const folderCache = { '': rootFolderId };

        for (const fullPath of filesToUpload) {
            const relPath = path.relative(PROJECT_ROOT, fullPath);
            const relDir = path.dirname(relPath);

            // Determine target parent folder ID
            let targetParentId = rootFolderId;
            if (relDir !== '.' && relDir !== '') {
                const parts = relDir.split(path.sep);
                let currentPath = '';
                let currentParent = rootFolderId;

                for (const part of parts) {
                    currentPath = currentPath ? `${currentPath}/${part}` : part;
                    if (!folderCache[currentPath]) {
                        const folderId = await findOrCreateFolder(token, part, currentParent);
                        folderCache[currentPath] = folderId;
                    }
                    currentParent = folderCache[currentPath];
                }
                targetParentId = currentParent;
            }

            await uploadFile(token, fullPath, targetParentId);
        }

        console.log('\n=============================================================');
        console.log('CYBER DASH SUCCESSFULLY PUSHED TO GOOGLE DRIVE!');
        console.log(`Google Drive Folder URL: https://drive.google.com/drive/folders/${rootFolderId}`);
        console.log('=============================================================');

    } catch (err) {
        console.error('Error during Google Drive sync:', err);
    }
}

syncAllToGoogleDrive();
