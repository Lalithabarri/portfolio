// =====================================================================
//  PHOTOGRAPHY — the one file that controls every photo in the Notebook
//  and the homepage preview. Step-by-step instructions: CONTENT_GUIDE.md.
// =====================================================================
//
// How it works
// ------------
// • Image files live in public/images/photography/.
// • Photos are grouped into collections. Each collection is its own
//   section on /notebook, shown in `order` (lowest number first).
// • Under every photo the site shows ONE line of text: its `caption`.
//
// Photo fields
// ------------
//   id                short unique name, lowercase-with-dashes
//   label             private name so you can recognise the photo in this
//                     file. Never shown on the site.
//   src               path to the file, starting with /images/photography/
//   width, height     pixel size as the photo is displayed (after rotation)
//   alt               plain description of what is in the photo, for
//                     screen-reader users. Separate from the caption.
//   caption           the visible caption, shown under the photo
//   order             position inside its collection (1 = first)
//   homepagePosition  optional: 1, 2, 3 or 4 = show in the homepage preview
//                     in that position. Leave it out for Notebook only.
//   focalPoint        optional { x, y } in percent. By default thumbnails
//                     show the whole photo inside a square paper mat. Add a
//                     focal point only if you'd rather the thumbnail fill
//                     the mat, cropped around that point.
//
// Collection fields
// -----------------
//   id, title, optional description, order, photos

export type FocalPoint = { x: number; y: number };

export type Photo = {
  id: string;
  label: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  order: number;
  homepagePosition?: 1 | 2 | 3 | 4;
  focalPoint?: FocalPoint;
};

export type PhotoCollection = {
  id: string;
  title: string;
  description?: string;
  order: number;
  photos: Photo[];
};

const collections: PhotoCollection[] = [
  {
    id: "light-and-little-pauses",
    title: "Light & little pauses",
    order: 1,
    photos: [
      {
        id: "snowy-streets",
        label: "Snowy streets",
        src: "/images/photography/snowy-trees.jpeg",
        width: 900,
        height: 1600,
        alt: "Tall trees heavy with fresh snow above a row of snow-covered cars, with two people walking past.",
        caption: "Even an ordinary street gets a little main-character moment in the snow.",
        order: 1,
        homepagePosition: 1,
      },
      {
        id: "night-skyline-bridge",
        label: "Night skyline with illuminated bridge",
        src: "/images/photography/city-skyline-evening.jpeg",
        width: 1280,
        height: 720,
        alt: "A lit-up suspension bridge and city skyline across the water at dusk.",
        caption: "You’d think I’d be used to this skyline by now. Not even close.",
        order: 2,
        homepagePosition: 4,
      },
      {
        id: "sunset-water-bridges",
        label: "Sunset over water and bridges",
        src: "/images/photography/sunset-bridges.jpeg",
        width: 1280,
        height: 720,
        alt: "Rays of light fanning across the sky at sunset over calm water, with the silhouettes of long bridges.",
        caption: "Yes, another sunset photo. No, I’m not taking questions.",
        order: 3,
      },
    ],
  },
  {
    id: "places-and-people",
    title: "Places & people",
    order: 2,
    photos: [
      {
        id: "dumbo-bridge",
        label: "DUMBO bridge between brick buildings",
        src: "/images/photography/dumbo-captures.jpeg",
        width: 801,
        height: 1280,
        alt: "A steel suspension-bridge tower framed between two red-brick buildings under a blue sky.",
        caption: "A much-photographed corner. My turn to stop and stare.",
        order: 1,
      },
      {
        id: "first-nyc-visit",
        label: "First NYC visit — daytime waterfront skyline",
        src: "/images/photography/first-time-in-nyc.jpeg",
        width: 1280,
        height: 960,
        alt: "Tall glass skyscrapers rising behind the waterfront on a cloudy day, with a ferry passing.",
        caption: "My first New York hello involved a lot of looking up.",
        order: 2,
      },
      {
        id: "indian-architecture",
        label: "Indian architecture",
        src: "/images/photography/indian-architecture.jpg",
        width: 2754,
        height: 3899,
        alt: "An ornate stone building with domes and pointed towers against a blue sky with clouds.",
        caption: "I came for the view. Then noticed about a hundred little details.",
        order: 3,
      },
      {
        id: "temple-tower",
        label: "Colourful temple tower",
        src: "/images/photography/temple-tower.jpg",
        width: 3000,
        height: 4000,
        alt: "A temple tower covered in brightly painted sculpted figures, seen from below.",
        caption: "Every time I look up, there’s another detail I missed.",
        order: 4,
      },
      {
        id: "older-man-blue-shirt",
        label: "Portrait of an older man in a blue shirt",
        src: "/images/photography/old-man.jpg",
        width: 3000,
        height: 4000,
        alt: "An older man with grey hair in a light blue shirt, sitting outdoors and looking down.",
        caption: "A passing moment, worth a second look.",
        order: 5,
      },
    ],
  },
  {
    id: "pages-from-my-life",
    title: "Pages from my life",
    order: 3,
    photos: [
      {
        id: "lost-in-thoughts",
        label: "Lost in thoughts",
        src: "/images/photography/lost-in-thoughts.jpeg",
        width: 1440,
        height: 1440,
        alt: "A person in a floral top, seen from behind, looking across the water toward a city skyline.",
        caption: "A busy skyline. A little room to think.",
        order: 1,
        homepagePosition: 2,
      },
      {
        id: "grad-moments",
        label: "Grad moments — seated, photographed from above",
        src: "/images/photography/grad-moments.jpeg",
        width: 1200,
        height: 1600,
        alt: "Seen from above, a graduate in a red gown, cap, and white stole sitting on grass covered in red and white confetti.",
        caption: "A whole chapter, somehow folded into one red cap.",
        order: 2,
        homepagePosition: 3,
      },
      {
        id: "travel-waterfalls",
        label: "Travel portrait beside the waterfalls",
        src: "/images/photography/love-to-travel.jpeg",
        width: 1280,
        height: 1206,
        alt: "Lalitha in sunglasses making a heart shape with her hands at a railing above large waterfalls.",
        caption: "Some places make it very easy to put your phone away. After one photo.",
        order: 3,
      },
      {
        id: "graduation-confetti",
        label: "Graduation — standing beneath falling confetti",
        src: "/images/photography/commencement-confetti.jpeg",
        width: 3120,
        height: 4160,
        alt: "Lalitha smiling in a red graduation gown and cap as red and white confetti falls around her in a stadium.",
        caption: "The confetti had its moment. I’m ready for what’s next.",
        order: 4,
      },
    ],
  },
];

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

/** Collections in display order, each with its photos sorted. */
export function getCollections(): PhotoCollection[] {
  return [...collections]
    .sort(byOrder)
    .map((collection) => ({ ...collection, photos: [...collection.photos].sort(byOrder) }));
}

/** Photos with a `homepagePosition`, in that order (1 → 4). */
export function getHomepagePhotos(): Photo[] {
  return collections
    .flatMap((c) => c.photos)
    .filter((p) => p.homepagePosition !== undefined)
    .sort((a, b) => (a.homepagePosition ?? 0) - (b.homepagePosition ?? 0));
}

/** CSS object-position for a photo that has a focal point. */
export function objectPosition(photo: Photo): string {
  const { x, y } = photo.focalPoint ?? { x: 50, y: 50 };
  return `${x}% ${y}%`;
}
