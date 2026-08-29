# Start here

Read this, then `PROGRESS.md`, then `TODO.md`. Settled decisions live in
`archive/pilot-2026-08-29/DECISIONS.md`; do not reopen them without the owner.

## What this is

Independent hackathon prototype (Build What Moves India) of a clearer EPFO
member portal. Win condition, per owner: judges grasp the UX argument fast.
Fidelity to Figma serves that; it is not the goal by itself. Not an official
EPFO product.

## Source of truth

Figma file `cIjgpcP4WBbw3dTDNjOD6n`, section `105:215`:

| Node | Frame |
| --- | --- |
| `102:110` | Login rail, announcements, services |
| `14:66` | Dashboard, home |
| `22:2` | Passbook Lite, quick view |
| `22:130` | Consent, connect your passbook |
| `22:66` | Redirect |
| `35:79` | Passbook portal |

Use Figma metadata numbers, never eyeballing. Six frames only; claims out.

## How we work (owner's rules, learned the hard way)

1. One component at a time. Finish, show, get a pass, then the next.
2. Every component: Figma metadata → build → Chrome screenshot + landmark
   table vs Figma numbers → owner eyeballs a side-by-side → pass/fail.
3. Owner answers in free text, not option labels. Read the answer.
4. Behaviour is copied from ux4g.gov.in by measuring its DOM/CSS, not guessed.
5. Every decision and trap goes into `archive/pilot-2026-08-29/DECISIONS.md` the moment it
   is made.

## Stack, as it stands (29 Aug 2026)

- Static HTML/CSS/JS in `archive/pilot-2026-08-29/` (throwaway pilot that is becoming the
  real thing). No build step, no framework, no inline styles or scripts.
- **UX4G is not linked.** Its token values sit in `:root` of `pilot.css`
  under UX4G names. `cdn.ux4g.gov.in` is used for one file only, the Noto
  Sans variable font. That is the single allowed external origin.
- Icons: Phosphor regular, inlined as an SVG sprite at the top of
  `index.html`, referenced by `<use href="#ph-…">`.
- Fonts: Noto Sans everywhere, weights 100–900 via our own `@font-face`.
- Breakpoints copied from ux4g.gov.in: ≥1024 desktop, 768–1023 tablet
  (nav row scrolls sideways), <768 phone (hamburger, in-flow accordion panel).

## Where things are

- `archive/pilot-2026-08-29/index.html` — the app: header + footer once, page bodies as `<template>`s, `app.js` hash router (`#/login` default). `components.html` — every locked component shown once. `pilot.css`, `pilot.js` shared.
- `archive/pilot-2026-08-29/compare/` — Figma-vs-build and state screenshots.
- `archive/pilot-2026-08-29/DECISIONS.md` — every decision, measurement and trap, in order.
- `archive/pilot-2026-08-29/COMPONENTS.md` — recurring pieces still to build, in the agreed order.
- `archive/pilot-2026-08-29/specs/` — one small spec per component.
- `archive/pilot-2026-08-29/UX4G-REPORT.md` — why UX4G was dropped, with numbers.
- `AGENTS.md` — standing rules. Its technical-constraint section was updated
  for the UX4G drop; the rest still describes files that do not exist yet
  (`Brief/`, `DesignSystem/`, `Wireframes/` are empty).

## Demo sign-in

UAN `1000 2233 4455`, password `Demo@2026` (mock; `app.js`). Logout in the header clears it.

## Next session starts with

All six frames built in `archive/pilot-2026-08-29/index.html` (hash routes: `#/login`, `#/dashboard`, `#/passbook`, `#/consent`, `#/redirect`, `#/portal`). All six locked by the owner; sign-in, logout, demo banner in. Owner closed QA on 29 Aug 2026. Left: promote `archive/pilot-2026-08-29/` to the deploy folder (`docs/` per AGENTS.md) and reconcile the stale AGENTS.md references.
