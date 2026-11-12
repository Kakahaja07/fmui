"use client";

import { useEffect, useRef, useState } from "react";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface LikeButtonProps {
  /** Likes from everyone else. Your own like is added on top. */
  count: number;
  liked?: boolean;
  defaultLiked?: boolean;
  onLikedChange?: (liked: boolean) => void;
  label?: string;
  className?: string;
}

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

/** A like toggle with a pop, an expanding ring, and a rolling count. */
export function LikeButton({
  count,
  liked: likedProp,
  defaultLiked = false,
  onLikedChange,
  label = "likes",
  className,
}: LikeButtonProps) {
  const [likedState, setLikedState] = useState(defaultLiked);
  const liked = likedProp ?? likedState;
  const ringRef = useRef<HTMLSpanElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);
  const wasLiked = useRef(liked);

  // Celebrate only the moment a like lands, whether it came from a click or from props.
  useEffect(() => {
    const landed = liked && !wasLiked.current;
    wasLiked.current = liked;
    if (!landed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ringRef.current?.animate(
      [
        { transform: "scale(1)", opacity: 0.9 },
        { transform: "scale(1.7)", opacity: 0 },
      ],
      { duration: 650, easing: EASE_OUT },
    );
    heartRef.current?.animate([{ transform: "scale(0.7)" }, { transform: "scale(1)" }], {
      duration: 400,
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    });
  }, [liked]);

  function toggle() {
    const next = !liked;
    if (likedProp === undefined) setLikedState(next);
    onLikedChange?.(next);
  }

  return (
    <div className={cn("flex w-44 flex-col items-center rounded-[24px] bg-accent px-4 pb-4 pt-5", className)}>
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Unlike" : "Like"}
        onClick={toggle}
        className="relative grid size-14 place-items-center rounded-full bg-background shadow-card transition-transform duration-150 ease-out-strong active:scale-[0.94]"
      >
        <span
          ref={ringRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border border-[#3358eb] opacity-0"
        />
        <svg
          ref={heartRef}
          viewBox="0 0 24 24"
          width="22"
          height="22"
          aria-hidden="true"
          className={cn(
            "transition-colors duration-200",
            liked ? "fill-[#3358eb] text-[#3358eb]" : "fill-transparent text-heading",
          )}
        >
          <path
            d="M12 20.3s-7.4-4.5-9.2-9.1C1.5 7.9 3.5 4.6 7 4.6c2 0 3.6 1.1 5 2.9 1.4-1.8 3-2.9 5-2.9 3.5 0 5.5 3.3 4.2 6.6-1.8 4.6-9.2 9.1-9.2 9.1z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <RollingNumber
        value={count + (liked ? 1 : 0)}
        className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-heading"
      />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
