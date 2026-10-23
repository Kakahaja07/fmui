import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { InstallCommand } from "@/components/docs/install-command";
import { FrameSection } from "@/components/layout/frame";
import { SectionHeading } from "@/components/home/section-heading";

export function InstallPreview() {
  return (
    <FrameSection id="installation" className="scroll-mt-16 py-12 md:py-14">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <SectionHeading
          title="One command per component"
          description="FMUI components are published as shadcn-compatible registry items. Until the registry endpoint ships, copy the source from any component page."
        />
        <div>
          <InstallCommand registryItem="prompt-input" />
          <p className="mt-3 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
            <HugeiconsIcon icon={InformationCircleIcon} size={14} strokeWidth={1.8} className="mt-0.5 shrink-0" />
            Illustrative. The registry URL is not live yet; the Code tab on each component page has the full source.
          </p>
        </div>
      </div>
    </FrameSection>
  );
}
