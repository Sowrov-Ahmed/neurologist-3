# DEVELOPMENT.md — Working on the project

## Ground rules

1. **No frameworks, no build step, no backend/API/database.** Plain HTML,
   Tailwind CSS v4 (browser runtime) and vanilla JS classic scripts.
2. **No raw/custom CSS.** Styling is Tailwind utilities + the design tokens in
   `assets/js/tailwind-config.js`. If you need a new token (colour, font,
   animation), add it to the `@theme` block there — never in a page.
3. **Design fidelity.** Reuse the existing components and token classes
   (`B1`/`B2`/`B3`, `CARD`, `INP`, `sec`, `head`, `pageHero`, `ctaBand`,
   `acc`, `tsCard`, `blCard`, `svCard`…). New sections should look like the
   current ones.
4. **All content in `data.js`, all images in `images.js`.** Templates should
   never hard-code copy or image URLs.
5. **Relative paths only.** Every page must work when opened directly
   (server or `file://`).

## Editing content

* **Text/fees/chambers/articles/FAQs/legal copy** → `assets/js/data.js`
  (field reference in [CONTENT.md](CONTENT.md)).
* **Titles & meta descriptions** → the page's `<title>` / `<meta
  name="description">` in its HTML file (dynamic detail pages also set
  `document.title` in their page script via `pageTitle()`).

## Editing images

See [../IMAGE-SYSTEM.md](../IMAGE-SYSTEM.md). Short version: drop the new file
into `assets/images/` with the existing file name; the CDN fallback keeps the
page safe if the file is ever missing.

## Adding content entries

* **New service** — add an object to `SV` (unique kebab-case `id`, `ic` icon
  name from the `I` set in `shared.js`) and add its cover slot
  `IMG.sv['<id>'] = ['service-<id>.jpg', PX(<pexels-id>)]` in `images.js`.
  Cards, detail pages and the footer service list pick it up automatically
  (footer shows the first five).
* **New blog article** — add to `BL` + `IMG.bl['<id>']`; the blog listing,
  filters, previews and related-article rails update automatically.
* **New chamber** — add to `CH` (see [CONTENT.md](CONTENT.md) for fields);
  tabs, maps, booking calendar and dropdowns update automatically. If the
  chamber should be bookable it is already included via `BCH = [...CH, ONL]`.
* **New FAQ** — append a `[q, a]` pair to `FQ`.

## Adding a page

1. Copy a similar HTML shell (e.g. `about.html`), set `<title>`, description,
   `data-page` (nav key — reuse an existing key like `services` to highlight a
   parent nav item, or use a new key for no highlight) and the final
   `<script src="assets/js/pages/<name>.js">`.
2. Create `assets/js/pages/<name>.js`: a template function built from shared
   components, page-specific behaviour if needed, then
   `boot(() => myPage(), { cta: true|false, title: pageTitle('…'), after })`.
3. Link it from `NAV`/footer in `layout()` (`shared.js`) if it belongs in
   navigation.

## Verification workflow

The migration was verified with headless Chromium (Playwright):

* **Pixel fidelity** — full-page screenshots of every page (desktop 1440×900
  and mobile 390×844) compared against the original single-page site rendered
  under identical conditions: 30/30 comparisons at 0.000 % pixel difference.
* **Interactions** — 46 automated checks: navigation, accordions, chamber tabs,
  testimonial carousel, quick-booking hand-off, booking wizard + confirmation
  modal, blog filters, FAQ search, auth tabs/password reveal, form toasts,
  legal TOC jumps, active-nav flags, progress bar, back-to-top, mobile menu.
* **Static checks** — `node --check` on every JS file; load-order concatenation
  check for globals collisions; link audit (every `href` target exists).

When you make changes: re-run `node --check` on touched files and spot-check
the affected page at both viewports (or re-run your own Playwright pass).
