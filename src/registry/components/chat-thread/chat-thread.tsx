"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type ChatSide = "me" | "them";

export interface ChatMessage {
  id: string;
  from: ChatSide;
  text: string;
}

export interface ChatContact {
  name: string;
  /** Letter shown in the avatar. Defaults to the first letter of the name. */
  initial?: string;
  /** Avatar background color. */
  color?: string;
  status?: string;
}

export interface ChatThreadProps {
  messages: ChatMessage[];
  /** Who is typing right now; shows a dots bubble on that side. */
  typing?: ChatSide | null;
  contact?: ChatContact;
  className?: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function bubbleClass(from: ChatSide) {
  return cn(
    "max-w-[85%] rounded-[14px] px-3 py-1.5 text-xs/[16px]",
    from === "me" ? "bg-[#3358eb] text-white" : "bg-background text-heading shadow-xs",
  );
}

/** A compact chat where new messages rise in from the bottom and old ones fade out at the top. */
export function ChatThread({
  messages,
  typing = null,
  contact = { name: "Ines", color: "#f0694a", status: "online" },
  className,
}: ChatThreadProps) {
  const reduce = useReducedMotion();
  // `y` rather than a transform string: layout animations compose their own transform.
  const enter = { opacity: 0, y: reduce ? 0 : 12 };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: 0.35, ease: EASE_OUT };

  return (
    <div className={cn("w-[280px] rounded-[24px] bg-accent p-4", className)}>
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="grid size-7 place-items-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: contact.color ?? "#f0694a" }}
        >
          {contact.initial ?? contact.name.charAt(0)}
        </span>
        <div className="flex flex-col">
          <span className="text-[13px]/[15px] font-semibold text-heading">{contact.name}</span>
          {contact.status && <span className="text-[10px]/[12px] text-[#1f9d74]">{contact.status}</span>}
        </div>
      </div>
      <div
        role="log"
        aria-live="polite"
        aria-label={`Chat with ${contact.name}`}
        className="mt-1 flex h-[132px] flex-col justify-end gap-1.5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_36px)]"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              layout={reduce ? false : "position"}
              initial={enter}
              animate={shown}
              exit={{ opacity: 0 }}
              transition={transition}
              className={cn("flex", m.from === "me" && "justify-end")}
            >
              <p className={bubbleClass(m.from)}>{m.text}</p>
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key={`typing-${typing}`}
              aria-hidden="true"
              layout={reduce ? false : "position"}
              initial={enter}
              animate={shown}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={transition}
              className={cn("flex", typing === "me" && "justify-end")}
            >
              <span
                className={cn(
                  bubbleClass(typing),
                  "flex h-7 items-center gap-1",
                  typing === "them" && "text-muted-foreground",
                )}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-1 rounded-full bg-current"
                    animate={
                      reduce
                        ? { opacity: [0.4, 1, 0.4] }
                        : { transform: ["translateY(0px)", "translateY(-3px)", "translateY(0px)"] }
                    }
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                  />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
