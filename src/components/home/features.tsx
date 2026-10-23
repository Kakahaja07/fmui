import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, GiftIcon, PaintBrush01Icon, SourceCodeIcon } from "@hugeicons/core-free-icons";
import { FrameSection } from "@/components/layout/frame";
import { SectionHeading } from "@/components/home/section-heading";

const features = [
  {
    icon: Copy01Icon,
    title: "Copy and own",
    text: "Component source lives in your project. No package to upgrade, no abstraction to fight.",
  },
  {
    icon: PaintBrush01Icon,
    title: "Beautiful by default",
    text: "Considered typography, spacing, and motion, so the first render already looks finished.",
  },
  {
    icon: SourceCodeIcon,
    title: "Built for customization",
    text: "Plain Tailwind classes and editable TypeScript. Change a token or rewrite a line.",
  },
  {
    icon: GiftIcon,
    title: "Free and open source",
    text: "No paywall for the first 50 components. MIT licensed for personal and commercial work.",
  },
];

export function Features() {
  return (
    <FrameSection className="py-12 md:py-14">
      <SectionHeading title="Small decisions, made carefully" />
      <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <li key={f.title} className="bg-background p-5">
            <span className="flex size-9 items-center justify-center rounded-[10px] border border-border bg-surface text-heading">
              <HugeiconsIcon icon={f.icon} size={17} strokeWidth={1.8} />
            </span>
            <h3 className="mt-5 text-[15px] tracking-[-0.015em]">{f.title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted-foreground">{f.text}</p>
          </li>
        ))}
      </ul>
    </FrameSection>
  );
}
