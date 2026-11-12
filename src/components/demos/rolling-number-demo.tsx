"use client";

import { useState } from "react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const currency = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function RollingNumberDemo() {
  const [value, setValue] = useState(12553.41);
  const [auto, setAuto] = useState(true);
  const ref = useDemoLoop(() => setValue((v) => Math.round((v + (Math.random() - 0.45) * 90) * 100) / 100), 1600, auto);
  const btn =
    "h-8 rounded-[8px] border border-border bg-background px-3 text-xs font-medium text-foreground transition-[background-color,scale] duration-150 ease-out-strong hover:bg-accent active:scale-[0.97]";

  function nudge(delta: number) {
    setAuto(false);
    setValue((v) => Math.round((v + delta) * 100) / 100);
  }

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="text-center">
        <RollingNumber
          value={value}
          format={currency}
          className="font-heading text-[40px] font-semibold leading-none tracking-[-0.03em] text-heading"
        />
        <p className="mt-2 text-xs text-muted-foreground">Portfolio balance</p>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className={btn} onClick={() => nudge(-48.27)}>
          -48.27
        </button>
        <button type="button" className={btn} onClick={() => nudge(31.9)}>
          +31.90
        </button>
        <button type="button" className={btn} onClick={() => nudge(1000)}>
          +1,000
        </button>
      </div>
    </div>
  );
}
