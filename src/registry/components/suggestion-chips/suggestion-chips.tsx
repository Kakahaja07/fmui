"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface Suggestion {
  id: string;
  label: string;
  icon?: IconSvgElement;
}

export interface SuggestionChipsProps {
  suggestions: Suggestion[];
  onSelect?: (suggestion: Suggestion) => void;
  /** Whether the chips are shown. Hiding plays them out; showing staggers them back in. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Shows a dismiss button at the end of the row. */
  dismissible?: boolean;
  /** Accessible name of the toolbar. */
  label?: string;
  className?: string;
}

const STAGGER = 45;

/**
 * Follow-up prompts shown under a response. A new set of suggestions (new ids)
 * remounts the row, so every set staggers in from the start.
 */
export function SuggestionChips(props: SuggestionChipsProps) {
  return <ChipRow key={props.suggestions.map((s) => s.id).join("|")} {...props} />;
}

function ChipRow({
  suggestions,
  onSelect,
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  dismissible = false,
  label = "Suggested follow-ups",
  className,
}: SuggestionChipsProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const [selected, setSelected] = useState<string | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const count = suggestions.length + (dismissible ? 1 : 0);

  function setOpen(next: boolean) {
    if (openProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  }

  // Roving tabindex: one tab stop for the row, arrows move between chips. Focus moves are never animated.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowRight: focusIndex + 1,
      ArrowDown: focusIndex + 1,
      ArrowLeft: focusIndex - 1,
      ArrowUp: focusIndex - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = (moves[e.key] + count) % count;
    setFocusIndex(next);
    rowRef.current?.querySelectorAll<HTMLButtonElement>("[data-chip]")[next]?.focus();
  }

  const chipClass = (extra: string | false) =>
    cn(
      "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium outline-none",
      "transition-[opacity,translate,scale,background-color,border-color,color] duration-200 ease-out-strong active:scale-[0.97]",
      "focus-visible:ring-2 focus-visible:ring-[#3358eb]/40",
      "starting:translate-y-1.5 starting:opacity-0 motion-reduce:starting:translate-y-0",
      extra,
      !open && "pointer-events-none translate-y-1 opacity-0 duration-150 motion-reduce:translate-y-0",
    );

  // Only the entrance (opacity, translate) is staggered; press and color feedback stay instant.
  const stagger = (i: number) => {
    const d = open && !selected ? i * STAGGER : 0;
    return { transitionDelay: `${d}ms, ${d}ms, 0ms, 0ms, 0ms, 0ms` };
  };

  return (
    <div
      ref={rowRef}
      role="toolbar"
      aria-label={label}
      inert={!open}
      onKeyDown={onKeyDown}
      className={cn("flex w-[360px] flex-wrap gap-2", className)}
    >
      {suggestions.map((s, i) => {
        const isSelected = selected === s.id;
        return (
          <button
            key={s.id}
            type="button"
            data-chip
            tabIndex={i === focusIndex ? 0 : -1}
            onFocus={() => setFocusIndex(i)}
            onClick={() => {
              setSelected(s.id);
              onSelect?.(s);
            }}
            style={stagger(i)}
            className={chipClass(
              cn(
                isSelected
                  ? "border-transparent bg-[#3358eb] text-white"
                  : "border-border bg-background text-heading shadow-xs hover:border-border-strong",
                selected && !isSelected && "opacity-50",
              ),
            )}
          >
            {s.icon && (
              <HugeiconsIcon
                icon={s.icon}
                size={14}
                strokeWidth={2}
                aria-hidden="true"
                className={isSelected ? "text-white" : "text-muted-foreground"}
              />
            )}
            {s.label}
          </button>
        );
      })}
      {dismissible && (
        <button
          type="button"
          data-chip
          aria-label="Dismiss suggestions"
          tabIndex={focusIndex === suggestions.length ? 0 : -1}
          onFocus={() => setFocusIndex(suggestions.length)}
          onClick={() => setOpen(false)}
          style={stagger(suggestions.length)}
          className={chipClass("w-8 justify-center border-transparent px-0 text-muted-foreground hover:text-heading")}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
