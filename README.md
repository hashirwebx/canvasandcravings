# Canvas & Cravings — React site

An award-site-style one-page website for **Canvas & Cravings**, the art café in Gulberg Greens,
Islamabad. **Eat. Paint. Repeat.**

Built with React (function components + hooks), **GSAP + ScrollTrigger**, and **Lenis** smooth scroll.
All animation setup lives in one `useEffect` inside `src/CanvasCravings.jsx` with full cleanup on
unmount (kills ScrollTriggers, tweens, and destroys Lenis), so the component is safe to mount /
unmount inside a router.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Structure

- `src/CanvasCravings.jsx` — the whole page: preloader, custom cursor, nav, ticker marquee, hero,
  angled photo marquee, "The Ritual" rows + menu, the pinned horizontal "Walls" gallery, events
  headline, editorial quote, and footer. All GSAP / ScrollTrigger / Lenis setup is in a single
  `useEffect`, scoped with `gsap.context()` and `gsap.matchMedia()` for responsive + reduced-motion
  behaviour. `useRef` for every animated node — no `document.querySelector` inside the component.
- `src/CanvasCravings.css` — all styling, scoped under `.cc-root` / `cc-` classes. Fonts (Bagel Fat
  One + Space Grotesk) load via `<link>` tags in `index.html`.
- `public/images/` — real café photos (Google Maps shots), renamed by aspect ratio:
  - `cafe-p*.jpg` — portrait (used in the gallery cards + ritual hover previews)
  - `cafe-l*.jpg` — landscape (gallery cards)
  - `cafe-s*.jpg` — small landscape (angled marquee tiles)
  - `cafe-m*.jpg` / `cafe-t*.jpg` — misc / tall (spares)

## Swapping photos

The gallery cards and ritual hover previews are defined in the `GALLERY` and `RITUAL` arrays at the
top of `CanvasCravings.jsx` — just point `img:` at a new path. Each gallery card also takes a `h`
(height, e.g. `"66vh"`) and `vy` (vertical offset) for the editorial rhythm; the horizontal pin +
scrub distance recalculates automatically (`invalidateOnRefresh`).

## Behaviour notes

- **Custom cursor** (dot + lerped ring with "view" / "drag" / "paint" / "menu" labels) is disabled
  on touch devices (`pointer: coarse`) and under reduced motion. The site falls back to normal
  vertical scroll under 820px — the pinned gallery becomes a stacked photo list.
- **Reduced motion** is fully respected: no pins, no scrub, no cursor — everything is simply
  visible, and Lenis disables smoothing on its own (`respectReducedMotion`).
- The horizontal gallery is a real `ScrollTrigger` pin (`pin: true` + `scrub`), not a CSS carousel —
  vertical scroll drives the horizontal translation.
