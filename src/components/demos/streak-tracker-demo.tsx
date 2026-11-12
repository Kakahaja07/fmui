"use client";

import { useState } from "react";
import { StreakTracker } from "@/registry/components/streak-tracker/streak-tracker";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

export default function StreakTrackerDemo() {
  const [days, setDays] = useState(16);

  // One more day every second; wrap before the number gets silly.
  const ref = useDemoLoop(() => setDays((d) => (d >= 99 ? 16 : d + 1)), 1000);

  return (
    <div ref={ref}>
      <StreakTracker days={days} />
    </div>
  );
}
