# To do

Ordered. Do the first open item. Tick and date when done.

## Components

- [x] **Before the rail:** backlog items 1–7, 9 LOCKED 29 Aug 2026 (specs in `archive/pilot-2026-08-29/specs/`). Item 8 (page shell) decided, built with the rail.
- [x] **Service card** — LOCKED by owner 29 Aug 2026. Spec `archive/pilot-2026-08-29/specs/service-card.md`; frozen numbers in `DECISIONS.md`. Open on it: plain copy picks, phone layout.
- [x] **Quick Links rail + page shell** LOCKED 29 Aug 2026 (`archive/pilot-2026-08-29/specs/page-shell.md`). Decided 29 Aug 2026: one `index.html`, hash routes, `<template>` page bodies; rail sticky under the header, 200 wide, main 1080 at 1280. Hover: match nav (6 % tint) unless owner says otherwise. Phone/tablet: propose, owner verifies.
  Original note: Master frame: Passbook Lite `22:2` node `22:46` (168 wide, rows 36 px, 50 px pitch, icon inset 6, label 94 wide, `#d9dbe0` left border, Inter in Figma → Noto Sans). Dashboard `14:66` node `14:110` differs (32 px rows, 46 pitch); the component wins over the frames. Phosphor icons: Passbook `book-open`, File Claim `hand-coins`, Track Claim `list-checks`, e-Nomination `users-three`, Member Service History `clock-counter-clockwise`, Help `question`. Hover: match nav (6 % tint, dark text) unless owner says otherwise — **ask first**. Sticky below the header. Phone/tablet behaviour: not in Figma; propose, owner verifies.
- [x] Judge claim settled 29 Aug 2026: one clear path + plain-English passbook + honest consent/redirect. Errors-never-dead-end stays a content rule. `DECISIONS.md`.
- [x] Mega-panel items locked 29 Aug 2026 from the live-portal captures. Login has no nav row; passbook portal has its own nav. `DECISIONS.md`.
- [x] Dashboard `14:66` LOCKED 29 Aug 2026 (`#/dashboard`).
- [x] Passbook Lite `22:2` LOCKED 29 Aug 2026 (`#/passbook`).
- [x] Login `102:110` LOCKED 29 Aug 2026.
- [x] Consent `22:130` + redirect `22:66` LOCKED 29 Aug 2026.
- [x] Passbook portal `35:79` LOCKED 29 Aug 2026. **All six frames locked.**

## Build mechanics

- [x] Componentisation: decided 29 Aug 2026, one `index.html` + hash routes + templates.
- [ ] Move from `archive/pilot-2026-08-29/` to the real `Code/` structure once the components page exists. `AGENTS.md` says `docs/` deploys; folder here is `Code/`. Reconcile.
- [ ] Components page rendering every component once at Figma size (step 3 of the agreed order).
- [ ] Empty `Brief/`, `DesignSystem/`, `Wireframes/`. Fill or drop the `AGENTS.md` references (`PLAN-SOLO.txt`, `WIREFRAME_CONTEXT.md` no longer exist).
- [x] Demo banner: built, then removed by owner 29 Aug 2026 (AGENTS.md rule waived by owner).

## Quality floor (owner closed QA 29 Aug 2026; one sweep done, see DECISIONS)

- [x] Contrast 4.5:1 (muted grey darkened), focus on every control: swept 29 Aug 2026.
- [x] 375 px: no sideways scroll on any route, 29 Aug 2026.
- [~] Slow 3G: system-ui fallback in place; not tested. Owner closed QA.
- [~] Flesch: sentences pass on consent/passbook/login; dashboard 63; label-heavy screens can't hit 85. Owner closed.
- [~] Error states built: sign-in errors, passbook toast, field error. Loading/empty per screen not built; owner closed QA.

## Housekeeping

- [ ] Kill local servers when done: `python3 -m http.server 8765` (Code/pilot) and `8766` (scratchpad).
- [x] Service card on phone overflow: fixed 29 Aug 2026 with the shell (fixed widths cap under 1024, cards wrap).
