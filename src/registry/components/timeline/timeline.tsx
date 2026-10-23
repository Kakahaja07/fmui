"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface TimelineMilestone {
  id: string;
  title: string;
  date: string;
  status: "done" | "current" | "upcoming";
  details?: string;
}

export interface TimelineProps {
  milestones: TimelineMilestone[];
  className?: string;
}

export function Timeline({ milestones, className }: TimelineProps) {
  const [openId, setOpenId] = useState<string | null>(milestones.find((m) => m.status === "current")?.id ?? null);

  return (
    <ol className={cn("relative w-full max-w-md", className)}>
      {milestones.map((m, i) => {
        const open = openId === m.id;
        const last = i === milestones.length - 1;
        return (
          <li key={m.id} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-[11px] top-6 h-[calc(100%-8px)] w-px",
                  m.status === "done" ? "bg-primary" : "border-l border-dashed border-border-strong",
                )}
              />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-colors",
                m.status === "done" && "border-primary bg-primary text-primary-foreground",
                m.status === "current" && "border-primary",
                m.status === "upcoming" && "border-border-strong",
              )}
            >
              {m.status === "done" && <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={3} />}
              {m.status === "current" && <span className="size-2 rounded-full bg-primary" />}
            </span>
            <div className="min-w-0 flex-1">
              <button
                type="button"
                aria-expanded={open}
                disabled={!m.details}
                onClick={() => setOpenId(open ? null : m.id)}
                className="flex w-full items-start justify-between gap-3 text-left disabled:cursor-default"
              >
                <span>
                  <span
                    className={cn(
                      "block text-sm font-medium",
                      m.status === "upcoming" ? "text-muted-foreground" : "text-foreground",
                    )}
                  >
                    {m.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {m.date}
                    {m.status === "current" && <span className="ml-2 font-medium text-foreground">In progress</span>}
                  </span>
                </span>
                {m.details && (
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    size={16}
                    strokeWidth={2}
                    className={cn(
                      "mt-0.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out-strong",
                      open && "rotate-180",
                    )}
                  />
                )}
              </button>
              {m.details && (
                <div
                  className="grid transition-[grid-template-rows] duration-250 ease-out-strong"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pt-2 text-sm leading-6 text-muted-foreground">{m.details}</p>
                  </div>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
