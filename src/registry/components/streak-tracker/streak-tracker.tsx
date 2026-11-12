"use client";

import { useEffect, useState } from "react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface StreakTrackerProps {
  /** Current streak length. The row shows where it falls in the current week. */
  days: number;
  weekLength?: number;
  label?: string;
  unit?: string;
  className?: string;
}

/** A streak counter with a week of squares that fill day by day and reset each week. */
export function StreakTracker({
  days,
  weekLength = 7,
  label = "Design streak",
  unit = "days",
  className,
}: StreakTrackerProps) {
  const filled = days <= 0 ? 0 : ((days - 1) % weekLength) + 1;

  // When a new week starts, empty the whole row for a beat before the first day lands.
  const [prevFilled, setPrevFilled] = useState(filled);
  const [clearing, setClearing] = useState(false);
  if (filled !== prevFilled) {
    setPrevFilled(filled);
    setClearing(filled < prevFilled);
  }
  useEffect(() => {
    if (!clearing) return;
    const id = window.setTimeout(() => setClearing(false), 450);
    return () => window.clearTimeout(id);
  }, [clearing]);
  const shown = clearing ? 0 : filled;

  return (
    <div className={cn("w-44 rounded-[24px] bg-accent p-4", className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <RollingNumber
          value={days}
          className="font-heading text-[22px]/none font-semibold tracking-[-0.02em] text-heading"
        />
        <span className="text-xs text-muted-foreground">{unit}</span>
      </p>
      <div
        role="img"
        aria-label={`${shown} of ${weekLength} days done this week`}
        className="mt-3 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${weekLength}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: weekLength }, (_, i) => {
          const on = i < shown;
          return (
            <span key={i} className="relative aspect-square rounded-[5px] bg-heading/[0.06]">
              <span
                className={cn(
                  "absolute inset-0 rounded-[5px] bg-[#3358eb] transition-[scale,opacity] motion-reduce:transition-opacity",
                  on
                    ? "duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    : "scale-90 opacity-0 duration-300 ease-out-strong",
                )}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}
