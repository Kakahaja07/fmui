"use client";

import { useState } from "react";
import { BillingToggle, type BillingPeriod } from "@/registry/components/billing-toggle/billing-toggle";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

export default function BillingToggleDemo() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [auto, setAuto] = useState(true);

  const ref = useDemoLoop(() => setPeriod((p) => (p === "monthly" ? "yearly" : "monthly")), 3000, auto);

  return (
    <div ref={ref}>
      <BillingToggle
        value={period}
        onValueChange={(next) => {
          setAuto(false);
          setPeriod(next);
        }}
      />
    </div>
  );
}
