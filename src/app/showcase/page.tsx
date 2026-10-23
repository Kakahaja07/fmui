import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { PackageOpenIcon, StarsIcon } from "@hugeicons/core-free-icons";
import { showcase } from "@/data/showcase";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonArrow } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { FrameSection } from "@/components/layout/frame";

export const metadata: Metadata = pageMetadata({
  title: "Showcase: Projects Built With FMUI",
  description:
    "Websites and products built with FMUI's free React components. Entries are verified by hand, and the showcase opens for submissions soon.",
  path: "/showcase",
  // Empty pages are thin content; index the showcase once it has real entries.
  noindex: showcase.length === 0,
});

export default function ShowcasePage() {
  return (
    <>
      <PageHeader
        icon={StarsIcon}
        eyebrow="Community"
        title="Showcase"
        description="Products and sites built with FMUI. Entries are added by hand once a project is verified."
      />
      <FrameSection className="py-12" aria-label="Showcase projects">
        {showcase.length === 0 ? (
          <div className="flex flex-col items-center rounded-[16px] border border-dashed border-border-strong bg-background/60 px-6 py-20 text-center">
            <span className="flex size-11 items-center justify-center rounded-[12px] border border-border bg-background text-heading shadow-xs">
              <HugeiconsIcon icon={PackageOpenIcon} size={20} strokeWidth={1.8} />
            </span>
            <h2 className="mt-5 text-lg tracking-[-0.02em]">No projects listed yet</h2>
            <p className="mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">
              FMUI launched on October 23, 2026, so the showcase starts empty. A submission form is planned; until
              then there is no fake gallery to scroll through.
            </p>
            <Badge variant="info" className="mt-5">
              Submissions coming soon
            </Badge>
            <Button asChild variant="secondary" className="mt-6">
              <Link href="/components">
                Start building
                <ButtonArrow />
              </Link>
            </Button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((item) => (
              <li key={item.url} className="rounded-[16px] border border-border bg-background p-5">
                <a href={item.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-heading hover:underline">
                  {item.name}
                </a>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </FrameSection>
    </>
  );
}
