# Build status

_Last updated: 2026-10-12 — release decisions applied (Vercel + private GitHub, sanitized CLAUDE.md,
social-sharing image, production-origin setting in `lib/site-url.ts`). See RELEASE_CHECKLIST.md.
The original CLAUDE.md brief is kept privately at `private-originals/CLAUDE.original.md`.
Staged locally; not committed, pushed, or deployed._

## Inputs

| Input | Path | Status |
| --- | --- | --- |
| Approved résumé | `public/resume.pdf` | Present, unchanged. Served at `/resume.pdf` |
| **Hero portrait (current)** | `public/images/hero-portrait-denim-tall.jpeg` | 3000×4000, no EXIF, unedited; cropped only by positioning inside the frame (`content/media.ts` → `portrait.crop`: head and upper torso, ~8% headroom) |
| Personal backups (not public, not committed) | `private-originals/` | `portrait-original.jpg`, `portrait-blue-landscape.jpeg`, `portrait-blue-original.jpeg`, `gallery-waterfront-original.jpeg`, ` herpportrait.jpeg`. Moved out of `public/` during release prep so they can't be downloaded from the site; contents unchanged (checksums verified). The folder is git-ignored. Crop values for the two alternative portraits are noted in `content/media.ts` |
| Notebook photographs | 12 files in `public/images/photography/` | Present. Byte-identical (checksum) to the originals in `~/Desktop/captures/`. No GPS data in any file (EXIF checked) |
| `reference/current-homepage.png`, `reference/blue-hour-target.png` | — | **Missing**, not found anywhere on disk. `reference/floral-style.png` was used as the style reference |
| `reference/floral-style.png`, `reference/experience-first-layout.png` | `reference/` | Present. Used for aesthetics only, not content |

### Final photo mapping (original → current file → content)

All 12 photographs live in `public/images/photography/` and are listed in
`content/photography.ts`. The files are renamed copies with their contents
unchanged; the originals remain in `~/Desktop/captures/`. Each match was
confirmed by checksum, and none was ambiguous.

| # | Original filename | Current file | Content `id` | Collection | Homepage |
| --- | --- | --- | --- | --- | --- |
| 1 | `Caption related to snow world.jpeg` | `snowy-trees.jpeg` | `snowy-streets` | Light & little pauses | 1 |
| 2 | `lost in thoughts .jpeg` | `lost-in-thoughts.jpeg` | `lost-in-thoughts` | Pages from my life | 2 |
| 3 | `Grad Moments.jpeg` | `grad-moments.jpeg` | `grad-moments` | Pages from my life | 3 |
| 4 | `The city skyline always leaves me at aww.jpeg` | `city-skyline-evening.jpeg` | `night-skyline-bridge` | Light & little pauses | 4 |
| 5 | `Biggest fan of sunsets.jpeg` | `sunset-bridges.jpeg` | `sunset-water-bridges` | Light & little pauses | — |
| 6 | `Dumbo captures.jpeg` | `dumbo-captures.jpeg` | `dumbo-bridge` | Places & people | — |
| 7 | `First time in NYC.jpeg` | `first-time-in-nyc.jpeg` | `first-nyc-visit` | Places & people | — |
| 8 | `Indian architecture .jpg` | `indian-architecture.jpg` | `indian-architecture` | Places & people | — |
| 9 | `Rich heritage of Indian temples.jpg` | `temple-tower.jpg` | `temple-tower` | Places & people | — |
| 10 | `Love to travel.jpeg` | `love-to-travel.jpeg` | `travel-waterfalls` | Pages from my life | — |
| 11 | `An old man trying to survive.jpg` | `old-man.jpg` | `older-man-blue-shirt` | Places & people | — |
| 12 | `WhatsApp Image 2026-10-12 at 01.43.30.jpeg` | `commencement-confetti.jpeg` | `graduation-confetti` | Pages from my life | — |

Captions are the exact text you supplied, including curly apostrophes. Each
photo's internal label is stored as `label` and is never displayed. Alt text is
written separately and describes only what is visible.

**Intentionally removed, not restored:** `NYC Sunrise thru my lens.jpeg`
(was `nyc-sunrise.jpeg`) and `WhatsApp Image 2026-10-12 at 01.42.46.jpeg`
(was `white-dress-campus.jpeg`). Neither file is in the project, and neither
has a content entry or homepage reference.

## What changed in this refinement

- **One continuous ivory-and-blue theme:**
  - Two-layer paper texture: fine grain plus soft blue mottling, each under 5% opacity.
  - Warm cream "journal paper" cards.
  - No dark sections.
- **Watercolor (`components/watercolor.tsx`):**
  - Procedural SVG ridges in pale, dusty and slate blue, with irregular displaced edges, pigment pooling along each edge, and paper granulation.
  - These replace the smooth wave bands at the hero bottom, inner-page intros, the Notebook section edge, card bottoms (projects, research, contact) and the footer.
  - Torn-edged painted panel behind the portrait; soft blooms at section edges.
- **Dried flowers (`components/botanicals.tsx`):** the outline daisies are replaced by procedurally branched sprigs with thin taupe stems, tiny cream five-petal flowers, buds and muted sage/grey-blue leaves. Slate lavender silhouettes sit inside the washes, and a small spray marks each section heading.
- **Hero:**
  - More compact and balanced two-column layout; the name sits on two lines from tablet width up.
  - Approved headline, role, job interests and relocation line unchanged.
- **Portrait:**
  - Original file, now with an explicit crop box (`content/media.ts`): head to waist, about 8% headroom, centred on the face.
  - Tape moved to the frame corners so nothing covers the face.
- **Decorations kept clear of text:** they sit behind content (`z-index:-1` inside `isolate` parents) and never take clicks. They scale per breakpoint and are hidden where space is tight; washes behind headings show only on wide screens. `<main>` clips sideways overflow.
- **Notebook, two views with a switcher:**
  - `/notebook` (Photography) and `/notebook/notes` (Notes), sharing an intro.
  - Photography:
    - Three collections from `content/photography.ts` (title, optional description, order).
    - Each photo has a private label, image path, caption, alt text, order, optional `homepagePosition` (1–4) and optional focal point.
    - Captions always visible. Thumbnails show the whole photo in a square paper mat (no cropping unless a focal point is set). Grid columns adapt to the width (2 on phones, 3 on tablets, and 3–5 on desktop depending on collection size, to avoid a lone last row).
  - Photo viewer: native modal dialog with Previous/Next buttons (44px), ← → keys, touch swipe, Escape/Close/backdrop to exit, a live "Photo n of N" counter, focus into the viewer on open and back to the matching thumbnail on close.
  - Notes:
    - Markdown files in `content/notes/` with title, date, summary, optional tags, type (`note` or `thought`) and `draft`, read by `lib/notes.ts`.
    - Frontmatter is validated with plain-English errors.
    - Drafts are excluded from production builds and shown labelled in `npm run dev`.
    - Private template in `templates/note-template.md`.
    - Per-note pages at `/notebook/notes/[slug]`.
- **Homepage Notebook preview:** the four photos with a `homepagePosition`, in that order, with visible captions, the latest published note only if one exists (none do yet), and links to the full Notebook.
- **CONTENT_GUIDE.md:** step-by-step instructions for photos, captions, collections, notes, drafts, preview and publishing.
- **Dependency:** added `marked` (Markdown rendering).
- Removed the old single-photo `components/photo-gallery.tsx` (replaced by `photo-viewer.tsx`) and `app/notebook/page.tsx` (replaced by the `(views)` route group).

Homepage order is unchanged: Introduction → Experience → Selected Work →
Research → Notebook → About & Contact. All résumé facts and approved copy are
unchanged.

## Checks run (exact results)

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Pass (exit 0) |
| `npx eslint` | Pass (exit 0, no warnings) |
| `npm run build` (Next.js 16.4.0) | Pass. Static: `/`, `/about`, `/work`, `/notebook`, `/notebook/notes`, `/_not-found`, `/icon.svg`. `/notebook/notes/[slug]` is partially prerendered, with a placeholder page while there are no notes |
| Browser (Playwright + local Chrome, production server): `/`, `/notebook`, `/notebook/notes`, `/work`, `/about` at **360, 390, 768, 1440px** | No horizontal overflow, no clipped text, no broken images, no console errors |
| Image loading | Only the hero portrait loads eagerly (preloaded). Every photograph is `loading="lazy"` with responsive `srcset`/`sizes` via `next/image` |
| EXIF rotation | The two camera photos stored sideways (orientation 6 and 8) render upright in thumbnails and in the viewer |
| Photo viewer (390px, touch-enabled) | Enter opens it with focus on Close. → and ← move with wrap-around. Previous/Next buttons and swipe left work. Tab stays inside the dialog. Escape closes it and returns focus to the matching thumbnail |
| Notebook switcher | `aria-current="page"` on the active view; switching to Notes shows the "No notes published yet" empty state |
| Notes pipeline | Tested with two **temporary** files (one published, one draft), then deleted them and rebuilt. Published note: listed, page rendered (Markdown heading and bold), shown as "Latest note" on the homepage. Draft: zero occurrences in the production build output and absent from every page |
| Homepage links | Nav anchors, `/resume.pdf`, `mailto:sailalithabarri@gmail.com`, `/work#…` anchors, `/notebook`, `/about`, and the approved GitHub and LinkedIn URLs only |
| Mobile menu at 768px (keyboard) | Opens, Tab reaches the links, Enter navigates to `/#experience`, menu closes |
| Reduced motion | `scroll-behavior: auto`; animations and transitions effectively disabled |
| Visual comparison | Screenshots compared against `reference/floral-style.png` at 390/768/1440px (see "Fidelity" below) |

### Hero portrait bug: diagnosis and fix

**Symptom you reported:** the face was entirely outside the frame, with only part of the body along the right edge.

**Cause, confirmed on your running `npm run dev` server (port 3000):**

- The new tall photo had been copied *over* the existing `/images/portrait-blue-original.jpeg`, reusing that URL.
- Next.js's image optimizer caches resized versions per URL, size and format.
- For a browser asking for WebP at `w=1920` (what a 1440px retina laptop requests), the server answered `x-nextjs-cache: STALE` with a **1920×1755** image: the *old landscape photo*. The cache filenames' ETags decode to the old file's 188,778-byte size.
- The crop numbers were written for the new 3000×4000 photo. Applied to the old landscape image, they showed its lower-middle section: no face, body at the right edge.
- My earlier checks used a separate production server whose cache already held the new image, so they didn't catch it.

**Fix:**

- The photo is copied unchanged to a new, descriptive URL, `/images/hero-portrait-denim-tall.jpeg`, and `content/media.ts` points there. No cache can hold an older image at that address.
- The crop itself was correct. There is a single mechanism (absolute `left`/`top`/`width` from `portrait.crop`), with no transforms, scale or `object-position` overrides and no breakpoint-specific rules, so nothing needed removing.
- Rule going forward, also in CONTENT_GUIDE.md: **never overwrite an image at the same filename; use a new name.**

**Header and "Lalitha":** at scroll position 0, the name sits 32–56px below the header at every width checked, so it isn't an initial-layout problem. Reloading after scrolling makes the browser restore the previous scroll position (checked: reload at 120px stays at 120px), which puts the top of the name under the sticky header. That's ordinary scrolling, so I didn't change anything.

### Hero portrait swap checks (latest run)

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` / `npx eslint` / `npm run build` | All pass (exit 0) |
| Hero (browser, 360/390/768/1024/1440px, at 2× pixel density, on both your dev server and a fresh production build) | Loads `/images/hero-portrait-denim-tall.jpeg`; every size served is 3:4 (e.g. 1920×2560). Diagnostic render of the complete photo, centred, confirmed the correct source. Crop: Top of hair 8.4% down the frame, chin at 36%, face centred at 49% across, whole head inside the frame at every width. Tape and sprigs don't overlap the face region (only the painted wash panel overlaps geometrically, and it sits behind the photo). Screenshots reviewed at 390px and 1440px |
| Overflow at 360px | None on `/`, `/notebook`, `/notebook/notes`, `/work`, `/about` |
| Gallery unchanged | Notebook still shows 12 tiles; the homepage picks are still snowy-trees → lost-in-thoughts → grad-moments → city-skyline-evening; the blue portrait doesn't appear in the Notebook |

### Photography update checks

| Check | Result |
| --- | --- |
| Photo entries in `content/photography.ts` | 12 (3 + 5 + 4 across the three collections) |
| Referenced files exist | All 12 present in `public/images/photography/`; no file in that folder is unreferenced |
| Removed photos | Neither file on disk; zero references in `app/`, `components/`, `content/`, `lib/` |
| `npx tsc --noEmit` / `npx eslint` / `npm run build` | All pass (exit 0); all pages static as before |
| Homepage preview (browser, 360/390/768/1440px) | Exactly 4 photos in order: snowy-trees → lost-in-thoughts → grad-moments (seated, overhead) → city-skyline-evening. Captions visible without hover; "Open the notebook" and "See all photographs" links present |
| Notebook (browser, 360/390/768/1440px) | 12 tiles in Light & little pauses (3), Places & people (5), Pages from my life (4). Exact captions, no broken images, no internal labels displayed, no horizontal overflow, no console errors |
| Thumbnail framing | Whole photo shown (`object-fit: contain`) in a square paper mat, so landscape and portrait compositions are uncropped. Checked visually at 390px and 1440px |
| Viewer | Opens the complete, uncropped image with its caption (checked on a portrait and a landscape photo at 390px). Escape returns focus to the tile |

## Fidelity to the reference — honest assessment

The site now shares the reference's structure and palette:

- ivory paper
- layered blue ridges
- a taped, layered photo frame on a painted wash
- small dried sprigs and lavender
- an editorial serif

**It does not faithfully reproduce the reference's painted artwork.** The washes
and flowers are code-drawn SVG approximations. Compared with the reference,
the washes are flatter and lack real pigment blooms and paper absorption. The
sprigs are smaller and more schematic than photographed pressed flowers.

### Decorative assets needed for a faithful match

None are in the project. For a closer match, supply original or properly
licensed artwork, for example scans of your own paintings or licensed stock.
**Do not crop them out of the reference mockup.**

1. **Watercolor ridge strips** — transparent PNG/WebP, ~2400×400px, 3 variants (pale, dusty and slate dominant), irregular top edge and soft bottom.
2. **Corner and edge wash blooms** — transparent PNG/WebP, ~1200×1200px, 2–3 variants.
3. **Painted panel** — transparent PNG/WebP, ~1000×1250px, torn edges, for behind the portrait.
4. **Dried-flower sprigs** — transparent PNG (or clean SVG traces), ~600×1200px, 3–5 variants: gypsophila / baby's breath, a cream wildflower stem, a muted leafy stem.
5. **Lavender silhouette** in slate blue — transparent PNG/SVG, ~300×800px.
6. **Paper texture tile** — seamless, ~512×512px, very light.
7. **Tape strip** (optional) — transparent PNG, ~300×80px.

Each would replace the matching component in `components/watercolor.tsx` or
`components/botanicals.tsx` with an `<Image>` or CSS background, without
touching page layout.

## Known limitations and open questions

- **Photo of an identifiable stranger:** the portrait of an older man in a blue shirt shows an identifiable person. Consider whether you have, or need, their consent before publishing.
- **Unknown note URLs** (including draft slugs in production) show the "page not found" page with a `noindex` tag, but answer with HTTP 200 rather than 404. Next.js streams that route before `notFound()` runs. No draft content is exposed.
- **No real notes yet.** The Notes view shows an empty state, and the homepage note block is hidden.
- **Deployment is not configured:** no Git remote, hosting service or CI. CONTENT_GUIDE.md section 8 says so.

## What still needs a manual check

- Real phones and tablets (iOS Safari and Android Chrome): swipe in the photo viewer, the sticky header, and overall feel. I only tested touch by simulated pointer events in desktop Chrome.
- Safari and Firefox rendering of the SVG watercolor filters (tested in Chrome only).
- A screen-reader pass (VoiceOver/NVDA) on the photo viewer and Notebook switcher.
- Whether the portrait crop and the decoration density suit your taste.

## Next steps

1. Review the open questions above.
2. Optionally supply painted watercolor and flower assets (list above).
3. Write the first note from `templates/note-template.md`.
4. Choose hosting, connect a Git remote, and deploy (not done in this phase).
5. Phase 2 case-study routes `/work/legacybank`, `/work/quorum`, and so on, still pending from the original plan.
