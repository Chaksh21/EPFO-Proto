# Page shell + Quick Links rail

Locked by owner 29 Aug 2026.

```html
<div class="ep-shell">
  <main id="main" class="ep-main">…</main>
  <aside class="ep-rail-col" aria-labelledby="rail-title">
    <div class="ep-rail"><h2 class="ep-rail-title" id="rail-title">Quick Links</h2><ul class="ep-card-row ep-card-row--rail">…</ul></div>
  </aside>
</div>
```

- Shell full viewport width, grid `minmax(0,1fr) var(--ep-rail-w)` where the rail is `max(200px, 16vw)` (200 floor, 16 % of the viewport above ~1250, no cap): the rail sits on the viewport's right edge (owner, 29 Aug 2026). Main is fluid: viewport minus the rail, 24 insets, but the left inset is `max(0, (100vw − 1280) / 2) + 24` so content starts exactly under the header's brand (box offset plus the header's own 24 gutter). At 1280 it is 1080 as in Figma.
- Main 24 inset all round (Figma 1112 / 20; owner widened the rail).
- Rail column: white, 1 px `#d9dbe0` left border, stretches the full body height. Inner `.ep-rail` sticky at `top: 128` (navbar 80 + nav row 48; the bar scrolls away), padding 8.
- Rail title 12/16 semibold, padding 8 8 0. Rows: `ep-card--rail`, padding 8, gap 8 (was 10; spacing ×4 rule), 48 tall, 8 between (pitch 56).
- Under 1024: one column; rail becomes a white card under main (24 side inset, 16 on phone), rows in a grid `auto-fill minmax(184px, 1fr)`, not sticky. Figma has no narrow layout; proposal.
- Under 1024 the fixed Figma widths (services 832, wide row 760, row card 373) give way to `max-width: 100%` and wrapping. Desktop keeps the numbers.
- Login frame (`102:110`) uses the same shell with `grid-template-columns: minmax(0,1fr) 380px` for its rail: to do when that page is built.
