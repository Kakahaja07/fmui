"use client";

import { useState } from "react";
import { Copy01Icon, Delete02Icon, Edit02Icon, Share01Icon } from "@hugeicons/core-free-icons";
import { SmartDropdown } from "@/registry/components/smart-dropdown/smart-dropdown";

export default function SmartDropdownDemo() {
  const [log, setLog] = useState("Nothing selected yet");
  return (
    <div className="flex flex-col items-center gap-4">
      <SmartDropdown
        label="Actions"
        actions={[
          { id: "edit", label: "Edit", description: "Change the title or body", icon: Edit02Icon, shortcut: "E" },
          { id: "duplicate", label: "Duplicate", description: "Create a copy in this folder", icon: Copy01Icon, shortcut: "D" },
          { id: "share", label: "Share", description: "Invite people by email", icon: Share01Icon },
          { id: "delete", label: "Delete", description: "Move to trash", icon: Delete02Icon, destructive: true },
        ]}
        radio={{
          label: "Visibility",
          defaultValue: "team",
          options: [
            { value: "private", label: "Private" },
            { value: "team", label: "Team" },
            { value: "public", label: "Public" },
          ],
        }}
        onAction={(a) => setLog(`Action: ${a.label}`)}
        onRadioChange={(v) => setLog(`Visibility: ${v}`)}
      />
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {log}
      </p>
    </div>
  );
}
