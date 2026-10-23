"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SegmentedOption {
  value: string;
  label: string;
}

export interface AnimatedSegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  "aria-label": string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * A segmented control whose active indicator slides between options.
 * Implemented as a radio group so arrow keys move the selection and
 * screen readers announce it as a single choice.
 */
export function AnimatedSegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  className,
  ...rest
}: AnimatedSegmentedControlProps) {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const selected = value ?? internal;
  const name = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const el = list.querySelector<HTMLElement>(`[data-value="${CSS.escape(selected)}"]`);
      if (el) setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [selected, options]);

  function select(v: string) {
    setInternal(v);
    onValueChange?.(v);
  }

  return (
    <div
      ref={listRef}
      role="radiogroup"
      aria-label={rest["aria-label"]}
      className={cn(
        "relative inline-grid auto-cols-fr grid-flow-col rounded-[10px] border border-border bg-surface p-1",
        className,
      )}
    >
      {indicator && (
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-0 rounded-[7px] bg-background shadow-[0_1px_2px_rgb(0_0_0/0.08)] ring-1 ring-border transition-[transform,width] duration-200 ease-out-strong"
          style={{ transform: `translateX(${indicator.x}px)`, width: indicator.w }}
        />
      )}
      {options.map((opt) => {
        const checked = opt.value === selected;
        return (
          <label
            key={opt.value}
            data-value={opt.value}
            className={cn(
              "relative z-10 flex cursor-pointer select-none items-center justify-center rounded-[7px] font-medium transition-colors duration-200 has-focus-visible:outline-2 has-focus-visible:outline-ring",
              size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3.5 text-[13px]",
              checked ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => select(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}
