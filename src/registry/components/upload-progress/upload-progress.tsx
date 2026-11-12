"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface UploadCardProps {
  fileName: string;
  /** 0 to 100. At 100 the file icon turns into a check. */
  progress: number;
  uploadingLabel?: string;
  doneLabel?: string;
  className?: string;
}

/** A file upload tile with a progress bar, rolling percent, and a check when done. */
export function UploadCard({
  fileName,
  progress,
  uploadingLabel = "Uploading",
  doneLabel = "Uploaded",
  className,
}: UploadCardProps) {
  const value = Math.min(100, Math.max(0, Math.round(progress)));
  const done = value === 100;

  return (
    <div className={cn("flex h-40 w-44 flex-col rounded-[24px] bg-accent p-4", className)}>
      <span aria-hidden="true" className="relative size-8">
        <span
          className={cn(
            "absolute inset-0 grid place-items-center rounded-[10px] bg-background text-heading shadow-xs transition-[scale,opacity] duration-200 ease-out-strong",
            done && "scale-90 opacity-0",
          )}
        >
          <HugeiconsIcon icon={File01Icon} size={16} strokeWidth={1.8} />
        </span>
        <span
          className={cn(
            "absolute inset-0 grid place-items-center rounded-full bg-[#3358eb] text-white shadow-[0_4px_12px_-4px_#3358eb] transition-[scale,opacity] motion-reduce:transition-opacity",
            // Pop in with a little overshoot; leave quickly.
            done ? "duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]" : "scale-90 opacity-0 duration-200 ease-out-strong",
          )}
        >
          <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={2.6} />
        </span>
      </span>

      <p className="mt-auto truncate text-[13px]/[16px] font-semibold text-heading">{fileName}</p>
      <div className="mt-0.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{done ? doneLabel : uploadingLabel}</span>
        <RollingNumber value={value} format={(n) => `${n}%`} duration={400} className="font-medium text-heading" />
      </div>
      <div
        role="progressbar"
        aria-label={`Uploading ${fileName}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="mt-2 h-1 overflow-hidden rounded-full bg-heading/10"
      >
        <div
          className="h-full origin-left rounded-full bg-[#3358eb] transition-transform duration-300 ease-linear motion-reduce:transition-none"
          style={{ transform: `scaleX(${value / 100})` }}
        />
      </div>
    </div>
  );
}
