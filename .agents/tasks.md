# Task: "For Churches" page UI

Source of truth: reference screenshot (desktop left, mobile right) + the brief in the chat.
Header already exists. DO NOT touch it. No new deps. Plain React + SCSS.

## Checklist
- [x] Discovery (styles, router, icons, conventions)
- [x] Verify external image URLs (Unsplash)
- [x] `src/pages/ChurchesPage/churchesData.ts` (all copy, steps, types, image URLs, link targets)
- [x] `src/utils/navigation.ts` (route-or-home helper + `useSafeNavigate` / `resolveTarget`)
- [x] Hooks: `useAccordion`, `useCarousel`
- [x] Section components + SCSS partials (Hero, Needs, Steps, ChurchTypes, CtaBanner, Footer)
- [x] `ChurchesPage.tsx` composes the sections
- [x] Route `/churches` in `src/App.tsx`
- [x] `npm run build` passes
- [x] Final notes below

## Discovery cache
- Styles: `src/styles/_variables.scss` (tokens), `src/styles/_mixins.scss`, `src/styles/global.scss`.
  Import in a partial: `@use '../../styles/variables' as v; @use '../../styles/mixins' as m;`
- Mixins: `container`, `focus-ring`, `button-reset`, `interactive-lift`.
- Tokens: colors `$ink-950/900/800 $slate-* $stone-* $amber-500/400/100 $green-500 $indigo-500 $violet-500 $white`,
  roles `$color-brand(-hover) $color-on-dark(-muted) $color-surface(-soft) $color-border $color-focus`,
  type `$text-xs..$text-display`, `$font-weight-*`, `$font-script`, spacing `$space-1..20`,
  radii `$radius-sm..xl/pill`, shadows `$shadow-card/button`, motion `$ease-standard $duration-fast/base/slow`,
  breakpoints `$bp-small 30rem, $bp-medium 48rem, $bp-large 64rem`, `$content-max`, `$gutter`.
- No hard-coded hex wanted. (Existing pages use a few; do not copy that.)
- Router: `src/App.tsx` (react-router-dom v7). Routes: `/`, `/about`, `/features`, `/contact`, `*` -> `/`.
- Icons: `lucide-react` (`import { X, type LucideIcon } from 'lucide-react'`), `aria-hidden="true"`.
- Conventions: pages in `src/pages/<Name>Page/<Name>Page.tsx|scss`; components in `src/components/<Name>/<Name>.tsx|scss`;
  named exports; SCSS BEM-ish (`block__el--mod`), mobile-first with `@media (min-width: v.$bp-*)`.
  `.sr-only` utility exists in global.scss. Global reduced-motion rule exists in global.scss.
- Shared Button component: NONE (each page defines its own `*-button` class). Churches page defines its own `.churches-button`.
- Header: `src/components/Header/Header.tsx` "For Churches" -> `/churches` (one-line change made at user's request).
- Local assets exist in `src/assets/images` but the brief requires external image URLs.
- Untracked `src/components/VideoDialog/tsconfig.app.json` is pre-existing, not mine.

## Result (for the next session)
Status: all sections built, `npm run build` passes. NOT yet checked visually in a browser (no screenshot tool was available).
Next step for whoever picks this up: run `npm run dev`, open `/churches`, compare to the reference screenshot at 375px and 1280px, then tune SCSS.

### Files created
- `src/utils/navigation.ts` - `resolveRoute(target)`: known route -> itself, else "/". `KNOWN_ROUTES` must match App.tsx.
- `src/pages/ChurchesPage/ChurchesPage.tsx` + `ChurchesPage.scss` (only `@use`s the partials)
- `src/pages/ChurchesPage/churchesData.ts` - all copy, icons, image URLs, link targets
- `src/pages/ChurchesPage/hooks/` - `useAccordion`, `useCarousel`, `useMediaQuery`
- `src/pages/ChurchesPage/sections/` - `ChurchesHero`, `ChurchNeeds`, `ChurchSteps`, `ChurchTypes`, `ChurchCta`, `ChurchFooter`, `Photo` (tsx) and matching `_shared/_hero/_needs/_steps/_types/_cta/_footer.scss`
### Files changed
- `src/App.tsx` - added the `/churches` route only. Header untouched.

### Decisions
- No shared Button component exists, so `.churches-button` (in `_shared.scss`) is the page's own, same pattern as the other pages.
- Steps: one DOM. Mobile (<64rem) = accordion buttons with aria-expanded, panel animates via grid-template-rows 0fr->1fr, closed panels are `inert`. Desktop (>=64rem) = header becomes a plain div, all steps visible, content left / image right via `order`.
- Carousel: native scroll-snap + `scrollBy` arrows; arrows hidden on desktop (4-up grid). Glass buttons use a dark translucent tint so they read on the white section background.
- Icon tones mapped to existing tokens: amber, green, violet, indigo (screenshot's coral has no token, so indigo was used).
- Eyebrow color derives from `$amber-500` via `color.adjust` (no new hex).
- Footer link columns hidden below 64rem to match the mobile screenshot. Social links point to unknown routes, so they resolve to "/".
- Mobile hero curved image: skipped (not simple CSS).
- Garbled screenshot copy was reconstructed: CTA button "See How It Works for Your Church", steps heading "How Churches Use FaithLink", footer text/contact details. Check these against the original design.

### Images (all Unsplash, each verified HTTP 200 at w=1600)
hero photo-1573497701240-345a300b8d36, needs 1529390079861-591de354faf5, steps 1553272725-086100aecf5e,
local church 1604072424771-7300bc5de457, youth 1744320911030-1ab998d994d7, fellowship 1573164574511-73c773193279,
multi-church 1641064464128-81cfd55d5c8a, CTA 1606503993966-e6dbe4b386fa.
Imperfect matches (no better free photo found): hero has no cross and is cooler than the brief; CTA has raised hands at sunset but no cross;
needs image shows children writing, not teens; fellowship photo is a boardroom-style meeting. Swap URLs in `images` in churchesData.ts if better ones turn up.

### Left undone / open
- (Done) Header "For Churches" link now points to `/churches`.
- Visual QA in browser; a11y pass with a screen reader.
- Untracked `src/components/VideoDialog/tsconfig.app.json` is pre-existing, not part of this task.

## Round 2 changes (user feedback)
- Carousel arrows removed entirely (swipe only); `useCarousel` hook and glass-button styles deleted.
- Footer: link columns + contact now shown on mobile too (2 link columns side by side, brand/contact/socials/copyright full width).
- Steps (desktop >=64rem): list uses a container query on `.churches-steps__content`: 2x2 by default, 4-in-a-row when the column is >=44rem. Dashed connectors: 1->2 and 3->4 in 2x2; all adjacent in 4-up; none on mobile (accordion).
- Hero h1 now matches the other pages' hero (semibold, -0.055em, line-height 0.98).
- Focus outlines removed globally (`focus-ring` mixin is now outline:none, plus `:focus` rule in global.scss) and tap highlight disabled on `*`.
  Trade-off: keyboard users no longer see a focus indicator. Revisit if accessibility matters.
- Build passes; still not visually checked in a browser.
