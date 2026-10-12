# Lalitha Barri — portfolio

Personal portfolio site for Lalitha Barri (Software Engineer · Applied AI), built with
Next.js 16 (App Router), TypeScript, and Tailwind CSS 4. Static pages only: no backend,
database, or API keys.

## Preview the site on your computer

1. Open this `portfolio` folder in VS Code (**File → Open Folder…**).
2. Open the built-in terminal: **Terminal → New Terminal** (or press <kbd>Ctrl</kbd>+<kbd>`</kbd>).
3. The first time only, install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open <http://localhost:3000> in your browser. Edits you save appear automatically.
6. Stop the server with <kbd>Ctrl</kbd>+<kbd>C</kbd> in the terminal.

To preview the production version instead: `npm run build`, then `npm run start`.

## Checks

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript type check (generates Next.js route types first)
npm run build       # production build
```

## Where to edit things

**Adding photos or notes?** Follow the step-by-step [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

| You want to change…                            | Edit this file                         |
| ---------------------------------------------- | -------------------------------------- |
| Name, links, hero text, About, education, skills, contact | `content/site.ts`           |
| Experience entries                             | `content/experience.ts`                |
| Projects and the LegacyBank walkthrough steps  | `content/projects.ts`                  |
| Publication                                    | `content/research.ts`                  |
| Photos, captions, collections                  | `content/photography.ts` (files in `public/images/photography/`) |
| Notes (Markdown)                               | `content/notes/*.md` — template in `templates/note-template.md` |
| Hero portrait (`public/images/hero-portrait-denim-tall.jpeg`) and its crop | `content/media.ts` → `portrait` |
| Colors, fonts, spacing                         | `app/globals.css` (the `@theme` block) |
| Page layouts                                   | `app/page.tsx`, `app/work/page.tsx`, `app/notebook/(views)/page.tsx`, `app/about/page.tsx` |

- **Add a project link** once a repository is public: add
  `links: [{ label: "Source on GitHub", href: "https://…" }]` to that project in
  `content/projects.ts`.
- **Add the paper link:** set `href` on the publication in `content/research.ts`.

## Structure

```
app/            routes: / (home), /work, /about, 404,
                /notebook (Photography), /notebook/notes, /notebook/notes/[slug]
components/     header, footer, experience list, illustrations,
                botanicals.tsx + watercolor.tsx (decorative SVG art),
                client islands: mobile-menu, legacybank-walkthrough,
                photo-viewer, notebook-switcher
content/        typed site content (edit text here); notes/ holds Markdown notes
lib/notes.ts    reads and validates the Markdown notes
templates/      private note template (never published)
public/         resume.pdf and original photographs
reference/      design references (not served on the site)
```

See `BUILD_STATUS.md` for what's done, what was checked, and what's next.
