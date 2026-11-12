"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { RefreshIcon } from "@hugeicons/core-free-icons";
import { Skeleton, SkeletonLoader } from "@/registry/components/skeleton-loader/skeleton-loader";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const placeholder = (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <Skeleton shape="circle" className="size-9" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-2.5 w-16" />
      </div>
    </div>
    <div className="flex flex-col gap-2 py-0.5">
      <Skeleton className="h-2.5" />
      <Skeleton className="h-2.5 w-4/5" />
    </div>
    <Skeleton shape="rect" className="h-28" />
  </div>
);

export default function SkeletonLoaderDemo() {
  const [loading, setLoading] = useState(true);
  const [auto, setAuto] = useState(true);
  const timer = useRef<number | undefined>(undefined);

  const ref = useDemoLoop(() => setLoading((l) => !l), 2200, auto);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function reload() {
    setAuto(false);
    setLoading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLoading(false), 1400);
  }

  return (
    <div ref={ref} className="w-[300px] rounded-[24px] bg-accent p-3">
      <SkeletonLoader loading={loading} skeleton={placeholder} label="Loading post" className="rounded-[16px] bg-background p-4 shadow-xs">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-[#3358eb] text-xs font-semibold text-white">ML</span>
            <div className="min-w-0">
              <p className="text-[13px]/[16px] font-semibold text-heading">Maya Lin</p>
              <p className="text-xs text-muted-foreground">@maya · 2h</p>
            </div>
          </div>
          <p className="text-[13px]/[18px] text-foreground">
            Shipped the new onboarding flow today. Setup time is down from 9 minutes to 3.
          </p>
          <div className="h-28 rounded-[12px] bg-linear-to-br from-[#3358eb] to-[#1f9d74]" />
        </div>
      </SkeletonLoader>
      <button
        type="button"
        onClick={reload}
        className="mt-2.5 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-[10px] text-xs font-medium text-muted-foreground transition-transform duration-150 ease-out-strong hover:text-heading active:scale-[0.97]"
      >
        <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} aria-hidden="true" />
        Reload
      </button>
    </div>
  );
}
