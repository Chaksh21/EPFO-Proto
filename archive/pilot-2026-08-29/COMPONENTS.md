# Component backlog — recurring pieces across the six frames

Written 29 Aug 2026 after the service card locked. Order agreed with the owner: 1–4 before the rail; the rail brings 8 with it. Each item: one spec, build, Chrome measure vs Figma, owner eyeball, then lock in `DECISIONS.md`.

## Locked
- Header (bar, brand row, nav, mega panels, phone hamburger). `index.html`, `pilot.css`, `pilot.js`.
- Service card: `.ep-card` with `--stack | --row | --cta | --rail`. `specs/service-card.md`.

## Pick next, in order
1. ~~**Type + spacing scale.**~~ DONE 29 Aug 2026. Decided piecemeal so far: sizes 11 / 12 / 14 / 16 (nothing below 11, whole numbers); spacing 4 / 8 / 12 / 14 / 24. Write as tokens in `:root`, document, done. No eyeball needed.
2. ~~**Buttons.**~~ LOCKED 29 Aug 2026, `specs/button.md`. Primary (Sign in, Activate, Logout), secondary grey (Reset), outline (Not Now), text link (Verify now). Login `102:184`, `102:194`; dashboard `62:55`. States: hover, :active press, focus, disabled, loading.
3. ~~**Form field.**~~ LOCKED 29 Aug 2026, `specs/form-field.md`. Label + input, required mark, helper, focus ring, error text. Login `102:178`; consent `22:130`; redirect `22:66`.
4. ~~**Badge / status chip.**~~ LOCKED 29 Aug 2026, `specs/badge.md`. NEW red (`102:141`), "New member" primary (built, `.ep-card-badge`), Active Member green tick (`75:7`), "Under process • filed…" grey (`18:64`). One component, four tones.
5. ~~**Section heading.**~~ LOCKED 29 Aug 2026, `specs/heading-link.md`. `.ep-section-title` 14/20 600 exists; add the "View all ›" link variant and freeze.
6. ~~**Footer.**~~ LOCKED 29 Aug 2026, `specs/footer-notice.md`. Dark strip: date + CPV, Follow us + socials, Contact Us. `102:203`. No states.
7. ~~**Notice strip / announcement row.**~~ LOCKED 29 Aug 2026, `specs/footer-notice.md`. Dashboard yellow strip `18:80`; login list `102:139`. Shared: icon or bullet, text, (PDF) link, dismiss.
8. ~~**Page shell.**~~ LOCKED 29 Aug 2026 with the rail, `specs/page-shell.md`. 1280 container, 24 gutters. Login: 832 + 380. Dashboard: 296 + 760 + rail. Rail widened to 200 (owner), so main column is 1080 not 1112. Hash routing per AGENTS.md.
9. ~~**Text link.**~~ LOCKED 29 Aug 2026, `specs/heading-link.md`. "Forgot Password ?", "Verify now", "View full profile ›", "Skip to Main Content". Colour, underline, hover, focus not set.

## Then: pages
- ~~Quick Links rail placed for real~~ LOCKED 29 Aug 2026.
- Dashboard `14:66`: profile card `75:2`, stat cards `18:32`…, share card `18:45`, latest claim `18:59`.
- Passbook Lite `22:2`: page head, entries table `24:34`, toast `24:134`.
- Login `102:110`, consent `22:130`, redirect `22:66`, passbook portal `35:79`.
- "or" divider `102:190`, avatar, verified tick.

## Standing rules that touch every component
- No font size below 11 px, whole numbers. No fixed card heights. Purple tint reserved for cta actions.
- Copy: plain English, Flesch 85+, no em dashes; "claim" = PF money, "pension" = EPS, UAN = the number.
- Bump `pilot.css?v=` in `index.html` on every CSS change (Chrome caches otherwise).
- Every decision to `DECISIONS.md` the moment it is made.
