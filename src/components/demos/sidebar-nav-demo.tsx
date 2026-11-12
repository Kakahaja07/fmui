"use client";

import { useState } from "react";
import { Analytics01Icon, Calendar03Icon, Folder01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { SidebarNav, type SidebarNavGroup } from "@/registry/components/sidebar-nav/sidebar-nav";

const GROUPS: SidebarNavGroup[] = [
  {
    id: "workspace",
    label: "Workspace",
    items: [
      { id: "inbox", label: "Inbox", icon: Mail01Icon, badge: 4 },
      {
        id: "projects",
        label: "Projects",
        icon: Folder01Icon,
        items: [
          { id: "website", label: "Website redesign" },
          { id: "mobile", label: "Mobile app" },
        ],
      },
      { id: "calendar", label: "Calendar", icon: Calendar03Icon },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    items: [{ id: "analytics", label: "Analytics", icon: Analytics01Icon }],
  },
];

const LABELS: Record<string, string> = Object.fromEntries(
  GROUPS.flatMap((g) => g.items.flatMap((i) => [i, ...(i.items ?? [])])).map((i) => [i.id, i.label]),
);

export default function SidebarNavDemo() {
  const [active, setActive] = useState("website");

  return (
    <div className="flex h-[340px] w-[600px] overflow-hidden rounded-[20px] border border-border bg-background shadow-card">
      <SidebarNav groups={GROUPS} value={active} onValueChange={setActive} aria-label="Workspace" />
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 items-center justify-between border-b border-border px-4">
          <h2 className="text-sm font-semibold text-heading">{LABELS[active]}</h2>
          <span className="rounded-full bg-[#3358eb]/10 px-2 py-0.5 text-[11px] font-medium text-[#3358eb]">
            Updated just now
          </span>
        </header>
        {/* Placeholder page content, keyed so it settles in fresh for each page. */}
        <div
          key={active}
          aria-hidden="true"
          className="grid flex-1 grid-cols-2 content-start gap-3 p-4 animate-in fade-in-0 duration-200"
        >
          <div className="col-span-2 h-20 rounded-[14px] bg-surface" />
          <div className="h-24 rounded-[14px] bg-surface" />
          <div className="h-24 rounded-[14px] bg-surface" />
          <div className="col-span-2 space-y-2 rounded-[14px] border border-border p-3">
            <div className="h-2 w-2/3 rounded-full bg-accent" />
            <div className="h-2 w-1/2 rounded-full bg-accent" />
          </div>
        </div>
      </main>
    </div>
  );
}
