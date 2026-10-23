"use client";

import { useState } from "react";
import { Copy01Icon, Delete02Icon, Download01Icon, Edit02Icon, Share01Icon } from "@hugeicons/core-free-icons";
import { ContextMenu } from "@/registry/components/context-menu/context-menu";

export default function ContextMenuDemo() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center gap-4">
      <ContextMenu
        actions={[
          { id: "rename", label: "Rename", icon: Edit02Icon, shortcut: "F2" },
          { id: "duplicate", label: "Duplicate", icon: Copy01Icon, shortcut: "Ctrl D" },
          { id: "download", label: "Download", icon: Download01Icon },
          { id: "share", label: "Share", icon: Share01Icon, disabled: true },
          { id: "delete", label: "Delete", icon: Delete02Icon, destructive: true, separator: true, shortcut: "Del" },
        ]}
        onAction={(a) => setLast(a.label)}
      >
        <div className="flex h-36 w-full max-w-sm items-center justify-center rounded-[14px] border border-dashed border-border-strong text-sm text-muted-foreground select-none">
          Right-click here
        </div>
      </ContextMenu>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {last ? (
          <>
            Chose <span className="font-medium text-foreground">{last}</span>
          </>
        ) : (
          "Open the menu with a right-click or Shift+F10"
        )}
      </p>
    </div>
  );
}
