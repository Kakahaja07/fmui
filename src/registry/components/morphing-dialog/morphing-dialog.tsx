"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface MorphingDialogProps {
  title: string;
  subtitle: string;
  /** Rendered inside the expanded dialog. */
  children: React.ReactNode;
  className?: string;
}

const transition = { type: "spring", duration: 0.45, bounce: 0.1 } as const;
const noopSubscribe = () => () => {};

/**
 * A card that expands into a centered dialog using a shared layout
 * animation. Focus moves into the dialog on open and returns to the card on
 * close; Escape and the backdrop both dismiss it.
 */
export function MorphingDialog({ title, subtitle, children, className }: MorphingDialogProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  // The dialog is portaled to <body> so transformed or clipped ancestors cannot trap it.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        layoutId={reduce ? undefined : `${id}-card`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "flex w-64 flex-col items-start gap-1 rounded-[14px] border border-border bg-background p-4 text-left shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-shadow hover:shadow-card",
          open && "invisible",
          className,
        )}
        style={{ borderRadius: 14 }}
      >
        <motion.span layoutId={reduce ? undefined : `${id}-title`} className="text-sm font-semibold text-foreground">
          {title}
        </motion.span>
        <motion.span layoutId={reduce ? undefined : `${id}-subtitle`} className="text-xs text-muted-foreground">
          {subtitle}
        </motion.span>
      </motion.button>

      {mounted && createPortal(
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/40"
            />
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                key="dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${id}-heading`}
                layoutId={reduce ? undefined : `${id}-card`}
                transition={transition}
                initial={reduce ? { opacity: 0 } : undefined}
                animate={reduce ? { opacity: 1 } : undefined}
                exit={reduce ? { opacity: 0 } : undefined}
                style={{ borderRadius: 18 }}
                className="pointer-events-auto relative w-full max-w-md border border-border bg-background p-6 shadow-float"
              >
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-[8px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2} />
                </button>
                <motion.h2
                  id={`${id}-heading`}
                  layoutId={reduce ? undefined : `${id}-title`}
                  className="text-base font-semibold text-foreground"
                >
                  {title}
                </motion.h2>
                <motion.p layoutId={reduce ? undefined : `${id}-subtitle`} className="text-sm text-muted-foreground">
                  {subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="mt-4 text-sm leading-6 text-foreground"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
