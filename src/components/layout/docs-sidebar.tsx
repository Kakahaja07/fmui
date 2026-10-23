"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { sidebarGroups, statusLabel } from "@/lib/component-catalog";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sidebarGroups;
    return sidebarGroups
      .map((g) => ({ ...g, items: g.items.filter((c) => c.name.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <nav aria-label="Components" className="flex h-full flex-col">
      <label className="relative mb-4 block">
        <span className="sr-only">Filter components</span>
        <HugeiconsIcon
          icon={Search01Icon}
          size={14}
          strokeWidth={2}
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter..."
          className="h-8 w-full rounded-[9px] border border-border bg-background pl-8 pr-2 text-[13px] text-foreground shadow-xs outline-none placeholder:text-muted-foreground focus:border-border-strong"
        />
      </label>
      <div className="-mx-1 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-1 pb-8 no-scrollbar">
        {groups.length === 0 && <p className="px-2 text-sm text-muted-foreground">No matches.</p>}
        {groups.map(({ category, items }) => (
          <div key={category.id}>
            <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {category.name}
            </p>
            <ul className="flex flex-col">
              {items.map((c) => {
                const active = pathname === `/components/${c.slug}`;
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/components/${c.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-[8px] px-2 py-1.5 text-[13px] transition-[color,background-color,box-shadow] duration-150",
                        active
                          ? "bg-background font-semibold text-heading shadow-xs ring-1 ring-border"
                          : "text-muted-foreground hover:text-heading",
                      )}
                    >
                      <span className="truncate">{c.name}</span>
                      {c.status !== "available" && (
                        <span className="shrink-0 text-[10px] text-muted-foreground">{statusLabel[c.status]}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
