import type { Metadata } from "next";
import { Suspense } from "react";
import { GridViewIcon } from "@hugeicons/core-free-icons";
import { allComponents, availableComponents, statusCounts } from "@/lib/component-catalog";
import { absoluteUrl, siteConfig } from "@/lib/metadata";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { ComponentBrowser, ComponentBrowserStatic } from "@/components/gallery/component-browser";
import { PageHeader } from "@/components/layout/page-header";
import { FrameSection } from "@/components/layout/frame";

export const metadata: Metadata = pageMetadata({
  title: "Free React UI Components, Shadcn Compatible",
  description: `Browse ${availableComponents.length} free React components with live demos: command menu, multi-select, stepper, pricing card, AI chat, prompt input, and more. Built with Tailwind CSS.`,
  path: "/components",
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FMUI components",
  url: absoluteUrl("/components"),
  description: `${allComponents.length} planned React components, ${availableComponents.length} with live demos and source.`,
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: availableComponents.length,
    itemListElement: availableComponents.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: absoluteUrl(`/components/${c.slug}`),
    })),
  },
};

export default function ComponentsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
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
        {/* The fallback is the full default grid, so the static HTML lists every component. */}
        <Suspense fallback={<ComponentBrowserStatic />}>
          <ComponentBrowser />
        </Suspense>
      </FrameSection>
    </>
  );
}
