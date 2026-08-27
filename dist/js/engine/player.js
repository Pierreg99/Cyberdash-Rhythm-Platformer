export const BASE_SPEED_X = 9.5;
export const BASE_TILE_SIZE = 40;
export class Player {
constructor() {
this.reset();
this.skin = 'classic';
this.primaryColor = '#00f0ff';
this.accentColor = '#ffd700';
this.trailType = 'neon';
}
reset() {
this.x = 100;
this.y = 0;
this.baseSize = 34;
this.isMini = false;
this.s = this.baseSize;
this.vx = BASE_SPEED_X;
this.vy = 0;
this.speedMult = 1.0;
this.gravityDir = 1; 
this.rot = 0;
this.grounded = false;
this.form = 'CUBE'; 
this.dead = false;
this.robotBoosting = false;
this.robotBoostTime = 0;
this.accentColor = '#ffd700';
this.trailType = 'neon';
this.characterId = 'classic';
this.trails = [];
this.dead = false;
}
setCustomization(cfg) {
if (!cfg) return;
if (cfg.primaryColor) this.primaryColor = cfg.primaryColor;
if (cfg.accentColor) this.accentColor = cfg.accentColor;
if (cfg.trailType) this.trailType = cfg.trailType;
if (cfg.characterId) this.characterId = cfg.characterId;
}
setForm(newForm) {
if (this.form !== newForm) {
this.form = newForm;
this.rot = 0;
this.vy = 0;
}
}
setSize(mini) {
this.isMini = mini;
this.s = mini ? this.baseSize * 0.65 : this.baseSize;
}
setSpeed(mult) {
this.speedMult = mult;
this.vx = BASE_SPEED_X * mult;
}
setGravity(dir) {
this.gravityDir = dir;
}
update(input, soundEngine) {
if (this.dead) return;
const g = 1.45 * (this.isMini ? 1.2 : 1.0) * this.gravityDir;
const jumpForce = -18.2 * (this.isMini ? 0.9 : 1.0) * this.gravityDir;
if (this.form === 'CUBE') {
this.vy += g;
if (input.hold && this.grounded) {
this.vy = jumpForce;
this.grounded = false;
if (soundEngine) soundEngine.playSFX('jump');
}
if (!this.grounded) {
this.rot += 9.5 * this.gravityDir * this.speedMult;
} else {
this.rot = Math.round(this.rot / 90) * 90;
}
}
else if (this.form === 'SHIP') {
const shipThrust = -0.65 * (this.isMini ? 1.15 : 1.0) * this.gravityDir;
const shipGrav = 0.55 * (this.isMini ? 1.15 : 1.0) * this.gravityDir;
if (input.hold) this.vy += shipThrust;
else this.vy += shipGrav;
const maxShipSpeed = 12 * (this.isMini ? 1.1 : 1.0);
this.vy = Math.max(-maxShipSpeed, Math.min(maxShipSpeed, this.vy));
this.rot = (this.vy * 3.2) * this.gravityDir;
}
else if (this.form === 'UFO') {
this.vy += g * 0.8;
if (input.tap) {
this.vy = -14.0 * (this.isMini ? 0.9 : 1.0) * this.gravityDir;
input.tap = false;
if (soundEngine) soundEngine.playSFX('jump');
}
this.rot = (this.vy * 2.2) * this.gravityDir;
}
else if (this.form === 'WAVE') {
const waveSpeed = this.vx * (this.isMini ? 1.2 : 1.0) * this.gravityDir;
if (input.hold) {
this.vy = -waveSpeed;
this.rot = -45 * this.gravityDir;
} else {
this.vy = waveSpeed;
this.rot = 45 * this.gravityDir;
}
}
else if (this.form === 'BALL') {
this.vy += g * 1.1;
if (input.tap && this.grounded) {
this.gravityDir *= -1;
this.vy = 4 * this.gravityDir;
this.grounded = false;
input.tap = false;
if (soundEngine) soundEngine.playSFX('gravity');
}
this.rot += 12 * this.speedMult;
}
else if (this.form === 'ROBOT') {
this.vy += g;
if (input.hold) {
if (this.grounded) {
this.robotBoosting = true;
this.robotBoostTime = 0;
this.vy = jumpForce * 0.65;
this.grounded = false;
if (soundEngine) soundEngine.playSFX('jump');
} else if (this.robotBoosting && this.robotBoostTime < this.maxRobotBoost) {
this.robotBoostTime++;
this.vy += jumpForce * 0.08;
}
} else {
this.robotBoosting = false;
}
if (!this.grounded) {
this.rot += 5 * this.gravityDir;
} else {
this.rot = 0;
}
}
let speedModifier = 1.0;
if (window.cyberDashTierConfig && typeof window.cyberDashTierConfig.speedModifier === 'number') {
speedModifier = window.cyberDashTierConfig.speedModifier;
}
this.x += this.vx * speedModifier;
this.y += this.vy;
this.trails.push({
x: this.x,
y: this.y + this.s / 2,
a: 1.0,
color: this.primaryColor,
accent: this.accentColor
});
if (this.trails.length > 28) this.trails.shift();
}
draw(ctx, cx, levelThemeColor) {
if (this.dead) return;
const sx = this.x - cx;
const sy = this.y;
ctx.save();
for (let i = 0; i < this.trails.length; i++) {
const t = this.trails[i];
t.a -= 0.04;
if (t.a > 0) {
ctx.save();
ctx.globalAlpha = t.a * 0.7;
if (this.trailType === 'rainbow') {
const hue = (Date.now() * 0.3 + i * 15) % 360;
ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
ctx.shadowColor = ctx.fillStyle;
} else if (this.trailType === 'fire') {
ctx.fillStyle = i % 2 === 0 ? '#ff003c' : '#ff7700';
ctx.shadowColor = '#ff7700';
} else if (this.trailType === 'matrix') {
ctx.fillStyle = '#39ff14';
ctx.shadowColor = '#39ff14';
} else if (this.trailType === 'spark') {
ctx.fillStyle = this.accentColor;
ctx.shadowColor = this.accentColor;
} else {
ctx.fillStyle = this.primaryColor;
ctx.shadowColor = this.primaryColor;
}
ctx.shadowBlur = 10;
const trailSize = Math.max(2, (this.s * 0.25) * t.a);
if (this.form === 'WAVE') {
ctx.lineWidth = this.isMini ? 4 : 6;
ctx.strokeStyle = ctx.fillStyle;
if (i > 0) {
ctx.beginPath();
ctx.moveTo(this.trails[i - 1].x - cx, this.trails[i - 1].y);
ctx.lineTo(t.x - cx, t.y);
ctx.stroke();
}
} else {
ctx.fillRect(t.x - cx - trailSize / 2, t.y - trailSize / 2, trailSize, trailSize);
}
ctx.restore();
}
}
ctx.save();
ctx.translate(sx + this.s / 2, sy + this.s / 2);
ctx.rotate((this.rot * Math.PI) / 180);
ctx.shadowBlur = 16;
ctx.shadowColor = this.primaryColor;
if (this.form === 'CUBE') {
ctx.fillStyle = '#ffffff';
ctx.fillRect(-this.s / 2, -this.s / 2, this.s, this.s);
ctx.fillStyle = '#0a0a14';
ctx.fillRect(-this.s * 0.38, -this.s * 0.38, this.s * 0.76, this.s * 0.76);
ctx.fillStyle = this.primaryColor;
ctx.fillRect(-this.s * 0.22, -this.s * 0.22, this.s * 0.44, this.s * 0.44);
ctx.fillStyle = this.accentColor;
ctx.fillRect(-this.s * 0.08, -this.s * 0.08, this.s * 0.16, this.s * 0.16);
if (this.characterId === 'emperor') {
ctx.fillStyle = '#ffd700';
ctx.shadowColor = '#ffd700';
ctx.shadowBlur = 10;
ctx.beginPath();
ctx.moveTo(-this.s * 0.4, -this.s / 2);
ctx.lineTo(-this.s * 0.4, -this.s * 0.85);
ctx.lineTo(-this.s * 0.2, -this.s * 0.65);
ctx.lineTo(0, -this.s * 0.95);
ctx.lineTo(this.s * 0.2, -this.s * 0.65);
ctx.lineTo(this.s * 0.4, -this.s * 0.85);
ctx.lineTo(this.s * 0.4, -this.s / 2);
ctx.closePath();
ctx.fill();
} else if (this.characterId === 'neko') {
ctx.fillStyle = this.accentColor;
ctx.shadowColor = this.accentColor;
ctx.beginPath();
ctx.moveTo(-this.s / 2, -this.s / 2);
ctx.lineTo(-this.s * 0.45, -this.s * 0.85);
ctx.lineTo(-this.s * 0.15, -this.s / 2);
ctx.moveTo(this.s / 2, -this.s / 2);
ctx.lineTo(this.s * 0.45, -this.s * 0.85);
ctx.lineTo(this.s * 0.15, -this.s / 2);
ctx.fill();
} else if (this.characterId === 'reaper') {
ctx.fillStyle = '#ff003c';
ctx.shadowColor = '#ff003c';
ctx.beginPath();
ctx.moveTo(-this.s / 2, -this.s / 4);
ctx.lineTo(-this.s * 0.8, -this.s * 0.6);
ctx.lineTo(-this.s / 2, -this.s / 2);
ctx.moveTo(this.s / 2, -this.s / 4);
ctx.lineTo(this.s * 0.8, -this.s * 0.6);
ctx.lineTo(this.s / 2, -this.s / 2);
ctx.fill();
} else if (this.characterId === 'mecha') {
ctx.fillStyle = '#ffffff';
ctx.fillRect(-this.s * 0.4, -2, this.s * 0.8, 4);
} else if (this.characterId === 'dragon') {
ctx.fillStyle = '#ff7700';
ctx.beginPath();
ctx.moveTo(-this.s * 0.2, -this.s / 2);
ctx.lineTo(0, -this.s * 0.8);
ctx.lineTo(this.s * 0.2, -this.s / 2);
ctx.fill();
} else if (this.characterId === 'glitch') {
ctx.fillStyle = '#00f0ff';
ctx.fillRect(-this.s * 0.6, -this.s * 0.2, this.s * 0.2, 3);
ctx.fillStyle = '#ff003c';
ctx.fillRect(this.s * 0.4, this.s * 0.1, this.s * 0.2, 3);
}
}
else if (this.form === 'SHIP') {
ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.moveTo(-this.s / 2, -this.s / 2.5);
ctx.lineTo(this.s / 2, 0);
ctx.lineTo(-this.s / 2, this.s / 2.5);
ctx.closePath();
ctx.fill();
ctx.fillStyle = this.primaryColor;
ctx.beginPath();
ctx.moveTo(-this.s / 4, -this.s / 5);
ctx.lineTo(this.s / 4, 0);
ctx.lineTo(-this.s / 4, this.s / 5);
ctx.closePath();
ctx.fill();
ctx.fillStyle = this.accentColor;
ctx.beginPath();
ctx.moveTo(-this.s / 2, -this.s / 6);
ctx.lineTo(-this.s / 2 - (Math.random() * 12 + 8), 0);
ctx.lineTo(-this.s / 2, this.s / 6);
ctx.closePath();
ctx.fill();
}
else if (this.form === 'UFO') {
ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.ellipse(0, 0, this.s / 2, this.s / 4, 0, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = this.primaryColor;
ctx.beginPath();
ctx.arc(0, -this.s / 8, this.s / 3.2, Math.PI, 0);
ctx.fill();
ctx.fillStyle = this.accentColor;
ctx.fillRect(-this.s / 4, -2, this.s / 2, 4);
}
else if (this.form === 'WAVE') {
ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.moveTo(this.s / 2, 0);
ctx.lineTo(-this.s / 2, -this.s / 2);
ctx.lineTo(-this.s / 3, 0);
ctx.lineTo(-this.s / 2, this.s / 2);
ctx.closePath();
ctx.fill();
ctx.fillStyle = this.primaryColor;
ctx.beginPath();
ctx.moveTo(this.s / 3, 0);
ctx.lineTo(-this.s / 4, -this.s / 3);
ctx.lineTo(-this.s / 5, 0);
ctx.lineTo(-this.s / 4, this.s / 3);
ctx.closePath();
ctx.fill();
}
else if (this.form === 'BALL') {
ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.arc(0, 0, this.s / 2, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = '#0a0a14';
ctx.beginPath();
ctx.arc(0, 0, this.s * 0.38, 0, Math.PI * 2);
ctx.fill();
ctx.strokeStyle = this.primaryColor;
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(-this.s / 2, 0);
ctx.lineTo(this.s / 2, 0);
ctx.moveTo(0, -this.s / 2);
ctx.lineTo(0, this.s / 2);
ctx.stroke();
ctx.fillStyle = this.accentColor;
ctx.beginPath();
ctx.arc(0, 0, this.s * 0.15, 0, Math.PI * 2);
ctx.fill();
}
else if (this.form === 'ROBOT') {
ctx.fillStyle = '#ffffff';
ctx.fillRect(-this.s * 0.35, -this.s * 0.45, this.s * 0.7, this.s * 0.9);
ctx.fillStyle = this.primaryColor;
ctx.fillRect(-this.s * 0.25, -this.s * 0.35, this.s * 0.5, this.s * 0.22);
ctx.fillStyle = this.accentColor;
ctx.fillRect(-this.s * 0.15, 0, this.s * 0.3, this.s * 0.25);
if (this.robotBoosting) {
ctx.fillStyle = '#ff7700';
ctx.fillRect(-this.s * 0.3, this.s * 0.45, this.s * 0.2, Math.random() * 12 + 6);
ctx.fillRect(this.s * 0.1, this.s * 0.45, this.s * 0.2, Math.random() * 12 + 6);
}
}
ctx.restore();
ctx.restore();
}
}