"use client";

import { useState } from "react";
import { BatteryLevels, type BatteryDevice } from "@/registry/components/battery-levels/battery-levels";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const INITIAL: BatteryDevice[] = [
  { name: "Phone", level: 83, charging: true },
  { name: "Watch", level: 46 },
  { name: "Laptop", level: 68, charging: true },
];

export default function BatteryLevelsDemo() {
  const [devices, setDevices] = useState(INITIAL);
  const [tick, setTick] = useState(0);

  // Chargers gain 1% per tick; the watch loses 1% every fourth tick.
  const ref = useDemoLoop(() => {
    setDevices((list) =>
      list.map((d, i) => {
        if (d.charging) return { ...d, level: d.level >= 100 ? INITIAL[i].level : d.level + 1 };
        if (tick % 4 !== 3) return d;
        return { ...d, level: d.level <= 20 ? INITIAL[i].level : d.level - 1 };
      }),
    );
    setTick(tick + 1);
  }, 1500);

  return (
    <div ref={ref}>
      <BatteryLevels devices={devices} />
    </div>
  );
}
