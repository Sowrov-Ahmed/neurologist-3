# CONTENT.md — Central content model (`assets/js/data.js`)

All website copy lives in `data.js`. Edit this file to change what pages say —
no template edits are needed for content updates. Image references inside
content point at slots declared in `assets/js/images.js` (see
[../IMAGE-SYSTEM.md](../IMAGE-SYSTEM.md)).

## `DR` — practice profile

| Field | Example | Used for |
|---|---|---|
| `name` | `'Dr. Arman Hossain'` | Header/footer brand, hero, articles |
| `reg` | `'BMDC Reg. No. A-48217'` | Footer legal line |
| `hot` | `'+880 9610-256 800'` | Hotline everywhere |
| `mail` | `'care@drarmanhossain.com'` | Contact + legal copy |

## `CH` — chambers (array) / `ONL` — video clinic / `BCH` — all booking venues

| Field | Meaning |
|---|---|
| `id` | URL key (`?ch=<id>`), e.g. `dhanmondi` |
| `n` / `a` | Name / street address |
| `days` | Open weekdays as JS day numbers (0=Sun … 6=Sat) — drives the slot calendar |
| `dt` / `tm` | Human-readable days / hours |
| `from` / `to` / `step` | Slot window in minutes-from-midnight, slot length |
| `fee` / `fu` | New-patient / follow-up fee in BDT |
| `ph` / `q` / `note` | Phone, map search query, facility note (`CH` only) |

`BCH = [...CH, ONL]` is the booking-venue list (also drives the quick-booking
dropdown). `ONL` has no `ph`/`q`/`note` (video clinic).

## `SV` — services (6)

`id`, `t` (title), `s` (summary), `o` (overview paragraph), `sym` (symptoms
list), `steps` (`[[title, text], …]` treatment steps), `dur` (duration label),
`fee` (from-price BDT), `ic` (icon name), `img` (image slot ref).

Ids: `migraine-headache`, `stroke-care`, `epilepsy-seizures`,
`parkinsons-movement`, `neuropathy-nerve-pain`, `memory-sleep`.

## `BL` — blog articles (6)

`id`, `t` (title), `cat` (category — drives blog filters), `date`, `read`
(read time), `ex` (card excerpt), `img` (image slot ref), `intro` (lead
paragraph), `secs` (`[[heading, body], …]`), `tips` (key-takeaways list).

Ids: `migraine-triggers-dhaka`, `recognise-stroke-fast`, `living-with-epilepsy`,
`sleep-and-memory`, `diabetic-neuropathy-care`, `brain-health-habits`.

## `TS` — testimonials (6)

`n` (name), `m` (meta line: condition · area), `q` (quote).

## `FQ` — frequently asked questions (10)

Array of `[question, answer]` pairs. The first 5 render in the home FAQ
preview; all 10 render on `faqs.html` (with live search).

## `MQ` — marquee keywords

Ten condition keywords for the animated hero strip
(Migraine, Stroke, Epilepsy, Parkinson's Disease, Neuropathy, Memory Loss,
Dizziness & Vertigo, Sciatica, Tremor, Sleep Disorders).

## `TERMS` / `PRIV` — legal copy

Arrays of `[heading, paragraph]` pairs rendered by `assets/js/pages/legal.js`
(`terms.html` / `privacy.html`) with the sticky "On this page" index. Both
include live `DR.mail` / `DR.hot` references.

## Content conventions

* Fees are plain numbers; formatting (`৳1,500`) happens via `tk()` — never
  pre-format money strings in data.
* Keep `id`s kebab-case and stable: they are image filenames
  (`service-<id>.jpg` / `blog-<id>.jpg`) and URL query values.
* Dates are display strings (`'3 Nov 2025'`) — the site is static content.
* The booking wizard's availability simulation (`slotsFor`) derives "booked"
  slots deterministically from the date; it is demo logic in
  `pages/appointment.js`, not content.
