"use client";

import { useState } from "react";
import { KanbanBoard, type KanbanCard } from "@/registry/components/kanban-board/kanban-board";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const ORDER = ["todo", "doing", "done"];

const INITIAL: KanbanCard[] = [
  { id: "hero", title: "Hero", column: "todo", accent: true },
  { id: "logo", title: "Logo pass", column: "todo" },
  { id: "copy", title: "Copy edits", column: "doing" },
  { id: "mood", title: "Moodboard", column: "done" },
  { id: "type", title: "Type test", column: "done" },
];

export default function KanbanBoardDemo() {
  const [cards, setCards] = useState(INITIAL);
  const [auto, setAuto] = useState(true);

  // Hero works its way across the board, then starts over.
  const ref = useDemoLoop(
    () =>
      setCards((current) => {
        const hero = current.find((c) => c.id === "hero")!;
        const column = ORDER[(ORDER.indexOf(hero.column) + 1) % ORDER.length];
        return [{ ...hero, column }, ...current.filter((c) => c.id !== "hero")];
      }),
    2600,
    auto,
  );

  return (
    <div ref={ref} onPointerDownCapture={() => setAuto(false)} onFocusCapture={() => setAuto(false)}>
      <KanbanBoard cards={cards} onCardsChange={setCards} trackedIds={["hero"]} />
    </div>
  );
}
