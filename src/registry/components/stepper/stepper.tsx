"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  title: string;
  description?: string;
  /** Return an error message to block advancing, or null to allow it. */
  validate?: () => string | null;
  content: React.ReactNode;
}

export interface StepperProps {
  steps: Step[];
  onComplete?: () => void;
  className?: string;
}

export function Stepper({ steps, onComplete, className }: StepperProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const step = steps[index];
  const isLast = index === steps.length - 1;

  function next() {
    const problem = step.validate?.() ?? null;
    setError(problem);
    if (problem) return;
    if (isLast) {
      setDone(true);
      onComplete?.();
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
  }

  function back() {
    setError(null);
    setDirection(-1);
    setIndex((i) => Math.max(0, i - 1));
  }

  function reset() {
    setDone(false);
    setError(null);
    setDirection(-1);
    setIndex(0);
  }

  return (
    <div className={cn("w-full rounded-[14px] border border-border bg-background", className)}>
      <ol className="flex items-center gap-2 border-b border-border px-5 py-4" aria-label="Progress">
        {steps.map((s, i) => {
          const state = done || i < index ? "complete" : i === index ? "current" : "upcoming";
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2 last:flex-none">
              <span
                aria-current={state === "current" ? "step" : undefined}
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-200",
                  state === "complete" && "border-primary bg-primary text-primary-foreground",
                  state === "current" && "border-primary text-foreground",
                  state === "upcoming" && "border-border text-muted-foreground",
                )}
              >
                {state === "complete" ? <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={3} /> : i + 1}
                <span className="sr-only">
                  {s.title}, {state}
                </span>
              </span>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:block",
                  state === "upcoming" ? "text-muted-foreground" : "text-foreground",
                )}
                aria-hidden="true"
              >
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <span className="relative ml-1 h-px flex-1 overflow-hidden bg-border" aria-hidden="true">
                  <span
                    className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-300 ease-out-strong"
                    style={{ width: done || i < index ? "100%" : "0%" }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="overflow-hidden px-5 py-5">
        {done ? (
          <div className="animate-in fade-in-0 zoom-in-[0.98] duration-200">
            <p className="text-sm font-semibold text-foreground">All done</p>
            <p className="mt-1 text-sm text-muted-foreground">Every step is complete.</p>
          </div>
        ) : (
          <div
            key={step.id}
            className={cn(
              "animate-in fade-in-0 duration-200 ease-out-strong",
              direction === 1 ? "slide-in-from-right-4" : "slide-in-from-left-4",
            )}
          >
            <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
            {step.description && <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>}
            <div className="mt-4">{step.content}</div>
            {error && (
              <p role="alert" className="mt-3 text-sm text-danger">
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <button
          type="button"
          onClick={done ? reset : back}
          disabled={!done && index === 0}
          className="h-9 rounded-[9px] px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
        >
          {done ? "Start over" : "Back"}
        </button>
        {!done && (
          <button
            type="button"
            onClick={next}
            className="h-9 rounded-[9px] bg-primary px-4 text-sm font-medium text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.97]"
          >
            {isLast ? "Finish" : "Continue"}
          </button>
        )}
      </div>
    </div>
  );
}
