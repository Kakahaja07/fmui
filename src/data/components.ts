import type { FMUIComponent } from "@/types/component";

const R1 = "2026-10-06";
const R2 = "2026-10-13";
const R3 = "2026-10-20";
const R4 = "2026-10-23";
const R5 = "2026-11-12";

type Seed = Pick<FMUIComponent, "slug" | "name" | "description" | "category" | "tags"> &
  Partial<FMUIComponent>;

function available(seed: Seed, createdAt: string): FMUIComponent {
  return {
    status: "available",
    featured: false,
    createdAt,
    updatedAt: R4,
    dependencies: [],
    sourceFiles: [`${seed.slug}/${seed.slug}.tsx`],
    previewId: seed.slug,
    registryItem: seed.slug,
    ...seed,
  };
}

/** Shipped in v0.2.0: created and last updated on R5. */
function latest(seed: Seed): FMUIComponent {
  return available({ ...seed, updatedAt: R5 }, R5);
}

function preview(seed: Seed): FMUIComponent {
  return { ...available(seed, R4), status: "preview" };
}

/**
 * Slugs renamed to the phrase people actually search for. Old URLs stay
 * reachable and permanently redirect to the new page.
 */
export const slugRedirects: Record<string, string> = {
  "animated-counter": "animated-number-counter",
  "hold-to-confirm": "press-and-hold-button",
  "toast-stack": "toast-notification",
  "status-pulse": "status-indicator",
  "deploy-button": "progress-button",
  "focus-timer": "pomodoro-timer",
  "upload-card": "upload-progress",
};

/** Homepage featured order: a spread across navigation, AI, animation, and data display. */
export const featuredOrder = [
  "floating-dock",
  "prompt-input",
  "morphing-dialog",
  "metric-card",
  "ai-thinking-indicator",
  "animated-number-counter",
] as const;

export const components: FMUIComponent[] = [
  // Interactive UI (15)
  available(
    {
      slug: "expandable-tabs",
      name: "Expandable Tabs",
      description: "Icon tabs that expand to reveal their label when selected.",
      category: "interactive",
      tags: ["tabs", "navigation", "icons", "animation"],
    },
    R1,
  ),
  available(
    {
      slug: "animated-segmented-control",
      name: "Animated Segmented Control",
      description: "A segmented control with a sliding indicator and keyboard support.",
      category: "interactive",
      tags: ["segmented", "toggle", "radio", "animation"],
    },
    R1,
  ),
  available(
    {
      slug: "command-menu",
      name: "Command Menu",
      description: "A keyboard-first command palette with groups, search, and shortcuts.",
      category: "interactive",
      tags: ["command", "palette", "search", "keyboard"],
      dependencies: ["cmdk", "radix-ui"],
    },
    R1,
  ),
  available(
    {
      slug: "multi-select",
      name: "Multi-Select",
      description: "A searchable multi-select with removable chips and keyboard navigation.",
      category: "interactive",
      tags: ["select", "chips", "search", "form"],
      dependencies: ["cmdk", "radix-ui"],
    },
    R1,
  ),
  available(
    {
      slug: "smart-dropdown",
      name: "Smart Dropdown",
      description: "A dropdown menu with descriptions, shortcuts, and nested radio groups.",
      category: "interactive",
      tags: ["dropdown", "menu", "actions"],
      dependencies: ["radix-ui"],
    },
    R2,
  ),
  available(
    {
      slug: "floating-toolbar",
      name: "Floating Toolbar",
      description: "A text formatting toolbar that appears above a selection.",
      category: "interactive",
      tags: ["toolbar", "editor", "selection", "formatting"],
    },
    R2,
  ),
  available(
    {
      slug: "context-menu",
      name: "Context Menu",
      description: "A right-click menu with shortcuts, separators, and destructive actions.",
      category: "interactive",
      tags: ["context", "menu", "right-click"],
      dependencies: ["radix-ui"],
    },
    R2,
  ),
  available(
    {
      slug: "resizable-panels",
      name: "Resizable Panels",
      description: "Side-by-side panels with a draggable, keyboard-accessible divider.",
      category: "interactive",
      tags: ["resizable", "layout", "split", "drag"],
    },
    R2,
  ),
  available(
    {
      slug: "spotlight-search",
      name: "Spotlight Search",
      description: "A full-width search field with live results and recent queries.",
      category: "interactive",
      tags: ["search", "spotlight", "results", "keyboard"],
    },
    R3,
  ),
  available(
    {
      slug: "stepper",
      name: "Stepper",
      description: "A multi-step flow with progress, validation, and animated transitions.",
      category: "interactive",
      tags: ["stepper", "wizard", "onboarding", "progress"],
    },
    R3,
  ),

  latest({
    slug: "music-player",
    name: "Music Player",
    description: "A compact player with crossfading artwork, a live equalizer, and progress.",
    category: "interactive",
    tags: ["media", "audio", "player", "card"],
    dependencies: [],
  }),
  latest({
    slug: "theme-switch",
    name: "Theme Switch",
    description: "A dark mode tile that morphs its colors, icon and switch together.",
    category: "interactive",
    tags: ["theme", "dark mode", "switch", "toggle"],
    dependencies: [],
  }),
  latest({
    slug: "task-checklist",
    name: "Task Checklist",
    description: "A to-do list whose checks draw in and done items get struck through.",
    category: "interactive",
    tags: ["checklist", "todo", "checkbox", "progress"],
    dependencies: [],
    sourceFiles: ["task-checklist/task-checklist.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "quick-search",
    name: "Quick Search",
    description: "A command search with a sliding highlight and keyboard navigation.",
    category: "interactive",
    tags: ["search", "command", "combobox", "keyboard"],
    dependencies: [],
  }),
  latest({
    slug: "like-button",
    name: "Like Button",
    description: "A like toggle with a pop, an expanding ring, and a rolling count.",
    category: "interactive",
    tags: ["like", "button", "counter", "social"],
    dependencies: [],
    sourceFiles: ["like-button/like-button.tsx", "rolling-number/rolling-number.tsx"],
  }),

  // Cards & Data (18)
  available(
    {
      slug: "metric-card",
      name: "Metric Card",
      description: "A KPI card with trend indicator, delta, and selectable time range.",
      category: "cards-data",
      tags: ["metric", "kpi", "dashboard", "card"],
      featured: true,
    },
    R1,
  ),
  available(
    {
      slug: "sparkline-card",
      name: "Sparkline Card",
      description: "A compact card with an SVG sparkline and hover-to-inspect values.",
      category: "cards-data",
      tags: ["sparkline", "chart", "card", "dashboard"],
    },
    R2,
  ),
  available(
    {
      slug: "activity-feed",
      name: "Activity Feed",
      description: "A grouped activity list with filters and relative timestamps.",
      category: "cards-data",
      tags: ["feed", "activity", "list", "timeline"],
    },
    R2,
  ),
  available(
    {
      slug: "timeline",
      name: "Timeline",
      description: "A vertical timeline with expandable milestones and status markers.",
      category: "cards-data",
      tags: ["timeline", "history", "milestones"],
    },
    R3,
  ),
  available(
    {
      slug: "pricing-card",
      name: "Pricing Card",
      description: "A plan card with a monthly/yearly toggle and highlighted tier.",
      category: "cards-data",
      tags: ["pricing", "plans", "card", "billing"],
    },
    R3,
  ),
  preview({
    slug: "progress-ring",
    name: "Progress Ring",
    description: "An animated circular progress indicator with a centered label.",
    category: "cards-data",
    tags: ["progress", "ring", "chart", "status"],
  }),
  latest({
    slug: "comparison-table",
    name: "Comparison Table",
    description: "A responsive feature comparison grid with sticky headers.",
    category: "cards-data",
    tags: ["table", "comparison", "features"],
    dependencies: [],
  }),
  latest({
    slug: "kanban-board",
    name: "Kanban Board",
    description: "A compact board whose cards lift and glide between columns.",
    category: "cards-data",
    tags: ["kanban", "board", "drag", "layout-animation"],
    dependencies: ["motion"],
    sourceFiles: ["kanban-board/kanban-board.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "profile-card",
    name: "Profile Card",
    description: "A user card with avatar, role, and quick actions.",
    category: "cards-data",
    tags: ["profile", "user", "avatar", "card"],
    dependencies: ["radix-ui"],
  }),
  latest({
    slug: "file-card",
    name: "File Card",
    description: "A file preview card with type icon, size, and share menu.",
    category: "cards-data",
    tags: ["file", "upload", "card"],
    dependencies: ["radix-ui"],
  }),

  latest({
    slug: "route-map",
    name: "Route Map",
    description: "A mini map that draws a route as it is travelled, with a live ETA.",
    category: "cards-data",
    tags: ["map", "navigation", "svg", "eta"],
    dependencies: [],
    sourceFiles: ["route-map/route-map.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "activity-rings",
    name: "Activity Rings",
    description: "Concentric goal rings that sweep to new values with a rolling percent.",
    category: "cards-data",
    tags: ["progress", "fitness", "rings", "svg"],
    dependencies: [],
    sourceFiles: ["activity-rings/activity-rings.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "portfolio-chart",
    name: "Portfolio Chart",
    description: "A balance card with rolling digits and a line that morphs between datasets.",
    category: "cards-data",
    tags: ["chart", "finance", "line", "svg"],
    dependencies: [],
    sourceFiles: ["portfolio-chart/portfolio-chart.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "clock-widget",
    name: "Clock Widget",
    description: "A world clock tile with rolling minutes, the local date, and the weather.",
    category: "cards-data",
    tags: ["clock", "time zone", "weather", "widget"],
    dependencies: [],
    sourceFiles: ["clock-widget/clock-widget.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "billing-toggle",
    name: "Billing Toggle",
    description: "A monthly / yearly switch with a rolling price and a savings badge.",
    category: "cards-data",
    tags: ["pricing", "billing", "toggle", "plans"],
    dependencies: [],
    sourceFiles: ["billing-toggle/billing-toggle.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "presence-avatars",
    name: "Presence Avatars",
    description: "Live avatars that join and leave a file with a rolling headcount.",
    category: "cards-data",
    tags: ["avatars", "presence", "collaboration", "live"],
    dependencies: ["motion"],
    sourceFiles: ["presence-avatars/presence-avatars.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "streak-tracker",
    name: "Streak Tracker",
    description: "A streak counter with a week of squares that fill day by day.",
    category: "cards-data",
    tags: ["streak", "habit", "progress", "calendar"],
    dependencies: [],
    sourceFiles: ["streak-tracker/streak-tracker.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "battery-levels",
    name: "Battery Levels",
    description: "Battery bars for your devices with a charging bolt and rolling percent.",
    category: "cards-data",
    tags: ["battery", "meter", "devices", "status"],
    dependencies: [],
    sourceFiles: ["battery-levels/battery-levels.tsx", "rolling-number/rolling-number.tsx"],
  }),

  // Forms & Inputs (10)
  latest({
    slug: "tag-input",
    name: "Tag Input",
    description: "An input that turns typed values into removable tags.",
    category: "forms-inputs",
    tags: ["tags", "input", "chips", "form"],
    dependencies: [],
  }),
  latest({
    slug: "otp-input",
    name: "OTP Input",
    description: "A one-time code field with rolling digits and a verifying spinner.",
    category: "forms-inputs",
    tags: ["otp", "code", "input", "verification"],
    dependencies: [],
    sourceFiles: ["otp-input/otp-input.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "date-range-picker",
    name: "Date Range Picker",
    description: "A two-month calendar for selecting a start and end date.",
    category: "forms-inputs",
    tags: ["date", "calendar", "range", "picker"],
    dependencies: ["radix-ui"],
  }),
  latest({
    slug: "file-dropzone",
    name: "File Dropzone",
    description: "A drag-and-drop upload area with file list and progress.",
    category: "forms-inputs",
    tags: ["upload", "dropzone", "files", "drag"],
    dependencies: [],
  }),
  latest({
    slug: "password-strength",
    name: "Password Strength",
    description: "A password field with live strength meter and requirement list.",
    category: "forms-inputs",
    tags: ["password", "validation", "strength", "input"],
    dependencies: [],
  }),
  latest({
    slug: "range-slider",
    name: "Range Slider",
    description: "A dual-thumb slider with value tooltips and step snapping.",
    category: "forms-inputs",
    tags: ["slider", "range", "input"],
    dependencies: [],
  }),
  latest({
    slug: "color-picker",
    name: "Color Picker",
    description: "A hue slider and presets that glide the swatch to the new color.",
    category: "forms-inputs",
    tags: ["color", "picker", "slider", "swatch"],
    dependencies: [],
  }),
  latest({
    slug: "rating-input",
    name: "Rating Input",
    description: "An accessible star rating with half steps and hover preview.",
    category: "forms-inputs",
    tags: ["rating", "stars", "input", "feedback"],
    dependencies: [],
  }),

  latest({
    slug: "week-picker",
    name: "Week Picker",
    description: "A one-week date strip with a selection pill that slides between days.",
    category: "forms-inputs",
    tags: ["date", "calendar", "week", "picker"],
    dependencies: [],
  }),
  latest({
    slug: "vertical-slider",
    name: "Vertical Slider",
    description: "A tall Control Center style slider for volume or brightness.",
    category: "forms-inputs",
    tags: ["slider", "volume", "brightness", "range"],
    dependencies: [],
  }),

  // Motion & Feedback (12)
  preview({
    slug: "animated-number-counter",
    name: "Animated Number Counter",
    description: "A number that counts to its target with easing and formatting.",
    category: "motion-feedback",
    tags: ["counter", "number", "animation", "stats"],
    featured: true,
  }),
  preview({
    slug: "morphing-dialog",
    name: "Morphing Dialog",
    description: "A card that morphs into a dialog with a shared-layout transition.",
    category: "motion-feedback",
    tags: ["dialog", "morph", "animation", "modal"],
    featured: true,
    dependencies: ["motion"],
  }),
  latest({
    slug: "press-and-hold-button",
    name: "Press and Hold Button",
    description: "A destructive button that requires a press-and-hold to fire.",
    category: "motion-feedback",
    tags: ["button", "confirm", "destructive", "hold"],
    dependencies: [],
  }),
  latest({
    slug: "toast-notification",
    name: "Toast Notification",
    description: "Notification cards that drop in on top and push older ones out.",
    category: "motion-feedback",
    tags: ["toast", "notification", "stack", "feed"],
    dependencies: ["motion"],
  }),
  latest({
    slug: "skeleton-loader",
    name: "Skeleton Loader",
    description: "Content-shaped loading placeholders with a subtle shimmer.",
    category: "motion-feedback",
    tags: ["skeleton", "loading", "placeholder"],
    dependencies: [],
  }),
  latest({
    slug: "text-reveal",
    name: "Text Reveal",
    description: "Headline text that reveals word by word on scroll.",
    category: "motion-feedback",
    tags: ["text", "reveal", "scroll", "animation"],
    dependencies: ["motion"],
  }),
  latest({
    slug: "magnetic-button",
    name: "Magnetic Button",
    description: "A button that gently follows the cursor with spring physics.",
    category: "motion-feedback",
    tags: ["button", "magnetic", "spring", "hover"],
    dependencies: ["motion"],
  }),
  latest({
    slug: "status-indicator",
    name: "Status Indicator",
    description: "A live status indicator with a soft pulsing halo.",
    category: "motion-feedback",
    tags: ["status", "pulse", "indicator", "live"],
    dependencies: [],
  }),

  latest({
    slug: "pomodoro-timer",
    name: "Pomodoro Timer",
    description: "A countdown ring with rolling digits that pauses and resumes on click.",
    category: "motion-feedback",
    tags: ["timer", "countdown", "pomodoro", "progress"],
    dependencies: [],
    sourceFiles: ["pomodoro-timer/pomodoro-timer.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "upload-progress",
    name: "Upload Progress",
    description: "A file upload tile with a progress bar, rolling percent, and a check.",
    category: "motion-feedback",
    tags: ["upload", "progress", "file", "status"],
    dependencies: [],
    sourceFiles: ["upload-progress/upload-progress.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "progress-button",
    name: "Progress Button",
    description: "A button that fills with deploy progress and settles into a Live pill.",
    category: "motion-feedback",
    tags: ["button", "progress", "deploy", "status"],
    dependencies: [],
    sourceFiles: ["progress-button/progress-button.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "rolling-number",
    name: "Rolling Number",
    description: "Digits that roll like an odometer whenever the value changes.",
    category: "motion-feedback",
    tags: ["number", "counter", "odometer", "animation"],
    dependencies: [],
  }),

  // AI Components (9)
  available(
    {
      slug: "ai-chat-bubble",
      name: "AI Chat Bubble",
      description: "User and assistant message bubbles with actions and avatars.",
      category: "ai",
      tags: ["chat", "message", "bubble", "assistant"],
    },
    R3,
  ),
  available(
    {
      slug: "prompt-input",
      name: "Prompt Input",
      description: "An auto-growing prompt box with attachments, submit, and stop states.",
      category: "ai",
      tags: ["prompt", "input", "chat", "textarea"],
      featured: true,
    },
    R1,
  ),
  available(
    {
      slug: "streaming-text",
      name: "Streaming Text",
      description: "Text that streams in token by token with a blinking caret.",
      category: "ai",
      tags: ["streaming", "text", "typewriter", "llm"],
    },
    R3,
  ),
  available(
    {
      slug: "model-selector",
      name: "Model Selector",
      description: "A grouped model picker with capability badges and search.",
      category: "ai",
      tags: ["model", "select", "picker", "llm"],
      dependencies: ["cmdk", "radix-ui"],
    },
    R3,
  ),
  available(
    {
      slug: "ai-thinking-indicator",
      name: "AI Thinking Indicator",
      description: "A reasoning status that cycles through steps while a model works.",
      category: "ai",
      tags: ["thinking", "loading", "status", "llm"],
      featured: true,
    },
    R3,
  ),
  latest({
    slug: "token-counter",
    name: "Token Counter",
    description: "A live estimate of prompt tokens against a context limit.",
    category: "ai",
    tags: ["tokens", "counter", "context", "llm"],
    dependencies: [],
    sourceFiles: ["token-counter/token-counter.tsx", "rolling-number/rolling-number.tsx"],
  }),
  latest({
    slug: "citation-card",
    name: "Citation Card",
    description: "An inline source card with hover preview and numbered references.",
    category: "ai",
    tags: ["citation", "source", "reference", "card"],
    dependencies: ["radix-ui"],
  }),
  latest({
    slug: "suggestion-chips",
    name: "Suggestion Chips",
    description: "Tappable follow-up prompts that appear after a response.",
    category: "ai",
    tags: ["suggestions", "chips", "prompts"],
    dependencies: [],
  }),

  latest({
    slug: "chat-thread",
    name: "Chat Thread",
    description: "A compact chat where new messages rise in and old ones fade out.",
    category: "ai",
    tags: ["chat", "messages", "typing-indicator", "animation"],
    dependencies: ["motion"],
  }),

  // Navigation & Layout (6)
  preview({
    slug: "floating-dock",
    name: "Floating Dock",
    description: "A macOS-style dock whose icons magnify near the cursor.",
    category: "navigation-layout",
    tags: ["dock", "navigation", "magnify", "hover"],
    featured: true,
    dependencies: ["motion"],
  }),
  latest({
    slug: "breadcrumb-trail",
    name: "Breadcrumb Trail",
    description: "Collapsible breadcrumbs with an overflow menu for deep paths.",
    category: "navigation-layout",
    tags: ["breadcrumb", "navigation", "path"],
    dependencies: ["radix-ui"],
  }),
  latest({
    slug: "sidebar-nav",
    name: "Sidebar Nav",
    description: "A collapsible sidebar with nested groups and active states.",
    category: "navigation-layout",
    tags: ["sidebar", "navigation", "collapsible"],
    dependencies: ["radix-ui"],
  }),
  latest({
    slug: "bento-grid",
    name: "Bento Grid",
    description: "A responsive feature grid with mixed tile sizes.",
    category: "navigation-layout",
    tags: ["grid", "bento", "layout", "features"],
    dependencies: [],
  }),
  latest({
    slug: "section-nav",
    name: "Section Nav",
    description: "A sticky in-page navigation that tracks the visible section.",
    category: "navigation-layout",
    tags: ["navigation", "scroll", "sticky", "anchor"],
    dependencies: [],
  }),
  latest({
    slug: "mega-menu",
    name: "Mega Menu",
    description: "A wide navigation panel with grouped links and previews.",
    category: "navigation-layout",
    tags: ["menu", "navigation", "header"],
    dependencies: ["radix-ui"],
  }),
];
