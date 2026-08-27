const STORAGE_KEYS = {
BEST_SCORES: 'cdo_best_scores',
LEVEL_COINS: 'cdo_level_coins',
CUSTOM_LEVELS: 'cdo_custom_levels',
GARAGE: 'cdo_garage_config',
SETTINGS: 'cdo_settings_config',
STATS: 'cdo_player_stats',
ACHIEVEMENTS: 'cdo_achievements_unlocked',
OAUTH_PROFILE: 'cdo_oauth_profile',
TIER_CONFIG: 'cdo_tier_config',
CURRENCY: 'cdo_economy_currency',
UNLOCKED_ITEMS: 'cdo_unlocked_inventory',
DAILY_QUESTS: 'cdo_daily_quests',
CYBER_PASS: 'cdo_cyber_pass_data',
LAST_DAILY_CLAIM: 'cdo_last_daily_bonus_claim'
};
export const DEFAULT_CURRENCY = {
bits: 2500, 
orbs: 25    
};
export const CHARACTERS_CATALOG = [
{ id: 'classic', name: 'CYBER CUBE', type: 'BALANCED', priceBits: 0, priceOrbs: 0, rarity: 'COMMON', desc: 'Standard kinetic core chassis. Agile & responsive.', icon: '⚡' },
{ id: 'mecha', name: 'MECHA-01 TITAN', type: 'ARMORED', priceBits: 1500, priceOrbs: 0, rarity: 'RARE', desc: 'Reinforced alloy plating with an exposed fusion reactor core.', icon: '🤖' },
{ id: 'neko', name: 'NEKO CYBER', type: 'AGILITY', priceBits: 2500, priceOrbs: 0, rarity: 'RARE', desc: 'High-frequency acoustic sensors and neon feline HUD visor.', icon: '🐱' },
{ id: 'reaper', name: 'CYBER REAPER', type: 'DARK VOID', priceBits: 4000, priceOrbs: 0, rarity: 'EPIC', desc: 'Spectral dark skull core that channels antimatter exhaust.', icon: '💀' },
{ id: 'kitsune', name: 'KITSUNE FOX', type: 'MYSTIC', priceBits: 5000, priceOrbs: 0, rarity: 'EPIC', desc: 'Nine-tailed plasma spirit matrix with dual auroral halos.', icon: '🦊' },
{ id: 'dragon', name: 'HYPER DRAGON', type: 'PLASMA', priceBits: 7500, priceOrbs: 0, rarity: 'LEGENDARY', desc: 'Ancient cybernetic plasma beast with blazing horn accents.', icon: '🐉' },
{ id: 'glitch', name: 'GLITCH ENTITY', type: 'ANOMALY', priceBits: 10000, priceOrbs: 0, rarity: 'LEGENDARY', desc: 'Fragmented corrupted code matrix with chromatic tearing.', icon: '👾' },
{ id: 'valkyrie', name: 'APEX VALKYRIE', type: 'AERO', priceBits: 0, priceOrbs: 35, rarity: 'MYTHIC', desc: 'Supersonic aero-winged interceptor engineered for orbital flight.', icon: '🚀' },
{ id: 'vortex', name: 'VORTEX PROTO', type: 'ALIEN', priceBits: 0, priceOrbs: 45, rarity: 'MYTHIC', desc: 'Extraterrestrial singularity probe with shifting energy rings.', icon: '🛸' },
{ id: 'emperor', name: 'CYBER EMPEROR', type: 'OMEGA SOVEREIGN', priceBits: 0, priceOrbs: 60, rarity: 'OMEGA', desc: 'The golden sovereign core ruler of the entire Cyber Universe.', icon: '👑' }
];
export const TRAILS_CATALOG = [
{ id: 'neon', name: 'NEON CYAN', priceBits: 0, priceOrbs: 0, rarity: 'COMMON', desc: 'Standard vibrant blue plasma trail.' },
{ id: 'fire', name: 'SOLAR FLARE', priceBits: 1000, priceOrbs: 0, rarity: 'RARE', desc: 'Incandescent red and orange combustion particles.' },
{ id: 'matrix', name: 'MATRIX BINARY', priceBits: 1500, priceOrbs: 0, rarity: 'RARE', desc: 'Cascading digital green data code stream.' },
{ id: 'rainbow', name: 'PRISM RAINBOW', priceBits: 2500, priceOrbs: 0, rarity: 'EPIC', desc: 'Full-spectrum RGB chromatic shifting trail.' },
{ id: 'spark', name: 'GOLDEN VOLTAGE', priceBits: 3500, priceOrbs: 0, rarity: 'EPIC', desc: 'High-voltage electric arcs and golden sparks.' },
{ id: 'void', name: 'DARK VOID', priceBits: 0, priceOrbs: 25, rarity: 'MYTHIC', desc: 'Antimatter purple shockwaves pulling ambient light.' },
{ id: 'hyper', name: 'HYPERDRIVE GLITCH', priceBits: 0, priceOrbs: 40, rarity: 'OMEGA', desc: 'Displaced warp frames with rainbow glitch displacement.' }
];
export const PASS_TIERS_REWARDS = [
{ tier: 1, xpReq: 100, rewardType: 'bits', amount: 500, label: '🪙 500 BITS', icon: '🪙' },
{ tier: 2, xpReq: 250, rewardType: 'orbs', amount: 10, label: '💎 10 ORBS', icon: '💎' },
{ tier: 3, xpReq: 450, rewardType: 'character', itemId: 'mecha', label: '🤖 MECHA-01 TITAN', icon: '🤖' },
{ tier: 4, xpReq: 700, rewardType: 'bits', amount: 1500, label: '🪙 1,500 BITS', icon: '🪙' },
{ tier: 5, xpReq: 1000, rewardType: 'trail', itemId: 'rainbow', label: '🌈 PRISM RAINBOW TRAIL', icon: '🌈' },
{ tier: 6, xpReq: 1400, rewardType: 'orbs', amount: 25, label: '💎 25 ORBS', icon: '💎' },
{ tier: 7, xpReq: 1900, rewardType: 'character', itemId: 'reaper', label: '💀 CYBER REAPER', icon: '💀' },
{ tier: 8, xpReq: 2500, rewardType: 'bits', amount: 3000, label: '🪙 3,000 BITS', icon: '🪙' },
{ tier: 9, xpReq: 3200, rewardType: 'trail', itemId: 'void', label: '🌌 DARK VOID TRAIL', icon: '🌌' },
{ tier: 10, xpReq: 4000, rewardType: 'character', itemId: 'emperor', label: '👑 CYBER EMPEROR (OMEGA)', icon: '👑' }
];
export const DEFAULT_TIER_CONFIG = {
selectedTier: 'ALL',
speedModifier: 1.0,
hitboxMode: 'NORMAL',
autoCheckpoints: false,
pulseIntensity: 1.0,
ghostTrails: true
};
export const DEFAULT_GARAGE = {
characterId: 'classic',
cubeSkin: 'classic',
shipSkin: 'classic',
ufoSkin: 'classic',
waveSkin: 'classic',
ballSkin: 'classic',
robotSkin: 'classic',
primaryColor: '#00f0ff',
accentColor: '#ffd700',
trailType: 'neon'
};
export const DEFAULT_SETTINGS = {
masterVol: 0.7,
musicVol: 0.8,
sfxVol: 0.9,
crtScanlines: true,
bloomGlow: true,
screenShake: true,
showFPS: false,
visualizer: true
};
export const DEFAULT_STATS = {
totalJumps: 0,
totalAttempts: 0,
totalCrashes: 0,
totalPlaytimeSec: 0,
levelsCompleted: 0,
demonClears: 0,
coinsCollected: 0,
starsEarned: 0
};
export const ACHIEVEMENTS_LIST = [
{ id: 'first_jump', name: 'INITIALIZATION', desc: 'Perform your first jump.', icon: '⚡' },
{ id: 'beat_lvl_1', name: 'GRID SURVIVOR', desc: 'Complete Target 01: Initiation.', icon: '🛡️' },
{ id: 'beat_lvl_5', name: 'SYNTH RUNNER', desc: 'Complete Target 05: Synthwave Drift.', icon: '🌆' },
{ id: 'demon_slayer', name: 'DEMON SLAYER', desc: 'Conquer Target 10: Zero Point.', icon: '💀' },
{ id: 'omega_ascension', name: 'OMEGA ASCENDED', desc: 'Complete Target 12: Omega Nexus Core Meltdown.', icon: '👑' },
{ id: 'coin_hunter_1', name: 'CYBER ARCHIVIST', desc: 'Collect 3 Cyber Cores.', icon: '💎' },
{ id: 'coin_master', name: 'DATA MASTER', desc: 'Collect 18+ Cyber Cores across all sectors.', icon: '👑' },
{ id: 'wave_expert', name: 'RAZOR SHARP', desc: 'Travel 500 meters in Wave mode.', icon: '🌊' },
{ id: 'gravity_master', name: 'ZERO-G', desc: 'Flip gravity 50 times.', icon: '🌀' },
{ id: 'speed_demon', name: 'LUDICROUS SPEED', desc: 'Survive 4x Ludicrous speed for 5 seconds.', icon: '🚀' },
{ id: 'store_shopper', name: 'BLACK MARKET DEAL', desc: 'Purchase your first pilot character in the Store.', icon: '🛍️' },
{ id: 'pass_tier_5', name: 'CYBER PASS CADET', desc: 'Reach Tier 5 in the Cyber Season Pass.', icon: '📜' }
];
export class StorageManager {
static getCurrency() {
try {
const raw = localStorage.getItem(STORAGE_KEYS.CURRENCY);
return raw ? { ...DEFAULT_CURRENCY, ...JSON.parse(raw) } : { ...DEFAULT_CURRENCY };
} catch (e) {
return { ...DEFAULT_CURRENCY };
}
}
static saveCurrency(curr) {
try {
localStorage.setItem(STORAGE_KEYS.CURRENCY, JSON.stringify(curr));
} catch (e) {}
}
static addCurrency(bits = 0, orbs = 0) {
const curr = this.getCurrency();
curr.bits = Math.max(0, curr.bits + bits);
curr.orbs = Math.max(0, curr.orbs + orbs);
this.saveCurrency(curr);
return curr;
}
static spendCurrency(bits = 0, orbs = 0) {
const curr = this.getCurrency();
if (curr.bits >= bits && curr.orbs >= orbs) {
curr.bits -= bits;
curr.orbs -= orbs;
this.saveCurrency(curr);
return true;
}
return false;
}
static getUnlockedItems() {
try {
const raw = localStorage.getItem(STORAGE_KEYS.UNLOCKED_ITEMS);
const def = { characters: ['classic'], trails: ['neon'], palettes: ['#00f0ff', '#ffd700'] };
return raw ? { ...def, ...JSON.parse(raw) } : def;
} catch (e) {
return { characters: ['classic'], trails: ['neon'], palettes: ['#00f0ff', '#ffd700'] };
}
}
static isItemUnlocked(category, itemId) {
const inv = this.getUnlockedItems();
if (itemId === 'classic' || itemId === 'neon') return true;
return Array.isArray(inv[category]) && inv[category].includes(itemId);
}
static unlockItem(category, itemId) {
try {
const inv = this.getUnlockedItems();
if (!inv[category]) inv[category] = [];
if (!inv[category].includes(itemId)) {
inv[category].push(itemId);
localStorage.setItem(STORAGE_KEYS.UNLOCKED_ITEMS, JSON.stringify(inv));
if (category === 'characters') this.unlockAchievement('store_shopper');
return true;
}
} catch (e) {}
return false;
}
static canClaimDailyBonus() {
try {
const last = localStorage.getItem(STORAGE_KEYS.LAST_DAILY_CLAIM);
if (!last) return true;
const now = Date.now();
const diffHours = (now - parseInt(last, 10)) / (1000 * 60 * 60);
return diffHours >= 20; 
} catch (e) {
return true;
}
}
static claimDailyBonus() {
if (this.canClaimDailyBonus()) {
localStorage.setItem(STORAGE_KEYS.LAST_DAILY_CLAIM, Date.now().toString());
this.addCurrency(750, 5);
this.addCyberPassXP(150);
return { bits: 750, orbs: 5, xp: 150 };
}
return null;
}
static getDailyQuests() {
const defaultQuests = [
{ id: 'q_jumps', title: 'KINETIC VELOCITY', desc: 'Perform 40 jumps in any sector', goal: 40, current: 0, rewardBits: 400, rewardXP: 80, claimed: false },
{ id: 'q_hard', title: 'HIGH OVERDRIVE', desc: 'Clear any Hard or Omega Tier sector', goal: 1, current: 0, rewardBits: 600, rewardXP: 120, claimed: false },
{ id: 'q_coins', title: 'CORE ARCHIVIST', desc: 'Collect 2 Secret Cyber Cores', goal: 2, current: 0, rewardOrbs: 5, rewardXP: 100, claimed: false },
{ id: 'q_practice', title: 'SIMULATION PROTOCOL', desc: 'Survive 30 seconds in Practice Mode', goal: 30, current: 0, rewardBits: 350, rewardXP: 60, claimed: false }
];
try {
const raw = localStorage.getItem(STORAGE_KEYS.DAILY_QUESTS);
return raw ? JSON.parse(raw) : defaultQuests;
} catch (e) {
return defaultQuests;
}
}
static updateQuestProgress(questId, amount) {
try {
const quests = this.getDailyQuests();
const q = quests.find(item => item.id === questId);
if (q && !q.claimed) {
q.current = Math.min(q.goal, q.current + amount);
localStorage.setItem(STORAGE_KEYS.DAILY_QUESTS, JSON.stringify(quests));
}
} catch (e) {}
}
static claimQuestReward(questId) {
try {
const quests = this.getDailyQuests();
const q = quests.find(item => item.id === questId);
if (q && q.current >= q.goal && !q.claimed) {
q.claimed = true;
if (q.rewardBits) this.addCurrency(q.rewardBits, 0);
if (q.rewardOrbs) this.addCurrency(0, q.rewardOrbs);
if (q.rewardXP) this.addCyberPassXP(q.rewardXP);
localStorage.setItem(STORAGE_KEYS.DAILY_QUESTS, JSON.stringify(quests));
return q;
}
} catch (e) {}
return null;
}
static getCyberPassData() {
try {
const raw = localStorage.getItem(STORAGE_KEYS.CYBER_PASS);
const def = { currentXP: 320, claimedTiers: [1] };
return raw ? { ...def, ...JSON.parse(raw) } : def;
} catch (e) {
return { currentXP: 320, claimedTiers: [1] };
}
}
static addCyberPassXP(xp) {
try {
const pass = this.getCyberPassData();
pass.currentXP += xp;
localStorage.setItem(STORAGE_KEYS.CYBER_PASS, JSON.stringify(pass));
return pass;
} catch (e) {
return null;
}
}
static claimPassTier(tierNumber) {
try {
const pass = this.getCyberPassData();
const tierDef = PASS_TIERS_REWARDS.find(t => t.tier === tierNumber);
if (tierDef && pass.currentXP >= tierDef.xpReq && !pass.claimedTiers.includes(tierNumber)) {
pass.claimedTiers.push(tierNumber);
if (tierDef.rewardType === 'bits') this.addCurrency(tierDef.amount, 0);
if (tierDef.rewardType === 'orbs') this.addCurrency(0, tierDef.amount);
if (tierDef.rewardType === 'character') this.unlockItem('characters', tierDef.itemId);
if (tierDef.rewardType === 'trail') this.unlockItem('trails', tierDef.itemId);
localStorage.setItem(STORAGE_KEYS.CYBER_PASS, JSON.stringify(pass));
if (tierNumber >= 5) this.unlockAchievement('pass_tier_5');
return tierDef;
}
} catch (e) {}
return null;
}
static getBestScore(levelId) {
try {
const raw = localStorage.getItem(`${STORAGE_KEYS.BEST_SCORES}_${levelId}`);
return raw ? parseInt(raw, 10) : 0;
} catch (e) {
return 0;
}
}
static setBestScore(levelId, pct) {
try {
const current = this.getBestScore(levelId);
if (pct > current) {
localStorage.setItem(`${STORAGE_KEYS.BEST_SCORES}_${levelId}`, Math.min(100, pct));
if (pct >= 100 && current < 100) {
this.incrementStat('levelsCompleted', 1);
this.addCurrency(250, 2);
this.addCyberPassXP(100);
if (levelId === 1) this.unlockAchievement('beat_lvl_1');
if (levelId === 5) this.unlockAchievement('beat_lvl_5');
if (levelId === 10) {
this.incrementStat('demonClears', 1);
this.unlockAchievement('demon_slayer');
}
if (levelId === 12) {
this.unlockAchievement('omega_ascension');
}
}
return true;
}
} catch (e) {}
return false;
}
static getCoins(levelId) {
try {
const raw = localStorage.getItem(`${STORAGE_KEYS.LEVEL_COINS}_${levelId}`);
return raw ? JSON.parse(raw) : [false, false, false];
} catch (e) {
return [false, false, false];
}
}
static collectCoin(levelId, coinIndex) {
try {
const coins = this.getCoins(levelId);
if (!coins[coinIndex]) {
coins[coinIndex] = true;
localStorage.setItem(`${STORAGE_KEYS.LEVEL_COINS}_${levelId}`, JSON.stringify(coins));
this.incrementStat('coinsCollected', 1);
this.addCurrency(100, 1);
this.addCyberPassXP(50);
const total = this.getTotalCoinsCollected();
if (total >= 3) this.unlockAchievement('coin_hunter_1');
if (total >= 18) this.unlockAchievement('coin_master');
return true;
}
} catch (e) {}
return false;
}
static getTotalCoinsCollected() {
let count = 0;
for (let i = 1; i <= 12; i++) {
const c = this.getCoins(i);
count += c.filter(Boolean).length;
}
return count;
}
static getTierConfig() {
try {
const raw = localStorage.getItem(STORAGE_KEYS.TIER_CONFIG);
return raw ? { ...DEFAULT_TIER_CONFIG, ...JSON.parse(raw) } : { ...DEFAULT_TIER_CONFIG };
} catch (e) {
return { ...DEFAULT_TIER_CONFIG };
}
}
static saveTierConfig(config) {
try {
localStorage.setItem(STORAGE_KEYS.TIER_CONFIG, JSON.stringify(config));
} catch (e) {}
}
static getTotalStarsEarned(levels) {
let stars = 0;
levels.forEach(lvl => {
if (this.getBestScore(lvl.id) >= 100) {
stars += lvl.stars || 1;
}
});
return stars;
}
static getGarage() {
try {
const raw = localStorage.getItem(STORAGE_KEYS.GARAGE);
return raw ? { ...DEFAULT_GARAGE, ...JSON.parse(raw) } : { ...DEFAULT_GARAGE };
} catch (e) {
return { ...DEFAULT_GARAGE };
}
}
static saveGarage(config) {
try {
localStorage.setItem(STORAGE_KEYS.GARAGE, JSON.stringify(config));
} catch (e) {}
}
static getSettings() {
try {
const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
} catch (e) {
return { ...DEFAULT_SETTINGS };
}
}
static saveSettings(config) {
try {
localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(config));
} catch (e) {}
}
static getStats() {
try {
const raw = localStorage.getItem(STORAGE_KEYS.STATS);
return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : { ...DEFAULT_STATS };
} catch (e) {
return { ...DEFAULT_STATS };
}
}
static incrementStat(key, amount = 1) {
try {
const stats = this.getStats();
if (stats[key] !== undefined) {
stats[key] += amount;
localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
}
} catch (e) {}
}
static getAchievements() {
try {
const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
return raw ? JSON.parse(raw) : [];
} catch (e) {
return [];
}
}
static unlockAchievement(id) {
try {
const unlocked = this.getAchievements();
if (!unlocked.includes(id)) {
unlocked.push(id);
localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(unlocked));
this.addCurrency(500, 5);
this.addCyberPassXP(200);
const item = ACHIEVEMENTS_LIST.find(a => a.id === id);
if (item && window.showAchievementToast) {
window.showAchievementToast(item);
}
return true;
}
} catch (e) {}
return false;
}
static getCustomLevels() {
try {
const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_LEVELS);
return raw ? JSON.parse(raw) : [];
} catch (e) {
return [];
}
}
static saveCustomLevel(lvl) {
try {
const list = this.getCustomLevels();
const existingIdx = list.findIndex(l => l.id === lvl.id);
if (existingIdx >= 0) {
list[existingIdx] = lvl;
} else {
list.push(lvl);
}
localStorage.setItem(STORAGE_KEYS.CUSTOM_LEVELS, JSON.stringify(list));
this.unlockAchievement('level_architect');
return true;
} catch (e) {
return false;
}
}
static deleteCustomLevel(lvlId) {
try {
let list = this.getCustomLevels();
list = list.filter(l => l.id !== lvlId);
localStorage.setItem(STORAGE_KEYS.CUSTOM_LEVELS, JSON.stringify(list));
return true;
} catch (e) {
return false;
}
}
static approveAllLevelsAndTrophies() {
try {
for (let i = 1; i <= 12; i++) {
localStorage.setItem(`${STORAGE_KEYS.BEST_SCORES}_${i}`, '100');
localStorage.setItem(`${STORAGE_KEYS.LEVEL_COINS}_${i}`, JSON.stringify([true, true, true]));
}
const allIds = ACHIEVEMENTS_LIST.map(a => a.id);
localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(allIds));
const stats = this.getStats();
stats.levelsCompleted = 12;
stats.demonClears = Math.max(3, stats.demonClears);
stats.coinsCollected = 36;
stats.starsEarned = 45;
stats.totalJumps = Math.max(1200, stats.totalJumps);
localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
const allChars = CHARACTERS_CATALOG.map(c => c.id);
const allTrails = TRAILS_CATALOG.map(t => t.id);
localStorage.setItem(STORAGE_KEYS.UNLOCKED_ITEMS, JSON.stringify({
characters: allChars,
trails: allTrails,
palettes: ['#00f0ff', '#ffd700', '#ff003c', '#39ff14', '#b026ff', '#ffffff']
}));
this.addCurrency(50000, 500);
this.addCyberPassXP(5000);
return true;
} catch (e) {
return false;
}
}
static resetAllProgression() {
try {
for (let i = 1; i <= 12; i++) {
localStorage.removeItem(`${STORAGE_KEYS.BEST_SCORES}_${i}`);
localStorage.removeItem(`${STORAGE_KEYS.LEVEL_COINS}_${i}`);
}
localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
localStorage.removeItem(STORAGE_KEYS.STATS);
localStorage.removeItem(STORAGE_KEYS.OAUTH_PROFILE);
localStorage.removeItem(STORAGE_KEYS.CURRENCY);
localStorage.removeItem(STORAGE_KEYS.UNLOCKED_ITEMS);
localStorage.removeItem(STORAGE_KEYS.CYBER_PASS);
localStorage.removeItem(STORAGE_KEYS.DAILY_QUESTS);
return true;
} catch (e) {
return false;
}
}
}