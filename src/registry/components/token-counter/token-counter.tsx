"use client";

import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

/**
 * A rough token estimate: one token per 4 characters, the usual rule of thumb for
 * English text with BPE tokenizers. Code, non-Latin scripts and numbers tokenize
 * denser, so pass a real `count` from your tokenizer when you need precision.
 */
export function estimateTokens(text: string) {
  return Math.ceil(text.length / 4);
}

export interface TokenCounterProps {
  /** Text to estimate with `estimateTokens`. Ignored when `count` is set. */
  text?: string;
  /** An exact token count, e.g. from a tokenizer or the API's usage field. */
  count?: number;
  /** Context window size in tokens. */
  limit: number;
  /** Fraction of the limit where the bar turns amber. */
  warnAt?: number;
  label?: string;
  className?: string;
}

const COLORS = { ok: "bg-[#3358eb]", warn: "bg-amber-500", over: "bg-danger" };
const MESSAGES = { ok: "", warn: "Approaching the context limit", over: "Over the context limit" };

/** A live estimate of prompt tokens against a context limit, with a bar that warns as it fills. */
export function TokenCounter({ text = "", count, limit, warnAt = 0.8, label = "Context", className }: TokenCounterProps) {
  const tokens = count ?? estimateTokens(text);
  const ratio = limit > 0 ? tokens / limit : 0;
  const state = ratio > 1 ? "over" : ratio >= warnAt ? "warn" : "ok";
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className={cn("w-[320px] rounded-[16px] bg-accent px-3.5 py-3", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold text-heading">{label}</span>
        <span className="text-xs text-muted-foreground">
          <RollingNumber
            value={tokens}
            duration={400}
            className={cn("font-medium transition-colors duration-200", state === "over" ? "text-danger" : "text-heading")}
          />{" "}
          / {fmt(limit)} tokens
        </span>
      </div>
      <div
        role="meter"
        aria-label={`${label} tokens`}
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-valuenow={Math.min(tokens, limit)}
        aria-valuetext={`${fmt(tokens)} of ${fmt(limit)} tokens`}
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-background"
      >
        <div
          className={cn("h-full origin-left rounded-full transition-[transform,background-color] duration-200 ease-linear", COLORS[state])}
          style={{ transform: `scaleX(${Math.min(ratio, 1)})` }}
        />
      </div>
      <p className={cn("mt-1.5 text-xs transition-colors duration-200", state === "over" ? "text-danger" : "text-muted-foreground")}>
        {state === "over"
          ? `${fmt(tokens - limit)} tokens over. Trim the prompt or attachments.`
          : `${Math.round(ratio * 100)}% used, ${fmt(limit - tokens)} tokens left.`}
      </p>
      {/* Announce only threshold crossings, not every keystroke. */}
      <span role="status" className="sr-only">
        {MESSAGES[state]}
      </span>
    </div>
  );
}
