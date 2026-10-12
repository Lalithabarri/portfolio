// Procedural watercolor washes, drawn as SVG.
//
// These are code-drawn approximations of painted washes: irregular ridges
// with displaced edges, pigment pooling along the top edge, and a paper
// granulation texture. They are not scans of real watercolor. To use
// painted artwork instead, see "Decorative assets" in BUILD_STATUS.md.
//
// Everything here is decorative and hidden from assistive technology.

import type { CSSProperties } from "react";

/** Small deterministic random generator so server output is stable. */
function random(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;

/** An irregular, hilly top edge closed down to the bottom of the box. */
function ridgePath(opts: {
  width: number;
  height: number;
  base: number;
  amplitude: number;
  step: number;
  seed: number;
}) {
  const { width, height, base, amplitude, step, seed } = opts;
  const rand = random(seed);
  const phase = rand() * Math.PI * 2;
  const points: [number, number][] = [];
  for (let x = -40; x <= width + 40; x += step * (0.6 + rand() * 0.8)) {
    // Broad hills + medium undulation + small jagged noise.
    const broad = Math.sin(x / (width / 2.3) + phase) * 0.55;
    const medium = Math.sin(x / (width / 7.5) + phase * 1.7) * 0.3;
    const jitter = (rand() - 0.5) * 0.5;
    points.push([x, base - amplitude * (broad + medium + jitter)]);
  }
  let d = `M${round(points[0][0])} ${height + 10} L${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    d += ` Q${round(x)} ${round(y)} ${round((x + nx) / 2)} ${round((y + ny) / 2)}`;
  }
  const last = points[points.length - 1];
  d += ` L${round(last[0])} ${round(last[1])} L${round(last[0])} ${height + 10} Z`;
  return d;
}

const tones = {
  pale: "#c9d8e8",
  mist: "#dbe6f1",
  dusty: "#9db4cf",
  slate: "#6f8db3",
  deep: "#4f6f98",
} as const;

type Tone = keyof typeof tones;

/** Shared SVG filter: displaced edges + granulated pigment. */
function WatercolorFilter({ id, seed, edge = 16 }: { id: string; seed: number; edge?: number }) {
  return (
    <filter id={id} x="-5%" y="-25%" width="110%" height="150%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.011 0.045" numOctaves={3} seed={seed} result="warp" />
      <feDisplacementMap in="SourceGraphic" in2="warp" scale={edge} xChannelSelector="R" yChannelSelector="G" result="edges" />
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves={2} seed={seed + 7} result="grain" />
      <feColorMatrix
        in="grain"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.15"
        result="grainAlpha"
      />
      <feComposite in="edges" in2="grainAlpha" operator="in" result="granulated" />
      <feGaussianBlur in="granulated" stdDeviation="0.7" />
    </filter>
  );
}

type Layer = { tone: Tone; opacity: number; base: number; amplitude: number; step: number };

const presets: Record<"hero" | "footer" | "section" | "card", { height: number; layers: Layer[] }> = {
  hero: {
    height: 220,
    layers: [
      { tone: "mist", opacity: 0.9, base: 70, amplitude: 52, step: 70 },
      { tone: "pale", opacity: 0.85, base: 100, amplitude: 44, step: 52 },
      { tone: "dusty", opacity: 0.55, base: 132, amplitude: 34, step: 40 },
      { tone: "slate", opacity: 0.42, base: 160, amplitude: 22, step: 34 },
      { tone: "mist", opacity: 0.95, base: 194, amplitude: 9, step: 60 },
    ],
  },
  footer: {
    height: 200,
    layers: [
      { tone: "mist", opacity: 0.9, base: 60, amplitude: 44, step: 64 },
      { tone: "pale", opacity: 0.85, base: 88, amplitude: 38, step: 48 },
      { tone: "dusty", opacity: 0.62, base: 114, amplitude: 30, step: 38 },
      { tone: "slate", opacity: 0.5, base: 138, amplitude: 22, step: 32 },
      { tone: "deep", opacity: 0.3, base: 152, amplitude: 14, step: 28 },
      { tone: "mist", opacity: 1, base: 172, amplitude: 9, step: 56 },
    ],
  },
  section: {
    height: 120,
    layers: [
      { tone: "mist", opacity: 0.85, base: 54, amplitude: 30, step: 60 },
      { tone: "pale", opacity: 0.7, base: 78, amplitude: 24, step: 44 },
      { tone: "dusty", opacity: 0.38, base: 100, amplitude: 14, step: 36 },
    ],
  },
  card: {
    height: 120,
    layers: [
      { tone: "mist", opacity: 0.9, base: 56, amplitude: 34, step: 48 },
      { tone: "pale", opacity: 0.8, base: 80, amplitude: 26, step: 38 },
      { tone: "dusty", opacity: 0.45, base: 100, amplitude: 16, step: 30 },
    ],
  },
};

/**
 * Layered watercolor ridges. `fade` softens the bottom into the paper so
 * the next section starts on clean ivory; `flip` turns it upside down.
 */
export function WatercolorRidge({
  variant,
  seed = 3,
  width = 1440,
  fade = true,
  flip = false,
  baseColor,
  className,
  style,
}: {
  variant: keyof typeof presets;
  /** Solid colour under the last ridge, so a solid band can continue below. */
  baseColor?: string;
  seed?: number;
  width?: number;
  fade?: boolean;
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const { height, layers } = presets[variant];
  const id = `wc-${variant}-${seed}`;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ ...(flip ? { transform: "scaleY(-1)" } : null), ...style }}
    >
      <defs>
        <WatercolorFilter id={`${id}-f`} seed={seed} />
        {fade && (
          <>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset="0.72" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={`${id}-m`}>
              <rect width={width} height={height} fill={`url(#${id}-g)`} />
            </mask>
          </>
        )}
      </defs>
      <g filter={`url(#${id}-f)`} mask={fade ? `url(#${id}-m)` : undefined}>
        {layers.map((layer, i) => {
          const d = ridgePath({ width, height, base: layer.base, amplitude: layer.amplitude, step: layer.step, seed: seed * 31 + i * 7 });
          return (
            <g key={i}>
              <path d={d} fill={tones[layer.tone]} fillOpacity={layer.opacity} />
              {/* pigment pooling along the wet edge */}
              <path d={d} fill="none" stroke={tones[layer.tone === "mist" ? "pale" : layer.tone === "pale" ? "dusty" : "slate"]} strokeOpacity={0.35} strokeWidth={2.2} />
            </g>
          );
        })}
      </g>
      {baseColor && <rect x={0} y={layers[layers.length - 1].base + 6} width={width} height={height} fill={baseColor} />}
    </svg>
  );
}

/**
 * A soft painted panel with torn, uneven edges — used behind the portrait
 * and in decorative corners.
 */
export function WashPanel({ seed = 5, className, style }: { seed?: number; className?: string; style?: CSSProperties }) {
  const id = `wash-panel-${seed}`;
  const rand = random(seed);
  // Rough rectangle with wobbly sides.
  const pts: [number, number][] = [];
  const wobble = () => (rand() - 0.5) * 10;
  for (let x = 14; x < 386; x += 34) pts.push([x, 14 + wobble()]);
  for (let y = 14; y < 486; y += 34) pts.push([386 + wobble(), y]);
  for (let x = 386; x > 14; x -= 34) pts.push([x, 486 + wobble()]);
  for (let y = 486; y > 14; y -= 34) pts.push([14 + wobble(), y]);
  // Smooth the outline with curves through the midpoints.
  const mid = (i: number) => {
    const [x1, y1] = pts[i % pts.length];
    const [x2, y2] = pts[(i + 1) % pts.length];
    return `${round((x1 + x2) / 2)} ${round((y1 + y2) / 2)}`;
  };
  let d = `M${mid(0)}`;
  for (let i = 1; i <= pts.length; i++) d += ` Q${round(pts[i % pts.length][0])} ${round(pts[i % pts.length][1])} ${mid(i)}`;
  d += " Z";
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true" focusable="false" className={className} style={style}>
      <defs>
        <WatercolorFilter id={`${id}-f`} seed={seed} edge={22} />
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={tones.pale} stopOpacity="0.85" />
          <stop offset="0.55" stopColor={tones.dusty} stopOpacity="0.55" />
          <stop offset="1" stopColor={tones.slate} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g filter={`url(#${id}-f)`}>
        <path d={d} fill={`url(#${id}-g)`} />
        <path d={d} fill="none" stroke={tones.slate} strokeOpacity={0.3} strokeWidth={3} />
      </g>
    </svg>
  );
}

/** A loose round bloom of pale pigment for section edges and corners. */
export function WashBloom({ seed = 9, className, style }: { seed?: number; className?: string; style?: CSSProperties }) {
  const id = `wash-bloom-${seed}`;
  const rand = random(seed);
  const blobs = Array.from({ length: 5 }, () => ({
    cx: 150 + (rand() - 0.5) * 120,
    cy: 150 + (rand() - 0.5) * 120,
    rx: 60 + rand() * 60,
    ry: 45 + rand() * 50,
    tone: (["pale", "pale", "dusty", "mist", "dusty"] as Tone[])[Math.floor(rand() * 5)],
  }));
  return (
    <svg viewBox="0 0 300 300" aria-hidden="true" focusable="false" className={className} style={style}>
      <defs>
        <WatercolorFilter id={`${id}-f`} seed={seed} edge={28} />
      </defs>
      <g filter={`url(#${id}-f)`}>
        {blobs.map((b, i) => (
          <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={tones[b.tone]} fillOpacity={b.tone === "dusty" ? 0.32 : 0.5} />
        ))}
      </g>
    </svg>
  );
}
