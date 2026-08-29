# EPFO member portal, a prototype

An independent redesign of the EPFO member portal for the Build What Moves
India hackathon. Static site, no build step. Not a government product; every
name and number is made up.

## Run it

Open `docs/index.html` from any static server, for example:

```
python3 -m http.server 8000 --directory docs
```

Then visit `http://localhost:8000/#/login`.

Demo sign-in: UAN `1000 2233 4455`, password `Demo@2026`.

## The path

Login → dashboard → Passbook Lite → consent → redirect → Passbook Portal.

Three things the prototype argues for: one clear path with no detours, a
passbook a citizen can read, and an honest hand-off when the portal sends
you to another site.

## Layout

- `docs/` deploys (GitHub Pages, `/docs`).
- `archive/pilot-2026-08-29/` holds the decision log, component specs and
  Figma-vs-build screenshots from the build.
- `AGENTS.md` holds the standing rules.
