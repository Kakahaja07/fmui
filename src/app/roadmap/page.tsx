import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { statusCounts } from "@/lib/component-catalog";
import { roadmap, roadmapYears } from "@/data/roadmap";
import { RoadmapView } from "@/components/roadmap/roadmap-timeline";

export const metadata: Metadata = pageMetadata({
  title: "Roadmap: Upcoming React Components and Blocks",
  description: `See what FMUI has shipped and what comes next: ${statusCounts["coming-soon"]} more React components, shadcn-compatible blocks, one-command installs, and showcase submissions.`,
  path: "/roadmap",
});

export default function RoadmapPage() {
  return <RoadmapView entries={roadmap} years={roadmapYears} />;
}
