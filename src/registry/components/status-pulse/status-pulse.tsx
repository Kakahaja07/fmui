import { cn } from "@/lib/utils";

export type PulseStatus = "online" | "live" | "syncing" | "away" | "offline";

export interface StatusPulseProps {
  status: PulseStatus;
  /** Visible text next to the dot. Screen readers always hear the status name first. */
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

const STATUS: Record<PulseStatus, { name: string; color: string; pulse: boolean }> = {
  online: { name: "Online", color: "bg-[#1f9d74]", pulse: true },
  live: { name: "Live", color: "bg-red-500", pulse: true },
  syncing: { name: "Syncing", color: "bg-[#3358eb]", pulse: true },
  away: { name: "Away", color: "bg-amber-500", pulse: false },
  offline: { name: "Offline", color: "bg-muted-foreground/50", pulse: false },
};

const SIZES = {
  sm: { dot: "size-2", text: "text-xs" },
  md: { dot: "size-2.5", text: "text-[13px]" },
};

// React hoists and dedupes this by href, so many indicators share one rule.
const PULSE_CSS = `@keyframes fmui-status-pulse { from { transform: scale(1); opacity: 0.55 } to { transform: scale(2.2); opacity: 0 } }`;

/** A status dot whose halo pulses softly while the status is active. */
export function StatusPulse({ status, label, size = "md", className }: StatusPulseProps) {
  const { name, color, pulse } = STATUS[status];
  const sizes = SIZES[size];

  return (
    <span role="status" className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className={cn("relative shrink-0", sizes.dot)}>
        {pulse && (
          <>
            <style href="fmui-status-pulse" precedence="default">
              {PULSE_CSS}
            </style>
            <span
              className={cn(
                "absolute inset-0 rounded-full animate-[fmui-status-pulse_2s_cubic-bezier(0,0,0.2,1)_infinite]",
                "motion-reduce:animate-none motion-reduce:scale-[1.9] motion-reduce:opacity-25",
                color,
              )}
            />
          </>
        )}
        <span className={cn("absolute inset-0 rounded-full", color)} />
      </span>
      {label !== name && <span className="sr-only">{label ? `${name}: ` : name}</span>}
      {label && <span className={cn("font-medium text-heading", sizes.text)}>{label}</span>}
    </span>
  );
}
