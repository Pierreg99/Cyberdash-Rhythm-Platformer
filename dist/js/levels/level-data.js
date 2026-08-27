import { BASE_TILE_SIZE } from '../engine/player.js';
import { OBJECT_TYPES } from '../engine/physics.js';
export const LEVELS = [
{
id: 1,
tier: "EASY",
name: "INITIATION",
subtitle: "The Genesis Matrix",
desc: "Master kinetic jumps, yellow pads, jump orbs, and spacious ship flight.",
diff: "EASY",
stars: 1,
length: 200,
color: "#00f0ff",
bg: "#050518",
forms: ["CUBE", "SHIP"],
audioTrack: { bpm: 128, rootFreq: 32.70, scale: "AEOLIAN" },
data: [
[8, 0, OBJECT_TYPES.BLOCK], [9, 0, OBJECT_TYPES.BLOCK], [10, 0, OBJECT_TYPES.BLOCK],
[14, 0, OBJECT_TYPES.SPIKE],
[18, 0, OBJECT_TYPES.BLOCK], [19, 0, OBJECT_TYPES.BLOCK],
[23, 0, OBJECT_TYPES.SPIKE],
[27, 0, OBJECT_TYPES.BLOCK], [28, 1, OBJECT_TYPES.BLOCK], [29, 2, OBJECT_TYPES.BLOCK],
[33, 0, OBJECT_TYPES.PAD_YELLOW],
[37, 3, OBJECT_TYPES.ORB_YELLOW],
[38, 2, OBJECT_TYPES.CYBER_COIN, 0],
[42, 0, OBJECT_TYPES.BLOCK], [43, 0, OBJECT_TYPES.BLOCK],
[48, 0, OBJECT_TYPES.PORTAL_SHIP],
[54, 2, OBJECT_TYPES.BLOCK], [60, 5, OBJECT_TYPES.BLOCK],
[66, 1, OBJECT_TYPES.BLOCK], [72, 4, OBJECT_TYPES.BLOCK],
[76, 5, OBJECT_TYPES.CYBER_COIN, 1],
[80, 2, OBJECT_TYPES.BLOCK],
[88, 0, OBJECT_TYPES.PORTAL_CUBE],
[94, 0, OBJECT_TYPES.SPIKE],
[98, 0, OBJECT_TYPES.PAD_PINK], [103, 3, OBJECT_TYPES.ORB_YELLOW],
[108, 0, OBJECT_TYPES.BLOCK], [109, 1, OBJECT_TYPES.BLOCK],
[114, 0, OBJECT_TYPES.SPIKE], [115, 0, OBJECT_TYPES.SPIKE],
[120, 0, OBJECT_TYPES.PAD_YELLOW], [125, 4, OBJECT_TYPES.ORB_YELLOW],
[129, 3, OBJECT_TYPES.CYBER_COIN, 2],
[134, 0, OBJECT_TYPES.BLOCK], [135, 0, OBJECT_TYPES.BLOCK],
[140, 0, OBJECT_TYPES.SPIKE], [145, 0, OBJECT_TYPES.PAD_YELLOW],
[152, 0, OBJECT_TYPES.BLOCK], [153, 1, OBJECT_TYPES.BLOCK], [154, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 2,
tier: "EASY",
name: "GLOW MATRIX",
subtitle: "Emerald Neon Sanctuary",
desc: "Relaxing rhythm jumps with pink bounce pads and smooth UFO flight.",
diff: "EASY",
stars: 1,
length: 220,
color: "#39ff14",
bg: "#051808",
forms: ["CUBE", "UFO"],
audioTrack: { bpm: 132, rootFreq: 34.65, scale: "PENTATONIC" },
data: [
[8, 0, OBJECT_TYPES.BLOCK], [9, 0, OBJECT_TYPES.BLOCK],
[13, 0, OBJECT_TYPES.PAD_PINK], [18, 3, OBJECT_TYPES.ORB_PINK],
[22, 0, OBJECT_TYPES.BLOCK], [23, 1, OBJECT_TYPES.BLOCK],
[28, 0, OBJECT_TYPES.SPIKE],
[32, 0, OBJECT_TYPES.PAD_YELLOW], [36, 4, OBJECT_TYPES.CYBER_COIN, 0],
[40, 0, OBJECT_TYPES.PORTAL_UFO],
[46, 2, OBJECT_TYPES.SAWBLADE], [52, 5, OBJECT_TYPES.SAWBLADE],
[58, 2, OBJECT_TYPES.SAWBLADE], [64, 4, OBJECT_TYPES.CYBER_COIN, 1],
[70, 3, OBJECT_TYPES.SAWBLADE],
[78, 0, OBJECT_TYPES.PORTAL_CUBE],
[84, 0, OBJECT_TYPES.PAD_PINK], [89, 3, OBJECT_TYPES.ORB_PINK],
[94, 0, OBJECT_TYPES.BLOCK], [95, 1, OBJECT_TYPES.BLOCK],
[100, 0, OBJECT_TYPES.SPIKE],
[106, 0, OBJECT_TYPES.PAD_YELLOW], [112, 4, OBJECT_TYPES.ORB_YELLOW],
[116, 3, OBJECT_TYPES.CYBER_COIN, 2],
[122, 0, OBJECT_TYPES.BLOCK], [123, 1, OBJECT_TYPES.BLOCK], [124, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 3,
tier: "EASY",
name: "CYBER CHILL",
subtitle: "Atmospheric Horizon",
desc: "Gentle cruise introducing wide wave corridors and rhythmic jump pads.",
diff: "NORMAL",
stars: 2,
length: 240,
color: "#00f0ff",
bg: "#05101a",
forms: ["CUBE", "WAVE"],
audioTrack: { bpm: 135, rootFreq: 32.70, scale: "DORIAN" },
data: [
[8, 0, OBJECT_TYPES.SPIKE], [12, 0, OBJECT_TYPES.PAD_YELLOW],
[17, 3, OBJECT_TYPES.ORB_YELLOW], [22, 0, OBJECT_TYPES.BLOCK], [23, 1, OBJECT_TYPES.BLOCK],
[28, 0, OBJECT_TYPES.PORTAL_WAVE],
[34, 2, OBJECT_TYPES.BLOCK], [34, 6, OBJECT_TYPES.BLOCK],
[40, 1, OBJECT_TYPES.BLOCK], [40, 5, OBJECT_TYPES.BLOCK],
[46, 3, OBJECT_TYPES.CYBER_COIN, 0],
[52, 2, OBJECT_TYPES.BLOCK], [52, 6, OBJECT_TYPES.BLOCK],
[58, 0, OBJECT_TYPES.PORTAL_CUBE],
[64, 0, OBJECT_TYPES.PAD_PINK], [69, 3, OBJECT_TYPES.ORB_PINK],
[74, 0, OBJECT_TYPES.SPIKE], [78, 0, OBJECT_TYPES.PAD_YELLOW],
[83, 4, OBJECT_TYPES.ORB_YELLOW], [87, 3, OBJECT_TYPES.CYBER_COIN, 1],
[92, 0, OBJECT_TYPES.BLOCK], [93, 1, OBJECT_TYPES.BLOCK],
[98, 0, OBJECT_TYPES.SPIKE], [104, 0, OBJECT_TYPES.PAD_RED],
[112, 5, OBJECT_TYPES.CYBER_COIN, 2],
[118, 0, OBJECT_TYPES.BLOCK], [119, 1, OBJECT_TYPES.BLOCK], [120, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 4,
tier: "EASY",
name: "KINETIC SURGE",
subtitle: "Sub-Zero Particle Grid",
desc: "Rhythmic double spikes, UFO aerial hops, and gravity flip pads.",
diff: "NORMAL",
stars: 2,
length: 260,
color: "#ff003c",
bg: "#18050a",
forms: ["CUBE", "UFO"],
audioTrack: { bpm: 138, rootFreq: 36.71, scale: "PHRYGIAN" },
data: [
[8, 0, OBJECT_TYPES.SPIKE], [9, 0, OBJECT_TYPES.SPIKE],
[14, 0, OBJECT_TYPES.PAD_YELLOW], [19, 4, OBJECT_TYPES.ORB_YELLOW],
[23, 0, OBJECT_TYPES.BLOCK], [24, 1, OBJECT_TYPES.BLOCK],
[29, 0, OBJECT_TYPES.SPEED_2X],
[33, 0, OBJECT_TYPES.PAD_PINK], [38, 3, OBJECT_TYPES.ORB_PINK],
[41, 4, OBJECT_TYPES.CYBER_COIN, 0],
[44, 0, OBJECT_TYPES.BLOCK], [45, 0, OBJECT_TYPES.BLOCK],
[50, 0, OBJECT_TYPES.PAD_BLUE_GRAV], [55, 3, OBJECT_TYPES.ORB_BLUE_GRAV],
[60, 0, OBJECT_TYPES.BLOCK], [61, 1, OBJECT_TYPES.BLOCK],
[66, 0, OBJECT_TYPES.SPIKE], [70, 0, OBJECT_TYPES.PAD_YELLOW],
[74, 2, OBJECT_TYPES.CYBER_COIN, 1],
[80, 0, OBJECT_TYPES.PORTAL_UFO],
[86, 2, OBJECT_TYPES.SAWBLADE], [92, 5, OBJECT_TYPES.SAWBLADE],
[98, 2, OBJECT_TYPES.SAWBLADE], [104, 4, OBJECT_TYPES.CYBER_COIN, 2],
[110, 3, OBJECT_TYPES.SAWBLADE],
[118, 0, OBJECT_TYPES.SPEED_1X], [120, 0, OBJECT_TYPES.PORTAL_CUBE],
[126, 0, OBJECT_TYPES.PAD_RED], [134, 5, OBJECT_TYPES.ORB_RED],
[142, 0, OBJECT_TYPES.BLOCK], [143, 0, OBJECT_TYPES.BLOCK],
[148, 0, OBJECT_TYPES.SPIKE], [149, 0, OBJECT_TYPES.SPIKE],
[155, 0, OBJECT_TYPES.PAD_YELLOW],
[162, 0, OBJECT_TYPES.BLOCK], [163, 1, OBJECT_TYPES.BLOCK], [164, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 5,
tier: "HARD",
name: "SYNTHWAVE DRIFT",
subtitle: "Neon Highway Razor",
desc: "High-speed Wave diagonal corridors and mini size portals.",
diff: "HARD",
stars: 3,
length: 320,
color: "#b026ff",
bg: "#120520",
forms: ["CUBE", "WAVE", "SHIP"],
audioTrack: { bpm: 144, rootFreq: 41.20, scale: "DORIAN" },
data: [
[8, 0, OBJECT_TYPES.SPIKE], [12, 0, OBJECT_TYPES.PAD_YELLOW],
[17, 4, OBJECT_TYPES.ORB_PINK], [21, 2, OBJECT_TYPES.ORB_YELLOW],
[26, 0, OBJECT_TYPES.BLOCK], [27, 1, OBJECT_TYPES.BLOCK],
[33, 0, OBJECT_TYPES.PORTAL_WAVE],
[38, 2, OBJECT_TYPES.BLOCK], [38, 5, OBJECT_TYPES.BLOCK],
[44, 1, OBJECT_TYPES.BLOCK], [44, 4, OBJECT_TYPES.BLOCK],
[49, 3, OBJECT_TYPES.CYBER_COIN, 0],
[54, 2, OBJECT_TYPES.SAWBLADE], [60, 5, OBJECT_TYPES.SAWBLADE],
[66, 2, OBJECT_TYPES.SAWBLADE],
[72, 0, OBJECT_TYPES.PORTAL_MINI],
[77, 2, OBJECT_TYPES.BLOCK], [77, 6, OBJECT_TYPES.BLOCK],
[82, 1, OBJECT_TYPES.BLOCK], [82, 5, OBJECT_TYPES.BLOCK],
[87, 3, OBJECT_TYPES.CYBER_COIN, 1],
[92, 0, OBJECT_TYPES.PORTAL_GROWTH],
[98, 0, OBJECT_TYPES.PORTAL_CUBE],
[104, 0, OBJECT_TYPES.PAD_BLUE_GRAV], [110, 4, OBJECT_TYPES.ORB_GREEN_GRAV],
[116, 0, OBJECT_TYPES.BLOCK], [117, 0, OBJECT_TYPES.BLOCK],
[123, 0, OBJECT_TYPES.PAD_YELLOW], [128, 4, OBJECT_TYPES.ORB_YELLOW],
[134, 3, OBJECT_TYPES.CYBER_COIN, 2],
[140, 0, OBJECT_TYPES.BLOCK], [141, 1, OBJECT_TYPES.BLOCK], [142, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 6,
tier: "HARD",
name: "NEON OVERDRIVE",
subtitle: "Toxic Reactor Core",
desc: "Ball mode gravity switches and 3x hyper speed reaction sequences.",
diff: "HARD",
stars: 3,
length: 340,
color: "#39ff14",
bg: "#051808",
forms: ["CUBE", "BALL", "ROBOT"],
audioTrack: { bpm: 150, rootFreq: 49.00, scale: "PENTATONIC" },
data: [
[8, 0, OBJECT_TYPES.PAD_YELLOW], [13, 4, OBJECT_TYPES.ORB_PINK],
[17, 2, OBJECT_TYPES.ORB_BLACK_SLAM], [19, 0, OBJECT_TYPES.PAD_RED],
[25, 5, OBJECT_TYPES.CYBER_COIN, 0],
[29, 0, OBJECT_TYPES.BLOCK], [30, 1, OBJECT_TYPES.BLOCK],
[36, 0, OBJECT_TYPES.PORTAL_BALL],
[41, 0, OBJECT_TYPES.SPIKE], [44, 3, OBJECT_TYPES.BLOCK],
[49, 0, OBJECT_TYPES.SPIKE], [53, 4, OBJECT_TYPES.BLOCK],
[58, 0, OBJECT_TYPES.SPIKE], [62, 3, OBJECT_TYPES.BLOCK],
[67, 2, OBJECT_TYPES.CYBER_COIN, 1],
[74, 0, OBJECT_TYPES.PORTAL_ROBOT],
[80, 0, OBJECT_TYPES.SPIKE], [81, 0, OBJECT_TYPES.SPIKE],
[86, 0, OBJECT_TYPES.BLOCK], [87, 1, OBJECT_TYPES.BLOCK], [88, 2, OBJECT_TYPES.BLOCK],
[94, 0, OBJECT_TYPES.SPIKE], [95, 0, OBJECT_TYPES.SPIKE],
[101, 4, OBJECT_TYPES.CYBER_COIN, 2],
[108, 0, OBJECT_TYPES.PAD_YELLOW], [114, 0, OBJECT_TYPES.PORTAL_CUBE],
[120, 0, OBJECT_TYPES.PAD_YELLOW], [125, 4, OBJECT_TYPES.ORB_RED],
[132, 0, OBJECT_TYPES.BLOCK], [133, 1, OBJECT_TYPES.BLOCK], [134, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 7,
tier: "HARD",
name: "PULSE REACTOR",
subtitle: "Electromagnetic Chamber",
desc: "Precision Robot booster jumps and rapid mid-air gravity switches.",
diff: "HARDER",
stars: 4,
length: 360,
color: "#ff7700",
bg: "#180c04",
forms: ["CUBE", "ROBOT", "BALL"],
audioTrack: { bpm: 154, rootFreq: 38.89, scale: "AEOLIAN" },
data: [
[8, 0, OBJECT_TYPES.SPIKE], [11, 0, OBJECT_TYPES.PAD_RED],
[18, 4, OBJECT_TYPES.ORB_BLUE_GRAV], [23, 2, OBJECT_TYPES.ORB_GREEN_GRAV],
[27, 4, OBJECT_TYPES.CYBER_COIN, 0],
[32, 0, OBJECT_TYPES.PORTAL_ROBOT],
[38, 0, OBJECT_TYPES.SPIKE], [39, 0, OBJECT_TYPES.SPIKE],
[44, 0, OBJECT_TYPES.BLOCK], [45, 1, OBJECT_TYPES.BLOCK], [46, 2, OBJECT_TYPES.BLOCK],
[52, 0, OBJECT_TYPES.SPIKE], [53, 0, OBJECT_TYPES.SPIKE], [54, 0, OBJECT_TYPES.SPIKE],
[60, 4, OBJECT_TYPES.CYBER_COIN, 1],
[66, 0, OBJECT_TYPES.PORTAL_BALL],
[71, 0, OBJECT_TYPES.SPIKE], [74, 3, OBJECT_TYPES.BLOCK],
[78, 0, OBJECT_TYPES.SPIKE], [82, 4, OBJECT_TYPES.BLOCK],
[88, 0, OBJECT_TYPES.PORTAL_CUBE],
[94, 0, OBJECT_TYPES.PAD_BLUE_GRAV], [99, 4, OBJECT_TYPES.ORB_YELLOW],
[104, 3, OBJECT_TYPES.CYBER_COIN, 2],
[110, 0, OBJECT_TYPES.BLOCK], [111, 1, OBJECT_TYPES.BLOCK], [112, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 8,
tier: "HARD",
name: "HYPERDRIVE OUTRUN",
subtitle: "Turbo Laser Grid",
desc: "3x Hyper speed rush through sawblade tunnels and mini wave mazes.",
diff: "HARDER",
stars: 4,
length: 380,
color: "#ff00b7",
bg: "#180414",
forms: ["CUBE", "WAVE", "SHIP"],
audioTrack: { bpm: 158, rootFreq: 43.65, scale: "DORIAN" },
data: [
[8, 0, OBJECT_TYPES.SPEED_3X], [10, 0, OBJECT_TYPES.PAD_YELLOW],
[15, 3, OBJECT_TYPES.ORB_PINK], [19, 0, OBJECT_TYPES.BLOCK], [20, 1, OBJECT_TYPES.BLOCK],
[26, 0, OBJECT_TYPES.PORTAL_WAVE],
[31, 2, OBJECT_TYPES.SAWBLADE], [36, 5, OBJECT_TYPES.SAWBLADE],
[41, 1, OBJECT_TYPES.SAWBLADE], [46, 4, OBJECT_TYPES.CYBER_COIN, 0],
[51, 2, OBJECT_TYPES.SAWBLADE], [56, 5, OBJECT_TYPES.SAWBLADE],
[62, 0, OBJECT_TYPES.PORTAL_SHIP],
[68, 2, OBJECT_TYPES.SAWBLADE], [74, 5, OBJECT_TYPES.SAWBLADE],
[80, 1, OBJECT_TYPES.CYBER_COIN, 1], [86, 4, OBJECT_TYPES.SAWBLADE],
[94, 0, OBJECT_TYPES.SPEED_1X], [96, 0, OBJECT_TYPES.PORTAL_CUBE],
[102, 0, OBJECT_TYPES.PAD_RED], [110, 5, OBJECT_TYPES.ORB_RED],
[115, 3, OBJECT_TYPES.CYBER_COIN, 2],
[122, 0, OBJECT_TYPES.BLOCK], [123, 1, OBJECT_TYPES.BLOCK], [124, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 9,
tier: "OMEGA",
name: "QUANTUM COLLAPSE",
subtitle: "Corrupted Singularity",
desc: "Rapid vehicle switching, precision wave angles, and dual gravity arcs.",
diff: "INSANE",
stars: 5,
length: 440,
color: "#ffd700",
bg: "#181404",
forms: ["CUBE", "WAVE", "BALL", "ROBOT"],
audioTrack: { bpm: 162, rootFreq: 32.70, scale: "HARMONIC_MIN" },
data: [
[8, 0, OBJECT_TYPES.SPIKE], [10, 0, OBJECT_TYPES.PAD_RED],
[18, 5, OBJECT_TYPES.ORB_BLUE_GRAV], [23, 2, OBJECT_TYPES.ORB_GREEN_GRAV],
[28, 4, OBJECT_TYPES.CYBER_COIN, 0],
[32, 0, OBJECT_TYPES.BLOCK], [33, 1, OBJECT_TYPES.BLOCK],
[39, 0, OBJECT_TYPES.PORTAL_WAVE],
[44, 2, OBJECT_TYPES.BLOCK], [44, 5, OBJECT_TYPES.BLOCK],
[50, 1, OBJECT_TYPES.BLOCK], [50, 4, OBJECT_TYPES.BLOCK],
[56, 3, OBJECT_TYPES.SAWBLADE], [62, 2, OBJECT_TYPES.SAWBLADE],
[67, 4, OBJECT_TYPES.CYBER_COIN, 1],
[74, 0, OBJECT_TYPES.PORTAL_BALL],
[79, 0, OBJECT_TYPES.SPIKE], [82, 3, OBJECT_TYPES.BLOCK],
[86, 0, OBJECT_TYPES.SPIKE], [90, 4, OBJECT_TYPES.BLOCK],
[97, 0, OBJECT_TYPES.PORTAL_ROBOT],
[103, 0, OBJECT_TYPES.SPIKE], [104, 0, OBJECT_TYPES.SPIKE],
[110, 0, OBJECT_TYPES.BLOCK], [111, 1, OBJECT_TYPES.BLOCK],
[117, 4, OBJECT_TYPES.CYBER_COIN, 2],
[124, 0, OBJECT_TYPES.PORTAL_CUBE],
[130, 0, OBJECT_TYPES.PAD_YELLOW], [136, 4, OBJECT_TYPES.ORB_YELLOW],
[144, 0, OBJECT_TYPES.BLOCK], [145, 1, OBJECT_TYPES.BLOCK], [146, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 10,
tier: "OMEGA",
name: "ZERO POINT",
subtitle: "The Apex Nexus",
desc: "All 6 vehicle forms converge in the ultimate 170 BPM kinetic trial.",
diff: "DEMON",
stars: 6,
length: 500,
color: "#ff003c",
bg: "#050005",
forms: ["CUBE", "SHIP", "UFO", "WAVE", "BALL", "ROBOT"],
audioTrack: { bpm: 170, rootFreq: 36.71, scale: "PHRYGIAN" },
data: [
[8, 0, OBJECT_TYPES.SPIKE], [9, 0, OBJECT_TYPES.SPIKE],
[13, 0, OBJECT_TYPES.PAD_YELLOW], [17, 4, OBJECT_TYPES.ORB_PINK],
[21, 2, OBJECT_TYPES.ORB_BLUE_GRAV], [25, 3, OBJECT_TYPES.ORB_GREEN_GRAV],
[29, 4, OBJECT_TYPES.CYBER_COIN, 0],
[35, 0, OBJECT_TYPES.PORTAL_WAVE],
[40, 2, OBJECT_TYPES.SAWBLADE], [45, 5, OBJECT_TYPES.SAWBLADE],
[50, 1, OBJECT_TYPES.SAWBLADE], [55, 4, OBJECT_TYPES.SAWBLADE],
[60, 3, OBJECT_TYPES.CYBER_COIN, 1],
[67, 0, OBJECT_TYPES.PORTAL_BALL],
[72, 0, OBJECT_TYPES.SPIKE], [75, 3, OBJECT_TYPES.BLOCK],
[79, 0, OBJECT_TYPES.SPIKE], [83, 4, OBJECT_TYPES.BLOCK],
[90, 0, OBJECT_TYPES.PORTAL_UFO],
[96, 2, OBJECT_TYPES.SAWBLADE], [101, 5, OBJECT_TYPES.SAWBLADE],
[108, 0, OBJECT_TYPES.PORTAL_ROBOT],
[114, 0, OBJECT_TYPES.SPIKE], [115, 0, OBJECT_TYPES.SPIKE],
[120, 0, OBJECT_TYPES.BLOCK], [121, 1, OBJECT_TYPES.BLOCK],
[127, 4, OBJECT_TYPES.CYBER_COIN, 2],
[134, 0, OBJECT_TYPES.PORTAL_SHIP],
[140, 2, OBJECT_TYPES.SAWBLADE], [146, 5, OBJECT_TYPES.SAWBLADE],
[152, 1, OBJECT_TYPES.SAWBLADE],
[160, 0, OBJECT_TYPES.PORTAL_CUBE],
[165, 0, OBJECT_TYPES.PAD_RED], [173, 6, OBJECT_TYPES.ORB_RED],
[180, 0, OBJECT_TYPES.BLOCK], [181, 1, OBJECT_TYPES.BLOCK], [182, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 11,
tier: "OMEGA",
name: "VOID HORIZON",
subtitle: "Black Hole Event Horizon",
desc: "Relentless 4x Ludicrous speed test with black smash orbs and mini wave.",
diff: "DEMON",
stars: 6,
length: 520,
color: "#ffd700",
bg: "#000000",
forms: ["CUBE", "WAVE", "BALL", "SHIP"],
audioTrack: { bpm: 175, rootFreq: 32.70, scale: "HARMONIC_MIN" },
data: [
[8, 0, OBJECT_TYPES.SPEED_4X],
[11, 0, OBJECT_TYPES.PAD_YELLOW], [15, 3, OBJECT_TYPES.ORB_BLACK_SLAM],
[18, 0, OBJECT_TYPES.PAD_RED], [25, 4, OBJECT_TYPES.CYBER_COIN, 0],
[30, 0, OBJECT_TYPES.PORTAL_WAVE], [31, 0, OBJECT_TYPES.PORTAL_MINI],
[36, 2, OBJECT_TYPES.SAWBLADE], [41, 5, OBJECT_TYPES.SAWBLADE],
[46, 1, OBJECT_TYPES.SAWBLADE], [51, 4, OBJECT_TYPES.CYBER_COIN, 1],
[56, 2, OBJECT_TYPES.SAWBLADE],
[64, 0, OBJECT_TYPES.PORTAL_GROWTH], [65, 0, OBJECT_TYPES.PORTAL_BALL],
[70, 0, OBJECT_TYPES.SPIKE], [73, 3, OBJECT_TYPES.BLOCK],
[77, 0, OBJECT_TYPES.SPIKE], [81, 4, OBJECT_TYPES.BLOCK],
[88, 0, OBJECT_TYPES.PORTAL_SHIP],
[94, 2, OBJECT_TYPES.SAWBLADE], [100, 5, OBJECT_TYPES.SAWBLADE],
[106, 1, OBJECT_TYPES.CYBER_COIN, 2],
[114, 0, OBJECT_TYPES.SPEED_1X], [116, 0, OBJECT_TYPES.PORTAL_CUBE],
[122, 0, OBJECT_TYPES.PAD_RED], [130, 5, OBJECT_TYPES.ORB_RED],
[138, 0, OBJECT_TYPES.BLOCK], [139, 1, OBJECT_TYPES.BLOCK], [140, 2, OBJECT_TYPES.BLOCK]
]
},
{
id: 12,
tier: "OMEGA",
name: "OMEGA NEXUS",
subtitle: "Core Meltdown 
desc: "The absolute pinnacle of kinetic reflexes at 180 BPM across all dimensions.",
diff: "DEMON",
stars: 7,
length: 560,
color: "#b026ff",
bg: "#050010",
forms: ["CUBE", "SHIP", "UFO", "WAVE", "BALL", "ROBOT"],
audioTrack: { bpm: 180, rootFreq: 36.71, scale: "PHRYGIAN" },
data: [
[8, 0, OBJECT_TYPES.SPIKE], [10, 0, OBJECT_TYPES.PAD_RED],
[16, 5, OBJECT_TYPES.ORB_RED], [21, 3, OBJECT_TYPES.ORB_BLUE_GRAV],
[26, 4, OBJECT_TYPES.CYBER_COIN, 0],
[32, 0, OBJECT_TYPES.SPEED_3X], [34, 0, OBJECT_TYPES.PORTAL_WAVE],
[39, 2, OBJECT_TYPES.SAWBLADE], [44, 5, OBJECT_TYPES.SAWBLADE],
[49, 1, OBJECT_TYPES.SAWBLADE], [54, 4, OBJECT_TYPES.SAWBLADE],
[60, 0, OBJECT_TYPES.PORTAL_BALL],
[65, 0, OBJECT_TYPES.SPIKE], [68, 3, OBJECT_TYPES.BLOCK],
[72, 0, OBJECT_TYPES.SPIKE], [76, 4, OBJECT_TYPES.CYBER_COIN, 1],
[82, 0, OBJECT_TYPES.PORTAL_ROBOT],
[88, 0, OBJECT_TYPES.SPIKE], [89, 0, OBJECT_TYPES.SPIKE],
[94, 0, OBJECT_TYPES.BLOCK], [95, 1, OBJECT_TYPES.BLOCK],
[101, 0, OBJECT_TYPES.PORTAL_SHIP],
[107, 2, OBJECT_TYPES.SAWBLADE], [113, 5, OBJECT_TYPES.SAWBLADE],
[119, 1, OBJECT_TYPES.CYBER_COIN, 2],
[127, 0, OBJECT_TYPES.SPEED_1X], [129, 0, OBJECT_TYPES.PORTAL_CUBE],
[135, 0, OBJECT_TYPES.PAD_RED], [143, 6, OBJECT_TYPES.ORB_RED],
[150, 0, OBJECT_TYPES.BLOCK], [151, 1, OBJECT_TYPES.BLOCK], [152, 2, OBJECT_TYPES.BLOCK], [153, 3, OBJECT_TYPES.BLOCK]
]
}
];
export function drawLevelMap(ctx, levelData, camX, groundY, levelColor = '#00f0ff') {
const TS = BASE_TILE_SIZE;
const screenWidth = ctx.canvas.width;
const now = Date.now() * 0.005;
for (let i = 0; i < levelData.length; i++) {
const obj = levelData[i];
const ox = obj[0] * TS - camX;
if (ox > screenWidth + TS * 2) break;
if (ox < -TS * 2) continue;
const oy = groundY - (obj[1] + 1) * TS;
const type = obj[2];
const extra = obj[3];
ctx.save();
if (type === OBJECT_TYPES.BLOCK) {
ctx.fillStyle = '#0a0a14';
ctx.strokeStyle = levelColor;
ctx.lineWidth = 2;
ctx.shadowBlur = 8;
ctx.shadowColor = levelColor;
ctx.fillRect(ox, oy, TS, TS);
ctx.strokeRect(ox + 1, oy + 1, TS - 2, TS - 2);
ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
ctx.lineWidth = 1;
ctx.strokeRect(ox + 6, oy + 6, TS - 12, TS - 12);
} else if (type === OBJECT_TYPES.HALF_BLOCK) {
const halfH = TS * 0.5;
const hoy = oy + halfH;
ctx.fillStyle = '#0a0a14';
ctx.strokeStyle = levelColor;
ctx.lineWidth = 2;
ctx.shadowBlur = 6;
ctx.shadowColor = levelColor;
ctx.fillRect(ox, hoy, TS, halfH);
ctx.strokeRect(ox + 1, hoy + 1, TS - 2, halfH - 2);
} else if (type === OBJECT_TYPES.SPIKE) {
ctx.fillStyle = '#ff003c';
ctx.shadowBlur = 14;
ctx.shadowColor = '#ff003c';
ctx.beginPath();
ctx.moveTo(ox, oy + TS);
ctx.lineTo(ox + TS / 2, oy);
ctx.lineTo(ox + TS, oy + TS);
ctx.closePath();
ctx.fill();
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 1.5;
ctx.stroke();
} else if (type === OBJECT_TYPES.SAWBLADE) {
const cx = ox + TS / 2;
const cy = oy + TS / 2;
const r = TS * 0.55;
ctx.translate(cx, cy);
ctx.rotate(now * 3);
ctx.shadowBlur = 15;
ctx.shadowColor = '#ff003c';
ctx.fillStyle = '#ff003c';
ctx.beginPath();
const teeth = 8;
for (let t = 0; t < teeth * 2; t++) {
const angle = (t * Math.PI) / teeth;
const radius = t % 2 === 0 ? r : r * 0.65;
const tx = Math.cos(angle) * radius;
const ty = Math.sin(angle) * radius;
if (t === 0) ctx.moveTo(tx, ty);
else ctx.lineTo(tx, ty);
}
ctx.closePath();
ctx.fill();
ctx.fillStyle = '#050508';
ctx.beginPath();
ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
ctx.fill();
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 2;
ctx.stroke();
} else if (
type === OBJECT_TYPES.PAD_YELLOW ||
type === OBJECT_TYPES.PAD_PINK ||
type === OBJECT_TYPES.PAD_RED ||
type === OBJECT_TYPES.PAD_BLUE_GRAV
) {
let padColor = '#ffd700';
if (type === OBJECT_TYPES.PAD_PINK) padColor = '#ff00b7';
else if (type === OBJECT_TYPES.PAD_RED) padColor = '#ff003c';
else if (type === OBJECT_TYPES.PAD_BLUE_GRAV) padColor = '#00f0ff';
ctx.fillStyle = padColor;
ctx.shadowBlur = 12;
ctx.shadowColor = padColor;
ctx.fillRect(ox + 4, oy + TS - 10, TS - 8, 10);
ctx.fillStyle = '#ffffff';
ctx.fillRect(ox + 8, oy + TS - 8, TS - 16, 3);
} else if (
type === OBJECT_TYPES.ORB_YELLOW ||
type === OBJECT_TYPES.ORB_PINK ||
type === OBJECT_TYPES.ORB_RED ||
type === OBJECT_TYPES.ORB_BLUE_GRAV ||
type === OBJECT_TYPES.ORB_GREEN_GRAV ||
type === OBJECT_TYPES.ORB_BLACK_SLAM
) {
let orbColor = '#ffd700';
if (type === OBJECT_TYPES.ORB_PINK) orbColor = '#ff00b7';
else if (type === OBJECT_TYPES.ORB_RED) orbColor = '#ff003c';
else if (type === OBJECT_TYPES.ORB_BLUE_GRAV) orbColor = '#00f0ff';
else if (type === OBJECT_TYPES.ORB_GREEN_GRAV) orbColor = '#39ff14';
else if (type === OBJECT_TYPES.ORB_BLACK_SLAM) orbColor = '#555566';
const pulse = Math.sin(now * 2) * 2;
ctx.fillStyle = orbColor;
ctx.shadowBlur = 16;
ctx.shadowColor = orbColor;
ctx.beginPath();
ctx.arc(ox + TS / 2, oy + TS / 2, 13 + pulse, 0, Math.PI * 2);
ctx.fill();
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(ox + TS / 2, oy + TS / 2, 17 + pulse, 0, Math.PI * 2);
ctx.stroke();
} else if (
(type >= OBJECT_TYPES.PORTAL_SHIP && type <= OBJECT_TYPES.PORTAL_GRAV_INVERT) ||
type === OBJECT_TYPES.PORTAL_MINI ||
type === OBJECT_TYPES.PORTAL_GROWTH
) {
let portalColor = '#00f0ff';
let label = 'CUBE';
if (type === OBJECT_TYPES.PORTAL_SHIP) { portalColor = '#ff003c'; label = 'SHIP'; }
else if (type === OBJECT_TYPES.PORTAL_UFO) { portalColor = '#ffd700'; label = 'UFO'; }
else if (type === OBJECT_TYPES.PORTAL_WAVE) { portalColor = '#00f0ff'; label = 'WAVE'; }
else if (type === OBJECT_TYPES.PORTAL_BALL) { portalColor = '#ff7700'; label = 'BALL'; }
else if (type === OBJECT_TYPES.PORTAL_ROBOT) { portalColor = '#39ff14'; label = 'ROBOT'; }
else if (type === OBJECT_TYPES.PORTAL_GRAV_INVERT) { portalColor = '#00f0ff'; label = 'INV-G'; }
else if (type === OBJECT_TYPES.PORTAL_GRAV_NORMAL) { portalColor = '#ffd700'; label = 'NORM-G'; }
else if (type === OBJECT_TYPES.PORTAL_MINI) { portalColor = '#ff00b7'; label = 'MINI'; }
else if (type === OBJECT_TYPES.PORTAL_GROWTH) { portalColor = '#39ff14'; label = 'MEGA'; }
ctx.strokeStyle = portalColor;
ctx.lineWidth = 4;
ctx.shadowBlur = 22;
ctx.shadowColor = portalColor;
ctx.strokeRect(ox + TS * 0.2, oy - TS * 1.5, TS * 0.6, TS * 2.5);
ctx.fillStyle = portalColor;
ctx.globalAlpha = 0.25;
ctx.fillRect(ox + TS * 0.2, oy - TS * 1.5, TS * 0.6, TS * 2.5);
ctx.globalAlpha = 1.0;
ctx.font = 'bold 9px "Courier New", monospace';
ctx.fillStyle = '#ffffff';
ctx.textAlign = 'center';
ctx.fillText(label, ox + TS / 2, oy - TS * 0.2);
} else if (type >= OBJECT_TYPES.SPEED_05X && type <= OBJECT_TYPES.SPEED_4X) {
let speedColor = '#00f0ff';
let speedLabel = '1X';
if (type === OBJECT_TYPES.SPEED_05X) { speedColor = '#ff7700'; speedLabel = '0.5X'; }
else if (type === OBJECT_TYPES.SPEED_2X) { speedColor = '#39ff14'; speedLabel = '2X'; }
else if (type === OBJECT_TYPES.SPEED_3X) { speedColor = '#b026ff'; speedLabel = '3X'; }
else if (type === OBJECT_TYPES.SPEED_4X) { speedColor = '#ff003c'; speedLabel = '4X'; }
ctx.strokeStyle = speedColor;
ctx.lineWidth = 3;
ctx.shadowBlur = 18;
ctx.shadowColor = speedColor;
ctx.beginPath();
ctx.moveTo(ox + 6, oy - TS * 0.5);
ctx.lineTo(ox + TS - 6, oy + TS * 0.5);
ctx.lineTo(ox + 6, oy + TS * 1.5);
ctx.stroke();
ctx.font = 'bold 10px "Courier New", monospace';
ctx.fillStyle = speedColor;
ctx.textAlign = 'center';
ctx.fillText(speedLabel, ox + TS / 2, oy - TS * 0.7);
} else if (type === OBJECT_TYPES.CYBER_COIN) {
ctx.translate(ox + TS / 2, oy + TS / 2);
ctx.rotate(now * 2);
ctx.shadowBlur = 20;
ctx.shadowColor = '#ffd700';
ctx.fillStyle = '#ffd700';
ctx.beginPath();
ctx.moveTo(0, -16);
ctx.lineTo(16, 0);
ctx.lineTo(0, 16);
ctx.lineTo(-16, 0);
ctx.closePath();
ctx.fill();
ctx.fillStyle = '#050508';
ctx.beginPath();
ctx.arc(0, 0, 7, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
ctx.fill();
}
ctx.restore();
}
}