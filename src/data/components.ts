import type { FMUIComponent } from "@/types/component";

const R1 = "2026-10-06";
const R2 = "2026-10-13";
const R3 = "2026-10-20";
const R4 = "2026-10-23";

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

function preview(seed: Seed): FMUIComponent {
  return { ...available(seed, R4), status: "preview" };
}

function planned(seed: Seed): FMUIComponent {
  return {
    status: "coming-soon",
    featured: false,
    createdAt: R4,
    updatedAt: R4,
    dependencies: [],
    sourceFiles: [],
    ...seed,
  };
}

/** Homepage featured order: a spread across navigation, AI, animation, and data display. */
export const featuredOrder = [
  "floating-dock",
  "prompt-input",
  "morphing-dialog",
  "metric-card",
  "ai-thinking-indicator",
  "animated-counter",
] as const;

export const components: FMUIComponent[] = [
  // Interactive UI (10)
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

  // Cards & Data (10)
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
  planned({
    slug: "comparison-table",
    name: "Comparison Table",
    description: "A responsive feature comparison grid with sticky headers.",
    category: "cards-data",
    tags: ["table", "comparison", "features"],
  }),
  planned({
    slug: "kanban-card",
    name: "Kanban Card",
    description: "A draggable task card with labels, assignees, and due dates.",
    category: "cards-data",
    tags: ["kanban", "task", "card", "drag"],
  }),
  planned({
    slug: "profile-card",
    name: "Profile Card",
    description: "A user card with avatar, role, and quick actions.",
    category: "cards-data",
    tags: ["profile", "user", "avatar", "card"],
  }),
  planned({
    slug: "file-card",
    name: "File Card",
    description: "A file preview card with type icon, size, and share menu.",
    category: "cards-data",
    tags: ["file", "upload", "card"],
  }),

  // Forms & Inputs (8)
  planned({
    slug: "tag-input",
    name: "Tag Input",
    description: "An input that turns typed values into removable tags.",
    category: "forms-inputs",
    tags: ["tags", "input", "chips", "form"],
  }),
  planned({
    slug: "otp-input",
    name: "OTP Input",
    description: "A segmented one-time-code input with paste support.",
    category: "forms-inputs",
    tags: ["otp", "code", "verification", "input"],
  }),
  planned({
    slug: "date-range-picker",
    name: "Date Range Picker",
    description: "A two-month calendar for selecting a start and end date.",
    category: "forms-inputs",
    tags: ["date", "calendar", "range", "picker"],
  }),
  planned({
    slug: "file-dropzone",
    name: "File Dropzone",
    description: "A drag-and-drop upload area with file list and progress.",
    category: "forms-inputs",
    tags: ["upload", "dropzone", "files", "drag"],
  }),
  planned({
    slug: "password-strength",
    name: "Password Strength",
    description: "A password field with live strength meter and requirement list.",
    category: "forms-inputs",
    tags: ["password", "validation", "strength", "input"],
  }),
  planned({
    slug: "range-slider",
    name: "Range Slider",
    description: "A dual-thumb slider with value tooltips and step snapping.",
    category: "forms-inputs",
    tags: ["slider", "range", "input"],
  }),
  planned({
    slug: "color-picker",
    name: "Color Picker",
    description: "A swatch and hex input picker with recent colors.",
    category: "forms-inputs",
    tags: ["color", "picker", "input", "swatch"],
  }),
  planned({
    slug: "rating-input",
    name: "Rating Input",
    description: "An accessible star rating with half steps and hover preview.",
    category: "forms-inputs",
    tags: ["rating", "stars", "input", "feedback"],
  }),

  // Motion & Feedback (8)
  preview({
    slug: "animated-counter",
    name: "Animated Counter",
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
  planned({
    slug: "hold-to-confirm",
    name: "Hold to Confirm",
    description: "A destructive button that requires a press-and-hold to fire.",
    category: "motion-feedback",
    tags: ["button", "confirm", "destructive", "hold"],
  }),
  planned({
    slug: "toast-stack",
    name: "Toast Stack",
    description: "Stacked notifications that expand on hover and swipe to dismiss.",
    category: "motion-feedback",
    tags: ["toast", "notification", "stack", "feedback"],
  }),
  planned({
    slug: "skeleton-loader",
    name: "Skeleton Loader",
    description: "Content-shaped loading placeholders with a subtle shimmer.",
    category: "motion-feedback",
    tags: ["skeleton", "loading", "placeholder"],
  }),
  planned({
    slug: "text-reveal",
    name: "Text Reveal",
    description: "Headline text that reveals word by word on scroll.",
    category: "motion-feedback",
    tags: ["text", "reveal", "scroll", "animation"],
  }),
  planned({
    slug: "magnetic-button",
    name: "Magnetic Button",
    description: "A button that gently follows the cursor with spring physics.",
    category: "motion-feedback",
    tags: ["button", "magnetic", "spring", "hover"],
  }),
  planned({
    slug: "status-pulse",
    name: "Status Pulse",
    description: "A live status indicator with a soft pulsing halo.",
    category: "motion-feedback",
    tags: ["status", "pulse", "indicator", "live"],
  }),

  // AI Components (8)
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
  planned({
    slug: "token-counter",
    name: "Token Counter",
    description: "A live estimate of prompt tokens against a context limit.",
    category: "ai",
    tags: ["tokens", "counter", "context", "llm"],
  }),
  planned({
    slug: "citation-card",
    name: "Citation Card",
    description: "An inline source card with hover preview and numbered references.",
    category: "ai",
    tags: ["citation", "source", "reference", "card"],
  }),
  planned({
    slug: "suggestion-chips",
    name: "Suggestion Chips",
    description: "Tappable follow-up prompts that appear after a response.",
    category: "ai",
    tags: ["suggestions", "chips", "prompts"],
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
  planned({
    slug: "breadcrumb-trail",
    name: "Breadcrumb Trail",
    description: "Collapsible breadcrumbs with an overflow menu for deep paths.",
    category: "navigation-layout",
    tags: ["breadcrumb", "navigation", "path"],
  }),
  planned({
    slug: "sidebar-nav",
    name: "Sidebar Nav",
    description: "A collapsible sidebar with nested groups and active states.",
    category: "navigation-layout",
    tags: ["sidebar", "navigation", "collapsible"],
  }),
  planned({
    slug: "bento-grid",
    name: "Bento Grid",
    description: "A responsive feature grid with mixed tile sizes.",
    category: "navigation-layout",
    tags: ["grid", "bento", "layout", "features"],
  }),
  planned({
    slug: "section-nav",
    name: "Section Nav",
    description: "A sticky in-page navigation that tracks the visible section.",
    category: "navigation-layout",
    tags: ["navigation", "scroll", "sticky", "anchor"],
  }),
  planned({
    slug: "mega-menu",
    name: "Mega Menu",
    description: "A wide navigation panel with grouped links and previews.",
    category: "navigation-layout",
    tags: ["menu", "navigation", "header"],
  }),
];
