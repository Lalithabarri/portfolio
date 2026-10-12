import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SprigOrnament } from "@/components/botanicals";
import { Icon } from "@/components/icons";
import { WatercolorRidge } from "@/components/watercolor";
import { formatNoteDate, getNote, getNotes } from "@/lib/notes";

// With Cache Components enabled, at least one param is required at build
// time. While there are no notes, a placeholder is generated and answered
// with a 404 page.
const NO_NOTES = "no-notes-yet";

export function generateStaticParams() {
  const notes = getNotes();
  return notes.length > 0 ? notes.map((note) => ({ slug: note.slug })) : [{ slug: NO_NOTES }];
}

export async function generateMetadata({ params }: PageProps<"/notebook/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Note not found" };
  return {
    title: note.title,
    description: note.summary,
    ...(note.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function NotePage({ params }: PageProps<"/notebook/notes/[slug]">) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <article className="pb-section">
      <header className="relative isolate pb-14 sm:pb-20">
        <div className="site-container relative z-10 max-w-3xl pt-8 sm:pt-12">
          <Link href="/notebook/notes" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted hover:text-action">
            <Icon name="arrowRight" className="size-4 rotate-180" />
            All notes
          </Link>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{note.type === "thought" ? "Short thought" : `${note.readingMinutes} min read`}</span>
            {note.draft && (
              <span className="rounded-full bg-petal px-2.5 py-0.5 text-xs font-semibold text-navy">Draft — only visible in local preview</span>
            )}
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2.1rem,5vw,3.2rem)] font-semibold leading-[1.08] tracking-tight text-navy">
            {note.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{note.summary}</p>
          {note.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
              {note.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <WatercolorRidge variant="section" seed={27} className="decor inset-x-0 bottom-0 h-14 w-full sm:h-20" />
      </header>

      <div className="site-container max-w-3xl">
        <div className="note-prose" dangerouslySetInnerHTML={{ __html: note.html }} />
        <div className="mt-14 flex items-center gap-3 border-t border-line pt-6">
          <SprigOrnament className="h-7 w-14" />
          <Link href="/notebook/notes" className="text-link text-sm">
            Back to all notes
          </Link>
        </div>
      </div>
    </article>
  );
}
