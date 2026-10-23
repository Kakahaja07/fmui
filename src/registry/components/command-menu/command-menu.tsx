"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Dialog as DialogPrimitive } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  group: string;
  icon?: IconSvgElement;
  shortcut?: string[];
  keywords?: string[];
}

export interface CommandMenuProps {
  items: CommandItem[];
  onSelect?: (item: CommandItem) => void;
  /** Register the Ctrl/Cmd+K shortcut. Off by default so demos do not collide with the host page. */
  hotkey?: boolean;
  trigger?: React.ReactNode;
  placeholder?: string;
}

export function CommandMenu({
  items,
  onSelect,
  hotkey = false,
  trigger,
  placeholder = "Type a command or search...",
}: CommandMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hotkey) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [hotkey]);

  const groups = Array.from(new Set(items.map((i) => i.group)));

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground active:scale-[0.98]"
          >
            <HugeiconsIcon icon={Search01Icon} size={15} strokeWidth={2} />
            Open command menu
          </button>
        )}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-150" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[12vh] z-50 w-[calc(100%-32px)] max-w-lg -translate-x-1/2 overflow-hidden rounded-[14px] border border-border bg-background shadow-float outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-150"
        >
          <DialogPrimitive.Title className="sr-only">Command menu</DialogPrimitive.Title>
          <Command loop label="Command menu">
            <div className="flex items-center gap-2 border-b border-border px-3">
              <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2} className="text-muted-foreground" />
              <Command.Input
                autoFocus
                placeholder={placeholder}
                className="h-11 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Command.List className="max-h-72 overflow-y-auto p-1.5">
              <Command.Empty className="py-8 text-center text-sm text-muted-foreground">No results.</Command.Empty>
              {groups.map((group) => (
                <Command.Group
                  key={group}
                  heading={group}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {items
                    .filter((i) => i.group === group)
                    .map((item) => (
                      <Command.Item
                        key={item.id}
                        value={[item.label, ...(item.keywords ?? [])].join(" ")}
                        onSelect={() => {
                          setOpen(false);
                          onSelect?.(item);
                        }}
                        className={cn(
                          "flex cursor-default items-center gap-2.5 rounded-[8px] px-2 py-2 text-sm text-foreground data-[selected=true]:bg-accent",
                        )}
                      >
                        {item.icon && (
                          <HugeiconsIcon icon={item.icon} size={16} strokeWidth={2} className="text-muted-foreground" />
                        )}
                        <span className="flex-1">{item.label}</span>
                        {item.shortcut && (
                          <span className="flex items-center gap-0.5">
                            {item.shortcut.map((k) => (
                              <kbd
                                key={k}
                                className="inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-border bg-surface px-1 font-sans text-[11px] text-muted-foreground"
                              >
                                {k}
                              </kbd>
                            ))}
                          </span>
                        )}
                      </Command.Item>
                    ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
