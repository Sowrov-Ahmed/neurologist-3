# docs/ — Project documentation

Documentation for the **Dr. Arman Hossain — Consultant Neurologist** multi-page
portfolio website (HTML · Tailwind CSS v4 · vanilla JavaScript).

| Document | Contents |
|---|---|
| [README.md](README.md) | This index, quick start, tech stack, project tree. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Module map, script load order, globals contract, page boot lifecycle, design system. |
| [PAGES.md](PAGES.md) | Page inventory: file → template → page script → title → nav key → routing notes. |
| [COMPONENTS.md](COMPONENTS.md) | Shared components & utilities API (`shared.js`), behaviour initialisers, chrome. |
| [CONTENT.md](CONTENT.md) | Central content model (`data.js`): every collection and its fields. |
| [DEVELOPMENT.md](DEVELOPMENT.md) | How to edit content, images, add pages; conventions; verification workflow. |


Image system documentation lives at the project root:
[../IMAGE-SYSTEM.md](../IMAGE-SYSTEM.md).

## Quick start

No build step, no framework, no backend. Either:

```bash
# recommended — any static file server
cd neurologist
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

or simply open `index.html` in a browser (network access needed for the Tailwind
CDN runtime and Google Fonts, exactly like the original site; all photos also
have local copies under `assets/images/`).

## Tech stack

* **HTML** — 15 independent, SEO-titled pages, mobile-first.
* **Tailwind CSS v4** (browser runtime) — design tokens centralised in
  `assets/js/tailwind-config.js`; **no raw/custom CSS files**.
* **Vanilla JavaScript** — classic scripts (no modules, no bundler, no
  framework, no backend/database/API). Shared template functions render each
  page's markup, exactly as the original single-page site did.

## Project tree

```
neurologist/
├── 404.html  index.html  about.html  appointment.html  blog.html
├── blog-details.html  chambers.html  contact.html  faqs.html  privacy.html
├── service-details.html  services.html  sign-in.html  terms.html  testimonials.html
├── assets/
│   ├── images/            # 20 local photos (see ../IMAGE-SYSTEM.md)
│   └── js/
│       ├── data.js        # central site content
│       ├── images.js      # central image manifest
│       ├── shared.js      # shared components, utilities, chrome, boot()
│       ├── tailwind-config.js  # Tailwind theme (design tokens)
│       └── pages/         # one script per page (14 files)
├── docs/                  # this documentation
└── IMAGE-SYSTEM.md        # image-slot documentation
```
