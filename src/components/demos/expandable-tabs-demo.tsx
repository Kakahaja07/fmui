"use client";

import { useState } from "react";
import { Home01Icon, Mail01Icon, Notification03Icon, Settings01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { ExpandableTabs } from "@/registry/components/expandable-tabs/expandable-tabs";

const tabs = [
  { id: "home", label: "Home", icon: Home01Icon },
  { id: "inbox", label: "Inbox", icon: Mail01Icon },
  { id: "alerts", label: "Alerts", icon: Notification03Icon },
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "settings", label: "Settings", icon: Settings01Icon },
];

export default function ExpandableTabsDemo() {
  const [value, setValue] = useState("home");
  return (
    <div className="flex flex-col items-center gap-4">
      <ExpandableTabs tabs={tabs} value={value} onValueChange={setValue} />
      <p className="text-xs text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{tabs.find((t) => t.id === value)?.label}</span>
      </p>
    </div>
  );
}
