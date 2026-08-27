# 📚 CYBER DASH — API & MODULE REFERENCE

This document details the public API surface, methods, properties, and events across all core ES modules.

---

## 1. Engine Core

### `PhysicsEngine` (`js/engine/physics.js`)
Static collision resolution engine.

```javascript
PhysicsEngine.check(
    player,          // Player instance
    levelData,       // Array<[x, y, type, extra]>
    groundY,         // number (Canvas baseline Y)
    input,           // InputState object { space: boolean, click: boolean }
    soundEngine,     // CryoAudioEngine instance
    particles,       // ParticleSystem instance
    onCoinCollect,   // (coinIndex, worldX, worldY) => void
    onDeath          // () => void
)
```

### `Player` (`js/engine/player.js`)
Main player entity class controlling kinematics, vehicle forms, state transitions, and rendering.

- **Properties**:
  - `x`, `y`: World coordinates (pixels).
  - `vx`, `vy`: Current horizontal and vertical velocities.
  - `form`: String enum (`'CUBE'`, `'SHIP'`, `'UFO'`, `'WAVE'`, `'BALL'`, `'ROBOT'`).
  - `gravityDir`: `1` (normal downward) or `-1` (inverted upward).
  - `frozen`: `boolean` — whether freeze slow modifier is active.
  - `freezeTimer`: `number` (ticks remaining on freeze state).
  - `isOnIce`: `boolean` — whether player is contacting an `ICE_BLOCK`.
- **Methods**:
  - `reset()`: Reinitializes player position, velocities, form, and freeze timers.
  - `update(input, deltaMs)`: Integrates velocity, evaluates gravity, and updates rotational angle.
  - `draw(ctx, groundY)`: Renders vehicle geometry, cosmetic trail, and freeze crystal overlay.

### `ParticleSystem` (`js/engine/particles.js`)
High-performance visual effect generator.

- **Methods**:
  - `emitExplosion(x, y, color)`: Radial particle burst upon standard player crash.
  - `emitDeathIce(x, y)`: 35-shard diamond crystalline shatter for CRYO sector deaths.
  - `emitFreezeShatter(x, y)`: Crystalline blast with expanding frost ring and floating text.
  - `emitFrostRing(x, y)`: Expanding shockwave ring with sub-zero spark emission.
  - `emitIceCrystalCollect(x, y)`: Collectible pickup burst with floating indicator.
  - `update(deltaMs)`: Updates particle position, rotation, and lifecycle decay.
  - `draw(ctx)`: Renders all active particle pools.

### `Camera` (`js/engine/camera.js`)
Viewport controller and atmospheric renderer.

- **Methods**:
  - `init(width, height, groundY)`: Generates parallax starfield and skyline entities.
  - `update(playerX, deltaMs)`: Lerps camera viewport and damps screen shake.
  - `shake(intensity, durationMs)`: Triggers viewport oscillation.
  - `drawBackground(ctx, activeLevel, audioPulse)`: Renders starfield, skyline, cyber grid, mist bands, and falling snow.

---

## 2. Audio Subsystem

### `CryoAudioEngine` (`js/audio/sound-engine.js`)
Procedural Web Audio API sound synthesizer.

- **Methods**:
  - `init()`: Resumes or starts `AudioContext` upon user interaction.
  - `playMusic(bpm, tier)`: Starts loop sequencing for lead melody, sub-bass, and drums.
  - `stopMusic()`: Halts active oscillators with exponential gain fade.
  - `playSFX(name)`: Triggers synthesized sound effect (`'jump'`, `'crash'`, `'portal'`, `'orb'`, `'coin'`, `'freeze'`).
  - `setVolume(musicVol, sfxVol)`: Adjusts master gain buses.

---

## 3. UI & Storage Subsystems

### `StorageManager` (`js/ui/storage.js`)
Robust browser persistence layer.

- **Methods**:
  - `getBestScore(levelId)`: Returns highest percentage completion (`0` to `100`).
  - `setBestScore(levelId, percentage)`: Stores new personal best.
  - `getCoins(levelId)`: Returns array of 3 booleans indicating collected coin status.
  - `getCurrency()` / `addCurrency(amount)`: Manages in-game cyber credits.
  - `getCustomLevels()` / `saveCustomLevel(levelObj)`: Manages user-authored sectors.

### `MenuManager` (`js/ui/menu-manager.js`)
DOM UI manager for sector selection, cosmetic store, audio volume controls, and editor palettes.

- **Methods**:
  - `init()`: Attaches tab navigation and filter button event listeners.
  - `renderLevelCardsGrid()`: Dynamically compiles 16 sector cards with star ratings, tier badges, and status bars.
  - `updateHUD(percentage, levelName)`: Syncs real-time in-game display.
