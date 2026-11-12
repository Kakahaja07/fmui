"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface HoldToConfirmProps {
  /** Fires once the press has been held for the full `holdDuration`. */
  onConfirm?: () => void;
  label?: string;
  /** Shown briefly after the action fires. */
  confirmedLabel?: string;
  /** How long the press must be held, in milliseconds. */
  holdDuration?: number;
  disabled?: boolean;
  className?: string;
}

const SUCCESS_MS = 1600;

/**
 * A destructive button that only fires after a press-and-hold. A danger
 * overlay wipes in while held and snaps back if released early. Works with
 * pointer, touch, and holding Space or Enter.
 */
export function HoldToConfirm({
  onConfirm,
  label = "Hold to delete",
  confirmedLabel = "Deleted",
  holdDuration = 1500,
  disabled = false,
  className,
}: HoldToConfirmProps) {
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const hintId = useId();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function start() {
    if (disabled || done || holding) return;
    setHolding(true);
    timer.current = window.setTimeout(() => {
      setHolding(false);
      setDone(true);
      onConfirm?.();
      timer.current = window.setTimeout(() => setDone(false), SUCCESS_MS);
    }, holdDuration);
  }

  function cancel() {
    if (!holding) return;
    window.clearTimeout(timer.current);
    setHolding(false);
  }

  function onPointerDown(e: PointerEvent<HTMLButtonElement>) {
    if (e.button === 0) start();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    if (!e.repeat) start();
  }

  function onKeyUp(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === " " || e.key === "Enter") cancel();
  }

  const filled = holding || done;
  const content = (text: string, icon = Delete02Icon) => (
    <>
      <HugeiconsIcon icon={icon} size={16} strokeWidth={2} aria-hidden="true" />
      {text}
    </>
  );

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        aria-describedby={hintId}
        data-holding={holding || undefined}
        onPointerDown={onPointerDown}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={cancel}
        onContextMenu={(e) => e.preventDefault()}
        className={cn(
          "relative inline-flex h-10 touch-manipulation select-none items-center justify-center gap-2 overflow-hidden rounded-[12px] bg-danger/10 px-5 text-[13px] font-semibold text-danger outline-none [-webkit-touch-callout:none]",
          "transition-transform duration-150 ease-out-strong data-holding:scale-[0.97]",
          "focus-visible:ring-2 focus-visible:ring-danger/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
      >
        {content(label)}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center gap-2 bg-danger text-background"
          style={{
            clipPath: filled ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            transition: holding
              ? `clip-path ${holdDuration}ms linear`
              : "clip-path 200ms var(--ease-out-strong)",
          }}
        >
          {done ? content(confirmedLabel, Tick02Icon) : content(label)}
        </span>
      </button>
      <span id={hintId} className="sr-only">
        Press and hold to confirm.
      </span>
      <span role="status" className="sr-only">
        {done ? confirmedLabel : ""}
      </span>
    </>
  );
}
