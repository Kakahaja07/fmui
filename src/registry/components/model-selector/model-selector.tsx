"use client";

import { useId, useState } from "react";
import { Command } from "cmdk";
import { Popover as PopoverPrimitive } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon, UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  description?: string;
  capabilities?: string[];
}

export interface ModelSelectorProps {
  models: ModelOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  className?: string;
}

export function ModelSelector({ models, value, defaultValue, onValueChange, className }: ModelSelectorProps) {
  const [internal, setInternal] = useState(defaultValue ?? models[0]?.id);
  const selectedId = value ?? internal;
  const [open, setOpen] = useState(false);
  const listId = useId();
  const selected = models.find((m) => m.id === selectedId);
  const providers = Array.from(new Set(models.map((m) => m.provider)));

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label="Select model"
          className={cn(
            "inline-flex h-9 min-w-48 items-center justify-between gap-2 rounded-[10px] border border-border bg-background pl-3 pr-2 text-sm transition-colors hover:border-border-strong data-[state=open]:border-border-strong",
            className,
          )}
        >
          <span className="flex items-center gap-2 truncate">
            <span className="size-2 rounded-full bg-success" aria-hidden="true" />
            <span className="font-medium text-foreground">{selected?.name ?? "Choose a model"}</span>
            {selected && <span className="text-xs text-muted-foreground">{selected.provider}</span>}
          </span>
          <HugeiconsIcon icon={UnfoldMoreIcon} size={15} strokeWidth={2} className="shrink-0 text-muted-foreground" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className="z-50 w-80 origin-(--radix-popover-content-transform-origin) rounded-[12px] border border-border bg-background p-1 shadow-float outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] duration-150"
        >
          <Command loop>
            <Command.Input
              placeholder="Search models..."
              className="h-9 w-full border-b border-border bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Command.List id={listId} className="max-h-72 overflow-y-auto pt-1">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No models found.</Command.Empty>
              {providers.map((provider) => (
                <Command.Group
                  key={provider}
                  heading={provider}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {models
                    .filter((m) => m.provider === provider)
                    .map((m) => (
                      <Command.Item
                        key={m.id}
                        value={`${m.name} ${m.provider} ${(m.capabilities ?? []).join(" ")}`}
                        onSelect={() => {
                          setInternal(m.id);
                          onValueChange?.(m.id);
                          setOpen(false);
                        }}
                        className="flex cursor-default items-start gap-2 rounded-[8px] px-2 py-2 text-sm data-[selected=true]:bg-accent"
                      >
                        <span className="flex w-4 shrink-0 justify-center pt-0.5">
                          {m.id === selectedId && <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.5} />}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-1">
                          <span className="font-medium text-foreground">{m.name}</span>
                          {m.description && <span className="text-xs text-muted-foreground">{m.description}</span>}
                          {m.capabilities && m.capabilities.length > 0 && (
                            <span className="flex flex-wrap gap-1">
                              {m.capabilities.map((c) => (
                                <span
                                  key={c}
                                  className="rounded-full border border-border bg-surface px-1.5 py-px text-[10px] font-medium text-muted-foreground"
                                >
                                  {c}
                                </span>
                              ))}
                            </span>
                          )}
                        </span>
                      </Command.Item>
                    ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
