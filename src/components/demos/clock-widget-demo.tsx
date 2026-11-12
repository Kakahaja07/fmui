"use client";

import { useState } from "react";
import { ClockWidget } from "@/registry/components/clock-widget/clock-widget";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

// Tuesday, Nov 10, 9:41 in New York.
const START = Date.UTC(2026, 10, 10, 14, 41);
const MINUTES = 8;
const TEMPS = [69, 69, 69, 70, 70, 70, 69, 69];

export default function ClockWidgetDemo() {
  const [step, setStep] = useState(0);

  // Fast-forward a minute at a time, then loop back to 9:41.
  const ref = useDemoLoop(() => setStep((s) => (s + 1) % MINUTES), 1500);

  return (
    <div ref={ref}>
      <ClockWidget date={new Date(START + step * 60000)} temperature={TEMPS[step]} />
    </div>
  );
}
