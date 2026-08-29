# Service card — spec 1: stack variant, default state

Settled in interview, 29 Aug 2026. Small on purpose. Later specs: states, row, cta, rail.

## Why it exists
Judges' argument: good design still works in a heavy, dense portal. The card is the
proof on the login page — five services readable at a glance.

## One component
One markup: icon, title, description, href. One class per layout. Nothing else varies
except state (default / hover / :active), which is spec 2.

| Class | Where | Figma | Notes |
| --- | --- | --- | --- |
| `ep-card--stack` | Login grid | `102:172` | this spec |
| `ep-card--row` | Dashboard "What you can do" | `14:66` tiles | primary title, chevron |
| `ep-card--cta` | Login sidebar | `102:194` | no icon, badge slot, primary border |
| `ep-card--rail` | Quick Links rail | `22:46` | label only, no border |

## Stack, measured (`102:155`, `102:172`)
- Row: 5 cards, `gap 12`, each `flex 1 0 0` → 156.8 wide in the 832 column. Height 148.
- Card: white, `1px #d9dbe0`, radius 8, padding 14, column gap 8.
- Icon box: Figma 28; owner enlarged to 36 (glyph 24, radius 8), 32 (glyph 22) offered. Phosphor regular.
- Title: 12/17, semibold, `#1c1f21`. Two lines allowed (Death Claim cards wrap to 34).
- Description: 10.5/15, regular, `#6b7378`.
- Section heading "Other member services": 14/20 semibold; cards start 28 below heading top.
- Inter in Figma → Noto Sans (project rule).

## Decisions
- Whole card is the link (`<a class="ep-card">`), one tab stop. `href="#"` until routing.
- Copy verbatim from Figma for the diff. Plain rewrites proposed at the pass, owner picks.
- Icons mapped now: Know Your UAN `identification-badge`, Direct UAN Allotment `user-plus`,
  UAN for Existing PF `link`, Death Claim (Claims) `hand-coins`, Death Claim (Pension) `hand-heart`.
- Built inside `index.html` under the locked header for the eyeball pass.
- Desktop only this pass.

## Chevron, states, layouts (built 29 Aug 2026, see DECISIONS.md)
- Chevron: drawn 12 px caret, muted; top-right on stack, right column on row/cta, hidden on rail.
- States: hover/focus = primary border + `#f9f8fe` bg + primary title + chevron nudge; `:active` = 1 px press; rail hover = `#f5f5f5` bg only.
- `row`, `cta`, `rail` land on Figma numbers; only deviation is the 36 px icon (row 64 tall, text at 64).

## Pass bar
Owner eyeballs `compare/service-card-figma-vs-build.png`. Landmarks within 1.5 px.
