// Loads notes from Markdown files in content/notes/.
//
// Each note is one `.md` file whose name becomes its web address:
//   content/notes/my-first-note.md  →  /notebook/notes/my-first-note
//
// The file starts with a small header ("frontmatter") between two `---`
// lines; see templates/note-template.md and CONTENT_GUIDE.md.
//
// Drafts (`draft: true`) are left out of production builds entirely. While
// running `npm run dev` they are shown with a "Draft" label so you can
// preview them on your own computer.

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type NoteType = "thought" | "note";

export type Note = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  type: NoteType;
  draft: boolean;
  html: string;
  readingMinutes: number;
};

const NOTES_DIR = path.join(process.cwd(), "content", "notes");
const isDev = process.env.NODE_ENV === "development";

type FrontmatterValue = string | boolean | string[];

class NoteError extends Error {
  constructor(file: string, message: string) {
    super(`Problem in content/notes/${file}: ${message}`);
  }
}

const unquote = (value: string) => value.trim().replace(/^(["'])(.*)\1$/, "$2");

/** Reads the `key: value` header between the two `---` lines. */
function parseFrontmatter(raw: string, file: string) {
  const text = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  if (!text.startsWith("---\n")) {
    throw new NoteError(file, "the file must start with a line containing only ---");
  }
  const end = text.indexOf("\n---", 4);
  if (end === -1) throw new NoteError(file, "the header is missing its closing --- line");

  const data: Record<string, FrontmatterValue> = {};
  let listKey: string | null = null;

  for (const line of text.slice(4, end).split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const listItem = line.match(/^\s+-\s+(.*)$/);
    if (listItem && listKey) {
      (data[listKey] as string[]).push(unquote(listItem[1]));
      continue;
    }

    const pair = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (!pair) throw new NoteError(file, `couldn't read the header line "${line}"`);
    const [, key, rawValue] = pair;
    const value = rawValue.trim();
    listKey = null;

    if (value === "") {
      data[key] = [];
      listKey = key;
    } else if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map(unquote)
        .filter(Boolean);
    } else if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else {
      data[key] = unquote(value);
    }
  }

  return { data, body: text.slice(end + 4).replace(/^[^\n]*\n/, "") };
}

function requireText(data: Record<string, FrontmatterValue>, key: string, file: string) {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new NoteError(file, `add a "${key}:" line to the header`);
  }
  return value.trim();
}

function readNote(file: string): Note {
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    throw new NoteError(file, "use only lowercase letters, numbers and dashes in the file name, e.g. my-first-note.md");
  }

  const { data, body } = parseFrontmatter(fs.readFileSync(path.join(NOTES_DIR, file), "utf8"), file);

  const title = requireText(data, "title", file);
  const summary = requireText(data, "summary", file);
  const date = requireText(data, "date", file);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new NoteError(file, `write the date as YYYY-MM-DD, e.g. 2026-10-12 (found "${date}")`);
  }

  const type = data.type ?? "note";
  if (type !== "note" && type !== "thought") {
    throw new NoteError(file, `"type:" must be note or thought (found "${String(type)}")`);
  }

  const draft = data.draft ?? false;
  if (typeof draft !== "boolean") throw new NoteError(file, `"draft:" must be true or false`);

  const tags = data.tags ?? [];
  if (!Array.isArray(tags)) throw new NoteError(file, `write tags as a list, e.g. tags: [systems, testing]`);

  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title,
    date,
    summary,
    tags,
    type,
    draft,
    html: marked.parse(body, { async: false, gfm: true }),
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

/**
 * All notes, newest first. Drafts are included only while running
 * `npm run dev`, and never when `publishedOnly` is set.
 */
export function getNotes({ publishedOnly = false }: { publishedOnly?: boolean } = {}): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_") && file.toLowerCase() !== "readme.md")
    .map(readNote)
    .filter((note) => !note.draft || (isDev && !publishedOnly))
    .sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : b.date.localeCompare(a.date)));
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((note) => note.slug === slug);
}

/** The newest published (non-draft) note, if any exist. */
export function getLatestPublishedNote(): Note | undefined {
  return getNotes({ publishedOnly: true })[0];
}

export function formatNoteDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
