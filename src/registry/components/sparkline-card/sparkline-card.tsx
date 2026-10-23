"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SparklinePoint {
  label: string;
  value: number;
}

export interface SparklineCardProps {
  title: string;
  points: SparklinePoint[];
  unit?: string;
  className?: string;
}

const W = 240;
const H = 64;

export function SparklineCard({ title, points, unit = "", className }: SparklineCardProps) {
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientId = useId();

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * W,
    y: H - 6 - ((p.value - min) / span) * (H - 12),
  }));
  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const area = `${path} L${W},${H} L0,${H} Z`;

  const active = hover ?? points.length - 1;
  const current = points[active];
  const first = points[0].value;
  const change = first === 0 ? 0 : ((current.value - first) / first) * 100;

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = (e.clientX - rect.left) / rect.width;
    setHover(Math.round(Math.min(1, Math.max(0, ratio)) * (points.length - 1)));
  }

  return (
    <div className={cn("w-full max-w-xs rounded-[14px] border border-border bg-background p-5", className)}>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <p className="text-2xl font-semibold tracking-[-0.02em] text-foreground tabular-nums">
          {current.value.toLocaleString()}
          {unit}
        </p>
        <p className="text-xs text-muted-foreground tabular-nums">
          {current.label}
          <span className={cn("ml-2 font-medium", change >= 0 ? "text-success" : "text-danger")}>
            {change >= 0 ? "+" : ""}
            {change.toFixed(1)}%
          </span>
        </p>
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 h-16 w-full touch-none"
        role="img"
        aria-label={`${title} trend from ${points[0].label} to ${points[points.length - 1].label}`}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gradientId})`} className="text-foreground" />
        <path d={path} fill="none" stroke="currentColor" strokeWidth="1.75" className="text-foreground" />
        {hover !== null && (
          <line
            x1={coords[active].x}
            x2={coords[active].x}
            y1={0}
            y2={H}
            stroke="currentColor"
            strokeDasharray="2 3"
            className="text-muted-foreground"
          />
        )}
        <circle
          cx={coords[active].x}
          cy={coords[active].y}
          r="3.5"
          className="fill-background stroke-foreground"
          strokeWidth="2"
        />
      </svg>
      <p className="sr-only">
        Values: {points.map((p) => `${p.label} ${p.value}${unit}`).join(", ")}
      </p>
    </div>
  );
}
