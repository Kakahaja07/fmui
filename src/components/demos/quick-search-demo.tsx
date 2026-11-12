"use client";

import { useState } from "react";
import { QuickSearch } from "@/registry/components/quick-search/quick-search";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const TICK = 100;
const QUERIES = ["deploy", "preview", "invite"];
const STEPS = [1, 2, 0];

// One frame per tick: type the query a letter at a time, walk the highlight down
// the results (wrapping back to the top), then clear for the next query.
const FRAMES = QUERIES.flatMap((q) => [
  ...Array.from({ length: q.length }, (_, k) => ({ query: q.slice(0, k + 1), active: 0 })),
  ...STEPS.flatMap((active) => Array<{ query: string; active: number }>(9).fill({ query: q, active })),
  ...Array<{ query: string; active: number }>(5).fill({ query: "", active: 0 }),
]);

export default function QuickSearchDemo() {
  const [frame, setFrame] = useState(0);
  const [auto, setAuto] = useState(true);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const ref = useDemoLoop(() => setFrame((f) => (f + 1) % FRAMES.length), TICK, auto);

  const shown = auto ? FRAMES[frame] : { query, active };

  return (
    <div
      ref={ref}
      onFocusCapture={() => {
        if (!auto) return;
        setAuto(false);
        setQuery(FRAMES[frame].query);
        setActive(FRAMES[frame].active);
      }}
    >
      <QuickSearch
        value={shown.query}
        onValueChange={setQuery}
        activeIndex={shown.active}
        onActiveIndexChange={setActive}
      />
    </div>
  );
}
