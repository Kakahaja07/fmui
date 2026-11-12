import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { components, featuredOrder, slugRedirects } from "@/data/components";
import { categories } from "@/data/categories";
import { componentDocs } from "@/content/components";
import { demoLayout, demoRegistry } from "@/components/demos";
import { roadmap } from "@/data/roadmap";
import { changelog } from "@/data/changelog";
import { blockGroups, plannedBlockCount } from "@/data/blocks";
import {
  categoryLiveCounts,
  getFeaturedComponents,
  getRelatedComponents,
  queryComponents,
  statusCounts,
} from "@/lib/component-catalog";

describe("component catalog", () => {
  it("reports status counts that add up to the catalog", () => {
    expect(statusCounts).toEqual({ available: 66, preview: 4, "coming-soon": 0 });
    const live = Object.values(categoryLiveCounts).reduce((a, b) => a + b, 0);
    expect(live).toBe(statusCounts.available + statusCounts.preview);
  });

  it("features six live components in the declared order, and flags match", () => {
    expect(getFeaturedComponents().map((c) => c.slug)).toEqual([...featuredOrder]);
    expect(components.filter((c) => c.featured).map((c) => c.slug).sort()).toEqual([...featuredOrder].sort());
    const categoriesCovered = new Set(getFeaturedComponents().map((c) => c.category));
    expect(categoriesCovered.size).toBeGreaterThanOrEqual(4);
  });

  it("gives every demo a card layout width", () => {
    expect(Object.keys(demoLayout).sort()).toEqual(Object.keys(demoRegistry).sort());
  });

  it("contains exactly 70 components with unique slugs", () => {
    expect(components).toHaveLength(70);
    expect(new Set(components.map((c) => c.slug)).size).toBe(70);
  });

  it("matches the planned per-category counts", () => {
    const counts = Object.fromEntries(categories.map((c) => [c.id, 0]));
    for (const c of components) counts[c.category]++;
    expect(counts).toEqual({
      interactive: 15,
      "cards-data": 18,
      "forms-inputs": 10,
      "motion-feedback": 12,
      ai: 9,
      "navigation-layout": 6,
    });
  });

  it("has 66 available components in the planned order", () => {
    const available = components.filter((c) => c.status === "available").map((c) => c.slug);
    expect(available).toHaveLength(66);
    expect(available.slice(0, 3)).toEqual(["expandable-tabs", "animated-segmented-control", "command-menu"]);
  });

  it("points every implemented component at a real source file, demo, and docs entry", () => {
    for (const c of components.filter((c) => c.status !== "coming-soon")) {
      expect(c.sourceFiles.length, c.slug).toBeGreaterThan(0);
      for (const file of c.sourceFiles) {
        expect(existsSync(path.join(process.cwd(), "src/registry/components", file)), file).toBe(true);
      }
      expect(c.previewId && demoRegistry[c.previewId], c.slug).toBeTruthy();
      expect(componentDocs[c.slug], c.slug).toBeDefined();
    }
  });

  it("redirects every renamed slug to a live component and never shadows a current one", () => {
    const slugs = new Set(components.map((c) => c.slug));
    for (const [from, to] of Object.entries(slugRedirects)) {
      expect(slugs.has(from), from).toBe(false);
      expect(slugs.has(to), to).toBe(true);
    }
  });

  it("never marks a coming-soon component as installable", () => {
    for (const c of components.filter((c) => c.status === "coming-soon")) {
      expect(c.sourceFiles).toEqual([]);
      expect(c.previewId).toBeUndefined();
      expect(c.registryItem).toBeUndefined();
    }
  });
});

describe("roadmap and blocks", () => {
  it("lists every coming-soon component under What's next", () => {
    const next = roadmap.find((e) => e.status === "next")!;
    const soon = components.filter((c) => c.status === "coming-soon");
    if (soon.length > 0) expect(next.summary).toContain(String(soon.length));
    else expect(next.summary).toMatch(/every planned component has shipped/i);
    for (const c of soon) expect(next.items.join(" ")).toContain(c.name);
  });

  it("mirrors every changelog release as a shipped roadmap entry", () => {
    const shipped = roadmap.filter((e) => e.status === "shipped").map((e) => e.date);
    expect(shipped).toEqual(changelog.map((c) => c.date));
  });

  it("counts planned blocks from the groups and links each group to a real category", () => {
    expect(plannedBlockCount).toBe(blockGroups.reduce((n, g) => n + g.planned.length, 0));
    const ids = new Set(categories.map((c) => c.id));
    for (const g of blockGroups) expect(ids.has(g.builtFrom)).toBe(true);
  });
});

describe("queryComponents", () => {
  it("searches name, description, and tags", () => {
    expect(queryComponents({ q: "palette" }).map((c) => c.slug)).toContain("command-menu");
    expect(queryComponents({ q: "kpi" }).map((c) => c.slug)).toEqual(["metric-card"]);
    expect(queryComponents({ q: "zzz-nothing" })).toEqual([]);
  });

  it("filters by category and sorts alphabetically", () => {
    const ai = queryComponents({ category: "ai", sort: "alphabetical" });
    expect(ai).toHaveLength(9);
    expect(ai.map((c) => c.name)).toEqual([...ai.map((c) => c.name)].sort((a, b) => a.localeCompare(b)));
  });

  it("puts available components before coming-soon ones when sorting by newest", () => {
    const list = queryComponents({ sort: "newest" });
    const firstSoon = list.findIndex((c) => c.status === "coming-soon");
    expect(list.slice(0, firstSoon).every((c) => c.status !== "coming-soon")).toBe(true);
  });
});

describe("getRelatedComponents", () => {
  it("prefers the same category and never returns the component itself", () => {
    const stepper = components.find((c) => c.slug === "stepper")!;
    const related = getRelatedComponents(stepper);
    expect(related.length).toBeGreaterThan(0);
    expect(related.map((c) => c.slug)).not.toContain("stepper");
    expect(related[0].category).toBe("interactive");
  });
});
