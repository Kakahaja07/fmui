"use client";

import { useRef, type ButtonHTMLAttributes, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** How far the button follows the cursor, as a fraction of the cursor's offset from center (0 to 1). */
  strength?: number;
}

const SPRING = { stiffness: 220, damping: 16, mass: 0.5 };
/** The label travels this much further than the button, which reads as depth. */
const LABEL_EXTRA = 0.4;

/**
 * A regular button that leans toward the cursor on spring physics and
 * settles back on leave. Only for hover-capable fine pointers; touch,
 * keyboard, and reduced-motion users get a plain button.
 */
export function MagneticButton({
  strength = 0.35,
  className,
  children,
  type = "button",
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const labelX = useTransform(springX, (v) => v * LABEL_EXTRA);
  const labelY = useTransform(springY, (v) => v * LABEL_EXTRA);
  const origin = useRef<{ x: number; y: number } | null>(null);

  function enter(e: PointerEvent<HTMLButtonElement>) {
    onPointerEnter?.(e);
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !fine || e.pointerType !== "mouse") return;
    // Measure the resting center: subtract wherever the spring currently is.
    const rect = e.currentTarget.getBoundingClientRect();
    origin.current = {
      x: rect.left + rect.width / 2 - springX.get(),
      y: rect.top + rect.height / 2 - springY.get(),
    };
  }

  function move(e: PointerEvent<HTMLButtonElement>) {
    onPointerMove?.(e);
    if (!origin.current) return;
    x.set((e.clientX - origin.current.x) * strength);
    y.set((e.clientY - origin.current.y) * strength);
  }

  function leave(e: PointerEvent<HTMLButtonElement>) {
    onPointerLeave?.(e);
    origin.current = null;
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span style={{ x: springX, y: springY }} className="inline-block">
      <button
        type={type}
        onPointerEnter={enter}
        onPointerMove={move}
        onPointerLeave={leave}
        className={cn(
          "inline-flex h-11 select-none items-center justify-center rounded-full bg-primary px-6 text-[13px] font-semibold text-primary-foreground shadow-card outline-none",
          "transition-[scale] duration-150 ease-out-strong active:scale-[0.97]",
          "focus-visible:ring-2 focus-visible:ring-[#3358eb]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <motion.span style={{ x: labelX, y: labelY }} className="inline-flex items-center gap-2">
          {children}
        </motion.span>
      </button>
    </motion.span>
  );
}
