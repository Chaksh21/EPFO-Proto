# Standing rules for this repo

Independent prototype for the Build What Moves India hackathon. Not an
official EPFO or government product. Every name and number is made up.

## Where things are
- `docs/` is the live site and the only folder that deploys (GitHub Pages,
  branch `main`, folder `/docs`). Keep `.nojekyll` there.
- `docs/index.html` holds every screen as a `<template>`; `docs/app.js` routes
  by hash (`#/login`, `#/dashboard`, `#/passbook`, `#/consent`, `#/redirect`,
  `#/portal`) and keeps the demo session; `docs/header.js` runs the header
  (menus, phone panel, text size); `docs/styles.css` is the whole stylesheet.
- `archive/pilot-2026-08-29/` is the build record: decisions, component specs,
  the components page, Figma-vs-build screenshots, session notes. Read
  `DECISIONS.md` there before changing anything the owner has locked.

## Demo sign-in
UAN `1000 2233 4455`, password `Demo@2026`. Mock only.

## Technical constraints
- Static site. No build step, no bundler, no framework, no GitHub Action.
- Hash routing only. Never the History API.
- All paths relative. Never a leading `/`.
- All filenames lowercase, hyphens not underscores.
- No inline styles or scripts.
- One external origin: `cdn.ux4g.gov.in`, pinned to `UX4G@3.1.0`, used only
  for the Noto Sans variable font file. UX4G CSS and JS are not linked; its
  token values live in `:root`. Icons are Phosphor (regular), inlined as an
  SVG sprite. No other CDN, font host or script source.
- The page must stay readable if the font file is slow or never arrives.

## Design rules (owner, locked)
- Font sizes: whole numbers, never below 11 px. Weights never above 600.
- Spacing in multiples of 4. Radii 4 (controls), 8 (cards, buttons), pill (chips).
- One button size (14/20, 40 tall); `ep-btn--sm` only for inline actions in
  12 px rows. Purple tint reserved for call-to-action cards.
- Notices: blue = normal, yellow = high priority. Lists use hairline rows.
- No fixed card heights. Section headings sit outside cards.
- Rail sits on the viewport's right edge, `max(200px, 16vw)`; main column fluid.

## Content rules
- Plain English, short sentences, no jargon on the primary path. Official
  terms only after a plain explanation. No em dashes.
- "Claim" = PF money, "pension" = EPS, UAN = the number, PF = the account.
- Errors name what failed, who owns the fix, and what the citizen does next.
- Show a balance wherever the user picks an account.

## Hard prohibitions
- No real Aadhaar, PAN, UAN, bank, phone or personal data. Mock data only.
- No EPFO logo, Ministry wordmark, or State Emblem of India.
- Never call or test any live government system or undocumented API.
- Never commit audio, video or screen recordings.
