"use client";

import { useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Idea01Icon } from "@hugeicons/core-free-icons";
import type { RoadmapEntry } from "@/data/roadmap";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Button, ButtonArrow } from "@/components/ui/button";
import { FrameSection } from "@/components/layout/frame";

interface YearOption {
  year: number;
  hasEntries: boolean;
}

export function RoadmapYearTabs({
  years,
  value,
  onChange,
}: {
  years: YearOption[];
  value: number;
  onChange: (year: number) => void;
}) {
  return (
    <div role="tablist" aria-label="Roadmap year" className="inline-flex items-center gap-0.5 rounded-[11px] border border-border bg-surface p-0.5">
      {years.map(({ year, hasEntries }) => {
        const active = year === value;
        return (
          <button
            key={year}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls="roadmap-timeline"
            disabled={!hasEntries}
            title={hasEntries ? undefined : "Nothing scheduled yet"}
            onClick={() => onChange(year)}
            className={cn(
              "h-8 rounded-[8px] px-4 font-mono text-[13px] font-medium tabular-nums transition-[color,background-color,box-shadow] duration-150",
              active ? "bg-background text-heading shadow-xs ring-1 ring-border" : "text-muted-foreground hover:text-heading",
              "disabled:cursor-not-allowed disabled:text-muted-foreground/50 disabled:hover:text-muted-foreground/50",
            )}
          >
            {year}
          </button>
        );
      })}
      <span aria-hidden="true" className="px-3 font-mono text-[13px] text-muted-foreground/50">
        ...
      </span>
    </div>
  );
}

function EntryCard({ entry }: { entry: RoadmapEntry }) {
  const next = entry.status === "next";
  return (
    <div className="rounded-[16px] border border-border bg-background p-5 shadow-xs outline outline-1 outline-offset-[3px] outline-border/60 sm:p-6">
      <p className="text-[14.5px] leading-6 text-muted-foreground">{entry.summary}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {entry.items.map((item) => (
          <li key={item} className="flex gap-3 text-[14px] leading-6 text-foreground">
            <span aria-hidden="true" className="mt-[10px] size-1 shrink-0 rounded-full bg-border-strong" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        {next ? (
          <>
            <p className="flex items-center gap-2 text-[14px] font-semibold text-heading">
              <HugeiconsIcon icon={Idea01Icon} size={16} strokeWidth={1.8} className="text-muted-foreground" />
              Help shape the future of FMUI.
            </p>
            <Button asChild variant="secondary" size="sm">
              <a href={siteConfig.author.x} target="_blank" rel="noreferrer">
                Request a feature
                <ButtonArrow />
              </a>
            </Button>
          </>
        ) : (
          entry.link && (
            <>
              <p className="text-[13px] text-muted-foreground">Full details, including fixes and changes.</p>
              <Button asChild variant="secondary" size="sm">
                <Link href={entry.link.href}>
                  {entry.link.label}
                  <ButtonArrow />
                </Link>
              </Button>
            </>
          )
        )}
      </div>
    </div>
  );
}

export function RoadmapTimeline({ entries }: { entries: RoadmapEntry[] }) {
  return (
    <ol id="roadmap-timeline" className="relative mx-auto flex max-w-[760px] flex-col">
      {entries.map((entry, i) => {
        const last = i === entries.length - 1;
        const next = entry.status === "next";
        return (
          <li key={entry.id} className="grid grid-cols-[20px_minmax(0,1fr)] gap-x-4 md:grid-cols-[120px_20px_minmax(0,1fr)] md:gap-x-6">
            <span className="hidden pt-[7px] text-right font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted-foreground md:block">
              {entry.date ? <time dateTime={entry.date}>{entry.label}</time> : entry.label}
            </span>

            <span className="relative flex justify-center" aria-hidden="true">
              {!last && <span className="absolute bottom-0 top-6 w-px bg-border" />}
              <span
                className={cn(
                  "relative mt-[7px] flex size-4 items-center justify-center rounded-full",
                  next ? "bg-warning/20" : "bg-success/20",
                )}
              >
                <span className={cn("size-2 rounded-full", next ? "bg-warning" : "bg-success")} />
              </span>
            </span>

            <div className={cn("min-w-0", !last && "pb-14")}>
              <p className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted-foreground md:hidden">
                {entry.date ? <time dateTime={entry.date}>{entry.label}</time> : entry.label}
              </p>
              <h2 className="mt-1 text-[20px] leading-7 tracking-[-0.025em] md:mt-0">{entry.title}</h2>
              <div className="mt-4">
                <EntryCard entry={entry} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Header band with the year switcher, and the timeline band for the selected year. */
export function RoadmapView({ entries, years }: { entries: RoadmapEntry[]; years: YearOption[] }) {
  const [year, setYear] = useState(years.find((y) => y.hasEntries)?.year ?? years[0].year);
  const visible = entries.filter((e) => e.year === year);

  return (
    <>
      <FrameSection divider={false} className="canvas-dots flex flex-col items-center py-14 text-center md:py-20">
        <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Roadmap</p>
        <h1 className="mt-3 text-balance text-[40px] leading-[1.05] tracking-[-0.04em] md:text-[54px]">The road ahead</h1>
        <p className="mt-4 max-w-[480px] text-pretty text-base leading-[1.6] text-muted-foreground md:text-[17px]">
          Everything FMUI has shipped, and a look at what is coming next.
        </p>
        <div className="mt-8">
          <RoadmapYearTabs years={years} value={year} onChange={setYear} />
        </div>
      </FrameSection>
      <FrameSection className="py-14 md:py-20" aria-label={`Roadmap for ${year}`}>
        {visible.length > 0 ? (
          <RoadmapTimeline entries={visible} />
        ) : (
          <p className="text-center text-sm text-muted-foreground">Nothing scheduled for {year} yet.</p>
        )}
      </FrameSection>
    </>
  );
}
