# 🎮 CYBER DASH — Neon Rhythm Platformer

<p align="center">
  <img src="docs/images/banner.jpg" alt="Cyber Dash Banner" width="100%"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-00f0ff?style=for-the-badge" alt="Version"/>
  <img src="https://img.shields.io/badge/platform-Browser-ff003c?style=for-the-badge" alt="Platform"/>
  <img src="https://img.shields.io/badge/license-MIT-39ff14?style=for-the-badge" alt="License"/>
  <img src="https://img.shields.io/badge/levels-16-b026ff?style=for-the-badge" alt="Levels"/>
  <img src="https://img.shields.io/badge/CRYO-UNLOCKED-a8eeff?style=for-the-badge" alt="CRYO"/>
</p>

<p align="center">
  <strong>A high-octane cyberpunk rhythm platformer built in vanilla HTML5 Canvas + JavaScript.</strong><br>
  Dash through 16 neon-drenched levels across 4 tiers — including the all-new CRYO sector.
</p>

---

## Screenshots

<table>
  <tr>
    <td align="center"><img src="docs/images/level_menu.jpg" width="440"/><br><sub><b>Level Select — Sector Matrix (16 Tracks)</b></sub></td>
    <td align="center"><img src="docs/images/cryo_level.jpg" width="440"/><br><sub><b>CRYO GENESIS — Ice Tier Gameplay</b></sub></td>
  </tr>
</table>

---

## Features

### Core Gameplay
- **6 Player Forms** — CUBE, SHIP, UFO, WAVE, BALL, ROBOT with unique physics
- **Tap/Click/Space** to jump, activate orbs, and chain moves
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
- **4 CRYO Levels:** CRYO GENESIS, FROST MATRIX, ARCTIC PULSE, ABSOLUTE ZERO

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

Open **`index.html`** in any modern browser. No build step or server required.

```bash
git clone https://github.com/Pierreg99/cyber-dash.git
cd cyber-dash

# Windows
start index.html

# macOS / Linux
open index.html
```

**Requirements:** Chrome / Firefox / Edge / Safari 15+

---

## Project Structure

```
cyber-dash/
├── index.html              # Game shell & UI
├── css/styles.css          # Core styles, glassmorphism, CRYO theme
├── js/
│   ├── main.js             # Game loop, CyberDashGame class
│   ├── engine/
│   │   ├── physics.js      # 38 object types, freeze mechanic
│   │   ├── player.js       # 6 forms, freeze crystal overlay
│   │   ├── particles.js    # Explosions, ice shatter, frost rings
│   │   └── camera.js       # Parallax, CRYO snow/mist atmosphere
│   ├── levels/
│   │   └── level-data.js   # 16 levels + drawLevelMap renderer
│   ├── ui/
│   │   └── menu-manager.js # Level select, tier cards, CRYO filter
│   └── audio/
│       └── sound-engine.js # Procedural audio synthesis
├── docs/images/            # Banner, screenshots
├── CHANGELOG.md
├── ROADMAP.md
└── LICENSE
```

---

## Contributing

1. Fork the repo
2. Create branch: `git checkout -b feature/my-level`
3. Commit: `git commit -m 'Add: new level'`
4. Push: `git push origin feature/my-level`
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">Made with neon by <a href="https://github.com/Pierreg99">Pierreg99</a> · 2026</p>
