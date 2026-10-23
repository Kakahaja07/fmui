import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/metadata";
import { roadmap, roadmapYears } from "@/data/roadmap";
import { RoadmapView } from "@/components/roadmap/roadmap-timeline";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Everything FMUI has shipped, and a look at the components and features coming next.",
  alternates: { canonical: absoluteUrl("/roadmap") },
};

export default function RoadmapPage() {
  return <RoadmapView entries={roadmap} years={roadmapYears} />;
}
