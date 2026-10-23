"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const subscribe = () => () => {};

/** Half-filled circle: one icon for both themes, rotating half a turn on each switch. */
function ContrastIcon({ dark }: { dark: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 ease-out-strong"
      style={{ transform: dark ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 4.75a5.25 5.25 0 0 1 0 10.5z" fill="currentColor" />
    </svg>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="inline-flex size-8 items-center justify-center rounded-[8px] text-muted-foreground transition-[color,background-color,transform] duration-150 hover:bg-accent hover:text-heading active:scale-[0.94]"
        >
          <ContrastIcon dark={isDark} />
        </button>
      </TooltipTrigger>
      <TooltipContent>{isDark ? "Light theme" : "Dark theme"}</TooltipContent>
    </Tooltip>
  );
}
