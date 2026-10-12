import type { Metadata } from "next";
import { SprigOrnament } from "@/components/botanicals";
import { PhotoViewer } from "@/components/photo-viewer";
import { getCollections } from "@/content/photography";

export const metadata: Metadata = {
  title: "Notebook · Photography",
  description: "Photographs by Lalitha Barri, grouped into small collections.",
};

export default function PhotographyPage() {
  const collections = getCollections();

  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      {collections.map((collection) => (
        <section key={collection.id} aria-labelledby={`${collection.id}-heading`}>
          <header className="mb-6 flex flex-wrap items-end gap-x-4 gap-y-2 sm:mb-8">
            <h2 id={`${collection.id}-heading`} className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-tight text-navy">
              {collection.title}
            </h2>
            <SprigOrnament className="mb-1 h-6 w-12" />
            <p className="mb-1 text-sm text-muted">
              {collection.photos.length} {collection.photos.length === 1 ? "photo" : "photos"}
            </p>
            {collection.description && <p className="basis-full max-w-2xl leading-relaxed text-muted">{collection.description}</p>}
          </header>
          <PhotoViewer photos={collection.photos} label={collection.title} />
        </section>
      ))}
    </div>
  );
}
