"use client";

import { useState, type KeyboardEvent } from "react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export type BillingPeriod = "monthly" | "yearly";

export interface BillingToggleProps {
  /** Monthly price when billed monthly. */
  monthly?: number;
  /** Monthly price when billed yearly. */
  yearly?: number;
  value?: BillingPeriod;
  defaultValue?: BillingPeriod;
  onValueChange?: (value: BillingPeriod) => void;
  /** Badge shown while yearly is selected. */
  savingsLabel?: string;
  className?: string;
}

const PERIODS: { value: BillingPeriod; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

/** A monthly / yearly switch whose price rolls to the new amount. */
export function BillingToggle({
  monthly = 49,
  yearly = 39,
  value: valueProp,
  defaultValue = "monthly",
  onValueChange,
  savingsLabel = "Save 20%",
  className,
}: BillingToggleProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const value = valueProp ?? valueState;
  const isYearly = value === "yearly";

  function select(next: BillingPeriod) {
    if (next === value) return;
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const next = isYearly ? 0 : 1;
    select(PERIODS[next].value);
    e.currentTarget.querySelectorAll<HTMLElement>("[role=radio]")[next]?.focus();
  }

  return (
    <div className={cn("w-[232px] rounded-[24px] bg-accent p-4", className)}>
      <div
        role="radiogroup"
        aria-label="Billing period"
        onKeyDown={onKeyDown}
        className="relative grid grid-cols-2 rounded-[11px] bg-border-strong/60 p-[3px]"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-y-[3px] left-[3px] w-[calc(50%-3px)] rounded-[8px] bg-background shadow-xs transition-transform duration-300 ease-out-strong",
            isYearly && "translate-x-full",
          )}
        />
        {PERIODS.map((p) => {
          const checked = p.value === value;
          return (
            <button
              key={p.value}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => select(p.value)}
              className={cn(
                "relative h-[30px] rounded-[8px] text-[13px] font-medium transition-colors duration-200",
                checked ? "text-heading" : "text-muted-foreground",
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="flex items-baseline gap-1.5">
          <RollingNumber
            value={isYearly ? yearly : monthly}
            format={(n) => `$${n}`}
            className="font-heading text-[34px]/[1] font-semibold tracking-[-0.02em] text-heading"
          />
          <span className="text-xs text-muted-foreground">/ month</span>
        </p>
        <span
          aria-hidden={!isYearly}
          className={cn(
            "rounded-[6px] bg-[#3358eb] px-2 py-[3px] text-[11px] font-semibold text-white transition-[scale,opacity] duration-200 ease-out-strong",
            !isYearly && "scale-95 opacity-0",
          )}
        >
          {savingsLabel}
        </span>
      </div>
    </div>
  );
}
