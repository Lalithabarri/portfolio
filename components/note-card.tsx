import Link from "next/link";
import { Icon } from "@/components/icons";
import { formatNoteDate, type Note } from "@/lib/notes";

// One entry in a list of notes. Short thoughts show their full text;
// longer notes show the summary and link to their own page.
export function NoteCard({ note, headingLevel = "h2" }: { note: Note; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const href = `/notebook/notes/${note.slug}`;
  return (
    <article className="paper-card p-6 sm:p-7">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{note.type === "thought" ? "Short thought" : `Engineering note · ${note.readingMinutes} min read`}</span>
        {note.draft && (
          <span className="rounded-full bg-petal px-2.5 py-0.5 text-xs font-semibold text-navy">Draft — only visible in local preview</span>
        )}
      </p>
      <Heading className="mt-2 font-serif text-2xl font-medium leading-snug text-navy">
        <Link href={href} className="hover:text-action">
          {note.title}
        </Link>
      </Heading>
      {note.type === "thought" ? (
        <div className="note-prose mt-3 !text-base" dangerouslySetInnerHTML={{ __html: note.html }} />
      ) : (
        <p className="mt-2 leading-relaxed text-muted">{note.summary}</p>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {note.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {note.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        ) : (
          <span />
        )}
        {note.type === "note" && (
          <Link href={href} className="text-link inline-flex items-center gap-1.5 text-sm">
            Read note<span className="sr-only">: {note.title}</span>
            <Icon name="arrowRight" className="size-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
