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
this.targetX = Math.max(0, playerX - this.width * 0.28);
this.x += (this.targetX - this.x) * 0.12;
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
const bgGrad = ctx.createLinearGradient(0, 0, 0, this.groundY);
bgGrad.addColorStop(0, activeLevel.bg || '#050510');
bgGrad.addColorStop(1, '#050508');
ctx.fillStyle = bgGrad;
ctx.fillRect(0, 0, this.width, this.height);
ctx.fillStyle = '#ffffff';
const now = Date.now() * 0.002;
for (let s of this.stars) {
let sx = (s.x - (this.x * s.parallax)) % this.width;
if (sx < 0) sx += this.width;
const starAlpha = Math.max(0.1, (s.parallax + audioPulse * 0.3) * (0.7 + 0.3 * Math.sin(now + s.pulseOffset)));
ctx.globalAlpha = starAlpha;
ctx.fillRect(sx, s.y, s.size, s.size);
}
ctx.globalAlpha = 1.0;
ctx.fillStyle = 'rgba(8, 8, 18, 0.7)';
ctx.strokeStyle = activeLevel.color ? `${activeLevel.color}33` : 'rgba(0, 240, 255, 0.2)';
ctx.lineWidth = 1;
for (let b of this.buildings) {
let bx = (b.x - (this.x * b.parallax)) % (this.width * 1.5);
if (bx < -b.width) bx += this.width * 1.5;
const by = this.groundY - b.height;
ctx.fillRect(bx, by, b.width, b.height);
ctx.strokeRect(bx, by, b.width, b.height);
if (b.windows) {
ctx.fillStyle = activeLevel.color || '#00f0ff';
ctx.globalAlpha = 0.5 + audioPulse * 0.5;
ctx.fillRect(bx + b.width / 2 - 2, by - 4, 4, 4);
ctx.globalAlpha = 1.0;
ctx.fillStyle = 'rgba(8, 8, 18, 0.7)';
}
}
ctx.strokeStyle = `rgba(0, 240, 255, ${0.08 + audioPulse * 0.15})`;
ctx.lineWidth = 1;
const gridOffset = -(this.x * 0.6) % 80;
ctx.beginPath();
for (let gx = gridOffset; gx < this.width; gx += 80) {
ctx.moveTo(gx, 0);
ctx.lineTo(gx, this.groundY);
}
ctx.stroke();
ctx.fillStyle = '#050508';
ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);
ctx.strokeStyle = activeLevel.color || '#00f0ff';
ctx.lineWidth = 4;
ctx.shadowBlur = 18 + audioPulse * 30;
ctx.shadowColor = activeLevel.color || '#00f0ff';
ctx.beginPath();
ctx.moveTo(0, this.groundY);
ctx.lineTo(this.width, this.groundY);
ctx.stroke();
ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + audioPulse * 0.2})`;
ctx.lineWidth = 2;
ctx.shadowBlur = 10;
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(this.width, 0);
ctx.stroke();
ctx.shadowBlur = 0;
ctx.restore();
}
}