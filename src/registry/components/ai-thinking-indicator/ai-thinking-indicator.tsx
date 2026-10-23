"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, SparklesIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface ThinkingStep {
  label: string;
  /** How long this step stays active, in ms. */
  duration: number;
}

export interface AIThinkingIndicatorProps {
  steps: ThinkingStep[];
  /** Run the sequence on mount. */
  autoStart?: boolean;
  className?: string;
}

export function AIThinkingIndicator({ steps, autoStart = true, className }: AIThinkingIndicatorProps) {
  const [index, setIndex] = useState(autoStart ? 0 : -1);
  const [elapsed, setElapsed] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const running = index >= 0 && index < steps.length;
  const done = index >= steps.length;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setIndex((i) => i + 1), steps[index].duration);
    return () => window.clearTimeout(id);
  }, [running, index, steps]);

  useEffect(() => {
    if (!running) return;
    const start = Date.now() - elapsed;
    const id = window.setInterval(() => setElapsed(Date.now() - start), 100);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function restart() {
    setElapsed(0);
    setExpanded(false);
    setIndex(0);
  }

  const seconds = (elapsed / 1000).toFixed(1);

  return (
    <div className={cn("w-full max-w-md rounded-[14px] border border-border bg-background", className)}>
      <div className="flex items-center gap-3 px-4 py-3">
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-full",
            done ? "bg-accent text-foreground" : "bg-primary text-primary-foreground",
          )}
        >
          <HugeiconsIcon
            icon={done ? Tick02Icon : SparklesIcon}
            size={14}
            strokeWidth={2.5}
            className={cn(running && "animate-pulse")}
          />
        </span>
        <div className="min-w-0 flex-1" aria-live="polite">
          {running && (
            <p key={index} className="truncate text-sm text-foreground animate-in fade-in-0 slide-in-from-bottom-1 duration-200">
              <span className="bg-[linear-gradient(90deg,var(--muted-foreground),var(--foreground),var(--muted-foreground))] bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-[shimmer_1.6s_linear_infinite]">
                {steps[index].label}
              </span>
            </p>
          )}
          {done && (
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Thought for {seconds}s
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={14}
                strokeWidth={2}
                className={cn("transition-transform duration-200", expanded && "rotate-180")}
              />
            </button>
          )}
          {index === -1 && <p className="text-sm text-muted-foreground">Idle</p>}
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">{running ? `${seconds}s` : ""}</span>
        {(done || index === -1) && (
          <button
            type="button"
            onClick={restart}
            className="h-7 rounded-[7px] border border-border px-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            {done ? "Run again" : "Start"}
          </button>
        )}
      </div>
      {done && (
        <div
          className="grid transition-[grid-template-rows] duration-250 ease-out-strong"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <ol className="flex flex-col gap-1.5 border-t border-border px-4 py-3">
              {steps.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.5} className="text-success" />
                  {s.label}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
      <style>{`@keyframes shimmer { from { background-position: 200% 0 } to { background-position: -200% 0 } }`}</style>
    </div>
  );
}
