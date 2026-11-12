"use client";

import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface Route {
  /** Polyline in map units (the map is 248 x 160). The first point is the start. */
  points: [number, number][];
  label: string;
  /** Trip time at the start, in minutes. */
  minutes: number;
  /** Trip distance at the start, in miles. */
  miles: number;
}

export interface RouteMapProps {
  route?: Route;
  /** How much of the route has been travelled, 0 to 1. ETA and distance follow from it. */
  progress: number;
  className?: string;
}

const W = 248;
const H = 160;
const STREETS_X = [22, 64, 90, 130, 168, 196, 230];
const STREETS_Y = [20, 50, 82, 112, 142];

const DEFAULT_ROUTE: Route = {
  points: [
    [22, 142],
    [22, 112],
    [90, 112],
    [90, 20],
    [196, 20],
    [196, 50],
    [230, 50],
  ],
  label: "To client meeting",
  minutes: 12,
  miles: 2.5,
};

/** The point `t` (0 to 1) of the way along a polyline. */
function pointAt(points: [number, number][], t: number): [number, number] {
  const lengths = points.slice(1).map(([x, y], i) => Math.hypot(x - points[i][0], y - points[i][1]));
  let remaining = t * lengths.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lengths.length; i++) {
    if (remaining <= lengths[i]) {
      const f = lengths[i] === 0 ? 0 : remaining / lengths[i];
      const [ax, ay] = points[i];
      const [bx, by] = points[i + 1];
      return [ax + (bx - ax) * f, ay + (by - ay) * f];
    }
    remaining -= lengths[i];
  }
  return points[points.length - 1];
}

/** A mini map that draws a route as it is travelled, with a live ETA and distance. */
export function RouteMap({ route = DEFAULT_ROUTE, progress, className }: RouteMapProps) {
  const t = Math.min(1, Math.max(0, progress));
  const arrived = t >= 1;
  const d = route.points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const [hx, hy] = pointAt(route.points, t);
  const [sx, sy] = route.points[0];
  const [ex, ey] = route.points[route.points.length - 1];
  const minutes = Math.max(1, Math.ceil(route.minutes * (1 - t)));
  const miles = Math.max(0.1, route.miles * (1 - t));

  return (
    <section aria-label={`Route: ${route.label}`} className={cn("w-[280px] rounded-[24px] bg-accent p-2.5", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${Math.round(t * 100)}% of the route travelled`}
        className="block w-full overflow-hidden rounded-[16px]"
      >
        <rect width={W} height={H} className="fill-[#e7eaf5] dark:fill-[#1c2030]" />
        <rect x={94} y={54} width={32} height={24} className="fill-[#d9e9d6] dark:fill-[#1a2a22]" />
        <circle cx={W + 6} cy={H + 14} r={66} className="fill-[#d4ddfb] dark:fill-[#1c2650]" />
        <g className="fill-background">
          {STREETS_X.map((x) => (
            <rect key={`x${x}`} x={x - 3.5} y={0} width={7} height={H} />
          ))}
          {STREETS_Y.map((y) => (
            <rect key={`y${y}`} x={0} y={y - 3.5} width={W} height={7} />
          ))}
        </g>

        <g key={route.label} className="transition-opacity duration-300 ease-out-strong starting:opacity-0">
          <path d={d} fill="none" stroke="#3358eb" strokeOpacity={0.22} strokeWidth={3.5} strokeLinejoin="round" />
          <path
            d={d}
            pathLength={1}
            fill="none"
            stroke="#3358eb"
            strokeWidth={3.5}
            strokeLinejoin="round"
            strokeDasharray="1 1"
            strokeDashoffset={1 - t}
          />
          <circle cx={sx} cy={sy} r={3.6} strokeWidth={1.8} stroke="#3358eb" className="fill-background" />
          <g transform={`translate(${ex} ${ey - 4})`} className="fill-heading">
            <path d="M0 0C-1.6-3.6-7-7-7-12.5a7 7 0 0 1 14 0C7-7 1.6-3.6 0 0Z" />
            <circle cy={-12.5} r={2.6} className="fill-background" />
          </g>
          <circle cx={hx} cy={hy} r={7.5} fill="#3358eb" fillOpacity={0.18} />
          <circle cx={hx} cy={hy} r={3.6} fill="#3358eb" stroke="white" strokeWidth={1.2} />
        </g>
      </svg>

      <div className="flex items-center gap-2.5 px-1.5 pb-1 pt-3">
        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-[#3358eb]">
          <svg viewBox="0 0 10 10" width="9" height="9" fill="white">
            <path d="M2.5 1.6v6.8a.5.5 0 0 0 .76.43l5.5-3.4a.5.5 0 0 0 0-.86l-5.5-3.4a.5.5 0 0 0-.76.43z" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px]/[16px] font-semibold text-heading">
            {arrived ? "Arrived" : <RollingNumber value={minutes} format={(n) => `${n} min`} />}
          </p>
          <p className="truncate text-[11px] text-muted-foreground">{route.label}</p>
        </div>
        <RollingNumber
          value={miles}
          format={(n) => `${n.toFixed(1)} mi`}
          className="text-xs text-muted-foreground"
        />
      </div>
    </section>
  );
}
