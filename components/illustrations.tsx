// Simple engineering sketches for each project. Decorative only — the text
// next to each one carries the actual explanation.

import type { ReactNode } from "react";
import type { LegacyBankStepId, Project } from "@/content/projects";

const ink = { stroke: "var(--color-navy)", strokeOpacity: 0.72, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const label = { fontSize: 10, fontFamily: "var(--font-sans)", fill: "var(--color-muted)" } as const;

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 260 170" className={`h-auto w-full ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <marker id="ill-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M1 1 9 5 1 9" fill="none" stroke="var(--color-navy)" strokeOpacity="0.72" strokeWidth="1.6" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

export function QuorumIllustration({ className }: { className?: string }) {
  const followers = [
    { x: 186, y: 68 },
    { x: 96, y: 134 },
    { x: 74, y: 68 },
  ];
  return (
    <Frame className={className}>
      {followers.map((f) => (
        <line key={`${f.x}-${f.y}`} x1={130} y1={30} x2={f.x} y2={f.y} {...ink} strokeDasharray="4 4" markerEnd="url(#ill-arrow)" />
      ))}
      <line x1={130} y1={30} x2={162} y2={130} {...ink} strokeOpacity={0.3} strokeDasharray="2 5" />
      {/* leader + log */}
      <circle cx={130} cy={28} r={16} fill="var(--color-action)" stroke="var(--color-navy)" strokeWidth={1.5} />
      <path d="m130 19 2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" fill="var(--color-paper)" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={154 + i * 11} y={18} width={9} height={14} rx={2} fill={i < 3 ? "var(--color-wash)" : "var(--color-paper)"} {...ink} strokeWidth={1} />
      ))}
      <text x={154} y={46} {...label}>log</text>
      {followers.map((f) => (
        <circle key={`n-${f.x}`} cx={f.x} cy={f.y} r={13} fill="var(--color-wash)" {...ink} />
      ))}
      {/* restarting node with recovery arrow */}
      <circle cx={164} cy={134} r={13} fill="var(--color-paper)" {...ink} strokeOpacity={0.45} strokeDasharray="3 3" />
      <path d="M184 128a22 22 0 0 1-6 22" fill="none" {...ink} markerEnd="url(#ill-arrow)" />
      <text x={190} y={142} {...label}>restart</text>
      <text x={100} y={12} {...label}>leader</text>
    </Frame>
  );
}

export function StreamlineIllustration({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      <rect x={10} y={58} width={44} height={32} rx={6} fill="var(--color-paper)" {...ink} />
      <text x={22} y={78} {...label} fill="var(--color-navy)">API</text>
      <line x1={56} y1={74} x2={74} y2={74} {...ink} markerEnd="url(#ill-arrow)" />
      <text x={52} y={52} {...label}>×2</text>
      {/* queue */}
      <rect x={78} y={58} width={66} height={32} rx={5} fill="var(--color-wash)" {...ink} />
      {[94, 110, 126].map((x) => (
        <line key={x} x1={x} y1={60} x2={x} y2={88} {...ink} strokeWidth={1} />
      ))}
      <text x={92} y={50} {...label}>queue</text>
      <line x1={146} y1={74} x2={160} y2={74} {...ink} markerEnd="url(#ill-arrow)" />
      {/* worker */}
      <circle cx={180} cy={74} r={17} fill="var(--color-paper)" {...ink} />
      <text x={175} y={79} fontSize={14} fontFamily="var(--font-serif)" fill="var(--color-navy)">λ</text>
      <line x1={198} y1={74} x2={210} y2={74} {...ink} markerEnd="url(#ill-arrow)" />
      {/* table with conditional write check */}
      <path d="M214 60v28c0 4 8 7 18 7s18-3 18-7V60" fill="var(--color-wash)" {...ink} />
      <ellipse cx={232} cy={60} rx={18} ry={7} fill="var(--color-paper)" {...ink} />
      <path d="m225 78 5 5 9-10" fill="none" stroke="var(--color-action)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* bounded retries → dead-letter queue */}
      <path d="M111 92v26" {...ink} strokeDasharray="3 3" markerEnd="url(#ill-arrow)" />
      <rect x={88} y={122} width={46} height={26} rx={5} fill="var(--color-paper)" {...ink} />
      <text x={99} y={139} {...label} fill="var(--color-navy)">DLQ</text>
      <path d="M180 93c0 30-30 42-46 42" fill="none" {...ink} strokeOpacity={0.4} strokeDasharray="2 4" />
    </Frame>
  );
}

export function WaypointIllustration({ className }: { className?: string }) {
  const pin = (x: number, y: number, key: string) => (
    <g key={key} transform={`translate(${x} ${y})`}>
      <path d="M0 0c-7-8-11-13-11-19a11 11 0 0 1 22 0c0 6-4 11-11 19z" fill="var(--color-wash)" {...ink} />
      <circle cx={0} cy={-19} r={3.5} fill="var(--color-action)" />
    </g>
  );
  return (
    <Frame className={className}>
      <path d="M36 140C70 70 118 154 150 92S214 44 230 66" fill="none" {...ink} strokeDasharray="2 6" strokeWidth={2} />
      {pin(36, 142, "a")}
      {pin(150, 94, "b")}
      {pin(230, 68, "c")}
      <circle cx={74} cy={46} r={20} fill="var(--color-paper)" {...ink} />
      <path d="M74 34v12l8 5" fill="none" {...ink} />
      <path d="M44 22h12M92 22h12M44 22v6M104 22v6" fill="none" {...ink} strokeOpacity={0.45} />
      <text x={56} y={84} {...label}>time window</text>
    </Frame>
  );
}

export function StorageIllustration({ className }: { className?: string }) {
  const levels = [
    { y: 78, count: 2 },
    { y: 104, count: 4 },
    { y: 130, count: 6 },
  ];
  return (
    <Frame className={className}>
      <rect x={84} y={14} width={92} height={28} rx={6} fill="var(--color-wash)" {...ink} />
      <text x={102} y={32} {...label} fill="var(--color-navy)">MemTable</text>
      <rect x={190} y={18} width={52} height={20} rx={3} fill="var(--color-paper)" {...ink} strokeWidth={1} />
      {[200, 210, 220, 230].map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={36} {...ink} strokeWidth={0.8} />
      ))}
      <text x={204} y={52} {...label}>log</text>
      <line x1={130} y1={44} x2={130} y2={68} {...ink} markerEnd="url(#ill-arrow)" />
      {levels.map((level) => (
        <g key={level.y}>
          {Array.from({ length: level.count }, (_, i) => {
            const width = 26;
            const start = 130 - (level.count * (width + 4)) / 2;
            return <rect key={i} x={start + i * (width + 4)} y={level.y} width={width} height={18} rx={3} fill="var(--color-paper)" {...ink} strokeWidth={1.2} />;
          })}
        </g>
      ))}
      {/* Bloom filter: a sieve that lets lookups skip a table */}
      <path d="M8 84h22l-7 12v8l-8 4v-12z" fill="var(--color-wash)" {...ink} strokeWidth={1.2} />
      <text x={2} y={124} {...label}>bloom</text>
    </Frame>
  );
}

export function LegacyBankStepIllustration({ step, className }: { step: LegacyBankStepId; className?: string }) {
  if (step === "discover") {
    return (
      <Frame className={className}>
        <rect x={28} y={20} width={204} height={128} rx={9} fill="var(--color-paper)" {...ink} />
        <line x1={28} y1={40} x2={232} y2={40} {...ink} strokeWidth={1} />
        {[40, 50, 60].map((x) => (
          <circle key={x} cx={x} cy={30} r={2.6} fill="var(--color-periwinkle)" />
        ))}
        <rect x={46} y={54} width={90} height={8} rx={4} fill="var(--color-wash)" />
        <rect x={46} y={70} width={124} height={8} rx={4} fill="var(--color-wash)" />
        <rect x={46} y={86} width={70} height={8} rx={4} fill="var(--color-wash)" />
        <rect x={46} y={108} width={64} height={22} rx={11} fill="var(--color-action)" />
        <path d="M100 118l14 34 5-13 13-4z" fill="var(--color-paper)" {...ink} />
        <circle cx={188} cy={104} r={22} fill="var(--color-wash-soft)" fillOpacity={0.8} {...ink} />
        <line x1={204} y1={120} x2={222} y2={138} {...ink} strokeWidth={3} />
      </Frame>
    );
  }
  if (step === "compile") {
    return (
      <Frame className={className}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={20 + i * 6} y={34 + i * 8} width={70} height={90} rx={6} fill="var(--color-paper)" {...ink} strokeOpacity={0.4 + i * 0.15} strokeWidth={1.1} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={40} y1={66 + i * 12} x2={i % 2 ? 70 : 82} y2={66 + i * 12} {...ink} strokeOpacity={0.35} strokeWidth={1} />
        ))}
        <line x1={104} y1={88} x2={128} y2={88} {...ink} markerEnd="url(#ill-arrow)" />
        <rect x={134} y={30} width={108} height={116} rx={9} fill="var(--color-paper)" {...ink} />
        <rect x={134} y={30} width={108} height={26} rx={9} fill="var(--color-wash)" />
        <text x={146} y={47} {...label} fill="var(--color-navy)">{"{ capability }"}</text>
        {["typed inputs", "versioned", "replay steps", "postconditions"].map((t, i) => (
          <g key={t}>
            <circle cx={148} cy={74 + i * 18} r={2.5} fill="var(--color-action)" />
            <text x={156} y={78 + i * 18} {...label}>{t}</text>
          </g>
        ))}
      </Frame>
    );
  }
  if (step === "gate") {
    return (
      <Frame className={className}>
        <path d="M100 26l40 14v34c0 28-18 46-40 56-22-10-40-28-40-56V40z" fill="var(--color-wash)" {...ink} />
        <path d="m84 78 12 12 22-24" fill="none" stroke="var(--color-action)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M150 86h34" {...ink} strokeDasharray="4 4" markerEnd="url(#ill-arrow)" />
        <circle cx={212} cy={66} r={13} fill="var(--color-paper)" {...ink} />
        <path d="M188 116c0-16 11-26 24-26s24 10 24 26" fill="var(--color-paper)" {...ink} />
        <text x={178} y={140} {...label}>human approval</text>
        <text x={66} y={156} {...label}>deny by default</text>
      </Frame>
    );
  }
  return (
    <Frame className={className}>
      <rect x={58} y={22} width={144} height={100} rx={9} fill="var(--color-paper)" {...ink} strokeOpacity={0.45} />
      <circle cx={130} cy={72} r={32} fill="none" {...ink} strokeDasharray="150 52" markerEnd="url(#ill-arrow)" />
      <path d="M121 58v28l24-14z" fill="var(--color-action)" />
      <text x={98} y={146} {...label} fill="var(--color-navy)">0 model calls</text>
    </Frame>
  );
}

export function BirdIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden="true" focusable="false">
      <path d="M8 114C60 104 120 110 192 96" fill="none" {...ink} />
      <path d="M150 104c8-10 18-12 26-10-6 8-16 12-26 10zM40 110c-6-10-16-14-24-12 6 8 14 12 24 12z" fill="var(--color-wash)" {...ink} strokeWidth={1} />
      <path d="M82 96 52 108l8-8-9-3 29-8" fill="var(--color-periwinkle)" {...ink} strokeWidth={1.2} />
      <path d="M117 70c-13-4-31 4-37 20-4 10 4 18 20 16 18-2 32-12 34-30" fill="var(--color-wash)" {...ink} />
      <circle cx={126} cy={64} r={11} fill="var(--color-wash)" {...ink} />
      <path d="m136 61 11 3-11 4z" fill="var(--color-paper)" {...ink} strokeWidth={1.1} />
      <circle cx={129} cy={61} r={1.6} fill="var(--color-navy)" />
      <path d="M92 82c10-4 22 0 28 8-10 6-22 6-28 0z" fill="var(--color-periwinkle)" {...ink} strokeWidth={1.1} />
      <path d="M102 106v8M110 105v8" {...ink} strokeWidth={1.2} />
    </svg>
  );
}

export function ProjectIllustration({ id, className }: { id: Project["id"]; className?: string }) {
  switch (id) {
    case "legacybank":
      return <LegacyBankStepIllustration step="compile" className={className} />;
    case "quorum":
      return <QuorumIllustration className={className} />;
    case "streamline":
      return <StreamlineIllustration className={className} />;
    case "waypoint":
      return <WaypointIllustration className={className} />;
    case "storage-engine":
      return <StorageIllustration className={className} />;
  }
}
