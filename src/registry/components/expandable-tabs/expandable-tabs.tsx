"use client";

import { useId, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export interface ExpandableTab {
  id: string;
  label: string;
  icon: IconSvgElement;
}

export interface ExpandableTabsProps {
  tabs: ExpandableTab[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  className?: string;
}

/**
 * Icon-only tabs that expand to show their label when selected.
 * The label animates with a grid-template-columns transition so the
 * expansion runs on the compositor-friendly path without measuring.
 */
export function ExpandableTabs({ tabs, value, defaultValue, onValueChange, className }: ExpandableTabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id);
  const selected = value ?? internal;
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(id: string) {
    setInternal(id);
    onValueChange?.(id);
  }

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(tabs[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "inline-flex items-center gap-1 rounded-[12px] border border-border bg-background p-1 shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
        className,
      )}
    >
      {tabs.map((tab, i) => {
        const active = tab.id === selected;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-${tab.id}`}
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => select(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "flex h-9 items-center rounded-[9px] px-2.5 text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out-strong active:scale-[0.97]",
              active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
            )}
          >
            <HugeiconsIcon icon={tab.icon} size={18} strokeWidth={2} className="shrink-0" />
            <span
              className="grid transition-[grid-template-columns] duration-250 ease-out-strong"
              style={{ gridTemplateColumns: active ? "1fr" : "0fr" }}
              aria-hidden={!active}
            >
              <span className="overflow-hidden whitespace-nowrap">
                <span className="block pl-2 pr-0.5">{tab.label}</span>
              </span>
            </span>
            {!active && <span className="sr-only">{tab.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
