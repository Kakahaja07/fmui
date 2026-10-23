import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/lib/metadata";
import { Wordmark } from "@/components/layout/logo";
import { FrameNodes } from "@/components/layout/frame";
import { AuthorCredit } from "@/components/layout/author-credit";

export function SiteFooter() {
  return (
    <footer className="container-site relative border-t border-border">
      <FrameNodes />
      <div className="grid gap-10 py-12 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div className="max-w-[240px]">
          <Wordmark />
          <p className="mt-3 text-[13px] leading-5 text-muted-foreground">
            Free, modern React components you copy into your project and own.
          </p>
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <h3 className="text-[13px] font-semibold text-heading">{group.title}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-heading"
                  >
                    {link.label}
                    {"soon" in link && link.soon && (
                      <span className="rounded-full border border-border bg-background px-1.5 text-[10px] font-medium leading-4">
                        Soon
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative -mx-5 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 border-t border-border px-5 py-5 text-center text-xs text-muted-foreground sm:-mx-7 sm:px-7 lg:-mx-8 lg:px-8">
        <FrameNodes />
        <AuthorCredit className="text-xs" />
        <span>
          . {siteConfig.name} is open source and MIT licensed. Built with Next.js, Tailwind CSS, and Hugeicons.
        </span>
      </div>
    </footer>
  );
}
