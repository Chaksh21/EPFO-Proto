# Form field

Locked by owner 29 Aug 2026.

Markup:
```html
<div class="ep-field [is-invalid]">
  <label class="ep-field-label" for="id">Label <span class="ep-field-req" aria-hidden="true">*</span></label>
  <input class="ep-field-input" id="id" [aria-invalid="true" aria-describedby="id-err"]>
  <span class="ep-field-help">Helper</span>
  <span class="ep-field-error" id="id-err" role="alert"><svg class="ep-icon"><use href="#ph-warning-circle"/></svg><span>Message</span></span>
</div>
```

- Label 12/16 medium `#1c1f21`; required mark red `#de333d`, decorative (say "required" in the label or `required` attribute for AT).
- Gap 8 between label, input, helper/error.
- Input 40 tall, padding 0 12, `#f5f5f5` fill, 1 px `#d9dbe0`, r8, text 14/20. Placeholder `#737373`. Hover border `#c4c8cf`. Focus: white fill, primary border, 2 px `#dcd4ff` halo, no outline. Disabled: `#fafafa`, `#e5e5e5` border, `#a3a3a3` text.
- Helper 12/16 `#737373`.
- Error (`.is-invalid` on the wrapper): input border `#b3261e`, white fill, red halo `#f8d7d4` on focus; message 12/16 `#b3261e` with 16 px `warning-circle` icon, `role="alert"`. Message states what failed, who fixes it, what evidence, what next (AGENTS.md).
- Deviations from Figma: 11 → 12 label (type floor), 6 → 8 gap, 36 → 40 tall, r6 → r8.

Where: login `102:178`, consent `22:130`, redirect `22:66`.
