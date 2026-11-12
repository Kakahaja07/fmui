"use client";

import { useEffect, useRef } from "react";

/**
 * Calls `step` every `interval` ms while the returned ref's element is on
 * screen and the tab is visible. Never runs for users who prefer reduced
 * motion. Pass `enabled = false` to stop it, e.g. after the first real
 * interaction so autoplay never fights the user.
 */
export function useDemoLoop<T extends HTMLElement = HTMLDivElement>(step: () => void, interval: number, enabled = true) {
  const ref = useRef<T>(null);
  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  });

  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    let onScreen = !el;
    let id: number | undefined;

    const sync = () => {
      const run = onScreen && document.visibilityState === "visible";
      if (run && id === undefined) id = window.setInterval(() => stepRef.current(), interval);
      if (!run && id !== undefined) {
        window.clearInterval(id);
        id = undefined;
      }
    };

    const io = el
      ? new IntersectionObserver(([entry]) => {
          onScreen = entry.isIntersecting;
          sync();
        })
      : null;
    if (el) io?.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (id !== undefined) window.clearInterval(id);
    };
  }, [interval, enabled]);

  return ref;
}
