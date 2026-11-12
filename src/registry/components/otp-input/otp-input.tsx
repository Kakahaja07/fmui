"use client";

import { useState, type KeyboardEvent } from "react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface OtpInputProps {
  /** Number of digits in the code. */
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called once every digit is filled. */
  onComplete?: (code: string) => void;
  /** Shows a spinner while the code is being checked. */
  verifying?: boolean;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * A one-time-code field. One real input sits on top of the boxes, so typing,
 * paste, SMS autofill and screen readers all work like a normal text field.
 */
export function OtpInput({
  length = 6,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onComplete,
  verifying = false,
  title = "Verification code",
  description = "Sent to your phone",
  className,
}: OtpInputProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const code = (valueProp ?? valueState).slice(0, length);
  // null keeps the cursor after the last digit, which is where typing usually happens.
  const [cursor, setCursor] = useState<number | null>(null);
  const active = Math.min(cursor ?? code.length, length - 1);

  function commit(raw: string) {
    const next = raw.replace(/\D/g, "").slice(0, length);
    if (next === code) return;
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
    if (next.length === length) onComplete?.(next);
  }

  function moveTo(i: number, len = code.length) {
    setCursor(i >= len ? null : Math.max(0, i));
  }

  // Native editing covers typing and deleting at the end; these keys edit in the middle.
  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      moveTo(active + (e.key === "ArrowLeft" ? -1 : 1));
    } else if (/^\d$/.test(e.key) && active < code.length) {
      e.preventDefault();
      commit(code.slice(0, active) + e.key + code.slice(active + 1));
      moveTo(active + 1);
    } else if (e.key === "Backspace" && cursor !== null) {
      e.preventDefault();
      commit(code.slice(0, active) + code.slice(active + 1));
      moveTo(active, code.length - 1);
    }
  }

  return (
    <div className={cn("w-[232px] rounded-[24px] bg-accent p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px]/[16px] font-semibold text-heading">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <svg
          viewBox="0 0 20 20"
          className={cn(
            "size-[18px] shrink-0 animate-spin transition-opacity duration-200 [animation-duration:900ms] motion-reduce:[animation-duration:2.5s]",
            verifying ? "opacity-100" : "opacity-0",
          )}
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="8" fill="none" strokeWidth="2.2" className="stroke-border-strong" />
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            stroke="#3358eb"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="16 50.3"
          />
        </svg>
      </div>
      <span role="status" className="sr-only">
        {verifying ? "Verifying code" : ""}
      </span>

      <div className="group relative mt-4 flex justify-between">
        {Array.from({ length }, (_, i) => {
          const digit = code[i];
          return (
            <div
              key={i}
              aria-hidden="true"
              className={cn(
                "grid h-10 w-[29px] place-items-center rounded-[10px] bg-background text-[19px] font-medium text-heading shadow-xs",
                i === active &&
                  "ring-[1.5px] ring-[#3358eb] group-has-focus-visible:shadow-[0_0_0_4px_rgb(51_88_235/0.18)]",
              )}
            >
              {digit && (
                <RollingNumber
                  value={Number(digit)}
                  duration={350}
                  className="transition-[scale,opacity] duration-200 ease-out-strong starting:scale-90 starting:opacity-0"
                />
              )}
            </div>
          );
        })}
        <input
          value={code}
          onChange={(e) => {
            commit(e.target.value);
            setCursor(null);
          }}
          onKeyDown={onKeyDown}
          onSelect={(e) => {
            // Keep the native caret at the end so the boxes stay the only cursor.
            const el = e.currentTarget;
            el.setSelectionRange(el.value.length, el.value.length);
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={length}
          aria-label={`${title}, ${length} digits`}
          className="absolute inset-0 cursor-text text-transparent caret-transparent opacity-0 outline-none"
        />
      </div>
    </div>
  );
}
