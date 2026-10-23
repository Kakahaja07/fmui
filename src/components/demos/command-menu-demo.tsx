"use client";

import { useState } from "react";
import {
  Add01Icon,
  Calendar03Icon,
  File01Icon,
  Moon02Icon,
  Settings01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { CommandMenu, type CommandItem } from "@/registry/components/command-menu/command-menu";

const items: CommandItem[] = [
  { id: "new-file", label: "New file", group: "Create", icon: File01Icon, shortcut: ["N"] },
  { id: "new-project", label: "New project", group: "Create", icon: Add01Icon, shortcut: ["Shift", "N"] },
  { id: "schedule", label: "Schedule meeting", group: "Create", icon: Calendar03Icon },
  { id: "profile", label: "Open profile", group: "Navigate", icon: UserIcon, keywords: ["account"] },
  { id: "settings", label: "Open settings", group: "Navigate", icon: Settings01Icon, shortcut: [","] },
  { id: "theme", label: "Toggle theme", group: "Preferences", icon: Moon02Icon, keywords: ["dark", "light"] },
];

export default function CommandMenuDemo() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center gap-4">
      <CommandMenu items={items} onSelect={(item) => setLast(item.label)} />
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {last ? (
          <>
            Ran <span className="font-medium text-foreground">{last}</span>
          </>
        ) : (
          "Pick a command to see it here"
        )}
      </p>
    </div>
  );
}
