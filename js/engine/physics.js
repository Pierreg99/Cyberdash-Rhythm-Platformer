/**
 * CYBER DASH // PHYSICS & COLLISION RESOLVER
 * Handles strict AABB hitboxes, inner spike collision margins,
 * interactive orbs/pads, vehicle/gravity/speed/size portals, coins, and hazards.
 */

import { BASE_TILE_SIZE } from './player.js';

export const OBJECT_TYPES = {
    BLOCK: 1,
    SPIKE: 2,
    PAD_YELLOW: 3,
    ORB_YELLOW: 4,
    PORTAL_SHIP: 5,
    PORTAL_CUBE: 6,
    PORTAL_UFO: 7,
    PORTAL_WAVE: 8,
    PORTAL_BALL: 9,
    PORTAL_ROBOT: 10,
    PORTAL_GRAV_NORMAL: 11,
    PORTAL_GRAV_INVERT: 12,
    PAD_PINK: 13,
    ORB_PINK: 14,
    PAD_RED: 15,
    ORB_RED: 16,
    PAD_BLUE_GRAV: 17,
    ORB_BLUE_GRAV: 18,
    ORB_GREEN_GRAV: 19,
    ORB_BLACK_SLAM: 20,
    SPEED_05X: 21,
    SPEED_1X: 22,
    SPEED_2X: 23,
    SPEED_3X: 24,
    SPEED_4X: 25,
    PORTAL_MINI: 26,
    PORTAL_GROWTH: 27,
    CYBER_COIN: 28,
    SAWBLADE: 29,
    HALF_BLOCK: 30,
    // ── ICE & FREEZE MECHANICS ──────────────────
    ICE_BLOCK: 31,      // Slippery solid platform
    ICE_SPIKE: 32,      // Lethal icy spike
    ORB_FREEZE: 33,     // Tap to freeze-jump (slows player for 2s)
    PAD_ICE: 34,        // Ice bounce pad (low friction high bounce)
    FREEZE_ZONE: 35,    // Area that slows player 50%
    // ── BOOST MECHANICS ─────────────────────────
    BOOST_PAD: 36,      // Horizontal speed burst
    DASH_RING: 37,      // Instant forward dash
    // ── DECORATIVE ──────────────────────────────
    ICE_CRYSTAL: 38,    // Collectible ice crystal (like cyber coin)
};

export class PhysicsEngine {
    static check(player, levelData, groundY, input, soundEngine, particleSystem, onCoinCollect, onDeath) {
        const TS = BASE_TILE_SIZE;
        const ps = player.s;
        const px = player.x;
        const py = player.y;

        // 1. Ground & Ceiling Floor Bounds
        if (player.gravityDir === 1) {
            // Normal Gravity
            if (py + ps >= groundY) {
                player.y = groundY - ps;
                player.vy = 0;
                player.grounded = true;
                if (player.form === 'WAVE') {
                    onDeath();
                    return;
                }
            } else {
                player.grounded = false;
            }

            // Ceiling limit for Ship/UFO
            if (py <= 0) {
                player.y = 0;
                if (player.form === 'SHIP' || player.form === 'UFO') {
                    player.vy = 1;
                } else if (player.form === 'WAVE') {
                    onDeath();
                    return;
                }
            }
        } else {
            // Inverted Gravity
            if (py <= 0) {
                player.y = 0;
                player.vy = 0;
                player.grounded = true;
                if (player.form === 'WAVE') {
                    onDeath();
                    return;
                }
            } else {
                player.grounded = false;
            }

            if (py + ps >= groundY) {
                player.y = groundY - ps;
                if (player.form === 'SHIP' || player.form === 'UFO') {
                    player.vy = -1;
                } else if (player.form === 'WAVE') {
                    onDeath();
                    return;
                }
            }
        }

        let hitTolerance = player.isMini ? 2 : 4;
        if (window.cyberDashTierConfig && window.cyberDashTierConfig.hitboxMode) {
            if (window.cyberDashTierConfig.hitboxMode === 'CASUAL') hitTolerance = player.isMini ? 5 : 8;
            else if (window.cyberDashTierConfig.hitboxMode === 'OMEGA') hitTolerance = player.isMini ? 1 : 2;
        }

        // 2. Iterate Level Objects (Early break on sorted X)
        for (let i = 0; i < levelData.length; i++) {
            const obj = levelData[i];
            const ox = obj[0] * TS;
            const oy = groundY - (obj[1] + 1) * TS;
            const type = obj[2];
            const extra = obj[3]; // Coin index or custom parameter

            // If object is ahead of player collision bounds, break early since levelData is sorted
            if (ox > px + ps + TS * 3) break;

            // Cull objects behind player
            if (px + ps - hitTolerance < ox || px + hitTolerance > ox + TS) continue;

            // --- BLOCK (1) ---
            if (type === OBJECT_TYPES.BLOCK) {
                if (py + ps > oy && py < oy + TS) {
                    if (player.gravityDir === 1) {
                        // Normal gravity landing on top
                        if (player.vy >= 0 && py + ps - player.vy <= oy + 14) {
                            player.y = oy - ps;
                            player.vy = 0;
                            player.grounded = true;
                        } else {
                            onDeath();
                            return;
                        }
                    } else {
                        // Inverted gravity landing on bottom
                        if (player.vy <= 0 && py - player.vy >= oy + TS - 14) {
                            player.y = oy + TS;
                            player.vy = 0;
                            player.grounded = true;
                        } else {
                            onDeath();
                            return;
                        }
                    }
                }
            }

            // --- HALF BLOCK (30) ---
            else if (type === OBJECT_TYPES.HALF_BLOCK) {
                const halfH = TS * 0.5;
                const hoy = oy + halfH;
                if (py + ps > hoy && py < hoy + halfH) {
                    if (player.vy >= 0 && py + ps - player.vy <= hoy + 12) {
                        player.y = hoy - ps;
                        player.vy = 0;
                        player.grounded = true;
                    } else {
                        onDeath();
                        return;
                    }
                }
            }

            // --- SPIKE (2) ---
            else if (type === OBJECT_TYPES.SPIKE) {
                const spikeMargin = TS * 0.35;
                const spikeCoreLeft = ox + spikeMargin;
                const spikeCoreRight = ox + TS - spikeMargin;
                const playerCenterX = px + ps / 2;

                if (playerCenterX > spikeCoreLeft && playerCenterX < spikeCoreRight) {
                    if (player.gravityDir === 1) {
                        if (py + ps > oy + TS * 0.4) {
                            onDeath();
                            return;
                        }
                    } else {
                        if (py < oy + TS * 0.6) {
                            onDeath();
                            return;
                        }
                    }
                }
            }

            // --- SAWBLADE (29) ---
            else if (type === OBJECT_TYPES.SAWBLADE) {
                const sawCenterX = ox + TS / 2;
                const sawCenterY = oy + TS / 2;
                const pCenterX = px + ps / 2;
                const pCenterY = py + ps / 2;
                const dist = Math.hypot(pCenterX - sawCenterX, pCenterY - sawCenterY);
                if (dist < TS * 0.42 + ps * 0.3) {
                    onDeath();
                    return;
                }
            }

            // --- JUMP PADS (3, 13, 15, 17) ---
            else if (type === OBJECT_TYPES.PAD_YELLOW || type === OBJECT_TYPES.PAD_PINK || type === OBJECT_TYPES.PAD_RED || type === OBJECT_TYPES.PAD_BLUE_GRAV) {
                const padTop = oy + TS - 12;
                if (py + ps >= padTop && py + ps <= oy + TS + 4) {
                    if (type === OBJECT_TYPES.PAD_YELLOW) {
                        player.vy = -24 * player.gravityDir;
                        if (soundEngine) soundEngine.playSFX('pad');
                        if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#ffd700');
                    } else if (type === OBJECT_TYPES.PAD_PINK) {
                        player.vy = -16 * player.gravityDir;
                        if (soundEngine) soundEngine.playSFX('pad');
                        if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#ff00b7');
                    } else if (type === OBJECT_TYPES.PAD_RED) {
                        player.vy = -30 * player.gravityDir;
                        if (soundEngine) soundEngine.playSFX('pad');
                        if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#ff003c');
                    } else if (type === OBJECT_TYPES.PAD_BLUE_GRAV) {
                        player.gravityDir *= -1;
                        player.vy = 8 * player.gravityDir;
                        if (soundEngine) soundEngine.playSFX('gravity');
                        if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#00f0ff');
                    }
                }
            }

            // --- JUMP ORBS (4, 14, 16, 18, 19, 20) ---
            else if (
                type === OBJECT_TYPES.ORB_YELLOW ||
                type === OBJECT_TYPES.ORB_PINK ||
                type === OBJECT_TYPES.ORB_RED ||
                type === OBJECT_TYPES.ORB_BLUE_GRAV ||
                type === OBJECT_TYPES.ORB_GREEN_GRAV ||
                type === OBJECT_TYPES.ORB_BLACK_SLAM
            ) {
                if (input.tap) {
                    const dist = Math.hypot((px + ps / 2) - (ox + TS / 2), (py + ps / 2) - (oy + TS / 2));
                    if (dist < TS * 1.15) {
                        input.tap = false; // Consume tap

                        if (type === OBJECT_TYPES.ORB_YELLOW) {
                            player.vy = -20 * player.gravityDir;
                            if (soundEngine) soundEngine.playSFX('orb');
                            if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#ffd700');
                        } else if (type === OBJECT_TYPES.ORB_PINK) {
                            player.vy = -14 * player.gravityDir;
                            if (soundEngine) soundEngine.playSFX('orb');
                            if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#ff00b7');
                        } else if (type === OBJECT_TYPES.ORB_RED) {
                            player.vy = -26 * player.gravityDir;
                            if (soundEngine) soundEngine.playSFX('orb');
                            if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#ff003c');
                        } else if (type === OBJECT_TYPES.ORB_BLUE_GRAV) {
                            player.gravityDir *= -1;
                            player.vy = 8 * player.gravityDir;
                            if (soundEngine) soundEngine.playSFX('gravity');
                            if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#00f0ff');
                        } else if (type === OBJECT_TYPES.ORB_GREEN_GRAV) {
                            player.gravityDir *= -1;
                            player.vy = -18 * player.gravityDir;
                            if (soundEngine) soundEngine.playSFX('gravity');
                            if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#39ff14');
                        } else if (type === OBJECT_TYPES.ORB_BLACK_SLAM) {
                            player.vy = 26 * player.gravityDir;
                            if (soundEngine) soundEngine.playSFX('crash');
                            if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#555566');
                        }
                    }
                }
            }

            // --- VEHICLE PORTALS (5-10) ---
            else if (type >= OBJECT_TYPES.PORTAL_SHIP && type <= OBJECT_TYPES.PORTAL_ROBOT) {
                let targetForm = 'CUBE';
                if (type === OBJECT_TYPES.PORTAL_SHIP) targetForm = 'SHIP';
                else if (type === OBJECT_TYPES.PORTAL_CUBE) targetForm = 'CUBE';
                else if (type === OBJECT_TYPES.PORTAL_UFO) targetForm = 'UFO';
                else if (type === OBJECT_TYPES.PORTAL_WAVE) targetForm = 'WAVE';
                else if (type === OBJECT_TYPES.PORTAL_BALL) targetForm = 'BALL';
                else if (type === OBJECT_TYPES.PORTAL_ROBOT) targetForm = 'ROBOT';

                if (player.form !== targetForm) {
                    player.setForm(targetForm);
                    if (soundEngine) soundEngine.playSFX('portal');
                }
            }

            // --- GRAVITY PORTALS (11, 12) ---
            else if (type === OBJECT_TYPES.PORTAL_GRAV_NORMAL && player.gravityDir !== 1) {
                player.setGravity(1);
                if (soundEngine) soundEngine.playSFX('gravity');
            } else if (type === OBJECT_TYPES.PORTAL_GRAV_INVERT && player.gravityDir !== -1) {
                player.setGravity(-1);
                if (soundEngine) soundEngine.playSFX('gravity');
            }

            // --- SPEED GATES (21-25) ---
            else if (type >= OBJECT_TYPES.SPEED_05X && type <= OBJECT_TYPES.SPEED_4X) {
                let mult = 1.0;
                if (type === OBJECT_TYPES.SPEED_05X) mult = 0.5;
                else if (type === OBJECT_TYPES.SPEED_1X) mult = 1.0;
                else if (type === OBJECT_TYPES.SPEED_2X) mult = 2.0;
                else if (type === OBJECT_TYPES.SPEED_3X) mult = 3.0;
                else if (type === OBJECT_TYPES.SPEED_4X) mult = 4.0;

                if (player.speedMult !== mult) {
                    player.setSpeed(mult);
                    if (soundEngine) soundEngine.playSFX('speed');
                }
            }

            // --- SIZE PORTALS (26, 27) ---
            else if (type === OBJECT_TYPES.PORTAL_MINI && !player.isMini) {
                player.setSize(true);
                if (soundEngine) soundEngine.playSFX('portal');
            } else if (type === OBJECT_TYPES.PORTAL_GROWTH && player.isMini) {
                player.setSize(false);
                if (soundEngine) soundEngine.playSFX('portal');
            }

            // --- CYBER COIN (28) ---
            else if (type === OBJECT_TYPES.CYBER_COIN) {
                const coinIndex = extra !== undefined ? extra : 0;
                const dist = Math.hypot((px + ps / 2) - (ox + TS / 2), (py + ps / 2) - (oy + TS / 2));
                if (dist < TS * 0.9) {
                    onCoinCollect(coinIndex, ox + TS / 2, oy + TS / 2);
                }
            }

            // --- ICE BLOCK (31) - Slippery solid platform ---
            else if (type === OBJECT_TYPES.ICE_BLOCK) {
                if (py + ps > oy && py < oy + TS) {
                    if (player.gravityDir === 1) {
                        if (player.vy >= 0 && py + ps - player.vy <= oy + 14) {
                            player.y = oy - ps;
                            player.vy = 0;
                            player.grounded = true;
                            player.isOnIce = true; // Ice flag for reduced friction
                        } else {
                            onDeath();
                            return;
                        }
                    } else {
                        if (player.vy <= 0 && py - player.vy >= oy + TS - 14) {
                            player.y = oy + TS;
                            player.vy = 0;
                            player.grounded = true;
                            player.isOnIce = true;
                        } else {
                            onDeath();
                            return;
                        }
                    }
                }
            }

            // --- ICE SPIKE (32) - Lethal icy spike ---
            else if (type === OBJECT_TYPES.ICE_SPIKE) {
                const spikeMargin = TS * 0.3;
                const spikeCoreLeft = ox + spikeMargin;
                const spikeCoreRight = ox + TS - spikeMargin;
                const playerCenterX = px + ps / 2;
                if (playerCenterX > spikeCoreLeft && playerCenterX < spikeCoreRight) {
                    if (player.gravityDir === 1) {
                        if (py + ps > oy + TS * 0.4) { onDeath(); return; }
                    } else {
                        if (py < oy + TS * 0.6) { onDeath(); return; }
                    }
                }
            }

            // --- ORB FREEZE (33) - Tap to activate freeze jump ---
            else if (type === OBJECT_TYPES.ORB_FREEZE) {
                if (input.tap) {
                    const dist = Math.hypot((px + ps / 2) - (ox + TS / 2), (py + ps / 2) - (oy + TS / 2));
                    if (dist < TS * 1.15) {
                        input.tap = false;
                        // Jump with moderate force
                        player.vy = -17 * player.gravityDir;
                        // Apply freeze effect
                        player.frozen = true;
                        player.freezeTimer = 120; // ~2 seconds at 60fps
                        player.vx = player.vx * 0.7; // Initial slowdown
                        if (soundEngine) soundEngine.playSFX('gravity');
                        if (particleSystem) particleSystem.emitFreezeShatter(ox + TS / 2, oy + TS / 2);
                    }
                }
            }

            // --- PAD ICE (34) - Ice bounce pad ---
            else if (type === OBJECT_TYPES.PAD_ICE) {
                const padTop = oy + TS - 12;
                if (py + ps >= padTop && py + ps <= oy + TS + 4) {
                    player.vy = -22 * player.gravityDir;
                    player.isOnIce = true;
                    if (soundEngine) soundEngine.playSFX('pad');
                    if (particleSystem) particleSystem.emitFreezeShatter(ox + TS / 2, oy + TS / 2);
                }
            }

            // --- FREEZE ZONE (35) - Area slows player ---
            else if (type === OBJECT_TYPES.FREEZE_ZONE) {
                if (px + ps > ox && px < ox + TS && py + ps > oy && py < oy + TS * 3) {
                    if (!player.frozen) {
                        player.frozen = true;
                        player.freezeTimer = 80;
                    }
                }
            }

            // --- BOOST PAD (36) - Horizontal speed burst ---
            else if (type === OBJECT_TYPES.BOOST_PAD) {
                const padTop = oy + TS - 12;
                if (py + ps >= padTop && py + ps <= oy + TS + 4) {
                    player.vy = -10 * player.gravityDir;
                    // Temporary speed boost
                    const oldSpeed = player.speedMult;
                    player.vx = Math.min(player.vx * 1.5, 30);
                    if (soundEngine) soundEngine.playSFX('speed');
                    if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#ff7700');
                }
            }

            // --- DASH RING (37) - Instant forward dash ---
            else if (type === OBJECT_TYPES.DASH_RING) {
                if (input.tap) {
                    const dist = Math.hypot((px + ps / 2) - (ox + TS / 2), (py + ps / 2) - (oy + TS / 2));
                    if (dist < TS * 1.2) {
                        input.tap = false;
                        player.vy = 0;
                        player.vx += 8;
                        if (soundEngine) soundEngine.playSFX('speed');
                        if (particleSystem) particleSystem.emitOrbHit(ox + TS / 2, oy + TS / 2, '#00f0ff');
                    }
                }
            }

            // --- ICE CRYSTAL (38) - Collectible (like CYBER_COIN) ---
            else if (type === OBJECT_TYPES.ICE_CRYSTAL) {
                const coinIndex = extra !== undefined ? extra : 0;
                const dist = Math.hypot((px + ps / 2) - (ox + TS / 2), (py + ps / 2) - (oy + TS / 2));
                if (dist < TS * 0.9) {
                    onCoinCollect(coinIndex, ox + TS / 2, oy + TS / 2);
                    if (particleSystem) particleSystem.emitFreezeShatter(ox + TS / 2, oy + TS / 2);
                }
            }
        }

        // Update freeze timer
        if (player.frozen) {
            player.freezeTimer--;
            if (player.freezeTimer <= 0) {
                player.frozen = false;
                player.freezeTimer = 0;
            }
        }
    }
}
