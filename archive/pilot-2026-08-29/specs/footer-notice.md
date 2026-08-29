# Footer, notice strip, announcement list

Locked by owner 29 Aug 2026.

## Footer (`102:203`)
`<footer class="ep-footer"><div class="ep-footer-inner">date · CPV | Follow us + socials | Contact Us</div></footer>`
- Full-width `#12102e`, inner capped 1280, 24 gutters, min 56 tall, text 12/16 `#bfccc9` (Figma 11/15; owner picked 12).
- Socials: Phosphor `facebook-logo`, `x-logo`, `instagram-logo`, `youtube-logo`, `linkedin-logo` at 20 in 32 px hit areas, `aria-label` each. Hover: white text / 10 % white fill. Focus: 2 px white ring.
- Under 768: stacks left-aligned, gap 8.

## Notice strip (`18:80`)
`<div class="ep-notice [ep-notice--urgent]" role="status"><span class="ep-notice-icon">megaphone</span><p class="ep-notice-text">…</p><button class="ep-notice-close" aria-label="Dismiss">x</button></div>`
- Padding 12/16, r8, gap 12, everything vertically centred. Text 12/16 medium `#1c1f21`. Icon 20 `megaphone`.
- Normal (default): `#ecf2fd` fill, `#c9d9f6` border, icon `#1d5bbf`.
- High priority (`--urgent`): `#faf2db` fill, `#e5d9b2` border, icon `#8a6d0b`.
- Links inside: primary, semibold, underlined. PDF: tertiary `ep-btn--sm` with `file-pdf` icon. Dismiss: 32 px button, `x` at 16, tint on hover.

## Announcement list (`102:139`)
`<ul class="ep-announce"><li><span class="ep-announce-text">…</span>[<a class="ep-btn ep-btn--tertiary">View PDF</a>]</li>…</ul>`
- White card, 1 px `#d9dbe0`, r8, 16 side padding. Rows min 44, hairline `#e5e5e5` between, text 12/20, no bullets.
- "New" = `ep-badge--new` pill after the text. PDF = tertiary `ep-btn--sm` pinned right (owner: "secondary or tertiary"; tertiary chosen so the row stays light).
