/**
 * CYBER DASH // IN-GAME VISUAL LEVEL EDITOR
 * Visual grid-based sandbox editor with object placement, erasure,
 * test-run execution, level parameters, and JSON export/import.
 */

import { BASE_TILE_SIZE } from '../engine/player.js';
import { OBJECT_TYPES } from '../engine/physics.js';
import { StorageManager } from '../ui/storage.js';
import { drawLevelMap } from './level-data.js';

export const EDITOR_PALETTE = [
    { type: OBJECT_TYPES.BLOCK, name: 'Block', icon: 'block' },
    { type: OBJECT_TYPES.HALF_BLOCK, name: 'Half Block', icon: 'half_block' },
    { type: OBJECT_TYPES.SPIKE, name: 'Spike', icon: 'spike' },
    { type: OBJECT_TYPES.SAWBLADE, name: 'Sawblade', icon: 'sawblade' },
    { type: OBJECT_TYPES.PAD_YELLOW, name: 'Yellow Pad', icon: 'pad_yellow' },
    { type: OBJECT_TYPES.PAD_PINK, name: 'Pink Pad', icon: 'pad_pink' },
    { type: OBJECT_TYPES.PAD_RED, name: 'Red Pad', icon: 'pad_red' },
    { type: OBJECT_TYPES.PAD_BLUE_GRAV, name: 'Gravity Pad', icon: 'pad_blue' },
    { type: OBJECT_TYPES.ORB_YELLOW, name: 'Yellow Orb', icon: 'orb_yellow' },
    { type: OBJECT_TYPES.ORB_PINK, name: 'Pink Orb', icon: 'orb_pink' },
    { type: OBJECT_TYPES.ORB_RED, name: 'Red Orb', icon: 'orb_red' },
    { type: OBJECT_TYPES.ORB_BLUE_GRAV, name: 'Blue Orb', icon: 'orb_blue' },
    { type: OBJECT_TYPES.ORB_GREEN_GRAV, name: 'Green Orb', icon: 'orb_green' },
    { type: OBJECT_TYPES.ORB_BLACK_SLAM, name: 'Black Slam', icon: 'orb_black' },
    { type: OBJECT_TYPES.PORTAL_CUBE, name: 'Cube Portal', icon: 'portal_cube' },
    { type: OBJECT_TYPES.PORTAL_SHIP, name: 'Ship Portal', icon: 'portal_ship' },
    { type: OBJECT_TYPES.PORTAL_UFO, name: 'UFO Portal', icon: 'portal_ufo' },
    { type: OBJECT_TYPES.PORTAL_WAVE, name: 'Wave Portal', icon: 'portal_wave' },
    { type: OBJECT_TYPES.PORTAL_BALL, name: 'Ball Portal', icon: 'portal_ball' },
    { type: OBJECT_TYPES.PORTAL_ROBOT, name: 'Robot Portal', icon: 'portal_robot' },
    { type: OBJECT_TYPES.PORTAL_GRAV_INVERT, name: 'Invert Grav', icon: 'grav_up' },
    { type: OBJECT_TYPES.PORTAL_GRAV_NORMAL, name: 'Normal Grav', icon: 'grav_down' },
    { type: OBJECT_TYPES.SPEED_05X, name: '0.5x Slow', icon: 'speed_05' },
    { type: OBJECT_TYPES.SPEED_1X, name: '1x Normal', icon: 'speed_1' },
    { type: OBJECT_TYPES.SPEED_2X, name: '2x Fast', icon: 'speed_2' },
    { type: OBJECT_TYPES.SPEED_3X, name: '3x Hyper', icon: 'speed_3' },
    { type: OBJECT_TYPES.SPEED_4X, name: '4x Ludicrous', icon: 'speed_4' },
    { type: OBJECT_TYPES.PORTAL_MINI, name: 'Mini Size', icon: 'mini' },
    { type: OBJECT_TYPES.PORTAL_GROWTH, name: 'Normal Size', icon: 'grow' },
    { type: OBJECT_TYPES.CYBER_COIN, name: 'Cyber Core', icon: 'orbs' }
];

export class LevelEditor {
    constructor() {
        this.active = false;
        this.selectedType = OBJECT_TYPES.BLOCK;
        this.tool = 'place'; // 'place', 'erase'
        this.camX = 0;
        this.level = {
            id: 'custom_' + Date.now(),
            name: 'MY CYBER SECTOR',
            diff: 'NORMAL',
            stars: 2,
            length: 200,
            color: '#00f0ff',
            bg: '#050518',
            audioTrack: { bpm: 140, rootFreq: 32.70, scale: 'AEOLIAN' },
            data: []
        };
        this.coinCount = 0;
    }

    initLevel(levelObj) {
        if (levelObj) {
            this.level = JSON.parse(JSON.stringify(levelObj));
        } else {
            this.level = {
                id: 'custom_' + Date.now(),
                name: 'MY CYBER SECTOR',
                diff: 'NORMAL',
                stars: 2,
                length: 200,
                color: '#00f0ff',
                bg: '#050518',
                audioTrack: { bpm: 140, rootFreq: 32.70, scale: 'AEOLIAN' },
                data: []
            };
        }
        this.camX = 0;
    }

    handleGridClick(canvasX, canvasY, groundY, isRightClick = false) {
        const TS = BASE_TILE_SIZE;
        const worldX = canvasX + this.camX;
        const gridX = Math.floor(worldX / TS);
        const gridY = Math.floor((groundY - canvasY) / TS);

        if (gridX < 0 || gridY < 0 || gridY > 15) return;

        if (isRightClick || this.tool === 'erase') {
            // Erase object at gridX, gridY
            const idx = this.level.data.findIndex(obj => obj[0] === gridX && obj[1] === gridY);
            if (idx >= 0) {
                this.level.data.splice(idx, 1);
            }
        } else {
            // Place object
            // Remove existing object at position if any
            const idx = this.level.data.findIndex(obj => obj[0] === gridX && obj[1] === gridY);
            if (idx >= 0) this.level.data.splice(idx, 1);

            let extra = 0;
            if (this.selectedType === OBJECT_TYPES.CYBER_COIN) {
                extra = this.coinCount % 3;
                this.coinCount++;
            }

            this.level.data.push([gridX, gridY, this.selectedType, extra]);
            // Sort data by X for performance
            this.level.data.sort((a, b) => a[0] - b[0]);
        }
    }

    render(ctx, groundY) {
        const TS = BASE_TILE_SIZE;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        // 1. Clear background
        ctx.fillStyle = this.level.bg || '#050518';
        ctx.fillRect(0, 0, width, height);

        // 2. Draw Editor Grid Lines
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.lineWidth = 1;

        const startX = -(this.camX % TS);
        for (let x = startX; x < width; x += TS) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, groundY);
            ctx.stroke();
        }

        for (let y = groundY; y >= 0; y -= TS) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // 3. Draw Floor
        ctx.fillStyle = '#050508';
        ctx.fillRect(0, groundY, width, height - groundY);
        ctx.strokeStyle = this.level.color || '#00f0ff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(width, groundY);
        ctx.stroke();

        // 4. Draw Level Objects
        drawLevelMap(ctx, this.level.data, this.camX, groundY, this.level.color);

        // 5. Draw Finish Line
        const finishX = this.level.length * TS - this.camX;
        if (finishX >= 0 && finishX <= width) {
            ctx.strokeStyle = '#39ff14';
            ctx.lineWidth = 4;
            ctx.setLineDash([8, 8]);
            ctx.beginPath();
            ctx.moveTo(finishX, 0);
            ctx.lineTo(finishX, groundY);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = '#39ff14';
            ctx.font = 'bold 12px "Courier New", monospace';
            ctx.fillText('FINISH LINE', finishX + 6, 30);
        }

        // 6. Draw Coordinates Overlay
        ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
        ctx.font = '12px "Courier New", monospace';
        ctx.fillText(`CAM X: ${Math.floor(this.camX / TS)} | LENGTH: ${this.level.length} | OBJECTS: ${this.level.data.length}`, 16, 24);
    }

    exportJSON() {
        return JSON.stringify(this.level, null, 2);
    }

    importJSON(jsonStr) {
        try {
            const parsed = JSON.parse(jsonStr);
            if (parsed && parsed.data && Array.isArray(parsed.data)) {
                this.level = parsed;
                if (!this.level.id) this.level.id = 'custom_' + Date.now();
                return true;
            }
        } catch (e) {}
        return false;
    }

    saveToStorage() {
        return StorageManager.saveCustomLevel(this.level);
    }
}
