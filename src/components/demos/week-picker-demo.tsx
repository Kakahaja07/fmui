"use client";

import { useState } from "react";
import { WeekPicker } from "@/registry/components/week-picker/week-picker";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

export default function WeekPickerDemo() {
  const [day, setDay] = useState(11);
  const [auto, setAuto] = useState(true);

  // Hop to a different day of the week (9-15), like someone browsing their schedule.
  const ref = useDemoLoop(
    () => setDay((d) => 9 + ((d - 9 + 1 + Math.floor(Math.random() * 6)) % 7)),
    2000,
    auto,
  );

  return (
    <div ref={ref}>
      <WeekPicker
        value={day}
        onValueChange={(next) => {
          setAuto(false);
          setDay(next);
        }}
      />
    </div>
  );
}
