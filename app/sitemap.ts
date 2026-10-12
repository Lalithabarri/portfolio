import type { MetadataRoute } from "next";
import { getNotes } from "@/lib/notes";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

// Public routes only. Drafts and nonexistent notes are never listed:
// getNotes({ publishedOnly: true }) returns published notes only.
// Static pages carry no lastModified date rather than an invented one.
const publicPaths = ["/", "/work", "/about", "/notebook", "/notebook/notes"];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return []; // local or preview build without Lalitha_Barri_WEBSITE_URL

  const pages = publicPaths.map((path) => ({ url: absoluteUrl(path)! }));
  const notes = getNotes({ publishedOnly: true }).map((note) => ({
    url: absoluteUrl(`/notebook/notes/${note.slug}`)!,
    lastModified: note.date,
  }));
  return [...pages, ...notes];
}
