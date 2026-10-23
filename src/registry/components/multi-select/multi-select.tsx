"use client";

import { useId, useRef, useState } from "react";
import { Command } from "cmdk";
import { Popover as PopoverPrimitive } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Tick02Icon, UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  "aria-label": string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Select...",
  className,
  ...rest
}: MultiSelectProps) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const selected = value ?? internal;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  function commit(next: string[]) {
    setInternal(next);
    onValueChange?.(next);
  }

  function toggle(v: string) {
    commit(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  }

  function remove(v: string) {
    commit(selected.filter((s) => s !== v));
    triggerRef.current?.focus();
  }

  const byValue = new Map(options.map((o) => [o.value, o]));

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={rest["aria-label"]}
          className={cn(
            "flex min-h-10 w-full items-center gap-1.5 rounded-[10px] border border-border bg-background py-1.5 pl-2 pr-2 text-left text-sm transition-colors hover:border-border-strong data-[state=open]:border-border-strong",
            className,
          )}
        >
          <span className="flex flex-1 flex-wrap gap-1">
            {selected.length === 0 && <span className="px-1 text-muted-foreground">{placeholder}</span>}
            {selected.map((v) => (
              <span
                key={v}
                className="inline-flex h-6 items-center gap-1 rounded-[6px] bg-accent pl-2 pr-1 text-[13px] font-medium text-foreground"
              >
                {byValue.get(v)?.label ?? v}
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove ${byValue.get(v)?.label ?? v}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(v);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      remove(v);
                    }
                  }}
                  className="inline-flex size-4 items-center justify-center rounded-[4px] text-muted-foreground hover:bg-border-strong/60 hover:text-foreground"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={11} strokeWidth={2.5} />
                </span>
              </span>
            ))}
          </span>
          <HugeiconsIcon icon={UnfoldMoreIcon} size={16} strokeWidth={2} className="shrink-0 text-muted-foreground" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className="z-50 w-(--radix-popover-trigger-width) origin-(--radix-popover-content-transform-origin) rounded-[12px] border border-border bg-background p-1 shadow-float outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] duration-150"
        >
          <Command loop>
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search..."
              onKeyDown={(e) => {
                if (e.key === "Backspace" && query === "" && selected.length) {
                  commit(selected.slice(0, -1));
                }
              }}
              className="h-9 w-full border-b border-border bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Command.List id={listId} className="max-h-56 overflow-y-auto pt-1">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No matches.</Command.Empty>
              {options.map((opt) => {
                const checked = selected.includes(opt.value);
                return (
                  <Command.Item
                    key={opt.value}
                    value={opt.label}
                    onSelect={() => toggle(opt.value)}
                    className="flex cursor-default items-center gap-2 rounded-[8px] px-2 py-1.5 text-sm text-foreground data-[selected=true]:bg-accent"
                  >
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-[4px] border transition-colors",
                        checked ? "border-primary bg-primary text-primary-foreground" : "border-border-strong",
                      )}
                      aria-hidden="true"
                    >
                      {checked && <HugeiconsIcon icon={Tick02Icon} size={11} strokeWidth={3} />}
                    </span>
                    {opt.label}
                  </Command.Item>
                );
              })}
            </Command.List>
          </Command>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
