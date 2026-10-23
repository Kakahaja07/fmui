import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons/core-free-icons";
import { Button, ButtonArrow } from "@/components/ui/button";
import { FrameSection } from "@/components/layout/frame";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <FrameSection divider={false} className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex size-11 items-center justify-center rounded-[12px] border border-border bg-background text-heading shadow-xs">
        <HugeiconsIcon icon={Search02Icon} size={20} strokeWidth={1.8} />
      </span>
      <p className="mt-5 font-mono text-xs font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-[30px] tracking-[-0.035em] md:text-[38px]">This page does not exist</h1>
      <p className="mt-3 max-w-md text-[15px] leading-6 text-muted-foreground">
        The link may be outdated, or the component you are looking for has a different name.
      </p>
      <div className="mt-8 flex gap-2.5">
        <Button asChild>
          <Link href="/components">
            Browse components
            <ButtonArrow />
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </FrameSection>
  );
}
