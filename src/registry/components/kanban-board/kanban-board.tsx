"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface KanbanColumn {
  id: string;
  title: string;
}

export interface KanbanCard {
  id: string;
  title: string;
  /** Id of the column the card sits in. */
  column: string;
  /** Marks the card with a blue dot. */
  accent?: boolean;
}

export interface KanbanBoardProps {
  title?: string;
  columns?: KanbanColumn[];
  cards?: KanbanCard[];
  defaultCards?: KanbanCard[];
  onCardsChange?: (cards: KanbanCard[]) => void;
  /** Cards counted in the percent; each counts by how far along the columns it is. Defaults to every card. */
  trackedIds?: string[];
  className?: string;
}

const DEFAULT_COLUMNS: KanbanColumn[] = [
  { id: "todo", title: "To do" },
  { id: "doing", title: "Doing" },
  { id: "done", title: "Done" },
];

const DEFAULT_CARDS: KanbanCard[] = [
  { id: "logo", title: "Logo pass", column: "todo" },
  { id: "hero", title: "Hero", column: "doing", accent: true },
  { id: "copy", title: "Copy edits", column: "doing" },
  { id: "mood", title: "Moodboard", column: "done" },
  { id: "type", title: "Type test", column: "done" },
];

const GLIDE = { duration: 0.42, ease: [0.77, 0, 0.175, 1] } as const;
const SETTLE = { duration: 0.3, ease: [0.23, 1, 0.32, 1] } as const;

/** A small board whose cards lift and glide between columns. Arrow keys move the focused card. */
export function KanbanBoard({
  title = "Sprint",
  columns = DEFAULT_COLUMNS,
  cards: cardsProp,
  defaultCards = DEFAULT_CARDS,
  onCardsChange,
  trackedIds,
  className,
}: KanbanBoardProps) {
  const [cardsState, setCardsState] = useState(defaultCards);
  const cards = cardsProp ?? cardsState;
  const reduce = useReducedMotion();
  const pendingFocus = useRef<string | null>(null);

  // Lift whichever card just changed column, whether the change came from the user or from props.
  const [prevCards, setPrevCards] = useState(cards);
  const [lift, setLift] = useState<{ id: string } | null>(null);
  if (prevCards !== cards) {
    setPrevCards(cards);
    const moved = cards.find((c) => {
      const before = prevCards.find((p) => p.id === c.id);
      return before && before.column !== c.column;
    });
    if (moved) setLift({ id: moved.id });
  }
  useEffect(() => {
    if (!lift) return;
    const t = window.setTimeout(() => setLift(null), 700);
    return () => window.clearTimeout(t);
  }, [lift]);

  const indexOf = (columnId: string) => columns.findIndex((c) => c.id === columnId);
  const tracked = trackedIds ? cards.filter((c) => trackedIds.includes(c.id)) : cards;
  const percent = tracked.length
    ? Math.round((tracked.reduce((sum, c) => sum + indexOf(c.column), 0) / tracked.length / (columns.length - 1)) * 100)
    : 0;

  function moveTo(id: string, columnId: string) {
    const card = cards.find((c) => c.id === id);
    if (!card || card.column === columnId) return;
    // A moved card lands at the top of its new column.
    const next = [{ ...card, column: columnId }, ...cards.filter((c) => c.id !== id)];
    if (cardsProp === undefined) setCardsState(next);
    onCardsChange?.(next);
  }

  function onKeyDown(e: KeyboardEvent, card: KanbanCard) {
    const step = e.key === "ArrowRight" || e.key === "]" ? 1 : e.key === "ArrowLeft" || e.key === "[" ? -1 : 0;
    const target = columns[indexOf(card.column) + step];
    if (!step || !target) return;
    e.preventDefault();
    pendingFocus.current = card.id;
    moveTo(card.id, target.id);
  }

  return (
    <div className={cn("w-[304px] rounded-[24px] bg-accent p-4", className)}>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-[13px]/[14px] font-semibold text-heading">{title}</h3>
        <RollingNumber value={percent} format={(n) => `${n}%`} className="text-xs text-muted-foreground" />
      </div>
      <LayoutGroup>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map((column) => (
            <div key={column.id} data-column={column.id} className="min-h-32 rounded-[12px] bg-heading/[0.05] p-1.5">
              <p className="px-1 pb-1.5 pt-0.5 text-[10px] text-muted-foreground">{column.title}</p>
              <ul aria-label={column.title} className="flex flex-col gap-1.5">
                {cards
                  .filter((card) => card.column === column.id)
                  .map((card) => {
                    const lifted = !reduce && lift?.id === card.id;
                    return (
                      <motion.li
                        key={card.id}
                        layoutId={reduce ? undefined : `kanban-${card.id}`}
                        ref={(el) => {
                          if (el && pendingFocus.current === card.id) {
                            pendingFocus.current = null;
                            el.focus();
                          }
                        }}
                        tabIndex={0}
                        aria-label={`${card.title}, ${column.title}. Use arrow keys to move.`}
                        onKeyDown={(e) => onKeyDown(e, card)}
                        drag={!reduce}
                        dragSnapToOrigin
                        whileDrag={{ rotate: 3, scale: 1.03, zIndex: 20 }}
                        onDragEnd={(_, info) => {
                          const hit = document
                            .elementsFromPoint(info.point.x - window.scrollX, info.point.y - window.scrollY)
                            .map((el) => el.closest<HTMLElement>("[data-column]"))
                            .find(Boolean);
                          if (hit?.dataset.column) moveTo(card.id, hit.dataset.column);
                        }}
                        initial={{ rotate: 0, scale: 1 }}
                        animate={{ rotate: lifted ? 3 : 0, scale: lifted ? 1.03 : 1 }}
                        transition={{ layout: GLIDE, default: SETTLE }}
                        className={cn(
                          "relative flex cursor-grab items-center gap-1.5 rounded-[8px] bg-background px-1.5 py-1.5 text-[11px]/[14px] text-heading shadow-xs active:cursor-grabbing",
                          lifted && "z-10",
                          card.accent && "font-semibold",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_8px_18px_-6px_rgb(0_0_0/0.22)] transition-opacity duration-300 ease-out-strong",
                            lifted ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {card.accent && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#3358eb]" />}
                        <span className="truncate">{card.title}</span>
                      </motion.li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
}
