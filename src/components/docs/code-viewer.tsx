"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertCircleIcon, Copy01Icon, File01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

export interface CodeTab {
  filename: string;
  path: string;
  code: string;
  html: string;
}

/** Shared frame for highlighted code: theme-aware surface, file header, and copy action. */
export function CodeFrame({
  header,
  copyText,
  html,
  maxHeight = 520,
  className,
}: {
  header: React.ReactNode;
  copyText: string;
  html: string;
  maxHeight?: number;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[12px] border border-border bg-code-bg shadow-xs", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-border bg-code-header pl-1 pr-2">
        {header}
        <CopyButton text={copyText} />
      </div>
      <div
        className="overflow-auto py-3 font-mono text-[12.5px] leading-6 [&_pre]:w-max [&_pre]:min-w-full"
        style={{ maxHeight }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export function FileLabel({ name }: { name: string }) {
  return (
    <span className="flex h-9 items-center gap-1.5 px-2.5 font-mono text-xs text-muted-foreground">
      <HugeiconsIcon icon={File01Icon} size={13} strokeWidth={1.8} />
      {name}
    </span>
  );
}

export function CodeViewer({ tabs, className }: { tabs: CodeTab[]; className?: string }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  if (!tab) return null;
  return (
    <CodeFrame
      className={className}
      copyText={tab.code}
      html={tab.html}
      header={
        <div role="tablist" aria-label="Source files" className="flex items-center overflow-x-auto no-scrollbar">
          {tabs.map((t, i) => (
            <button
              key={t.path}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "-mb-px flex h-9 shrink-0 items-center gap-1.5 border-b-2 px-2.5 font-mono text-xs transition-colors",
                i === active
                  ? "border-heading font-medium text-heading"
                  : "border-transparent text-muted-foreground hover:text-heading",
              )}
            >
              <HugeiconsIcon icon={File01Icon} size={13} strokeWidth={1.8} />
              {t.filename}
            </button>
          ))}
        </div>
      }
    />
  );
}

export function CopyButton({ text, label = "Copy code", className }: { text: string; label?: string; className?: string }) {
  const { state, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-label={state === "copied" ? "Copied" : state === "error" ? "Copy failed" : label}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-[7px] px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-heading",
        className,
      )}
    >
      <HugeiconsIcon
        icon={state === "copied" ? Tick02Icon : state === "error" ? AlertCircleIcon : Copy01Icon}
        size={14}
        strokeWidth={2}
      />
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "error" ? "Failed" : "Copy"}</span>
    </button>
  );
}
