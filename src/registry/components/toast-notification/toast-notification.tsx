"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface StackNotification {
  id: string;
  title: string;
  body: string;
  /** Background color of the app icon, e.g. "#1f9d74". */
  color: string;
  time?: string;
}

export interface ToastStackProps {
  /** Newest first. Only the first `max` are shown; the rest fall off the bottom. */
  notifications: StackNotification[];
  max?: number;
  className?: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** A stack of notification cards. New ones drop in on top and push the rest down. */
export function ToastStack({ notifications, max = 3, className }: ToastStackProps) {
  const visible = notifications.slice(0, max);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: EASE_OUT }}>
      <div
        role="log"
        aria-live="polite"
        aria-label="Notifications"
        className={cn("relative flex w-[252px] flex-col gap-2 rounded-[24px] bg-accent p-3 pb-14", className)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((n) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: "-100%", scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "40%", scale: 0.96, filter: "blur(4px)" }}
              className="flex items-center gap-2.5 rounded-[12px] bg-background px-2.5 py-2 shadow-xs"
            >
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-[8px] text-white ring-1 ring-inset ring-white/10"
                style={{ backgroundColor: n.color }}
              >
                <HugeiconsIcon icon={Notification03Icon} size={14} strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px]/[16px] font-semibold text-heading">{n.title}</span>
                <span className="block truncate text-xs/[16px] text-muted-foreground">{n.body}</span>
              </span>
              <span className="shrink-0 self-start pt-1 text-[11px] text-muted-foreground/60">{n.time ?? "now"}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
