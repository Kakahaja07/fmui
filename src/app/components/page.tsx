import type { Metadata } from "next";
import { Suspense } from "react";
import { GridViewIcon } from "@hugeicons/core-free-icons";
import { allComponents, statusCounts } from "@/lib/component-catalog";
import { absoluteUrl } from "@/lib/metadata";
import { ComponentBrowser } from "@/components/gallery/component-browser";
import { PageHeader } from "@/components/layout/page-header";
import { FrameSection } from "@/components/layout/frame";

export const metadata: Metadata = {
  title: "Components",
  description: `Browse ${allComponents.length} free React components for modern interfaces. Search by name, filter by category, and copy the source.`,
  alternates: { canonical: absoluteUrl("/components") },
};

function BrowserFallback() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[300px] animate-pulse rounded-[14px] border border-border bg-surface" />
      ))}
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        icon={GridViewIcon}
        eyebrow="Library"
        title="Components"
        description="Discover beautifully crafted components. Every available card runs its live demo; open the docs for source and props."
        aside={
          <dl className="flex gap-6 text-sm">
            {[
              { label: "Available", value: statusCounts.available },
              { label: "Preview", value: statusCounts.preview },
              { label: "Coming soon", value: statusCounts["coming-soon"] },
            ].map((s) => (
              <div key={s.label}>
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="font-heading text-2xl font-semibold tracking-[-0.03em] text-heading tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        }
      />
      <FrameSection className="pb-16 pt-6" aria-label="Component catalog">
        <Suspense fallback={<BrowserFallback />}>
          <ComponentBrowser />
        </Suspense>
      </FrameSection>
    </>
  );
}
