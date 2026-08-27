import { LEVELS, drawLevelMap } from './levels/level-data.js';
import { Player, BASE_TILE_SIZE } from './engine/player.js';
import { PhysicsEngine } from './engine/physics.js';
import { ParticleSystem } from './engine/particles.js';
import { Camera } from './engine/camera.js';
import { CryoAudioEngine } from './audio/sound-engine.js';
import { LevelEditor, EDITOR_PALETTE } from './levels/editor.js';
import { StorageManager } from './ui/storage.js';
import { MenuManager } from './ui/menu-manager.js';
export class CyberDashGame {
constructor() {
this.canvas = document.getElementById('render-core');
this.ctx = this.canvas.getContext('2d');
this.mode = 'MENU'; 
this.activeLevel = LEVELS[0];
this.isPractice = false;
this.attempts = 1;
this.checkpoints = [];
this.coinsFoundInRun = [false, false, false];
this.player = new Player();
this.camera = new Camera();
this.particles = new ParticleSystem();
this.soundEngine = new CryoAudioEngine();
this.editor = new LevelEditor();
this.menu = new MenuManager(this);
this.input = { hold: false, tap: false };
this.groundY = 0;
this.lastTime = 0;
this.fps = 60;
this.frameCount = 0;
this.lastFpsUpdate = 0;
this.editorMouseDown = false;
this.editorRightClick = false;
}
init() {
this.resize();
window.addEventListener('resize', () => this.resize());
this.bindInputEvents();
this.setupEditorPaletteUI();
this.menu.init();
this.player.setCustomization(this.menu.garageConfig);
this.bindGameControlsUI();
requestAnimationFrame((t) => this.loop(t));
}
resize() {
this.canvas.width = window.innerWidth;
this.canvas.height = window.innerHeight;
this.groundY = this.canvas.height - 110;
this.camera.init(this.canvas.width, this.canvas.height, this.groundY);
}
bindInputEvents() {
const onDown = (e) => {
if (e.target && e.target.closest('button, input, select, .nav-tab, .grid-item-card, .btn-cyber')) return;
if (e.type === 'keydown' && e.code !== 'Space' && e.code !== 'ArrowUp' && e.code !== 'KeyW') return;
this.input.hold = true;
this.input.tap = true;
if (this.mode === 'PLAYING' || this.mode === 'EDITOR_PLAY') {
StorageManager.incrementStat('totalJumps', 1);
}
};
const onUp = (e) => {
if (e.type === 'keyup' && e.code !== 'Space' && e.code !== 'ArrowUp' && e.code !== 'KeyW') return;
this.input.hold = false;
};
window.addEventListener('keydown', onDown);
window.addEventListener('keyup', onUp);
this.canvas.addEventListener('pointerdown', (e) => {
if (this.mode === 'EDITOR') {
this.editorMouseDown = true;
this.editorRightClick = e.button === 2;
this.editor.handleGridClick(e.clientX, e.clientY, this.groundY, this.editorRightClick);
} else {
onDown(e);
}
});
this.canvas.addEventListener('pointermove', (e) => {
if (this.mode === 'EDITOR' && this.editorMouseDown) {
this.editor.handleGridClick(e.clientX, e.clientY, this.groundY, this.editorRightClick);
}
});
window.addEventListener('pointerup', () => {
this.editorMouseDown = false;
this.input.hold = false;
});
this.canvas.addEventListener('contextmenu', (e) => {
if (this.mode === 'EDITOR') e.preventDefault();
});
this.canvas.addEventListener('wheel', (e) => {
if (this.mode === 'EDITOR') {
e.preventDefault();
this.editor.camX = Math.max(0, this.editor.camX + e.deltaY * 0.8 + e.deltaX * 0.8);
}
}, { passive: false });
window.addEventListener('keydown', (e) => {
if (e.code === 'Escape') {
if (this.mode === 'PLAYING') this.togglePause();
else if (this.mode === 'PAUSED') this.togglePause();
else if (this.mode === 'EDITOR_PLAY') this.returnToEditorFromPlay();
}
if (e.code === 'KeyZ' && this.isPractice && this.mode === 'PLAYING') {
this.setCheckpoint();
}
if (e.code === 'KeyX' && this.isPractice && this.mode === 'PLAYING') {
this.removeCheckpoint();
}
});
}
bindGameControlsUI() {
const prevBtn = document.getElementById('btn-prev-lvl');
if (prevBtn) {
prevBtn.onclick = () => {
const total = LEVELS.length + StorageManager.getCustomLevels().length;
this.menu.selectedLevelIndex = (this.menu.selectedLevelIndex - 1 + total) % total;
this.menu.updateLevelSelectUI();
this.soundEngine.playSFX('jump');
};
}
const nextBtn = document.getElementById('btn-next-lvl');
if (nextBtn) {
nextBtn.onclick = () => {
const total = LEVELS.length + StorageManager.getCustomLevels().length;
this.menu.selectedLevelIndex = (this.menu.selectedLevelIndex + 1) % total;
this.menu.updateLevelSelectUI();
this.soundEngine.playSFX('jump');
};
}
const playBtn = document.getElementById('btn-hub-play');
if (playBtn) {
playBtn.onclick = () => {
const allLevels = [...LEVELS, ...StorageManager.getCustomLevels()];
const lvl = allLevels[this.menu.selectedLevelIndex] || LEVELS[0];
this.startLevel(lvl, false);
};
}
const pracBtn = document.getElementById('btn-hub-practice');
if (pracBtn) {
pracBtn.onclick = () => {
const allLevels = [...LEVELS, ...StorageManager.getCustomLevels()];
const lvl = allLevels[this.menu.selectedLevelIndex] || LEVELS[0];
this.startLevel(lvl, true);
};
}
const pauseBtn = document.getElementById('btn-in-game-pause');
if (pauseBtn) pauseBtn.onclick = () => this.togglePause();
const resumeBtn = document.getElementById('btn-pause-resume');
if (resumeBtn) resumeBtn.onclick = () => this.togglePause();
const restartBtn = document.getElementById('btn-pause-restart');
if (restartBtn) {
restartBtn.onclick = () => {
this.togglePause();
this.attempts++;
StorageManager.incrementStat('totalAttempts', 1);
this.resetRun();
};
}
const exitBtn = document.getElementById('btn-pause-exit');
if (exitBtn) exitBtn.onclick = () => this.returnToMenu();
const cpAddBtn = document.getElementById('btn-cp-add');
if (cpAddBtn) cpAddBtn.onclick = () => this.setCheckpoint();
const cpDelBtn = document.getElementById('btn-cp-del');
if (cpDelBtn) cpDelBtn.onclick = () => this.removeCheckpoint();
const nextLvlBtn = document.getElementById('btn-victory-next');
if (nextLvlBtn) {
nextLvlBtn.onclick = () => {
this.menu.hideVictoryScreen();
const total = LEVELS.length;
const nextIdx = (this.activeLevel.id % total);
this.startLevel(LEVELS[nextIdx], false);
};
}
const returnHubBtn = document.getElementById('btn-victory-hub');
if (returnHubBtn) {
returnHubBtn.onclick = () => {
this.menu.hideVictoryScreen();
this.returnToMenu();
};
}
}
setupEditorPaletteUI() {
const container = document.getElementById('editor-palette-grid');
if (!container) return;
container.innerHTML = '';
EDITOR_PALETTE.forEach(item => {
const btn = document.createElement('button');
btn.className = `p-2 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 border transition-all ${
this.editor.selectedType === item.type
? 'bg-cyan/20 border-cyan text-white shadow-[0_0_10px_#00f0ff]'
: 'bg-panel/80 border-gray-800 text-gray-400 hover:border-cyan/40'
}`;
btn.innerHTML = `<span>${item.icon}</span> <span>${item.name}</span>`;
btn.onclick = () => {
this.editor.selectedType = item.type;
this.editor.tool = 'place';
this.setupEditorPaletteUI();
};
container.appendChild(btn);
});
const toolPlace = document.getElementById('btn-tool-place');
if (toolPlace) {
toolPlace.onclick = () => {
this.editor.tool = 'place';
toolPlace.classList.add('selected');
document.getElementById('btn-tool-erase')?.classList.remove('selected');
};
}
const toolErase = document.getElementById('btn-tool-erase');
if (toolErase) {
toolErase.onclick = () => {
this.editor.tool = 'erase';
toolErase.classList.add('selected');
document.getElementById('btn-tool-place')?.classList.remove('selected');
};
}
const btnTest = document.getElementById('btn-editor-test');
if (btnTest) {
btnTest.onclick = () => {
this.startEditorTestPlay();
};
}
const btnSave = document.getElementById('btn-editor-save');
if (btnSave) {
btnSave.onclick = () => {
const nameInput = document.getElementById('editor-lvl-name');
if (nameInput && nameInput.value) this.editor.level.name = nameInput.value;
const lenInput = document.getElementById('editor-lvl-len');
if (lenInput) this.editor.level.length = parseInt(lenInput.value, 10) || 200;
this.editor.saveToStorage();
alert('Level successfully saved to Cyber Databank!');
};
}
const btnExitEditor = document.getElementById('btn-editor-exit');
if (btnExitEditor) {
btnExitEditor.onclick = () => {
document.getElementById('editor-ui-overlay')?.classList.add('hidden');
this.returnToMenu();
this.menu.switchTab('editor');
};
}
const btnExport = document.getElementById('btn-editor-export');
if (btnExport) {
btnExport.onclick = () => {
const json = this.editor.exportJSON();
navigator.clipboard.writeText(json).then(() => {
alert('Level JSON copied to clipboard!');
}).catch(() => {
prompt('Level JSON:', json);
});
};
}
}
openEditor(levelObj = null) {
this.mode = 'EDITOR';
this.editor.initLevel(levelObj);
document.getElementById('menu-layer')?.classList.add('hidden');
document.getElementById('hud-layer')?.classList.add('hidden');
document.getElementById('pause-layer')?.classList.add('hidden');
document.getElementById('practice-hud')?.classList.add('hidden');
const overlay = document.getElementById('editor-ui-overlay');
if (overlay) overlay.classList.remove('hidden');
const nameInput = document.getElementById('editor-lvl-name');
if (nameInput) nameInput.value = this.editor.level.name;
const lenInput = document.getElementById('editor-lvl-len');
if (lenInput) lenInput.value = this.editor.level.length;
this.setupEditorPaletteUI();
}
startEditorTestPlay() {
this.mode = 'EDITOR_PLAY';
document.getElementById('editor-ui-overlay')?.classList.add('hidden');
document.getElementById('hud-layer')?.classList.remove('hidden');
document.getElementById('btn-editor-return-hud')?.classList.remove('hidden');
this.activeLevel = this.editor.level;
this.isPractice = true;
this.attempts = 1;
this.checkpoints = [];
this.soundEngine.start(this.activeLevel.audioTrack);
this.resetRun();
}
returnToEditorFromPlay() {
this.soundEngine.stop();
this.mode = 'EDITOR';
document.getElementById('hud-layer')?.classList.add('hidden');
document.getElementById('btn-editor-return-hud')?.classList.add('hidden');
document.getElementById('editor-ui-overlay')?.classList.remove('hidden');
}
startLevel(level, isPracticeMode = false) {
this.activeLevel = level;
this.isPractice = isPracticeMode;
this.attempts = 1;
this.checkpoints = [];
this.coinsFoundInRun = [false, false, false];
this.mode = 'PLAYING';
StorageManager.incrementStat('totalAttempts', 1);
const menuLayer = document.getElementById('menu-layer');
if (menuLayer) {
menuLayer.classList.add('hidden');
menuLayer.style.opacity = '0';
menuLayer.style.pointerEvents = 'none';
}
const hudLayer = document.getElementById('hud-layer');
if (hudLayer) hudLayer.classList.remove('hidden');
const lvlNameEl = document.getElementById('hud-level-name');
if (lvlNameEl) lvlNameEl.innerText = level.name;
const lvlSubEl = document.getElementById('hud-level-subtitle');
if (lvlSubEl) {
const lvlNum = typeof level.id === 'number' ? (level.id < 10 ? '0' + level.id : level.id) : '01';
lvlSubEl.innerText = `LEVEL ${lvlNum} - ${level.tier || 'SECTOR'} TIER`;
}
const tierLblEl = document.getElementById('hud-tier-label');
if (tierLblEl) tierLblEl.innerText = `${level.tier || 'SECTOR'} TIER`;
document.getElementById('btn-editor-return-hud')?.classList.add('hidden');
const attemptEl = document.getElementById('attempt-counter');
if (attemptEl) attemptEl.innerText = `ATTEMPT 1`;
if (this.isPractice) {
document.getElementById('practice-hud')?.classList.remove('hidden');
} else {
document.getElementById('practice-hud')?.classList.add('hidden');
}
try {
this.soundEngine.start(level.audioTrack);
} catch (e) {
console.warn('Audio start delayed until user interaction:', e);
}
this.resetRun();
}
togglePause() {
if (this.mode === 'PLAYING') {
this.mode = 'PAUSED';
document.getElementById('pause-layer')?.classList.remove('hidden');
if (this.soundEngine && this.soundEngine.ctx) this.soundEngine.ctx.suspend();
} else if (this.mode === 'PAUSED') {
this.mode = 'PLAYING';
document.getElementById('pause-layer')?.classList.add('hidden');
if (this.soundEngine && this.soundEngine.ctx) this.soundEngine.ctx.resume();
}
}
returnToMenu() {
if (this.soundEngine) this.soundEngine.stop();
this.mode = 'MENU';
document.getElementById('pause-layer')?.classList.add('hidden');
document.getElementById('hud-layer')?.classList.add('hidden');
document.getElementById('practice-hud')?.classList.add('hidden');
document.getElementById('editor-ui-overlay')?.classList.add('hidden');
const menuLayer = document.getElementById('menu-layer');
if (menuLayer) {
menuLayer.classList.remove('hidden');
menuLayer.style.opacity = '1';
menuLayer.style.pointerEvents = 'auto';
}
this.menu.updateLevelSelectUI();
}
setCheckpoint() {
if (this.player.dead) return;
this.checkpoints.push({
x: this.player.x,
y: this.player.y,
vy: this.player.vy,
form: this.player.form,
gravityDir: this.player.gravityDir,
isMini: this.player.isMini,
speedMult: this.player.speedMult
});
this.soundEngine.playSFX('orb');
const flash = document.createElement('div');
flash.className = 'absolute inset-0 bg-bio opacity-25 pointer-events-none z-50 transition-opacity duration-300';
document.body.appendChild(flash);
setTimeout(() => flash.remove(), 250);
}
removeCheckpoint() {
if (this.checkpoints.length > 0) {
this.checkpoints.pop();
this.soundEngine.playSFX('crash');
}
}
handleDeath() {
if (this.player.dead) return;
this.player.dead = true;
this.soundEngine.playSFX('crash');
if (this.activeLevel && this.activeLevel.tier === 'CRYO') {
this.particles.emitDeathIce(
this.player.x + this.player.s / 2,
this.player.y + this.player.s / 2
);
} else {
this.particles.emitExplosion(
this.player.x + this.player.s / 2,
this.player.y + this.player.s / 2,
'#ff003c'
);
}
this.camera.shake(20, 300);
StorageManager.incrementStat('totalCrashes', 1);
setTimeout(() => {
if (this.isPractice && this.checkpoints.length > 0) {
const cp = this.checkpoints[this.checkpoints.length - 1];
this.player.x = cp.x;
this.player.y = cp.y;
this.player.vy = 0;
this.player.form = cp.form;
this.player.gravityDir = cp.gravityDir;
this.player.isMini = cp.isMini;
this.player.s = cp.isMini ? this.player.baseSize * 0.65 : this.player.baseSize;
this.player.setSpeed(cp.speedMult);
this.player.dead = false;
this.player.frozen = false;
this.player.freezeTimer = 0;
this.input.tap = false;
this.input.hold = false;
} else {
this.attempts++;
StorageManager.incrementStat('totalAttempts', 1);
const attemptEl = document.getElementById('attempt-counter');
if (attemptEl) attemptEl.innerText = `ATTEMPT ${this.attempts}`;
this.resetRun();
}
}, 500);
}
resetRun() {
this.player.reset();
this.player.setCustomization(this.menu.garageConfig);
this.player.y = this.groundY - this.player.s;
this.player.dead = false;
this.player.frozen = false;
this.player.freezeTimer = 0;
this.particles.reset();
this.camera.x = 0;
this.camera.shakeTime = 0;
this.input.tap = false;
this.input.hold = false;
const progFill = document.getElementById('progress-fill');
if (progFill) progFill.style.width = '0%';
const progPct = document.getElementById('progress-pct');
if (progPct) progPct.innerText = '0%';
}
handleCoinCollect(coinIndex, x, y) {
if (!this.coinsFoundInRun[coinIndex]) {
this.coinsFoundInRun[coinIndex] = true;
this.soundEngine.playSFX('coin');
this.particles.emitCoinCollect(x, y);
if (!this.isPractice && typeof this.activeLevel.id === 'number') {
StorageManager.collectCoin(this.activeLevel.id, coinIndex);
}
}
}
handleLevelComplete() {
this.soundEngine.stop();
this.soundEngine.playSFX('victory');
if (!this.isPractice && typeof this.activeLevel.id === 'number') {
StorageManager.setBestScore(this.activeLevel.id, 100);
}
if (this.mode === 'EDITOR_PLAY') {
alert('TEST RUN COMPLETE!');
this.returnToEditorFromPlay();
} else {
this.menu.showVictoryScreen(this.activeLevel, this.attempts, this.coinsFoundInRun);
}
}
updateEqualizerUI() {
const visualData = this.soundEngine.getVisualizerData();
const eqBars = document.querySelectorAll('.eq-bar');
eqBars.forEach((bar, idx) => {
const val = visualData[idx] || 0;
const h = Math.max(4, (val / 255) * 24);
bar.style.height = `${h}px`;
});
}
loop(timestamp) {
const deltaMs = timestamp - this.lastTime || 16;
this.lastTime = timestamp;
this.frameCount++;
if (timestamp - this.lastFpsUpdate >= 1000) {
this.fps = this.frameCount;
this.frameCount = 0;
this.lastFpsUpdate = timestamp;
const fpsEl = document.getElementById('fps-counter');
if (fpsEl) fpsEl.innerText = `${this.fps} FPS`;
}
this.updateEqualizerUI();
if (this.mode === 'EDITOR') {
this.editor.render(this.ctx, this.groundY);
}
else if (this.mode === 'PLAYING' || this.mode === 'PAUSED' || this.mode === 'EDITOR_PLAY') {
if (this.mode === 'PLAYING' || this.mode === 'EDITOR_PLAY') {
if (!this.player.dead) {
this.camera.update(this.player.x, deltaMs);
this.player.update(this.input, this.soundEngine);
if (this.player.speedMult > 1.0) {
this.particles.emitSpeedWarp(this.camera.x, this.player.y, this.player.speedMult, this.canvas.width, this.canvas.height);
}
PhysicsEngine.check(
this.player,
this.activeLevel.data,
this.groundY,
this.input,
this.soundEngine,
this.particles,
(coinIdx, cx, cy) => this.handleCoinCollect(coinIdx, cx, cy),
() => this.handleDeath()
);
const freezeVignette = document.getElementById('freeze-vignette');
const freezeBadge = document.getElementById('freeze-hud-badge');
if (this.player.frozen && this.player.freezeTimer > 0) {
if (freezeVignette) freezeVignette.classList.remove('hidden');
if (freezeBadge) freezeBadge.classList.remove('hidden');
} else {
if (freezeVignette) freezeVignette.classList.add('hidden');
if (freezeBadge) freezeBadge.classList.add('hidden');
}
if (this.player.frozen && this.player.freezeTimer % 8 === 0) {
this.particles.emitFrostRing(
this.player.x + this.player.s / 2,
this.player.y + this.player.s / 2
);
}
const scoreEl = document.getElementById('hud-score-val');
if (scoreEl) scoreEl.innerText = Math.floor(this.player.x * 2.5);
const comboEl = document.getElementById('hud-combo-val');
if (comboEl) {
const comboCount = Math.min(32, Math.max(1, Math.floor(this.player.x / 350) + 1));
comboEl.innerText = `${comboCount}x`;
}
const totalPx = this.activeLevel.length * BASE_TILE_SIZE;
let pct = Math.floor((this.player.x / totalPx) * 100);
pct = Math.max(0, Math.min(100, pct));
const progFill = document.getElementById('progress-fill');
if (progFill) progFill.style.width = `${pct}%`;
const progPct = document.getElementById('progress-pct');
if (progPct) progPct.innerText = `${pct}%`;
if (!this.isPractice && typeof this.activeLevel.id === 'number') {
StorageManager.setBestScore(this.activeLevel.id, pct);
}
if (pct >= 100) {
this.handleLevelComplete();
}
} else {
if (this.camera.shakeTime > 0) {
this.camera.shakeTime -= deltaMs;
}
}
}
this.camera.drawBackground(this.ctx, this.activeLevel, this.soundEngine.visualPulse);
this.soundEngine.visualPulse *= 0.9;
drawLevelMap(this.ctx, this.activeLevel.data, this.camera.x, this.groundY, this.activeLevel.color);
this.player.draw(this.ctx, this.camera.x, this.activeLevel.color);
this.particles.updateAndDraw(this.ctx, this.camera.x, this.canvas.width, this.canvas.height);
}
else if (this.mode === 'MENU') {
this.camera.x += 1.5;
const previewLevel = LEVELS[this.menu.selectedLevelIndex] || LEVELS[0];
this.camera.drawBackground(this.ctx, previewLevel, this.soundEngine.visualPulse);
this.soundEngine.visualPulse *= 0.9;
}
requestAnimationFrame((t) => this.loop(t));
}
}
window.addEventListener('DOMContentLoaded', () => {
const game = new CyberDashGame();
game.init();
window.__cyberGame = game;
});