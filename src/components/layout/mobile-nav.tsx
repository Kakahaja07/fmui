"use client";

import { useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { mainNav } from "@/data/navigation";
import { sidebarGroups, statusLabel } from "@/lib/component-catalog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Wordmark } from "@/components/layout/logo";

export function MobileNav({ showComponents = false }: { showComponents?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
          <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">Site pages and component links</SheetDescription>
        <div className="flex h-(--header-height) items-center border-b border-border px-5">
          <Wordmark />
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-0.5 p-3">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[15px] font-semibold text-heading transition-colors hover:bg-accent"
            >
              <span className="flex size-8 items-center justify-center rounded-[8px] border border-border bg-surface text-muted-foreground">
                <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.8} />
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        {showComponents && (
          <div className="border-t border-border p-3">
            {sidebarGroups.map(({ category, items }) => (
              <div key={category.id} className="mb-4">
                <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.name}
                </p>
                <ul className="flex flex-col">
                  {items.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/components/${c.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-[8px] px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <span>{c.name}</span>
                        {c.status !== "available" && (
                          <span className="text-[11px] text-muted-foreground">{statusLabel[c.status]}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
