# Release checklist

_Updated 2026-10-12 · approved public résumé replaced (phone removed) · origin `https://portfolio-lac-two-vav03pdhx0.vercel.app` via `Lalitha_Barri_WEBSITE_URL` · staged, ready to commit._

**Key:** PASS = checked, no change needed · FIXED = defect found and fixed · NEEDS MY INPUT = your decision or information required · NOT TESTED = not checked by me

## Launch blockers

None. The staged changes are ready to commit and push (see "Ready to commit" at the end).

## Approved public résumé (replaced 2026-10-12)

`public/resume.pdf` is your **newly approved public résumé**, with the phone number removed (186,792 bytes, md5 `6efc189590a8c3483b911feb80353e09`).

| Check | Status | Notes |
| --- | --- | --- |
| Phone number in text | PASS | None. No 10-digit run and no trace of the previous number in the extracted text |
| Phone number in metadata | PASS | Title "Lalitha Barri - Software Engineer", Author "Lalitha Barri"; no XMP packet; nothing else personal |
| Phone number in links | PASS | 5 links: GitHub profile, GitHub `Lalitha-Bank.LLM`, IEEE Xplore paper, LinkedIn, `mailto:sailalithabarri@gmail.com`. No `tel:` link |
| Hidden older revisions | PASS | Single revision (one `%%EOF`), not encrypted, no embedded files or scripts. A raw-byte scan found 3 phone-shaped patterns; all were false positives inside font data and glyph-width tables |
| Facts vs previous approved résumé | PASS | Text 99.35% identical; the only change is the contact line (phone removed). All site copy still matches |
| Every résumé button opens this PDF | PASS | 28 visible résumé links across all 5 routes at 1440px and 390px (header, mobile menu, footer, Experience, contact, About) all point to `/resume.pdf` and open in a new tab. The production build serves a file byte-identical to the replacement. Clicking the header and footer links opens `/resume.pdf` (200, `application/pdf`) |

### The previous résumé (with phone number) is still reachable — not rewritten

| Where | Finding |
| --- | --- |
| Git history | Commit `2d0cc1e` ("Launch Blue Hour Journal portfolio") contains the previous PDF. It's the only commit with it, and it's pushed to the public repository |
| GitHub | Downloadable now at the commit's raw URL, and at `main`'s raw URL until the next push. After pushing, `main` serves the new PDF, but **the commit-specific URL stays public permanently** unless history is rewritten |
| Live site | `https://portfolio-lac-two-vav03pdhx0.vercel.app/resume.pdf` serves the **previous** PDF until the next production deployment |
| Your computer | Old copies remain in `~/Desktop/Portfolio/resume.pdf` and one other local file (private; not part of the site) |

No history was rewritten and nothing was force-pushed. Options, your decision:

1. **Accept:** the old version stays reachable only through that commit's history.
2. **Rewrite history:** remove the file from `2d0cc1e` (e.g. with `git filter-repo`), force-push, then ask GitHub Support to purge cached views. Existing clones and forks would keep the old copy.

Either way, push and redeploy so the live site and `main` stop serving the old file.

## Approved decisions

| Decision | Status |
| --- | --- |
| GitHub repository `Lalithabarri/portfolio` is **public** | Approved by you; not an open issue. Release files were checked for secrets and personal data (see below) |
| Production URL `https://portfolio-lac-two-vav03pdhx0.vercel.app` | Confirmed by you as the assigned production URL; set in Vercel Production as `Lalitha_Barri_WEBSITE_URL` |

## Production metadata

The origin is read **only** from the server-side environment variable `Lalitha_Barri_WEBSITE_URL` (Vercel, Production), in `lib/site-url.ts`. It isn't hard-coded, and `NEXT_PUBLIC_SITE_URL` is no longer read. A trailing slash in the value is normalised away.

| Item | Status | Notes |
| --- | --- | --- |
| Variable stays on the server | PASS | No `NEXT_PUBLIC_` prefix, so it never reaches the browser. No client component reads it; all importers are server-side (layout, pages' metadata, sitemap, robots). Added the `server-only` package: a test import from a client component failed the build as intended (reverted). The client JavaScript bundles contain neither the value nor the variable name |
| `metadataBase`, page-specific canonical URLs | PASS | Built with the new variable: `/`, `/work`, `/about`, `/notebook`, `/notebook/notes` each point to themselves (5 distinct canonicals); missing notes, drafts and 404s have none and are `noindex` |
| Open Graph and Twitter URLs | PASS | Page-specific `og:url` and titles; one `og:image` and one `twitter:image` per page, absolute on the configured origin |
| `sitemap.xml`, `robots.txt` | PASS | 5 public routes (plus published notes when they exist); robots allows all and points to `<origin>/sitemap.xml`. Preview builds: `Disallow: /`, empty sitemap |
| Missing-variable check | PASS | A Vercel production build without the variable fails with "Lalitha_Barri_WEBSITE_URL must be set…" (also fails when only the old `NEXT_PUBLIC_SITE_URL` is set). A bracketed value fails with "not a valid URL (no brackets or quotes)" |
| Request-time pages | PASS | Pages rendered on demand (e.g. a missing note) read the variable when they're served, not at build time. On Vercel the variable is available both while building and while serving. Tested locally with it set for both: no localhost anywhere. Without it at runtime in production mode, the check fires instead of falling back |

## Sharing-image reachability: local vs deployed

| Where | What was verified | Result |
| --- | --- | --- |
| **Local production build** (built and served with `Lalitha_Barri_WEBSITE_URL=https://portfolio-lac-two-vav03pdhx0.vercel.app/`) | Every page's `og:image` / `twitter:image` is an absolute URL on the production origin, and the image route renders on the local server | PASS: 1 of each tag per page; local render 200 PNG |
| **Live deployment** (currently your pushed commit `2d0cc1e`) | Fetched the exact `og:image` and `twitter:image` URLs published on the live homepage, as the Facebook, X and LinkedIn crawlers | PASS: 200, `image/png`, 1200×630 for all three |
| **Live deployment** | Fetched the image URLs the *new* build will publish (`/opengraph-image`, `/twitter-image`) | PASS: 200 `image/png`; the routes already exist live |
| **Live deployment** | `sitemap.xml`, `robots.txt`, canonical tags | Not live yet (404 / absent): they're in the staged changes and appear after the next deploy |

After pushing, re-check on the live site: `/robots.txt`, `/sitemap.xml`, the canonical tag on `/work`, and a link preview.

## Decisions applied in this round

| Item | Status | Notes |
| --- | --- | --- |
| Hosting | PASS | Vercel + public GitHub repository (approved). Deployed. Documented in `CLAUDE.md` and `CONTENT_GUIDE.md` §8 |
| `CLAUDE.md` | FIXED | Replaced with a short, shareable project guide covering purpose, design rules, sources, file locations, commands, maintenance and deployment. It contains no phone number and no copy of the résumé. The complete original is kept, byte-identical, at `private-originals/CLAUDE.original.md` (git-ignored, outside `public/`) |
| `CLAUDE.md` in Git history | PASS | It was **never tracked**: no commits, branches or stashes contain it, and the phone number appears nowhere in history. Nothing needs rewriting |
| Publication | PASS | Title and venue shown (IEEE AISP 2023); no link and no empty link. **Correction:** an earlier audit said no verified IEEE URL existed, because it only read the résumé's visible text. The approved résumé's link annotations include `https://ieeexplore.ieee.org/document/10134804` |
| Social-sharing image | FIXED | `app/opengraph-image.tsx`: a 1200×630 ivory-and-blue card with the name and role, in the site's Fraunces and DM Sans, with the existing dried sprig and watercolor ridge. No portrait, contact details or URL. The rendered PNG was inspected. `app/twitter-image.tsx` re-uses it. Every page outputs `og:image` (with size and alt text), `twitter:card=summary_large_image` and `twitter:image`. Fonts are in `assets/fonts/` (SIL Open Font License texts included) |
| LegacyBank discovery wording | FIXED | Now "An LLM explores the browser workflow during discovery. Each action is chosen from the browser state it actually observes." (the second sentence is from the résumé). "Meta Llama 3 70B" remains only in the technology list, as in the résumé's tech stack |
| Missing note URLs | PASS — known limitation | Unknown or draft note URLs show the not-found page with `noindex`. The first request answers HTTP 200 because Next.js streams this route; accepted for this release, no routing rewrite. Drafts are absent from pages, metadata, the sitemap and build output |
| Production origin | PASS | Configured through `Lalitha_Barri_WEBSITE_URL`; see "Production metadata" above |

## Still open (not blocking)

| Item | Status | Notes |
| --- | --- | --- |
| Publication link | NEEDS MY INPUT | A verified URL is now available from the approved résumé (above). Adding a "Read publication" link means setting `href` in `content/research.ts`. Left unchanged because this release keeps the site copy as is |
| Social preview on real platforms (LinkedIn, X, Slack) | NOT TESTED | The live image URLs are reachable by those crawlers (see below), but I haven't run the platforms' own preview tools. After deploying, try LinkedIn Post Inspector or paste the link into a post draft |
| Real phones, Safari, Firefox, screen readers | NOT TESTED | Chrome only so far |

## Checks run in this round

| Check | Result |
| --- | --- |
| `npm run typecheck`, `npm run lint`, `npm run build` | All exit 0 |
| Browser (Chrome, production build, 1440px) | `/`, `/work`, `/about`, `/notebook`, `/notebook/notes` return 200 with their own titles. Every route has `og:image` (returns 200, PNG), `twitter:card`, `twitter:image`. A missing note shows the not-found page with `noindex`. The Discover step shows the new wording on `/` and `/work`. The publication has 0 links. 0 console errors |
| Rendered social image | 1200×630 PNG, inspected visually |
| Phone number in files to be committed | 0 occurrences |

The full browser audit from the previous round wasn't repeated. This round
changed only metadata, one sentence of copy, and an optional style prop on
the sprig drawing (no visual effect on existing pages).

## Earlier release audit (still valid)

Content vs résumé, links, navigation and anchor offsets, accordions,
walkthrough, photo viewer, Notes states, portrait and email at 360/390px,
layout at 768/1440px, axe-core (0 violations), keyboard focus, reduced
motion, 200% text, overflow, broken images and console errors all PASS. The
fixes from that round (education labels, diagram labels, home-link name,
large-text wrapping, `npm run typecheck`, `.gitignore`, personal files moved
out of `public/`) are included in this release. Secrets scan: 0 matches.

## Ready to commit

- `npm run typecheck`, `npm run lint`, and `npm run build` (with and without the variable) pass.
- No references to the earlier incorrect domain, no hard-coded production URL in code, no secrets, and no phone number anywhere in the release (including the new résumé PDF).
- Ignored and not staged: `private-originals/`, `reference/`, `node_modules/`, `.next/`, build caches.
