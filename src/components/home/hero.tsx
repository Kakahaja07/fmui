import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  BookOpen02Icon,
  GithubIcon,
  ReactIcon,
  ShadcnIcon,
  SparklesIcon,
  TailwindcssIcon,
  Typescript01Icon,
} from "@hugeicons/core-free-icons";
import { allComponents, statusCounts } from "@/lib/component-catalog";
import { siteConfig } from "@/lib/metadata";
import { Button, ButtonArrow } from "@/components/ui/button";
import { FrameSection } from "@/components/layout/frame";

function NextMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M9.25 16.25V7.75l7 9.5" fill="none" stroke="var(--page)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.75 7.75v5" stroke="var(--page)" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const stack: { label: string; icon?: IconSvgElement }[] = [
  { label: "React 19", icon: ReactIcon },
  { label: "Next.js" },
  { label: "Tailwind CSS v4", icon: TailwindcssIcon },
  { label: "TypeScript", icon: Typescript01Icon },
  { label: "shadcn compatible", icon: ShadcnIcon },
];

export function Hero() {
  return (
    <FrameSection divider={false} className="flex flex-col items-center pb-8 pt-10 text-center md:pb-10 md:pt-10">
      <Link
        href="/changelog"
        className="group inline-flex h-7 items-center gap-2 rounded-full border border-border bg-background pl-1 pr-2.5 text-[12.5px] font-medium text-muted-foreground shadow-xs transition-colors hover:text-heading"
      >
        <span className="inline-flex h-5 items-center gap-1 rounded-full bg-primary px-2 text-[11px] font-semibold text-primary-foreground">
          <HugeiconsIcon icon={SparklesIcon} size={11} strokeWidth={2.2} />
          New
        </span>
        {allComponents.length} components: {statusCounts.available} available, {statusCounts.preview} in preview
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={13}
          strokeWidth={2}
          className="transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5"
        />
      </Link>

      <h1 className="mt-5 max-w-[780px] text-balance text-[42px] leading-[1.02] tracking-[-0.045em] sm:text-[54px] md:text-[64px]">
        Beautiful components. Built for your next idea.
      </h1>
      <p className="mt-4 max-w-[540px] text-pretty text-base leading-[1.6] text-muted-foreground md:text-[17px]">
        A thoughtfully crafted collection of free, shadcn-compatible React components built with Tailwind CSS.
        Customizable, open source, and ready to make your own.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <Button asChild size="lg">
          <Link href="/components">
            Explore components
            <ButtonArrow />
          </Link>
        </Button>
        {siteConfig.githubRepo ? (
          <Button asChild size="lg" variant="secondary">
            <a href={`https://github.com/${siteConfig.githubRepo}`} target="_blank" rel="noreferrer">
              <HugeiconsIcon icon={GithubIcon} strokeWidth={1.8} />
              View on GitHub
            </a>
          </Button>
        ) : (
          <Button asChild size="lg" variant="secondary">
            <Link href="/about">
              <HugeiconsIcon icon={BookOpen02Icon} strokeWidth={1.8} />
              Discover FMUI
            </Link>
          </Button>
        )}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Built with</span>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5" aria-label="Built with">
          {stack.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-[13px] font-medium text-foreground/80">
              {item.icon ? <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.8} /> : <NextMark />}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </FrameSection>
  );
}
