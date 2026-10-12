import Image from "next/image";
import { DriedSprig, LavenderSprig } from "@/components/botanicals";
import { WashPanel } from "@/components/watercolor";
import { portrait, portraitCropStyle, portraitSizes } from "@/content/media";

// Layered, taped photo frame for the original portrait. The crop comes from
// content/media.ts so the face stays fully visible at every size. The
// photo itself is never altered — only positioned inside the frame.
export function PortraitFrame({ preload = false, className = "" }: { preload?: boolean; className?: string }) {
  return (
    <div className={`relative isolate mx-auto w-full max-w-[17.5rem] sm:max-w-[20rem] lg:max-w-[22.5rem] ${className}`}>
      {/* Painted wash behind the frame, bleeding off to the right */}
      <WashPanel seed={5} className="decor -right-[22%] -top-[7%] h-[108%] w-[96%] sm:-right-[30%]" />
      <LavenderSprig seed={4} className="decor -right-[16%] bottom-[2%] hidden h-32 w-auto opacity-90 sm:block lg:-right-[24%] lg:h-40" />

      {/* Paper sheets peeking out behind the photo */}
      <div aria-hidden="true" className="absolute inset-0 -rotate-[4deg] rounded-[3px] border border-line bg-cream shadow-paper" />
      <div aria-hidden="true" className="absolute inset-0 rotate-[2.5deg] rounded-[3px] border border-line/80 bg-paper shadow-paper" />

      <figure className="relative rotate-[0.8deg] rounded-[3px] bg-paper p-2.5 pb-8 shadow-photo sm:p-3 sm:pb-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-wash">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            preload={preload}
            sizes={portraitSizes()}
            className="absolute"
            style={portraitCropStyle()}
          />
        </div>
      </figure>

      {/* Tape sits on the corners, never over the face */}
      <span aria-hidden="true" className="tape -right-7 top-2 z-10 rotate-[40deg]" />
      <span aria-hidden="true" className="tape -left-7 top-3 z-10 -rotate-[38deg] opacity-80" />
      {/* Dried flowers tucked against the frame edges, clear of the face */}
      <DriedSprig seed={4} stems={4} className="decor z-10 -bottom-5 -left-11 h-48 w-auto sm:-left-14 sm:h-56 md:-left-8 md:h-52 lg:-left-20 lg:h-72" />
      <DriedSprig seed={23} stems={2} flip className="decor z-10 -right-6 bottom-[14%] hidden h-40 w-auto sm:block lg:-right-10 lg:h-52" />
    </div>
  );
}
