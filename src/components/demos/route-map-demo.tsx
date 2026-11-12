"use client";

import { useState } from "react";
import { RouteMap, type Route } from "@/registry/components/route-map/route-map";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const ROUTES: Route[] = [
  {
    points: [
      [22, 142],
      [22, 112],
      [90, 112],
      [90, 20],
      [196, 20],
      [196, 50],
      [230, 50],
    ],
    label: "To client meeting",
    minutes: 12,
    miles: 2.5,
  },
  {
    points: [
      [230, 142],
      [168, 142],
      [168, 82],
      [64, 82],
      [64, 50],
      [22, 50],
    ],
    label: "Back to the studio",
    minutes: 12,
    miles: 2.5,
  },
];

const TICK = 40;
const DRIVE = 5000 / TICK;
const HOLD = 2200 / TICK;

export default function RouteMapDemo() {
  const [frame, setFrame] = useState(0);

  // Drive for ~5 s, hold on "Arrived", then head back the other way.
  const ref = useDemoLoop(() => setFrame((f) => (f + 1) % (2 * (DRIVE + HOLD))), TICK);

  const leg = Math.floor(frame / (DRIVE + HOLD));
  const step = frame % (DRIVE + HOLD);
  const t = Math.min(1, step / DRIVE);
  // Ease in and out like a car pulling away and parking.
  const progress = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

  return (
    <div ref={ref}>
      <RouteMap route={ROUTES[leg]} progress={progress} />
    </div>
  );
}
