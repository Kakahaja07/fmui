"use client";

import { useId, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface MetricRange {
  id: string;
  label: string;
  value: number;
  previous: number;
  /** Small bar series for the range. */
  series: number[];
}

export interface MetricCardProps {
  title: string;
  ranges: MetricRange[];
  format?: (n: number) => string;
  className?: string;
}

const defaultFormat = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(n);

export function MetricCard({ title, ranges, format = defaultFormat, className }: MetricCardProps) {
  const [rangeId, setRangeId] = useState(ranges[0]?.id);
  const range = ranges.find((r) => r.id === rangeId) ?? ranges[0];
  const groupId = useId();
  const delta = range.previous === 0 ? 0 : ((range.value - range.previous) / range.previous) * 100;
  const up = delta >= 0;
  const max = Math.max(...range.series, 1);

  return (
    <div className={cn("w-full max-w-sm rounded-[14px] border border-border bg-background p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div
          role="radiogroup"
          aria-label={`${title} time range`}
          className="flex items-center gap-0.5 rounded-[8px] border border-border bg-surface p-0.5"
        >
          {ranges.map((r) => (
            <label
              key={r.id}
              className={cn(
                "cursor-pointer rounded-[6px] px-2 py-0.5 text-[11px] font-medium transition-colors has-focus-visible:outline-2 has-focus-visible:outline-ring",
                r.id === range.id ? "bg-background text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground",
              )}
            >
              <input
                type="radio"
                name={groupId}
                className="sr-only"
                checked={r.id === range.id}
                onChange={() => setRangeId(r.id)}
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div key={range.id} className="mt-3 flex items-end justify-between gap-4 animate-in fade-in-0 duration-200">
        <div>
          <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-foreground tabular-nums">
            {format(range.value)}
          </p>
          <p
            className={cn(
              "mt-2 inline-flex items-center gap-1 text-xs font-medium tabular-nums",
              up ? "text-success" : "text-danger",
            )}
          >
            <HugeiconsIcon icon={up ? ArrowUp01Icon : ArrowDown01Icon} size={13} strokeWidth={2.5} />
            {Math.abs(delta).toFixed(1)}%
            <span className="font-normal text-muted-foreground">vs previous</span>
          </p>
        </div>
        <div className="flex h-10 items-end gap-[3px]" aria-hidden="true">
          {range.series.map((v, i) => (
            <span
              key={i}
              className={cn(
                "w-1.5 rounded-sm transition-[height] duration-300 ease-out-strong",
                i === range.series.length - 1 ? "bg-primary" : "bg-border-strong",
              )}
              style={{ height: `${Math.max(8, (v / max) * 100)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
