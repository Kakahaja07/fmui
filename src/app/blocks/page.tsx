import type { Metadata } from "next";
import { CubeIcon } from "@hugeicons/core-free-icons";
import { absoluteUrl } from "@/lib/metadata";
import { blockGroups, plannedBlockCount } from "@/data/blocks";
import { PageHeader } from "@/components/layout/page-header";
import { FrameSection } from "@/components/layout/frame";
import { BlocksBrowser } from "@/components/blocks/blocks-browser";

export const metadata: Metadata = {
  title: "Blocks",
  description: "Page-level sections built from FMUI components: app shells, dashboards, AI chat, pricing, and more. Planned, not yet published.",
  alternates: { canonical: absoluteUrl("/blocks") },
};

export default function BlocksPage() {
  return (
    <>
      <PageHeader
        icon={CubeIcon}
        eyebrow="Coming soon"
        title="Blocks"
        description="Complete sections assembled from FMUI components, from app shells to pricing pages. None are published yet: every card below is a planned group. Open one to browse the components it will use."
        aside={
          <dl className="flex gap-6 text-sm">
            {[
              { label: "Groups", value: blockGroups.length },
              { label: "Planned", value: plannedBlockCount },
              { label: "Published", value: 0 },
            ].map((s) => (
              <div key={s.label}>
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="font-heading text-2xl font-semibold tracking-[-0.03em] text-heading tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        }
      />
      <FrameSection className="pb-16 pt-6" aria-label="Planned blocks">
        <BlocksBrowser />
      </FrameSection>
    </>
  );
}
