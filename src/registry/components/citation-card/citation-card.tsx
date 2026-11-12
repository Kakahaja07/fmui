"use client";

import { HoverCard as HoverCardPrimitive } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface CitationSource {
  title: string;
  url: string;
  /** Defaults to the URL's hostname. */
  site?: string;
  snippet?: string;
  /** Favicon URL. The site's first letter is shown when missing. */
  favicon?: string;
}

export interface CitationProps {
  source: CitationSource;
  /** 1-based reference number shown in the chip. */
  index: number;
  className?: string;
}

export interface CitationListProps {
  sources: CitationSource[];
  className?: string;
}

function siteOf(source: CitationSource) {
  if (source.site) return source.site;
  try {
    return new URL(source.url).hostname.replace(/^www\./, "");
  } catch {
    return source.url;
  }
}

function SiteIcon({ source }: { source: CitationSource }) {
  if (source.favicon)
    // eslint-disable-next-line @next/next/no-img-element -- standalone component, no next/image dependency
    return <img src={source.favicon} alt="" className="size-4 shrink-0 rounded-[4px]" />;
  return (
    <span
      aria-hidden="true"
      className="grid size-4 shrink-0 place-items-center rounded-[4px] bg-accent text-[9px] font-bold uppercase text-muted-foreground"
    >
      {siteOf(source)[0]}
    </span>
  );
}

const chipClass =
  "inline-grid h-4 min-w-4 place-items-center rounded-[5px] bg-[#3358eb]/10 px-1 text-[10px] font-semibold tabular-nums text-[#3358eb] no-underline";

/**
 * A numbered citation chip for inline use in text. Hovering or focusing it opens a
 * preview of the source; activating it follows the link.
 */
export function Citation({ source, index, className }: CitationProps) {
  const site = siteOf(source);

  return (
    <HoverCardPrimitive.Root openDelay={250} closeDelay={120}>
      <HoverCardPrimitive.Trigger asChild>
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Source ${index}: ${source.title}, ${site}`}
          className={cn(
            chipClass,
            "relative -top-[0.4em] mx-0.5 align-baseline outline-none transition-colors duration-150 hover:bg-[#3358eb]/20 focus-visible:ring-2 focus-visible:ring-[#3358eb]/40 data-[state=open]:bg-[#3358eb] data-[state=open]:text-white",
            className,
          )}
        >
          {index}
        </a>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side="bottom"
          align="start"
          sideOffset={6}
          collisionPadding={12}
          className="z-50 w-72 origin-(--radix-hover-card-content-transform-origin) rounded-[14px] border border-border bg-background p-3 shadow-float outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] duration-150"
        >
          <div className="flex items-center gap-2">
            <SiteIcon source={source} />
            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{site}</span>
            <span className={chipClass}>{index}</span>
          </div>
          <p className="mt-2 line-clamp-2 text-[13px]/[18px] font-semibold text-heading">{source.title}</p>
          {source.snippet && (
            <p className="mt-1 line-clamp-3 text-xs/[17px] text-muted-foreground">{source.snippet}</p>
          )}
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-[#3358eb] hover:underline"
          >
            Open source
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} strokeWidth={2} aria-hidden="true" />
          </a>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}

/** The numbered reference list that goes under an answer. Numbers match the order of `sources`. */
export function CitationList({ sources, className }: CitationListProps) {
  return (
    <ol aria-label="Sources" className={cn("flex flex-col gap-1 rounded-[16px] bg-accent p-1.5", className)}>
      {sources.map((source, i) => (
        <li key={source.url}>
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-[11px] px-2 py-1.5 outline-none transition-colors duration-150 hover:bg-background focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-[#3358eb]/40"
          >
            <span className={chipClass} aria-hidden="true">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-heading">{source.title}</span>
            <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
              <SiteIcon source={source} />
              {siteOf(source)}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
