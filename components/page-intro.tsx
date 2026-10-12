import Link from "next/link";
import type { ReactNode } from "react";
import { DriedSprig } from "@/components/botanicals";
import { Icon } from "@/components/icons";
import { WashBloom, WatercolorRidge } from "@/components/watercolor";

// Shared opening for inner pages, with a way back to the homepage.
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="relative isolate pb-16 sm:pb-24">
      <WashBloom seed={14} className="decor -right-24 -top-28 hidden w-[28rem] opacity-80 md:block" />
      <DriedSprig seed={8} className="decor bottom-8 right-[6%] hidden h-56 w-auto lg:block" />
      <div className="site-container relative z-10 pt-8 sm:pt-12">
        <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted hover:text-action">
          <Icon name="arrowRight" className="size-4 rotate-180" />
          Back to home
        </Link>
        <p className="eyebrow mt-6">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-tight text-navy">
          {title}
        </h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted lg:max-w-xl xl:max-w-2xl">{children}</div>}
      </div>
      <WatercolorRidge variant="section" seed={21} className="decor inset-x-0 bottom-0 h-16 w-full sm:h-24" />
    </div>
  );
}
