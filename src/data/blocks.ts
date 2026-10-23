import type { ComponentCategory } from "@/types/component";

export type BlockCategory = "application" | "data" | "ai" | "marketing";

export const blockCategories: { id: BlockCategory; name: string }[] = [
  { id: "application", name: "Application" },
  { id: "data", name: "Data & Analytics" },
  { id: "ai", name: "AI" },
  { id: "marketing", name: "Marketing" },
];

export interface BlockGroup {
  id: string;
  name: string;
  category: BlockCategory;
  description: string;
  /** Planned blocks in this group. Nothing here is published yet. */
  planned: string[];
  /** Component category the group is assembled from, used for the card link. */
  builtFrom: ComponentCategory;
}

/** The blocks plan. Every group is unreleased; counts are planned blocks, not shipped ones. */
export const blockGroups: BlockGroup[] = [
  {
    id: "app-shell",
    name: "App Shell",
    category: "application",
    description: "Sidebar and top-nav layouts with search, account menu, and content area.",
    planned: ["Sidebar shell", "Top-nav shell", "Split-pane shell", "Settings shell"],
    builtFrom: "navigation-layout",
  },
  {
    id: "analytics",
    name: "Analytics",
    category: "data",
    description: "KPI headers, trend charts, and tables for product dashboards.",
    planned: ["KPI header", "Traffic dashboard", "Revenue report"],
    builtFrom: "cards-data",
  },
  {
    id: "ai-chat",
    name: "AI Chat",
    category: "ai",
    description: "Chat screens with prompt input, suggestions, and model selection.",
    planned: ["Empty chat", "Conversation view", "Model comparison"],
    builtFrom: "ai",
  },
  {
    id: "pricing",
    name: "Pricing",
    category: "marketing",
    description: "Plan comparisons with billing toggle, FAQ, and trust row.",
    planned: ["Three tiers", "Comparison table", "Usage-based"],
    builtFrom: "cards-data",
  },
  {
    id: "onboarding",
    name: "Onboarding",
    category: "application",
    description: "Multi-step setup flows with validation and progress.",
    planned: ["Workspace setup", "Invite team", "Plan selection"],
    builtFrom: "interactive",
  },
  {
    id: "activity",
    name: "Activity",
    category: "data",
    description: "Feeds, timelines, and audit logs with filters.",
    planned: ["Team feed", "Release timeline"],
    builtFrom: "cards-data",
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    category: "ai",
    description: "Run status, reasoning steps, and streamed results for agent workflows.",
    planned: ["Agent run", "Task queue"],
    builtFrom: "ai",
  },
  {
    id: "hero",
    name: "Hero",
    category: "marketing",
    description: "Headline, call-to-action pair, and a bento wall of components.",
    planned: ["Centered hero", "Split hero", "Bento wall"],
    builtFrom: "navigation-layout",
  },
];

export const plannedBlockCount = blockGroups.reduce((n, g) => n + g.planned.length, 0);
