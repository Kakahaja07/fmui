"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface ThemeSwitchProps {
  /** `true` is dark mode. The component only reports the choice; applying the theme is up to you. */
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

// Tailwind v4 rotate/scale utilities set the individual `rotate`/`scale` properties.
const FADE =
  "transition-[rotate,scale,opacity,filter] duration-300 ease-out-strong motion-reduce:transition-[opacity]";

/** A dark mode tile. The whole card is the switch and morphs to show its state. */
export function ThemeSwitch({ checked: checkedProp, defaultChecked = false, onCheckedChange, className }: ThemeSwitchProps) {
  const [checkedState, setCheckedState] = useState(defaultChecked);
  const dark = checkedProp ?? checkedState;

  function toggle() {
    if (checkedProp === undefined) setCheckedState(!dark);
    onCheckedChange?.(!dark);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={toggle}
      className={cn(
        "relative flex h-[140px] w-44 flex-col items-center justify-center rounded-[24px] bg-accent transition-transform duration-150 ease-out-strong active:scale-[0.97]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("absolute inset-0 rounded-[inherit] bg-[#111] transition-opacity duration-300 ease-out-strong", !dark && "opacity-0")}
      />

      <span aria-hidden="true" className="relative grid size-[18px] [&>*]:col-start-1 [&>*]:row-start-1">
        <HugeiconsIcon
          icon={Sun03Icon}
          size={18}
          strokeWidth={1.8}
          className={cn(FADE, "text-heading", dark && "-rotate-90 scale-75 opacity-0")}
        />
        <HugeiconsIcon
          icon={Moon02Icon}
          size={18}
          strokeWidth={1.8}
          className={cn(FADE, "text-white", !dark && "rotate-90 scale-75 opacity-0")}
        />
      </span>

      <span aria-hidden="true" className="relative mt-2 grid text-[13px] font-semibold [&>*]:col-start-1 [&>*]:row-start-1">
        <span className={cn(FADE, "text-heading", dark && "opacity-0 blur-[2px]")}>Light mode</span>
        <span className={cn(FADE, "text-white", !dark && "opacity-0 blur-[2px]")}>Dark mode</span>
      </span>

      <span aria-hidden="true" className="relative mt-3.5 h-7 w-[50px] rounded-full bg-border-strong p-[3px]">
        <span
          className={cn(
            "absolute inset-0 rounded-full bg-[#3358eb] transition-opacity duration-300 ease-out-strong",
            !dark && "opacity-0",
          )}
        />
        <span
          className={cn(
            "relative block size-[22px] rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.2)] transition-transform duration-300 ease-out-strong",
            dark && "translate-x-[22px]",
          )}
        />
      </span>
    </button>
  );
}
