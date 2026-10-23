"use client";

import { MetricCard } from "@/registry/components/metric-card/metric-card";

export default function MetricCardDemo() {
  return (
    <MetricCard
      title="Active users"
      ranges={[
        { id: "7d", label: "7d", value: 4821, previous: 4410, series: [31, 38, 35, 42, 46, 44, 52] },
        { id: "30d", label: "30d", value: 19340, previous: 20110, series: [50, 44, 47, 41, 38, 43, 40] },
        { id: "90d", label: "90d", value: 55120, previous: 48700, series: [22, 28, 31, 36, 41, 47, 55] },
      ]}
    />
  );
}
