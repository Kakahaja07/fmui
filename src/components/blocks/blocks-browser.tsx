"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, SearchRemoveIcon } from "@hugeicons/core-free-icons";
import { blockCategories, blockGroups, plannedBlockCount, type BlockCategory } from "@/data/blocks";
import { categoryById } from "@/data/categories";
import { cn } from "@/lib/utils";
import { ShowcaseCardFooter, showcaseCard } from "@/components/ui/showcase-card";
import { BlockSketch } from "@/components/blocks/block-sketch";
import { Button } from "@/components/ui/button";

const countFor = (cat: BlockCategory | "all") =>
  blockGroups.filter((g) => cat === "all" || g.category === cat).reduce((n, g) => n + g.planned.length, 0);

export function BlocksBrowser() {
  const [category, setCategory] = useState<BlockCategory | "all">("all");
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query).trim().toLowerCase();

  const groups = useMemo(
    () =>
      blockGroups.filter((g) => {
        if (category !== "all" && g.category !== category) return false;
        if (!q) return true;
        return [g.name, g.description, ...g.planned].join(" ").toLowerCase().includes(q);
      }),
    [category, q],
  );

  return (
    <div data-frame="wide">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div
          role="tablist"
          aria-label="Block category"
          className="flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-[11px] border border-border bg-surface p-0.5 no-scrollbar"
        >
          {[{ id: "all" as const, name: "All" }, ...blockCategories].map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c.id)}
                className={cn(
                  "flex h-8 shrink-0 items-center rounded-[8px] px-3 text-[13.5px] font-semibold transition-[color,background-color,box-shadow] duration-150",
                  active ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-heading",
                )}
              >
                {c.name}
                <span className={cn("ml-2 text-[12px] font-medium tabular-nums", active ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {countFor(c.id)}
                </span>
              </button>
            );
          })}
        </div>
        <label className="relative md:w-72">
          <span className="sr-only">Search blocks</span>
          <HugeiconsIcon
            icon={Search01Icon}
            size={15}
            strokeWidth={2}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="h-9 w-full rounded-full border border-border bg-background pl-9 pr-4 text-[13.5px] text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground hover:border-border-strong focus:border-border-strong"
          />
        </label>
      </div>

      <p className="mt-5 text-[13px] text-muted-foreground" aria-live="polite">
        {groups.length} {groups.length === 1 ? "group" : "groups"}, {groups.reduce((n, g) => n + g.planned.length, 0)} of{" "}
        {plannedBlockCount} planned blocks
      </p>

      {groups.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-[16px] border border-dashed border-border-strong bg-background/60 px-6 py-16 text-center">
          <span className="mb-4 flex size-10 items-center justify-center rounded-[11px] border border-border bg-background text-heading shadow-xs">
            <HugeiconsIcon icon={SearchRemoveIcon} size={18} strokeWidth={1.8} />
          </span>
          <p className="text-sm font-semibold text-heading">No blocks match</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-5"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <li key={g.id}>
              <Link
                href={`/components?category=${g.builtFrom}`}
                aria-label={`${g.name}: ${g.planned.length} planned blocks. Browse the ${categoryById[g.builtFrom].name} components it will use.`}
                title={g.description}
                className={showcaseCard.shell}
              >
                <div className={cn(showcaseCard.panel, "aspect-[16/11]")}>
                  <BlockSketch id={g.id} />
                </div>
                <ShowcaseCardFooter
                  title={<span className="truncate">{g.name}</span>}
                  aside={`${g.planned.length} planned ${g.planned.length === 1 ? "block" : "blocks"}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
