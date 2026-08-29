# UX4G 3.1.0 study — what it really gives the nav and rail

Measured against `cdn.ux4g.gov.in/UX4G@3.1.0` on 29 Aug 2026. Numbers from the served files, not the docs.

## 1. What loads

- `index.css` is 1.3 KB of `@import`. Those import more `@import` files. Fully resolved: **152 CSS files, ~925 KB**, fetched in a dependency chain (browser cannot start level 3 until level 2 arrives). `patterns/ux4g-patterns.css` returns **404** — the P-01 / P-07 pattern CSS referenced in AGENTS.md does not exist at this version.
- `ux4g.js` 100 KB, `ux4g-custom.js` 179 KB.
- Fonts: Noto Sans and Noto Sans Display are self-hosted at `cdn.ux4g.gov.in/UX4G@3.1.0/assets/fonts/` via `@font-face`. Same origin as the CSS, so the one-origin rule holds. Material Icons fonts also self-hosted.
- Consequence for the Slow-3G rule: the chain guarantees a long unstyled window. Our own stylesheet must make the page readable on its own; UX4G must be additive, never load-bearing.

## 2. Figma was drawn on UX4G tokens

| Figma hex | UX4G token | Used for |
| --- | --- | --- |
| `#4a2bc2` | `--ux4g-color-primary-600` | nav links, Logout, search button, active underline |
| `#171717` | neutral text | logo label, UAN |
| `#737373` | neutral secondary | name under UAN, search placeholder |
| `#e5e5e5` | neutral border | nav row borders, search border |
| `#f5f5f5` | neutral soft | UAN chip bg, active nav pill, rail icon boxes |

Not in UX4G at all: `#12102e` (accessibility bar bg), `#8c7ad9` (bar dividers), `#de333d` (badge red — UX4G error-strong is a different red), `#d9dbe0` (rail border), `#1c1f21` (rail text). These need literal values in our CSS. That is fine; START-HERE already killed the "no literal colours" rule.

Fonts: nav bands use **Noto Sans** (matches UX4G base). The rail uses **Inter** in Figma. Inter is not on the allowed origin. Rail will render in Noto Sans. Expect ~1–2 px width drift on rail labels. Accepted unless the owner objects.

## 3. Component by component

### Accessibility bar (46 px, `#12102e`)
UX4G has **no** top government bar component, no skip-link class, no font-size-toggle widget. Everything here is ours. UX4G contributes nothing but tokens for spacing.

### Navbar (80 px, white)
`.ux4g-navbar` exists but is a thin flex shell: background elevated, level-2 shadow, `.ux4g-navbar-wrap` space-between, `.ux4g-navbar-links` as an unstyled `<ul>`. It has a hard `@media (max-width:768px)` that hides `.ux4g-navbar-desktop`. It also puts a shadow on the bar, which the Figma does not have. Usable as a shell, will need shadow removed.
- Logo circle: `.ux4g-avatar-m` = 2.5 rem = 40 px. Exact.
- Notification badges: `.ux4g-badge-digit-danger` = 18 px tall, 4 px side padding, bold, white text. Figma badge is 16×14 with 9 px text and `#de333d`. Close but not exact; needs a 2-line override.
- UAN chip: no UX4G chip matches a two-line avatar chip. Ours.
- Logout: `.ux4g-btn-primary.ux4g-btn-md` = min-height 2.5 rem (40 px), 16 px text, 20 px line-height, primary-600 bg. Figma: 96×40, 16/20, `#4a2bc2`, radius 8. **Exact match.** First real win.

### Nav row (48 px, white, 1 px `#e5e5e5` top and bottom)
No UX4G class for a secondary link row with active pill + underline. `.ux4g-dropdown-*` exists but it is a form select (single/multi, chips, options) driven by `ux4g-custom.js`, not a menu-bar dropdown. Using it for "View ▾" would be fighting the library. Nav row is ours; we only borrow `--ux4g-color-primary-600` and the 14 px / 18 px type tokens.
- Search: `.ux4g-search` + `.ux4g-search-input` + `.ux4g-search-btn` is structurally the same as the Figma (bordered input, primary button on the right, 36 px `--ux4g-sz-m`). Radius, border colour and button width (52 px) need checking against the render. Good candidate to use as-is.

### Quick Links rail (168 px, white, 1 px `#d9dbe0` left border, sticky)
No rail, sidebar or side-nav component in UX4G 3.1.0. `.ux4g-list-*` exists but adds its own paddings and row heights. Sticky is only available as breakpoint utilities (`.ux4g-lg-sticky-top`), no plain `position: sticky` class. Rail is entirely ours.

**Figma drift inside the source itself:** the rail is not identical across frames. Dashboard `14:66` rows are 32 px tall, icon at x=0, label 106 px wide. Passbook Lite `22:2` rows are 36 px, icon at x=6, label 94 px wide, 50 px pitch instead of 46. The nav row also differs by 1 px in item x positions between the two frames. This is exactly the drift a component layer must resolve. Owner must pick one measurement set; the component then wins over the frames.

## 4. Verdict

UX4G is a token library plus a handful of form-ish components. For the two pilot components it directly supplies: the Logout button (exact), the avatar circle (exact), the search bar (close), the notification badge (close). It supplies nothing for the accessibility bar, the nav row, the UAN chip or the rail. Roughly 30 % of the nav and 0 % of the rail come from UX4G.

Cost of keeping it: ~925 KB CSS and 280 KB JS over a 152-request chain, one 404, a navbar shadow to undo, and a mobile media query we do not want.

Recommended: **hybrid**. Load UX4G per the rules, use the four classes that match exactly, write every other component in our own `components.css` using UX4G token names where a token exists and literal hex where it does not. Our stylesheet loads first and is complete on its own, so a slow UX4G changes only button and badge polish, never layout or readability.

Alternative if the owner prefers: drop the UX4G CSS link entirely, copy the ~10 token values we use into `:root`, keep the 1-origin rule trivially. Saves 1.2 MB. Loses the "built on UX4G" claim for judges.
