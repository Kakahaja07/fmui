"use client";

import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { RefreshIcon } from "@hugeicons/core-free-icons";
import { TextReveal } from "@/registry/components/text-reveal/text-reveal";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

export default function TextRevealDemo() {
  const [run, setRun] = useState(0);
  const [auto, setAuto] = useState(true);
  const scroller = useRef<HTMLDivElement>(null);

  // Remounting replays the one-shot reveal.
  const ref = useDemoLoop(() => setRun((r) => r + 1), 4000, auto);

  return (
    <div ref={ref} className="flex w-[340px] flex-col gap-2 rounded-[24px] bg-accent p-3">
      <div className="rounded-[16px] bg-background p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">On view</p>
          <button
            type="button"
            onClick={() => {
              setAuto(false);
              setRun((r) => r + 1);
            }}
            className="inline-flex h-7 items-center gap-1 rounded-[8px] px-2 text-xs font-medium text-muted-foreground transition-transform duration-150 ease-out-strong hover:text-heading active:scale-[0.97]"
          >
            <HugeiconsIcon icon={RefreshIcon} size={13} strokeWidth={2} aria-hidden="true" />
            Replay
          </button>
        </div>
        <TextReveal key={run} text="Interfaces that feel right, down to every word." className="mt-2" />
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        aria-label="Scroll-linked example"
        className="relative h-[200px] overflow-y-auto rounded-[16px] bg-background px-4 shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#3358eb]/40"
      >
        <p className="sticky top-0 bg-background pb-2 pt-4 text-xs text-muted-foreground">Scroll ↓</p>
        <div className="h-[150px]" />
        <TextReveal
          mode="scroll"
          scrollContainer={scroller}
          as="p"
          text="Every detail compounds. Scroll, and the sentence lights up one word at a time."
        />
        <div className="h-[180px]" />
      </div>
    </div>
  );
}
