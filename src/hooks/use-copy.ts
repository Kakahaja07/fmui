"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CopyState = "idle" | "copied" | "error";

export function useCopy(resetAfterMs = 1800) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string) => {
      if (timer.current) clearTimeout(timer.current);
      try {
        await navigator.clipboard.writeText(text);
        setState("copied");
      } catch {
        setState("error");
      }
      timer.current = setTimeout(() => setState("idle"), resetAfterMs);
    },
    [resetAfterMs],
  );

  return { state, copy };
}
