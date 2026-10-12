# Content guide

How to update photos and notes on the site. Everything is plain files in
this project — no database, login, or upload form.

You'll use **VS Code** for all of this:

- **Open a file:** press <kbd>Cmd</kbd>+<kbd>P</kbd> (Mac) or <kbd>Ctrl</kbd>+<kbd>P</kbd>
  (Windows), type part of the file name, press Enter.
- **Open the terminal:** menu **Terminal → New Terminal**.
- **Save:** <kbd>Cmd</kbd>+<kbd>S</kbd> / <kbd>Ctrl</kbd>+<kbd>S</kbd>.

> Tip: start the preview first (section 7) and keep it running. Every time you
> save, the browser page updates, so you can see your change straight away.

**All photo text and settings live in one file: `content/photography.ts`.**
The image files themselves live in `public/images/photography/`. Nothing else
needs editing for photos.

---

## 1. Add a photograph

1. **Choose a file name.** Use lowercase letters, numbers and dashes only, e.g.
   `morning-ferry.jpg`. No spaces.
2. **Copy the photo** into the folder `public/images/photography/`
   (drag it into that folder in VS Code's file list on the left). Keep your
   original somewhere else as a backup — the site never edits the file.
3. **Find its size in pixels.**
   - Mac: select the file in Finder, press <kbd>Cmd</kbd>+<kbd>I</kbd>, look under
     *More Info → Dimensions*.
   - Windows: right-click → *Properties → Details → Dimensions*.
   - If the photo looks sideways in Finder but upright on your phone, use the
     **upright** width and height (the site rotates it automatically).
4. **Open `content/photography.ts`** and find the collection it belongs in.
   The three collections start at these lines:
   - `title: "Light & little pauses",`
   - `title: "Places & people",`
   - `title: "Pages from my life",`
5. **Add an entry** inside that collection's `photos: [ ... ]` list. Copy an
   existing entry, paste it after the last one in that list, and change the
   values:

   ```ts
   {
     id: "morning-ferry",
     label: "Ferry at sunrise",
     src: "/images/photography/morning-ferry.jpg",
     width: 1600,
     height: 1200,
     alt: "A ferry crossing calm water in early morning light.",
     caption: "Your caption, exactly as you want it shown.",
     order: 6,
   },
   ```

   - `id` — a short unique name, lowercase-with-dashes.
   - `label` — a private name to help you find the photo in this file. It is
     **never shown** on the site.
   - `src` — always starts with `/images/photography/` followed by the exact
     file name.
   - `alt` — a plain description of what is **in** the photo, for people
     using screen readers. Required, and separate from the caption. Describe
     what you see; don't add places, dates or stories that aren't visible.
   - `caption` — the one line of text shown under the photo (section 2).
   - `order` — its position in the collection (1 = first).
   - Optional: `homepagePosition: 1` (to 4) puts it on the homepage — see
     section 3.
   - Optional: `focalPoint: { x: 50, y: 50 },` — normally each thumbnail
     shows the **whole** photo inside a square paper mat, so wide and tall
     photos are never cut off. Add a focal point only if you'd rather the
     thumbnail fill the mat, cropped around that point (`x` left→right,
     `y` top→bottom, both 0–100). The enlarged view always shows the whole
     photo either way.
6. **Save.** Check the photo on <http://localhost:3000/notebook>.

Mind the commas: every `{ ... }` entry ends with `},` and every line inside
ends with `,`.

## 2. Write or change a caption

1. Open `content/photography.ts`.
2. Find the photo: press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>F</kbd> and search
   for its `label` (e.g. `Snowy streets`) or its file name
   (e.g. `snowy-trees`).
3. In that photo's entry, change the text between the quotes on the
   **`caption:`** line:

   ```ts
   caption: "Even an ordinary street gets a little main-character moment in the snow.",
   ```

   - Curly apostrophes (’) and straight ones (') both work.
   - If your caption contains a double quote ("), write it as \" or use
     curly quotes “ ”.
   - To show **no** caption, leave the quotes empty: `caption: "",`
4. Save.

Captions are always visible under the photo — on phones and computers, no
hovering needed — and also appear under the enlarged view.

## 3. Change the homepage photos

The homepage preview shows the photos that have a **`homepagePosition`**
line, in that order (1 = first). Keep it to four.

1. Open `content/photography.ts` and search for `homepagePosition`.
   You'll find four lines, `homepagePosition: 1,` to `homepagePosition: 4,`.
2. **To remove** a photo from the homepage, delete its `homepagePosition`
   line (the photo stays in the Notebook).
3. **To add** a photo, add a line such as `homepagePosition: 2,` inside its
   entry, just below its `order:` line.
4. **To reorder**, change the numbers. Each number 1–4 should be used once.
5. Save and check <http://localhost:3000/#notebook>.

## 4. Create a photo collection

1. Open `content/photography.ts`.
2. Copy a whole existing collection block — from its `{` with `id:` down to
   the matching `},` after its `photos: [ ... ],` list.
3. Paste it after the last collection (before the final `];`) and change:

   ```ts
   {
     id: "street-food",
     title: "Street food",
     description: "Optional sentence shown under the title.",
     order: 4,
     photos: [
       // photo entries go here, as in section 1
     ],
   },
   ```

   - `description` is optional — delete the line if you don't want one.
   - `order` decides where the collection appears on /notebook (lowest first).
4. Add photos to it (section 1), then save.

## 5. Add a note

Notes are Markdown files in `content/notes/`. A **note** is a longer
engineering write-up with its own page; a **thought** is a short entry shown
in full in the notes list.

1. Open `templates/note-template.md` (this template is private — it is never
   published).
2. Copy the file into the `content/notes/` folder.
3. Rename the copy. The name becomes the web address, so use lowercase words
   and dashes: `content/notes/retry-budgets.md` →
   `/notebook/notes/retry-budgets`.
4. Fill in the header between the two `---` lines:

   ```md
   ---
   title: Why I put a budget on retries
   date: 2026-11-02
   summary: A sentence or two shown in the notes list and on the homepage.
   tags: [distributed systems, testing]
   type: note
   draft: false
   ---
   ```

   - `title`, `date` (written `YYYY-MM-DD`) and `summary` are required.
   - `tags` is optional — delete the line if you don't want tags.
   - `type` is `note` (longer) or `thought` (short).
   - Lines starting with `#` in the header are comments; you can delete them.
5. Write the note below the second `---` in Markdown. Start section headings
   at `##` (the title is already the main heading).
6. Save and check <http://localhost:3000/notebook/notes>.

If something in the header is wrong, the preview shows an error that names the
file and the problem (for example, a date written the wrong way).

The newest published note automatically appears on the homepage under
**Latest note**. While no notes are published, that block stays hidden.

## 6. Keep a note as a draft

Set `draft: true` in the note's header.

- **Drafts never appear on the published site.** They are left out of the
  production build completely — no list entry, no page, no homepage preview.
- **While previewing locally** (`npm run dev`), drafts *are* shown with a pink
  "Draft — only visible in local preview" label, so you can read them in
  place.
- To publish, change it to `draft: false` (or delete the line) and save.

## 7. Preview changes locally

1. Open the terminal in VS Code (**Terminal → New Terminal**).
2. The first time only, run:
   ```bash
   npm install
   ```
3. Start the preview:
   ```bash
   npm run dev
   ```
4. Open <http://localhost:3000> in your browser. Saved changes appear
   automatically.
5. To stop, click in the terminal and press <kbd>Ctrl</kbd>+<kbd>C</kbd>.

**Before publishing**, check that the production build works (this is also
the version with drafts removed):

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

> Anything inside `public/` can be downloaded by anyone who guesses its
> address, even if no page links to it. Keep only photos the site uses
> there; store backups and originals in `private-originals/` instead.

Then open <http://localhost:3000> again. If `npm run build` prints an error,
read the first red lines — they name the file to fix.

## 8. Publish updates

The site is hosted on **Vercel**, connected to the GitHub repository
`Lalithabarri/portfolio`. The repository is **public** (an intentional
choice), so anyone can read what you commit: never commit passwords, keys,
`.env` files, or the private `private-originals/` folder.

1. Save your changes and run the checks in section 7.
2. In VS Code's **Source Control** panel (the branch icon on the left), type
   a short message such as "Add two travel photos" and click **Commit**.
3. Click **Sync Changes** / **Push** to send the commit to GitHub.
4. Vercel notices the push, runs `npm run build`, and updates the site:
   - pushes to the main branch update the live site;
   - pushes to other branches get their own preview link.
5. Check the deployed page. If the build failed, Vercel's dashboard shows
   the error — usually the same one `npm run build` shows locally.

Drafts (`draft: true`) are never published, because Vercel runs the
production build.

Published notes are added to the site's `sitemap.xml` automatically; drafts
are not.

---

### Where things live

| What | File or folder |
| --- | --- |
| Photos: captions, alt text, collections, homepage picks | `content/photography.ts` |
| Photo image files | `public/images/photography/` |
| Notes | `content/notes/*.md` |
| Note template (private) | `templates/note-template.md` |
| Hero portrait file | `public/images/hero-portrait-denim-tall.jpeg` (earlier portraits are private backups in `private-originals/`, which is not published or committed). To change it, add the new photo under a **new** filename and update `src` in `content/media.ts` — never overwrite an existing image file, or browsers and the image cache may keep showing the old one |
| Hero portrait settings and crop | `content/media.ts` → `portrait` (`src`, `alt`, `crop`) |
| Experience, projects, About text | `content/experience.ts`, `content/projects.ts`, `content/site.ts` |
