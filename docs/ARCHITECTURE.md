# 🏛️ CYBER DASH — SYSTEM ARCHITECTURE & DATA FLOW

This document describes the high-level architecture, module decomposition, rendering pipeline, and data flow of **CYBER DASH**.

---

## 1. High-Level Architecture Overview

CYBER DASH is designed around a decoupled, modular architecture adhering to modern ES Module standards. It is divided into five core layers:

```
┌─────────────────────────────────────────────────────────────┐
│                       PRESENTATION LAYER                    │
│      (index.html, Tailwind CSS, styles.css, HUD, Canvas)    │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
┌──────────────▼──────────────┐ ┌──────────────▼──────────────┐
│        UI & STORAGE         │ │        INPUT & AUDIO        │
│  (MenuManager, StorageMgr)  │ │   (Keyboard, Touch, Audio)  │
└──────────────┬──────────────┘ └──────────────┬──────────────┘
               │                               │
┌──────────────▼───────────────────────────────▼──────────────┐
│                    GAME COORDINATOR (main.js)               │
│        (CyberDashGame: Tick Loop, State Machine, Modifiers)  │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
┌──────────────▼──────────────┐ ┌──────────────▼──────────────┐
│       PHYSICS ENGINE        │ │      RENDERING ENGINE       │
│ (AABB Collision, Kinematics,│ │  (drawLevelMap, Camera,     │
│  Freeze Damping, Platforms) │ │   ParticleSystem, Parallax) │
└─────────────────────────────┘ └─────────────────────────────┘
```

---

## 2. Component Directory Breakdown

```
cyber-dash/
├── index.html                  # Main DOM structure, HUD overlays, modals
├── css/
│   └── styles.css              # Custom kinetic glass, neon text, CRYO themes
├── js/
│   ├── main.js                 # Central orchestrator: game loop & state transitions
│   ├── engine/
│   │   ├── physics.js          # Collision detection & object resolution (38 types)
│   │   ├── player.js           # 6 vehicle forms kinematics & freeze state
│   │   ├── particles.js        # High-performance FX & particle emitter
│   │   └── camera.js           # Viewport tracking, shake & parallax background
│   ├── audio/
│   │   └── sound-engine.js     # Web Audio API procedural music & SFX synth
│   ├── levels/
│   │   ├── level-data.js       # 16 official sectors + vector object renderer
│   │   └── editor.js           # In-game interactive track builder
│   └── ui/
│       ├── menu-manager.js     # Sector matrix, tier cards, store, garage
│       └── storage.js          # LocalStorage schema & statistics manager
```

---

## 3. Game Loop & Frame Lifecycle

Each animation frame executes sequentially through 5 distinct phases within `CyberDashGame.update()` and `CyberDashGame.render()`:

```
[1. Input Sampling] ──► [2. Kinematic Step] ──► [3. Physics Resolution]
                                                        │
[5. Canvas Draw]    ◄── [4. FX & Camera Step] ◄─────────┘
```

1. **Input Sampling**:
   - Collects instantaneous keyboard, mouse, and touch trigger states (`Space`, `Click`, `Touch`).
   - Normalizes input regardless of controller source.
2. **Kinematic Step (`Player.update`)**:
   - Applies gravity, velocity integration ($x \leftarrow x + v_x \cdot dt$, $y \leftarrow y + v_y \cdot dt$), form-specific jump impulses, and rotation interpolation.
   - Evaluates freeze recovery decay and ground friction.
3. **Physics Resolution (`PhysicsEngine.check`)**:
   - Queries level tile data within the player's active bounding radius.
   - Resolves solid platform landings, jump pad boosts, gravity portal inversions, freeze zones, and hazard collisions.
4. **FX & Camera Step (`Camera.update`, `ParticleSystem.update`)**:
   - Camera smoothly tracks player position with forward lead and screen shake damping.
   - Particles update velocity, rotation, life decay, and alpha fade.
5. **Canvas Draw (`drawLevelMap`, `Camera.drawBackground`, `Player.draw`)**:
   - Renders parallax starfield and cyber skyline.
   - Draws visible level geometry with vector gradients and hazard glow.
   - Draws player entity, rotation matrices, freeze overlays, and particle bursts.

---

## 4. State Management & Flow

```
┌──────────────┐         Play Sector         ┌──────────────┐
│  MAIN MENU   │ ──────────────────────────► │ IN-GAME RUN  │
│(SectorMatrix)│ ◄────────────────────────── │  (Level Map) │
└──────────────┘        Exit / Clear         └──────┬───────┘
                                                    │
                                               Death Event
                                                    │
                                             ┌──────▼───────┐
                                             │ AUTO-RESPAWN │
                                             │(Checkpoints) │
                                             └──────────────┘
```

- **Persistence Layer (`StorageManager`)**:
  - Automatically commits percentage progress, star ratings, collected cyber coins, and earned currency.
  - Features defensive schema versioning and safe deserialization.
