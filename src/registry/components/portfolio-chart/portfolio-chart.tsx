"use client";

import { useEffect, useId, useRef, useState } from "react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface PortfolioChartProps {
  value: number;
  /** Percent change, e.g. 2.9 for +2.9%. */
  change: number;
  /** Recent values, oldest first. The line morphs when this changes. */
  series: number[];
  label?: string;
  /** Currency code for the headline value. */
  currency?: string;
  className?: string;
}

const W = 204;
const H = 70;
const MORPH_MS = 800;

type Point = [number, number];

function toPoints(series: number[]): Point[] {
  const min = Math.min(...series);
  const span = Math.max(...series) - min || 1;
  return series.map((v, i) => [3 + (i / (series.length - 1)) * (W - 11), 8 + (1 - (v - min) / span) * (H - 18)]);
}

/** Catmull-Rom spline through every point, written as cubic Beziers. */
function linePath(p: Point[]) {
  let d = `M${p[0][0].toFixed(2)} ${p[0][1].toFixed(2)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const [p0, p1, p2, p3] = [p[i - 1] ?? p[i], p[i], p[i + 1], p[i + 2] ?? p[i + 1]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

function shapes(p: Point[]) {
  const line = linePath(p);
  const [lx, ly] = p[p.length - 1];
  return { line, area: `${line}L${lx} ${H}L${p[0][0]} ${H}Z`, dot: `translate(${lx} ${ly})` };
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** A portfolio card with a rolling balance and a smooth line that morphs between datasets. */
export function PortfolioChart({
  value,
  change,
  series,
  label = "Portfolio",
  currency = "USD",
  className,
}: PortfolioChartProps) {
  const gradientId = useId();
  const lineRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const shown = useRef<Point[]>(toPoints(series));
  // React renders the first frame only; after that the morph writes attributes directly.
  const [initial] = useState(() => shapes(toPoints(series)));

  useEffect(() => {
    const from = shown.current;
    const to = toPoints(series);
    const draw = (p: Point[]) => {
      const s = shapes(p);
      lineRef.current?.setAttribute("d", s.line);
      areaRef.current?.setAttribute("d", s.area);
      dotRef.current?.setAttribute("transform", s.dot);
      shown.current = p;
    };
    if (from.length !== to.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(to);
      return;
    }
    const start = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const t = easeInOut(Math.min(1, (now - start) / MORPH_MS));
      draw(from.map(([x, y], i) => [x + (to[i][0] - x) * t, y + (to[i][1] - y) * t]));
      if (t < 1) frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
  }, [series]);

  const money = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={cn("w-[236px] rounded-[24px] bg-background p-4 pb-3 shadow-card", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <RollingNumber
          value={change}
          format={(n) => `${n >= 0 ? "+" : "−"}${Math.abs(n).toFixed(1)}%`}
          className="rounded-full bg-[#3358eb]/10 px-2 py-0.5 text-[11px] font-medium text-[#3358eb]"
        />
      </div>
      <RollingNumber
        value={value}
        format={money}
        className="mt-1 font-heading text-[25px]/[30px] font-semibold tracking-[-0.02em] text-heading"
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 block w-full overflow-visible" role="img" aria-label={`${label} trend`}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3358eb" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#3358eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path ref={areaRef} d={initial.area} fill={`url(#${gradientId})`} />
        <path ref={lineRef} d={initial.line} fill="none" stroke="#3358eb" strokeWidth={2} strokeLinecap="round" />
        <g ref={dotRef} transform={initial.dot}>
          <circle r={7} fill="#3358eb" fillOpacity={0.15} />
          <circle r={3.4} strokeWidth={2} stroke="#3358eb" className="fill-background" />
        </g>
      </svg>
    </div>
  );
}
