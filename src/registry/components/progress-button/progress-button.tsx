"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SquareLock02Icon } from "@hugeicons/core-free-icons";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export type DeployStatus = "idle" | "deploying" | "live";

export interface DeployButtonProps {
  /** Controlled status. Leave unset to let the button run its own cycle. */
  status?: DeployStatus;
  defaultStatus?: DeployStatus;
  onStatusChange?: (status: DeployStatus) => void;
  /** Called when the user starts a deploy. */
  onDeploy?: () => void;
  /** 0 to 100. Leave unset to simulate progress, which finishes with status "live". */
  progress?: number;
  /** Length of the simulated deploy in milliseconds. */
  duration?: number;
  labels?: { idle?: string; deploying?: string; live?: string };
  className?: string;
}

const PAD_X = 22;

/** A deploy button that fills with progress and settles into a compact "Live" pill. */
export function DeployButton({
  status: statusProp,
  defaultStatus = "idle",
  onStatusChange,
  onDeploy,
  progress: progressProp,
  duration = 2500,
  labels,
  className,
}: DeployButtonProps) {
  const [statusState, setStatusState] = useState(defaultStatus);
  const status = statusProp ?? statusState;
  const [simulated, setSimulated] = useState(0);
  const progress = Math.round(progressProp ?? (status === "deploying" ? simulated : status === "live" ? 100 : 0));
  const contentRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const firstStatus = useRef(true);
  const [width, setWidth] = useState<number>();
  const text = { idle: "Deploy site", deploying: "Deploying", live: "Live", ...labels };

  function setStatus(next: DeployStatus) {
    if (statusProp === undefined) setStatusState(next);
    onStatusChange?.(next);
  }
  const setStatusRef = useRef(setStatus);
  useEffect(() => {
    setStatusRef.current = setStatus;
  });

  // Simulated progress: slow start, fast finish, then go live.
  useEffect(() => {
    if (status !== "deploying" || progressProp !== undefined) return;
    const start = performance.now();
    const id = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / duration);
      setSimulated(t * t * 100);
      if (t === 1) {
        window.clearInterval(id);
        setStatusRef.current("live");
      }
    }, 80);
    return () => {
      window.clearInterval(id);
      setSimulated(0);
    };
  }, [status, progressProp, duration]);

  // Size the pill to its content so state changes animate width instead of jumping.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth + PAD_X * 2));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Blur the new label in so state swaps read as one morph, not two labels.
  useEffect(() => {
    if (firstStatus.current) {
      firstStatus.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    labelRef.current?.animate(
      [
        { opacity: 0, filter: "blur(2px)" },
        { opacity: 1, filter: "blur(0px)" },
      ],
      { duration: 250, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    );
  }, [status]);

  function onClick() {
    if (status === "idle") {
      onDeploy?.();
      setStatus("deploying");
    } else if (status === "live") {
      setStatus("idle");
    }
  }

  const deploying = status === "deploying";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-disabled={deploying}
      className={cn(
        "relative inline-flex h-10 items-center px-[22px] justify-center overflow-hidden rounded-full text-[13px] font-semibold text-white shadow-card active:scale-[0.97] motion-reduce:transition-none",
        status === "live" ? "bg-[#3358eb]" : "bg-[#111]",
        className,
      )}
      style={{
        width,
        transitionProperty: "transform, width, background-color",
        transitionDuration: "150ms, 300ms, 200ms",
        transitionTimingFunction: "var(--ease-out-strong)",
      }}
    >
      <span
        aria-hidden="true"
        className={cn("absolute inset-0 bg-[#3358eb]", deploying && "transition-[clip-path] duration-150 ease-linear motion-reduce:transition-none")}
        style={{ clipPath: `inset(0 ${status === "idle" ? 100 : 100 - progress}% 0 0)` }}
      />
      <span ref={contentRef} className="relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
        <span key={status} ref={labelRef} className="inline-flex items-center gap-1.5">
          {status === "idle" && <HugeiconsIcon icon={SquareLock02Icon} size={14} strokeWidth={2} aria-hidden="true" />}
          {status === "live" && <CheckBadge />}
          {text[status]}
          {deploying && (
            <RollingNumber value={progress} format={(n) => `${n}%`} duration={300} className="ml-1 text-white/60" />
          )}
        </span>
      </span>
      <span role="status" className="sr-only">
        {deploying ? `${text.deploying}` : status === "live" ? text.live : ""}
      </span>
    </button>
  );
}

function CheckBadge() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
      <circle cx="8" cy="8" r="7.5" fill="white" />
      <path d="M5 8.2l2 2 4-4.2" fill="none" stroke="#3358eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
