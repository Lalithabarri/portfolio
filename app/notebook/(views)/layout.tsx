import { NotebookSwitcher } from "@/components/notebook-switcher";
import { PageIntro } from "@/components/page-intro";
import { getCollections } from "@/content/photography";
import { getNotes } from "@/lib/notes";

// Shared top of the two Notebook views: Photography and Notes.
export default function NotebookViewsLayout({ children }: LayoutProps<"/notebook">) {
  const photoCount = getCollections().reduce((sum, c) => sum + c.photos.length, 0);
  const noteCount = getNotes().length;

  return (
    <>
      <PageIntro eyebrow="Notebook & gallery" title="Beyond the editor.">
        <p>A place for things I build, notice, and learn.</p>
      </PageIntro>
      <div className="site-container pb-section">
        <NotebookSwitcher photoCount={photoCount} noteCount={noteCount} />
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </>
  );
}
