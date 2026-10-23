import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { Add01Icon, News01Icon, RefreshIcon, Wrench01Icon } from "@hugeicons/core-free-icons";
import { absoluteUrl } from "@/lib/metadata";
import { changelog, type ChangelogEntry } from "@/data/changelog";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";
import { FrameSection } from "@/components/layout/frame";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release history for FMUI components and the website.",
  alternates: { canonical: absoluteUrl("/changelog") },
};

const typeMeta: Record<ChangelogEntry["changes"][number]["type"], { label: string; icon: IconSvgElement; className: string }> = {
  added: { label: "Added", icon: Add01Icon, className: "text-success" },
  changed: { label: "Changed", icon: RefreshIcon, className: "text-sky-600 dark:text-sky-400" },
  fixed: { label: "Fixed", icon: Wrench01Icon, className: "text-warning" },
};

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        icon={News01Icon}
        eyebrow="Releases"
        title="Changelog"
        description="Every release, with what was added, changed, and fixed."
      />
      <FrameSection className="py-12" aria-label="Releases">
        <ol className="flex flex-col gap-10">
          {changelog.map((entry) => (
            <li key={entry.version} className="grid grid-cols-1 gap-4 md:grid-cols-[150px_1fr] md:gap-8">
              <div className="md:sticky md:top-24 md:self-start">
                <span className="inline-flex h-6 items-center rounded-full border border-border bg-background px-2 font-mono text-xs font-medium text-heading shadow-xs">
                  v{entry.version}
                </span>
                <time dateTime={entry.date} className="mt-2 block text-[13px] text-muted-foreground">
                  {formatDate(entry.date)}
                </time>
              </div>
              <article className="rounded-[16px] border border-border bg-background p-6 shadow-xs outline outline-1 outline-offset-[3px] outline-border/60">
                <h2 className="text-lg tracking-[-0.02em]">{entry.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.summary}</p>
                <ul className="mt-5 flex flex-col divide-y divide-border border-t border-border">
                  {entry.changes.map((c, i) => {
                    const meta = typeMeta[c.type];
                    return (
                      <li key={i} className="flex items-start gap-3 py-3 text-sm leading-6 text-foreground">
                        <span className={`mt-0.5 flex w-[84px] shrink-0 items-center gap-1.5 text-[12px] font-semibold ${meta.className}`}>
                          <HugeiconsIcon icon={meta.icon} size={14} strokeWidth={2} />
                          {meta.label}
                        </span>
                        <span>{c.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </FrameSection>
    </>
  );
}
