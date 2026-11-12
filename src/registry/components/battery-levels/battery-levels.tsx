"use client";

import { RollingNumber } from "@/registry/components/rolling-number/rolling-number";
import { cn } from "@/lib/utils";

export interface BatteryDevice {
  name: string;
  /** 0 to 100. */
  level: number;
  charging?: boolean;
}

export interface BatteryLevelsProps {
  devices: BatteryDevice[];
  className?: string;
}

/** Battery levels for a few devices, with a bolt and a blue bar while charging. */
export function BatteryLevels({ devices, className }: BatteryLevelsProps) {
  return (
    <div className={cn("flex w-44 flex-col gap-3.5 rounded-[24px] bg-accent p-4", className)}>
      {devices.map((device) => {
        const level = Math.min(100, Math.max(0, Math.round(device.level)));
        return (
          <div key={device.name}>
            <div className="flex items-center justify-between text-[13px]/[16px]">
              <span className="font-medium text-heading">{device.name}</span>
              <span className="flex items-center gap-1 text-xs font-medium text-heading">
                <Bolt
                  className={cn(
                    "transition-[scale,opacity] duration-200 ease-out-strong",
                    !device.charging && "scale-90 opacity-0",
                  )}
                />
                <RollingNumber value={level} format={(n) => `${n}%`} duration={500} />
              </span>
            </div>
            <div
              role="meter"
              aria-label={`${device.name} battery`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={level}
              aria-valuetext={`${level}%${device.charging ? ", charging" : ""}`}
              className="mt-1.5 h-1 overflow-hidden rounded-full bg-heading/10"
            >
              <div
                className={cn(
                  "h-full origin-left rounded-full transition-[transform,background-color] duration-500 ease-out-strong motion-reduce:transition-[background-color]",
                  device.charging ? "bg-[#3358eb]" : "bg-heading",
                )}
                style={{ transform: `scaleX(${level / 100})` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Bolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 14" width="8" height="11" aria-hidden="true" className={cn("text-[#3358eb]", className)}>
      <path d="M6 0.5 1 8h3.4L3.6 13.5 9 5.7H5.5L6 0.5z" fill="currentColor" />
    </svg>
  );
}
