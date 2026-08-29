# Pilot decisions — 29 Aug 2026

Settled in interview. Do not reopen without the owner.

## Goal
- Win condition: judges grasp the UX argument fast. Fidelity serves the argument; it is not the argument.
- Core 30-second claim: settled 29 Aug 2026 (see "Judge claim" below).
- Session arc: pilot → working model → full build.

## Pilot
- Components: top nav, right sticky rail. Nothing else until both pass.
- Must prove: (1) UX4G 3.1.0 can reproduce a Figma component, (2) a component layer stops drift when rendered in more than one place, (3) the diff loop (Figma metadata → build → screenshot → compare → fix) works.
- Lives in `archive/pilot-2026-08-29/`. Throwaway. Promote only if it passes.
- Pass bar: owner eyeballs a side-by-side. No automated gate.
- Diff method: Figma metadata numbers for layout, Figma screenshot vs Chrome screenshot for colour and type.

## Scope
- Six frames in section 105:215 only. Claims out.
- Desktop only. Mobile behaviour not considered this pass. (Conflicts with AGENTS.md "mobile first" — accepted knowingly, revisit before submission.)

## Tech
- AGENTS.md rules hold unchanged: static, no build step, hash routing, no inline styles or scripts, UX4G@3.1.0 from cdn.ux4g.gov.in only.
- UX4G is preferred, droppable. If pilot shows it fights the Figma, fall back to plain CSS using UX4G token values only. Owner decides after pilot report.

## Pilot 1 result — header (29 Aug 2026, awaiting owner eyeball)

Files: `index.html`, `pilot.css`, `assets/`, `compare/header-figma-vs-build.png`, `compare/header-no-cdn.png`.

Landmark deltas vs Figma `14:66` (px, after fonts load): every band height exact (46/80/48). Logout, search box, search button, badge x: exact. Brand label 326.7 vs 328. UAN chip 174.9 vs 175. Nav items ≤1 px. Accessibility options 433.4 vs 434. Nothing over 1.5 px.

Pixel diff (threshold 40/255): 5,344 px of 222,720 — all text anti-aliasing edges. No structural diff.

UX4G classes that survived: `.ux4g-navbar`, `.ux4g-navbar-wrap`, `.ux4g-navbar-links`, `.ux4g-avatar-m`, `.ux4g-badge-digit-danger`, `.ux4g-btn-primary.ux4g-btn-md`, `.ux4g-search`, `.ux4g-search-input`, `.ux4g-search-btn`. Nine. Each needed overrides; none was usable untouched.

Two UX4G traps found and fixed, both matter for the full build:
1. UX4G's `@font-face` declares Noto Sans at weight 400 only; every bold is browser-synthesised and narrower than Figma. The served `NotoSans.ttf` is a variable font (wght 100–900, 2 MB). Fix: our own `@font-face` on the same CDN file with `font-weight: 100 900`. Keep this in the final stylesheet.
2. UX4G puts `!important` rules inside `@layer`. Layered `!important` beats unlayered `!important`, so overrides that "look right" silently lose (the badge ring). Fix pattern: override the custom property the rule reads (`--ux4g-border-width-md: 0`) instead of the property itself. Rule for the build: never fight a UX4G `!important` directly.

No-CDN test (cdn.ux4g.gov.in blackholed): identical layout, system-ui font, all heights same. Our stylesheet is load-bearing; UX4G is polish. Holds the Slow-3G rule.

Open: componentisation mechanism for the full build (one header markup, six pages, no build step). Options: copy markup per page and diff-test, or a tiny `fetch`-based include. Decide before page composition.

## Pilot 1b — header behaviour, copied from ux4g.gov.in (29 Aug 2026)

Owner asked for the nav to behave like the one on ux4g.gov.in/get-started. Measured there, then replicated. Files: `pilot.js` (new), `pilot.css` (behaviour block appended), `index.html` (bar moved out of `<header>`, mega panels added). Screenshots: `compare/header-scrolled.jpg`, `compare/header-menu-open.jpg`.

What ux4g.gov.in does, measured:
- Government bar is a sibling of the header and scrolls away. Header (`position: sticky; top: 0; z-index: 50`) sticks.
- Once scrolled, header gets `is-scrolled`: 8 px top / 16 px side inset, card is 85 % white + `backdrop-filter: blur(12px)`, 1 px `#e5e5e5` border, 16 px radius, `shadow-xl`, `transition: padding .3s`.
- Nav link hover: 6 % foreground tint, caret opacity .7 → 1. Active link: same tint + 2 px primary indicator at `bottom: -6px`, inset 12 px.
- Hovering a menu item opens its panel after ~100 ms; leaving closes at once. Caret rotates 180° over .2 s. Card gets `has-active-dropdown`: bottom corners squared, top corners 20 px.
- Panel: absolute, full card width, white, 1 px border, 16 px bottom radius, `0 24px 48px -16px rgba(0,0,0,.28)` shadow, `mega-menu-in` .2 s ease-out (opacity 0→1, translateY −6→0). Two columns with uppercase eyebrow, icon rows (tinted 34 px box, title + one-line description), divider, grey footer strip with description and "Explore … →" link.
- Clicking a menu item navigates; hover only previews.

What we replicated: all of the above, desktop only. Extras we added because AGENTS.md demands them: click/Enter toggles, Esc closes and returns focus, focus leaving closes, `aria-expanded` / `aria-controls`, `prefers-reduced-motion` kills the motion.

Trap found: `position: sticky` cannot leave its parent's box. First attempt put the sticky wrapper inside `<header>` next to the bar; the header ended right after the card, so the card scrolled away with it. Fix is structural, same as ux4g.gov.in: bar and header are siblings under `<body>`.

Open: panel contents are placeholder EPFO menu items in plain English, not from Figma (Figma has no open-menu state). Owner to confirm the item list before the full build. The 34 px icon boxes are empty tints until icons are chosen.

Rest-state landmarks re-measured after the change: unchanged from Pilot 1.

## Pilot 1c — polish pass (polish, 29 Aug 2026)

Refinement only; Figma numbers and ux4g.gov.in behaviour kept. Changes:
- Unicode `▾` / `→` glyphs replaced with drawn 1.5 px stroke chevrons and arrows (inline SVG, `currentColor`). Nav chevrons are 8 px so dropdown items stay within ~2 px of Figma widths.
- Panel eyebrow labels ("MANAGE", "MORE") removed — no information, banned by the craft floor. Panel content now sits on the 1280 column even when the panel is full-bleed.
- Motion on one curve: `cubic-bezier(0.16, 1, 0.3, 1)` for panel entry, chevron flip, card float, footer arrow nudge. Hover colours 150 ms.
- Every control has hover / active / focus: bar links and font buttons (white 10 % tint), language is now a real `<button>`, notification icons and UAN chip tint, Logout hover primary-700 + 1 px press, nav links active tint, search hover / focus ring (3 px primary at 16 %), panel items tint + title turns primary + icon box deepens.
- Browser surfaces themed: `::selection` primary-100, search `caret-color` primary, focus rings rounded and consistent across bar and header.
- Detector: one warning, `transition: padding` on the sticky header — intentional, it is exactly how ux4g.gov.in floats its header; a 0.3 s one-off state flip, not a scrolling animation.

Still placeholders: circle assets from Figma, empty tinted icon boxes in panels. Both wait on an icon decision.

## Pilot 1d — Phosphor icons (29 Aug 2026)

Owner asked for Phosphor Icons and to drop the circle beside "English". Phosphor (regular weight, MIT, v2.1.1) is inlined as an SVG sprite at the top of `index.html` and referenced with `<use href="#ph-…">`; no icon CDN, so the one-origin rule holds. 20 icons, ~9 KB.

Mapping: bar accessibility → `person-arms-spread`; notifications → `bell`, `chat-circle`; UAN chip → `user-circle`; search lead → `magnifying-glass`, search button → `arrow-right`; panels: Profile `user`, Service history `clock-counter-clockwise`, UAN card `identification-card`, Passbook `book-open`, Contact details `address-book`, KYC `shield-check`, e-Nomination `users-three`, Mark exit `sign-out`, Change password `lock-key`, Change login details `device-mobile`, Claim `hand-coins`, One member one account `arrows-merge`, Track claim `list-checks`, Transfer `arrows-left-right`.

Kept as placeholder: the 40 px logo circle (no EPFO logo allowed). Figma ellipse assets for everything else deleted from `assets/`.

Trap: UX4G's reset sets `svg { display: block }`, which beats the `hidden` attribute, so the sprite took 154 px of layout. Fixed with `.ep-sprite { display: none !important }`.

## Pilot 1 — PASSED by owner (29 Aug 2026)

Header passes. One change on pass: the floating-card scroll state (inset, blur, radius, shadow) is dropped — `backdrop-filter` is heavy on old devices. Header stays full width and sticky; a thin shadow appears once scrolled. `has-active-dropdown` corner logic removed with it.

## UX4G dropped (owner decision, 29 Aug 2026)

Measured share on the passed header: 13 UX4G classes, every one overridden; 0 % of behaviour; 100 % of the palette. Cost: 152 CSS files / ~925 KB + 280 KB JS + three cascade traps. Owner chose option 2: unlink UX4G CSS and JS, keep its token values in `:root` (names kept for provenance), keep `cdn.ux4g.gov.in` for one thing only — the Noto Sans variable font file. One-origin rule still holds. Rendered result identical (landmarks re-measured: all exact). AGENTS.md technical constraint updated to match.

## Header LOCKED (owner, 29 Aug 2026)

Final desktop header, after owner review rounds:
- Nav links: every item identical box (30 px, `0 12px`, 6 px gap, 14 px Phosphor-style chevron); muted `#525252`, active/hover `#171717`; active pill 6 % tint + absolute 2 px indicator 5 px below, inset 12 px. Chevron proportions follow ux4g.gov.in, not Figma's 4 px caret — dropdown items are ~11 px wider than the frame. Accepted.
- Bell 24 px, count badge on its top-right corner. Messages icon removed.
- Sticky, full width, thin shadow once scrolled. No floating card.
- UX4G unlinked; tokens + Noto Sans file only. Phosphor sprite inline.
Do not reopen without the owner. Next: responsive behaviour (mobile hamburger, copied from ux4g.gov.in), then rail.

## Pilot 1e — responsive header, copied from ux4g.gov.in (29 Aug 2026)

Measured on ux4g.gov.in/get-started/for-designers (site blocks iframing; read from DOM/CSS + headless 390 px shot):
- < 768: nav row hidden; hamburger (22 px, turns into X, `aria-expanded`) at the right of the top bar; search + CTA leave the bar. Bar drops text-size buttons and dividers, keeps brand, accessibility, language.
- Open: panel **in flow below the header** (pushes content, no overlay, no drawer), white, top border, max-height 600 + scroll, 24 px padding. Sections are full-width buttons (14 semibold, 16 px chevron, rotates), one open at a time. Expanded body: 2 px left rule, 16 px indent, links 14 px with 18 px icon, "Explore … →" after a divider. Active link primary/10 tint + primary text.
- 768–1023: nav row scrolls sideways, scrollbar hidden; search + CTA stay.

Ours: same, with EPFO specifics — brand shortens to "EPFO" (`<abbr>`), bell stays in the bar, UAN chip + Logout move to the bottom of the panel, search moves to the top of the panel. Panel is built once by `pilot.js` from the nav row + mega panels, so items live in one place; without JS the nav row stays visible (`.ep-header.js` gate). Esc closes and returns focus; crossing the breakpoint closes whichever menu is open.

Checked: no horizontal overflow at 375 or 900 (`scrollWidth === innerWidth`, menu open and closed). Detector clean. Screenshot `compare/header-mobile-and-tablet.jpg`.

## Pilot 1f — bar options into the hamburger (owner, 29 Aug 2026)

Phone only; tablet untouched. Text size (A−/A/A+) and language leave the accessibility bar and sit in the panel under the nav sections as labelled rows ("Text size", "Language"), above the UAN chip + Logout. Bar on phones keeps only its label and the accessibility icon. Cloned by `pilot.js` from the bar, so they exist once in the markup. Checked at 300 px: no sideways scroll. Screenshot `compare/header-mobile-menu.jpg`.

## Service card — interview (owner, 29 Aug 2026)

Owner reordered: card before rail. Interview settled (spec in `specs/service-card.md`):
- Purpose in the judges' story: good design still works in heavy, dense portals.
- ONE component, rendered in four places: login grid (`stack`), dashboard "What you can do" tiles (`row`), login sidebar CTAs (`cta`), Quick Links rail (`rail`). Stat cards are NOT this component.
- Axes: layout class + state (default / hover / :active press). Nothing else varies.
- Whole card is a link. `href="#"` until routing is decided with page composition.
- Copy: Figma list, rewritten plain later. Build verbatim first so the diff is clean; rewrites shown at the pass.
- Icons: Phosphor mapped now, owner approves at the pass.
- Slice order, one pass each: stack default → states → row → cta → rail.
- Built inside `index.html` under the header.

## Service card, spec 1 result — stack default (29 Aug 2026, awaiting owner eyeball)

Files: `index.html` (5 cards under the header, 4 new Phosphor symbols), `pilot.css` (component block + 3 tokens), `specs/service-card.md`, `compare/service-card-figma-vs-build.png`.

Landmarks vs Figma `102:155`: card x 0 / 168.8 / 337.6 / 506.4 / 675.2, 156.8×148 — exact. Icon 14,14,28 — exact. Title y 50, h 17 (34 wrapped) — exact. Description y 75 (92 after wrapped title), h 30 / 45 — exact. Heading 20 high, cards at 28 — exact. Only visible difference: Noto Sans wraps "Claim filing by nominee / or family member" one word earlier than Inter.

Trap: `min-height: 148` on a padded card was content-box in this stylesheet → 178 tall. `box-sizing: border-box` on `.ep-card`. Padding is 13 + 1 px border so text sits at Figma's 14.

## Service card — icon box enlarged (owner, 29 Aug 2026)

Owner asked for 32 or 36 instead of Figma's 28. Default now 36 box / 24 glyph / radius 8, via `--ep-card-icon-size`; `ep-card-icon--32` modifier gives 32 / 22 / radius 7 for comparison. Card stays 148; title drops from y50 to y58 (36 case). Owner picks from `compare/service-card-icon-36-vs-32.png`. Deviates from Figma knowingly.

## Service card — icon tones (owner, 29 Aug 2026)

Owner sent the live EPFO member-portal login page as inspo: each service icon sits in a pastel box with a saturated glyph. Five tones added as `ep-card-icon--teal|blue|green|purple|orange` (box / glyph): `#e3f3ef/#0e6b5c`, `#e5eefc/#1f6fd6`, `#e4f4e6/#2e9e4a`, `#f1e5f8/#8c34c2`, `#fdeadb/#ef7a1f`. Assigned in that order to the five login cards. Tone is a class on the icon span, not a card variant — the component's single axis stays layout. Deviates from Figma's neutral `#f5f5f5` boxes knowingly.

## Service card — specs 2–5: chevron, states, row, cta, rail (29 Aug 2026, awaiting owner eyeball)

Owner: "Add the chevron, then the states and then layouts." Built in one pass, same markup throughout.

Chevron: drawn 12 px stroke caret (same style as nav chevrons), `#6b7378`. Stack: absolute top-right, inset 14. Row / cta: right column of the grid, right edge 16 from the card (Figma `›` right edge 357 of 373 — exact). Rail: hidden (Figma has none).

States, one rule set for every layout: hover / focus-visible → border primary-600, bg `#f9f8fe`, title primary, chevron primary + 2 px nudge. `:active` → 1 px press (same as Logout). Focus ring 2 px primary, offset 2. Rail differs: hover bg `#f5f5f5` (that is Figma `22:48`'s fill), no border. Reduced motion kills transitions.

Layouts, measured vs Figma:
- `row` (`18:67`, 373×63): 373 wide; 64 tall and text at x 64 instead of 56 because the owner's 36 px icon replaces Figma's 28. Title 12.5/18 primary, desc 10/15, chevron exact. Grid: icon | title+desc | chevron.
- `cta` (`102:194`, 340×58): exact — title y 11.5, badge x 99.4 (Figma 100), desc y 33. Badge `#eeeafc`, 10/14 semibold primary, 3×8 pad, r10. No icon.
- `rail` (`22:48`, 140×36): exact — icon 6,6,24, label 40,10,94×16, 50 px pitch. Demo wrapper is the rail itself: 168 wide, white, 14 pad, `#d9dbe0` left border. Icon box neutral-100, glyph 18 ink.

Trap: rail icon boxes are `#f5f5f5` on a `#f5f5f5` page — invisible outside the white rail. Not a bug; the rail is always white.

Demo section (`.ep-demo`) under the login cards is scaffolding for the pass, not a page. Screenshots: `compare/service-card-hover.png`, `compare/service-card-cta-rail.png`.

## Service card — owner round 2 (29 Aug 2026)

Owner: cta cards get icons; rail icons get tones; stack chevron sits with the heading, not the card corner.
- Chevron now lives inside `.ep-card-title`, bound to the last word with `&nbsp;` so it never orphans. Stack: inline after the title (margin 0; "UAN for Existing PF ›" fits at 127.9 of 128.8, "Direct UAN Allotment ›" wraps to two lines). Row / cta: absolute, right 15, vertically centred; card gets right padding for it. Rail: hidden. All five stack cards back to 148 tall.
- cta: icon column added (36 box, same tones), text starts at 62. Activate UAN `identification-badge` teal, Track Application Status `list-checks` blue. Second cta description wraps to two lines (Figma text was 312 wide, ours 238); card stays 58 on the first, 70 on the second — owner to accept or shorten copy.
- Rail: tone classes on each row (teal, blue, green, purple, orange, teal). `ep-card-icon--plain` removed.
Screenshot: `compare/service-card-stack-chevron.png`.

## Service card — row and cta lose the primary border (owner, 29 Aug 2026)

Owner: "What you can do" and "No UAN access yet?" cards don't need the borders; heading like the other cards. Row and cta now use the same `#d9dbe0` border and `#1c1f21` title as stack. Primary shows only on hover. Deviates from Figma `18:67` / `102:194` (primary border, primary title) knowingly.

## Type rule (owner, 29 Aug 2026): no font size below 11 px, whole numbers only

Applies everywhere, header included. Changed: card description 10.5 → 11 (all layouts; row and cta were 10), row title 12.5 → 12/17, badge 10 → 11, bell count 9 → 11 (badge grows to 18 min-width, 14 line-height). Type scale in use now: 11 (desc, badge, rail label, bell count), 12 (card titles), 14 (section titles, nav, mega titles), 16+ (header). Figma's 9 / 10 / 10.5 / 12.5 values are overridden knowingly.
Result after the rule: 11 px descriptions wrap more. Stack cards grow 148 → 159 (two of five need three description lines), both cta cards wrap to two lines (73 / 70 vs Figma 58 / 55). Row stays 64. Options for the owner: accept taller cards, or shorten the plain copy (already planned). Computed sizes on the page are now only 11 / 12 / 13 / 14 / 16.

## Rail rows enlarged (owner, 29 Aug 2026)

Owner asked for bigger rail icons and text. Was Figma `22:48`: box 24 / glyph 18 / label 11/16 / row 36 / pitch 50. Now: box 32 / glyph 20 / label 12/17 / row 44 / pitch 58 (gap 14 kept). Rail width 168 unchanged.

## Rail widened (owner, 29 Aug 2026)

168 → 200 so the enlarged rows fit. Label column 118 (was 86); "Member Service History" wraps to two lines, not three. Rows are 172 wide. When the rail is placed on the dashboard, the main column becomes 1080 instead of Figma's 1112. Single-line "Member Service History" would need ~232.

## cta spacing matched to stack; no fixed heights (owner, 29 Aug 2026)

Owner: cta felt crammed. cta now uses the stack card's numbers: inset 14, gap 8 between title row and description, radius 8, 12 between cards (Figma had 10/14 inset, 3 gap, r6, 10 between). Stack's `min-height: 148` removed — heights come from content; the flex row stretches siblings equal. Rule going forward: no fixed card heights.

## cta gap, rail padding (owner, 29 Aug 2026)

cta title → description gap 8 → 4. Rail: section padding 14 → 6, row padding 6 → 10 (row 52 tall, 188 wide, label column 126), gap 8 → pitch 60, row radius 8.

## Service card — polish pass (29 Aug 2026, reversible)

Refinement only; every owner decision kept. Snapshot before the pass: `backups/pre-polish-card/` (index.html, pilot.css, pilot.js) — copy back to revert.
- Chevron SVG was pasted 15×; now one sprite symbol `#ep-caret-right`, referenced by `<use>`.
- Stale `ep-icon-18` classes removed from the stack icons (were overridden anyway).
- Card CSS regrouped: base → icon/tones → text → states → one block per layout. Same selectors were spread across 3–4 places; no value changed except those listed below. Comments updated (rail 168 → 200, "default state only" gone).
- Row and cta titles/descriptions: `nowrap` now paired with `overflow: hidden; text-overflow: ellipsis` and `minmax(0, 1fr)` columns, so long copy clips instead of breaking the card.
- Glyph contrast on the tone boxes: green `#2e9e4a` → `#22823a`, orange `#ef7a1f` → `#c4560f` (both were under 3:1 on their pastel). Teal, blue, purple unchanged.
- Descriptions get `text-wrap: pretty` (no single-word last lines); rail labels `text-wrap: balance`.
- Press transition uses the shared ease-out curve.
Detector: clean. Verified at 1320: stack 159, row 373×64, cta 82/79, rail rows 52 (54 on the two-line label), no sideways scroll, 15 carets render.

## Icon tones, round 2 (owner, 29 Aug 2026)

Purple reserved for the cta cards (UAN / status actions on the login page). Elsewhere purple → rose (`#fcedf0` / `#b41e46`). All tints lightened ~2 %: teal `#eaf6f2`, blue `#ecf2fd`, green `#eaf7ec`, orange `#fef0e4`, purple `#f3ebf9`. Glyph colours unchanged; all stay ≥3:1 on the lighter boxes. Stack order now teal, blue, green, rose, orange; rail teal, blue, green, rose, orange, teal; both cta purple.

## Service card LOCKED (owner, 29 Aug 2026)

`text-wrap: pretty` dropped from descriptions (cost a line on "Direct UAN Allotment"). Pre-polish backup deleted — the polished version is the frozen one.

Frozen state, one markup `<a class="ep-card ep-card--{stack|row|cta|rail}">` with icon / title(+chevron) / badge / description spans:
- Base: white, 1 px `#d9dbe0`, r8, inset 14, gap 8, no fixed heights (row stretch equalises siblings). Title 12/17 600 `#1c1f21`; description 11/15 `#6b7378`; badge 11/14 600 primary on `#eeeafc`. Nothing under 11 px, whole numbers only.
- Icon box 36 r8, glyph 24 Phosphor regular. Tones: teal / blue / green / rose / orange; purple reserved for cta. Rail box 32 r7, glyph 20.
- Chevron: 12 px drawn caret from the sprite, inline after the title's last word on stack; pinned right on row/cta; hidden on rail.
- States: hover/focus = primary border, `#f9f8fe` bg, primary title, chevron +2 px; :active 1 px press; focus ring 2 px primary. Rail hover: `#f5f5f5` fill.
- Row: 373 wide grid, inset 14/16, text clips with ellipsis. Cta: 340 wide, icon column, 12 between cards. Rail: 200 wide, white, `#d9dbe0` left border, rows 52, pitch 60.
- Copy: Figma verbatim; plain rewrites still to be picked. Icons: as mapped in DECISIONS.
Do not reopen without the owner. Next: place the rail for real (sticky under the header), then dashboard cards.

## Card copy — plain rewrite (owner picked "all", 29 Aug 2026)

UX4G publishes no content style guide; GIGW 3.0 baseline is plain language, bilingual, dated. Written to our own Flesch 85 floor. Domain rule for copy: "claim" = PF money, "pension" = EPS; UAN is the number, PF the account. No em dashes.

| Figma | Now |
| --- | --- |
| Know Your UAN / Retrieve your UAN using basic details | Find your UAN / Look it up with your Aadhaar, PAN or PF number |
| Direct UAN Allotment / Self-generate your UAN without employer request | Get a new UAN / Make your own number with Aadhaar. No employer needed |
| UAN for Existing PF / Generate UAN for members with an active PF account | Link an old PF account / Get a UAN for a PF account that has none yet |
| Death Claim — Nominee (Claims) / Claim filing by nominee or family member | Claim PF after a death / For the nominee or family of a member who has died |
| Death Claim — Nominee (Pension) / Pension claim filing in case of member's demise | Claim family pension / Monthly pension for the family of a member who has died |
| Activate UAN / Activate your UAN to access EPF services online | Activate your UAN / Set a password and sign in for the first time |
| Track Application Status / Check progress of your Pension on Higher Wages application | Track a claim / See where your claim has reached. No sign-in needed |
| File Claim / Form 19, 10C, 31 — online withdrawal | File a claim / Withdraw, take an advance or transfer your PF |
| Track Claim Status / Check where your claim has reached | Track a claim / (unchanged) |
| rail: Member Service History | Service History |

"Track Application Status" on the live portal means only the Pension on Higher Wages application; on this page it now means tracking any claim without signing in.
Trap: `&nbsp;` does not stop a line break before an inline-flex chevron (atomic inlines get a soft-wrap opportunity). Fix: last title word + chevron wrapped in `<span class="ep-card-last">` with `white-space: nowrap`, 3 px gap. Applies to all layouts.
Trap: `index.html` linked `pilot.css?v=3`; Chrome served a cached stylesheet, so a new rule computed as absent. Bump the `?v=` on the link whenever the CSS changes (now v=5). Icon-only search button added to the explicit 14 px rule. Copy verified in Chrome: every chevron beside its last word, stack cards 159, cta 67 / 79. Screenshot `compare/service-card-plain-copy.png`.

## Type + spacing tokens (29 Aug 2026, backlog item 1)

Written to `:root` as `--ep-text-*` / `--ep-leading-*` / `--ep-weight-*` / `--ep-space-*` / `--ep-radius-*`. Values are the ones already in use, nothing new: sizes 11 / 12 / 14 / 16 with leadings 15 / 16 / 20 / 20 (card title stays 12/17, badge 11/14: logged exceptions). Weights 400 / 500 / 600 / 700. Spacing 4 / 8 / 12 / 14 / 16 / 24; 14 is the card inset and stays a named token, not a scale step. Radii 4 / 8 / pill.
Locked header and card rules are not rewired to the tokens (no value would change; risk not worth it). New components use the tokens. Exception kept: header A-/A/A+ buttons at 13 px (locked). `?v=6`.

## Tokens, round 2 (owner, 29 Aug 2026)

- Weights capped at 600. `--ep-weight-bold` removed; brand label and bell count badge 700 → 600 (the only two uses).
- Spacing: multiples of 4 only. `--ep-space-card` (14) removed from the tokens. The locked card inset is still 14: owner to pick 12 or 16.
- Bar text size now works. Copied from UX4G's accessibility widget (`accessibility-v3.31/accessibility-widget.js`: `zoom` on body children, +0.1 per step, 4 steps, reset). Ours: `.ep-text-1…4` on `<html>`, `body { zoom }` 1.1–1.4; A+ steps up, A− steps down, A resets; floor 1.0 so the 11 px rule holds. Remembered in `localStorage` (`ep-text`). Buttons carry `aria-label`; A / A+ report `aria-pressed`; A− / A+ disable at the ends. Bar and its phone clone share one delegated listener. `?v=7`.

## Card inset 14 → 12 (owner, 29 Aug 2026)

Spacing rule (multiples of 4) applied to the locked card: base padding 11 + 1 border = 12 all round (was 14); row layout 12 / 16; wide row gap 14 → 12; cta 11 + border too. Header's own 14s (UAN chip padding, search lead margin) untouched: header locked, not rewired. `?v=9`.

## Buttons LOCKED (owner, 29 Aug 2026, backlog item 2)

Three options shown on the pilot page (12/16, 14/20, 16/20; all 40 tall r8). Owner picked one size: **14/20 semibold, 40 tall, r8, padding 0 16**. Variants primary / secondary / outline with hover, pressed, focus, disabled, loading. Spec `specs/button.md`. Header Logout moved from its own `.ep-btn-primary` (16/20 500) to the shared `.ep-btn`; width 96 kept. Demo grid stays on the page as the states reference. `?v=12`.

## Form field LOCKED (owner, 29 Aug 2026, backlog item 3)

Two error treatments shown; owner picked B: red text + warning icon + red border on the input. Numbers in `specs/form-field.md` (label 12/16, gap 8, input 40 tall r8 grey fill, focus white + primary halo). Phosphor `warning-circle` added to the sprite. `?v=14`.

## Badge / status chip LOCKED (owner, 29 Aug 2026, backlog item 4)

r4 vs pill shown; owner picked pill. One chip 11/16 600, 20 tall, padding 0 8, tones new / primary / success / neutral / warning (warning is ours, not Figma's; owner said keep it, with the `warning-circle` icon). `.ep-card-badge` on the locked card brought to the same numbers (was 3/8 padding, r10, 14 leading; now 20 tall pill). Phosphor `check-bold` added to the sprite. Spec `specs/badge.md`. `?v=16`.

## Section heading, page head, text link LOCKED (owner, 29 Aug 2026, backlog items 5 + 9)

Underline shown always vs on hover; owner picked the middle: caret links (View all, View full passbook details) underline on hover, inline body links (Forgot Password ?, Verify now) always underlined. Page title 18/24 600 (weight cap), subtitle 12/16. Spec `specs/heading-link.md`. `?v=19`.

## Footer, notice strip, announcement list LOCKED (owner, 29 Aug 2026, backlog items 6 + 7)

Footer 12 px (Figma 11), Phosphor social logos, 32 px hits. Strip: megaphone (over info), everything vertically centred, blue = normal, yellow = high priority (`--urgent`). List: hairline rows over dots; NEW pill after the text; PDF as a **tertiary button** (new `.ep-btn--tertiary`, added to `specs/button.md` and the states grid). Spec `specs/footer-notice.md`. Icons added to sprite: five logos, `file-pdf`, `megaphone`, `info` (unused, kept). `?v=23`.

## Compact button, page shell approach, rail (owner, 29 Aug 2026)

- Owner: 14 px "View PDF" beside 12 px text looked odd. Added `ep-btn--sm` (32 tall, 12/16, padding 0 12), allowed only for tertiary / inline actions in 12 px rows. Form and dialog buttons stay one size. `?v=24`.
- Componentisation (Q11): **one `index.html`, hash routes, page bodies in `<template>` blocks swapped by `pilot.js`.** Header, footer, rail written once. Option (a); (b) copy-per-page and (c) fetch includes rejected.
- Rail (Q12): build it properly: sticky under the header, 200 wide, main column 1080 at 1280. Page shell (backlog item 8) is built together with the rail, since the rail is the shell's right column.

## Judge claim (owner, 29 Aug 2026)

Three claims, all in scope: (1) one clear path, login → dashboard → passbook, no detours; (2) plain-English passbook, numbers a citizen can read; (3) honest consent + redirect, the portal says when it hands you to another system. "Errors never dead-end" is not a headline claim; it stays a content rule (AGENTS.md) on every screen. Demo order follows the path: login → dashboard → passbook lite → consent → redirect → passbook portal.

## Nav LOCKED: mega-panel items from the live portal (owner, 29 Aug 2026)

Source: 32 screen captures of the live member portal (`../EPFO-Design-Challenge/screens/raw/`, 25 Aug 2026). None shows a menu open, so item lists come from the pages those captures reach (Member Service History, Passbook Lite, KYC, member profile) plus the portal's known menu. Owner: apply directly, panels are not linked, lock the nav.

- View: Profile · Service history · UAN card · Passbook ("Quick view here; full passbook opens on the passbook site", so the hand-off is honest, claim 3).
- Manage: Basic details (added; the live profile card has an edit on birth date) · Contact details · KYC · e-Nomination · Mark exit.
- Account: Change password · Change login details.
- Online Services: Claim (Form 31, 19, 10C) · One member, one EPF account · Track claim status · Transfer request.
- Home and PMVBRY are plain links. Annexure K, Pension on Higher Wages and other deep items left out on purpose (not on the demo path).

Two other navs seen in the captures, for later frames:
- **Login (`102:110`)**: not signed in, so no nav row, no UAN chip, no Logout. Shell = accessibility bar + brand row only. Figma agrees.
- **Passbook portal (`35:79`, passbook.epfindia.gov.in)**: its own bar (Home · Profile · Passbook · Claims · Service History · Calculators ▾ · name · Logout), different brand block with the State Emblem (which we must not reproduce, AGENTS.md). Build when that frame comes up.

## Page shell + rail built (29 Aug 2026, awaiting owner eyeball)

`specs/page-shell.md`. Measured in Chrome at 1470: shell 1280, main 1080, rail column 200 full height, rail sticks at y128 once the bar scrolls off, rows 48 (padding 10 → 8 for the ×4 rule; pitch 56, was 60). Under 1024 the rail drops below main as a card with rows in a 4-up grid at 900, 1-up at 375. Fixed Figma widths capped under 1024, so 375 no longer scrolls sideways (was 848 wide; the service-card overflow in TODO is closed by this). Chrome's viewport was pinned at 1470 by device emulation, so narrow checks ran in 900 / 375 iframes of the same page. Shots `compare/rail-desktop-sticky.jpg`, `compare/rail-tablet-phone.jpg`. `?v=28`.
Rail hover kept as locked (`#f5f5f5` fill, primary title); the TODO note said ask before matching nav, so unchanged.

## Rail on the viewport edge (owner, 29 Aug 2026)

Owner: rail must be stuck to the extreme right, not the 1280 frame. Shell now spans the viewport; rail column is the last 200 px; main stays 1080 max and centres in what is left, so its left edge matches the header's box and any spare width is white space between main and rail. `?v=29`.

## Main column fluid (owner, 29 Aug 2026)

Past 1280 the 1080 cap left a dead gap before the rail. Options offered: fluid main / cap shell at 1280 / fluid header / rail beside main. Owner picked fluid: main = viewport minus rail, 24 insets, soft cap 1440. Services row keeps 832 as a max, not a fixed width. Rail item renamed "Passbook Lite". `?v=31`.

## Shell left edge + rail growth (owner, 29 Aug 2026)

Owner: the main column's left edge at the viewport felt odd against the centred header. Main's left inset is now `max(0, (100vw − 1280) / 2) + 24` (box offset plus the header's own gutter; the first cut missed the 24), so content starts under the header's brand. Rail width `clamp(200px, 14vw, 240px)` so it grows a little on wide screens. `?v=32`.

## Rail growth from 1280 (owner, 29 Aug 2026)

Rail width `clamp(200px, 15.625vw, 260px)`: 15.625vw is exactly 200 at 1280, so the rail is fixed below 1280, grows as a percentage above it, caps at 260 around 1660. Below 1024 it drops under main. `?v=34`.

## Rail 16 %, no cap (owner, 29 Aug 2026)

Rail width `max(200px, 16vw)`: 200 floor (16vw passes it at 1250), 16 % of the viewport above, no cap. At 1280 → 205, 1500 → 240, 2000 → 320. `?v=35`.

## Page shell + rail LOCKED (owner, 29 Aug 2026)

Frozen: rail on the viewport's right edge, `max(200px, 16vw)` wide, white, `#d9dbe0` left border, full body height, inner block sticky at 128; rows padding 8, 48 tall, pitch 56. Main fluid (viewport minus rail), 24 insets, left inset `max(0, (100vw − 1280) / 2) + 24` so content starts under the header's brand. Under 1024: one column, rail becomes a card under main with rows in a grid; fixed Figma widths cap at 100 %. Spec `specs/page-shell.md`. Do not reopen without the owner. Next: dashboard cards (`14:66`).

## Login page built (29 Aug 2026, awaiting owner eyeball)

App entry is now `index.html` (header + footer once, page bodies in `<template>`s, `app.js` hash router, `#/login` default). The components page moved to `components.html`. Guest header: `body.is-guest` hides nav row, bell, UAN chip, Logout (Figma `102:130` has brand only).
Layout from `102:135`: main 832 + rail 380 in the 1280 box, 24 gutters, 20 between, 18 above. Measured: main 832 at y144, rail 380 at x876 (frame-relative). Rail is 511 tall vs Figma 442: fields 40 not 36, gaps 12 not 10, UAN helper text added ("On your payslip, under UAN"). Rail title 16/24 600 (Figma 16/23 700). Divider text 11/16 500 (Figma 10/15). Buttons, fields, chips, cta cards, announcement list, footer: locked components as-is. Under 1024 the sign-in rail goes first, then announcements and services.
Announcement copy rewritten plain (Figma verbatim → ours), owner to pick:
| Figma | Now |
| --- | --- |
| UAN activation for existing UANs and generation of new UANs can be done through the UMANG app. | You can now activate your UAN, or get a new one, in the UMANG app. |
| Benefits for Unorganised workers registering on the e-SHRAM portal. (PDF) | Benefits for unorganised workers who register on the e-SHRAM portal. |
| Important notice about EDLI. (PDF) | Notice on EDLI, the life cover that comes with your PF. |
| Filing of nominations is mandatory as per EPF Scheme, 2026. E-Nominations can be filed during service period. | You must file a nomination under the EPF Scheme, 2026. File it online while you are still in service. |
Shots: `compare/login-figma.png`, `compare/login-build.jpg`, `compare/login-figma-vs-build.png`. `?v=36`.

## Login LOCKED (owner, 29 Aug 2026)

Owner: "Forgot Password ?" moves under the password field (helper position, `.ep-field-link`), was after the buttons. Plain announcement copy kept. Everything else passed as built. `?v=37`.

## Dashboard built (29 Aug 2026, awaiting owner eyeball)

`#/dashboard` in `index.html`. Layout from `18:2`: profile 296 + 16 + right column, inside the locked fluid shell with the rail. Measured at 1444: profile 296×507 (Figma 550), stat cards 377×125 (Figma 373×130), right column 771 (760), rail 231.
- Profile card `75:2`: avatar = initials in primary tint (Figma grey circle), name 16/20 600 (15/20 700), meta 12/16, Active member = success pill, KYC rows label 11/16 muted (10.5/14) + value 12/16 600, 20 px green tick (18), "Verify now" / "Add now" = inline links, footer "View full profile ›" caret link. Rows gap 12 (14), inner 4 (3).
- Stat cards: p16, gap 8 (10), head = 32 tone box + 12/16 600 title (34 ellipse + 11/16), value 20/28 600 (20/29 700), sub 11/16 (10/15). Share bar 8 tall r4, grey employer 61 % / green employee, split values 12/16 600 (12.5/18 700). Latest claim 14/20 600 (13/19) + neutral pill.
- Actions: locked row cards, both fill the column (Figma 373 each). Notice strip: blue normal, at the column's end (Figma spacer + strip at y506).
- Icons added to sprite: `bank`, `trend-up`, `chart-pie-slice`, `file-text`.
- Copy, plain rewrites for the owner to pick: "Total Bank Balance" → "Total balance"; "Growth / Interest" → "Interest earned", "Total Interest Earned" → "Total interest so far"; "Employer vs Employee Share" → "Employer and employee share", "Employee Share" → "Your share"; "Form 31 — Part Withdrawal" → "Form 31, part withdrawal"; "ASHA VERMA" → "Asha Verma" (chip in the header stays uppercase, locked); KYC labels shortened ("PAN", "Bank account", "Mobile", "Email"); notice → "Update the mobile number linked to your UAN."
- Under 1024: one column, rail below. Under 768: stat cards 1-up.
Shots: `compare/dashboard-figma.png`, `compare/dashboard-build.jpg`, `compare/dashboard-figma-vs-build.png`. `?v=38`.

## Login spacing (owner, 29 Aug 2026)

Owner marked three gaps: under "Announcements", under "Other member services", and between "Forgot Password ?" and the buttons. Section title margin-bottom 8 → 12 everywhere (one rule; Figma had 8). Login form gap 12 → 16. `?v=39`.

## Brand mark (owner, 29 Aug 2026)

Owner supplied a custom hackathon mark (arch + three figures + rising bars, purple gradient). Not the EPFO logo, Ministry wordmark or State Emblem, so AGENTS.md allows it. Trimmed, white made transparent, saved as `assets/logo.png` at 2× (80 tall). Replaces the grey 40 px circle in the brand row on both pages; box is now 40 tall, width auto. `?v=40`.

## Dashboard LOCKED, login re-passed (owner, 29 Aug 2026)

Dashboard passed as built; plain copy kept. Login passed after the spacing round and the brand mark. Next: Passbook Lite `22:2`.

## Passbook Lite built (29 Aug 2026, awaiting owner eyeball)

`#/passbook`. From `22:2`: page head (locked component; link goes to `#/consent`, the honest hand-off of claim 3), three stat cards (dashboard's, 3-up), entries card `24:34`: title 14/20 600, year `<select>` 32 tall r8 with caret + 32 px download button (Figma 30 / 28), table with dark `#12102e` header 44 tall, rows 40, zebra `#f9fafb`, hover tint, cell type 12/16 (Figma 10.5/15), numbers right-aligned tabular. Toast `24:134`: fixed bottom-centre, `#fceded` / `#edbfbf`, shadow, warning icon, 12/16 (11.5/17), dismissible; `app.js` handles dismiss for toasts and notice strips.
Nav: `app.js` now marks the current top-level item per page (dashboard → Home, passbook / consent / redirect → View), as Figma's underline shows.
Copy, plain, owner to pick: "Passbook Lite (Quick View)" → "Passbook Lite"; "View full passbook details ›" → "View the full passbook"; "Recent 6 Entries" → "Last 6 months"; headers "Sr. No. / Wage Month / Employee / Employer / Pension Contribution" → "# / Month / You paid / Employer paid / Pension (EPS)"; months "JUL-2026" → "Jul 2026"; amounts with commas; year "2020–2021" → "2026–27". Toast: Figma "The service is temporarily unavailable." → "Passbook service is down right now. EPFO is fixing it. Your money is safe. Try again in a few minutes." (what failed, who owns it, what next; no evidence step needed here).
Icons added: `download-simple`, `caret-down`. Shots: `compare/passbook-figma.png`, `compare/passbook-build.jpg`, `compare/passbook-figma-vs-build.png`. `?v=41`.

## Passbook Lite LOCKED (owner, 29 Aug 2026)

Passed as built, plain copy kept. Toast auto-dismisses after 10 s (owner); the close button still works before that. Next: consent `22:130`.

## Consent + redirect built (29 Aug 2026, awaiting owner eyeball)

`#/consent` and `#/redirect`. Both are the passbook page behind a scrim (`#141a1a` at 60 %, header stays clear) with a centred dialog: p32, r12, shadow 0 12 36 24 %, 460 / 440 wide (Figma). `app.js` templates can declare `data-base="passbook"`; the base renders first, its toast suppressed. Dialog takes focus on open.
- Consent `26:284`: 56 px `link` icon in primary tint, title 16/24 600 (16/23 700), body 12/16 muted (11.5/17), "Stay signed in on this device for 30 days" as a real checkbox in a grey row (r8, 8/12), Allow (primary) → `#/redirect`, Not now (outline) → `#/passbook`; Esc = Not now.
- Redirect `26:270`: title, hop (two 56 circles with `identification-card` / `book-open`, labels 11/16, three pulsing dots + caret, Figma "• • • ›"), lead 14/20 600 (12.5/18), sub 12/16 (11/16), progress 220×4 that fills over 3 s, then `location.hash = '#/portal'`. `#/redirect/hold` does not advance (demo, screenshots). Reduced motion: no pulse, no bar animation, still advances.
- Copy, plain and honest (claim 3), owner to pick: "Connect Your Passbook" → "Connect your passbook"; body → "EPFO Passbook is a separate site. It wants to check who you are, using the login you just used here. Then you will not need to sign in again."; "Securely Redirecting You" → "Taking you to EPFO Passbook"; "EPFO Portal" → "Member portal"; "Redirecting you securely to EPFO Passbook" → "You are leaving the member portal. passbook.epfindia.gov.in opens next."; "Using your EPFO login — no need to sign in again." → same without the dash.
Shots: `compare/consent-*.png`, `compare/redirect-*.png`. `?v=43`.

## Consent + redirect LOCKED (owner, 29 Aug 2026)

Passed as built, plain copy kept. Passbook portal `35:79` next. Owner: same header and components, no right rail, brand reads "Passbook Portal".

## Passbook portal built (29 Aug 2026, awaiting owner eyeball)

`#/portal`, the redirect's landing. Owner: same header and components, no rail, brand "Passbook Portal" (`app.js` swaps the brand text per page; short form "Passbook" on phones). From `35:79`:
- Sub-nav `35:121`: white, hairline below, 42 tall, tabs 30 tall r8 (Figma r5), 12/16 (11/16), active grey fill + primary semibold. Overview / Profile / Passbook / Claims / Service History / Calculators, all pointing at `#/portal` (not on the demo path).
- Shell `--wide`: 1280 centred, 24 insets, single column. Page head (locked) + "Download passbook" secondary button with icon (Figma 160×34 outlined).
- Hero `40:9`: `#0b5136`, r8 (r10), 16/24 padding (18/22), label 12/16 `#d9e5e3` (11.5/17), value 28/36 600 (28/41 700), facts as a `<dl>` 14/20 600 over 11/16.
- Cards `40:28`: p16 (18), gap 12 (14). Donut drawn as inline SVG (not an icon: our own chart), r60 stroke 18, employee 64 % green `#0e7a4d` on grey `#99a1a6`, centre "64 % / your share", legend 12/16. Member rows grey r8 8/12, ID 12 semibold (10.5), current one in primary, amounts 12 600 (12 700); total row 14/20 600. Details label 11 / value 12 600 (10 / 11).
- Copy, plain, owner to pick: "Your full contribution record across employers" → "Every contribution, across all your employers"; "Total Available Balance" → "Total balance you can claim"; "Member IDs" → "PF accounts"; "Current establishment" → "Current employer"; "EPF Contribution Summary" → "Who paid what"; "Member Wise Balance" → "Balance by PF account"; "Current Establishment Details" → "Current employer"; "Exempted Establishment Member" → "Old employer, exempted trust"; "Est. Name / Est. Id / Member Id / Experience" → "Employer / Employer ID / PF account (Member ID) / Time in service"; dates "01-04-2022" → "1 Apr 2022"; employer name in title case.
Measured at 1444: sub-nav 43, hero 88 (Figma 98), cards 400×279 each (403×332; content-driven, no fixed heights). Shots: `compare/portal-figma.png`, `compare/portal-build.jpg`, `compare/portal-figma-vs-build.png`. `?v=44`.

## Passbook portal, polish pass (29 Aug 2026, refinement only)

Inspected at 375 / 900 / 1280 in iframes plus the live desktop. No overflow at any width; brand shortens to "Passbook" on phones. Fixed:
- Member IDs at 375 were ellipsised ("…059020"); account numbers now wrap instead of clipping, tabular numerals.
- Donut grey segment `#99a1a6` was 2.6:1 on white; graphics need 3:1. Now `#8c9499` (3.1:1), same as the share bar; legend swatch matches.
- Hero fact values get tabular numerals.
- Redirect progress bar animated `width` (detector: layout thrash); now `transform: scaleX` from the left. Same look.
Detector: clean. Owner decisions untouched. Hero-metric layout is Figma's, kept. `?v=46`.

## Portal hero tone (owner, 29 Aug 2026)

Owner: Figma's green `#0b5136` hero looked odd (only green surface in a purple/navy system). Four tones shown live (green / navy / primary tint / white card); owner picked **D, white card**: same card as the rest, label and facts muted, balance 28/36 600 in primary. Variant code removed. `?v=48`.

## Portal cards: headings outside (owner, 29 Aug 2026)

Owner: match the member portal pages. The three card titles moved out of the cards to `.ep-section-title` above each (12 below, as everywhere); cards stay equal height via the grid. `?v=49`.

## Portal: air under the hero (owner, 29 Aug 2026)

Hero → card headings gap 16 → 24. `?v=50`.

## Portal: no search (owner, 29 Aug 2026)

`body[data-page="portal"]` hides the nav-row search form and its phone-panel clone. `?v=51`.

## Passbook portal LOCKED (owner, 29 Aug 2026)

Passed with the plain copy, white-card hero, headings outside the cards, 24 under the hero, no search. All six frames are now locked.

## Close-out round (owner, 29 Aug 2026)

Owner: no mobile testing or QA rounds beyond this; add sign-in, "Passbook Lite" naming, copy sweep, then close.
- **Demo sign-in.** UAN `1000 2233 4455` (spaces ignored), password `Demo@2026`. Mock only. `app.js` keeps a session flag in `sessionStorage` (`ep-auth`); signed-in routes bounce to `#/login` without it. Wrong entry shows the locked field error under the password (what failed, who owns it, what next): "That UAN and password do not match. Nothing is wrong with your account. Check both and try again, or use Forgot password." Non-12-digit UAN gets its own message. Reset clears the error. **Logout** (header button, `.ep-logout`, both member portal and Passbook Portal, phone panel too) clears the session and goes to `#/login`.
- **Passbook Lite** everywhere the member portal links to it: View menu item (now `#/passbook`) and the rail row (now `#/passbook`). The Passbook Portal's own "Passbook" tab stays. Home nav link goes to `#/dashboard`.
- **Copy sweep:** "Forgot Password ?" → "Forgot password?"; "UAN Number" → "UAN number"; View-menu description "Quick view here. The full passbook opens on the passbook site". No em dashes anywhere in page copy. Headings pulled from Figma keep their case ("Member Sign In", "Quick Links").
- **Demo banner** above the accessibility bar on every screen (AGENTS.md rule): "Independent prototype for a hackathon. Not a government website. Every name and number here is made up."
- **Contrast:** muted grey `#6b7378` → `#666e73` everywhere (4.43 → 4.76 on `#f5f5f5`).
- Quality-floor sweep before the owner called it: no sideways scroll on any route at 375, every route keyboard-reachable, one contrast miss (fixed above). Flesch: sentence copy on consent 87, passbook 77, login 74, dashboard 63; label-heavy screens cannot reach the 85 floor with a plain formula, so the floor stands as written for sentences only. Owner closed QA here. `?v=53`, `app.js?v=10`.
Trap: `.ep-field-error { display: flex }` overrode the `hidden` attribute, so the login error icon showed on load with no text. `.ep-field-error[hidden] { display: none }` added. `?v=54`.

## Personal data scrubbed (owner, 29 Aug 2026)

Pages, `app.js`, docs and memory carried real-looking member data from the owner's own portal captures. All replaced with fictional values: name Asha Verma (AV), UAN 1000 2233 4455 (demo sign-in is now `100022334455` / `Demo@2026`), Aadhaar XXXX XXXX 1234, PAN XXABC1234X, bank 12345678XXXX, mobile 98XXXX4321, PF accounts DLNHP00123450000012345 and MHBAN00987650000067890, employer Sunrise Textiles Private Limited (DLNHP0012345), joined 1 Apr 2022, 29 · Female. Not touched: `archive/pilot-2026-08-29/compare/*` screenshots and `../EPFO-Design-Challenge/screens/raw/` captures, which still show the owner's real data; delete or keep out of the deploy folder. `?v=55`, `app.js?v=11`.

## Demo banner removed (owner, 29 Aug 2026)

Owner: drop the "Independent prototype…" strip. Removed from both pages and the CSS. AGENTS.md's banner rule is waived by the owner; noted in TODO. `?v=56`.

## Page transition (owner, 29 Aug 2026)

Owner: the change after sign-in was too sudden. Now: Sign in shows its loading state for 450 ms (buttons disabled, `aria-busy`), then every route change cross-fades: old view out 120 ms, new view fades up 6 px over 240 ms on the shared ease-out. One motion moment, used on every page change. `prefers-reduced-motion`: no delay, plain swap. Measured: loading at +100 ms, dashboard at +520 ms, settled by +1070 ms. `?v=57`, `app.js?v=12`.
