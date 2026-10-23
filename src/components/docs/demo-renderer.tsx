"use client";

import { lazy, Suspense, type ComponentType } from "react";
import { demoRegistry } from "@/components/demos";

/** Lazy wrappers are created once at module scope; modules load on first render. */
const lazyDemos: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(demoRegistry).map(([id, load]) => [id, lazy(load)]),
);

export function DemoRenderer({
  previewId,
  fallbackHeight = 160,
  fallback,
}: {
  previewId: string;
  fallbackHeight?: number;
  /** Shown while the demo module loads. Defaults to a neutral skeleton. */
  fallback?: React.ReactNode;
}) {
  const Demo = lazyDemos[previewId];
  if (!Demo) return null;
  return (
    <Suspense
      fallback={
        fallback ?? (
          <div
            className="w-full max-w-sm animate-pulse rounded-[12px] bg-accent"
            style={{ height: fallbackHeight }}
            aria-busy="true"
            aria-label="Loading demo"
          />
        )
      }
    >
      <Demo />
    </Suspense>
  );
}
