"use client";

import { useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface WeekPickerDay {
  /** Short weekday shown above the date, e.g. "M". */
  label: string;
  day: number;
}

export interface WeekPickerProps {
  days?: WeekPickerDay[];
  /** The selected `day` number. */
  value?: number;
  defaultValue?: number;
  onValueChange?: (day: number) => void;
  month?: string;
  week?: string;
  className?: string;
}

const DEFAULT_DAYS: WeekPickerDay[] = ["M", "T", "W", "T", "F", "S", "S"].map((label, i) => ({
  label,
  day: 9 + i,
}));

const STEPS: Record<string, number> = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 };

/** A one-week date strip. A single pill slides to the selected day. */
export function WeekPicker({
  days = DEFAULT_DAYS,
  value: valueProp,
  defaultValue = days[0]?.day,
  onValueChange,
  month = "November",
  week = "Week 46",
  className,
}: WeekPickerProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const value = valueProp ?? valueState;
  const index = days.findIndex((d) => d.day === value);

  function select(i: number) {
    if (valueProp === undefined) setValueState(days[i].day);
    onValueChange?.(days[i].day);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = days.length - 1;
    const from = Math.max(index, 0);
    const next =
      e.key in STEPS ? (from + STEPS[e.key] + days.length) % days.length
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    e.currentTarget.querySelectorAll<HTMLElement>("[role=radio]")[next]?.focus();
  }

  return (
    <div className={cn("w-[232px] rounded-[24px] bg-background p-4 shadow-card", className)}>
      <div className="flex items-baseline justify-between">
        <p className="text-[13px]/[14px] font-semibold text-heading">{month}</p>
        <p className="text-xs text-muted-foreground">{week}</p>
      </div>
      <div
        role="radiogroup"
        aria-label={`${month}, ${week}`}
        onKeyDown={onKeyDown}
        className="relative mt-2.5 grid"
        style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-y-0 left-0 px-0.5 transition-[transform,opacity] duration-300 ease-in-out-strong motion-reduce:transition-opacity",
            index === -1 && "opacity-0",
          )}
          style={{ width: `${100 / days.length}%`, transform: `translateX(${Math.max(index, 0) * 100}%)` }}
        >
          <div className="h-full rounded-[10px] bg-[#3358eb]" />
        </div>
        {days.map((d, i) => {
          const checked = i === index;
          return (
            <button
              key={`${d.label}${d.day}`}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={`${month} ${d.day}`}
              tabIndex={checked || (index === -1 && i === 0) ? 0 : -1}
              onClick={() => select(i)}
              className="relative flex flex-col items-center rounded-[10px] py-1.5 transition-transform duration-150 ease-out-strong active:scale-[0.94]"
            >
              <span
                className={cn(
                  "text-[10px]/[12px] transition-colors duration-200",
                  checked ? "text-white/75" : "text-muted-foreground",
                )}
              >
                {d.label}
              </span>
              <span
                className={cn(
                  "text-[14px]/[18px] font-medium tabular-nums transition-colors duration-200",
                  checked ? "text-white" : "text-heading",
                )}
              >
                {d.day}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
