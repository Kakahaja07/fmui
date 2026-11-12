"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface PresencePerson {
  id: string;
  name: string;
  /** Avatar background, e.g. "#3358eb". */
  color: string;
}

export interface PresenceAvatarsProps {
  /** Everyone in the file, in join order. The most recent `max` are shown. */
  people: PresencePerson[];
  max?: number;
  label?: string;
  caption?: string;
  className?: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Live presence: who is in the file right now, with a rolling headcount. */
export function PresenceAvatars({
  people,
  max = 4,
  label = "Live in file",
  caption = "people editing",
  className,
}: PresenceAvatarsProps) {
  const visible = people.slice(-max);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.35, ease: EASE_OUT }}>
      <div className={cn("flex h-[168px] w-44 flex-col rounded-[24px] bg-accent p-4", className)}>
        <p className="flex items-center gap-1.5 text-[13px]/[16px] font-medium text-heading">
          <span aria-hidden="true" className="relative grid size-3 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#1f9d74]/40 [animation-duration:2s] motion-reduce:animate-none" />
            <span className="size-1.5 rounded-full bg-[#1f9d74] ring-[3px] ring-[#1f9d74]/20" />
          </span>
          {label}
        </p>

        <ul aria-label="People in this file" className="relative mt-3 flex h-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((person, i) => (
              <motion.li
                key={person.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold text-white ring-2 ring-accent",
                  i > 0 && "-ml-2",
                )}
                style={{ backgroundColor: person.color }}
              >
                <span aria-hidden="true">{person.name.charAt(0).toUpperCase()}</span>
                <span className="sr-only">{person.name}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <p className="mt-auto flex items-baseline gap-1.5">
          <RollingNumber
            value={people.length}
            className="font-heading text-[22px]/none font-semibold tracking-[-0.02em] text-heading"
          />
          <span className="text-xs text-muted-foreground">{caption}</span>
        </p>
      </div>
    </MotionConfig>
  );
}
