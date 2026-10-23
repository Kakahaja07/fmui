import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { FrameSection } from "@/components/layout/frame";

export function PageHeader({
  icon,
  eyebrow,
  title,
  description,
  aside,
}: {
  icon: IconSvgElement;
  eyebrow: string;
  title: string;
  description?: string;
  aside?: React.ReactNode;
}) {
  return (
    <FrameSection divider={false} className="pb-10 pt-12 md:pb-12 md:pt-16">
      <p className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 text-[12.5px] font-semibold text-muted-foreground shadow-xs">
        <HugeiconsIcon icon={icon} size={14} strokeWidth={2} />
        {eyebrow}
      </p>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[620px]">
          <h1 className="text-balance text-[34px] leading-[1.05] tracking-[-0.04em] md:text-[44px]">{title}</h1>
          {description && (
            <p className="mt-3 text-pretty text-[15.5px] leading-[1.6] text-muted-foreground md:text-base">{description}</p>
          )}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </FrameSection>
  );
}
