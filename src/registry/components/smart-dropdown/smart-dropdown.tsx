"use client";

import { useState } from "react";
import { DropdownMenu } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface SmartDropdownAction {
  id: string;
  label: string;
  description?: string;
  icon?: IconSvgElement;
  shortcut?: string;
  destructive?: boolean;
}

export interface SmartDropdownProps {
  label: string;
  actions: SmartDropdownAction[];
  /** Optional radio group rendered below the actions. */
  radio?: { label: string; options: { value: string; label: string }[]; defaultValue: string };
  onAction?: (action: SmartDropdownAction) => void;
  onRadioChange?: (value: string) => void;
}

const itemClass =
  "flex cursor-default select-none items-start gap-2.5 rounded-[8px] px-2.5 py-2 text-sm outline-none data-[highlighted]:bg-accent data-[disabled]:opacity-50";

export function SmartDropdown({ label, actions, radio, onAction, onRadioChange }: SmartDropdownProps) {
  const [radioValue, setRadioValue] = useState(radio?.defaultValue ?? "");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent data-[state=open]:bg-accent active:scale-[0.98]"
        >
          {label}
          <HugeiconsIcon icon={ArrowDown01Icon} size={14} strokeWidth={2.5} className="text-muted-foreground" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={6}
          className="z-50 w-64 origin-(--radix-dropdown-menu-content-transform-origin) rounded-[12px] border border-border bg-background p-1 shadow-float data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] duration-150"
        >
          {actions.map((action) => (
            <DropdownMenu.Item
              key={action.id}
              onSelect={() => onAction?.(action)}
              className={cn(itemClass, action.destructive ? "text-danger" : "text-foreground")}
            >
              {action.icon && (
                <HugeiconsIcon
                  icon={action.icon}
                  size={16}
                  strokeWidth={2}
                  className={cn("mt-0.5 shrink-0", action.destructive ? "text-danger" : "text-muted-foreground")}
                />
              )}
              <span className="flex flex-1 flex-col">
                <span className="font-medium leading-5">{action.label}</span>
                {action.description && (
                  <span className="text-xs leading-4 text-muted-foreground">{action.description}</span>
                )}
              </span>
              {action.shortcut && (
                <kbd className="ml-2 font-sans text-[11px] text-muted-foreground">{action.shortcut}</kbd>
              )}
            </DropdownMenu.Item>
          ))}
          {radio && (
            <>
              <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-border" />
              <DropdownMenu.Label className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {radio.label}
              </DropdownMenu.Label>
              <DropdownMenu.RadioGroup
                value={radioValue}
                onValueChange={(v) => {
                  setRadioValue(v);
                  onRadioChange?.(v);
                }}
              >
                {radio.options.map((opt) => (
                  <DropdownMenu.RadioItem
                    key={opt.value}
                    value={opt.value}
                    className={cn(itemClass, "items-center pl-8 text-foreground data-[state=checked]:font-medium")}
                  >
                    <span className="absolute left-3 flex size-3.5 items-center justify-center">
                      <DropdownMenu.ItemIndicator>
                        <span className="block size-1.5 rounded-full bg-foreground" />
                      </DropdownMenu.ItemIndicator>
                    </span>
                    {opt.label}
                  </DropdownMenu.RadioItem>
                ))}
              </DropdownMenu.RadioGroup>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
