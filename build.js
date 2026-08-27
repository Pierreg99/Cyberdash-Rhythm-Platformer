import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname);
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([\{\}\:\;\,])\s*/g, '$1')
        .replace(/;\}/g, '}')
        .trim();
}

function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^\:])\/\/[^\n]*/g, '$1')
        .replace(/^\s+/gm, '')
        .replace(/\n+/g, '\n')
        .trim();
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyDirRecursive(src, dest) {
    ensureDir(dest);
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            const ext = path.extname(entry.name).toLowerCase();
            let content = fs.readFileSync(srcPath, 'utf8');

            if (ext === '.css') content = minifyCSS(content);
            else if (ext === '.js') content = minifyJS(content);

            fs.writeFileSync(destPath, content);
        }
    }
}

function build() {
    console.log('====================================================');
    console.log('CYBER DASH // RUNNING PRODUCTION OPTIMIZATION BUILD');
    console.log('====================================================\n');

    ensureDir(DIST_DIR);

    // 1. Copy & minify CSS
    console.log('⚡ Optimizing CSS styles...');
    copyDirRecursive(path.join(ROOT_DIR, 'css'), path.join(DIST_DIR, 'css'));

    // 2. Copy & minify JavaScript modules
    console.log('⚡ Optimizing JS modules (Engine, Audio, Levels, UI)...');
    copyDirRecursive(path.join(ROOT_DIR, 'js'), path.join(DIST_DIR, 'js'));

    // 3. Process index.html
    console.log('⚡ Optimizing HTML layout & metadata...');
    let html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);

    // 4. Create standalone server & package for dist
    console.log('⚡ Generating production distribution artifacts...');
    const serverScript = fs.readFileSync(path.join(ROOT_DIR, 'server.js'), 'utf8');
    fs.writeFileSync(path.join(DIST_DIR, 'server.js'), serverScript);

    const distPackage = {
        name: 'cyber-dash-dist',
        version: '10.0.0',
        private: true,
        scripts: {
            start: 'node server.js'
        }
    };
    fs.writeFileSync(path.join(DIST_DIR, 'package.json'), JSON.stringify(distPackage, null, 2));

    console.log('\n✓ BUILD SUCCESSFUL: Production bundle ready in dist/');
    console.log('====================================================\n');
}

build();
