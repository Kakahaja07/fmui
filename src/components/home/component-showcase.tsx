import { allComponents, availableComponents, getFeaturedComponents, queryComponents } from "@/lib/component-catalog";
import { FrameSection } from "@/components/layout/frame";
import { ComponentCard } from "@/components/gallery/component-card";
import { SectionHeading } from "@/components/home/section-heading";

export function ComponentShowcase() {
  const featured = new Set(getFeaturedComponents().map((c) => c.slug));
  const items = queryComponents({ sort: "newest" })
    .filter((c) => c.status !== "coming-soon" && !featured.has(c.slug))
    .slice(0, 6);
  return (
    <FrameSection className="py-12 md:py-14">
      <SectionHeading
        title="Recently added"
        description={`${availableComponents.length} components have live demos today. The rest of the ${allComponents.length} are on the roadmap.`}
        action={{ label: `View all ${allComponents.length}`, href: "/components" }}
      />
      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <li key={c.slug}>
            <ComponentCard component={c} />
          </li>
        ))}
      </ul>
    </FrameSection>
  );
}
