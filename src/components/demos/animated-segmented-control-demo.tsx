"use client";

import { useState } from "react";
import { AnimatedSegmentedControl } from "@/registry/components/animated-segmented-control/animated-segmented-control";

const views = [
  { value: "list", label: "List" },
  { value: "board", label: "Board" },
  { value: "calendar", label: "Calendar" },
];

export default function AnimatedSegmentedControlDemo() {
  const [view, setView] = useState("list");
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatedSegmentedControl aria-label="View" options={views} value={view} onValueChange={setView} />
      <AnimatedSegmentedControl
        aria-label="Theme"
        size="sm"
        options={[
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
          { value: "system", label: "System" },
        ]}
        defaultValue="system"
      />
      <p className="text-xs text-muted-foreground">
        Showing the <span className="font-medium text-foreground">{view}</span> view
      </p>
    </div>
  );
}
