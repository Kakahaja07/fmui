"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, RefreshIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Display name used for the avatar initial. */
  name: string;
}

export interface AIChatBubbleProps {
  message: ChatMessage;
  onRegenerate?: (message: ChatMessage) => void;
  className?: string;
}

export function AIChatBubble({ message, onRegenerate, className }: AIChatBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const isUser = message.role === "user";

  async function copy() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className={cn("group flex w-full gap-3", isUser && "flex-row-reverse", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          isUser ? "bg-accent text-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        {message.name.charAt(0).toUpperCase()}
      </span>
      <div className={cn("flex max-w-[80%] flex-col gap-1.5", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-[16px] px-4 py-2.5 text-sm leading-6",
            isUser
              ? "rounded-tr-[6px] bg-primary text-primary-foreground"
              : "rounded-tl-[6px] border border-border bg-surface text-foreground",
          )}
        >
          <span className="sr-only">{message.name} said: </span>
          {message.content}
        </div>
        {!isUser && (
          <div className="flex items-center gap-0.5 opacity-70 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <button
              type="button"
              onClick={copy}
              aria-label={copied ? "Copied" : "Copy message"}
              className="inline-flex size-7 items-center justify-center rounded-[6px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={14} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => onRegenerate?.(message)}
              aria-label="Regenerate response"
              className="inline-flex size-7 items-center justify-center rounded-[6px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} />
            </button>
            <span className="mx-1 h-4 w-px bg-border" />
            {(["up", "down"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={vote === v}
                aria-label={v === "up" ? "Good response" : "Bad response"}
                onClick={() => setVote((cur) => (cur === v ? null : v))}
                className={cn(
                  "inline-flex h-7 items-center justify-center rounded-[6px] px-1.5 text-xs transition-colors hover:bg-accent",
                  vote === v ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={vote === v ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={v === "down" ? "rotate-180" : undefined} aria-hidden="true">
                  <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
