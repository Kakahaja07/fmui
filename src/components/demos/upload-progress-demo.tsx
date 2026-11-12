"use client";

import { useState } from "react";
import { UploadCard } from "@/registry/components/upload-progress/upload-progress";
import { useDemoLoop } from "@/components/demos/use-demo-loop";
import { cn } from "@/lib/utils";

const FILES = ["hero-v3.fig", "brand-kit.zip", "reel-cut.mp4"];
// Uneven jumps, like a real network: ~3 s to finish at 400 ms per tick.
const STEPS = [0, 12, 34, 48, 58, 81, 92, 100];
const HOLD = 4; // ticks to show the done state (~1.6 s)

export default function UploadCardDemo() {
  const [tick, setTick] = useState(0);
  const [file, setFile] = useState(0);

  const ref = useDemoLoop(() => {
    if (tick < STEPS.length + HOLD) {
      setTick(tick + 1);
    } else {
      setTick(0);
      setFile((f) => (f + 1) % FILES.length);
    }
  }, 400);

  // The last hold tick fades the tile out; the next file fades it back in.
  const fading = tick === STEPS.length + HOLD;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,filter] duration-300 ease-out-strong",
        fading && "opacity-0 blur-[4px]",
      )}
    >
      <UploadCard key={file} fileName={FILES[file]} progress={STEPS[Math.min(tick, STEPS.length - 1)]} />
    </div>
  );
}
