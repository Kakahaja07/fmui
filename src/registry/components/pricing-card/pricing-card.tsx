"use client";

import { useId, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  highlighted?: boolean;
  cta?: string;
}

export interface PricingCardProps {
  plans: PricingPlan[];
  onSelect?: (plan: PricingPlan, interval: "monthly" | "yearly") => void;
  className?: string;
}

export function PricingCard({ plans, onSelect, className }: PricingCardProps) {
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const [selected, setSelected] = useState<string | null>(null);
  const switchId = useId();

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-5 flex items-center justify-center gap-3 text-sm">
        <label htmlFor={switchId} className={cn(interval === "monthly" ? "text-foreground" : "text-muted-foreground")}>
          Monthly
        </label>
        <button
          id={switchId}
          type="button"
          role="switch"
          aria-checked={interval === "yearly"}
          aria-label="Bill yearly"
          onClick={() => setInterval((v) => (v === "monthly" ? "yearly" : "monthly"))}
          className="relative h-6 w-11 rounded-full bg-border-strong transition-colors duration-200 aria-checked:bg-primary"
        >
          <span
            className={cn(
              "absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out-strong",
              interval === "yearly" && "translate-x-5",
            )}
          />
        </button>
        <span className={cn(interval === "yearly" ? "text-foreground" : "text-muted-foreground")}>
          Yearly <span className="ml-1 rounded-full bg-accent px-1.5 py-0.5 text-[11px] font-medium">Save 20%</span>
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => {
          const price = interval === "monthly" ? plan.monthly : plan.yearly;
          const isSelected = selected === plan.id;
          return (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col rounded-[14px] border p-5 transition-[border-color,box-shadow] duration-200",
                plan.highlighted ? "border-primary bg-background shadow-card" : "border-border bg-background",
                isSelected && "ring-2 ring-ring/40",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
              <p className="mt-4 flex items-baseline gap-1">
                <span key={interval} className="text-3xl font-semibold tracking-[-0.02em] text-foreground tabular-nums animate-in fade-in-0 duration-200">
                  ${price}
                </span>
                <span className="text-xs text-muted-foreground">/ month{interval === "yearly" && ", billed yearly"}</span>
              </p>
              <ul className="mt-4 flex flex-1 flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <HugeiconsIcon icon={Tick02Icon} size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelected(plan.id);
                  onSelect?.(plan, interval);
                }}
                className={cn(
                  "mt-5 h-10 rounded-[10px] text-sm font-medium transition-[background-color,transform] duration-200 active:scale-[0.97]",
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border bg-background text-foreground hover:bg-accent",
                )}
              >
                {isSelected ? "Selected" : (plan.cta ?? "Choose plan")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
