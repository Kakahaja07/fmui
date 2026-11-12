"use client";

import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface ActivityRing {
  label: string;
  /** 0 to 100. */
  value: number;
  color: string;
}

export interface ActivityRingsProps {
  /** Outermost first. The first ring's label and value are shown under the rings. */
  rings?: ActivityRing[];
  className?: string;
}

const DEFAULT_RINGS: ActivityRing[] = [
  { label: "Move", value: 95, color: "#3358eb" },
  { label: "Exercise", value: 80, color: "#7b95f3" },
  { label: "Stand", value: 70, color: "#c9d4fb" },
];

const SIZE = 100;
const STROKE = 9;
const GAP = 2;

/** Concentric goal rings that sweep to their new values, with a rolling percentage. */
export function ActivityRings({ rings = DEFAULT_RINGS, className }: ActivityRingsProps) {
  const [lead] = rings;
  const clamp = (v: number) => Math.min(100, Math.max(0, v));

  return (
    <div
      role="group"
      aria-label="Activity"
      className={cn("flex w-44 flex-col items-center rounded-[26px] bg-[#111] px-4 pb-4 pt-5 text-white", className)}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="104" height="104" className="-rotate-90" aria-hidden="true">
        {rings.map((ring, i) => {
          const r = SIZE / 2 - STROKE / 2 - i * (STROKE + GAP);
          const c = 2 * Math.PI * r;
          return (
            <g key={ring.label} fill="none" strokeWidth={STROKE} stroke={ring.color}>
              <circle cx={SIZE / 2} cy={SIZE / 2} r={r} strokeOpacity={0.18} />
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={r}
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - clamp(ring.value) / 100)}
                className="transition-[stroke-dashoffset] duration-1000 ease-out-strong motion-reduce:transition-none"
              />
            </g>
          );
        })}
      </svg>
      <p className="mt-3 flex items-baseline gap-1 text-xs text-white/55">
        {lead.label}
        <RollingNumber value={clamp(lead.value)} format={(n) => `${Math.round(n)}%`} />
      </p>
      <ul className="sr-only">
        {rings.slice(1).map((ring) => (
          <li key={ring.label}>
            {ring.label} {Math.round(clamp(ring.value))}%
          </li>
        ))}
      </ul>
    </div>
  );
}
