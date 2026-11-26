# COMPONENTS.md — Shared components & utilities (`assets/js/shared.js`)

Everything reusable lives in `shared.js`: helpers, design-token classes,
markup components, layout chrome, global behaviours and the page `boot()`.
Page templates call these functions; none of them hard-code content (content
comes from `data.js`, images from `images.js`).

## 1. Helpers

| Name | Description |
|---|---|
| `$` / `$$` | `querySelector` / spread `querySelectorAll`. |
| `I` + `ic(name, cls)` | Inline SVG icon set (`arrow`, `phone`, `mail`, `pin`, `clock`, `calendar`, `check`, `star`, `shield`, `activity`, `zap`, `user`, `menu`, `x`, `down`, `up`, `search`, `heart`, `video`, `lock`, `award`, `brain`, `moon`, `waves`, `file`, `send`, `eye`, `fb`, `in`, `yt`, `quote`, `cap`) rendered at `viewBox 0 0 24 24`, stroke 1.8. |
| `tk(n)` | Formats a number as Bangladeshi Taka (`৳1,500`). |
| `dk(d)` | Date → `yyyy-mm-dd` key (used by quick-booking + wizard). |
| `pageTitle(t)` | Applies the original title rule: adds ` | Dr. Arman Hossain` unless the title already contains "Dr. Arman". |
| `reduce` | `true` when the user prefers reduced motion (gates all animation wiring). |

## 2. Design-token classes

| Name | Value |
|---|---|
| `R` | Reveal-on-scroll base classes (`opacity-0 translate-y-8 transition-all duration-700 …`, motion-reduce safe). |
| `rv(i)` | `R` + staggered `[transition-delay:i*90ms]`. |
| `BTN` / `B1` / `B2` / `B3` | Button kit: base pill; `B1` teal 3D primary; `B2` navy 3D primary; `B3` glass outline (on dark). |
| `CARD` | White rounded-3xl card with soft navy shadow. |
| `INP` / `LBL` | Form input + label kit (ice background, teal focus ring). |

## 3. Layout primitives

| Function | Purpose |
|---|---|
| `sec(inner, cls='')` | Standard padded section wrapper (`py-16 lg:py-24` + `max-w-7xl` container). |
| `head(eyebrow, title, sub, center, light)` | Section heading block: teal eyebrow with rules, heading, optional sub. |
| `stars(n)` | Accessible 5-star rating row. |
| `neural(cls)` | Decorative SVG "neural network" background (used by heroes). |
| `pageHero(title, sub)` | Inner-page hero: navy gradient + neural bg + floating 3D brain badge. |
| `ctaBand()` | Teal CTA banner ("Worried about a symptom? …") that overlaps the footer. |
| `mapEl(chamber, h)` | Lazy Google Maps embed for a chamber. |

## 4. Content components

| Function | Renders |
|---|---|
| `acc(q, a, i)` | FAQ accordion card (delegated `data-acc` handler, staggered reveal). |
| `tsCard(t, i)` | Testimonial figure: stars, quote, initials avatar. |
| `blCard(b, i)` | Blog card: cover (zoom on hover), category pill, date/read time, "Read article" arrow link. |
| `svCard(s, i)` | Service card: cover + icon badge, summary, "From ৳…" footer, details link. |
| `chInfo(c)` | Chamber detail list (address / days / hours / phone) with icon chips. |
| `chPanel(c)` | Chamber panel: map, fee badge, `chInfo`, "Book at this chamber" + directions. |
| `notFound()` | The 404 composition (floating 4-brain-4), reused by `404.html` and both detail pages. |

## 5. Layout chrome

| Function | Renders |
|---|---|
| `layout()` | Header (top info bar + navbar + mobile drawer) and footer (brand column, Explore links, Services links, newsletter form, contacts, legal links) into `#hdr` / `#ftr`; sets the toTop icon. |
| `NAV` / `logo` / `L` | Nav data (`home`, `about`, `services`, `chambers`, `contact`), brand lockup, footer link helper. |

Header/footer links use the same relative-file convention as page content;
`[data-nav]` flags are set to `aria-current` by `boot()`.

## 6. Global behaviours (wired on every page)

| Function | Behaviour |
|---|---|
| `toast(msg)` | Pushes a navy toast into `#toasts` (auto-dismiss 4.5 s). |
| `modal(html)` | Accessible dialog overlay (Esc/overlay/close-button dismiss) — used by the booking confirmation. |
| `reveal()` | `IntersectionObserver` staggered reveal for `[data-r]`. |
| `tilt()` | Pointer parallax tilt for `[data-tilt]` (hover-capable, motion-allowed only). |
| `counters()` | Animated `[data-count]` stat counters (eased rAF, suffix/decimal support). |
| `bindAcc()` | Delegated `#app` clicks: `[data-acc]` accordions, `[data-jump]` smooth scroll, `[data-copy]` copy-link toast. |
| `toastForms()` | Any `form[data-toastform]` submits → validation + success toast + reset (contact + newsletter). |
| `initChrome()` | Mobile menu toggle, scroll progress bar (`#progress`), navbar shadow, back-to-top button. |
| `boot(render, opts)` | Full page lifecycle — see [ARCHITECTURE.md](ARCHITECTURE.md#3-page-boot-lifecycle). |

## 7. Page-specific behaviours (live in `assets/js/pages/`)

| Function | Page | Behaviour |
|---|---|---|
| `heroFx()` | home | Subtle pointer parallax on the hero portrait (`#stageIn` → `[data-parallax]`, native `translate`, ±6 px); hover scale `1.02` via `group-hover:scale-[1.02]`. |
| `chTabs()` | home | Chamber tab list → `chPanel()` swap with fade. |
| `carousel()` | home | Testimonial slider: prev/next/dots, responsive page size, auto-advance (paused on hover / reduced motion / hidden tab). |
| `quickForm()` | home | Quick-booking validation + sessionStorage hand-off to `appointment.html`. |
| `blogFilter()` | blog | Category chip filtering over `#blGrid [data-cat]`. |
| `faqSearch()` | faqs | Live search over FAQ cards + empty state. |
| `authForm()` | sign-in | Sign-in/register tabs, password reveal, demo submit toast → redirect home. |
| `initBooking()` + `slotsFor`/`openDays`/`radio`/`bkFee`/`bkSummary`/`bkDates`/`bkSlots` | appointment | Booking wizard state (`BK`), slot generation, live summary, confirmation modal. |
