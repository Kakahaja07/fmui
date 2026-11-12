"use client";

import { useState } from "react";
import { ThemeSwitch } from "@/registry/components/theme-switch/theme-switch";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

export default function ThemeSwitchDemo() {
  const [dark, setDark] = useState(false);
  const [auto, setAuto] = useState(true);

  const ref = useDemoLoop(() => setDark((d) => !d), 3000, auto);

  return (
    <div ref={ref}>
      <ThemeSwitch
        checked={dark}
        onCheckedChange={(next) => {
          setAuto(false);
          setDark(next);
        }}
      />
    </div>
  );
}
