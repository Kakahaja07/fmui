"use client";

import { useState } from "react";
import { PortfolioChart } from "@/registry/components/portfolio-chart/portfolio-chart";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const SNAPSHOTS = [
  { value: 12553.41, change: 2.9 },
  { value: 12530.9, change: 2.8 },
  { value: 12601.25, change: 3.1 },
  { value: 12480.32, change: 2.4 },
  { value: 12512.08, change: 2.6 },
  { value: 12497.6, change: 2.5 },
];

/** A wavy, deterministic series per snapshot so server and client render the same line. */
function seriesFor(seed: number, end: number) {
  return Array.from({ length: 14 }, (_, i) => {
    const wave = Math.sin(i * 0.9 + seed * 1.7) * 40 + Math.sin(i * 2.3 + seed) * 18;
    return end - 60 + wave + (i / 13) * 50;
  });
}

const DATA = SNAPSHOTS.map((s, i) => ({ ...s, series: seriesFor(i, s.value) }));

export default function PortfolioChartDemo() {
  const [index, setIndex] = useState(0);
  const ref = useDemoLoop(() => setIndex((i) => (i + 1) % DATA.length), 2000);
  const { value, change, series } = DATA[index];

  return (
    <div ref={ref}>
      <PortfolioChart value={value} change={change} series={series} />
    </div>
  );
}
