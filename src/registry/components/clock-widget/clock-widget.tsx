"use client";

import { useSyncExternalStore } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon } from "@hugeicons/core-free-icons";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface ClockWidgetProps {
  city?: string;
  /** IANA time zone the clock shows, e.g. "Europe/Lisbon". */
  timeZone?: string;
  /** In whatever unit you display; only the number and a degree sign are shown. */
  temperature?: number;
  condition?: string;
  /** Show this moment instead of the live time. */
  date?: Date;
  className?: string;
}

// One shared minute counter: re-renders only when the minute changes.
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
};
const currentMinute = () => Math.floor(Date.now() / 60000);
const noMinute = () => null;

const twoDigits = (n: number) => String(n).padStart(2, "0");

/** A world clock tile with rolling minutes, the local date, and the weather. */
export function ClockWidget({
  city = "New York",
  timeZone = "America/New_York",
  temperature = 69,
  condition = "Sunny",
  date,
  className,
}: ClockWidgetProps) {
  const minute = useSyncExternalStore(subscribe, currentMinute, noMinute);
  const now = date ?? (minute === null ? null : new Date(minute * 60000));

  let hhmm: number | null = null;
  let day = "";
  if (now) {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "numeric", hour12: true })
      .formatToParts(now)
      .reduce<Record<string, string>>((acc, p) => ({ ...acc, [p.type]: p.value }), {});
    hhmm = Number(parts.hour) * 100 + Number(parts.minute);
    day = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long", month: "short", day: "numeric" }).format(now);
  }

  return (
    <section
      aria-label={`Time in ${city}`}
      className={cn("flex w-44 flex-col rounded-[24px] bg-background p-4 shadow-card", className)}
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px]/[16px] font-medium text-heading">{city}</p>
        <HugeiconsIcon icon={Sun03Icon} size={16} strokeWidth={2} className="text-[#f2a91c]" aria-hidden="true" />
      </div>
      <p className="mt-2 font-heading text-[38px]/[44px] font-semibold tracking-[-0.03em] text-heading">
        {hhmm === null ? (
          <span className="invisible">0:00</span>
        ) : (
          <RollingNumber value={hhmm} format={(n) => `${Math.floor(n / 100)}:${twoDigits(n % 100)}`} />
        )}
      </p>
      <p className="min-h-4 text-xs text-muted-foreground">{day}</p>
      <p className="mt-6 flex items-baseline gap-1.5 text-[13px]">
        <RollingNumber value={temperature} format={(n) => `${n}°`} className="font-semibold text-heading" />
        <span className="text-muted-foreground">{condition}</span>
      </p>
    </section>
  );
}
