"use client";

import { useState } from "react";
import { DeployButton, type DeployStatus } from "@/registry/components/progress-button/progress-button";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

export default function DeployButtonDemo() {
  const [status, setStatus] = useState<DeployStatus>("idle");
  const [heldLive, setHeldLive] = useState(false);
  const [auto, setAuto] = useState(true);

  // Press deploy, let the button run, show "Live" for a beat, then reset.
  const ref = useDemoLoop(
    () => {
      if (status === "idle") setStatus("deploying");
      if (status === "live") {
        if (heldLive) setStatus("idle");
        setHeldLive(!heldLive);
      }
    },
    900,
    auto,
  );

  return (
    <div
      ref={ref}
      onClickCapture={() => setAuto(false)}
      className="grid h-20 w-[236px] place-items-center rounded-[24px] bg-accent"
    >
      <DeployButton status={status} onStatusChange={setStatus} />
    </div>
  );
}
