# WORKING.md — Live task state

> Agents: read `AGENT.md` first. Update this file as you work. Keep it short and prune old entries.

_Last updated: 2026-10-18_

## In progress
_None._

## Up next / blocked
_None._

## Recently completed (keep ≤5)
- 2026-10-18 — Tab icon (`index.html`) and header logo (`Header.tsx`) now use `src/assets/icons/favicon.svg`. Not committed yet.
- 2026-10-18 — Pointed auth buttons at the external web app. `SIGN_IN_URL` / `SIGN_UP_URL` live in `src/utils/navigation.ts`. They're used in Header, Hero, CallToAction, Features, About, and the Churches CTA.
- 2026-10-18 — Added `AGENT.md` and `WORKING.md`.

## Notes for the next agent
- Stack: React + TypeScript + Vite, react-router, SCSS. Typecheck with `npx tsc -b`.
- Internal routes are listed in `KNOWN_ROUTES` in `src/utils/navigation.ts`. Keep it in sync with `src/App.tsx`.
- Use plain `<a href>` for external links, not router `<Link>`.
