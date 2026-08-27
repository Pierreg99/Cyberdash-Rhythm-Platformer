import { LEVELS } from '../levels/level-data.js';
import { StorageManager, ACHIEVEMENTS_LIST, CHARACTERS_CATALOG, TRAILS_CATALOG, PASS_TIERS_REWARDS } from './storage.js';
import { EDITOR_PALETTE } from '../levels/editor.js';
export class MenuManager {
constructor(game) {
this.game = game;
this.currentTab = 'levels'; 
this.selectedLevelIndex = 0;
this.garageConfig = StorageManager.getGarage();
this.settingsConfig = StorageManager.getSettings();
this.tierConfig = StorageManager.getTierConfig();
window.cyberDashTierConfig = this.tierConfig;
}
init() {
this.bindNavTabs();
this.bindLevelFilters();
this.bindTierModifiersUI();
this.bindDailyFaucetUI();
this.bindStoreUI();
this.bindGarageUI();
this.bindCyberPassUI();
this.bindSettingsUI();
this.bindEditorHubUI();
this.bindOAuthUI();
this.updateCurrencyUI();
this.updateLevelSelectUI();
this.updateOAuthUI();
this.renderAchievements();
this.renderStats();
window.showAchievementToast = (item) => this.showToast(item);
}
bindNavTabs() {
const tabs = document.querySelectorAll('.nav-tab');
tabs.forEach(tab => {
tab.addEventListener('click', () => {
const target = tab.dataset.tab;
this.switchTab(target);
});
});
}
switchTab(tabName) {
this.currentTab = tabName;
document.querySelectorAll('.nav-tab').forEach(t => {
t.classList.toggle('active', t.dataset.tab === tabName);
});
document.querySelectorAll('.menu-view-panel').forEach(p => p.classList.add('hidden'));
const targetPanel = document.getElementById(`panel-${tabName}`);
if (targetPanel) {
targetPanel.classList.remove('hidden');
}
this.updateCurrencyUI();
if (tabName === 'levels') this.updateLevelSelectUI();
else if (tabName === 'store') this.renderStoreGrid();
else if (tabName === 'garage') {
this.renderArmoryGrid();
this.updateGaragePreview();
} else if (tabName === 'pass') {
this.renderDailyQuests();
this.renderPassTiers();
} else if (tabName === 'editor') this.updateCustomLevelsList();
else if (tabName === 'databank') {
this.renderAchievements();
this.renderStats();
}
}
bindLevelFilters() {
const filterBtns = document.querySelectorAll('.lvl-filter-btn');
filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
this.activeFilter = btn.dataset.filter || 'ALL';
filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === this.activeFilter));
this.renderLevelCardsGrid();
});
});
}
bindTierModifiersUI() {
const toggleBtn = document.getElementById('btn-toggle-modifiers');
const drawer = document.getElementById('tier-config-drawer');
if (toggleBtn && drawer) {
toggleBtn.addEventListener('click', () => {
drawer.classList.toggle('hidden');
toggleBtn.classList.toggle('active', !drawer.classList.contains('hidden'));
});
}
const speedBtns = document.querySelectorAll('.speed-mod-btn');
speedBtns.forEach(btn => {
const speed = parseFloat(btn.dataset.speed);
if (this.tierConfig.speedModifier === speed) {
speedBtns.forEach(b => b.classList.toggle('active', b === btn));
}
btn.addEventListener('click', () => {
this.tierConfig.speedModifier = speed;
speedBtns.forEach(b => b.classList.toggle('active', b === btn));
StorageManager.saveTierConfig(this.tierConfig);
window.cyberDashTierConfig = this.tierConfig;
});
});
const hitboxBtns = document.querySelectorAll('.hitbox-mod-btn');
hitboxBtns.forEach(btn => {
const mode = btn.dataset.hitbox;
if (this.tierConfig.hitboxMode === mode) {
hitboxBtns.forEach(b => b.classList.toggle('active', b === btn));
}
btn.addEventListener('click', () => {
this.tierConfig.hitboxMode = mode;
hitboxBtns.forEach(b => b.classList.toggle('active', b === btn));
StorageManager.saveTierConfig(this.tierConfig);
window.cyberDashTierConfig = this.tierConfig;
});
});
const chkAutoCheck = document.getElementById('chk-auto-checkpoints');
if (chkAutoCheck) {
chkAutoCheck.checked = !!this.tierConfig.autoCheckpoints;
chkAutoCheck.addEventListener('change', (e) => {
this.tierConfig.autoCheckpoints = e.target.checked;
StorageManager.saveTierConfig(this.tierConfig);
window.cyberDashTierConfig = this.tierConfig;
});
}
const chkGhost = document.getElementById('chk-ghost-trails');
if (chkGhost) {
chkGhost.checked = this.tierConfig.ghostTrails !== false;
chkGhost.addEventListener('change', (e) => {
this.tierConfig.ghostTrails = e.target.checked;
StorageManager.saveTierConfig(this.tierConfig);
window.cyberDashTierConfig = this.tierConfig;
});
}
}
updateLevelSelectUI() {
const totalOfficial = LEVELS.length;
const customLevels = StorageManager.getCustomLevels();
const allLevels = [...LEVELS, ...customLevels];
if (this.selectedLevelIndex >= allLevels.length) {
this.selectedLevelIndex = 0;
}
const lvl = allLevels[this.selectedLevelIndex];
if (!lvl) return;
const bestPct = StorageManager.getBestScore(lvl.id);
const coins = StorageManager.getCoins(lvl.id);
const starsTotal = StorageManager.getTotalStarsEarned(LEVELS);
const coinsTotal = StorageManager.getTotalCoinsCollected();
const starCounter = document.getElementById('hub-stars-count');
if (starCounter) starCounter.innerText = starsTotal;
const coinCounter = document.getElementById('hub-coins-count');
if (coinCounter) coinCounter.innerText = `${coinsTotal}/36`;
const idLabel = document.getElementById('lvl-id-label');
if (idLabel) {
idLabel.innerText = typeof lvl.id === 'number' 
? `TARGET ${lvl.id < 10 ? '0' + lvl.id : lvl.id} 
: 'CUSTOM SECTOR';
}
const nameLabel = document.getElementById('lvl-name-label');
if (nameLabel) {
nameLabel.innerText = lvl.name;
nameLabel.style.color = lvl.color || '#00f0ff';
nameLabel.style.textShadow = `0 0 20px ${lvl.color || '#00f0ff'}88`;
}
const subtitleLabel = document.getElementById('lvl-subtitle-label');
if (subtitleLabel) subtitleLabel.innerText = lvl.subtitle || lvl.desc || '';
const diffBadge = document.getElementById('lvl-diff-badge');
if (diffBadge) {
diffBadge.innerText = `${lvl.diff} (${lvl.stars || 1}★)`;
diffBadge.className = `inline-block mt-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-widest border ${
lvl.diff === 'EASY'
? 'bg-bio/10 text-bio border-bio/40 shadow-[0_0_10px_rgba(57,255,20,0.2)]'
: lvl.diff === 'NORMAL'
? 'bg-cyan/10 text-cyan border-cyan/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
: lvl.diff === 'HARD'
? 'bg-purple/10 text-purple border-purple/40 shadow-[0_0_10px_rgba(176,38,255,0.2)]'
: lvl.diff === 'HARDER'
? 'bg-orange/10 text-orange border-orange/40 shadow-[0_0_10px_rgba(255,119,0,0.2)]'
: lvl.diff === 'INSANE'
? 'bg-gold/10 text-gold border-gold/40 shadow-[0_0_10px_rgba(255,215,0,0.2)]'
: 'bg-magenta/10 text-magenta border-magenta/40 shadow-[0_0_10px_rgba(255,0,60,0.2)]'
}`;
}
const bestBar = document.getElementById('lvl-best-bar');
if (bestBar) {
bestBar.style.width = `${bestPct}%`;
bestBar.style.backgroundColor = lvl.color || '#00f0ff';
}
const bestTxt = document.getElementById('lvl-best-txt');
if (bestTxt) bestTxt.innerText = `${bestPct}%`;
const coinContainer = document.getElementById('lvl-coins-container');
if (coinContainer) {
coinContainer.innerHTML = '';
for (let i = 0; i < 3; i++) {
const coinEl = document.createElement('span');
const hasCoin = coins[i];
coinEl.className = `text-base transition-all ${
hasCoin ? 'text-gold drop-shadow-[0_0_8px_#ffd700]' : 'text-gray-700 opacity-40'
}`;
coinEl.innerHTML = hasCoin ? '◆' : '◇';
coinContainer.appendChild(coinEl);
}
}
this.renderLevelCardsGrid();
}
renderLevelCardsGrid() {
const gridContainer = document.getElementById('level-select-grid');
if (!gridContainer) return;
const customLevels = StorageManager.getCustomLevels();
const allLevels = [...LEVELS, ...customLevels];
gridContainer.innerHTML = '';
const filter = this.activeFilter || 'ALL';
const filtered = allLevels.filter(lvl => {
if (filter === 'ALL') return true;
if (filter === 'CUSTOM') return typeof lvl.id !== 'number';
if (filter === 'EASY') return lvl.tier === 'EASY' || lvl.diff === 'EASY' || lvl.diff === 'NORMAL';
if (filter === 'HARD') return lvl.tier === 'HARD' || lvl.diff === 'HARD' || lvl.diff === 'HARDER';
if (filter === 'OMEGA') return lvl.tier === 'OMEGA' || lvl.diff === 'INSANE' || lvl.diff === 'DEMON';
return lvl.diff === filter;
});
if (filtered.length === 0) {
gridContainer.innerHTML = `<div class="col-span-full text-center text-gray-500 font-mono py-8 text-xs">NO SECTORS FOUND IN THE SELECTED TIER.</div>`;
return;
}
filtered.forEach(lvl => {
const originalIndex = allLevels.findIndex(l => l.id === lvl.id);
const isSelected = originalIndex === this.selectedLevelIndex;
const bestPct = StorageManager.getBestScore(lvl.id);
const coins = StorageManager.getCoins(lvl.id);
const card = document.createElement('div');
card.className = `kinetic-glass p-4 rounded-2xl flex flex-col justify-between border transition-all cursor-pointer ${
isSelected
? 'border-cyan shadow-[0_0_25px_rgba(0,240,255,0.35)] scale-[1.02]'
: 'border-white/10 hover:border-cyan/50 hover:bg-cyan/5'
}`;
const formBadges = (lvl.forms || ['CUBE'])
.map(f => `<span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white/5 border border-white/10 text-gray-300">${f}</span>`)
.join(' ');
let coinIcons = '';
for (let i = 0; i < 3; i++) {
const has = coins[i];
coinIcons += `<span class="${has ? 'text-gold drop-shadow-[0_0_6px_#ffd700]' : 'text-gray-700 opacity-40'}">${has ? '◆' : '◇'}</span>`;
}
card.innerHTML = `
<div>
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">${typeof lvl.id === 'number' ? `TARGET ${lvl.id < 10 ? '0' + lvl.id : lvl.id} 
<span class="px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
lvl.diff === 'EASY'
? 'bg-bio/10 text-bio border-bio/30'
: lvl.diff === 'NORMAL'
? 'bg-cyan/10 text-cyan border-cyan/30'
: lvl.diff === 'HARD'
? 'bg-purple/10 text-purple border-purple/30'
: lvl.diff === 'HARDER'
? 'bg-orange/10 text-orange border-orange/30'
: lvl.diff === 'INSANE'
? 'bg-gold/10 text-gold border-gold/30'
: 'bg-magenta/10 text-magenta border-magenta/30'
}">${lvl.diff} ${lvl.stars || 1}★</span>
</div>
<h4 class="text-lg font-black tracking-wide uppercase" style="color: ${lvl.color || '#fff'}; text-shadow: 0 0 10px ${lvl.color || '#00f0ff'}66;">
${lvl.name}
</h4>
<p class="text-[11px] font-mono text-gray-400 line-clamp-1 mt-0.5">${lvl.subtitle || lvl.desc || ''}</p>
<div class="flex items-center gap-1.5 mt-2.5">
${formBadges}
</div>
</div>
<div class="mt-4 pt-3 border-t border-white/10">
<div class="flex justify-between items-center text-xs font-mono mb-1.5">
<div class="flex items-center gap-1 text-sm">${coinIcons}</div>
<span class="font-bold text-cyan">${bestPct}%</span>
</div>
<div class="bg-panel rounded-full h-1.5 overflow-hidden border border-gray-800 mb-3">
<div class="h-full rounded-full transition-all duration-300" style="width: ${bestPct}%; background-color: ${lvl.color || '#00f0ff'};"></div>
</div>
<div class="flex gap-2">
<button class="btn-cyber flex-1 py-2 rounded-lg text-xs font-black btn-card-play text-cyan" data-idx="${originalIndex}">
▶ PLAY
</button>
<button class="btn-cyber btn-gold flex-1 py-2 rounded-lg text-xs font-black btn-card-prac" data-idx="${originalIndex}">
SIMULATE
</button>
</div>
</div>
`;
card.onclick = (e) => {
if (e.target.closest('button')) return;
this.selectedLevelIndex = originalIndex;
this.updateLevelSelectUI();
};
const playBtn = card.querySelector('.btn-card-play');
if (playBtn) {
playBtn.onclick = (e) => {
e.stopPropagation();
this.selectedLevelIndex = originalIndex;
this.game.startLevel(lvl, false);
};
}
const pracBtn = card.querySelector('.btn-card-prac');
if (pracBtn) {
pracBtn.onclick = (e) => {
e.stopPropagation();
this.selectedLevelIndex = originalIndex;
this.game.startLevel(lvl, true);
};
}
gridContainer.appendChild(card);
});
}
updateCurrencyUI() {
const curr = StorageManager.getCurrency();
const bitsEl = document.getElementById('header-bits-count');
const orbsEl = document.getElementById('header-orbs-count');
if (bitsEl) bitsEl.innerText = curr.bits.toLocaleString();
if (orbsEl) orbsEl.innerText = curr.orbs.toLocaleString();
const faucetLabel = document.getElementById('faucet-label');
if (faucetLabel) {
faucetLabel.innerText = StorageManager.canClaimDailyBonus() ? 'CLAIM 🎁' : 'CLAIMED ✓';
}
}
bindDailyFaucetUI() {
const faucetBtn = document.getElementById('btn-daily-faucet');
if (faucetBtn) {
faucetBtn.addEventListener('click', () => {
if (StorageManager.canClaimDailyBonus()) {
const bonus = StorageManager.claimDailyBonus();
if (bonus) {
this.updateCurrencyUI();
this.showToast({
name: 'DAILY SUPPLY DROP CLAIMED!',
desc: `+${bonus.bits} Bits, +${bonus.orbs} Orbs & +${bonus.xp} Pass XP.`,
icon: '🎁'
});
this.game.soundEngine.playSFX('coin');
}
} else {
this.showToast({
name: 'SUPPLY COOLDOWN ACTIVE',
desc: 'Your daily supply drop resets in under 20 hours.',
icon: '⏳'
});
}
});
}
}
bindStoreUI() {
const featuredBtn = document.getElementById('btn-buy-featured-deal');
if (featuredBtn) {
featuredBtn.addEventListener('click', () => {
const isUnlocked = StorageManager.isItemUnlocked('characters', 'emperor');
if (isUnlocked) {
this.showToast({ name: 'ALREADY OWNED', desc: 'Cyber Emperor is already in your Armory.', icon: '👑' });
return;
}
if (StorageManager.spendCurrency(0, 50)) {
StorageManager.unlockItem('characters', 'emperor');
StorageManager.unlockItem('trails', 'void');
this.updateCurrencyUI();
this.renderStoreGrid();
this.showToast({ name: 'APEX BUNDLE UNLOCKED!', desc: 'Equipped Cyber Emperor and Dark Void trail.', icon: '👑' });
this.game.soundEngine.playSFX('win');
} else {
this.showToast({ name: 'INSUFFICIENT ORBS', desc: 'You need 50 Cyber Orbs to unlock this deal.', icon: '⚠️' });
}
});
}
}
renderStoreGrid() {
const container = document.getElementById('store-catalog-grid');
if (!container) return;
container.innerHTML = '';
CHARACTERS_CATALOG.forEach(char => {
const isUnlocked = StorageManager.isItemUnlocked('characters', char.id);
const isEquipped = this.garageConfig.characterId === char.id;
const card = document.createElement('div');
card.className = `kinetic-glass p-4 rounded-2xl border transition-all flex flex-col justify-between ${
isEquipped ? 'border-cyan shadow-[0_0_20px_rgba(0,240,255,0.3)]' : isUnlocked ? 'border-bio/40' : 'border-white/10 hover:border-gold/50'
}`;
const costStr = char.priceOrbs > 0 ? `💎 ${char.priceOrbs} ORBS` : char.priceBits > 0 ? `🪙 ${char.priceBits.toLocaleString()} BITS` : 'FREE';
card.innerHTML = `
<div>
<div class="flex justify-between items-start mb-2">
<span class="text-2xl">${char.icon}</span>
<span class="px-2 py-0.5 rounded-full text-[9px] font-black border ${
char.rarity === 'COMMON' ? 'bg-white/10 text-gray-300 border-white/20' :
char.rarity === 'RARE' ? 'bg-cyan/10 text-cyan border-cyan/40' :
char.rarity === 'EPIC' ? 'bg-purple/10 text-purple border-purple/40' :
char.rarity === 'LEGENDARY' ? 'bg-gold/10 text-gold border-gold/40' :
'bg-magenta/10 text-magenta border-magenta/40'
}">${char.rarity}</span>
</div>
<h4 class="text-base font-black uppercase text-white tracking-wide">${char.name}</h4>
<p class="text-[10px] font-mono text-gray-400 mt-1 line-clamp-2">${char.desc}</p>
</div>
<div class="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
<span class="text-xs font-mono font-bold text-gold">${costStr}</span>
<button class="btn-cyber px-4 py-1.5 rounded-lg text-xs font-black btn-store-action ${
isEquipped ? 'text-cyan bg-cyan/20 border-cyan' : isUnlocked ? 'text-bio bg-bio/10 border-bio/40' : 'text-gold btn-gold'
}">
${isEquipped ? 'EQUIPPED' : isUnlocked ? 'EQUIP' : 'BUY'}
</button>
</div>
`;
const actionBtn = card.querySelector('.btn-store-action');
if (actionBtn) {
actionBtn.addEventListener('click', () => {
if (isEquipped) return;
if (isUnlocked) {
this.garageConfig.characterId = char.id;
StorageManager.saveGarage(this.garageConfig);
this.game.player.setCustomization(this.garageConfig);
this.renderStoreGrid();
this.updateGaragePreview();
this.showToast({ name: 'PILOT EQUIPPED', desc: `Now piloting as ${char.name}.`, icon: char.icon });
} else {
if (StorageManager.spendCurrency(char.priceBits, char.priceOrbs)) {
StorageManager.unlockItem('characters', char.id);
this.garageConfig.characterId = char.id;
StorageManager.saveGarage(this.garageConfig);
this.game.player.setCustomization(this.garageConfig);
this.updateCurrencyUI();
this.renderStoreGrid();
this.updateGaragePreview();
this.showToast({ name: 'PURCHASE SUCCESSFUL', desc: `Unlocked ${char.name}!`, icon: '🎉' });
this.game.soundEngine.playSFX('win');
} else {
this.showToast({ name: 'INSUFFICIENT FUNDS', desc: 'Earn more Cyber Bits or Orbs to purchase.', icon: '❌' });
}
}
});
}
container.appendChild(card);
});
TRAILS_CATALOG.forEach(trail => {
if (trail.id === 'neon') return;
const isUnlocked = StorageManager.isItemUnlocked('trails', trail.id);
const isEquipped = this.garageConfig.trailType === trail.id;
const card = document.createElement('div');
card.className = `kinetic-glass p-4 rounded-2xl border transition-all flex flex-col justify-between ${
isEquipped ? 'border-cyan shadow-[0_0_20px_rgba(0,240,255,0.3)]' : isUnlocked ? 'border-bio/40' : 'border-white/10 hover:border-gold/50'
}`;
const costStr = trail.priceOrbs > 0 ? `💎 ${trail.priceOrbs} ORBS` : `🪙 ${trail.priceBits.toLocaleString()} BITS`;
card.innerHTML = `
<div>
<div class="flex justify-between items-start mb-2">
<span class="text-xl">⚡</span>
<span class="px-2 py-0.5 rounded-full text-[9px] font-black border bg-purple/10 text-purple border-purple/40">${trail.rarity}</span>
</div>
<h4 class="text-base font-black uppercase text-white tracking-wide">${trail.name} TRAIL</h4>
<p class="text-[10px] font-mono text-gray-400 mt-1">${trail.desc}</p>
</div>
<div class="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
<span class="text-xs font-mono font-bold text-gold">${costStr}</span>
<button class="btn-cyber px-4 py-1.5 rounded-lg text-xs font-black btn-trail-action ${
isEquipped ? 'text-cyan bg-cyan/20 border-cyan' : isUnlocked ? 'text-bio bg-bio/10 border-bio/40' : 'text-gold btn-gold'
}">
${isEquipped ? 'EQUIPPED' : isUnlocked ? 'EQUIP' : 'BUY'}
</button>
</div>
`;
const actionBtn = card.querySelector('.btn-trail-action');
if (actionBtn) {
actionBtn.addEventListener('click', () => {
if (isEquipped) return;
if (isUnlocked) {
this.garageConfig.trailType = trail.id;
StorageManager.saveGarage(this.garageConfig);
this.game.player.setCustomization(this.garageConfig);
this.renderStoreGrid();
this.updateGaragePreview();
this.showToast({ name: 'TRAIL EQUIPPED', desc: `Equipped ${trail.name}.`, icon: '⚡' });
} else {
if (StorageManager.spendCurrency(trail.priceBits, trail.priceOrbs)) {
StorageManager.unlockItem('trails', trail.id);
this.garageConfig.trailType = trail.id;
StorageManager.saveGarage(this.garageConfig);
this.game.player.setCustomization(this.garageConfig);
this.updateCurrencyUI();
this.renderStoreGrid();
this.updateGaragePreview();
this.showToast({ name: 'TRAIL UNLOCKED', desc: `Unlocked ${trail.name}!`, icon: '✨' });
this.game.soundEngine.playSFX('win');
} else {
this.showToast({ name: 'INSUFFICIENT FUNDS', desc: 'Earn more Cyber Bits or Orbs to purchase.', icon: '❌' });
}
}
});
}
container.appendChild(card);
});
}
bindGarageUI() {
const primaryPickers = document.querySelectorAll('.color-picker-primary');
primaryPickers.forEach(p => {
p.addEventListener('click', () => {
this.garageConfig.primaryColor = p.dataset.color;
StorageManager.saveGarage(this.garageConfig);
this.game.player.setCustomization(this.garageConfig);
this.updateGaragePreview();
});
});
const accentPickers = document.querySelectorAll('.color-picker-accent');
accentPickers.forEach(p => {
p.addEventListener('click', () => {
this.garageConfig.accentColor = p.dataset.color;
StorageManager.saveGarage(this.garageConfig);
this.game.player.setCustomization(this.garageConfig);
this.updateGaragePreview();
});
});
this.renderArmoryGrid();
}
renderArmoryGrid() {
const charGrid = document.getElementById('armory-characters-grid');
if (charGrid) {
charGrid.innerHTML = '';
CHARACTERS_CATALOG.forEach(char => {
const isUnlocked = StorageManager.isItemUnlocked('characters', char.id);
const isEquipped = (this.garageConfig.characterId || 'classic') === char.id;
const card = document.createElement('div');
card.className = `p-3 rounded-xl border text-center transition-all cursor-pointer ${
isEquipped
? 'border-cyan bg-cyan/15 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
: isUnlocked
? 'border-white/20 bg-panel hover:border-cyan/50 hover:bg-cyan/5'
: 'border-gray-800 bg-black/40 opacity-40 grayscale cursor-not-allowed'
}`;
card.innerHTML = `
<div class="text-2xl mb-1">${char.icon}</div>
<div class="text-[11px] font-black text-white truncate">${char.name}</div>
<div class="text-[9px] font-mono text-cyan mt-0.5">${isEquipped ? 'EQUIPPED' : isUnlocked ? 'READY' : 'LOCKED'}</div>
`;
if (isUnlocked) {
card.addEventListener('click', () => {
this.garageConfig.characterId = char.id;
StorageManager.saveGarage(this.garageConfig);
this.game.player.setCustomization(this.garageConfig);
this.renderArmoryGrid();
this.updateGaragePreview();
});
}
charGrid.appendChild(card);
});
}
const trailContainer = document.getElementById('armory-trails-picker');
if (trailContainer) {
trailContainer.innerHTML = '';
TRAILS_CATALOG.forEach(trail => {
const isUnlocked = StorageManager.isItemUnlocked('trails', trail.id);
const isEquipped = this.garageConfig.trailType === trail.id;
const btn = document.createElement('button');
btn.className = `px-2.5 py-1 rounded text-[10px] font-mono font-bold border transition-all ${
isEquipped ? 'bg-cyan text-black border-cyan font-black' : isUnlocked ? 'bg-panel text-white border-white/20 hover:border-cyan/50' : 'bg-black/40 text-gray-600 border-gray-800 opacity-40'
}`;
btn.innerText = trail.name;
if (isUnlocked) {
btn.addEventListener('click', () => {
this.garageConfig.trailType = trail.id;
StorageManager.saveGarage(this.garageConfig);
this.game.player.setCustomization(this.garageConfig);
this.renderArmoryGrid();
this.updateGaragePreview();
});
}
trailContainer.appendChild(btn);
});
}
}
updateGaragePreview() {
const activeChar = CHARACTERS_CATALOG.find(c => c.id === (this.garageConfig.characterId || 'classic')) || CHARACTERS_CATALOG[0];
const nameLabel = document.getElementById('armory-active-name');
if (nameLabel) nameLabel.innerText = activeChar.name;
const typeLabel = document.getElementById('armory-active-type');
if (typeLabel) typeLabel.innerText = `${activeChar.type} 
const previewEl = document.getElementById('garage-player-preview');
if (previewEl) {
previewEl.style.borderColor = this.garageConfig.primaryColor;
previewEl.style.boxShadow = `0 0 30px ${this.garageConfig.primaryColor}88`;
}
const innerCore = document.getElementById('garage-cube-core');
if (innerCore) {
innerCore.style.backgroundColor = this.garageConfig.primaryColor;
innerCore.style.boxShadow = `0 0 15px ${this.garageConfig.primaryColor}`;
}
const innerAccent = document.getElementById('garage-cube-accent');
if (innerAccent) {
innerAccent.style.backgroundColor = this.garageConfig.accentColor;
}
}
bindCyberPassUI() {
this.renderDailyQuests();
this.renderPassTiers();
}
renderDailyQuests() {
const container = document.getElementById('daily-quests-container');
if (!container) return;
container.innerHTML = '';
const quests = StorageManager.getDailyQuests();
quests.forEach(q => {
const isReady = q.current >= q.goal && !q.claimed;
const pct = Math.min(100, Math.round((q.current / q.goal) * 100));
const card = document.createElement('div');
card.className = `kinetic-glass p-3 rounded-xl border flex flex-col justify-between ${
q.claimed ? 'border-gray-800 opacity-50' : isReady ? 'border-gold shadow-[0_0_15px_rgba(255,215,0,0.3)] bg-gold/5' : 'border-white/10'
}`;
const rewardStr = q.rewardOrbs ? `💎 ${q.rewardOrbs} Orbs` : `🪙 ${q.rewardBits} Bits`;
card.innerHTML = `
<div class="flex justify-between items-start mb-1.5">
<div>
<h4 class="text-xs font-black text-white uppercase">${q.title}</h4>
<p class="text-[10px] font-mono text-gray-400">${q.desc}</p>
</div>
<span class="text-[10px] font-mono font-bold text-gold">${rewardStr}</span>
</div>
<div class="flex items-center gap-3 mt-1">
<div class="flex-1 bg-panel rounded-full h-1.5 overflow-hidden border border-gray-800">
<div class="bg-cyan h-full rounded-full" style="width: ${pct}%"></div>
</div>
<span class="text-[9px] font-mono text-gray-400">${q.current}/${q.goal}</span>
<button class="btn-cyber px-3 py-1 rounded text-[10px] font-black btn-quest-claim ${
q.claimed ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed' : isReady ? 'btn-gold text-gold animate-bounce' : 'bg-white/5 text-gray-500 border-white/10 cursor-not-allowed'
}">
${q.claimed ? 'CLAIMED' : isReady ? 'CLAIM' : 'IN PROGRESS'}
</button>
</div>
`;
const claimBtn = card.querySelector('.btn-quest-claim');
if (claimBtn && isReady) {
claimBtn.addEventListener('click', () => {
const claimed = StorageManager.claimQuestReward(q.id);
if (claimed) {
this.updateCurrencyUI();
this.renderDailyQuests();
this.renderPassTiers();
this.showToast({ name: 'QUEST COMPLETED!', desc: `Claimed ${rewardStr} & +${claimed.rewardXP} Pass XP.`, icon: '🏆' });
this.game.soundEngine.playSFX('coin');
}
});
}
container.appendChild(card);
});
}
renderPassTiers() {
const passData = StorageManager.getCyberPassData();
const xpDisplay = document.getElementById('pass-xp-display');
if (xpDisplay) xpDisplay.innerText = `${passData.currentXP.toLocaleString()} XP`;
const xpBar = document.getElementById('pass-xp-bar');
if (xpBar) {
const maxXP = PASS_TIERS_REWARDS[PASS_TIERS_REWARDS.length - 1].xpReq;
const pct = Math.min(100, Math.round((passData.currentXP / maxXP) * 100));
xpBar.style.width = `${pct}%`;
}
const container = document.getElementById('pass-tiers-container');
if (!container) return;
container.innerHTML = '';
PASS_TIERS_REWARDS.forEach(t => {
const isUnlocked = passData.currentXP >= t.xpReq;
const isClaimed = passData.claimedTiers.includes(t.tier);
const card = document.createElement('div');
card.className = `kinetic-glass p-2.5 rounded-xl border flex justify-between items-center ${
isClaimed ? 'border-gray-800 opacity-50' : isUnlocked ? 'border-cyan bg-cyan/10 shadow-[0_0_12px_rgba(0,240,255,0.3)]' : 'border-white/10'
}`;
card.innerHTML = `
<div class="flex items-center gap-3">
<div class="w-7 h-7 rounded-lg bg-panel border border-cyan/40 flex items-center justify-center text-xs font-black text-cyan">
${t.tier}
</div>
<div>
<h4 class="text-xs font-black text-white">${t.label}</h4>
<span class="text-[9px] font-mono text-gray-400">${t.xpReq} XP Required</span>
</div>
</div>
<button class="btn-cyber px-3 py-1 rounded text-[10px] font-black btn-pass-claim ${
isClaimed ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed' : isUnlocked ? 'text-cyan bg-cyan/20 border-cyan animate-pulse' : 'bg-white/5 text-gray-600 border-white/10 cursor-not-allowed'
}">
${isClaimed ? 'CLAIMED ✓' : isUnlocked ? 'CLAIM REWARD' : 'LOCKED 🔒'}
</button>
`;
const claimBtn = card.querySelector('.btn-pass-claim');
if (claimBtn && isUnlocked && !isClaimed) {
claimBtn.addEventListener('click', () => {
const claimed = StorageManager.claimPassTier(t.tier);
if (claimed) {
this.updateCurrencyUI();
this.renderPassTiers();
this.renderArmoryGrid();
this.showToast({ name: `TIER ${t.tier} CLAIMED!`, desc: `Unlocked ${t.label}.`, icon: t.icon });
this.game.soundEngine.playSFX('win');
}
});
}
container.appendChild(card);
});
}
bindSettingsUI() {
const master = document.getElementById('setting-master-vol');
const music = document.getElementById('setting-music-vol');
const sfx = document.getElementById('setting-sfx-vol');
if (master) {
master.value = this.settingsConfig.masterVol * 100;
master.oninput = () => {
this.settingsConfig.masterVol = master.value / 100;
this.applySettings();
};
}
if (music) {
music.value = this.settingsConfig.musicVol * 100;
music.oninput = () => {
this.settingsConfig.musicVol = music.value / 100;
this.applySettings();
};
}
if (sfx) {
sfx.value = this.settingsConfig.sfxVol * 100;
sfx.oninput = () => {
this.settingsConfig.sfxVol = sfx.value / 100;
this.applySettings();
};
}
const crtToggle = document.getElementById('setting-crt');
if (crtToggle) {
crtToggle.checked = this.settingsConfig.crtScanlines;
crtToggle.onchange = () => {
this.settingsConfig.crtScanlines = crtToggle.checked;
this.applySettings();
};
}
const shakeToggle = document.getElementById('setting-shake');
if (shakeToggle) {
shakeToggle.checked = this.settingsConfig.screenShake;
shakeToggle.onchange = () => {
this.settingsConfig.screenShake = shakeToggle.checked;
this.applySettings();
};
}
this.applySettings();
}
applySettings() {
StorageManager.saveSettings(this.settingsConfig);
this.game.soundEngine.setVolumes(
this.settingsConfig.masterVol,
this.settingsConfig.musicVol,
this.settingsConfig.sfxVol
);
const crt = document.querySelector('.crt-overlay');
if (crt) {
crt.style.opacity = this.settingsConfig.crtScanlines ? '0.35' : '0';
}
}
bindEditorHubUI() {
const btnNew = document.getElementById('btn-editor-new');
if (btnNew) {
btnNew.onclick = () => {
this.game.openEditor();
};
}
const btnImport = document.getElementById('btn-editor-import');
if (btnImport) {
btnImport.onclick = () => {
const code = prompt('Paste Level JSON / Code:');
if (code) {
const success = this.game.editor.importJSON(code);
if (success) {
this.game.editor.saveToStorage();
this.updateCustomLevelsList();
alert('Level successfully imported!');
} else {
alert('Invalid level JSON code.');
}
}
};
}
}
updateCustomLevelsList() {
const container = document.getElementById('custom-levels-container');
if (!container) return;
const custom = StorageManager.getCustomLevels();
if (custom.length === 0) {
container.innerHTML = `<div class="text-center text-gray-500 py-10 font-mono text-sm">NO CUSTOM LEVELS CREATED YET. CLICK "+ CREATE NEW SECTOR" TO BUILD ONE.</div>`;
return;
}
container.innerHTML = '';
custom.forEach((lvl, idx) => {
const card = document.createElement('div');
card.className = 'kinetic-glass p-4 rounded-xl flex items-center justify-between border-cyan/20';
card.innerHTML = `
<div>
<h4 class="text-lg font-black text-white uppercase">${lvl.name || 'CUSTOM LEVEL'}</h4>
<span class="text-xs font-mono text-cyan">${lvl.data ? lvl.data.length : 0} OBJECTS | ${lvl.length} TILES</span>
</div>
<div class="flex gap-2">
<button class="btn-cyber px-3 py-1.5 rounded text-xs font-bold btn-edit-lvl" data-id="${lvl.id}">EDIT</button>
<button class="btn-cyber btn-gold px-3 py-1.5 rounded text-xs font-bold btn-play-lvl" data-id="${lvl.id}">PLAY</button>
<button class="btn-cyber btn-danger px-3 py-1.5 rounded text-xs font-bold btn-del-lvl" data-id="${lvl.id}">DELETE</button>
</div>
`;
container.appendChild(card);
});
container.querySelectorAll('.btn-edit-lvl').forEach(b => {
b.onclick = () => {
const lvl = custom.find(l => l.id === b.dataset.id);
if (lvl) this.game.openEditor(lvl);
};
});
container.querySelectorAll('.btn-play-lvl').forEach(b => {
b.onclick = () => {
const lvl = custom.find(l => l.id === b.dataset.id);
if (lvl) this.game.startLevel(lvl, false);
};
});
container.querySelectorAll('.btn-del-lvl').forEach(b => {
b.onclick = () => {
if (confirm('Delete this custom level?')) {
StorageManager.deleteCustomLevel(b.dataset.id);
this.updateCustomLevelsList();
}
};
});
}
renderAchievements() {
const container = document.getElementById('achievements-grid');
if (!container) return;
const unlocked = StorageManager.getAchievements();
container.innerHTML = '';
ACHIEVEMENTS_LIST.forEach(item => {
const isUnlocked = unlocked.includes(item.id);
const card = document.createElement('div');
card.className = `p-4 rounded-xl border flex items-start gap-3 transition-all ${
isUnlocked
? 'kinetic-glass-gold border-gold/40 text-gold shadow-[0_0_15px_rgba(255,215,0,0.15)]'
: 'bg-panel/60 border-gray-800 text-gray-500 opacity-50'
}`;
card.innerHTML = `
<div class="text-3xl">${item.icon}</div>
<div>
<h5 class="text-sm font-black tracking-wide ${isUnlocked ? 'text-white' : 'text-gray-400'}">${item.name}</h5>
<p class="text-xs font-mono mt-0.5">${item.desc}</p>
<span class="text-[10px] font-mono uppercase mt-2 inline-block px-2 py-0.5 rounded ${
isUnlocked ? 'bg-gold/20 text-gold border border-gold/40' : 'bg-gray-800 text-gray-500'
}">${isUnlocked ? 'UNLOCKED' : 'LOCKED'}</span>
</div>
`;
container.appendChild(card);
});
}
renderStats() {
const stats = StorageManager.getStats();
const statElements = {
'stat-jumps': stats.totalJumps,
'stat-attempts': stats.totalAttempts,
'stat-crashes': stats.totalCrashes,
'stat-clears': stats.levelsCompleted,
'stat-demons': stats.demonClears,
'stat-coins': StorageManager.getTotalCoinsCollected(),
'stat-stars': StorageManager.getTotalStarsEarned(LEVELS)
};
for (const [id, val] of Object.entries(statElements)) {
const el = document.getElementById(id);
if (el) el.innerText = val;
}
}
showToast(item) {
const container = document.getElementById('achievement-toast-container');
if (!container) return;
const toast = document.createElement('div');
toast.className = 'achievement-toast';
toast.innerHTML = `
<div class="text-3xl">${item.icon}</div>
<div>
<span class="text-[10px] font-mono tracking-widest text-gold block uppercase font-bold">ACHIEVEMENT UNLOCKED</span>
<h4 class="text-sm font-black text-white uppercase">${item.name}</h4>
<p class="text-xs font-mono text-gray-300">${item.desc}</p>
</div>
`;
container.appendChild(toast);
setTimeout(() => toast.remove(), 4000);
}
showVictoryScreen(level, attempts, coinsFound) {
const modal = document.getElementById('victory-modal');
if (!modal) return;
document.getElementById('victory-lvl-name').innerText = level.name;
document.getElementById('victory-attempts').innerText = attempts;
document.getElementById('victory-stars').innerText = `+${level.stars || 1} ★`;
const coinsWrap = document.getElementById('victory-coins-wrap');
if (coinsWrap) {
coinsWrap.innerHTML = '';
for (let i = 0; i < 3; i++) {
const coinEl = document.createElement('span');
const got = coinsFound[i];
coinEl.className = `text-2xl ${got ? 'text-gold drop-shadow-[0_0_12px_#ffd700]' : 'text-gray-700'}`;
coinEl.innerHTML = got ? '◆' : '◇';
coinsWrap.appendChild(coinEl);
}
}
modal.classList.remove('hidden');
}
hideVictoryScreen() {
const modal = document.getElementById('victory-modal');
if (modal) modal.classList.add('hidden');
}
bindOAuthUI() {
const btnOpen = document.getElementById('btn-oauth-profile');
const modal = document.getElementById('oauth-modal');
const btnClose = document.getElementById('btn-oauth-close');
const btnConnect = document.getElementById('btn-oauth-connect');
const btnDisconnect = document.getElementById('btn-oauth-disconnect');
const btnApproveAll = document.getElementById('btn-oauth-approve-all');
const btnReset = document.getElementById('btn-oauth-reset');
if (btnOpen && modal) {
btnOpen.onclick = () => {
this.updateOAuthUI();
modal.classList.remove('hidden');
};
}
if (btnClose && modal) {
btnClose.onclick = () => modal.classList.add('hidden');
}
if (btnConnect) {
btnConnect.onclick = () => {
const nameInput = document.getElementById('oauth-input-name');
const name = (nameInput && nameInput.value.trim()) || 'CYBER_PILOT_01';
StorageManager.connectOAuth(name);
this.updateOAuthUI();
this.showToast({
name: 'CYBER OAUTH AUTHORIZED',
desc: `Pilot ${name} token verified on Matrix.`,
icon: '🌐'
});
};
}
if (btnDisconnect) {
btnDisconnect.onclick = () => {
StorageManager.disconnectOAuth();
this.updateOAuthUI();
};
}
if (btnApproveAll) {
btnApproveAll.onclick = () => {
StorageManager.approveAllLevelsAndTrophies();
this.updateOAuthUI();
this.updateLevelSelectUI();
this.renderAchievements();
this.renderStats();
this.game.soundEngine.playSFX('victory');
this.showToast({
name: 'LEVEL & TROPHY OVERRIDE',
desc: 'All 6 Sectors, 18 Cores, and 12 Trophies Approved & Mastered!',
icon: '👑'
});
};
}
if (btnReset) {
btnReset.onclick = () => {
if (confirm('Reset all level clearance and achievement progress?')) {
StorageManager.resetAllProgression();
this.updateOAuthUI();
this.updateLevelSelectUI();
this.renderAchievements();
this.renderStats();
}
};
}
}
updateOAuthUI() {
const profile = StorageManager.getOAuthProfile();
const headerBadge = document.getElementById('header-oauth-badge');
const headerPilot = document.getElementById('header-oauth-name');
if (headerPilot) {
headerPilot.innerText = profile.connected ? profile.pilotName : 'GUEST PILOT';
}
if (headerBadge) {
headerBadge.className = `w-2.5 h-2.5 rounded-full ${
profile.connected ? 'bg-bio shadow-[0_0_8px_#39ff14]' : 'bg-gray-600'
}`;
}
const pilotLabel = document.getElementById('oauth-pilot-display');
if (pilotLabel) pilotLabel.innerText = profile.pilotName;
const idLabel = document.getElementById('oauth-id-display');
if (idLabel) idLabel.innerText = profile.pilotId;
const clearanceLabel = document.getElementById('oauth-clearance-display');
if (clearanceLabel) {
clearanceLabel.innerText = profile.clearanceLevel;
clearanceLabel.className = `text-xs font-mono font-bold ${
profile.connected ? 'text-bio' : 'text-gray-500'
}`;
}
const btnConnect = document.getElementById('btn-oauth-connect');
const btnDisconnect = document.getElementById('btn-oauth-disconnect');
if (btnConnect && btnDisconnect) {
if (profile.connected) {
btnConnect.classList.add('hidden');
btnDisconnect.classList.remove('hidden');
} else {
btnConnect.classList.remove('hidden');
btnDisconnect.classList.add('hidden');
}
}
}
}