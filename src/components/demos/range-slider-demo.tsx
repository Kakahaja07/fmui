"use client";

import { useState } from "react";
import { RangeSlider } from "@/registry/components/range-slider/range-slider";

export default function RangeSliderDemo() {
  const [price, setPrice] = useState<[number, number]>([120, 480]);

  return (
    <RangeSlider
      label="Price"
      min={0}
      max={1000}
      step={10}
      value={price}
      onValueChange={setPrice}
      formatValue={(n) => `$${n}`}
    />
  );
}
