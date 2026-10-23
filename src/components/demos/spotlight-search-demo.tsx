"use client";

import { useState } from "react";
import { File01Icon, Folder01Icon, Settings01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { SpotlightSearch } from "@/registry/components/spotlight-search/spotlight-search";

const results = [
  { id: "1", title: "Quarterly report.pdf", subtitle: "Documents", icon: File01Icon },
  { id: "2", title: "Design system", subtitle: "Folder", icon: Folder01Icon },
  { id: "3", title: "Brand guidelines.fig", subtitle: "Design", icon: File01Icon },
  { id: "4", title: "Billing settings", subtitle: "Settings", icon: Settings01Icon },
  { id: "5", title: "Team members", subtitle: "People", icon: UserIcon },
  { id: "6", title: "Roadmap 2026", subtitle: "Documents", icon: File01Icon },
  { id: "7", title: "Onboarding checklist", subtitle: "Documents", icon: File01Icon },
];

export default function SpotlightSearchDemo() {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="w-full max-w-lg">
      <SpotlightSearch results={results} onSelect={(r) => setPicked(r.title)} placeholder="Search files, settings, people..." />
      <p className="mt-3 text-center text-xs text-muted-foreground" aria-live="polite">
        {picked ? (
          <>
            Opened <span className="font-medium text-foreground">{picked}</span>
          </>
        ) : (
          "Try typing “report” or “settings”"
        )}
      </p>
    </div>
  );
}
