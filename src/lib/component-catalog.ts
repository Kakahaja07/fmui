import { components, featuredOrder } from "@/data/components";
import { categories } from "@/data/categories";
import type { ComponentCategory, ComponentStatus, FMUIComponent } from "@/types/component";

export const allComponents = components;

export const availableComponents = components.filter((c) => c.status !== "coming-soon");

export function getComponent(slug: string): FMUIComponent | undefined {
  return components.find((c) => c.slug === slug);
}

export function getComponentsByCategory(category: ComponentCategory) {
  return components.filter((c) => c.category === category);
}

export function getFeaturedComponents() {
  return featuredOrder
    .map((slug) => getComponent(slug))
    .filter((c): c is FMUIComponent => !!c && c.featured && c.status !== "coming-soon");
}

export function getRelatedComponents(component: FMUIComponent, limit = 4) {
  const scored = components
    .filter((c) => c.slug !== component.slug)
    .map((c) => {
      let score = 0;
      if (c.category === component.category) score += 2;
      score += c.tags.filter((t) => component.tags.includes(t)).length;
      if (c.status === "coming-soon") score -= 1;
      return { c, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.c.name.localeCompare(b.c.name));
  return scored.slice(0, limit).map(({ c }) => c);
}

export const statusLabel: Record<ComponentStatus, string> = {
  available: "Available",
  preview: "Preview",
  "coming-soon": "Coming soon",
};

export const statusCounts = {
  available: components.filter((c) => c.status === "available").length,
  preview: components.filter((c) => c.status === "preview").length,
  "coming-soon": components.filter((c) => c.status === "coming-soon").length,
} satisfies Record<ComponentStatus, number>;

/** Components in a category that have a live demo (available or preview). */
export const categoryLiveCounts = Object.fromEntries(
  categories.map((cat) => [cat.id, availableComponents.filter((c) => c.category === cat.id).length]),
) as Record<ComponentCategory, number>;

export const categoryCounts = Object.fromEntries(
  categories.map((cat) => [cat.id, components.filter((c) => c.category === cat.id).length]),
) as Record<ComponentCategory, number>;

export const sidebarGroups = categories.map((cat) => ({
  category: cat,
  items: components
    .filter((c) => c.category === cat.id)
    .sort((a, b) => a.name.localeCompare(b.name)),
}));

export type SortKey = "newest" | "alphabetical";

export interface CatalogQuery {
  q?: string;
  category?: ComponentCategory | "all";
  sort?: SortKey;
}

export function queryComponents({ q = "", category = "all", sort = "newest" }: CatalogQuery) {
  const needle = q.trim().toLowerCase();
  let list = components.filter((c) => category === "all" || c.category === category);

  if (needle) {
    list = list.filter((c) => {
      const haystack = [c.name, c.description, c.category, ...c.tags].join(" ").toLowerCase();
      return needle.split(/\s+/).every((part) => haystack.includes(part));
    });
  }

  const statusRank: Record<ComponentStatus, number> = { available: 0, preview: 1, "coming-soon": 2 };

  return [...list].sort((a, b) => {
    if (sort === "alphabetical") return a.name.localeCompare(b.name);
    const rank = statusRank[a.status] - statusRank[b.status];
    if (rank !== 0) return rank;
    return b.createdAt.localeCompare(a.createdAt) || a.name.localeCompare(b.name);
  });
}
