"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange) => void;
  /** Earliest selectable day. */
  min?: Date;
  /** Latest selectable day. */
  max?: Date;
  label?: string;
  placeholder?: string;
  className?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const fmtDay = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const fmtFull = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtMonth = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const fmtLabel = new Intl.DateTimeFormat("en-US", { dateStyle: "full" });

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const t = (d?: Date) => (d ? startOfDay(d).getTime() : NaN);
const daysIn = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

/** Rows of seven, Sunday first, with null for the blank cells around the month. */
function weeksOf(m: Date) {
  const lead = m.getDay();
  const total = daysIn(m.getFullYear(), m.getMonth());
  return Array.from({ length: Math.ceil((lead + total) / 7) }, (_, w) =>
    Array.from({ length: 7 }, (_, c) => {
      const n = w * 7 + c - lead + 1;
      return n >= 1 && n <= total ? new Date(m.getFullYear(), m.getMonth(), n) : null;
    }),
  );
}

function formatRange({ from, to }: DateRange) {
  if (!from) return null;
  if (!to) return `${fmtFull.format(from)} – …`;
  const sameYear = from.getFullYear() === to.getFullYear();
  return `${(sameYear ? fmtDay : fmtFull).format(from)} – ${fmtFull.format(to)}`;
}

/** A trigger that opens a two-month calendar. Click a start day, hover to preview, click an end day. */
export function DateRangePicker({
  value: valueProp,
  defaultValue = {},
  onValueChange,
  min,
  max,
  label = "Dates",
  placeholder = "Pick a date range",
  className,
}: DateRangePickerProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const { from, to } = valueProp ?? valueState;
  const [open, setOpen] = useState(false);
  const [today] = useState(() => startOfDay(new Date()));
  const [month, setMonth] = useState(() => addMonths(from ?? today, 0));
  const [focused, setFocused] = useState(() => startOfDay(from ?? today));
  const [hover, setHover] = useState<Date | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const outOfBounds = (d: Date) => (min !== undefined && t(d) < t(min)) || (max !== undefined && t(d) > t(max));
  // While choosing the end, the hovered or focused day previews the range.
  const [lo, hi] =
    from && !to && hover ? [Math.min(t(from), t(hover)), Math.max(t(from), t(hover))] : [t(from), t(to ?? from)];

  function emit(next: DateRange) {
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  }

  function pick(day: Date) {
    if (!from || to) return emit({ from: day, to: undefined });
    const [a, b] = t(day) < t(from) ? [day, from] : [from, day];
    emit({ from: a, to: b });
    setOpen(false);
  }

  function onOpenChange(next: boolean) {
    if (next) {
      const anchor = startOfDay(from ?? today);
      setMonth(addMonths(anchor, 0));
      setFocused(anchor);
    }
    setHover(null);
    setOpen(next);
  }

  function moveFocus(next: Date) {
    if (min && t(next) < t(min)) next = startOfDay(min);
    if (max && t(next) > t(max)) next = startOfDay(max);
    setFocused(next);
    setHover(next);
    if (t(next) < t(month)) setMonth(addMonths(next, 0));
    else if (t(next) >= t(addMonths(month, 2))) setMonth(addMonths(next, -1));
    requestAnimationFrame(() =>
      gridRef.current?.querySelector<HTMLElement>(`[data-day="${t(next)}"]`)?.focus(),
    );
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!(e.target as HTMLElement).dataset.day) return;
    const d = focused;
    const shiftMonth = (n: number) =>
      new Date(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), daysIn(d.getFullYear(), d.getMonth() + n)));
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(d, -1),
      ArrowRight: () => addDays(d, 1),
      ArrowUp: () => addDays(d, -7),
      ArrowDown: () => addDays(d, 7),
      Home: () => addDays(d, -d.getDay()),
      End: () => addDays(d, 6 - d.getDay()),
      PageUp: () => shiftMonth(-1),
      PageDown: () => shiftMonth(1),
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    moveFocus(moves[e.key]());
  }

  const text = formatRange({ from, to });
  const days = from && to ? Math.round((t(to) - t(from)) / 864e5) + 1 : 0;
  const status = !from ? "Select a start date" : !to ? "Select an end date" : `${days} ${days === 1 ? "day" : "days"}`;
  // Keep one day tabbable even after the month buttons scroll the focused day out of view.
  const visible = t(focused) >= t(month) && t(focused) < t(addMonths(month, 2));
  const tabbable = visible ? t(focused) : Math.max(t(month), min ? t(min) : -Infinity);

  return (
    <div className={cn("w-[260px]", className)}>
      <span id={`${id}-label`} className="text-[13px]/[16px] font-semibold text-heading">
        {label}
      </span>
      <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <PopoverPrimitive.Trigger
          aria-labelledby={`${id}-label ${id}-value`}
          className="mt-1.5 flex h-10 w-full items-center gap-2 rounded-[12px] border border-border bg-background px-3 text-left text-sm shadow-xs transition-[scale,border-color] duration-150 ease-out-strong hover:border-border-strong active:scale-[0.99] data-[state=open]:border-border-strong"
        >
          <HugeiconsIcon icon={Calendar03Icon} size={16} strokeWidth={1.8} className="shrink-0 text-muted-foreground" />
          <span id={`${id}-value`} className={cn("truncate", text ? "text-heading" : "text-muted-foreground")}>
            {text ?? placeholder}
          </span>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={6}
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              gridRef.current?.querySelector<HTMLElement>('[data-day][tabindex="0"]')?.focus();
            }}
            className="z-50 origin-(--radix-popover-content-transform-origin) rounded-[18px] border border-border bg-background p-3 shadow-float outline-none duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97]"
          >
            <div ref={gridRef} onKeyDown={onKeyDown} onMouseLeave={() => setHover(null)} className="relative flex flex-col gap-4 sm:flex-row sm:gap-5">
              {[0, 1].map((offset) => {
                const m = addMonths(month, offset);
                const last = daysIn(m.getFullYear(), m.getMonth());
                const nav = offset === 0
                  ? { label: "Previous month", icon: ArrowLeft01Icon, side: "left-0", step: -1,
                      disabled: min !== undefined && t(month) <= t(addMonths(min, 0)) }
                  : { label: "Next month", icon: ArrowRight01Icon, side: "right-0", step: 1,
                      disabled: max !== undefined && t(addMonths(month, 1)) >= t(addMonths(max, 0)) };
                return (
                  <div key={offset} className="relative">
                    <button
                      type="button"
                      aria-label={nav.label}
                      disabled={nav.disabled}
                      onClick={() => setMonth(addMonths(month, nav.step))}
                      className={cn(
                        "absolute top-0 grid size-7 place-items-center rounded-[8px] text-muted-foreground transition-[scale,color] duration-150 ease-out-strong hover:bg-accent hover:text-heading active:scale-[0.94] disabled:opacity-40 disabled:hover:bg-transparent",
                        nav.side,
                      )}
                    >
                      <HugeiconsIcon icon={nav.icon} size={14} strokeWidth={2} />
                    </button>
                    <p className="flex h-7 items-center justify-center text-[13px] font-semibold text-heading">
                      {fmtMonth.format(m)}
                    </p>
                    <div role="grid" aria-label={fmtMonth.format(m)} className="mt-2 grid grid-cols-7">
                      <div role="row" className="contents">
                        {WEEKDAYS.map((w) => (
                          <span key={w} role="columnheader" className="grid h-7 place-items-center text-[11px] font-medium text-muted-foreground">
                            {w}
                          </span>
                        ))}
                      </div>
                      {weeksOf(m).map((week, row) => (
                        <div key={row} role="row" className="contents">
                          {week.map((day, col) => {
                            if (!day) return <span key={col} role="gridcell" className="size-9" />;
                            const time = t(day);
                            const start = time === lo;
                            const end = time === hi;
                            const inside = time > lo && time < hi;
                            const band = lo !== hi && (start || end || inside);
                            return (
                              <span key={col} role="gridcell" aria-selected={start || end || inside} className="relative size-9">
                                {band && (
                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      "absolute inset-y-0.5 bg-[#3358eb]/10",
                                      start ? "left-1/2 right-0" : end ? "left-0 right-1/2" : "inset-x-0",
                                      (inside || end) && (col === 0 || day.getDate() === 1) && "rounded-l-[10px]",
                                      (inside || start) && (col === 6 || day.getDate() === last) && "rounded-r-[10px]",
                                    )}
                                  />
                                )}
                                <button
                                  type="button"
                                  data-day={time}
                                  tabIndex={time === tabbable ? 0 : -1}
                                  disabled={outOfBounds(day)}
                                  aria-label={fmtLabel.format(day)}
                                  aria-current={time === t(today) ? "date" : undefined}
                                  onClick={() => pick(day)}
                                  onMouseEnter={() => setHover(day)}
                                  onFocus={() => {
                                    setFocused(day);
                                    setHover(day);
                                  }}
                                  className={cn(
                                    "relative grid size-full place-items-center rounded-[10px] text-[13px] tabular-nums text-heading transition-transform duration-150 ease-out-strong active:scale-[0.94] disabled:pointer-events-none disabled:text-muted-foreground/40",
                                    start || end
                                      ? to || !hover || time === t(from)
                                        ? "bg-[#3358eb] font-semibold text-white"
                                        : "font-semibold ring-1 ring-inset ring-[#3358eb]"
                                      : "hover:bg-accent",
                                    time === t(today) && !(start || end) && "font-semibold text-[#3358eb]",
                                  )}
                                >
                                  {day.getDate()}
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span aria-live="polite" className="text-xs text-muted-foreground">
                {status}
              </span>
              <button
                type="button"
                disabled={!from}
                onClick={() => emit({})}
                className="rounded-[8px] px-2 py-1 text-xs font-medium text-heading transition-[scale,opacity] duration-150 ease-out-strong hover:bg-accent active:scale-[0.97] disabled:opacity-40"
              >
                Clear
              </button>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
}
