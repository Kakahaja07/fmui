export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  summary: string;
  changes: { type: "added" | "changed" | "fixed"; text: string }[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.1.0",
    date: "2026-10-23",
    title: "Initial public preview",
    summary:
      "The first FMUI release ships the website, a 50-component catalog, and the first 20 working components with source code.",
    changes: [
      { type: "added", text: "Website with homepage, gallery, documentation, blocks plan, roadmap, changelog, and about pages." },
      { type: "added", text: "Catalog metadata for all 50 planned components across six categories." },
      {
        type: "added",
        text: "Twenty available components: Expandable Tabs, Animated Segmented Control, Command Menu, Multi-Select, Smart Dropdown, Floating Toolbar, Context Menu, Resizable Panels, Spotlight Search, Stepper, Metric Card, Sparkline Card, Activity Feed, Timeline, Pricing Card, AI Chat Bubble, Prompt Input, Streaming Text, Model Selector, and AI Thinking Indicator.",
      },
      {
        type: "added",
        text: "Four preview components: Floating Dock, Animated Counter, Progress Ring, and Morphing Dialog.",
      },
      { type: "added", text: "Light and dark themes with persisted preference." },
    ],
  },
];
