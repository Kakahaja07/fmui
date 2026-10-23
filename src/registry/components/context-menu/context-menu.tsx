"use client";

import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export interface ContextMenuAction {
  id: string;
  label: string;
  icon?: IconSvgElement;
  shortcut?: string;
  destructive?: boolean;
  /** Draw a separator before this item. */
  separator?: boolean;
  disabled?: boolean;
}

export interface ContextMenuProps {
  actions: ContextMenuAction[];
  onAction?: (action: ContextMenuAction) => void;
  children: React.ReactNode;
}

export function ContextMenu({ actions, onAction, children }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger asChild>{children}</ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          className="z-50 min-w-52 rounded-[12px] border border-border bg-background p-1 shadow-float data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.97] duration-150"
        >
          {actions.map((action) => (
            <div key={action.id}>
              {action.separator && <ContextMenuPrimitive.Separator className="-mx-1 my-1 h-px bg-border" />}
              <ContextMenuPrimitive.Item
                disabled={action.disabled}
                onSelect={() => onAction?.(action)}
                className={cn(
                  "flex cursor-default select-none items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-sm outline-none data-[highlighted]:bg-accent data-[disabled]:opacity-50",
                  action.destructive ? "text-danger" : "text-foreground",
                )}
              >
                {action.icon && (
                  <HugeiconsIcon
                    icon={action.icon}
                    size={16}
                    strokeWidth={2}
                    className={action.destructive ? "text-danger" : "text-muted-foreground"}
                  />
                )}
                <span className="flex-1">{action.label}</span>
                {action.shortcut && (
                  <kbd className="font-sans text-[11px] text-muted-foreground">{action.shortcut}</kbd>
                )}
              </ContextMenuPrimitive.Item>
            </div>
          ))}
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}
