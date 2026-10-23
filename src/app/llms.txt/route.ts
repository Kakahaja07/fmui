import { allComponents, statusCounts } from "@/lib/component-catalog";
import { categories } from "@/data/categories";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

export const dynamic = "force-static";

/**
 * llms.txt: a plain-text map of the site for AI assistants and coding agents.
 * Generated from the catalog so it always matches what is published.
 */
export function GET() {
  const live = allComponents.filter((c) => c.status !== "coming-soon");
  const soon = allComponents.filter((c) => c.status === "coming-soon");

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} has ${allComponents.length} planned components: ${statusCounts.available} available, ${statusCounts.preview} in preview, and ${statusCounts["coming-soon"]} coming soon. Each available component is a single TypeScript file styled with Tailwind CSS v4, built on Radix UI, cmdk, Motion, and Hugeicons, and is meant to be copied into your project.`,
    "",
    "## Docs",
    "",
    `- [All components](${absoluteUrl("/components")}): searchable gallery with live demos`,
    `- [Roadmap](${absoluteUrl("/roadmap")}): what has shipped and what is next`,
    `- [Changelog](${absoluteUrl("/changelog")}): release history`,
    `- [About](${absoluteUrl("/about")}): principles, license, and contributing`,
    ...(siteConfig.githubRepo ? [`- [Source on GitHub](https://github.com/${siteConfig.githubRepo}): MIT licensed`] : []),
    "",
    "## Components with live demos and source",
    "",
    ...categories.flatMap((cat) => {
      const items = live.filter((c) => c.category === cat.id);
      return items.length === 0
        ? []
        : [`### ${cat.name}`, "", ...items.map((c) => `- [${c.name}](${absoluteUrl(`/components/${c.slug}`)}): ${c.description}`), ""];
    }),
    "## Coming soon (no source yet)",
    "",
    ...soon.map((c) => `- ${c.name}: ${c.description}`),
    "",
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
