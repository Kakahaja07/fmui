import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  AiMagicIcon,
  ChartLineData01Icon,
  CursorMagicSelection02Icon,
  FormIcon,
  Layout01Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { categories } from "@/data/categories";
import { categoryCounts, categoryLiveCounts } from "@/lib/component-catalog";
import type { ComponentCategory } from "@/types/component";
import { cn } from "@/lib/utils";
import { ShowcaseCardFooter, showcaseCard } from "@/components/ui/showcase-card";
import { ComponentThumbnail } from "@/components/gallery/component-thumbnail";
import { FrameSection } from "@/components/layout/frame";
import { SectionHeading } from "@/components/home/section-heading";

const icons: Record<ComponentCategory, IconSvgElement> = {
  interactive: CursorMagicSelection02Icon,
  "cards-data": ChartLineData01Icon,
  "forms-inputs": FormIcon,
  "motion-feedback": ZapIcon,
  ai: AiMagicIcon,
  "navigation-layout": Layout01Icon,
};

const sampleSlug: Record<ComponentCategory, string> = {
  interactive: "animated-segmented-control",
  "cards-data": "metric-card",
  "forms-inputs": "tag-input",
  "motion-feedback": "animated-counter",
  ai: "ai-chat-bubble",
  "navigation-layout": "floating-dock",
};

export function CategoryGrid() {
  return (
    <FrameSection className="py-12 md:py-14">
      <SectionHeading
        title="Find the right component faster"
        description="Six categories, fifty components, one consistent design language."
      />
      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link href={`/components?category=${cat.id}`} title={cat.description} className={showcaseCard.shell}>
              <div className={cn(showcaseCard.panel, "flex h-40 items-center justify-center")}>
                <ComponentThumbnail slug={sampleSlug[cat.id]} category={cat.id} />
              </div>
              <ShowcaseCardFooter
                title={
                  <>
                    <HugeiconsIcon icon={icons[cat.id]} size={16} strokeWidth={1.8} className="shrink-0 text-muted-foreground" />
                    <span className="truncate">{cat.name}</span>
                  </>
                }
                aside={`${categoryLiveCounts[cat.id]} of ${categoryCounts[cat.id]} live`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </FrameSection>
  );
}
