"use client";

import { useState } from "react";
import {
  Analytics01Icon,
  Book02Icon,
  Building03Icon,
  CodeIcon,
  FlashIcon,
  Key01Icon,
  News01Icon,
  Plug01Icon,
  Rocket01Icon,
  UserGroupIcon,
  WebhookIcon,
} from "@hugeicons/core-free-icons";
import { MegaMenu, type MegaMenuPanel } from "@/registry/components/mega-menu/mega-menu";

const PANELS: MegaMenuPanel[] = [
  {
    id: "product",
    label: "Product",
    groups: [
      {
        label: "Platform",
        links: [
          { id: "analytics", title: "Analytics", description: "Dashboards that update live.", icon: Analytics01Icon },
          { id: "automations", title: "Automations", description: "Workflows that run themselves.", icon: FlashIcon },
          { id: "integrations", title: "Integrations", description: "Connect 120+ tools.", icon: Plug01Icon },
        ],
      },
      {
        label: "Developers",
        links: [
          { id: "api", title: "API reference", description: "REST and GraphQL endpoints.", icon: CodeIcon },
          { id: "webhooks", title: "Webhooks", description: "Get events as they happen.", icon: WebhookIcon },
          { id: "keys", title: "API keys", description: "Scoped tokens per project.", icon: Key01Icon },
        ],
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    groups: [
      {
        label: "By team size",
        links: [
          { id: "startups", title: "Startups", description: "Ship fast on the free tier.", icon: Rocket01Icon },
          { id: "teams", title: "Growing teams", description: "Roles, reviews, and audit logs.", icon: UserGroupIcon },
          { id: "enterprise", title: "Enterprise", description: "SSO, SLAs, and data residency.", icon: Building03Icon },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    groups: [
      {
        label: "Learn",
        links: [
          { id: "docs", title: "Documentation", description: "Guides from setup to scale.", icon: Book02Icon },
          { id: "changelog", title: "Changelog", description: "What shipped this week.", icon: News01Icon },
        ],
      },
    ],
  },
  { id: "pricing", label: "Pricing" },
];

export default function MegaMenuDemo() {
  const [opened, setOpened] = useState<string | null>(null);

  return (
    <div className="w-[600px]">
      <header className="flex h-[52px] items-center gap-3 rounded-[16px] border border-border bg-background px-2.5 shadow-xs">
        <span aria-hidden="true" className="grid size-8 place-items-center rounded-[10px] bg-[#3358eb] text-white">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 18V6l14 12V6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <MegaMenu panels={PANELS} onNavigate={(item) => setOpened("title" in item ? item.title : item.label)} />
        <button
          type="button"
          className="ml-auto h-8 rounded-[10px] bg-primary px-3 text-[13px] font-medium text-primary-foreground transition-transform duration-150 ease-out-strong active:scale-[0.97]"
        >
          Sign up
        </button>
      </header>
      <p className="mt-3 px-1 text-xs text-muted-foreground" aria-live="polite">
        {opened ? (
          <>
            Opened <span className="font-medium text-heading">{opened}</span>
          </>
        ) : (
          "Hover or focus a menu, then pick a link."
        )}
      </p>
    </div>
  );
}
