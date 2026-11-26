# ARCHITECTURE.md

## 1. Overview

The site is a **static multi-page application**: 15 standalone HTML pages, each
loading four shared JS modules plus one page script. All markup is produced by
template functions (the original design was a JS-rendered SPA; its templates are
reused verbatim so the visual output is pixel-identical). There is no build
step, no framework and no server-side logic.

```
HTML page (chrome + mount points)
   └── tailwind-config.js   (design tokens → <style type="text/tailwindcss">)
   └── images.js            (image manifest + helpers)
   └── data.js              (all site content)
   └── shared.js            (components, utilities, header/footer, boot())
   └── pages/<page>.js      (page template + page behaviour + boot call)
```

## 2. Script load order & globals contract

Scripts are **classic** (non-module) and executed in order; top-level
`const`/`function` declarations are shared across later scripts — the same
contract the original single `<script>` relied on.

| # | File | Declares | May call/use |
|---|---|---|---|
| 1 | `assets/js/tailwind-config.js` | `TAILWIND_THEME_CSS`, `applyTailwindConfig()` | DOM `<head>` |
| 2 | `assets/js/images.js` | `PX`, `DOC`, `IMG`, `img`, `imgSrc`, `imgOnErr` | — |
| 3 | `assets/js/data.js` | `DR`, `CH`, `ONL`, `BCH`, `SV`, `BL`, `TS`, `FQ`, `MQ`, `TERMS`, `PRIV` | `IMG` (image slots) |
| 4 | `assets/js/shared.js` | `$`, `$$`, `I`, `ic`, `tk`, `R`, `rv`, `dk`, `pageTitle`, `BTN`, `B1`, `B2`, `B3`, `CARD`, `INP`, `LBL`, `sec`, `head`, `stars`, `neural`, `pageHero`, `ctaBand`, `mapEl`, `acc`, `tsCard`, `blCard`, `svCard`, `chInfo`, `chPanel`, `NAV`, `logo`, `layout`, `L`, `toast`, `modal`, `reduce`, `reveal`, `tilt`, `counters`, `notFound`, `bindAcc`, `toastForms`, `initChrome`, `boot` | images.js, data.js |
| 5 | `assets/js/pages/<page>.js` | page template(s) + page behaviours, then calls `boot()` | everything above |

Page-specific behaviour functions live **only** in `pages/*.js`:
`heroFx`, `chTabs`, `carousel`, `quickForm` (home.js) · `blogFilter` (blog.js) ·
`faqSearch` (faqs.js) · `authForm` (sign-in.js) · `BK`, `slotsFor`, `openDays`,
`radio`, `bookingPage`, `bkFee`, `bkSummary`, `bkDates`, `bkSlots`,
`initBooking` (appointment.js).

`dk()` (date-key formatter) and `pageTitle()` are shared utilities: `dk` is used
by both the home quick-booking form and the appointment wizard; `pageTitle`
applies the original title suffix rule (`… | Dr. Arman Hossain` unless the title
already contains "Dr. Arman").

## 3. Page boot lifecycle

`boot(render, opts)` in `shared.js` reproduces the original router choreography:

1. `layout()` — render header + footer chrome, toTop glyph.
2. `bindAcc()` — delegated app behaviours (accordions, TOC jump links, copy-link).
3. `initChrome()` — mobile menu toggle, scroll progress bar, navbar shadow,
   back-to-top.
4. Entrance fade: `#app` gets `opacity-0 translate-y-3`, then after 180 ms
   (0 ms under `prefers-reduced-motion`) the template renders and the fade
   retracts — the same transition the SPA used between routes.
5. `document.title = opts.title`, `scrollTo(0, 0)`.
6. Active nav flags: every `[data-nav]` link gets `aria-current="page"` when its
   key matches `opts.nav` (default `<body data-page>`), else `"false"`.
7. Mobile menu re-collapsed.
8. Footer CTA padding: `#ftrInner` gets `pt-28` when `opts.cta` (page ends with
   the teal CTA band that overlaps the footer) else `pt-16` — same rule as the
   original `hasCta` check.
9. `requestAnimationFrame`: fade-in + generic behaviours `reveal()`, `tilt()`,
   `counters()`, `toastForms()`, then `opts.after()` (page-specific wiring).

`boot` options: `title` (use `pageTitle()`), `nav` (override active key),
`cta` (bool), `after` (function).

## 4. Design system

Design tokens live **only** in `assets/js/tailwind-config.js` as a Tailwind v4
`@theme` block injected at runtime (identical to the original inline
`<style type="text/tailwindcss">`):

* Fonts — headings `Quicksand` (500–700), body `Fira Sans` (400–600).
* Colours — `navy #1E3A6D`, `deep #0F2347`, `teal #00C4DF`, `ice #F4F8FB`,
  `body #4A5568`.
* Animations — `float`, `float-slow`, `spin-slow`, `blob`, `sway`, `marquee`,
  `ring` keyframes and their `animate-*` utilities.
* Accessibility — skip-link, visible focus rings (`focus-visible` outline teal),
  `motion-reduce` neutralises all animation/transition on `<body>`.

Shared class "tokens" (`shared.js`): `BTN`/`B1`/`B2`/`B3` buttons (3D "chunky"
style), `CARD`, `INP`, `LBL` form kit, `R`/`rv()` reveal animation classes.

## 5. Routing model

Plain relative links (`about.html`, `blog-details.html?id=recognise-stroke-fast`,
`appointment.html?ch=gulshan`). Every page works standalone. Detail pages read
`?id=` (`blog-details`, `service-details`) and `?ch=` (`appointment`);
unknown ids render the shared `notFound()` template in place, exactly like the
old `#/blog/<id>` routes.

## 6. Cross-page state

The home quick-booking form hands its validated values to `appointment.html`
via `sessionStorage` key **`nc-bk`** (`{name, phone, ch, pref}`), consumed once
by `initBooking()` (guarded with `try/catch` so `file://` contexts degrade
gracefully) plus the `?ch=` hint — mirroring the SPA's in-memory hand-off.

## 7. Responsiveness & performance

* Mobile-first Tailwind breakpoints; layouts verified at 390 px and 1440 px.
* Lazy-loaded imagery (single eager hero portrait), `decoding="async"`,
  scroll-progress + reveal-on-scroll behaviours with
  `IntersectionObserver`, all neutralised under `prefers-reduced-motion`.
* Third-party runtime: Tailwind browser CDN + Google Fonts (same as original);
  Google Maps embeds are `loading="lazy"` iframes.
