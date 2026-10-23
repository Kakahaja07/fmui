import { getFeaturedComponents } from "@/lib/component-catalog";
import { FrameSection } from "@/components/layout/frame";
import { ComponentCard } from "@/components/gallery/component-card";
import { SectionHeading } from "@/components/home/section-heading";

export function FeaturedComponents() {
  const featured = getFeaturedComponents();
  return (
    <FrameSection className="py-12 md:py-14">
      <SectionHeading
        title="Featured components"
        description="Live demos, not screenshots. Click, type, and drag, then open the docs to copy the source."
      />
      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((c) => (
          <li key={c.slug}>
            <ComponentCard component={c} size="lg" />
          </li>
        ))}
      </ul>
    </FrameSection>
  );
}
