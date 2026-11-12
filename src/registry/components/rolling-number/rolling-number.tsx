"use client";

import { cn } from "@/lib/utils";

export interface RollingNumberProps {
  value: number;
  /** Turns the number into display text. Non-digit characters render as-is. */
  format?: (value: number) => string;
  /** Roll duration in milliseconds. */
  duration?: number;
  className?: string;
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const defaultFormat = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * A number whose digits roll like an odometer when the value changes.
 * Columns are keyed from the right, so the ones digit stays the ones digit
 * when the number grows or shrinks a place.
 */
export function RollingNumber({ value, format = defaultFormat, duration = 600, className }: RollingNumberProps) {
  const text = format(value);
  const chars = text.split("");

  return (
    <span className={cn("inline-flex tabular-nums", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {chars.map((char, i) => {
          const place = chars.length - i;
          if (!/\d/.test(char)) return <span key={`s${place}${char}`}>{char}</span>;
          return (
            <span key={`d${place}`} className="relative inline-block overflow-hidden">
              <span className="invisible">0</span>
              <span
                className="absolute inset-x-0 top-0 flex flex-col transition-transform ease-out-strong motion-reduce:transition-none"
                style={{ transform: `translateY(-${Number(char) * 10}%)`, transitionDuration: `${duration}ms` }}
              >
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
