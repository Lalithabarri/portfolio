// Hero portrait. Original photographs supplied by Lalitha — never replace
// them with stock or generated images, and never retouch them. The photo is
// only positioned inside the frame (see `crop`); the file is not changed.
// Gallery photos live in content/photography.ts.

export type CropBox = {
  // The part of the original photo shown in the 4:5 hero frame, as
  // fractions of the photo's width/height (0 = left/top edge, 1 = right/
  // bottom edge). Only `left`, `top` and `width` are needed: the height
  // follows from the frame's 4:5 shape.
  left: number;
  top: number;
  width: number;
};

type Portrait = {
  src: string;
  width: number;
  height: number;
  alt: string;
  crop: CropBox;
  frameAspect: number;
};

// ── The portrait shown on the homepage ────────────────────────────────────
export const portrait: Portrait = {
  // A new filename (not an overwrite) so no cached copy of an older photo
  // can be served at this URL. If you replace the hero photo, give the new
  // file a new name too.
  src: "/images/hero-portrait-denim-tall.jpeg",
  width: 3000,
  height: 4000,
  alt: "Lalitha Barri smiling, standing against a plain light wall in a white T-shirt and a blue denim pinafore dress.",
  // Head-and-upper-torso crop. The original is a tall photo with a lot of
  // empty wall above: the top of the hair is ~37% down, the face is centred
  // ~52% across and ~43% down, the arms span ~36–70% across and the waist
  // is ~65% down. This box (38% of the photo's width) starts 33% across and
  // 33.9% down: the whole head with ~8% headroom, ending just below the
  // waist, face centred.
  crop: { left: 0.33, top: 0.339, width: 0.38 },
  frameAspect: 4 / 5,
};

// ── Previous portraits — private backups, not on the website ─────────────
// These originals live in `private-originals/` at the project root, which
// is NOT inside public/ (so nobody can download them from the site) and is
// excluded from Git. To use one again: copy it into public/images/ under a
// NEW filename, then put its values into `portrait` above.
//
//   private-originals/portrait-blue-landscape.jpeg  3021×2762
//     crop: { left: 0.6, top: 0.285, width: 0.34 }
//   private-originals/portrait-original.jpg         1536×2048 (brick wall)
//     crop: { left: 0.292, top: 0.215, width: 0.43 }

/** Inline styles that place the photo so only the crop box shows. */
export function portraitCropStyle(photo: Portrait = portrait) {
  const { crop, width, height, frameAspect } = photo;
  const imageAspect = width / height;
  // Rendered image width relative to the frame, and its height relative to
  // the frame height.
  const scaledWidth = 1 / crop.width;
  const scaledHeight = (scaledWidth / imageAspect) * frameAspect;
  return {
    width: `${scaledWidth * 100}%`,
    maxWidth: "none",
    height: "auto",
    left: `${(-crop.left / crop.width) * 100}%`,
    top: `${-crop.top * scaledHeight * 100}%`,
  } as const;
}

/**
 * `sizes` hint for the hero image. The photo is drawn 1/crop.width times
 * wider than the frame, so the browser needs a correspondingly larger file
 * to stay sharp. Frame widths match components/portrait-frame.tsx.
 */
export function portraitSizes(photo: Portrait = portrait) {
  const scale = 1 / photo.crop.width;
  return `(min-width: 1024px) ${Math.round(22.5 * scale)}rem, (min-width: 640px) ${Math.round(20 * scale)}rem, ${Math.round(75 * scale)}vw`;
}
