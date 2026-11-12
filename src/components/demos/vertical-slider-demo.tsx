"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon } from "@hugeicons/core-free-icons";
import { VerticalSlider } from "@/registry/components/vertical-slider/vertical-slider";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const randomLevel = () => 10 + Math.round(Math.random() * 85);

export default function VerticalSliderDemo() {
  const [volume, setVolume] = useState(60);
  const [brightness, setBrightness] = useState(40);
  const [auto, setAuto] = useState(true);

  const ref = useDemoLoop(
    () => {
      setVolume(randomLevel());
      setBrightness(randomLevel());
    },
    1500,
    auto,
  );

  return (
    <div ref={ref} className="flex w-44 justify-center gap-3.5 rounded-[24px] bg-accent py-5">
      <VerticalSlider
        label="Volume"
        value={volume}
        onValueChange={(v) => {
          setAuto(false);
          setVolume(v);
        }}
      />
      <VerticalSlider
        label="Brightness"
        icon={<HugeiconsIcon icon={Sun03Icon} size={14} strokeWidth={2} />}
        value={brightness}
        onValueChange={(v) => {
          setAuto(false);
          setBrightness(v);
        }}
      />
    </div>
  );
}
