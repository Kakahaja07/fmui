"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Analytics01Icon,
  CodeIcon,
  FlashIcon,
  GitBranchIcon,
  Mail01Icon,
  Plug01Icon,
  Search01Icon,
  UserGroupIcon,
  WebhookIcon,
} from "@hugeicons/core-free-icons";
import { BentoGrid, BentoTile } from "@/registry/components/bento-grid/bento-grid";

const BARS = [38, 54, 46, 70, 62, 84, 76];

function SearchVisual() {
  return (
    <div className="absolute inset-x-4 top-4 space-y-1.5">
      <div className="flex h-8 items-center gap-2 rounded-[10px] border border-border bg-surface px-2.5 text-xs text-muted-foreground">
        <HugeiconsIcon icon={Search01Icon} size={13} strokeWidth={2} />
        invoices from march
        <span className="ml-auto h-3.5 w-px bg-[#3358eb]" />
      </div>
      <div className="flex h-6 items-center gap-2 rounded-[8px] bg-[#3358eb]/10 px-2.5">
        <span className="h-1.5 w-24 rounded-full bg-[#3358eb]/50" />
      </div>
      <div className="flex h-6 items-center px-2.5">
        <span className="h-1.5 w-16 rounded-full bg-accent" />
      </div>
    </div>
  );
}

function ShortcutVisual() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex gap-1.5">
        {["⌘", "K"].map((key) => (
          <kbd
            key={key}
            className="grid size-9 place-items-center rounded-[9px] border border-border bg-surface font-sans text-sm font-semibold text-heading shadow-[inset_0_-2px_0_var(--border)]"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
}

function ChartVisual() {
  return (
    <div className="absolute inset-x-4 bottom-0 top-6 flex items-end gap-1.5">
      {BARS.map((h, i) => (
        <span
          key={i}
          className={i === BARS.length - 2 ? "flex-1 rounded-t-[5px] bg-[#3358eb]" : "flex-1 rounded-t-[5px] bg-[#3358eb]/20"}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function PresenceVisual() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex -space-x-2.5">
        {["#3358eb", "#1f9d74", "#eb5833"].map((color, i) => (
          <span key={color} className="relative size-9 rounded-full border-2 border-background" style={{ backgroundColor: color }}>
            {i === 0 && <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-background bg-[#1f9d74]" />}
          </span>
        ))}
      </div>
    </div>
  );
}

function IntegrationsVisual() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex gap-2">
        {[GitBranchIcon, Mail01Icon, WebhookIcon, CodeIcon, UserGroupIcon].map((icon, i) => (
          <span
            key={i}
            className={
              i === 2
                ? "grid size-10 place-items-center rounded-[12px] bg-[#3358eb] text-white shadow-card"
                : "grid size-10 place-items-center rounded-[12px] border border-border bg-surface text-muted-foreground"
            }
          >
            <HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BentoGridDemo() {
  return (
    <div className="w-[620px]">
      <BentoGrid columns={4}>
        <BentoTile
          colSpan={2}
          icon={Search01Icon}
          title="Instant search"
          description="Find any record as you type."
          visual={<SearchVisual />}
        />
        <BentoTile icon={FlashIcon} title="Shortcuts" description="Every action, one key away." visual={<ShortcutVisual />} />
        <BentoTile
          rowSpan={2}
          icon={Analytics01Icon}
          title="Analytics"
          description="Weekly trends without a single spreadsheet."
          visual={<ChartVisual />}
        />
        <BentoTile icon={UserGroupIcon} title="Live presence" description="See who is here." visual={<PresenceVisual />} />
        <BentoTile
          colSpan={2}
          icon={Plug01Icon}
          title="Integrations"
          description="Connect the tools your team already uses."
          visual={<IntegrationsVisual />}
        />
      </BentoGrid>
    </div>
  );
}
