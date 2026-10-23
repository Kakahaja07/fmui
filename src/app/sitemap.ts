import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";
import { availableComponents } from "@/lib/component-catalog";
import { showcase } from "@/data/showcase";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Showcase stays out (and noindex) until it has real entries.
  const pages = ["/", "/components", "/blocks", "/roadmap", "/changelog", "/about", ...(showcase.length ? ["/showcase"] : [])];
  const staticRoutes = pages.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date("2026-10-23"),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  // Only components with real content are listed; coming-soon pages are noindex.
  const componentRoutes = availableComponents.map((c) => ({
    url: absoluteUrl(`/components/${c.slug}`),
    lastModified: new Date(c.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...componentRoutes];
}
