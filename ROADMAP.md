# ROADMAP — CYBER DASH

Track current progress and upcoming features. Updated with each major version.

---

## Status Key
- ✅ Done
- 🚧 In Progress
- 🔵 Planned
- 💡 Idea / Under Consideration

---

## v2.0.1 — VECTOR ASSETS & STABILITY PATCH ✅ RELEASED

- ✅ Full vector SVG icon integration across UI (zero raw emojis)
- ✅ Procedural vector snowflake rendering in weather and freeze zones
- ✅ StorageManager OAuth and progression bugfixes for 16 levels
- ✅ Instant canvas layer transitions on sector launch

---

## v2.0.0 — CRYO UPDATE ✅ RELEASED

- ✅ CRYO tier with 4 ice levels
- ✅ 8 new freeze/ice object types (ICE_BLOCK, ICE_SPIKE, ORB_FREEZE, PAD_ICE, FREEZE_ZONE, BOOST_PAD, DASH_RING, ICE_CRYSTAL)
- ✅ Freeze mechanic (slow player, vignette, HUD badge, frost particles)
- ✅ CRYO atmospheric background (snowflakes, mist, frost floor)
- ✅ Full level menu overhaul — 4×4 grid, tier filters, animated star ratings
- ✅ Enhanced graphics for all 38 object types (gradients, glows, animations)
- ✅ MIT License
- ✅ GitHub push with docs, README, CHANGELOG, ROADMAP, images

---

## v2.1.0 — MULTI-PLAYER PREVIEW 🔵 Planned

- 🔵 **Ghost Mode** — race against your own best-run ghost replay
- 🔵 **Live Leaderboard** — submit high scores via free backend (Supabase or Firebase)
- 🔵 **Daily Challenge** — one random seeded level per day, global competition
- 🔵 **Share Level Code** — encode custom levels as URL-safe strings to share

---

## v2.2.0 — INFERNO TIER 🔵 Planned

New fire-themed tier with 4 levels:
- 🔵 `LAVA SURGE` — lava pads that launch player skyward
- 🔵 `MAGMA CORE` — switch gravity at heat vents
- 🔵 `COMBUSTION RUN` — double-speed fire biome
- 🔵 `INFERNO APEX` — demon difficulty boss level

New object types:
- 🔵 `LAVA_BLOCK` — solid block that damages on touch after delay
- 🔵 `HEAT_VENT` — upward blast zone
- 🔵 `EMBER_ORB` — orb that launches in parabolic arc
- 🔵 `FLAME_BARRIER` — pulsing wall hazard
- 🔵 `MAGMA_CRYSTAL` — collectible (INFERNO tier coin)

Visual effects:
- 🔵 Ember particle streams rising from ground
- 🔵 Heat distortion shimmering background
- 🔵 Lava floor drip animation

---

## v2.3.0 — PROGRESSION SYSTEM 🔵 Planned

- 🔵 **XP & Ranking** — earn XP per run; rank up from RECRUIT → ELITE → PHANTOM
- 🔵 **Unlock System** — some levels locked until rank or previous tier cleared
- 🔵 **Achievement Wall** — 30+ achievements (First Clear, Perfect Run, No Crash, Speed Demon, etc.)
- 🔵 **Collect-A-Thon** — track % of all ice crystals + cyber coins collected
- 🔵 **Persistent Stats Page** — total runs, best time per level, crash count, total distance

---

## v3.0.0 — MULTIPLAYER & MODSDK 💡 Idea

- 💡 **Mod SDK** — expose `OBJECT_TYPES` API for community object plugins
- 💡 **Level Workshop** — browser-based level sharing & rating platform
- 💡 **Co-op Mode** — two players same level, split controls
- 💡 **2-Player Race** — server-side synchronized race rooms (WebSocket)
- 💡 **Custom Music Import** — let players import MP3 and auto-sync BPM

---

## Backlog / Nice-to-Have Ideas 💡

| Idea | Notes |
|---|---|
| Replay system | Record frame-by-frame inputs, save/load replays |
| Level analytics | Heatmap of where players die most |
| Mobile PWA | Installable as app on Android/iOS |
| Keyboard remapping | User-configurable keybindings |
| Colorblind modes | High contrast + pattern-differentiated hazards |
| Speedrun timer | In-game IGT (in-game time) stopwatch |
| Music visualizer | Background reacts to audio on HUD |
| VOID tier | Anti-gravity / inverted world mechanics |
| NEON tier | Ultra-fast synth levels with minimal obstacles |

---

## Completed Features (v1.x)

- ✅ 6 player forms with distinct physics
- ✅ 28 base object types
- ✅ Practice mode with checkpoints
- ✅ Custom level editor
- ✅ Particle system
- ✅ Procedural audio synthesis
- ✅ Local storage progress saving
- ✅ Daily bonus faucet
- ✅ Cyber Store (cosmetics)
- ✅ Achievement toasts
- ✅ Level modifiers (speed, hitbox)
