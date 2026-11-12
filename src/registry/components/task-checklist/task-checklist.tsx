"use client";

import { useState } from "react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface TaskChecklistProps {
  items?: ChecklistItem[];
  /** Ids of the checked items (controlled). */
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  title?: string;
  className?: string;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: "wireframe", label: "Wireframe the hero" },
  { id: "type", label: "Pick a type scale" },
  { id: "grid", label: "Build the grid" },
  { id: "ship", label: "Ship it" },
];

/** A to-do list whose checks draw in and whose done items get struck through. */
export function TaskChecklist({
  items = DEFAULT_ITEMS,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  title = "Today",
  className,
}: TaskChecklistProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const value = valueProp ?? valueState;
  const done = items.filter((item) => value.includes(item.id)).length;

  function toggle(id: string, checked: boolean) {
    const next = checked ? [...value, id] : value.filter((v) => v !== id);
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  }

  return (
    <div className={cn("w-60 rounded-[24px] bg-accent p-4", className)}>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-[13px]/[14px] font-semibold text-heading">{title}</h3>
        <span className="flex text-xs text-muted-foreground">
          <RollingNumber value={done} />
          &nbsp;of {items.length} done
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          const checked = value.includes(item.id);
          return (
            <li key={item.id}>
              <label className="flex cursor-pointer select-none items-center gap-2.5 rounded-[12px] bg-background px-3 py-2.5 shadow-xs transition-transform duration-150 ease-out-strong active:scale-[0.98] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={(e) => toggle(item.id, e.target.checked)}
                />
                <span aria-hidden="true" className="relative size-4 shrink-0 rounded-[5px] border-[1.5px] border-heading/25">
                  <span
                    className={cn(
                      "absolute -inset-[1.5px] rounded-[5px] bg-[#3358eb] transition-[opacity,scale] duration-200 ease-out-strong motion-reduce:transition-opacity",
                      checked ? "scale-100 opacity-100" : "scale-90 opacity-0",
                    )}
                  />
                  <svg viewBox="0 0 16 16" fill="none" className="absolute -inset-[1.5px] text-white">
                    <path
                      d="M4.5 8.5l2.2 2.2 4.8-5"
                      pathLength={1}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="1"
                      className={cn(
                        "transition-[stroke-dashoffset] ease-out-strong motion-reduce:transition-none",
                        checked ? "delay-75 duration-300" : "duration-150",
                      )}
                      style={{ strokeDashoffset: checked ? 0 : 1 }}
                    />
                  </svg>
                </span>
                <span
                  className={cn(
                    "relative truncate text-xs transition-colors duration-200",
                    checked ? "text-muted-foreground" : "text-heading",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 top-1/2 h-px origin-left bg-current transition-transform duration-300 ease-out-strong motion-reduce:transition-none",
                      checked ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
