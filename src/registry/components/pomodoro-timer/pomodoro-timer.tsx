"use client";

import { useEffect, useState } from "react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface FocusTimerProps {
  /** Full session length in seconds. The arc shows what is left of it. */
  duration?: number;
  /** Seconds left when the timer mounts. */
  defaultRemaining?: number;
  running?: boolean;
  defaultRunning?: boolean;
  onRunningChange?: (running: boolean) => void;
  label?: string;
  className?: string;
}

const SIZE = 100;
const STROKE = 5;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** A countdown ring with rolling digits. Click it to pause or resume. */
export function FocusTimer({
  duration = 25 * 60,
  defaultRemaining = duration,
  running: runningProp,
  defaultRunning = true,
  onRunningChange,
  label = "Focus",
  className,
}: FocusTimerProps) {
  const [remaining, setRemaining] = useState(defaultRemaining);
  const [runningState, setRunningState] = useState(defaultRunning);
  const running = runningProp ?? runningState;
  const done = remaining <= 0;

  useEffect(() => {
    if (!running || done) return;
    const id = window.setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => window.clearInterval(id);
  }, [running, done]);

  function toggle() {
    if (runningProp === undefined) setRunningState(!running);
    onRunningChange?.(!running);
  }

  return (
    <div className={cn("grid w-44 place-items-center rounded-[24px] bg-accent p-5", className)}>
      <button
        type="button"
        aria-pressed={!running}
        aria-label={`Pause ${label.toLowerCase()} timer`}
        onClick={toggle}
        className="relative grid size-[120px] place-items-center rounded-full transition-transform duration-150 ease-out-strong active:scale-[0.97]"
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" strokeWidth={STROKE} className="stroke-border-strong" />
          <g className={cn("transition-opacity duration-200 ease-out-strong", !running && "opacity-45")}>
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="#3358eb"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - remaining / duration)}
              className="transition-[stroke-dashoffset] duration-1000 ease-linear motion-reduce:transition-none"
            />
          </g>
        </svg>
        <span role="timer" className="flex flex-col items-center">
          <span className="text-[10px] text-muted-foreground">{label}</span>
          <RollingNumber
            value={remaining}
            format={clock}
            className="font-heading text-[22px]/[26px] font-semibold tracking-[-0.02em] text-heading"
          />
        </span>
      </button>
    </div>
  );
}
