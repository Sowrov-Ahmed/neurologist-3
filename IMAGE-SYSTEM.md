# IMAGE-SYSTEM.md

Complete documentation of the image system for the **Dr. Arman Hossain —
Consultant Neurologist** portfolio website: where images live, how they are
referenced, naming conventions and how each image slot is used.

---

## 1. Where images live

```
neurologist/
├── assets/
│   └── images/          ← all local image files (the "image bank")
│       ├── doctor-1.jpg … doctor-8.jpg
│       ├── service-<service-id>.jpg   (6 files)
│       └── blog-<blog-id>.jpg         (6 files)
└── assets/js/
    └── images.js        ← central image manifest (ALL image references)
```

**Every image reference in the project is declared in `assets/js/images.js`.**
No other file hard-codes an image URL or file name — page templates consume the
manifest through its helpers (below). This keeps IMAGE-SYSTEM.md, the manifest
and the folder in exact sync.

**Primary imagery — client-supplied photography.** The eight doctor photos are
real photographs of the client, supplied by the client and professionally
prepared for the web (see §10). They are the **primary** doctor imagery. The
Pexels URLs recorded in the manifest remain as **automatic fallbacks** only
(used if a local file is ever missing), preserving the original self-healing
slot design.

## 2. The manifest (`assets/js/images.js`)

| Export | Kind | Purpose |
|---|---|---|
| `PX(id, w=1200, h=627)` | function | Builds a Pexels CDN URL with the exact crop parameters used as **fallback** source (and as the origin the local files were captured from). |
| `DOC` | object | Doctor photo **slots** `d1`–`d8`. Each entry is `[localFile, fallbackUrl]`. |
| `IMG.sv` | object | Service cover slots, keyed by service id (from `data.js`). `[localFile, fallbackUrl]`. |
| `IMG.bl` | object | Blog cover slots, keyed by blog article id (from `data.js`). `[localFile, fallbackUrl]`. |
| `img(k, cls, alt, eager)` | function | Renders a doctor-slot `<img>`: local file first, `onerror` swap to the CDN fallback, `loading="lazy"` (or `fetchpriority="high"` when `eager`). |
| `imgSrc(entry)` | function | Returns the local path for a content slot (`assets/images/<file>`). |
| `imgOnErr(entry)` | function | Returns the `onerror="…"` attribute that swaps to the CDN fallback — same self-healing pattern as `img()`. |

### Resolution order (applies to every image)

1. **Local file** `assets/images/<file>` — fast, works offline.
2. **Pexels CDN fallback** — swapped in automatically via `onerror` if the local
   file is missing or fails to decode. The site therefore renders correctly even
   with an empty `assets/images/` folder.

## 3. Naming conventions

| Prefix | Pattern | Example | Count |
|---|---|---|---|
| Doctor portrait/photo slots | `doctor-<n>.jpg` (n = 1–8, matches slot key `d<n>`) | `doctor-5.jpg` | 8 |
| Service cover slots | `service-<service-id>.jpg` (id verbatim from `data.js` `SV[].id`) | `service-migraine-headache.jpg` | 6 |
| Blog cover slots | `blog-<blog-id>.jpg` (id verbatim from `data.js` `BL[].id`) | `blog-recognise-stroke-fast.jpg` | 6 |

All files are **JPEG** (`.jpg`). The service/blog ids are the same kebab-case ids
used in URLs (`service-details.html?id=…`, `blog-details.html?id=…`), so an
image file can always be traced to its content entry and vice versa.

## 4. Slot reference — doctor photos (`DOC`)

Primary source: **client-supplied photographs** (processed per §10). The
"Pexels fallback" column is the automatic `onerror` backup only.

| Slot | File | Fallback (Pexels, exact crop) | Size | Where it renders | Alt text (accessibility) |
|---|---|---|---|---|---|
| `d1` | `doctor-1.jpg` | `PX(15962798, 1000, 1000)` | 1000×1000 | about.html — small round inset portrait; blog-details.html — article author avatar + sidebar avatar | "Portrait of Dr. Arman Hossain" / "Dr. Arman Hossain" |
| `d2` | `doctor-2.jpg` | `PX(6129573, 900, 1200)` | 900×1200 | sign-in.html — left visual panel (desktop) | "Dr. Arman Hossain holding a clinical folder" |
| `d3` | `doctor-3.jpg` | `PX(6129573, 1200, 900)` | 1200×900 | index.html — "About the doctor" section photo | "Dr. Arman Hossain with arms crossed in his consulting room" |
| `d4` | `doctor-4.jpg` | `PX(39192372, 1376, 768)` | 1376×768 | about.html — "Journey" section photo | "Dr. Arman Hossain reviewing brain MRI scans" |
| `d5` | `doctor-5.jpg` | `PX(5722163, 800, 1200)` | 800×1200 | index.html — hero portrait (eager/high priority) | "Dr. Arman Hossain, Consultant Neurologist, standing in a bright modern clinic" |
| `d6` | `doctor-6.jpg` | `PX(39192334, 1376, 768)` | 1376×768 | index.html — FAQ side image; chambers.html — video-consultation band | "Dr. Arman Hossain on a video consultation" / "Dr. Arman Hossain during a video consultation" |
| `d7` | `doctor-7.jpg` | `PX(39192358, 1200, 900)` | 1200×900 | index.html — quick-booking panel photo (desktop) | "Dr. Arman Hossain consulting a patient" |
| `d8` | `doctor-8.jpg` | `PX(32160037, 1376, 768)` | 1376×768 | about.html — main profile photo | "Dr. Arman Hossain standing in a bright hospital atrium" |

## 5. Slot reference — content photos (`IMG`)

Each slot is a `[localFile, fallbackUrl]` pair consumed by page templates via
`imgSrc()` / `imgOnErr()`.

### Service covers (`IMG.sv`, keyed by `SV[].id`)

| Slot key | File | Fallback | Used on |
|---|---|---|---|
| `migraine-headache` | `service-migraine-headache.jpg` | `PX(5207232)` | services.html, index.html (services preview), service-details.html |
| `stroke-care` | `service-stroke-care.jpg` | `PX(20860622)` | same |
| `epilepsy-seizures` | `service-epilepsy-seizures.jpg` | `PX(7089020)` | same |
| `parkinsons-movement` | `service-parkinsons-movement.jpg` | `PX(39192358)` | same |
| `neuropathy-nerve-pain` | `service-neuropathy-nerve-pain.jpg` | `PX(13185359)` | same |
| `memory-sleep` | `service-memory-sleep.jpg` | `PX(28512648)` | same |

### Blog covers (`IMG.bl`, keyed by `BL[].id`)

| Slot key | File | Fallback | Used on |
|---|---|---|---|
| `migraine-triggers-dhaka` | `blog-migraine-triggers-dhaka.jpg` | `PX(5357194)` | blog.html, index.html (blog preview), blog-details.html |
| `recognise-stroke-fast` | `blog-recognise-stroke-fast.jpg` | `PX(20860622)` | same |
| `living-with-epilepsy` | `blog-living-with-epilepsy.jpg` | `PX(7089020)` | same |
| `sleep-and-memory` | `blog-sleep-and-memory.jpg` | `PX(6541074)` | same |
| `diabetic-neuropathy-care` | `blog-diabetic-neuropathy-care.jpg` | `PX(13185359)` | same |
| `brain-health-habits` | `blog-brain-health-habits.jpg` | `PX(5723883)` | same |

## 6. Image-slot usage in the layout

How each slot position is styled by the shared components (`assets/js/shared.js`)
and page templates — when replacing artwork, keep the subject framed to survive
these crops:

| UI slot | Component | Rendered size / crop | Notes |
|---|---|---|---|
| Hero portrait (home) | `home()` hero | `aspect-[3/4]`, `object-[50%_20%]` | Editorial portrait card (`rounded-[16px]`, 1px slate border, ambient shadow). Photo stays unobstructed chest-up; a frosted-glass bar (`backdrop-blur-[12px]`) anchored inside the lower edge carries name, credentials and the "Next available" status. Hover: scale `1.02` + subtle pointer parallax. Eager-loaded (`fetchpriority="high"`). |
| About photo (home) | `home()` about | `aspect-[4/4.4]`, `object-[40%_20%]` | Tilt card (`data-tilt`). |
| Quick-booking photo | `home()` appt | fills left panel (`min-h-[28rem]`) | Desktop only. |
| FAQ side image | `home()` faq | `h-64` cover | Desktop only; dark gradient overlay. |
| Service card cover | `svCard` | `h-48` cover, `group-hover:scale-110` | Navy gradient overlay + white icon badge bottom-left. |
| Service detail hero | `serviceDetail` | `aspect-[16/8]` cover | Wide crop — keep subject centred. |
| Blog card cover | `blCard` | `h-52` cover, `group-hover:scale-110` | Category pill top-left. |
| Article cover (blog-details) | `postPage` | `aspect-[16/8]` cover | Overlaps the article hero (`-mt-24`), ring-8 white. |
| Author avatar (blog-details) | `postPage` | `size-12`/`size-24` circles | Ring accent. |
| "More to read" thumb | `postPage` | `size-16` rounded square | Related articles sidebar. |
| About main + inset | `aboutPage` | `aspect-[4/3]` + `size-32/40` circle | Inset circle is `animate-float`. |
| About journey photo | `aboutPage` | `aspect-[16/9]` cover | Navy gradient overlay. |
| Sign-in visual | `signinPage` | `aspect-[4/4.6]`, `object-top` | Desktop only. |
| Chambers online band | `chambersPage` | fills right panel | Navy gradient overlay. |

## 7. Lazy-loading & performance policy

* **Eager / high priority:** only the home hero portrait (`img('d5', …, true)`).
* **Lazy (`loading="lazy"`, `decoding="async"`):** every other image. The `img()`
  helper and content-slot tags both apply this automatically.
* Local files were captured **from the exact fallback URLs** (same crop
  parameters), so local and fallback rendering are pixel-identical.
  Exception: the eight doctor slots hold **client-supplied photography**
  (see §10); their stock fallbacks remain purely as an offline safety net.

## 8. Replacing or adding images

1. **Replace an image:** drop the new file into `assets/images/` using the exact
   existing file name (e.g. replace `doctor-5.jpg`). Nothing else changes — the
   fallback keeps working if the file is removed.
2. **Add a doctor photo slot:** add `d9: ['doctor-9.jpg', PX(<pexels-id>, <w>, <h>)]`
   to `DOC` in `images.js`, save the file as `assets/images/doctor-9.jpg`, and
   use `img('d9', …)` in a template.
3. **Add a service/blog image:** add an entry to `IMG.sv` / `IMG.bl` keyed by the
   content id, save `assets/images/service-<id>.jpg` / `blog-<id>.jpg`, and let
   `svCard`/`blCard` pick it up automatically via `data.js`.
4. Keep alt texts descriptive and patient-facing (they are part of the
   accessibility contract of the original design).

## 9. Image inventory (20 files, ≈2.2 MB total)

`doctor-1…8.jpg` (8) · `service-*.jpg` (6) · `blog-*.jpg` (6) — all JPEG,
served relative to the project root as `assets/images/<file>`.

## 10. Source photography & processing specs (doctor slots)

The doctor slots hold client-supplied photographs of the practice owner,
professionally prepared for the web before installation:

| Slot | Client original (as supplied) | Framing intent |
|---|---|---|
| `doctor-1.jpg` | `Man_smiling_in_clinic_setting_774141f9.jpg` | Smiling head-and-shoulders portrait — avatars |
| `doctor-2.jpg` | `Man_holding_medical_folder_fc51a094.jpg` | Standing with clinical folder — sign-in panel |
| `doctor-3.jpg` | `Man_leaning_against_clinic_desk_2f1a5003.jpg` | Arms crossed at consulting desk — home about |
| `doctor-4.jpg` | `Man_examining_medical_scan_81fd3fea.jpg` | Reviewing brain MRI scans — about journey |
| `doctor-5.jpg` | `Man_standing_in_clinic_cb486025.jpg` | Full standing figure, bright clinic — home hero |
| `doctor-6.jpg` | `Man_smiling_during_video_call_e5b091f6.jpg` | Video consultation at desk — FAQ / online band |
| `doctor-7.jpg` | `Doctor_listening_to_patient_cons…_9f5fc7f9.jpg` | Listening to a patient across the desk — quick booking |
| `doctor-8.jpg` | `Doctor_standing_in_hospital_atrium_c32fae91.jpg` | Standing in hospital atrium — about main photo |

Processing applied (non-destructive to layout — outputs match each slot's exact
documented dimensions, so every `object-cover`/`object-position` crop in the
templates behaves identically):

1. EXIF orientation normalised (all sources were orientation 1).
2. **Cover-crop** to the slot aspect ratio with a face-aware vertical bias
   (excess trimmed toward the floor; headroom preserved).
3. **LANCZOS resize** to the exact slot dimensions (§4).
4. **Optimised progressive JPEG**, quality 85, `optimize` on — ≈87–133 KB each.
5. **Metadata stripped** on re-encode (privacy: no EXIF/GPS data ships).

Alt texts already described these exact scenes ("holding a clinical folder",
"arms crossed in his consulting room", "reviewing brain MRI scans", "on a video
consultation", "consulting a patient", "standing in a bright hospital atrium",
"standing in a bright modern clinic"), so the accessibility layer remained
truthful without changes.
