# CHANGELOG — CYBER DASH

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.0.0] — 2026-08-27 — THE CRYO UPDATE

### Added
- **CRYO Tier** — 4 brand-new ice-themed levels:
  - `CRYO GENESIS` (EASY, 2 stars) — intro to freeze mechanics
  - `FROST MATRIX` (NORMAL, 3 stars) — UFO through freeze zones
  - `ARCTIC PULSE` (HARD, 5 stars) — high-speed ice wave run
  - `ABSOLUTE ZERO` (DEMON, 7 stars) — ultimate CRYO apex boss
- **8 new object types** (IDs 31–38):
  - `ICE_BLOCK` (31) — slippery solid platform, frost crack surface
  - `ICE_SPIKE` (32) — lethal crystalline spike with facet rendering
  - `ORB_FREEZE` (33) — spinning snowflake orb, freeze-jump mechanic
  - `PAD_ICE` (34) — icy bounce pad with frost gradient
  - `FREEZE_ZONE` (35) — area that slows player 50% for ~2 seconds
  - `BOOST_PAD` (36) — horizontal speed burst pad
  - `DASH_RING` (37) — tap-activated instant forward dash
  - `ICE_CRYSTAL` (38) — collectible hexagon crystal (CRYO coin equivalent)
- **Freeze Mechanic** — `player.frozen` state:
  - Player slows to ~55% speed while frozen, gradually recovers
  - Spinning ice crystal overlay renders around player
  - Blue "❄ FROZEN" HUD badge appears in top-right
  - Freeze vignette (blue edge glow) covers screen
  - Passive frost ring particles emitted while frozen
- **Ice Particle Effects** (`particles.js`):
  - `emitFreezeShatter(x, y)` — 22-shard crystal burst + frost ring + floating text
  - `emitFrostRing(x, y)` — expanding cyan ring + sparks
  - `emitDeathIce(x, y)` — 35-shard blue/white explosion for CRYO deaths
  - `emitIceCrystalCollect(x, y)` — crystal collect effect with ice text
- **Diamond-shaped shard particles** (`type: 'shard'`) in particle renderer
- **CRYO atmospheric background** (`camera.js`):
  - Falling snowflakes (20 animated particles)
  - 3-layer icy mist atmosphere
  - Blue-tinted twinkling stars
  - Frost gradient on floor line
- **CRYO filter button** in Level Select: `❄️ CRYO (4)`
- **CRYO-themed level cards** with frost shimmer, ice coin icons (❄/❅), icy blue glow
- **CSS additions** (`styles.css`):
  - `.kinetic-glass-cryo`, `.btn-cryo`, `.neon-text-ice`
  - `.freeze-vignette`, `.hud-freeze-badge` with pulse animation
  - `.cryo-card-shimmer` (frost shimmer on level cards)
  - Snowfall animation keyframes

### Changed
- **`drawLevelMap` completely rewritten** — all 38 object types rendered with:
  - Gradient block fills with corner rivet dots
  - Gradient spike bodies with tip sparkle
  - 10-tooth sawblade with radial gradient and hub highlight ring
  - Orbs use radial gradient + outer glow ring + inner shine
  - Pads have animated bounce arrow
  - Portals render with animated scan-line effect
  - Speed gates render 3 triple-chevron arrows with fade
  - Cyber coins have outer rotating ring + radial gradient body
- **Level Select upgraded** from 12 to 16 levels (4×4 grid)
- **Level cards** now show tier icon, animated star ratings, tier-colored badges, gradient progress bar with glow, `✓ CLEAR` completion badge
- **Death explosion** now uses `emitDeathIce` on CRYO levels instead of red explosion
- **Player trail** turns icy blue (`#88ddff`) while frozen

### Fixed
- Duplicate `drawLevelMap` code removed from `level-data.js`
- `isOnIce` flag properly resets each frame in `player.js`

---

## [1.5.0] — 2026-07 — THE OMEGA EXPANSION

### Added
- OMEGA tier — 4 extreme difficulty levels (QUANTUM COLLAPSE, ZERO POINT, VOID HORIZON, OMEGA NEXUS)
- SAWBLADE object type (ID 29) with rotating teeth
- HALF_BLOCK object type (ID 30)
- CYBER_COIN collectibles (3 per level) with collect tracking
- Level modifiers drawer (speed 0.75x–1.5x, hitbox CASUAL/NORMAL/OMEGA)
- Tier configuration system (`window.cyberDashTierConfig`)

### Changed
- Level select expanded from 8 to 12 levels
- Physics engine refactored with `PhysicsEngine.check()` static method

---

## [1.0.0] — 2026-06 — INITIAL RELEASE

### Added
- 8 levels across EASY (4) and HARD (4) tiers
- 6 player forms: CUBE, SHIP, UFO, WAVE, BALL, ROBOT
- 28 base object types including orbs, pads, portals, speed gates
- Procedural audio engine (120–148 BPM)
- Practice mode with checkpoints
- Custom level editor
- Parallax starfield background with city silhouettes
- Particle system (explosions, speed lines, orb hits, floating text)
- Local storage for progress, coins, and currency
- Achievement toast system
- Cyber Store (cosmetics — trails, characters, colors)
- Daily bonus faucet
