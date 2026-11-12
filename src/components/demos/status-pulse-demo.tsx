"use client";

import { StatusPulse, type PulseStatus } from "@/registry/components/status-pulse/status-pulse";

const rows: { name: string; detail: string; status: PulseStatus; label: string }[] = [
  { name: "API", detail: "api.northwind.dev", status: "online", label: "Operational" },
  { name: "Search index", detail: "Rebuilding 42%", status: "syncing", label: "Syncing" },
  { name: "Maya Lin", detail: "Back at 14:00", status: "away", label: "Away" },
  { name: "Build agent 3", detail: "Last seen 2d ago", status: "offline", label: "Offline" },
];

export default function StatusPulseDemo() {
  return (
    <div className="w-[300px] rounded-[24px] bg-accent p-3">
      <div className="flex items-center justify-between px-1.5 pb-2.5 pt-1">
        <p className="text-[13px]/[16px] font-semibold text-heading">System status</p>
        <span className="rounded-full bg-background px-2 py-1 shadow-xs">
          <StatusPulse status="live" label="Live" size="sm" />
        </span>
      </div>
      <ul className="divide-y divide-border rounded-[16px] bg-background shadow-xs">
        {rows.map((row) => (
          <li key={row.name} className="flex items-center justify-between gap-3 px-3.5 py-3">
            <div className="min-w-0">
              <p className="truncate text-[13px]/[16px] font-semibold text-heading">{row.name}</p>
              <p className="truncate text-xs text-muted-foreground">{row.detail}</p>
            </div>
            <StatusPulse status={row.status} label={row.label} className="shrink-0" />
          </li>
        ))}
      </ul>
    </div>
  );
}
