# Section heading, page head, text link

Locked by owner 29 Aug 2026.

## Section heading
`<div class="ep-section-head"><h2 class="ep-section-title">…</h2><a class="ep-link" href>View all<svg class="ep-caret"><use href="#ep-caret-right"/></svg></a></div>`
- Title 14/20 semibold `#171717`, 8 below to content. Link sits right, on the baseline. Wrapper optional when there is no link.

## Page head
`<div class="ep-page-head"><div><h1 class="ep-page-title">…</h1><p class="ep-page-sub">…</p></div><a class="ep-link">…</a></div>`
- Title 18/24 semibold `#1c1f21` (Figma 18/26 700). Subtitle 12/16 `#6b7378`, 4 below (Figma 11.5, 3).

## Text link
- `.ep-link`: 12/16 semibold primary, no underline; hover primary-700 + underline (offset 3, 1 px), caret nudges 2 px; focus 2 px ring offset 2; radius 4. Caret = sprite `#ep-caret-right` at 12.
- `.ep-link--body`: inline in text ("Forgot Password ?", "Verify now"): weight 500, **always underlined**, no caret.
- "Skip to Main Content" in the bar keeps its own bar style.
