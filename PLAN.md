# CYBER DASH — ARCHITECTURAL & DEVELOPMENT PLAN

## 1. Project Overview
CYBER DASH is a high-octane 2D neon rhythm platformer built from scratch using vanilla HTML5 Canvas, modern ES Modules, and Vanilla CSS/Tailwind UI. It features geometry-dash style precision platforming with procedural multi-bpm synth audio, 6 distinct vehicle forms, and extensive custom mechanics (like the CRYO freeze system).

---

## 2. Core Architecture & System Decomposition

### A. Engine Architecture (`js/engine/`)
1. **Physics Engine (`physics.js`)**
   - Precise AABB and slope/facet collision handling.
   - Support for 38 distinct object types:
     - Standard Solids, Half Blocks, Saws, Spikes.
     - Interactive pads & multi-gravity orbs.
     - Form morphing portals (Ship, UFO, Wave, Ball, Robot).
     - Speed multiplier gates (0.5x, 1x, 2x, 3x, 4x).
     - CRYO Ice mechanics (Ice Blocks, Ice Spikes, Freeze Orbs, Ice Bounce Pads, Freeze Slow Zones, Ice Crystals, Boost Pads, Dash Rings).
   - Collision callbacks for collectibles and death events.

2. **Player Controller (`player.js`)**
   - 6 transformation modes with specialized kinematics:
     - **CUBE**: Strict arc jump & gravity flip dynamics.
     - **SHIP**: Continuous vertical propulsion & inertia.
     - **UFO**: Impulse-based multi-jumps in low gravity.
     - **WAVE**: Instant 45-degree diagonal zig-zag momentum.
     - **BALL**: Surface-clamping gravity invert.
     - **ROBOT**: Variable jump height boost mechanism.
   - Dynamic states: Freeze slow modifier (55% velocity scaling with smooth recovery), ground friction flags, rotation interpolation, and custom trail rendering.

3. **Particle & Visual FX System (`particles.js`)**
   - High-performance particle pool handling:
     - Shard & crystalline fragment bursts.
     - Expanding frost rings & shockwaves.
     - Audio-reactive speed lines and neon sparks.
     - Floating score / pickup indicators.
     - Death explosion fragmentation with tier-specific themes.

4. **Camera & Environment Subsystem (`camera.js`)**
   - Horizontal lerp-based viewport tracking with forward offset.
   - Multi-intensity screen shake with decay.
   - Multi-layered parallax background (space horizon, starfield with twinkling, skyline silhouettes with neon beacons).
   - Dynamic audio-reactive cyber grid perspective rendering.
   - Atmospheric biome overlays (e.g., CRYO snowfall, mist bands, frosted ground gradients).

---

## 3. Tier & Level Design Structure (`js/levels/`)
1. **16 Handcrafted Sectors across 4 Tiers**:
   - **🟢 EASY Tier**: Levels 1–4 (Initiation, Glow Matrix, Cyber Chill, Kinetic Surge).
   - **🟣 HARD Tier**: Levels 5–8 (Synthwave Drift, Neon Overdrive, Pulse Reactor, Hyperdrive Outrun).
   - **🔴 OMEGA Tier**: Levels 9–12 (Quantum Collapse, Zero Point, Void Horizon, Omega Nexus).
   - **❄️ CRYO Tier**: Levels 13–16 (Cryo Genesis, Frost Matrix, Arctic Pulse, Absolute Zero).
2. **Dynamic Level Rendering (`drawLevelMap`)**:
   - Optimized visible-range viewport culling.
   - Custom graphical rendering with gradient bodies, corner rivets, animated scan lines, pulsation effects, and rotating hazard teeth.

---

## 4. UI & Game State Management (`js/ui/`, `index.html`)
- **Kinetic Glass UI**: Glassmorphism with tier-colored glows and borders.
- **Sector Matrix Hub**: 4x4 interactive card grid with star ratings, clear status, coin tracking, and tier filters (ALL, EASY, HARD, OMEGA, CRYO, CUSTOM).
- **In-Game HUD**: Real-time progress bar, percentage completion, freeze vignette, and dynamic pause/simulation overlay.
- **Custom Level Editor & Garage**: In-game track creator with tile placement tools, form spawners, test flight simulator, and cosmetic character customizer.

---

## 5. Deployment & Execution Plan
1. **Local Running**: Zero-build standalone execution (`index.html` via any web server or direct browser open).
2. **Version Control**: Git repository with semantic versioning (`v2.0.0` CRYO Release).
3. **Continuous Evolution**: Outlined in `ROADMAP.md` and tracked in `PROGRESS.md`.
