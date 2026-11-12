"use client";

import { useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { VolumeHighIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface VerticalSliderProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Shown at the bottom of the fill. Defaults to a volume icon. */
  icon?: ReactNode;
  /** Accessible name, e.g. "Volume". */
  label?: string;
  className?: string;
}

/**
 * A tall, Control Center style slider. The fill glides when the value changes
 * on its own, and tracks the pointer 1:1 while you drag.
 */
export function VerticalSlider({
  value: valueProp,
  defaultValue = 50,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  icon = <HugeiconsIcon icon={VolumeHighIcon} size={14} strokeWidth={2} />,
  label = "Volume",
  className,
}: VerticalSliderProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const value = valueProp ?? valueState;
  const [focused, setFocused] = useState(false);
  const fraction = (value - min) / (max - min);

  function commit(raw: number) {
    const next = Math.min(max, Math.max(min, Math.round((raw - min) / step) * step + min));
    if (next === value) return;
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  }

  function fromPointer(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    commit(min + (1 - (e.clientY - rect.top) / rect.height) * (max - min));
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const steps: Record<string, number> = {
      ArrowUp: step, ArrowRight: step, ArrowDown: -step, ArrowLeft: -step, PageUp: step * 10, PageDown: -step * 10,
    };
    if (e.key in steps) commit(value + steps[e.key]);
    else if (e.key === "Home") commit(min);
    else if (e.key === "End") commit(max);
    else return;
    e.preventDefault();
  }

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-orientation="vertical"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${Math.round(fraction * 100)}%`}
      onKeyDown={onKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        fromPointer(e);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e);
      }}
      className={cn(
        "relative h-[132px] w-[46px] cursor-pointer touch-none overflow-hidden rounded-[14px] bg-border-strong",
        className,
      )}
    >
      {/* While you're using it, the fill follows input directly; otherwise it glides. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-background transition-transform motion-reduce:transition-none",
          focused ? "duration-0" : "duration-500 ease-in-out-strong",
        )}
        style={{ transform: `translateY(${(1 - fraction) * 100}%)` }}
      />
      <span aria-hidden="true" className="absolute bottom-3 left-1/2 -translate-x-1/2 text-heading">
        {icon}
      </span>
    </div>
  );
}
