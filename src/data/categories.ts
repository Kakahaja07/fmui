import type { CategoryMeta, ComponentCategory } from "@/types/component";

export const categories: CategoryMeta[] = [
  {
    id: "interactive",
    name: "Interactive UI",
    shortName: "Interactive",
    description: "Tabs, menus, toolbars, and controls with real state.",
  },
  {
    id: "cards-data",
    name: "Cards & Data",
    shortName: "Cards",
    description: "Metrics, feeds, timelines, and data-rich surfaces.",
  },
  {
    id: "forms-inputs",
    name: "Forms & Inputs",
    shortName: "Forms",
    description: "Inputs that handle validation, selection, and entry.",
  },
  {
    id: "motion-feedback",
    name: "Motion & Feedback",
    shortName: "Motion",
    description: "Counters, loaders, and transitions that explain state.",
  },
  {
    id: "ai",
    name: "AI Components",
    shortName: "AI",
    description: "Chat, prompts, streaming, and model-aware interfaces.",
  },
  {
    id: "navigation-layout",
    name: "Navigation & Layout",
    shortName: "Navigation",
    description: "Docks, breadcrumbs, sidebars, and page structure.",
  },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  ComponentCategory,
  CategoryMeta
>;

export function isCategory(value: string | null | undefined): value is ComponentCategory {
  return !!value && value in categoryById;
}
