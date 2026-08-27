# ⚛️ CYBER DASH — PHYSICS ENGINE & KINEMATICS SPECIFICATION

This technical manual details the mathematical formulas, collision resolution algorithms, form kinematics, and environmental modifiers in **CYBER DASH**.

---

## 1. Fundamental Constants

| Constant | Value | Description |
|---|---|---|
| `BASE_SPEED_X` | `6.0 px/frame` | Normal 1× forward horizontal speed |
| `BASE_TILE_SIZE` | `32 px` | Standard grid tile dimension ($TS$) |
| `GRAVITY_CUBE` | `0.95 px/frame²` | Cube form vertical gravitational acceleration |
| `JUMP_IMPULSE_CUBE` | `-12.5 px/frame` | Cube initial jump velocity |
| `TERMINAL_VELOCITY` | `15.0 px/frame` | Maximum downward/upward falling speed |
| `MINI_SCALE` | `0.65` | Scale factor for mini portal transformation |

---

## 2. Vehicle Form Kinematics

### 2.1 CUBE Form
- **Jump Dynamics**: Impulse triggered on ground contact when input is active.
- **Rotation**: Continuous $90^\circ$ interpolation per airborne block transit, snapping to exact $0^\circ, 90^\circ, 180^\circ, 270^\circ$ upon landing.

### 2.2 SHIP Form
- **Vertical Propulsion**:
  $$v_y \leftarrow v_y + (input ? -0.85 : 0.65) \cdot gravityDir$$
- **Pitch Angle**: $\theta = \arctan(v_y / v_x) \cdot 1.5$ clamped to $[-45^\circ, 45^\circ]$.

### 2.3 UFO Form
- **Impulse Hopping**: Tap triggers discrete upward impulse:
  $$v_y = -9.0 \cdot gravityDir$$
- Gravity acceleration is lower ($0.55\text{ px/frame}^2$) to allow rhythmic multi-jumps.

### 2.4 WAVE Form
- **Diagonal Trajectory**: Pure $45^\circ$ zig-zag motion with zero vertical momentum damping:
  $$v_y = input ? -v_x : v_x$$
- Bounces immediately upon contact with horizontal terrain boundaries.

### 2.5 BALL Form
- **Gravity Inversion**: Tapping switches global player gravity:
  $$gravityDir \leftarrow -gravityDir$$
- Clamps immediately to ceiling or floor with active rolling rotation.

### 2.6 ROBOT Form
- **Variable Jump Height**: Jump impulse sustains as long as input is held, up to `maxRobotBoost = 20` ticks:
  $$v_y = -11.0 - (boostCounter \cdot 0.3)$$

---

## 3. Collision Resolution Algorithms

### 3.1 Platform Landing (Solid AABB)
A block defined at grid coordinate $(x_g, y_g)$ occupies space:
$$X \in [x_g \cdot TS, (x_g + 1) \cdot TS], \quad Y \in [groundY - (y_g + 1) \cdot TS, groundY - y_g \cdot TS]$$

- **Top Landing**: If player bottom edge $y + s \ge Y_{top}$ and previous frame bottom was $\le Y_{top}$, the player snaps to $Y_{top}$ and $v_y = 0$, `onGround = true`.
- **Side Hazard Collision**: If player horizontal leading edge penetrates the vertical boundary by more than $6\text{ px}$ without clearing the top plane, a death event is dispatched.

### 3.2 Spikes & Sawblades
- **Spike Hitbox**: Inset triangle boundary with $4\text{ px}$ safety margin from outer tile bounds to reward pixel-perfect precision without unfair collision.
- **Sawblade Hitbox**: Radial circle check:
  $$\text{dist} = \sqrt{(player_x - saw_x)^2 + (player_y - saw_y)^2} < (radius - 4\text{ px})$$

---

## 4. CRYO Freeze Mechanics

When passing through a `FREEZE_ZONE` or activating an `ORB_FREEZE`:

1. **Velocity Damping**:
   $$v_x \leftarrow v_x \cdot 0.55$$
2. **Freeze Timer Lifecycle**:
   $$\text{freezeTimer} \leftarrow 120\text{ ticks } (\approx 2.0\text{ seconds})$$
3. **Smooth Recovery Function**:
   During active freeze, speed scales back non-linearly:
   $$\text{speedScale} = 0.55 + 0.45 \cdot \left(1 - \frac{\text{freezeTimer}}{120}\right)^2$$
4. **Ice Friction Modifiers**:
   When standing on `ICE_BLOCK`, horizontal ground friction drops from $0.92$ to $0.995$, creating authentic slippery drift dynamics.
