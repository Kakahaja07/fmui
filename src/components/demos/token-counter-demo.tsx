"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Attachment01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { TokenCounter, estimateTokens } from "@/registry/components/token-counter/token-counter";

// System prompt and earlier turns already in the window.
const HISTORY = 5_480;
const FILES = [
  { name: "pricing-faq.md", tokens: 940 },
  { name: "support-macros.csv", tokens: 1_310 },
  { name: "refund-policy.pdf", tokens: 760 },
];

export default function TokenCounterDemo() {
  const [text, setText] = useState("Draft a friendly reply to a customer asking why their annual plan renewed early.");
  const [attached, setAttached] = useState<string[]>([]);

  const count =
    HISTORY + estimateTokens(text) + FILES.filter((f) => attached.includes(f.name)).reduce((sum, f) => sum + f.tokens, 0);
  const next = FILES.find((f) => !attached.includes(f.name));

  return (
    <div className="flex w-[320px] flex-col gap-2">
      <div className="rounded-[16px] bg-background p-2 shadow-xs ring-1 ring-border">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          aria-label="Prompt"
          className="w-full resize-none bg-transparent px-1.5 py-1 text-[13px]/[19px] text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="Ask anything..."
        />
        <div className="flex flex-wrap items-center gap-1.5">
          {attached.map((name) => (
            <button
              key={name}
              type="button"
              aria-label={`Remove ${name}`}
              onClick={() => setAttached((list) => list.filter((n) => n !== name))}
              className="inline-flex h-6 items-center gap-1 rounded-full bg-accent pl-2 pr-1.5 text-[11px] font-medium text-heading transition-transform duration-150 ease-out-strong active:scale-[0.97]"
            >
              {name}
              <HugeiconsIcon icon={Cancel01Icon} size={11} strokeWidth={2.2} aria-hidden="true" className="text-muted-foreground" />
            </button>
          ))}
          {next && (
            <button
              type="button"
              onClick={() => setAttached((list) => [...list, next.name])}
              className="inline-flex h-6 items-center gap-1 rounded-full px-1.5 text-[11px] font-medium text-muted-foreground transition-[color,scale] duration-150 ease-out-strong hover:text-heading active:scale-[0.97]"
            >
              <HugeiconsIcon icon={Attachment01Icon} size={12} strokeWidth={2} aria-hidden="true" />
              Attach {next.name}
            </button>
          )}
        </div>
      </div>
      <TokenCounter count={count} limit={8_000} />
    </div>
  );
}
