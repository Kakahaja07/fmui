import { components } from "@/data/components";
import { categories } from "@/data/categories";
import { changelog } from "@/data/changelog";

export interface RoadmapEntry {
  id: string;
  year: number;
  status: "next" | "shipped";
  /** Left-column label: "Coming soon" or a short date. */
  label: string;
  /** ISO date for shipped entries. */
  date?: string;
  title: string;
  summary: string;
  items: string[];
  link?: { label: string; href: string };
}

function shortDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

const upcoming = components.filter((c) => c.status === "coming-soon");

/** Everything planned but not shipped, derived from the catalog so it never drifts. */
const whatsNext: RoadmapEntry = {
  id: "next",
  year: 2026,
  status: "next",
  label: "Coming soon",
  title: "What's next",
  summary: `${upcoming.length} more components are planned. New releases land on this timeline the moment they ship.`,
  items: [
    ...categories
      .map((cat) => ({ cat, names: upcoming.filter((c) => c.category === cat.id).map((c) => c.name) }))
      .filter(({ names }) => names.length > 0)
      .map(({ cat, names }) => `${cat.name}: ${names.join(", ")}`),
    "Blocks: full sections such as pricing, AI chat layouts, dashboards, and onboarding flows",
    "One-command installs from the shadcn-compatible registry",
    "Public GitHub repository and showcase submissions",
  ],
};

/** Shipped releases come straight from the changelog. */
const shipped: RoadmapEntry[] = changelog.map((entry) => ({
  id: `v${entry.version}`,
  year: Number(entry.date.slice(0, 4)),
  status: "shipped",
  label: shortDate(entry.date),
  date: entry.date,
  title: `v${entry.version}: ${entry.title}`,
  summary: entry.summary,
  items: entry.changes.map((c) => c.text),
  link: { label: "Read the changelog", href: "/changelog" },
}));

export const roadmap: RoadmapEntry[] = [whatsNext, ...shipped];

/** Years shown in the switcher: every year with entries, plus the next two as placeholders. */
const entryYears = Array.from(new Set(roadmap.map((e) => e.year))).sort();
const lastYear = entryYears[entryYears.length - 1];
export const roadmapYears = Array.from(new Set([...entryYears, lastYear + 1, lastYear + 2])).map((year) => ({
  year,
  hasEntries: entryYears.includes(year),
}));
