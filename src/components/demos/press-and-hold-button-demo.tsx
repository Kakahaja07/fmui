"use client";

import { useState } from "react";
import { HoldToConfirm } from "@/registry/components/press-and-hold-button/press-and-hold-button";

export default function HoldToConfirmDemo() {
  const [deletes, setDeletes] = useState(0);

  return (
    <div className="w-[300px] rounded-[24px] bg-accent p-3">
      <div className="rounded-[16px] bg-background p-4 shadow-xs">
        <p className="text-[13px]/[16px] font-semibold text-heading">Delete project</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Removes northwind-web and its 128 deployments. This cannot be undone.
        </p>
        <HoldToConfirm className="mt-4 w-full" onConfirm={() => setDeletes((n) => n + 1)} />
      </div>
      <p className="px-1 pt-2.5 text-center text-xs text-muted-foreground">
        {deletes === 0 ? "Release early to cancel" : `Deleted ${deletes}× (restored for the demo)`}
      </p>
    </div>
  );
}
