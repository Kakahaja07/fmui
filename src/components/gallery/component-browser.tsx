"use client";

import { useCallback, useDeferredValue, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, SearchRemoveIcon, Sorting01Icon } from "@hugeicons/core-free-icons";
import { categories, isCategory } from "@/data/categories";
import { allComponents, queryComponents, categoryCounts, type SortKey } from "@/lib/component-catalog";
import { cn } from "@/lib/utils";
import type { ComponentCategory } from "@/types/component";
import { ComponentCard } from "@/components/gallery/component-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const sortLabels: Record<SortKey, string> = { newest: "Newest", alphabetical: "Alphabetical" };

export function ComponentBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const q = params.get("q") ?? "";
  const categoryParam = params.get("category");
  const category = isCategory(categoryParam) ? categoryParam : "all";
  const sortParam = params.get("sort");
  const sort: SortKey = sortParam === "alphabetical" ? "alphabetical" : "newest";

  const setParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === "" || v === "all" || (k === "sort" && v === "newest")) next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  return <BrowserView q={q} category={category} sort={sort} setParams={setParams} />;
}

const noop = () => {};

/**
 * The default view (all components, newest first) rendered without reading the
 * URL. Used as the Suspense fallback so the static HTML that crawlers and first
 * paint receive already contains every card and link; filters work after hydration.
 */
export function ComponentBrowserStatic() {
  return <BrowserView q="" category="all" sort="newest" setParams={noop} />;
}

function BrowserView({
  q,
  category,
  sort,
  setParams,
}: {
  q: string;
  category: ComponentCategory | "all";
  sort: SortKey;
  setParams: (patch: Record<string, string | null>) => void;
}) {
  const deferredQ = useDeferredValue(q);
  const results = useMemo(() => queryComponents({ q: deferredQ, category, sort }), [deferredQ, category, sort]);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-[11px] border border-border bg-surface p-0.5 no-scrollbar" role="tablist" aria-label="Category">
          {[{ id: "all", shortName: "All" }, ...categories].map((c) => {
            const active = category === c.id;
            const count = c.id === "all" ? allComponents.length : categoryCounts[c.id as keyof typeof categoryCounts];
            return (
              <button
                key={c.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setParams({ category: c.id })}
                className={cn(
                  "flex h-7 shrink-0 items-center rounded-[8px] px-2.5 text-[13px] font-semibold transition-[color,background-color,box-shadow] duration-150",
                  active
                    ? "bg-background text-heading shadow-xs ring-1 ring-border"
                    : "text-muted-foreground hover:text-heading",
                )}
              >
                {c.shortName}
                <span className="ml-1.5 text-[11px] font-medium tabular-nums text-muted-foreground">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <label className="relative flex-1 md:w-56 md:flex-none">
            <span className="sr-only">Search components</span>
            <HugeiconsIcon
              icon={Search01Icon}
              size={14}
              strokeWidth={2}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setParams({ q: e.target.value })}
              placeholder="Search components..."
              className="h-8 w-full rounded-[9px] border border-border bg-background pl-8 pr-3 text-[13px] text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground hover:border-border-strong focus:border-border-strong"
            />
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="shrink-0" aria-label={`Sort: ${sortLabels[sort]}`}>
                <HugeiconsIcon icon={Sorting01Icon} strokeWidth={2} />
                {sortLabels[sort]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setParams({ sort: v })}>
                {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                  <DropdownMenuRadioItem key={k} value={k}>
                    {sortLabels[k]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <p className="mt-5 text-[13px] text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? "component" : "components"}
        {q && (
          <>
            {" "}
            for <span className="font-medium text-foreground">&ldquo;{q}&rdquo;</span>
          </>
        )}
      </p>

      {results.length === 0 ? (
        <div className="mt-5 flex flex-col items-center rounded-[16px] border border-dashed border-border-strong bg-background/60 px-6 py-16 text-center">
          <span className="mb-4 flex size-10 items-center justify-center rounded-[11px] border border-border bg-background text-heading shadow-xs">
            <HugeiconsIcon icon={SearchRemoveIcon} size={18} strokeWidth={1.8} />
          </span>
          <p className="text-sm font-semibold text-heading">No components match</p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Try a different search term or clear the filters to browse the full catalog.
          </p>
          <Button variant="secondary" size="sm" className="mt-5" onClick={() => setParams({ q: null, category: null, sort: null })}>
            Clear filters
          </Button>
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <li key={c.slug}>
              <ComponentCard component={c} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
