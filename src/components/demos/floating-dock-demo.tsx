"use client";

import { useState } from "react";
import {
  Calendar03Icon,
  Folder01Icon,
  Home01Icon,
  Mail01Icon,
  Message01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { FloatingDock } from "@/registry/components/floating-dock/floating-dock";

export default function FloatingDockDemo() {
  const [active, setActive] = useState("Home");
  return (
    <div className="flex flex-col items-center gap-5 pt-8">
      <FloatingDock
        items={[
          { id: "home", label: "Home", icon: Home01Icon },
          { id: "mail", label: "Mail", icon: Mail01Icon },
          { id: "chat", label: "Messages", icon: Message01Icon },
          { id: "calendar", label: "Calendar", icon: Calendar03Icon },
          { id: "files", label: "Files", icon: Folder01Icon },
          { id: "settings", label: "Settings", icon: Settings01Icon },
        ]}
        onSelect={(item) => setActive(item.label)}
      />
      <p className="text-xs text-muted-foreground">
        Active: <span className="font-medium text-foreground">{active}</span>
      </p>
    </div>
  );
}
