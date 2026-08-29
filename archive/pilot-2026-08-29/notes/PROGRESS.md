# Progress

Newest first. One line per thing that happened, with the file it changed.

## 29 Aug 2026 — close-out

- Demo sign-in (UAN 1000 2233 4455 / Demo@2026), route guard, Logout on both portals, field errors. `app.js`.
- "Passbook Lite" in the View menu and rail, both linking to `#/passbook`. Copy sweep (Forgot password?, UAN number). Demo banner on every screen. Muted grey darkened for 4.5:1.
- Owner closed QA: no further mobile testing.

## 29 Aug 2026 — component backlog locked (afternoon)

- **Passbook portal built** (`#/portal`): "Passbook Portal" brand, sub-nav tabs, hero, donut + members + employer cards, no rail. **Locked by owner** after a polish pass (white-card hero, headings outside cards, no search). All six frames locked; the demo path runs login → dashboard → passbook → consent → redirect → portal.
- **Consent + redirect built** (`#/consent`, `#/redirect`): passbook behind a scrim, dialogs from Figma, Allow → redirect → 3 s progress → `#/portal`. **Locked by owner.**
- **Passbook Lite built** (`#/passbook`): page head, 3 stat cards, entries table with dark header, year select, download, error toast (auto-dismiss 10 s). **Locked by owner.**
- **Dashboard built** (`#/dashboard`): profile card, four stat cards, action row, notice strip, rail. **Locked by owner.** `compare/dashboard-*.png`.
- **Login page built** (`#/login`). `index.html` is now the app (templates + `app.js` hash router); components page moved to `components.html`. Guest header hides nav/chip/Logout. **Locked by owner** (Forgot Password moved under the field). `compare/login-*.png`.
- Backlog 1–7 and 9 locked by owner in one interview: tokens (weights ≤600, spacing ×4, card inset 12), buttons (one size 14/20, four variants + `--sm` for inline), form field (error B: text + icon + red border), badge (pill, five tones), section heading / page head / text link (middle: caret links hover-underline, inline always), footer (12 px), notice strip (megaphone, blue normal / yellow urgent), announcement list (hairline rows, PDF tertiary). Specs in `archive/pilot-2026-08-29/specs/`. Every pick in `DECISIONS.md`.
- Bar A−/A/A+ now works (zoom steps copied from UX4G's widget). `pilot.js`.
- **Page shell + rail locked by owner.** Rail on the viewport edge, `max(200px, 16vw)`, sticky under the header; main fluid, content aligned under the header's brand; rail drops below main under 1024. 375 no longer scrolls sideways. `specs/page-shell.md`.
- Page shell decided: one `index.html`, hash routes, `<template>` bodies. Rail: sticky, 200 wide, main 1080. Build next.

## 29 Aug 2026 — header pilot, start to lock

- Card copy rewritten plain (owner picked all). Component backlog written: `archive/pilot-2026-08-29/COMPONENTS.md`. `TODO.md`, `START-HERE.md` point to it.
- **Service card locked by owner** after polish, tone round 2 (purple → cta only, rose added, tints lightened). Frozen numbers in `archive/pilot-2026-08-29/DECISIONS.md`.
- Service card: chevron, hover/press/focus states, and row / cta / rail layouts built on the one markup; icon tones from the live portal; 36 px icon box. `DECISIONS.md` has the numbers.
- Service card interview done; stack variant built under the header, awaiting owner eyeball. `archive/pilot-2026-08-29/specs/service-card.md`, `index.html`, `pilot.css`, `DECISIONS.md`.
- Bar options (text size, language) moved into the phone hamburger panel; bar keeps label + accessibility icon. `pilot.js`, `pilot.css`.
- Responsive header shipped, copied from ux4g.gov.in: tablet nav row scrolls, phone hamburger with in-flow accordion panel built from the desktop menus. No sideways scroll at 300/375/900. `pilot.js`, `pilot.css`, `index.html`.
- **Header locked by owner.** Nav items same box, muted grey, dark active with absolute 2 px indicator; bell 24 px with corner badge; messages icon removed; floating-on-scroll dropped (heavy on old devices), thin shadow instead.
- UX4G CSS/JS unlinked (owner's choice, option 2). Tokens copied to `:root`; font file stays on the CDN. Rendered identically. `AGENTS.md` rule updated.
- Phosphor icons inlined as a sprite; 20 icons mapped. Figma circle placeholders deleted except the logo.
- polish pass: drawn chevrons/arrows, eyebrows removed, one motion curve, hover/focus/active on every control, themed selection/caret/focus.
- Header behaviour copied from ux4g.gov.in: hover-intent mega menus (100 ms open, instant close), squared corners while open, Esc/focus-out handling.
- Header built from Figma `14:66` bands `62:2`, `62:25`, `62:590`. Landmarks within 1.5 px. Diff 5,344 px of 222,720, all anti-aliasing.
- UX4G 3.1.0 studied on its own CDN: 152-file import chain, patterns CSS 404, weight-400-only font, `!important` inside `@layer`. `archive/pilot-2026-08-29/UX4G-REPORT.md`.
- Interview done; goals and pilot scope fixed. `archive/pilot-2026-08-29/DECISIONS.md`.

## Earlier

- Previous attempt abandoned (see git history of `../EPFO-Design-Challenge/build/`). Reasons recorded in the old `START-HERE.md`: no component layer, one page's pattern imposed on others, automated checks mistaken for fidelity, self-imposed rules deleting the design.
