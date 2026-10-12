// Publication from the approved résumé. The résumé links the paper at
// https://ieeexplore.ieee.org/document/10134804 — set `href` to that URL
// if you decide to show a "Read publication" link (pending decision).

export type Publication = {
  title: string;
  venue: string;
  year: number;
  href?: string;
};

export const publications: Publication[] = [
  {
    title: "Bird Species Recognition using Deep Learning",
    venue: "IEEE AISP",
    year: 2023,
  },
];
