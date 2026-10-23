import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CubeIcon } from "@hugeicons/core-free-icons";
import { blockGroups, plannedBlockCount } from "@/data/blocks";
import { PageHeader } from "@/components/layout/page-header";
import { FrameSection } from "@/components/layout/frame";
import { BlocksBrowser } from "@/components/blocks/blocks-browser";

export const metadata: Metadata = pageMetadata({
  title: "Shadcn Blocks for React & Tailwind (Coming Soon)",
  description: `Planned shadcn-compatible blocks for React and Tailwind CSS: app shells, dashboards, AI chat, pricing, onboarding, and heroes. ${plannedBlockCount} planned, none published yet.`,
  path: "/blocks",
});

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
