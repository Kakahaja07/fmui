"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export interface StreamingTextProps {
  text: string;
  /** Milliseconds between tokens. */
  speed?: number;
  /** Start streaming immediately. */
  autoStart?: boolean;
  onComplete?: () => void;
  className?: string;
}

function tokenize(text: string) {
  return text.match(/\S+\s*/g) ?? [];
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

export function StreamingText({ text, speed = 45, autoStart = true, onComplete, className }: StreamingTextProps) {
  const tokens = useMemo(() => tokenize(text), [text]);
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(autoStart);
  const [prevText, setPrevText] = useState(text);
  if (prevText !== text) {
    setPrevText(text);
    setCount(0);
    setPlaying(autoStart);
  }
  const done = count >= tokens.length;

  useEffect(() => {
    if (!playing || done) return;
    const id = window.setTimeout(
      () => setCount((c) => (reduce ? tokens.length : c + 1)),
      reduce ? 0 : speed,
    );
    return () => window.clearTimeout(id);
  }, [playing, count, done, speed, reduce, tokens.length]);

  useEffect(() => {
    if (done && playing) onComplete?.();
  }, [done, playing, onComplete]);

  return (
    <div className={cn("w-full", className)}>
      <p className="min-h-24 text-[15px] leading-7 text-foreground" aria-live="polite" aria-busy={!done}>
        {tokens.slice(0, count).join("")}
        {!done && (
          <span
            aria-hidden="true"
            className={cn("ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-foreground", playing && "animate-pulse")}
          />
        )}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (done) {
              setCount(0);
              setPlaying(true);
            } else {
              setPlaying((p) => !p);
            }
          }}
          className="h-8 rounded-[8px] border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          {done ? "Replay" : playing ? "Pause" : "Resume"}
        </button>
        <span className="text-xs text-muted-foreground tabular-nums">
          {count}/{tokens.length} tokens
        </span>
      </div>
    </div>
  );
}
