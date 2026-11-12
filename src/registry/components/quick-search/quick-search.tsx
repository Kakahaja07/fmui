"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface SearchCommand {
  id: string;
  label: string;
  /** Extra words the query can match besides the label. */
  keywords?: string[];
}

export interface QuickSearchProps {
  commands?: SearchCommand[];
  onSelect?: (command: SearchCommand) => void;
  placeholder?: string;
  /** The query (controlled). */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Highlighted row within the current results (controlled). */
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
}

const DEFAULT_COMMANDS: SearchCommand[] = [
  { id: "deploy-prod", label: "Deploy to production" },
  { id: "deploy-staging", label: "Deploy to staging" },
  { id: "rollback", label: "Rollback last deploy" },
  { id: "open-preview", label: "Open preview link" },
  { id: "preview-mobile", label: "Preview on mobile" },
  { id: "share-preview", label: "Share preview" },
  { id: "invite-client", label: "Invite a client" },
  { id: "invite-teammate", label: "Invite teammate" },
  { id: "copy-invite", label: "Copy invite link" },
];

const ROW = 28;
const VISIBLE_ROWS = 3;

/** Every query word must start some word of the label or keywords. Empty queries show nothing. */
function match(commands: SearchCommand[], query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return commands.filter((c) => {
    const words = [c.label, ...(c.keywords ?? [])].join(" ").toLowerCase().split(/\s+/);
    return terms.every((t) => words.some((w) => w.startsWith(t)));
  });
}

/** A command search with a sliding highlight. Arrows move, Enter runs, Escape clears. */
export function QuickSearch({
  commands = DEFAULT_COMMANDS,
  onSelect,
  placeholder = "Search commands",
  value: valueProp,
  defaultValue = "",
  onValueChange,
  activeIndex: activeProp,
  onActiveIndexChange,
  className,
}: QuickSearchProps) {
  const id = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [valueState, setValueState] = useState(defaultValue);
  const [activeState, setActiveState] = useState(0);
  const query = valueProp ?? valueState;
  const results = match(commands, query);
  const active = Math.min(activeProp ?? activeState, results.length - 1);

  function setActive(index: number) {
    if (activeProp === undefined) setActiveState(index);
    onActiveIndexChange?.(index);
  }

  function setQuery(next: string) {
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
    setActive(0);
  }

  // Keep the highlighted row inside the scroll area without moving the page.
  useEffect(() => {
    const list = listRef.current;
    if (!list || active < 0) return;
    const top = active * ROW;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (top + ROW > list.scrollTop + list.clientHeight) list.scrollTop = top + ROW - list.clientHeight;
  }, [active]);

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const n = results.length;
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && n) {
      e.preventDefault();
      setActive((active + (e.key === "ArrowDown" ? 1 : -1) + n) % n);
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      onSelect?.(results[active]);
    } else if (e.key === "Escape" && query) {
      e.preventDefault();
      setQuery("");
    }
  }

  return (
    <div className={cn("w-[280px] rounded-[24px] bg-background p-3 shadow-card", className)}>
      <div className="flex items-center gap-2 border-b border-border px-2 pb-2.5 pt-1">
        <HugeiconsIcon icon={Search01Icon} size={14} strokeWidth={1.8} className="shrink-0 text-muted-foreground" />
        <input
          role="combobox"
          aria-label={placeholder}
          aria-expanded={results.length > 0}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${id}-${results[active].id}` : undefined}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-[13px] text-heading caret-[#3358eb] outline-none placeholder:text-muted-foreground"
        />
        <kbd aria-hidden="true" className="rounded-[6px] bg-accent px-1.5 py-0.5 font-sans text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>
      <div ref={listRef} className="relative mt-2 overflow-y-auto" style={{ height: ROW * VISIBLE_ROWS }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 rounded-[8px] bg-[#3358eb]/10 transition-[transform,opacity] duration-150 ease-out-strong motion-reduce:transition-opacity"
          style={{ height: ROW, transform: `translateY(${Math.max(active, 0) * ROW}px)`, opacity: active < 0 ? 0 : 1 }}
        />
        <ul role="listbox" id={`${id}-list`} aria-label="Commands" className="relative">
          {results.map((command, i) => (
            <li
              key={command.id}
              id={`${id}-${command.id}`}
              role="option"
              aria-selected={i === active}
              onPointerMove={() => i !== active && setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelect?.(command)}
              className={cn(
                "flex cursor-pointer items-center justify-between px-2 text-xs transition-[color,opacity] duration-150 starting:opacity-0",
                i === active ? "font-medium text-[#3358eb]" : "text-heading",
              )}
              style={{ height: ROW }}
            >
              <span className="truncate">{command.label}</span>
              <span aria-hidden="true" className={cn("transition-opacity duration-150", i === active ? "opacity-100" : "opacity-0")}>
                ↵
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
