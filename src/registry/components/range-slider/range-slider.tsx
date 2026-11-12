"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

export interface RangeSliderProps {
  /** The selected `[low, high]` pair. */
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  min?: number;
  max?: number;
  /** Values snap to multiples of this, counted from `min`. */
  step?: number;
  /** Formats the tooltips, header and screen reader text, e.g. `(n) => "$" + n`. */
  formatValue?: (value: number) => string;
  label?: string;
  className?: string;
}

const NAMES = ["minimum", "maximum"];

/** A two-thumb slider. Drag either thumb or click the track; the thumbs stop at each other instead of crossing. */
export function RangeSlider({
  value: valueProp,
  defaultValue = [25, 75],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  formatValue = String,
  label = "Range",
  className,
}: RangeSliderProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const [lo, hi] = valueProp ?? valueState;
  const [active, setActive] = useState<number | null>(null);
  const thumbs = useRef<(HTMLDivElement | null)[]>([]);
  const id = useId();
  const decimals = String(step).split(".")[1]?.length ?? 0;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  function set(thumb: number, raw: number) {
    const snapped = Number((Math.round((raw - min) / step) * step + min).toFixed(decimals));
    const v = Math.min(max, Math.max(min, snapped));
    const next: [number, number] = thumb === 0 ? [Math.min(v, hi), hi] : [lo, Math.max(v, lo)];
    if (next[0] === lo && next[1] === hi) return;
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  }

  function valueAt(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return min + ((e.clientX - rect.left) / rect.width) * (max - min);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    const v = valueAt(e);
    // Nearest thumb wins; when they overlap, the side you pressed on decides.
    const thumb = Math.abs(v - lo) < Math.abs(v - hi) || (lo === hi && v < lo) ? 0 : 1;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setActive(thumb);
    thumbs.current[thumb]?.focus();
    set(thumb, v);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>, thumb: number) {
    const current = thumb === 0 ? lo : hi;
    const steps: Record<string, number> = {
      ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step, PageUp: step * 10, PageDown: -step * 10,
    };
    if (e.key in steps) set(thumb, current + steps[e.key]);
    else if (e.key === "Home") set(thumb, min);
    else if (e.key === "End") set(thumb, max);
    else return;
    e.preventDefault();
  }

  return (
    <div role="group" aria-labelledby={`${id}-label`} className={cn("w-full max-w-[300px]", className)}>
      <div className="flex items-baseline justify-between">
        <span id={`${id}-label`} className="text-[13px]/[16px] font-semibold text-heading">
          {label}
        </span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {formatValue(lo)} – {formatValue(hi)}
        </span>
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={(e) => {
          if (active !== null && e.currentTarget.hasPointerCapture(e.pointerId)) set(active, valueAt(e));
        }}
        onLostPointerCapture={() => setActive(null)}
        className="relative mt-10 h-5 cursor-pointer touch-none"
      >
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-heading/10">
          <div
            className="h-full w-full origin-left rounded-full bg-[#3358eb]"
            style={{ transform: `translateX(${pct(lo)}%) scaleX(${(pct(hi) - pct(lo)) / 100})` }}
          />
        </div>

        {[lo, hi].map((v, i) => (
          <div
            key={i}
            className={cn("pointer-events-none absolute inset-0", active === i && "z-10")}
            style={{ transform: `translateX(${pct(v)}%)` }}
          >
            <div
              ref={(el) => {
                thumbs.current[i] = el;
              }}
              role="slider"
              tabIndex={0}
              aria-label={`${label} ${NAMES[i]}`}
              aria-valuemin={i === 0 ? min : lo}
              aria-valuemax={i === 0 ? hi : max}
              aria-valuenow={v}
              aria-valuetext={formatValue(v)}
              data-active={active === i}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="group pointer-events-auto absolute top-0 left-0 size-5 -translate-x-1/2 rounded-full outline-none"
            >
              <span className="block size-full rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_1px_3px_rgb(0_0_0/0.2)] transition-[scale,box-shadow] duration-150 ease-out-strong group-focus-visible:shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_0_0_5px_rgb(51_88_235/0.25)] group-data-[active=true]:scale-110" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 scale-95 rounded-[8px] bg-heading px-1.5 py-0.5 text-[11px]/[16px] font-semibold whitespace-nowrap text-background tabular-nums opacity-0 shadow-xs transition-[translate,scale,opacity] duration-150 ease-out-strong origin-bottom group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 group-data-[active=true]:translate-y-0 group-data-[active=true]:scale-100 group-data-[active=true]:opacity-100"
              >
                {formatValue(v)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
