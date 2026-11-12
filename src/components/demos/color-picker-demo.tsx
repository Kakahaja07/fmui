"use client";

import { useState } from "react";
import { ColorPicker } from "@/registry/components/color-picker/color-picker";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const PRESETS = ["#3358EB", "#EB5833", "#33EBA7", "#7F33EB", "#EBB433"];

export default function ColorPickerDemo() {
  const [color, setColor] = useState(PRESETS[0]);
  const [auto, setAuto] = useState(true);

  const ref = useDemoLoop(
    () => setColor((c) => PRESETS[(PRESETS.indexOf(c) + 1) % PRESETS.length]),
    2500,
    auto,
  );

  return (
    <div ref={ref}>
      <ColorPicker
        value={color}
        presets={PRESETS}
        onValueChange={(next) => {
          setAuto(false);
          setColor(next);
        }}
      />
    </div>
  );
}
