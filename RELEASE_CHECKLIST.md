# Release checklist

_Updated 2026-10-12 · checked locally against a production build (`next build` + `next start`) · staged, not committed, pushed or deployed._

**Key:** PASS = checked, no change needed · FIXED = defect found and fixed · NEEDS MY INPUT = your decision or information required · NOT TESTED = not checked by me

## Launch blockers

**None for the first commit.** Remaining work happens after deployment:

1. Create the private GitHub repository, push, and connect it to Vercel.
2. When the real domain exists, follow the steps in `lib/site-url.ts`: set the production origin, then add page-specific canonical URLs, a sitemap and robots.

## Decisions applied in this round

| Item | Status | Notes |
| --- | --- | --- |
| Hosting | PASS | Vercel + private GitHub repository. Documented in `CLAUDE.md` and `CONTENT_GUIDE.md` §8. Not connected yet |
| `CLAUDE.md` | FIXED | Replaced with a short, shareable project guide covering purpose, design rules, sources, file locations, commands, maintenance and deployment. It contains no phone number and no copy of the résumé. The complete original is kept, byte-identical, at `private-originals/CLAUDE.original.md` (git-ignored, outside `public/`) |
| `CLAUDE.md` in Git history | PASS | It was **never tracked**: no commits, branches or stashes contain it, and the phone number appears nowhere in history. Nothing needs rewriting |
| Publication | PASS | Title and venue shown (IEEE AISP 2023); no link and no empty link |
| Social-sharing image | FIXED | `app/opengraph-image.tsx`: a 1200×630 ivory-and-blue card with the name and role, in the site's Fraunces and DM Sans, with the existing dried sprig and watercolor ridge. No portrait, contact details or URL. The rendered PNG was inspected. `app/twitter-image.tsx` re-uses it. Every page outputs `og:image` (with size and alt text), `twitter:card=summary_large_image` and `twitter:image`. Fonts are in `assets/fonts/` (SIL Open Font License texts included) |
| LegacyBank discovery wording | FIXED | Now "An LLM explores the browser workflow during discovery. Each action is chosen from the browser state it actually observes." (the second sentence is from the résumé). "Meta Llama 3 70B" remains only in the technology list, as in the résumé's tech stack |
| Missing note URLs | PASS — known limitation | Unknown or draft note URLs show the not-found page with `noindex`. The first request answers HTTP 200 because Next.js streams this route; accepted for this release, no routing rewrite. Drafts are absent from pages, metadata and build output (there's no sitemap yet; `lib/site-url.ts` says to list only published notes) |
| Production origin | PASS | One documented place: `lib/site-url.ts`, reading `NEXT_PUBLIC_SITE_URL` (unset) into `metadataBase` in `app/layout.tsx`. Verified with a throw-away build using the reserved test domain `example.com`: sharing URLs became absolute. Final build has no origin set. No page has a canonical URL yet, so none points at the homepage |

## Still open (not blocking)

| Item | Status | Notes |
| --- | --- | --- |
| Publication URL | NEEDS MY INPUT | Add the verified IEEE link to `content/research.ts` when available (optional follow-up) |
| Production domain setup | NEEDS MY INPUT | Post-deployment: steps in `lib/site-url.ts` |
| Social preview on real platforms (LinkedIn, X, Slack) | NOT TESTED | Needs a public deployment; check with each platform's preview tool after deploying |
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
