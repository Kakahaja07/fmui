"use client";

import { useState } from "react";
import { ActivityRings } from "@/registry/components/activity-rings/activity-rings";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const DAYS = [
  [82, 64, 76],
  [95, 80, 70],
  [68, 92, 55],
  [100, 74, 88],
];

export default function ActivityRingsDemo() {
  const [day, setDay] = useState(0);
  const ref = useDemoLoop(() => setDay((d) => (d + 1) % DAYS.length), 3000);
  const [move, exercise, stand] = DAYS[day];

  return (
    <div ref={ref}>
      <ActivityRings
        rings={[
          { label: "Move", value: move, color: "#3358eb" },
          { label: "Exercise", value: exercise, color: "#7b95f3" },
          { label: "Stand", value: stand, color: "#c9d4fb" },
        ]}
      />
    </div>
  );
}
