"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
const defaultFormat = (n: number) => Math.round(n).toLocaleString("en-US");

/** Animates from the previously rendered value to `value` with an ease-out curve. */
export function AnimatedCounter({ value, duration = 900, format = defaultFormat, className }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const frame = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = fromRef.current;
    if (reduce || from === value) {
      fromRef.current = value;
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const current = from + (value - from) * easeOut(t);
      setDisplay(current);
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = value;
      }
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [value, duration]);

  return (
    <span className={cn("tabular-nums", className)} aria-live="polite" aria-atomic="true">
      {format(display)}
    </span>
  );
}
