import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-url";
import { Icon } from "@/components/icons";
import { NoteCard } from "@/components/note-card";
import { getNotes } from "@/lib/notes";

export const metadata: Metadata = pageMetadata({
  path: "/notebook/notes",
  title: "Notebook · Notes",
  socialTitle: "Notebook · Notes · Lalitha Barri",
  description: "Engineering notes and short thoughts by Lalitha Barri.",
});

export default function NotesPage() {
  const notes = getNotes();

  if (notes.length === 0) {
    return (
      <section aria-labelledby="notes-empty-heading" className="max-w-2xl rounded-2xl border border-dashed border-periwinkle bg-wash-soft/60 p-6 sm:p-8">
        <h2 id="notes-empty-heading" className="flex items-center gap-2 font-serif text-2xl font-medium text-navy">
          <Icon name="pen" className="size-5 text-action" />
          No notes published yet
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          Engineering notes and short thoughts will appear here as I write them.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Notes, newest first">
      <ol className="flex max-w-3xl flex-col gap-5">
        {notes.map((note) => (
          <li key={note.slug}>
            <NoteCard note={note} />
          </li>
        ))}
      </ol>
    </section>
  );
}
