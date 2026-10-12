"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Icon } from "@/components/icons";
import { objectPosition, type Photo } from "@/content/photography";

type Props = {
  photos: Photo[];
  /** Name of the set, used in labels, e.g. "Skylines & bridges". */
  label: string;
  /** Grid classes; columns adapt to the available width. */
  gridClassName?: string;
  /** `sizes` hint for thumbnails so the browser picks a small file. */
  sizes?: string;
};

// Desktop column count that avoids a lonely last row where possible.
// (Full class names are listed so Tailwind can find them.)
function desktopColumns(count: number) {
  if (count <= 3) return "lg:grid-cols-3";
  if (count % 5 === 0) return "lg:grid-cols-5";
  if (count % 3 === 0 && count % 4 !== 0) return "lg:grid-cols-3";
  return "lg:grid-cols-4";
}

// Photo grid with an enlarged viewer.
// Viewer controls: Previous/Next buttons, ← → arrow keys, swipe on touch
// screens, Escape or the Close button to exit. Focus moves into the viewer
// when it opens and back to the matching photo when it closes.
export function PhotoViewer({
  photos,
  label,
  gridClassName,
  sizes = "(min-width: 1024px) 15rem, (min-width: 640px) 30vw, 46vw",
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeStart = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const titleId = useId();
  const current = photos[index];
  const many = photos.length > 1;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
    closeRef.current?.focus();
  };

  const go = (step: number) => setIndex((i) => (i + step + photos.length) % photos.length);

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (!many) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (many && Math.abs(distance) > 50) go(distance < 0 ? 1 : -1);
  };

  if (photos.length === 0) return null;

  return (
    <>
      <ul
        className={`grid gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 ${gridClassName ?? `grid-cols-2 sm:grid-cols-3 ${desktopColumns(photos.length)}`}`}
        aria-label={label}
      >
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <figure className="flex h-full flex-col">
              <button
                ref={(node) => {
                  tileRefs.current[i] = node;
                }}
                type="button"
                onClick={() => open(i)}
                className={`group relative block w-full rounded-[3px] border border-line/70 bg-paper p-1.5 shadow-photo transition-transform duration-200 hover:-translate-y-0.5 sm:p-2 ${
                  i % 3 === 0 ? "-rotate-[0.4deg]" : i % 3 === 1 ? "rotate-[0.35deg]" : ""
                }`}
              >
                {/* Square paper mat. By default the whole photo is shown
                    (portrait or landscape, nothing cropped); a photo with a
                    focalPoint fills the mat instead. */}
                <span className="relative block aspect-square overflow-hidden rounded-[2px] bg-wash-soft">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={sizes}
                    className={photo.focalPoint ? "object-cover" : "object-contain p-1.5 sm:p-2"}
                    style={photo.focalPoint ? { objectPosition: objectPosition(photo) } : undefined}
                  />
                </span>
                <span className="sr-only"> — open larger view</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-3.5 right-3.5 grid size-8 place-items-center rounded-full bg-paper/90 text-navy opacity-0 shadow-paper transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Icon name="expand" className="size-3.5" />
                </span>
              </button>
              {photo.caption && (
                <figcaption className="mt-2.5 px-1 font-serif text-[0.95rem] italic leading-snug text-muted">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="photo-viewer"
        aria-labelledby={titleId}
        onKeyDown={onKeyDown}
        onClose={() => tileRefs.current[index]?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-3 sm:p-6">
          <div className="flex w-full max-w-5xl items-center justify-between gap-3 text-paper">
            <p id={titleId} className="text-sm font-medium" aria-live="polite">
              {label}
              {many && (
                <span className="text-paper/80">
                  {" "}
                  · Photo {index + 1} of {photos.length}
                </span>
              )}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-navy shadow-paper hover:text-action"
            >
              <Icon name="close" className="size-5" />
              <span className="sr-only">Close photo viewer</span>
            </button>
          </div>

          <figure
            className="flex min-h-0 w-full max-w-5xl flex-1 touch-pan-y flex-col items-center justify-center"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipeStart.current = null)}
          >
            {current && (
              <Image
                key={current.id}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 64rem, 94vw"
                className="animate-fade-up h-auto max-h-[calc(100dvh-11rem)] w-auto max-w-full rounded-[3px] border-[6px] border-paper object-contain shadow-photo sm:border-8"
              />
            )}
            <figcaption className="mt-3 min-h-6 max-w-2xl text-center font-serif italic text-paper">
              {current?.caption}
            </figcaption>
          </figure>

          {many && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-semibold text-navy shadow-paper hover:text-action"
              >
                <Icon name="arrowRight" className="size-4 rotate-180" />
                Previous<span className="sr-only"> photo</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-semibold text-navy shadow-paper hover:text-action"
              >
                Next<span className="sr-only"> photo</span>
                <Icon name="arrowRight" className="size-4" />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
