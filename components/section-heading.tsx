import type { ReactNode } from "react";
import { SprigOrnament } from "@/components/botanicals";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  as?: "h1" | "h2";
  aside?: ReactNode;
};

// Serif heading with a fine rule and a tiny dried spray, journal-style.
export function SectionHeading({ id, eyebrow, title, as: Tag = "h2", aside }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:gap-6">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <Tag
          id={id}
          className="font-serif text-[clamp(1.85rem,4vw,2.6rem)] font-medium leading-[1.1] tracking-tight text-navy"
        >
          {title}
        </Tag>
      </div>
      <div aria-hidden="true" className="hidden flex-1 items-center gap-2 pb-3 sm:flex">
        <span className="h-px flex-1 bg-gradient-to-r from-slate/50 via-periwinkle to-line/30" />
        <SprigOrnament className="h-7 w-14 shrink-0" />
      </div>
      {aside && <div className="shrink-0 sm:pb-2">{aside}</div>}
    </div>
  );
}
