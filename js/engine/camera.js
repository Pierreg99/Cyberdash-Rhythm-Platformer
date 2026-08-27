/**
 * CYBER DASH // CAMERA & PARALLAX BACKGROUND SYSTEM
 * Handles smooth player tracking, screen shake, multi-layered parallax stars,
 * perspective grid rendering, and audio-reactive horizon glows.
 */

export class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.shakeTime = 0;
        this.shakeIntensity = 0;
        this.shakeX = 0;
        this.shakeY = 0;
        this.stars = [];
        this.buildings = [];
        this.width = 0;
        this.height = 0;
        this.groundY = 0;
    }

    init(width, height, groundY) {
        this.width = width;
        this.height = height;
        this.groundY = groundY;

        // Generate Parallax Starfield
        this.stars = [];
        for (let i = 0; i < 120; i++) {
            this.stars.push({
                x: Math.random() * width,
                y: Math.random() * groundY * 0.9,
                size: Math.random() * 2.2 + 0.8,
                parallax: Math.random() * 0.5 + 0.08,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }

        // Generate Cyber City Skyline Silhouettes
        this.buildings = [];
        let currX = 0;
        while (currX < width * 2) {
            const bWidth = Math.random() * 80 + 40;
            const bHeight = Math.random() * (groundY * 0.45) + 40;
            this.buildings.push({
                x: currX,
                width: bWidth,
                height: bHeight,
                parallax: 0.15,
                windows: Math.random() > 0.3
            });
            currX += bWidth + Math.random() * 20;
        }
    }

    shake(intensity = 15, durationMs = 250) {
        this.shakeIntensity = intensity;
        this.shakeTime = durationMs;
    }

    update(playerX, deltaMs = 16) {
        // Smooth Lerp Camera
        this.targetX = Math.max(0, playerX - this.width * 0.28);
        this.x += (this.targetX - this.x) * 0.12;

        // Screen Shake
        if (this.shakeTime > 0) {
            this.shakeTime -= deltaMs;
            const damp = this.shakeTime / 250;
            this.shakeX = (Math.random() * 2 - 1) * this.shakeIntensity * damp;
            this.shakeY = (Math.random() * 2 - 1) * this.shakeIntensity * damp;
        } else {
            this.shakeX = 0;
            this.shakeY = 0;
        }
    }

    drawBackground(ctx, activeLevel, audioPulse = 0) {
        ctx.save();
        ctx.translate(this.shakeX, this.shakeY);

        const isCryo = activeLevel.tier === 'CRYO';
        const now = Date.now() * 0.002;

        // 1. Deep Space Horizon Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, this.groundY);
        bgGrad.addColorStop(0, activeLevel.bg || '#050510');
        if (isCryo) {
            bgGrad.addColorStop(0.5, '#020d18');
            bgGrad.addColorStop(1, '#010810');
        } else {
            bgGrad.addColorStop(1, '#050508');
        }
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, this.width, this.height);

        // CRYO: Atmospheric ice mist layers
        if (isCryo) {
            for (let m = 0; m < 3; m++) {
                const mistY = this.groundY * (0.3 + m * 0.25);
                const mistGrad = ctx.createLinearGradient(0, mistY - 30, 0, mistY + 30);
                mistGrad.addColorStop(0, 'rgba(0, 212, 255, 0)');
                mistGrad.addColorStop(0.5, `rgba(0, 180, 220, ${0.04 + m * 0.015})`);
                mistGrad.addColorStop(1, 'rgba(0, 212, 255, 0)');
                ctx.fillStyle = mistGrad;
                ctx.fillRect(0, mistY - 30, this.width, 60);
            }
        }

        // 2. Parallax Stars (with twinkle)
        for (let s of this.stars) {
            let sx = (s.x - (this.x * s.parallax)) % this.width;
            if (sx < 0) sx += this.width;
            const twinkle = 0.5 + 0.5 * Math.sin(now * 2.5 + s.pulseOffset);
            const starAlpha = Math.max(0.05, s.parallax * (0.6 + 0.4 * twinkle) + audioPulse * 0.2);
            ctx.globalAlpha = starAlpha;
            // CRYO stars have an icy blue tint
            ctx.fillStyle = isCryo ? `rgba(${160 + Math.floor(twinkle * 80)}, ${220 + Math.floor(twinkle * 35)}, 255, 1)` : '#ffffff';
            ctx.fillRect(sx, s.y, s.size, s.size);
        }
        ctx.globalAlpha = 1.0;

        // CRYO: Falling snowflakes
        if (isCryo) {
            ctx.fillStyle = 'rgba(200, 240, 255, 0.7)';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            const snowCount = 20;
            for (let sn = 0; sn < snowCount; sn++) {
                const snX = ((sn * 137.5 + this.x * 0.05 + now * 8) % this.width + this.width) % this.width;
                const snY = ((sn * 73.3 + now * 15 * (0.5 + (sn % 3) * 0.3)) % this.groundY + this.groundY) % this.groundY;
                const snA = 0.2 + 0.5 * Math.sin(now + sn);
                ctx.globalAlpha = snA;
                ctx.fillText(sn % 3 === 0 ? '❄' : '·', snX, snY);
            }
            ctx.globalAlpha = 1.0;
        }

        // 3. Cyber Skyline Silhouettes
        const buildingFill = isCryo ? 'rgba(4, 16, 28, 0.85)' : 'rgba(8, 8, 18, 0.7)';
        ctx.fillStyle = buildingFill;
        const buildingStroke = activeLevel.color ? `${activeLevel.color}33` : 'rgba(0, 240, 255, 0.2)';
        ctx.strokeStyle = buildingStroke;
        ctx.lineWidth = 1;
        for (let b of this.buildings) {
            let bx = (b.x - (this.x * b.parallax)) % (this.width * 1.5);
            if (bx < -b.width) bx += this.width * 1.5;
            const by = this.groundY - b.height;
            ctx.fillRect(bx, by, b.width, b.height);
            ctx.strokeRect(bx, by, b.width, b.height);

            // Glowing rooftop beacon
            if (b.windows) {
                ctx.fillStyle = activeLevel.color || '#00f0ff';
                ctx.globalAlpha = 0.5 + audioPulse * 0.5;
                ctx.fillRect(bx + b.width / 2 - 2, by - 4, 4, 4);
                ctx.globalAlpha = 1.0;
                ctx.fillStyle = buildingFill;
            }
        }

        // 4. Perspective Cyber Grid
        const gridColor = isCryo
            ? `rgba(0, 200, 240, ${0.06 + audioPulse * 0.1})`
            : `rgba(0, 240, 255, ${0.08 + audioPulse * 0.15})`;
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        const gridOffset = -(this.x * 0.6) % 80;
        ctx.beginPath();
        for (let gx = gridOffset; gx < this.width; gx += 80) {
            ctx.moveTo(gx, 0);
            ctx.lineTo(gx, this.groundY);
        }
        ctx.stroke();

        // 5. Floor & Floor Glow
        ctx.fillStyle = isCryo ? '#010810' : '#050508';
        ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);

        // CRYO floor: icy frost pattern
        if (isCryo) {
            const frostGrad = ctx.createLinearGradient(0, this.groundY, 0, this.groundY + 30);
            frostGrad.addColorStop(0, 'rgba(100, 200, 230, 0.15)');
            frostGrad.addColorStop(1, 'rgba(0, 150, 200, 0)');
            ctx.fillStyle = frostGrad;
            ctx.fillRect(0, this.groundY, this.width, 30);
        }

        // Floor line glow
        ctx.strokeStyle = activeLevel.color || '#00f0ff';
        ctx.lineWidth = isCryo ? 3 : 4;
        ctx.shadowBlur = 18 + audioPulse * 30;
        ctx.shadowColor = activeLevel.color || '#00f0ff';
        ctx.beginPath();
        ctx.moveTo(0, this.groundY);
        ctx.lineTo(this.width, this.groundY);
        ctx.stroke();

        // Ceiling line
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + audioPulse * 0.15})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.width, 0);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.restore();
    }
}

