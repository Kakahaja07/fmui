"use client";

import { Timeline } from "@/registry/components/timeline/timeline";

export default function TimelineDemo() {
  return (
    <Timeline
      milestones={[
        { id: "1", title: "Project kickoff", date: "Sep 2", status: "done", details: "Scope agreed, repository created, and the design tokens were locked in." },
        { id: "2", title: "Design review", date: "Sep 18", status: "done", details: "Homepage and documentation layouts approved with minor spacing changes." },
        { id: "3", title: "Component build", date: "Oct 6 - Oct 20", status: "current", details: "Twenty components with working demos and source code viewers." },
        { id: "4", title: "Accessibility audit", date: "Oct 27", status: "upcoming", details: "Keyboard and screen reader pass against WCAG 2.2 AA." },
        { id: "5", title: "Public launch", date: "Nov", status: "upcoming" },
      ]}
    />
  );
}
