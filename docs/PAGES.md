# PAGES.md — Page inventory

All pages are standalone HTML files at the project root. Each loads the four
shared modules plus one page script from `assets/js/pages/`. "Nav key" is the
`<body data-page>` value that drives the header's `aria-current` highlight
(matching the original SPA's `data-nav` keys).

| # | File | Page script | `<title>` | Nav key | CTA band | Detail params |
|---|---|---|---|---|---|---|
| 1 | `index.html` | `home.js` | Dr. Arman Hossain \| Consultant Neurologist in Dhaka | `home` | — | — |
| 2 | `about.html` | `about.js` | About Dr. Arman Hossain | `about` | ✔ | — |
| 3 | `services.html` | `services.js` | Neurology Services \| Dr. Arman Hossain | `services` | ✔ | — |
| 4 | `service-details.html` | `service-details.js` | *dynamic* — service title \| Dr. Arman Hossain | `services` | ✔ | `?id=<service-id>` |
| 5 | `chambers.html` | `chambers.js` | Chambers in Dhaka & Chattogram \| Dr. Arman Hossain | `chambers` | ✔ | — |
| 6 | `blog.html` | `blog.js` | Health Blog \| Dr. Arman Hossain | `blog` | ✔ | — |
| 7 | `blog-details.html` | `blog-details.js` | *dynamic* — article title \| Dr. Arman Hossain | `blog` | ✔ | `?id=<blog-id>` |
| 8 | `contact.html` | `contact.js` | Contact \| Dr. Arman Hossain | `contact` | ✔ | — |
| 9 | `faqs.html` | `faqs.js` | Frequently Asked Questions \| Dr. Arman Hossain | `faqs` | ✔ | — |
| 10 | `appointment.html` | `appointment.js` | Book an Appointment \| Dr. Arman Hossain | `appointment` | — | `?ch=<chamber-id>` |
| 11 | `sign-in.html` | `sign-in.js` | Sign in or Create Account \| Dr. Arman Hossain | `signin` | — | — |
| 12 | `testimonials.html` | `testimonials.js` | Patient Testimonials \| Dr. Arman Hossain | `testimonials` | ✔ | — |
| 13 | `terms.html` | `legal.js` | Terms & Conditions \| Dr. Arman Hossain | `terms` | — | — |
| 14 | `privacy.html` | `legal.js` | Privacy Policy \| Dr. Arman Hossain | `privacy` | — | — |
| 15 | `404.html` | `404.js` | Page not found \| Dr. Arman Hossain | `404` (no highlight) | — | — |

**CTA band** ✔ = the page ends with `ctaBand()` (teal "Get clarity this week"
banner overlapping the footer); `boot()` switches the footer's top padding
(`pt-28` vs `pt-16`) accordingly.

## Notes per page

* **index.html** — hero (3D portrait stage + marquee keyword strip), about
  preview, services preview (3 cards), chamber tabs, quick-booking form,
  testimonial carousel, blog preview, FAQ preview. Page behaviours: `heroFx`
  (pointer parallax on the hero stage), `chTabs`, `carousel`, `quickForm`
  (validated hand-off → `appointment.html?ch=…`).
* **service-details.html** — renders any id from `SV` in `data.js`. Unknown id →
  404 template in place (title "Page not found"); missing `?id` → redirect to
  `services.html` (the original listing route).
* **blog-details.html** — same pattern over `BL`; unknown id → 404 template,
  missing `?id` → redirect to `blog.html`. Share buttons + "Copy link"
  (delegated `data-copy` handler in `shared.js`).
* **appointment.html** — 4-step booking wizard (visit type → chamber → date &
  slot → details) with live summary aside and confirmation modal. Chamber
  preselected from `?ch=` or the sessionStorage hand-off.
* **terms.html / privacy.html** — one script (`legal.js`) picks copy from
  `TERMS` / `PRIV` in `data.js` via `<body data-page>`. Sticky "On this page"
  TOC with smooth scroll-jump (`data-jump`).
* **404.html** — standalone not-found page; `notFound()` lives in `shared.js`
  because the two detail pages reuse it.

## Link conventions

* Internal links are plain relative files (`about.html`,
  `service-details.html?id=migraine-headache`, `appointment.html?ch=gulshan`).
* Phone/mail links use `tel:` / `mailto:`.
* Outbound map links open Google Maps in a new tab (`rel="noopener"`).
* Every page can be opened directly — no route state is required.
