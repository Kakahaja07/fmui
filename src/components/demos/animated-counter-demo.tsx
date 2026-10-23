"use client";

import { useState } from "react";
import { AnimatedCounter } from "@/registry/components/animated-counter/animated-counter";

export default function AnimatedCounterDemo() {
  const [value, setValue] = useState(12480);
  const btn =
    "h-8 rounded-[8px] border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent active:scale-[0.97]";
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-[40px] font-semibold leading-none tracking-[-0.03em] text-foreground">
          <AnimatedCounter value={value} />
        </p>
        <p className="mt-2 text-xs text-muted-foreground">Downloads this month</p>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className={btn} onClick={() => setValue((v) => v + Math.round(500 + Math.random() * 3000))}>
          Add more
        </button>
        <button type="button" className={btn} onClick={() => setValue(Math.round(Math.random() * 50000))}>
          Random
        </button>
        <button type="button" className={btn} onClick={() => setValue(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}
