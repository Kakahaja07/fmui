"use client";

import { useId, useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { Clock01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface SpotlightResult {
  id: string;
  title: string;
  subtitle?: string;
  icon?: IconSvgElement;
}

export interface SpotlightSearchProps {
  results: SpotlightResult[];
  onSelect?: (result: SpotlightResult) => void;
  placeholder?: string;
  maxResults?: number;
  className?: string;
}

/**
 * A spotlight-style search box with inline results, recent queries, and
 * full keyboard navigation (arrow keys, Enter, Escape).
 */
export function SpotlightSearch({
  results,
  onSelect,
  placeholder = "Search anything...",
  maxResults = 6,
  className,
}: SpotlightSearchProps) {
  const [query, setQuery] = useState("");
  const [recents, setRecents] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const listId = useId();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return results
      .filter((r) => `${r.title} ${r.subtitle ?? ""}`.toLowerCase().includes(q))
      .slice(0, maxResults);
  }, [query, results, maxResults]);

  const showRecents = focused && !query.trim() && recents.length > 0;
  const open = focused && (matches.length > 0 || showRecents);

  function choose(r: SpotlightResult) {
    setRecents((prev) => [r.title, ...prev.filter((p) => p !== r.title)].slice(0, 4));
    setQuery("");
    setActiveIndex(0);
    onSelect?.(r);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && matches[activeIndex]) {
      e.preventDefault();
      choose(matches[activeIndex]);
    } else if (e.key === "Escape") {
      setQuery("");
      (e.target as HTMLInputElement).blur();
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex h-12 items-center gap-3 rounded-[14px] border border-border bg-background px-4 transition-[border-color,box-shadow] duration-200",
          focused && "border-border-strong shadow-float",
        )}
      >
        <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={2} className="text-muted-foreground" />
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={matches[activeIndex] ? `${listId}-${matches[activeIndex].id}` : undefined}
          aria-autocomplete="list"
          aria-label={placeholder}
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          className="h-full flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setQuery("")}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-[14px] border border-border bg-background p-1.5 shadow-float animate-in fade-in-0 zoom-in-[0.98] duration-150">
          {showRecents ? (
            <>
              <p className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Recent
              </p>
              {recents.map((r) => (
                <button
                  key={r}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setQuery(r)}
                  className="flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left text-sm text-foreground hover:bg-accent"
                >
                  <HugeiconsIcon icon={Clock01Icon} size={15} strokeWidth={2} className="text-muted-foreground" />
                  {r}
                </button>
              ))}
            </>
          ) : (
            <ul id={listId} role="listbox" aria-label="Search results">
              {matches.map((r, i) => (
                <li
                  key={r.id}
                  id={`${listId}-${r.id}`}
                  role="option"
                  aria-selected={i === activeIndex}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => choose(r)}
                  className={cn(
                    "flex cursor-default items-center gap-3 rounded-[8px] px-2.5 py-2 text-sm",
                    i === activeIndex ? "bg-accent text-foreground" : "text-foreground",
                  )}
                >
                  {r.icon && (
                    <span className="flex size-8 items-center justify-center rounded-[8px] border border-border bg-surface">
                      <HugeiconsIcon icon={r.icon} size={16} strokeWidth={2} className="text-muted-foreground" />
                    </span>
                  )}
                  <span className="flex flex-col">
                    <span className="font-medium">{r.title}</span>
                    {r.subtitle && <span className="text-xs text-muted-foreground">{r.subtitle}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
