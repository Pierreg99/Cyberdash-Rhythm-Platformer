export class ParticleSystem {
constructor() {
this.particles = [];
this.rings = [];
this.floatingTexts = [];
this.speedLines = [];
}
reset() {
this.particles = [];
this.rings = [];
this.floatingTexts = [];
this.speedLines = [];
}
emitExplosion(x, y, color = '#ff003c') {
const count = 45;
for (let i = 0; i < count; i++) {
const angle = Math.random() * Math.PI * 2;
const speed = Math.random() * 14 + 3;
this.particles.push({
x,
y,
vx: Math.cos(angle) * speed,
vy: Math.sin(angle) * speed,
life: 1.0,
decay: Math.random() * 0.02 + 0.015,
color,
size: Math.random() * 8 + 3,
type: 'square'
});
}
this.rings.push({
x,
y,
radius: 5,
maxRadius: 120,
growth: 7,
life: 1.0,
decay: 0.04,
color
});
}
emitOrbHit(x, y, color = '#ffd700') {
this.rings.push({
x,
y,
radius: 8,
maxRadius: 65,
growth: 4.5,
life: 1.0,
decay: 0.05,
color
});
for (let i = 0; i < 12; i++) {
const angle = Math.random() * Math.PI * 2;
const speed = Math.random() * 6 + 2;
this.particles.push({
x,
y,
vx: Math.cos(angle) * speed,
vy: Math.sin(angle) * speed,
life: 1.0,
decay: 0.04,
color,
size: 4,
type: 'spark'
});
}
}
emitCoinCollect(x, y) {
this.rings.push({
x,
y,
radius: 10,
maxRadius: 80,
growth: 5,
life: 1.0,
decay: 0.04,
color: '#ffd700'
});
for (let i = 0; i < 20; i++) {
const angle = Math.random() * Math.PI * 2;
const speed = Math.random() * 8 + 3;
this.particles.push({
x,
y,
vx: Math.cos(angle) * speed,
vy: Math.sin(angle) * speed,
life: 1.0,
decay: 0.025,
color: '#ffd700',
size: 5,
type: 'spark'
});
}
this.floatingTexts.push({
x,
y: y - 20,
text: '+CYBER CORE',
color: '#ffd700',
life: 1.0,
decay: 0.02
});
}
emitSpeedWarp(x, y, speedMult, width, height) {
if (speedMult <= 1.0) return;
const count = Math.floor(speedMult * 3);
for (let i = 0; i < count; i++) {
this.speedLines.push({
x: x + width * 0.8 + Math.random() * 200,
y: Math.random() * height,
len: Math.random() * 80 + 40,
speed: (Math.random() * 15 + 20) * speedMult,
life: 1.0,
color: speedMult >= 3 ? '#ff003c' : speedMult >= 2 ? '#39ff14' : '#00f0ff'
});
}
}
updateAndDraw(ctx, cx, screenWidth, screenHeight) {
ctx.save();
for (let i = this.speedLines.length - 1; i >= 0; i--) {
const sl = this.speedLines[i];
sl.x -= sl.speed;
sl.life -= 0.05;
if (sl.life <= 0 || sl.x - cx < -100) {
this.speedLines.splice(i, 1);
continue;
}
ctx.strokeStyle = sl.color;
ctx.globalAlpha = sl.life * 0.6;
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(sl.x - cx, sl.y);
ctx.lineTo(sl.x - cx + sl.len, sl.y);
ctx.stroke();
}
for (let i = this.rings.length - 1; i >= 0; i--) {
const r = this.rings[i];
r.radius += r.growth;
r.life -= r.decay;
if (r.life <= 0 || r.radius >= r.maxRadius) {
this.rings.splice(i, 1);
continue;
}
ctx.strokeStyle = r.color;
ctx.globalAlpha = r.life;
ctx.lineWidth = 3 * r.life;
ctx.shadowBlur = 15;
ctx.shadowColor = r.color;
ctx.beginPath();
ctx.arc(r.x - cx, r.y, r.radius, 0, Math.PI * 2);
ctx.stroke();
}
for (let i = this.particles.length - 1; i >= 0; i--) {
const p = this.particles[i];
p.x += p.vx;
p.y += p.vy;
p.life -= p.decay;
if (p.life <= 0) {
this.particles.splice(i, 1);
continue;
}
ctx.globalAlpha = p.life;
ctx.fillStyle = p.color;
ctx.shadowBlur = 10;
ctx.shadowColor = p.color;
if (p.type === 'spark') {
ctx.beginPath();
ctx.arc(p.x - cx, p.y, p.size * p.life, 0, Math.PI * 2);
ctx.fill();
} else {
ctx.fillRect(p.x - cx - p.size / 2, p.y - p.size / 2, p.size, p.size);
}
}
ctx.font = 'bold 14px "Courier New", monospace';
ctx.textAlign = 'center';
for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
const ft = this.floatingTexts[i];
ft.y -= 1.2;
ft.life -= ft.decay;
if (ft.life <= 0) {
this.floatingTexts.splice(i, 1);
continue;
}
ctx.globalAlpha = ft.life;
ctx.fillStyle = ft.color;
ctx.shadowBlur = 10;
ctx.shadowColor = ft.color;
ctx.fillText(ft.text, ft.x - cx, ft.y);
}
ctx.restore();
}
}