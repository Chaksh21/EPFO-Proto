# Button

Locked by owner 29 Aug 2026. One size, four variants (tertiary added with the announcement list).

Markup: `<button type="button" class="ep-btn ep-btn--{primary|secondary|outline}">Label</button>`. Links that look like buttons use `<a>` with the same classes. `ep-btn--block` fills the row.

- Box: 40 tall (min-height), padding 0 16, radius 8, 1 px border always present (transparent on primary) so variants share a height.
- Type: 14/20 semibold, Noto Sans. Label never wraps.
- Primary: `#4a2bc2` fill, white text. Hover `#3d239f`.
- Secondary: white, `#d9dbe0` border, `#1c1f21` text. Hover `#f5f5f5`, border `#c4c8cf`.
- Outline: white, primary border and text. Hover `#f9f8fe`, primary-700 border/text.
- Tertiary: transparent, no visible border, primary text. Hover `#f9f8fe` fill, primary-700 text. For inline actions in rows (View PDF). Optional 16 px leading icon, gap 8.
- `ep-btn--sm`: 32 tall, padding 0 12, 12/16. Only for tertiary / inline actions inside 12 px rows (View PDF in strips and lists). Form and dialog buttons stay 40.
- Pressed: 1 px down. Focus: 2 px primary ring, offset 2. Disabled: primary `#c9bff0`; others `#fafafa` / `#e5e5e5` border / `#a3a3a3` text, `not-allowed`.
- Loading (`.is-loading`): label transparent, 16 px ring spinner, no pointer events. Script must also set `aria-busy="true"`.
- Figma deviations, on purpose: 12/17 → 14/20 and r6 → r8 on login/consent; Logout 16/20 500 → 14/20 600. Height 39/41 → 40.

Where: Sign in / Reset (`102:184`), Allow / Not Now (`26:291`), Logout (`62:55`), Activate.
