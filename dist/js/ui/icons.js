/**
 * CYBER DASH // Custom gameplay-matched SVG icons
 * Cyan #00f0ff / gold #ffd700 cube motifs — no stock emoji.
 */

const SZ = '100%';

function wrap(inner, { size = 20, className = '', color } = {}) {
    const style = [
        `width:${size}px`,
        `height:${size}px`,
        'display:inline-flex',
        'align-items:center',
        'justify-content:center',
        'flex-shrink:0',
        'vertical-align:middle',
        color ? `color:${color}` : null
    ].filter(Boolean).join(';');
    return `<span class="cd-icon ${className}" style="${style}" aria-hidden="true">${inner}</span>`;
}

const PATHS = {
    // Core economy / UI
    cube: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none"><rect x="3" y="3" width="18" height="18" rx="2.5" fill="currentColor" opacity="0.95"/><rect x="8" y="8" width="8" height="8" rx="1" fill="#050508"/><rect x="10" y="10" width="4" height="4" rx="0.5" fill="#ffd700"/></svg>`,
    bits: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none"><circle cx="12" cy="12" r="9" fill="#ffd700" stroke="#fff3a0" stroke-width="1.2"/><circle cx="12" cy="12" r="5.5" fill="none" stroke="#050508" stroke-width="1.4"/><path d="M12 7.5v9M9.5 9.5c.8-.8 1.6-1.1 2.5-1.1 1.6 0 2.6.9 2.6 2.1 0 1.3-1 1.9-2.6 2.4-1.5.5-2.4 1-2.4 2.2 0 1.1 1 1.9 2.5 1.9.9 0 1.7-.3 2.4-1" stroke="#050508" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    orbs: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none"><polygon points="12 2 22 12 12 22 2 12" fill="#00f0ff" stroke="#a8eeff" stroke-width="1.2"/><polygon points="12 7 17 12 12 17 7 12" fill="#050508" opacity="0.55"/><circle cx="12" cy="12" r="2" fill="#ffd700"/></svg>`,
    star: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    gift: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none"><rect x="3" y="10" width="18" height="11" rx="1.5" fill="#ffd700" stroke="#fff3a0" stroke-width="1"/><rect x="11" y="10" width="2" height="11" fill="#050508"/><path d="M3 10h18v-2.5A1.5 1.5 0 0 0 19.5 6H4.5A1.5 1.5 0 0 0 3 7.5V10z" fill="#00f0ff"/><path d="M12 6C12 6 9 2.5 7 4.5S10 8 12 6c0 0 3-3.5 5-1.5S14 8 12 6z" fill="#ff003c"/></svg>`,
    cryo: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14M9 3l3 3 3-3M9 21l3-3 3 3M3 9l3 3-3 3M21 9l-3 3 3 3"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M13 2L4 14h7l-1 8 10-13h-7l1-7z"/></svg>`,
    play: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M8 5v14l12-7L8 5z"/></svg>`,
    pause: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>`,
    lock: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,
    warn: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18h.01"/></svg>`,
    fail: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
    wait: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    crown: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M3 18l2-10 5 4 2-7 2 7 5-4 2 10H3z"/><rect x="4" y="18" width="16" height="2.5" rx="0.5" fill="#ffd700"/></svg>`,
    trophy: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M8 6H5a2 2 0 0 0 2 4h1M16 6h3a2 2 0 0 1-2 4h-1"/><path d="M12 13v3M9 20h6M10 16h4"/></svg>`,
    spark: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M12 2l1.2 6.3L19 7l-4.2 4.2L21 12l-6.2.8L17 19l-5-3.5L7 19l1.2-6.2L2 12l6.2-.8L4 7l5.8 1.3L12 2z"/></svg>`,
    net: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/><path d="M9 12l2 2 4-4" fill="none" stroke="#050508" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    city: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><rect x="2" y="10" width="5" height="12"/><rect x="9" y="4" width="6" height="18"/><rect x="17" y="8" width="5" height="14"/><rect x="10.5" y="7" width="1.2" height="1.2" fill="#050508"/><rect x="13" y="7" width="1.2" height="1.2" fill="#050508"/><rect x="10.5" y="10" width="1.2" height="1.2" fill="#050508"/></svg>`,
    wave: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/></svg>`,
    vortex: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3c5 0 9 2.5 9 6s-4 4-9 4-9 1.5-9 4 4 4 9 4"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
    rocket: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M12 2c3 2 5 6 5 11l-2.5 1.5L12 22l-2.5-7.5L7 13c0-5 2-9 5-11z"/><circle cx="12" cy="10" r="1.6" fill="#050508"/><path d="M7 14l-3 2 2-4M17 14l3 2-2-4" opacity="0.85"/></svg>`,
    skull: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><ellipse cx="12" cy="10" rx="8" ry="7.5"/><circle cx="9" cy="10" r="1.8" fill="#050508"/><circle cx="15" cy="10" r="1.8" fill="#050508"/><path d="M10 14h4M9 17v3M12 17v3M15 17v3" stroke="#050508" stroke-width="1.4" fill="none"/></svg>`,
    mecha: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><rect x="7" y="4" width="10" height="8" rx="1"/><rect x="4" y="13" width="16" height="7" rx="1"/><circle cx="12" cy="8" r="2" fill="#ffd700"/><rect x="2" y="14" width="3" height="5" rx="0.5"/><rect x="19" y="14" width="3" height="5" rx="0.5"/></svg>`,
    neko: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M5 10l2-6 3 4h4l3-4 2 6v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-6z"/><circle cx="9.5" cy="12" r="1.3" fill="#050508"/><circle cx="14.5" cy="12" r="1.3" fill="#050508"/><path d="M10 15.5c.7.7 2.3.7 3 0" stroke="#050508" stroke-width="1.2" fill="none"/></svg>`,
    kitsune: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M4 18c1-4 3-7 5-8l-2-6 5 4 5-4-2 6c2 1 4 4 5 8H4z"/><circle cx="9" cy="14" r="1.2" fill="#050508"/><circle cx="15" cy="14" r="1.2" fill="#050508"/></svg>`,
    dragon: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M3 16c2-1 4-5 6-5 1 0 2 1 3 1s2-2 4-2c2 0 4 2 5 4l-2 2c-1-1-2-1-3 0l-2 3H9l-2-2-4 1v-2z"/><circle cx="17" cy="11" r="1.2" fill="#ffd700"/></svg>`,
    glitch: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="3" y="8" width="18" height="2" fill="#ff003c" opacity="0.7"/><rect x="4" y="13" width="16" height="1.5" fill="#00f0ff" opacity="0.7"/><circle cx="9" cy="11" r="1.2" fill="#050508"/><circle cx="15" cy="11" r="1.2" fill="#050508"/></svg>`,
    valkyrie: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M12 3l3 5h4l-3 3 2 7-6-4-6 4 2-7-3-3h4l3-5z"/><path d="M4 10l-2 2 4 1M20 10l2 2-4 1" opacity="0.8"/></svg>`,
    emperor: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="#ffd700"><path d="M3 18l2-10 5 4 2-7 2 7 5-4 2 10H3z"/><rect x="5" y="18" width="14" height="3" rx="0.5"/><circle cx="12" cy="8" r="1.5" fill="#00f0ff"/></svg>`,
    rainbow: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M4 16a8 8 0 0 1 16 0" stroke="#ff003c"/><path d="M6 16a6 6 0 0 1 12 0" stroke="#ffd700"/><path d="M8 16a4 4 0 0 1 8 0" stroke="#39ff14"/><path d="M10 16a2 2 0 0 1 4 0" stroke="#00f0ff"/></svg>`,
    void: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="#b026ff" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4" fill="#b026ff" opacity="0.5"/><circle cx="12" cy="12" r="1.5" fill="#050508"/></svg>`,
    shop: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9h16l-1 11H5L4 9z"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/><path d="M9 13h6"/></svg>`,
    scroll: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4h10a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V4z"/><path d="M9 9h6M9 13h6"/></svg>`,
    jump: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 19h14M8 15l4-10 4 10"/><path d="M12 5v2"/></svg>`,

    // Editor / gameplay object motifs
    block: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="3" y="3" width="18" height="18" rx="1" fill="#00f0ff"/><rect x="6" y="6" width="12" height="12" fill="#050508" opacity="0.35"/></svg>`,
    half_block: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="3" y="12" width="18" height="9" rx="1" fill="#00f0ff"/></svg>`,
    spike: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><polygon points="12 3 21 21 3 21" fill="#ff003c"/><polygon points="12 8 17 19 7 19" fill="#050508" opacity="0.25"/></svg>`,
    sawblade: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><circle cx="12" cy="12" r="4" fill="#050508" stroke="#c0c8d0" stroke-width="2"/><path d="M12 2l1.5 4.5L18 4l-1.5 4.5L22 12l-4.5 1.5L20 18l-4.5-1.5L12 22l-1.5-4.5L6 20l1.5-4.5L2 12l4.5-1.5L4 6l4.5 1.5z" fill="#c0c8d0"/></svg>`,
    pad_yellow: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="2" y="14" width="20" height="6" rx="1" fill="#ffd700"/><path d="M8 14l4-6 4 6" fill="#fff3a0"/></svg>`,
    pad_pink: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="2" y="14" width="20" height="6" rx="1" fill="#ff00b7"/><path d="M8 14l4-6 4 6" fill="#ff9de0"/></svg>`,
    pad_red: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="2" y="14" width="20" height="6" rx="1" fill="#ff003c"/><path d="M8 14l4-6 4 6" fill="#ff8aa0"/></svg>`,
    pad_blue: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="2" y="14" width="20" height="6" rx="1" fill="#0080ff"/><path d="M12 8v6M9 11l3-3 3 3" stroke="#a8eeff" stroke-width="1.5" fill="none"/></svg>`,
    orb_yellow: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><circle cx="12" cy="12" r="8" fill="#ffd700" stroke="#fff3a0" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#050508" opacity="0.35"/></svg>`,
    orb_pink: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><circle cx="12" cy="12" r="8" fill="#ff00b7" stroke="#ff9de0" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#050508" opacity="0.35"/></svg>`,
    orb_red: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><circle cx="12" cy="12" r="8" fill="#ff003c" stroke="#ff8aa0" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#050508" opacity="0.35"/></svg>`,
    orb_blue: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><circle cx="12" cy="12" r="8" fill="#0080ff" stroke="#a8eeff" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#050508" opacity="0.35"/></svg>`,
    orb_green: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><circle cx="12" cy="12" r="8" fill="#39ff14" stroke="#b8ff9a" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#050508" opacity="0.35"/></svg>`,
    orb_black: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><circle cx="12" cy="12" r="8" fill="#1a1a22" stroke="#666" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#ff003c"/></svg>`,
    portal_cube: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#00f0ff" stroke-width="2"/><rect x="8" y="8" width="8" height="8" rx="1" fill="#00f0ff"/></svg>`,
    portal_ship: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#39ff14" stroke-width="2"/><path d="M7 14l5-7 5 7H7z" fill="#39ff14"/></svg>`,
    portal_ufo: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#b026ff" stroke-width="2"/><ellipse cx="12" cy="12" rx="6" ry="2.5" fill="#b026ff"/><circle cx="12" cy="10" r="2" fill="#ffd700"/></svg>`,
    portal_wave: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#00f0ff" stroke-width="2"/><path d="M7 12c1.5-3 3-3 4.5 0s3 3 4.5 0" stroke="#00f0ff" stroke-width="2"/></svg>`,
    portal_ball: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#ffd700" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="#ffd700"/></svg>`,
    portal_robot: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#ff7700" stroke-width="2"/><rect x="8" y="8" width="8" height="7" rx="1" fill="#ff7700"/><rect x="9.5" y="10" width="2" height="2" fill="#050508"/><rect x="12.5" y="10" width="2" height="2" fill="#050508"/></svg>`,
    grav_up: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 19V5M7 10l5-5 5 5"/></svg>`,
    grav_down: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M7 14l5 5 5-5"/></svg>`,
    speed_05: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><text x="12" y="16" text-anchor="middle" font-size="9" font-family="monospace" font-weight="800">0.5x</text></svg>`,
    speed_1: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><text x="12" y="16" text-anchor="middle" font-size="10" font-family="monospace" font-weight="800">1x</text></svg>`,
    speed_2: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><text x="12" y="16" text-anchor="middle" font-size="10" font-family="monospace" font-weight="800">2x</text></svg>`,
    speed_3: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><text x="12" y="16" text-anchor="middle" font-size="10" font-family="monospace" font-weight="800">3x</text></svg>`,
    speed_4: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="#ff003c"><text x="12" y="16" text-anchor="middle" font-size="10" font-family="monospace" font-weight="800">4x</text></svg>`,
    mini: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="8" y="8" width="8" height="8" rx="1" fill="#00f0ff"/></svg>`,
    grow: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}"><rect x="3" y="3" width="18" height="18" rx="2" fill="#00f0ff"/><rect x="8" y="8" width="8" height="8" fill="#050508" opacity="0.4"/></svg>`,
    party: `<svg viewBox="0 0 24 24" width="${SZ}" height="${SZ}" fill="currentColor"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z"/><circle cx="5" cy="18" r="1.5" fill="#ff003c"/><circle cx="19" cy="17" r="1.5" fill="#39ff14"/><circle cx="16" cy="20" r="1.2" fill="#00f0ff"/></svg>`
};

/** Render icon by key into an inline HTML span. */
export function icon(name, opts = {}) {
    const key = (name || 'cube').toLowerCase().replace(/\s+/g, '_');
    const svg = PATHS[key] || PATHS.cube;
    return wrap(svg, opts);
}

/** Accept icon key or raw HTML/SVG; always return safe HTML for UI slots. */
export function resolveIcon(value, opts = {}) {
    if (!value) return icon('cube', opts);
    if (typeof value === 'string' && (value.includes('<svg') || value.includes('cd-icon'))) {
        return value;
    }
    return icon(value, opts);
}

/** Currency chip HTML (bits / orbs). */
export function currencyChip(type, amount, opts = {}) {
    const key = type === 'orbs' ? 'orbs' : 'bits';
    const color = key === 'orbs' ? '#00f0ff' : '#ffd700';
    return `${icon(key, { size: opts.size || 16, color })} <span>${amount}</span>`;
}

export const ICON_KEYS = Object.keys(PATHS);
export default { icon, resolveIcon, currencyChip, ICON_KEYS };
