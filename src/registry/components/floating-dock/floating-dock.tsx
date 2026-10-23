"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export interface DockItem {
  id: string;
  label: string;
  icon: IconSvgElement;
}

export interface FloatingDockProps {
  items: DockItem[];
  onSelect?: (item: DockItem) => void;
  className?: string;
}

const BASE = 40;
const MAX = 64;
const RANGE = 140;

/**
 * A dock whose icons magnify as the pointer approaches them. Keyboard users
 * get the same magnification on focus, and every item exposes its label.
 */
export function FloatingDock({ items, onSelect, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      role="toolbar"
      aria-label="Dock"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-16 items-end gap-2 rounded-[18px] border border-border bg-background/90 px-3 pb-2 shadow-float backdrop-blur",
        className,
      )}
    >
      {items.map((item) => (
        <DockIcon
          key={item.id}
          item={item}
          mouseX={mouseX}
          active={active === item.id}
          onSelect={() => {
            setActive(item.id);
            onSelect?.(item);
          }}
        />
      ))}
    </div>
  );
}

function DockIcon({
  item,
  mouseX,
  active,
  onSelect,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [focused, setFocused] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - bounds.x - bounds.width / 2;
  });
  const target = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]);
  const size = useSpring(target, { mass: 0.1, stiffness: 180, damping: 14 });
  const finalSize = useTransform(size, (s) => (focused ? MAX : s));

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={item.label}
      aria-pressed={active}
      onClick={onSelect}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ width: finalSize, height: finalSize }}
      className="group relative flex items-center justify-center rounded-[12px] border border-border bg-surface text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
    >
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        {item.label}
      </span>
      <HugeiconsIcon icon={item.icon} size={20} strokeWidth={2} />
      {active && <span className="absolute -bottom-1.5 size-1 rounded-full bg-foreground" aria-hidden="true" />}
    </motion.button>
  );
}
