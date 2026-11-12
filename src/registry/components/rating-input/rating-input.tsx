"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface RatingInputProps {
  /** 0 means no rating. */
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Number of stars. */
  max?: number;
  /** Lets the left half of a star pick a .5 rating. */
  allowHalf?: boolean;
  /** Shows the rating without letting it change. */
  readOnly?: boolean;
  label?: string;
  className?: string;
}

const STAR =
  "M12 3.2l2.6 5.3 5.8.85-4.2 4.1 1 5.8L12 16.5l-5.2 2.75 1-5.8-4.2-4.1 5.8-.85L12 3.2z";

function Star({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("absolute inset-0 size-full", className)} style={style}>
      <path d={STAR} fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/** A star rating built as a radio group. Hover previews, click commits, clicking the current value clears it. */
export function RatingInput({
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  max = 5,
  allowHalf = true,
  readOnly = false,
  label = "Rating",
  className,
}: RatingInputProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const value = valueProp ?? valueState;
  const [hover, setHover] = useState<number | null>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const unit = allowHalf ? 0.5 : 1;
  const shown = readOnly ? value : (hover ?? value);
  const tabbable = Math.max(unit, Math.round(value / unit) * unit);

  function commit(next: number) {
    if (next === value) return;
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  }

  /** `star` is the clicked star, passed only for pointer clicks so keyboard changes stay still. */
  function choose(v: number, star?: Element | null) {
    const next = v === value ? 0 : v;
    commit(next);
    setHover(null);
    if (!next || !star || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    star.animate([{ transform: "scale(0.8)" }, { transform: "scale(1)" }], {
      duration: 380,
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const target = Number((e.target as HTMLElement).dataset.value);
    const moves: Record<string, number> = {
      ArrowRight: value + unit, ArrowUp: value + unit, ArrowLeft: value - unit, ArrowDown: value - unit, Home: unit, End: max,
    };
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      choose(target);
    } else if (e.key in moves) {
      e.preventDefault();
      const next = Math.min(max, Math.max(unit, moves[e.key]));
      commit(next);
      groupRef.current?.querySelector<HTMLElement>(`[data-value="${next}"]`)?.focus();
    }
  }

  return (
    <div className={cn("inline-flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-6">
        <span id={`${id}-label`} className="text-[13px]/[16px] font-semibold text-heading">
          {label}
        </span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {shown ? (
            <>
              <span className="font-semibold text-heading">{shown.toFixed(allowHalf ? 1 : 0)}</span> / {max}
            </>
          ) : (
            "Not rated"
          )}
        </span>
      </div>
      <div
        ref={groupRef}
        role={readOnly ? "img" : "radiogroup"}
        aria-labelledby={readOnly ? undefined : `${id}-label`}
        aria-label={readOnly ? `${label}: ${value} out of ${max}` : undefined}
        onKeyDown={readOnly ? undefined : onKeyDown}
        onPointerLeave={() => setHover(null)}
        className="flex gap-1"
      >
        {Array.from({ length: max }, (_, i) => i).map((i) => {
          const fill = Math.min(1, Math.max(0, shown - i));
          const options = allowHalf ? [i + 0.5, i + 1] : [i + 1];
          return (
            <span key={i} className="relative size-7 rounded-[8px] has-focus-visible:ring-2 has-focus-visible:ring-[#3358eb]/50">
              <span className="pointer-events-none absolute inset-0">
                <Star className="text-heading/12" />
                <Star
                  className="text-amber-400 transition-[clip-path] duration-150 ease-out-strong"
                  style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
                />
              </span>
              {!readOnly &&
                options.map((v) => (
                  <span
                    key={v}
                    role="radio"
                    aria-checked={value === v}
                    aria-label={`${v} ${v === 1 ? "star" : "stars"}`}
                    data-value={v}
                    tabIndex={v === tabbable ? 0 : -1}
                    onPointerEnter={() => setHover(v)}
                    onClick={(e) => choose(v, e.detail > 0 ? e.currentTarget.parentElement?.firstElementChild : null)}
                    className={cn(
                      "absolute inset-y-0 cursor-pointer outline-none",
                      options.length === 1 ? "inset-x-0" : v % 1 ? "left-0 w-1/2" : "right-0 w-1/2",
                    )}
                  />
                ))}
            </span>
          );
        })}
      </div>
    </div>
  );
}
