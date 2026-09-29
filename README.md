# CYBER DASH — Neon Rhythm Platformer

<p align="center">
  <img src="docs/images/banner.jpg" alt="Cyber Dash — Sector Matrix (live capture)" width="100%"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.3-00f0ff?style=for-the-badge" alt="Version"/>
  <img src="https://img.shields.io/badge/platform-Browser-ff003c?style=for-the-badge" alt="Platform"/>
  <img src="https://img.shields.io/badge/license-MIT-39ff14?style=for-the-badge" alt="License"/>
  <img src="https://img.shields.io/badge/levels-16-b026ff?style=for-the-badge" alt="Levels"/>
  <img src="https://img.shields.io/badge/CRYO-UNLOCKED-a8eeff?style=for-the-badge" alt="CRYO"/>
</p>

<p align="center">
  <strong>Cyberpunk rhythm platformer — vanilla HTML5 Canvas + JavaScript.</strong><br>
  16 neon sectors across 4 tiers, including the CRYO ice sector.
</p>

> Marketing images in `docs/images/` are **live captures** from the running build (1376×768). Palette, HUD, Sector Matrix, and CRYO gameplay match what you get when you open `index.html`.

## Table of Contents
- [Screenshots](#screenshots)
- [Features](#features)
- [Object Types Catalog](#object-types-38-total)
- [CRYO Ice Tier](#cryo-tier-new-in-v20)
- [Level Tiers Matrix](#level-tiers-16-total)
- [Controls](#controls)
- [Getting Started](#getting-started)
- [Documentation Suite](#documentation-suite)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Screenshots

<table>
  <tr>
    <td align="center"><img src="docs/images/level_menu.jpg" width="440"/><br><sub><b>Sector Matrix — 16 Tracks (live UI)</b></sub></td>
    <td align="center"><img src="docs/images/cryo_level.jpg" width="440"/><br><sub><b>CRYO GENESIS — Ice Tier Gameplay</b></sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/images/cover-gameplay.jpg" width="440"/><br><sub><b>CYBER ALLEYWAY — EASY Tier Gameplay</b></sub></td>
    <td align="center"><img src="docs/images/splash.jpg" width="440"/><br><sub><b>CRYO mid-run — splash / store cover</b></sub></td>
  </tr>
</table>

Store / cover / icon assets (same palette as gameplay):

| Asset | Path |
|---|---|
| Banner / OG hero | `docs/images/banner.jpg` |
| Splash | `docs/images/splash.jpg` |
| Cover (gameplay) | `docs/images/cover-gameplay.jpg` |
| App icon 512 | `docs/images/icon-512.png` |
| App icon 192 | `docs/images/icon-192.png` |

---

## Features

### Core Gameplay
- **6 Player Forms** — CUBE, SHIP, UFO, WAVE, BALL, ROBOT with unique physics
- **Tap / Click / Space** to jump, activate orbs, and chain moves
- **Neon-reactive** audio engine with procedural BPM-locked music (120–180 BPM)
- **Practice Mode** — retry from checkpoints to master hard sections
- **Custom Level Editor** — build and play your own sectors

### Object Types (38 Total)
| Category | Objects |
|---|---|
| Platforms | Block, Half-Block, Ice Block |
| Hazards | Spike, Ice Spike, Sawblade |
| Jump Orbs | Yellow, Pink, Red, Blue, Green, Black, **Freeze Orb** |
| Pads | Yellow, Pink, Red, Blue, **Ice Pad**, **Boost Pad** |
| Portals | Ship, Cube, UFO, Wave, Ball, Robot, Mini, Mega, Grav-Inv, Grav-Norm |
| Speed | 0.5x, 1x, 2x, 3x, 4x Speed Gates |
| Collectibles | Cyber Coin, **Ice Crystal** |
| New | **Freeze Zone**, **Dash Ring** |

### CRYO Tier (NEW in v2.0)
<img src="docs/images/cryo_level.jpg" width="100%"/>

- **Slippery ICE_BLOCK** platforms with frost crack rendering
- **ICE_SPIKE** hazards with crystalline gradient facets and tip sparkle
- **ORB_FREEZE** — freeze-jump that slows player for 2 seconds
- **Freeze Vignette** — blue edge glow on screen while frozen
- **Ice crystal overlay** rotates around player when frozen
- **Falling snowflakes** and icy mist atmospheric CRYO background
- **4 CRYO Levels:** CRYO GENESIS, GLACIER PATH, ICE CACHE, CRYO CHAMBER

### Level Tiers (16 Total)
| Tier | Count | Difficulty | Theme |
|---|---|---|---|
| EASY | 4 | 1–2 stars | Intro neon cyber |
| HARD | 4 | 3–4 stars | Synthwave + sawblades |
| OMEGA | 4 | 5–7 stars | All forms, max BPM |
| CRYO | 4 | 2–7 stars | Ice, freeze, sub-zero |

---

## Controls

| Action | Keyboard | Mouse | Touch |
|---|---|---|---|
| Jump / Activate | `Space` | Left Click | Tap |
| Pause | `Esc` | — | — |
| Retry | `R` | — | — |

---

## Getting Started

Open **`index.html`** in any modern browser. No build step required for local play.

```bash
git clone https://github.com/Pierreg99/Cyberdash-Rhythm-Platformer.git
cd Cyberdash-Rhythm-Platformer

# Optional local static server
npm start
# → http://127.0.0.1:8080/
```

**Requirements:** Chrome / Firefox / Edge / Safari 15+

---

## Documentation Suite

| Document | Description |
|---|---|
| **[QUALITY_AUDIT.md](QUALITY_AUDIT.md)** | Technical audit, FPS benchmarks, physics verification |
| **[PLAN.md](PLAN.md)** | System architecture and implementation plan |
| **[PROGRESS.md](PROGRESS.md)** | Milestone tracking across releases |
| **[ROADMAP.md](ROADMAP.md)** | Planned features for v2.1+ / Inferno / v3.0 |
| **[CHANGELOG.md](CHANGELOG.md)** | Semantic release notes |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Contribution and custom-level guidelines |
| **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** | Subsystem architecture and game-loop lifecycle |
| **[docs/PHYSICS_ENGINE.md](docs/PHYSICS_ENGINE.md)** | Kinematics, AABB collision, freeze curves |
| **[docs/LEVEL_DESIGN_GUIDE.md](docs/LEVEL_DESIGN_GUIDE.md)** | Track authoring for all 38 object types |
| **[docs/API_REFERENCE.md](docs/API_REFERENCE.md)** | Player, Physics, Particles, Camera, Audio APIs |
| **[docs/AUDIO_SYSTEM.md](docs/AUDIO_SYSTEM.md)** | Web Audio procedural synthesis |

---

## Project Structure

```
Cyberdash-Rhythm-Platformer/
├── index.html                  # Game shell & UI
├── css/styles.css              # Core styles, glassmorphism, CRYO theme
├── js/
│   ├── main.js                 # Game loop, CyberDashGame orchestrator
│   ├── engine/                 # Physics, player, particles, camera
│   ├── levels/                 # 16 sectors + editor
│   ├── ui/                     # Sector matrix, store, garage, storage
│   └── audio/                  # Procedural music & SFX
├── docs/
│   └── images/                 # Live marketing screenshots + icons
├── dist/                       # Pages / production bundle
└── *.md                        # Audit, plan, progress, roadmap, changelog
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT — see [LICENSE](LICENSE).

---

<p align="center">Neon by <a href="https://github.com/Pierreg99">Pierreg99</a> · 2026</p>
