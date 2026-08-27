# 📐 CYBER DASH — LEVEL DESIGN & TRACK AUTHORING GUIDE

This guide provides creator guidelines for building custom sectors, pacing rhythm tracks, utilizing all 38 object types, and syncing obstacle density with the procedural synth engine.

---

## 1. Object Types Catalog (38 Types)

```
┌─────────────────────────────────────────────────────────────┐
│                       PLATFORMS & SOLIDS                    │
│   1: BLOCK       │  30: HALF_BLOCK    │  31: ICE_BLOCK      │
├──────────────────┼────────────────────┼─────────────────────┤
│                       HAZARDS & OBSTACLES                   │
│   2: SPIKE       │  29: SAWBLADE      │  32: ICE_SPIKE      │
├──────────────────┼────────────────────┼─────────────────────┤
│                       JUMP PADS                             │
│   3: PAD_YELLOW  │   4: PAD_PINK      │   5: PAD_RED        │
│   6: PAD_BLUE_G  │  34: PAD_ICE       │  36: BOOST_PAD      │
├──────────────────┼────────────────────┼─────────────────────┤
│                       JUMP ORBS                             │
│   7: ORB_YELLOW  │   8: ORB_PINK      │   9: ORB_RED        │
│  10: ORB_BLUE_G  │  11: ORB_GREEN_G   │  12: ORB_BLACK_SLAM │
│  33: ORB_FREEZE  │  37: DASH_RING     │                     │
├──────────────────┼────────────────────┼─────────────────────┤
│                       VEHICLE & FORM PORTALS                │
│  13: PORTAL_SHIP │  14: PORTAL_CUBE   │  15: PORTAL_UFO     │
│  16: PORTAL_WAVE │  17: PORTAL_BALL   │  18: PORTAL_ROBOT   │
│  19: PORTAL_MINI │  20: PORTAL_MEGA   │                     │
├──────────────────┼────────────────────┼─────────────────────┤
│                       GRAVITY & SPEED GATES                 │
│  21: GRAV_INVERT │  22: GRAV_NORMAL   │  23: SPEED_05X      │
│  24: SPEED_1X    │  25: SPEED_2X      │  26: SPEED_3X       │
│  27: SPEED_4X    │                    │                     │
├──────────────────┼────────────────────┼─────────────────────┤
│                       COLLECTIBLES & ZONES                  │
│  28: CYBER_COIN  │  35: FREEZE_ZONE   │  38: ICE_CRYSTAL    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Rhythm Synchronization & BPM Matching

CYBER DASH levels sync obstacle placement with musical BPM. Use the following tile-step calculation to align jumps to musical downbeats:

$$\text{Tiles per Beat} = \frac{\text{BPM}}{60} \cdot \frac{\text{BASE\_SPEED\_X} \cdot \text{SpeedMultiplier}}{\text{BASE\_TILE\_SIZE}} \cdot 60$$

At standard 1× speed ($6.0\text{ px/frame}$ at $60\text{ FPS} = 360\text{ px/s}$):
- **120 BPM**: 1 beat = $\approx 5.625$ tiles. Place primary jump obstacles every 5 or 6 grid tiles.
- **140 BPM**: 1 beat = $\approx 4.82$ tiles. Place primary jump obstacles every 5 grid tiles.
- **160 BPM**: 1 beat = $\approx 4.21$ tiles. Place rapid jumps every 4 grid tiles.

---

## 3. Tier Pacing & Difficulty Progression

### 🟢 EASY Tier (1–2 Stars)
- Simple single-cube jumps.
- Generous landing platforms (minimum 3–4 tiles wide).
- Introductory Ship / UFO sections with wide vertical clearance (minimum 4 tiles height).

### 🟣 HARD Tier (3–4 Stars)
- Introduces rotating sawblades and half-blocks.
- Wave mode sections with $45^\circ$ sloped corridors.
- Speed gates (2× and 3×) introduced with rhythm orb chaining.

### 🔴 OMEGA Tier (5–7 Stars)
- Rapid multi-form transitions in single tracks (Cube → Wave → Robot → Ball).
- 3× and 4× speed sections requiring sub-frame precision.
- Dual-gravity switches inside mini-portal corridors.

### ❄️ CRYO Tier (2–7 Stars)
- Leverages `FREEZE_ZONE` slow fields to alter muscle-memory jump timing.
- Slippery `ICE_BLOCK` runways requiring adjusted jump takeoff points.
- `ORB_FREEZE` mechanics allowing extended airtime across broad crystalline hazard chasms.
- 3 hidden `ICE_CRYSTAL` collectibles rewarding precision alternate routes.

---

## 4. Track Design Best Practices

1. **Sight Reading**: Always provide at least 0.5 seconds of visual warning before introducing an inverted gravity portal or high-speed hazard.
2. **Collectibles Placement**:
   - Coin 1: Early-level precision detour.
   - Coin 2: Mid-level alternate flight path in Ship/UFO mode.
   - Coin 3: Climax tight-gap drop in Wave/Robot mode.
3. **Checkpoints**: When testing in Practice Mode, ensure every form transition is preceded by safe terrain to allow seamless checkpoint resumption.
