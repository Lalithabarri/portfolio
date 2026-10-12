// Delicate dried-flower decorations, drawn as SVG: thin taupe stems, tiny
// cream flowers, buds, and muted leaves. They are code-drawn
// approximations, not scans of pressed flowers (see BUILD_STATUS.md,
// "Decorative assets"). Purely decorative: hidden from assistive tech.

import type { CSSProperties } from "react";

type Pt = [number, number];

function random(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

const colors = {
  stem: "#8a7764",
  petal: "#f7f0e2",
  petalEdge: "#c4ab88",
  center: "#b38c5c",
  bud: "#dccaa8",
  sage: "#a6b0a1",
  sageEdge: "#7f8b7d",
  greyBlue: "#a9b7c7",
  lavender: "#5c7aa1",
};

function bezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}

function Flower({ at, r, rotate }: { at: Pt; r: number; rotate: number }) {
  return (
    <g transform={`translate(${r1(at[0])} ${r1(at[1])}) rotate(${r1(rotate)})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx={r1(Math.cos((a * Math.PI) / 180) * r * 0.62)}
          cy={r1(Math.sin((a * Math.PI) / 180) * r * 0.62)}
          r={r1(r * 0.56)}
          fill={colors.petal}
          stroke={colors.petalEdge}
          strokeWidth={0.4}
          strokeOpacity={0.8}
        />
      ))}
      <circle r={r1(r * 0.3)} fill={colors.center} />
    </g>
  );
}

function Leaf({ at, angle, length, tone }: { at: Pt; angle: number; length: number; tone: "sage" | "greyBlue" }) {
  const l = length;
  const w = l * 0.2;
  return (
    <path
      transform={`translate(${r1(at[0])} ${r1(at[1])}) rotate(${r1(angle)})`}
      d={`M0 0 C ${r1(l * 0.3)} ${r1(-w)} ${r1(l * 0.75)} ${r1(-w * 0.8)} ${r1(l)} 0 C ${r1(l * 0.75)} ${r1(w * 0.7)} ${r1(l * 0.3)} ${r1(w)} 0 0Z`}
      fill={colors[tone]}
      fillOpacity={0.8}
      stroke={colors.sageEdge}
      strokeOpacity={0.4}
      strokeWidth={0.4}
    />
  );
}

/** Gypsophila-like dried sprig: several fine stems ending in tiny flowers. */
export function DriedSprig({
  seed = 1,
  stems = 3,
  className,
  flip = false,
  style,
}: {
  seed?: number;
  stems?: number;
  className?: string;
  flip?: boolean;
  style?: CSSProperties;
}) {
  const rand = random(seed);
  const base: Pt = [80, 296];
  const lines: string[] = [];
  const flowers: { at: Pt; r: number; rotate: number }[] = [];
  const buds: { at: Pt; angle: number }[] = [];
  const leaves: { at: Pt; angle: number; length: number; tone: "sage" | "greyBlue" }[] = [];

  const cluster = (at: Pt, spread: number) => {
    const count = 2 + Math.floor(rand() * 3);
    for (let k = 0; k < count; k++) {
      const a = (-90 + (k - (count - 1) / 2) * spread + (rand() - 0.5) * 20) * (Math.PI / 180);
      const len = 4 + rand() * 6;
      const end: Pt = [at[0] + Math.cos(a) * len, at[1] + Math.sin(a) * len];
      lines.push(`M${r1(at[0])} ${r1(at[1])} L${r1(end[0])} ${r1(end[1])}`);
      if (rand() < 0.78) flowers.push({ at: end, r: 2.6 + rand() * 1.6, rotate: rand() * 72 });
      else buds.push({ at: end, angle: (a * 180) / Math.PI });
    }
  };

  for (let s = 0; s < stems; s++) {
    const tip: Pt = [80 + (rand() - 0.5) * 96, 16 + rand() * 64];
    const c1: Pt = [80 + (rand() - 0.5) * 18, 220 - rand() * 30];
    const c2: Pt = [tip[0] + (rand() - 0.5) * 36, tip[1] + 70 + rand() * 30];
    lines.push(`M${base[0]} ${base[1]} C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(tip[0])} ${r1(tip[1])}`);
    cluster(tip, 34);

    const branchCount = 3 + Math.floor(rand() * 3);
    for (let b = 0; b < branchCount; b++) {
      const t = 0.38 + (b / branchCount) * 0.52 + rand() * 0.06;
      const p = bezier(base, c1, c2, tip, t);
      const side = b % 2 === 0 ? -1 : 1;
      const angle = (-90 + side * (24 + rand() * 34)) * (Math.PI / 180);
      const len = (14 + rand() * 24) * (1.1 - t * 0.4);
      const end: Pt = [p[0] + Math.cos(angle) * len, p[1] + Math.sin(angle) * len];
      const bend: Pt = [(p[0] + end[0]) / 2 + side * 3, (p[1] + end[1]) / 2 + 2];
      lines.push(`M${r1(p[0])} ${r1(p[1])} Q${r1(bend[0])} ${r1(bend[1])} ${r1(end[0])} ${r1(end[1])}`);
      cluster(end, 30);
    }

    for (let l = 0; l < 3; l++) {
      const t = 0.12 + l * 0.12 + rand() * 0.05;
      const p = bezier(base, c1, c2, tip, t);
      const side = (l + s) % 2 === 0 ? -1 : 1;
      leaves.push({
        at: p,
        angle: -90 + side * (32 + rand() * 22),
        length: 13 + rand() * 9,
        tone: rand() < 0.6 ? "sage" : "greyBlue",
      });
    }
  }

  return (
    <svg
      viewBox="0 0 160 300"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={flip || style ? { ...(flip ? { transform: "scaleX(-1)" } : null), ...style } : undefined}
    >
      {leaves.map((leaf, i) => (
        <Leaf key={`l${i}`} {...leaf} />
      ))}
      <path d={lines.join(" ")} fill="none" stroke={colors.stem} strokeOpacity={0.85} strokeWidth={0.8} strokeLinecap="round" />
      {buds.map((bud, i) => (
        <ellipse
          key={`b${i}`}
          cx={r1(bud.at[0])}
          cy={r1(bud.at[1])}
          rx={1.4}
          ry={2.3}
          transform={`rotate(${r1(bud.angle + 90)} ${r1(bud.at[0])} ${r1(bud.at[1])})`}
          fill={colors.bud}
          stroke={colors.petalEdge}
          strokeWidth={0.35}
        />
      ))}
      {flowers.map((flower, i) => (
        <Flower key={`f${i}`} {...flower} />
      ))}
    </svg>
  );
}

/** Slate-blue lavender silhouettes, for use inside a watercolor wash. */
export function LavenderSprig({ seed = 2, className }: { seed?: number; className?: string }) {
  const rand = random(seed);
  const stems = Array.from({ length: 4 }, (_, i) => {
    const x = 20 + i * 13 + (rand() - 0.5) * 8;
    const top = 18 + rand() * 40;
    const lean = (rand() - 0.5) * 16;
    return { x, top, lean };
  });
  return (
    <svg viewBox="0 0 80 200" className={className} aria-hidden="true" focusable="false">
      <g fill={colors.lavender} fillOpacity={0.55} stroke={colors.lavender} strokeOpacity={0.6} strokeWidth={0.9} strokeLinecap="round">
        {stems.map((s, i) => (
          <g key={i}>
            <path d={`M${r1(s.x)} 198 Q${r1(s.x + s.lean / 2)} 120 ${r1(s.x + s.lean)} ${r1(s.top)}`} fill="none" />
            {Array.from({ length: 7 }, (_, k) => {
              const y = s.top + k * 7;
              const x = s.x + s.lean * (1 - (y - s.top) / (198 - s.top));
              return (
                <g key={k} stroke="none">
                  <ellipse cx={r1(x - 2)} cy={r1(y)} rx={1.8} ry={3.2} transform={`rotate(-22 ${r1(x - 2)} ${r1(y)})`} />
                  <ellipse cx={r1(x + 2)} cy={r1(y + 2)} rx={1.8} ry={3.2} transform={`rotate(22 ${r1(x + 2)} ${r1(y + 2)})`} />
                </g>
              );
            })}
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Small horizontal dried spray for section headings and card corners. */
export function SprigOrnament({ className }: { className?: string }) {
  const stem = "M4 30 C 20 26 36 20 50 10 M26 24 C 36 26 48 26 62 22 M40 16 C 42 10 46 6 50 4";
  const flowers: Pt[] = [
    [50, 10],
    [62, 22],
    [50, 4],
    [55, 7],
    [58, 18],
  ];
  return (
    <svg viewBox="0 0 70 36" className={className} aria-hidden="true" focusable="false">
      <Leaf at={[14, 28]} angle={-160} length={11} tone="sage" />
      <Leaf at={[30, 23]} angle={-60} length={10} tone="greyBlue" />
      <path d={stem} fill="none" stroke={colors.stem} strokeOpacity={0.85} strokeWidth={0.7} strokeLinecap="round" />
      {flowers.map((at, i) => (
        <Flower key={i} at={at} r={2.4 + (i % 2) * 0.6} rotate={i * 23} />
      ))}
    </svg>
  );
}
