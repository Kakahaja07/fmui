"use client";

import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target?: string;
  /** ISO timestamp. */
  at: string;
  type: string;
  icon: IconSvgElement;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  /** Filter chips. The first entry should be an "all" option with value "all". */
  filters: { value: string; label: string }[];
  /** Reference time used to compute relative labels. Defaults to the latest item. */
  now?: string;
  className?: string;
}

function relative(from: Date, to: Date) {
  const diff = Math.max(0, to.getTime() - from.getTime());
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

function dayLabel(date: Date, now: Date) {
  const sameDay = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (sameDay) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ActivityFeed({ items, filters, now, className }: ActivityFeedProps) {
  const [filter, setFilter] = useState(filters[0]?.value ?? "all");
  const reference = useMemo(
    () => new Date(now ?? items.reduce((a, b) => (a > b.at ? a : b.at), items[0]?.at ?? "")),
    [now, items],
  );

  const groups = useMemo(() => {
    const visible = items
      .filter((i) => filter === "all" || i.type === filter)
      .sort((a, b) => b.at.localeCompare(a.at));
    const map = new Map<string, ActivityItem[]>();
    for (const item of visible) {
      const key = dayLabel(new Date(item.at), reference);
      map.set(key, [...(map.get(key) ?? []), item]);
    }
    return Array.from(map.entries());
  }, [items, filter, reference]);

  return (
    <div className={cn("w-full max-w-md rounded-[14px] border border-border bg-background", className)}>
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border p-2 no-scrollbar" role="tablist" aria-label="Filter activity">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "h-7 shrink-0 rounded-[7px] px-2.5 text-xs font-medium transition-colors",
              filter === f.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="max-h-80 overflow-y-auto px-4 py-3">
        {groups.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No activity yet.</p>}
        {groups.map(([day, list]) => (
          <section key={day} className="mb-4 last:mb-0">
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{day}</h4>
            <ul className="flex flex-col">
              {list.map((item) => (
                <li
                  key={item.id}
                  className="relative flex gap-3 py-2 animate-in fade-in-0 duration-200 before:absolute before:left-[15px] before:top-9 before:h-[calc(100%-20px)] before:w-px before:bg-border last:before:hidden"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
                    <HugeiconsIcon icon={item.icon} size={15} strokeWidth={2} className="text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-5 text-foreground">
                      <span className="font-medium">{item.actor}</span> {item.action}
                      {item.target && <span className="font-medium"> {item.target}</span>}
                    </p>
                    <time dateTime={item.at} className="text-xs text-muted-foreground">
                      {relative(new Date(item.at), reference)}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
