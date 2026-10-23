"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { allComponents, statusLabel } from "@/lib/component-catalog";
import { categoryById } from "@/data/categories";
import { mainNav } from "@/data/navigation";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";

const SearchContext = createContext<{ open: () => void }>({ open: () => {} });

export function useSearchDialog() {
  return useContext(SearchContext);
}

export function SearchCommandProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const value = useMemo(() => ({ open: () => setOpen(true) }), []);

  return (
    <SearchContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showClose={false}
          className="top-[12vh] translate-y-0 overflow-hidden p-0 sm:max-w-xl data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          <DialogTitle className="sr-only">Search</DialogTitle>
          <DialogDescription className="sr-only">Search components and pages</DialogDescription>
          <Command label="Search components and pages" loop>
            <div className="flex items-center gap-2 border-b border-border px-4">
              <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2} className="text-muted-foreground" />
              <Command.Input
                autoFocus
                placeholder="Search components, categories, pages..."
                className="h-12 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Kbd>Esc</Kbd>
            </div>
            <Command.List className="max-h-[min(60vh,380px)] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-10 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>
              <Command.Group heading="Components" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground">
                {allComponents.map((c) => (
                  <Command.Item
                    key={c.slug}
                    value={`${c.name} ${c.tags.join(" ")} ${categoryById[c.category].name}`}
                    onSelect={() => go(`/components/${c.slug}`)}
                    className="flex cursor-default items-center justify-between gap-3 rounded-[8px] px-2.5 py-2 text-sm text-foreground data-[selected=true]:bg-accent"
                  >
                    <span className="flex items-center gap-2">
                      <span>{c.name}</span>
                      <span className="text-xs text-muted-foreground">{categoryById[c.category].shortName}</span>
                    </span>
                    {c.status !== "available" && (
                      <span className="text-[11px] text-muted-foreground">{statusLabel[c.status]}</span>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Pages" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground">
                {[{ label: "Home", href: "/" }, ...mainNav, { label: "About", href: "/about" }].map((p) => (
                  <Command.Item
                    key={p.href}
                    value={`page ${p.label}`}
                    onSelect={() => go(p.href)}
                    className="flex cursor-default items-center rounded-[8px] px-2.5 py-2 text-sm text-foreground data-[selected=true]:bg-accent"
                  >
                    {p.label}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </SearchContext.Provider>
  );
}
