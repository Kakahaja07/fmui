"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useSearchDialog } from "@/components/layout/search-command";

export function SearchTrigger() {
  const { open } = useSearchDialog();
  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Search components"
        aria-keyshortcuts="Control+K Meta+K"
        className="hidden h-8 items-center gap-2 whitespace-nowrap rounded-[10px] border border-border bg-background pl-2.5 pr-1.5 text-[13px] text-muted-foreground shadow-xs transition-[border-color,color,transform] duration-150 hover:border-border-strong hover:text-heading active:scale-[0.98] md:flex lg:w-60"
      >
        <HugeiconsIcon icon={Search01Icon} size={15} strokeWidth={2} className="shrink-0" />
        <span className="hidden flex-1 text-left lg:inline">Search components...</span>
        <span className="flex items-center gap-0.5">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>
      <Button variant="ghost" size="icon" onClick={open} className="md:hidden" aria-label="Search components">
        <HugeiconsIcon icon={Search01Icon} strokeWidth={1.8} />
      </Button>
    </>
  );
}
