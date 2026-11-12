import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps {
  /** line: a text row, circle: an avatar, rect: media or a block. Size it with className. */
  shape?: "line" | "circle" | "rect";
  className?: string;
}

const SHAPES = {
  line: "h-3 w-full rounded-full",
  circle: "size-10 rounded-full",
  rect: "h-24 w-full rounded-[12px]",
};

// React hoists and dedupes this by href, so any number of skeletons share one rule.
const SHIMMER_CSS = `@keyframes fmui-shimmer { from { transform: translateX(-100%) } to { transform: translateX(100%) } }`;

/** A placeholder block with a soft highlight sweeping across it. */
export function Skeleton({ shape = "line", className }: SkeletonProps) {
  return (
    <span aria-hidden="true" className={cn("relative block overflow-hidden bg-foreground/[0.07]", SHAPES[shape], className)}>
      <style href="fmui-skeleton-shimmer" precedence="default">
        {SHIMMER_CSS}
      </style>
      <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent animate-[fmui-shimmer_1.6s_ease-in-out_infinite] group-data-[state=loaded]/skeleton:hidden motion-reduce:hidden dark:via-white/[0.06]" />
    </span>
  );
}

export interface SkeletonLoaderProps {
  loading: boolean;
  /** Placeholder built from Skeleton blocks, shaped like the real content. */
  skeleton: ReactNode;
  children?: ReactNode;
  /** Announced to screen readers while loading. */
  label?: string;
  className?: string;
}

/**
 * Stacks a skeleton and the real content in the same cell and crossfades
 * between them, so the swap never shifts the layout.
 */
export function SkeletonLoader({ loading, skeleton, children, label = "Loading", className }: SkeletonLoaderProps) {
  return (
    <div
      aria-busy={loading}
      data-state={loading ? "loading" : "loaded"}
      className={cn("group/skeleton grid *:[grid-area:1/1]", className)}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none transition-opacity duration-200 ease-out-strong",
          loading ? "opacity-100" : "opacity-0",
        )}
      >
        {skeleton}
      </div>
      <div
        inert={loading}
        className={cn(
          "transition-[opacity,filter] duration-300 ease-out-strong",
          loading ? "opacity-0 blur-[4px]" : "opacity-100 blur-[0px]",
        )}
      >
        {children}
      </div>
      {loading && <span className="sr-only">{label}</span>}
    </div>
  );
}
