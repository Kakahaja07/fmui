"use client";

import { useState } from "react";
import { TaskChecklist } from "@/registry/components/task-checklist/task-checklist";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const ITEMS = [
  { id: "wireframe", label: "Wireframe the hero" },
  { id: "type", label: "Pick a type scale" },
  { id: "grid", label: "Build the grid" },
  { id: "ship", label: "Ship it" },
];

export default function TaskChecklistDemo() {
  const [value, setValue] = useState<string[]>([]);
  const [auto, setAuto] = useState(true);

  // Tick one task a second; once all are done, hold for a beat and start the day over.
  const ref = useDemoLoop(
    () => setValue((v) => (v.length < ITEMS.length ? [...v, ITEMS[v.length].id] : [])),
    1000,
    auto,
  );

  return (
    <div ref={ref}>
      <TaskChecklist
        items={ITEMS}
        value={value}
        onValueChange={(next) => {
          setAuto(false);
          setValue(next);
        }}
      />
    </div>
  );
}
