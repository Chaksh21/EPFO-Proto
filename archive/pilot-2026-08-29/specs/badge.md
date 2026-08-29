# Badge / status chip

Locked by owner 29 Aug 2026. One shape, five tones.

Markup: `<span class="ep-badge ep-badge--{new|primary|success|neutral|warning}">Text</span>`. Optional leading 12 px icon (`.ep-icon`, from the sprite), gap 4.

- Pill, 20 tall, padding 0 8, 11/16 semibold, never wraps, `vertical-align: middle`.
- new: `#de333d` fill, white, uppercase, 0.04em tracking. Login "NEW" (`102:141`).
- primary: `#eeeafc` / `#4a2bc2`. "New member" on the cta card (`.ep-card-badge` carries the same numbers).
- success: `#e7f6ee` / `#0e7a4d`, with `check-bold` tick. "Active member" (`75:7`).
- neutral: `#f5f5f5` / `#6b7378`, weight 500. "Under process · filed 12 Aug 2026" (`18:64`).
- warning: `#fef0e4` / `#c4560f`, with `warning-circle` icon. Not in Figma; for "action needed" states. Owner confirmed 29 Aug 2026.
- Deviations from Figma: 9 / 10 → 11 px, 700 → 600, r3 / r4 / r12 → pill, heights → 20.
