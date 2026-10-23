"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

const managers = [
  { id: "pnpm", prefix: "pnpm dlx" },
  { id: "npm", prefix: "npx" },
  { id: "bun", prefix: "bunx --bun" },
] as const;

export function InstallCommand({ registryItem, className }: { registryItem: string; className?: string }) {
  const [manager, setManager] = useState<(typeof managers)[number]["id"]>("pnpm");
  const { state, copy } = useCopy();
  const prefix = managers.find((m) => m.id === manager)!.prefix;
  const command = `${prefix} shadcn@latest add https://fmui.dev/r/${registryItem}.json`;

  return (
    <div className={cn("overflow-hidden rounded-[12px] border border-border bg-code-bg shadow-xs", className)}>
      <div className="flex items-center justify-between border-b border-border bg-code-header px-2">
        <div role="tablist" aria-label="Package manager" className="flex">
          {managers.map((m) => (
            <button
              key={m.id}
              role="tab"
              type="button"
              aria-selected={manager === m.id}
              onClick={() => setManager(m.id)}
              className={cn(
                "-mb-px h-9 border-b-2 px-2.5 font-mono text-xs transition-colors",
                manager === m.id
                  ? "border-heading font-medium text-heading"
                  : "border-transparent text-muted-foreground hover:text-heading",
              )}
            >
              {m.id}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => copy(command)}
          aria-label={state === "copied" ? "Copied" : "Copy command"}
          className="inline-flex h-7 items-center gap-1.5 rounded-[7px] px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-heading"
        >
          <HugeiconsIcon icon={state === "copied" ? Tick02Icon : Copy01Icon} size={14} strokeWidth={2} />
          {state === "copied" ? "Copied" : state === "error" ? "Failed" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-6 text-foreground">
        <code>
          <span className="select-none text-muted-foreground">$ </span>
          {command}
        </code>
      </pre>
    </div>
  );
}
