# CLAUDE.md — Lalitha Barri portfolio

Guide for anyone (human or AI assistant) working on this repository. Also
read `AGENTS.md`: this project uses Next.js 16, whose APIs differ from older
versions, so check `node_modules/next/dist/docs/` before writing framework
code.

## Purpose

A personal portfolio for software engineering and applied AI roles,
referrals and networking. It should read clearly for both engineers and
non-technical visitors. Public identity: **Lalitha Barri — Software Engineer ·
Applied AI**.

Homepage order (keep it): Introduction → Experience → Selected Work →
Research → Notebook → About & Contact. Other routes: `/work`, `/about`,
`/notebook` (Photography), `/notebook/notes`, `/notebook/notes/[slug]`.

## Design rules — "Blue Hour Journal"

- One continuous ivory-and-blue theme: ivory paper, layered pale/dusty/slate
  watercolor washes, delicate dried-flower sprigs, taped paper photo frames.
  No dark sections.
- Two typefaces only: Fraunces (headings) and DM Sans (body). No extra or
  handwritten fonts.
- Design tokens (colours, spacing, container width) live in the `@theme`
  block of `app/globals.css`.
- Decorations (`components/botanicals.tsx`, `components/watercolor.tsx`) are
  decorative SVG, hidden from assistive technology, sit behind content, and
  must never cover text, buttons, navigation or a face.
- Keep: visible keyboard focus, reduced-motion support, no horizontal
  scrolling at 360px, captions visible without hover.

## Content sources and no-invention rules

- **Source of truth for professional facts** (roles, dates, metrics,
  technologies, education, GPAs, coursework): the approved public résumé,
  `public/resume.pdf` (the version approved 2026-10-12, which has no phone
  number). Never edit that PDF; replace it only with a newly approved file.
  Never publish a phone number on the site or in the repository.
- Website copy (hero, About, captions) is user-approved; don't rewrite it
  without being asked.
- Never invent achievements, metrics, dates, locations, personal stories,
  photographer credits, project/repository URLs, publication links or notes.
- Keep each metric's original context (e.g. "in the evaluation workload",
  "offered load", test counts are not success rates) and the difference
  between team and individual work.
- Links that are approved: GitHub https://github.com/LalithaBarri and
  LinkedIn https://www.linkedin.com/in/lalithabarri/. Contact email:
  sailalithabarri@gmail.com. No individual repository links yet.
- The publication (Bird Species Recognition using Deep Learning — IEEE AISP
  2023): the approved résumé links it to
  https://ieeexplore.ieee.org/document/10134804. The site currently shows
  title and venue only; adding a "Read publication" link is a pending
  decision. Never add an empty link.
- Original photographs are never regenerated, retouched, recoloured or
  replaced with stock/AI images. Crops are done only by positioning.
- If a needed fact or asset is missing, report it — don't guess.

## Where things live

| What | Where |
| --- | --- |
| Identity, hero, About, education, skills, contact | `content/site.ts` |
| Experience | `content/experience.ts` |
| Projects and the LegacyBank walkthrough | `content/projects.ts` |
| Publication | `content/research.ts` |
| Hero portrait settings and crop | `content/media.ts` |
| Photos, captions, collections, homepage picks | `content/photography.ts` |
| Photo files | `public/images/photography/` |
| Notes (Markdown) | `content/notes/*.md`; private template in `templates/note-template.md` |
| Production origin, canonical/sharing metadata helper | `lib/site-url.ts` (origin comes from the server-only `Lalitha_Barri_WEBSITE_URL` env var in Vercel) |
| Sitemap and robots | `app/sitemap.ts`, `app/robots.ts` |
| Social-sharing image | `app/opengraph-image.tsx` (fonts in `assets/fonts/`) |

Anything in `public/` is downloadable by anyone. Keep only files the site
uses there; backups go in the git-ignored `private-originals/` folder.
Design mockups go in the git-ignored `reference/` folder.

## Commands

```bash
npm install          # first time only
npm run dev          # local preview at http://localhost:3000
npm run lint         # ESLint
npm run typecheck    # generates Next.js route types, then runs tsc
npm run build        # production build (also drops draft notes)
npm run start        # serve the production build locally
```

## Maintaining photos and notes

Step-by-step instructions are in `CONTENT_GUIDE.md`. In short:

- **Photos:** add the file to `public/images/photography/` with a new
  lowercase-dashed name, then add an entry (alt text, caption, order,
  optional `homepagePosition` 1–4) in `content/photography.ts`.
- **Never overwrite an image at an existing filename** — use a new name and
  update the path, or caches may keep serving the old image.
- **Notes:** copy `templates/note-template.md` into `content/notes/`, fill in
  `title`, `date`, `summary`, optional `tags`, `type`, and `draft`. Drafts
  appear only in `npm run dev` and are excluded from production builds.

## Deployment workflow

Hosting: **Vercel**, connected to the GitHub repository `Lalithabarri/portfolio`,
which is **public by choice** — never commit secrets, `.env` files or the
git-ignored `private-originals/` and `reference/` folders.

1. Make changes on your computer and check them with `npm run dev`.
2. Run `npm run lint`, `npm run typecheck` and `npm run build`.
3. Commit and push to GitHub; Vercel builds and deploys automatically
   (preview deployments for branches, production for the main branch).
4. The production address is the `Lalitha_Barri_WEBSITE_URL` variable in
   Vercel (Production) — a plain https address, no brackets or quotes. Canonical URLs, sharing URLs, `sitemap.xml` and
   `robots.txt` all derive from it; to change domains, change the variable
   and redeploy. A production build without it fails on purpose.
5. Every new public page should export its metadata through
   `pageMetadata({ path: "/its-own-path", … })` and be added to
   `app/sitemap.ts`. Published notes are added to the sitemap
   automatically; drafts never are.

Release status and known limitations: `RELEASE_CHECKLIST.md` and
`BUILD_STATUS.md`.
