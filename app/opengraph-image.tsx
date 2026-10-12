// Social-sharing image (1200×630), generated at build time.
// Next.js turns this file into the og:image for every page (and
// twitter-image.tsx re-uses it). Text: name and role only — no portrait,
// contact details or URL.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DriedSprig } from "@/components/botanicals";
import { WatercolorRidge } from "@/components/watercolor";
import { profile } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static WOFF copies of the site's two typefaces (SIL Open Font License,
// see assets/fonts/). The image renderer can't read WOFF2.
const fraunces = await readFile(join(process.cwd(), "assets/fonts/fraunces-latin-600-normal.woff"));
const dmSans = await readFile(join(process.cwd(), "assets/fonts/dm-sans-latin-600-normal.woff"));

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#faf9f5",
          backgroundImage:
            "radial-gradient(circle at 8% 10%, rgba(185, 201, 224, 0.55), rgba(250, 249, 245, 0) 45%)",
        }}
      >
        {/* Slight overhang on both sides: the watercolor edge filter pulls the
            shape inward a little, which would otherwise leave a bare corner. */}
        <div style={{ position: "absolute", left: -40, bottom: 0, display: "flex" }}>
          <WatercolorRidge variant="hero" seed={3} fade={false} width={1280} style={{ width: 1280, height: 170 }} />
        </div>
        <div style={{ position: "absolute", right: 120, top: 70, display: "flex" }}>
          <DriedSprig seed={4} stems={4} style={{ width: 205, height: 384 }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 104,
            paddingBottom: 96,
            height: "100%",
          }}
        >
          <div style={{ display: "flex", width: 64, height: 3, backgroundColor: "#285f91", marginBottom: 40 }} />
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: 112,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#18364d",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontFamily: "DM Sans",
              fontSize: 30,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#285f91",
            }}
          >
            {profile.role}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 600 },
        { name: "DM Sans", data: dmSans, style: "normal", weight: 600 },
      ],
    },
  );
}
