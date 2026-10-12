// Publication from the approved résumé. The paper URL, DOI, and author list
// are still pending; add `href` only once the exact link is confirmed.

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
