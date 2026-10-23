import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  CubeIcon,
  InformationSquareIcon,
  LicenseIcon,
  Shield02Icon,
  StarsIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { siteConfig } from "@/lib/metadata";
import { allComponents, availableComponents } from "@/lib/component-catalog";
import { Button, ButtonArrow } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { FrameSection } from "@/components/layout/frame";

export const metadata: Metadata = pageMetadata({
  title: "About FMUI: Free Open-Source React Component Library",
  absoluteTitle: true,
  description:
    "FMUI is a free, MIT-licensed library of shadcn-compatible React components for Tailwind CSS. Learn how it is built, its principles, and how to contribute.",
  path: "/about",
});

function Block({ id, title, icon, children }: { id: string; title: string; icon: IconSvgElement; children: React.ReactNode }) {
  return (
    <section id={id} className="grid grid-cols-1 scroll-mt-24 gap-3 border-t border-border py-8 first:border-t-0 first:pt-0 md:grid-cols-[220px_1fr] md:gap-8">
      <h2 className="flex items-center gap-2.5 text-[17px] tracking-[-0.02em]">
        <span className="flex size-8 items-center justify-center rounded-[9px] border border-border bg-background text-heading shadow-xs">
          <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} />
        </span>
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-[15px] leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        icon={InformationSquareIcon}
        eyebrow="About"
        title="About FMUI"
        description="Free Modern UI is a collection of React components you copy into your own project. No package, no runtime, no lock-in."
      />
      <FrameSection className="py-12">
        <Block id="what" title="What it is" icon={CubeIcon}>
          <p>
            FMUI ships {allComponents.length} planned components across six categories. {availableComponents.length} are
            built today with working demos and real source code; the rest are listed as coming soon so you can see the
            roadmap without being misled about what exists.
          </p>
          <p>
            Each component is a single TypeScript file styled with Tailwind CSS v4. They rely on a handful of
            well-known primitives: Radix UI for menus and dialogs, cmdk for command lists, Motion for the few
            physics-based interactions, and Hugeicons for icons.
          </p>
        </Block>

        <Block id="principles" title="Principles" icon={StarsIcon}>
          <ul className="flex flex-col gap-2">
            {[
              "Interactions are fast. Most transitions run under 250ms with strong ease-out curves.",
              "Keyboard and screen reader support is part of the component, not an add-on.",
              "Reduced motion is respected everywhere motion is used.",
              "Nothing on this site is fabricated: no fake statistics, no invented community links.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-heading" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <Block id="contributing" title="Contributing" icon={UserGroupIcon}>
          <p>
            FMUI is developed in the open on{" "}
            <a
              href={`https://github.com/${siteConfig.githubRepo}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-heading underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            . Contributions follow the usual flow: open an issue, agree on scope, then send a pull request with a
            demo and a documentation entry.
          </p>
        </Block>

        <Block id="license" title="License" icon={LicenseIcon}>
          <p>
            Component source and this website are released under the MIT License. Use them in personal and
            commercial projects without attribution.
          </p>
        </Block>

        <Block id="privacy" title="Privacy" icon={Shield02Icon}>
          <p>
            fmui.dev does not use cookies, analytics, or tracking scripts. Your theme preference is stored in your
            browser only.
          </p>
        </Block>
      </FrameSection>
      <FrameSection className="py-10">
        <div className="flex flex-wrap gap-2.5">
          <Button asChild>
            <Link href="/components">
              Explore components
              <ButtonArrow />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/changelog">Read the changelog</Link>
          </Button>
        </div>
      </FrameSection>
    </>
  );
}
