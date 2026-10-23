"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ResizablePanelsProps {
  left: React.ReactNode;
  right: React.ReactNode;
  /** Initial left panel width as a percentage. */
  defaultSplit?: number;
  minSplit?: number;
  maxSplit?: number;
  className?: string;
}

/**
 * Two panels divided by a draggable handle. The handle is a keyboard
 * accessible separator: arrow keys nudge it, Home/End snap to the limits,
 * and Enter resets to the default split.
 */
export function ResizablePanels({
  left,
  right,
  defaultSplit = 50,
  minSplit = 20,
  maxSplit = 80,
  className,
}: ResizablePanelsProps) {
  const [split, setSplit] = useState(defaultSplit);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = useCallback((v: number) => Math.min(maxSplit, Math.max(minSplit, v)), [minSplit, maxSplit]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || !containerRef.current) return;
    const { left: x, width } = containerRef.current.getBoundingClientRect();
    setSplit(clamp(((e.clientX - x) / width) * 100));
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 2;
    const map: Record<string, number | undefined> = {
      ArrowLeft: clamp(split - step),
      ArrowRight: clamp(split + step),
      Home: minSplit,
      End: maxSplit,
      Enter: defaultSplit,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setSplit(next);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-full w-full overflow-hidden rounded-[12px] border border-border bg-background",
        dragging && "select-none",
        className,
      )}
      style={{ cursor: dragging ? "col-resize" : undefined }}
    >
      <div className="min-w-0 overflow-auto" style={{ width: `${split}%` }}>
        {left}
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize panels"
        aria-valuenow={Math.round(split)}
        aria-valuemin={minSplit}
        aria-valuemax={maxSplit}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        onDoubleClick={() => setSplit(defaultSplit)}
        className="group relative flex w-2 shrink-0 cursor-col-resize items-center justify-center bg-surface outline-none focus-visible:bg-accent"
      >
        <span
          className={cn(
            "h-8 w-1 rounded-full bg-border-strong transition-[background-color,transform] duration-150 group-hover:bg-muted-foreground group-focus-visible:bg-foreground",
            dragging && "scale-y-125 bg-foreground",
          )}
        />
      </div>
      <div className="min-w-0 flex-1 overflow-auto">{right}</div>
    </div>
  );
}
