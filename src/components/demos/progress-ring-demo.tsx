"use client";

import { useState } from "react";
import { ProgressRing } from "@/registry/components/progress-ring/progress-ring";

export default function ProgressRingDemo() {
  const [value, setValue] = useState(64);
  const btn =
    "h-8 rounded-[8px] border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent active:scale-[0.97]";
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-6">
        <ProgressRing value={value} label="Storage" />
        <ProgressRing value={value} size={56} strokeWidth={5} label="Small" />
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className={btn} onClick={() => setValue((v) => Math.max(0, v - 15))}>
          -15
        </button>
        <button type="button" className={btn} onClick={() => setValue((v) => Math.min(100, v + 15))}>
          +15
        </button>
        <button type="button" className={btn} onClick={() => setValue(Math.round(Math.random() * 100))}>
          Random
        </button>
      </div>
    </div>
  );
}
