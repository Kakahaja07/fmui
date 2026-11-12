"use client";

import { useState } from "react";
import { DateRangePicker, type DateRange } from "@/registry/components/date-range-picker/date-range-picker";

function daysFromNow(n: number) {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

export default function DateRangePickerDemo() {
  const [today] = useState(() => daysFromNow(0));
  const [range, setRange] = useState<DateRange>(() => ({ from: daysFromNow(4), to: daysFromNow(10) }));

  return <DateRangePicker label="Trip dates" min={today} value={range} onValueChange={setRange} />;
}
