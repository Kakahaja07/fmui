"use client";

import { useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";
import { cn } from "@/lib/utils";

export interface SectionNavSection {
  /** The id of the section element on the page. */
  id: string;
  label: string;
}

export interface SectionNavProps {
  sections: SectionNavSection[];
  /** The scroll container that holds the sections. Defaults to the viewport. */
  root?: RefObject<HTMLElement | null>;
  /** Heading shown above the links, also the nav's accessible name. */
  label?: string;
  className?: string;
}

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * A sticky table of contents. The section crossing a line 30% down the
 * scroll area is marked active; clicking a link scrolls to its section and
 * moves focus there.
 */
export function SectionNav({ sections, root, label = "On this page", className }: SectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id);
  // While a click-driven scroll runs, the sections it passes must not take over.
  const lock = useRef(false);
  const pickRef = useRef(() => {});

  useEffect(() => {
    const container = root?.current ?? null;
    const scroller = container ?? document.documentElement;
    const ids = sections.map((s) => s.id);
    const crossing = new Set<string>();

    const pick = () => {
      if (lock.current) return;
      const atTop = scroller.scrollTop <= 1;
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
      const next = atTop ? ids[0] : atBottom ? ids[ids.length - 1] : ids.find((id) => crossing.has(id));
      if (next) setActive(next);
    };
    pickRef.current = pick;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id);
          else crossing.delete(entry.target.id);
        }
        pick();
      },
      { root: container, rootMargin: "-30% 0px -69% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    // The first and last sections may never reach the line, so the edges decide.
    const target = container ?? window;
    target.addEventListener("scroll", pick, { passive: true });
    return () => {
      io.disconnect();
      target.removeEventListener("scroll", pick);
    };
  }, [sections, root]);

  function go(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const section = document.getElementById(id);
    if (!section) return;
    e.preventDefault();
    const behavior = window.matchMedia(REDUCED).matches ? "auto" : "smooth";
    const container = root?.current;
    lock.current = true;
    setActive(id);
    if (container) {
      // Scroll only the container, so the page around it stays put.
      const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
      const top = section.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
      container.scrollTo({ top: top - margin, behavior });
    } else {
      section.scrollIntoView({ behavior, block: "start" });
    }
    if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });

    const scroller = container ?? window;
    const release = () => {
      window.clearTimeout(timer);
      scroller.removeEventListener("scrollend", release);
      lock.current = false;
      pickRef.current();
    };
    // scrollend never fires when there is nothing to scroll; the timer covers that.
    const timer = window.setTimeout(release, 1000);
    scroller.addEventListener("scrollend", release);
  }

  const index = Math.max(0, sections.findIndex((s) => s.id === active));

  return (
    <nav aria-label={label} className={cn("sticky top-0 w-44 shrink-0 self-start", className)}>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="relative border-l border-border">
        <span
          aria-hidden="true"
          className="absolute top-0 -left-px h-8 w-0.5 rounded-full bg-[#3358eb] transition-transform duration-200 ease-in-out-strong motion-reduce:transition-none"
          style={{ transform: `translateY(${index * 100}%)` }}
        />
        <ul>
          {sections.map((section) => {
            const current = section.id === active;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={current ? "location" : undefined}
                  onClick={(e) => go(e, section.id)}
                  className={cn(
                    "block h-8 truncate rounded-r-[8px] pl-3.5 text-[13px] leading-8 outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring",
                    current ? "font-medium text-heading" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
