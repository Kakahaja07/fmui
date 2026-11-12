"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, GithubIcon } from "@hugeicons/core-free-icons";
import { MagneticButton } from "@/registry/components/magnetic-button/magnetic-button";

export default function MagneticButtonDemo() {
  return (
    <div className="flex w-[320px] flex-col items-center rounded-[24px] bg-accent px-4 pb-7 pt-6 text-center">
      <p className="text-[13px]/[16px] font-semibold text-heading">Ready to ship?</p>
      <p className="mt-1 text-xs text-muted-foreground">Move your cursor near the buttons.</p>
      <div className="mt-6 flex items-center gap-3">
        <MagneticButton>
          Get started
          <HugeiconsIcon icon={ArrowRight02Icon} size={16} strokeWidth={2} aria-hidden="true" />
        </MagneticButton>
        <MagneticButton
          strength={0.5}
          aria-label="Star on GitHub"
          className="size-11 bg-background px-0 text-heading shadow-xs"
        >
          <HugeiconsIcon icon={GithubIcon} size={18} strokeWidth={1.8} aria-hidden="true" />
        </MagneticButton>
      </div>
    </div>
  );
}
