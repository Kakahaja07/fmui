export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  summary: string;
  changes: { type: "added" | "changed" | "fixed"; text: string }[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.2.0",
    date: "2026-11-12",
    title: "Widget wall and the full catalog",
    summary:
      "Forty-six new components: twenty-four inspired by a wall of animated product widgets, and the twenty-two that were coming soon. Every planned component now ships with source and a live demo.",
    changes: [
      {
        type: "added",
        text: "Twenty new components: Music Player, Route Map, Activity Rings, Portfolio Chart, Pomodoro Timer, Clock Widget, Week Picker, Vertical Slider, Theme Switch, Billing Toggle, Upload Progress, Progress Button, Presence Avatars, Streak Tracker, Battery Levels, Task Checklist, Chat Thread, Quick Search, Like Button, and Rolling Number.",
      },
      { type: "added", text: "Shipped four planned components: OTP Input, Color Picker, Toast Notification, and Kanban Board." },
      {
        type: "added",
        text: "Shipped the rest of the plan: Comparison Table, Profile Card, File Card, Tag Input, Date Range Picker, File Dropzone, Password Strength, Range Slider, Rating Input, Press and Hold Button, Skeleton Loader, Text Reveal, Magnetic Button, Status Indicator, Token Counter, Citation Card, Suggestion Chips, Breadcrumb Trail, Sidebar Nav, Bento Grid, Section Nav, and Mega Menu.",
      },
      { type: "changed", text: "The planned Kanban Card became a full Kanban Board with drag, keyboard moves, and progress." },
    ],
  },
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
