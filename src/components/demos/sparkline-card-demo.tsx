"use client";

import { SparklineCard } from "@/registry/components/sparkline-card/sparkline-card";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const values = [120, 132, 128, 150, 171, 165, 190, 204, 198, 226];

export default function SparklineCardDemo() {
  return (
    <SparklineCard
      title="Monthly revenue"
      unit="k"
      points={months.map((label, i) => ({ label, value: values[i] }))}
    />
  );
}
