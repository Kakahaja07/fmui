import type { ComponentDoc } from "@/types/component";

/**
 * Documentation content for implemented components. Usage snippets are
 * hand-written examples; the Code tab on each page shows the real source.
 */
export const componentDocs: Record<string, ComponentDoc> = {
  "expandable-tabs": {
    usage: `import { ExpandableTabs } from "@/components/fmui/expandable-tabs";
import { Home01Icon, Mail01Icon } from "@hugeicons/core-free-icons";

<ExpandableTabs
  tabs={[
    { id: "home", label: "Home", icon: Home01Icon },
    { id: "inbox", label: "Inbox", icon: Mail01Icon },
  ]}
  defaultValue="home"
  onValueChange={(id) => console.log(id)}
/>`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultValue and let the component own its selection." },
      { name: "Controlled", description: "Pass value and onValueChange to sync with router state or a store." },
    ],
    props: [
      { name: "tabs", type: "ExpandableTab[]", description: "Tabs with an id, label, and Hugeicons icon." },
      { name: "value", type: "string", description: "Selected tab id (controlled)." },
      { name: "defaultValue", type: "string", default: "tabs[0].id", description: "Initial selection (uncontrolled)." },
      { name: "onValueChange", type: "(id: string) => void", description: "Called when the selection changes." },
      { name: "className", type: "string", description: "Extra classes for the tab list." },
    ],
    accessibility: [
      "Rendered as role=tablist with role=tab buttons and aria-selected.",
      "Roving tabindex: Left/Right arrows, Home and End move between tabs.",
      "Collapsed labels stay in the accessible name via a visually hidden span.",
    ],
  },
  "animated-segmented-control": {
    usage: `import { AnimatedSegmentedControl } from "@/components/fmui/animated-segmented-control";

<AnimatedSegmentedControl
  aria-label="View"
  options={[
    { value: "list", label: "List" },
    { value: "board", label: "Board" },
  ]}
  defaultValue="list"
  onValueChange={setView}
/>`,
    variants: [
      { name: "Medium", description: "Default 32px height for toolbars and page headers." },
      { name: "Small", description: "size=\"sm\" for dense settings panels and cards." },
    ],
    props: [
      { name: "options", type: "SegmentedOption[]", description: "Options with a value and label." },
      { name: "value", type: "string", description: "Selected value (controlled)." },
      { name: "defaultValue", type: "string", default: "options[0].value", description: "Initial value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called on change." },
      { name: "size", type: "\"sm\" | \"md\"", default: "\"md\"", description: "Control height." },
      { name: "aria-label", type: "string", description: "Required accessible name for the group." },
    ],
    accessibility: [
      "Built from native radio inputs inside role=radiogroup, so arrow keys and screen readers work natively.",
      "Focus ring is drawn on the label with :has(:focus-visible).",
      "The sliding indicator is aria-hidden and purely decorative.",
    ],
  },
  "command-menu": {
    usage: `import { CommandMenu } from "@/components/fmui/command-menu";

<CommandMenu
  hotkey
  items={[
    { id: "new", label: "New file", group: "Create", shortcut: ["N"] },
    { id: "settings", label: "Open settings", group: "Navigate" },
  ]}
  onSelect={(item) => run(item.id)}
/>`,
    variants: [
      { name: "Default trigger", description: "Renders a search-style button when no trigger is passed." },
      { name: "Custom trigger", description: "Pass any element as trigger; it receives the dialog trigger props." },
      { name: "Global hotkey", description: "hotkey enables Ctrl/Cmd+K to toggle the menu." },
    ],
    props: [
      { name: "items", type: "CommandItem[]", description: "Commands grouped by the group field." },
      { name: "onSelect", type: "(item: CommandItem) => void", description: "Called when a command is chosen." },
      { name: "hotkey", type: "boolean", default: "false", description: "Register Ctrl/Cmd+K." },
      { name: "trigger", type: "ReactNode", description: "Custom trigger element." },
      { name: "placeholder", type: "string", default: "\"Type a command or search...\"", description: "Input placeholder." },
    ],
    accessibility: [
      "Uses a Radix dialog: focus is trapped, Escape closes, and focus returns to the trigger.",
      "cmdk provides listbox semantics with arrow-key navigation and type-ahead filtering.",
      "Shortcuts are rendered in kbd elements and announced with the item label.",
    ],
  },
  "multi-select": {
    usage: `import { MultiSelect } from "@/components/fmui/multi-select";

<MultiSelect
  aria-label="Frameworks"
  options={[
    { value: "next", label: "Next.js" },
    { value: "astro", label: "Astro" },
  ]}
  defaultValue={["next"]}
  onValueChange={setValue}
/>`,
    variants: [
      { name: "Uncontrolled", description: "Use defaultValue for forms that read the value on submit." },
      { name: "Controlled", description: "Use value and onValueChange to validate or persist selections." },
    ],
    props: [
      { name: "options", type: "MultiSelectOption[]", description: "Available options." },
      { name: "value", type: "string[]", description: "Selected values (controlled)." },
      { name: "defaultValue", type: "string[]", default: "[]", description: "Initial selection." },
      { name: "onValueChange", type: "(value: string[]) => void", description: "Called on change." },
      { name: "placeholder", type: "string", default: "\"Select...\"", description: "Shown when empty." },
      { name: "aria-label", type: "string", description: "Required accessible name for the trigger." },
    ],
    accessibility: [
      "Trigger is a combobox button with aria-expanded; the popover list is keyboard navigable.",
      "Chips expose a labelled remove control that works with Enter and Space.",
      "Backspace in an empty search removes the last selection.",
    ],
  },
  "smart-dropdown": {
    usage: `import { SmartDropdown } from "@/components/fmui/smart-dropdown";

<SmartDropdown
  label="Actions"
  actions={[
    { id: "edit", label: "Edit", description: "Change the title", shortcut: "E" },
    { id: "delete", label: "Delete", destructive: true },
  ]}
  radio={{ label: "Visibility", defaultValue: "team", options: [{ value: "team", label: "Team" }] }}
  onAction={(a) => run(a.id)}
/>`,
    variants: [
      { name: "Actions only", description: "Omit radio to render a plain action list." },
      { name: "With radio group", description: "Add a labelled radio section for a mutually exclusive setting." },
      { name: "Destructive item", description: "Set destructive to style an action in the danger color." },
    ],
    props: [
      { name: "label", type: "string", description: "Trigger button label." },
      { name: "actions", type: "SmartDropdownAction[]", description: "Menu items with optional description, icon, and shortcut." },
      { name: "radio", type: "{ label; options; defaultValue }", description: "Optional radio group." },
      { name: "onAction", type: "(action) => void", description: "Called when an action is selected." },
      { name: "onRadioChange", type: "(value: string) => void", description: "Called when the radio value changes." },
    ],
    accessibility: [
      "Radix menu semantics: role=menu, roving focus, type-ahead, and Escape to close.",
      "Descriptions are part of each item so they are read with the label.",
      "The menu scales from its trigger using the Radix transform origin.",
    ],
  },
  "floating-toolbar": {
    usage: `import { FloatingToolbar } from "@/components/fmui/floating-toolbar";

<FloatingToolbar defaultHtml="<p>Select me to format.</p>" />`,
    variants: [
      { name: "Inline editor", description: "Drop into comment boxes or notes where a full editor is overkill." },
    ],
    props: [
      { name: "defaultHtml", type: "string", description: "Initial HTML rendered in the editable region. Only pass trusted markup." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
    accessibility: [
      "The toolbar uses role=toolbar and each button reports its state with aria-pressed.",
      "Ctrl/Cmd+B, I, and U apply formatting without the pointer.",
      "The editable region is a labelled multiline textbox.",
    ],
  },
  "context-menu": {
    usage: `import { ContextMenu } from "@/components/fmui/context-menu";

<ContextMenu
  actions={[
    { id: "rename", label: "Rename", shortcut: "F2" },
    { id: "delete", label: "Delete", destructive: true, separator: true },
  ]}
  onAction={(a) => run(a.id)}
>
  <div>Right-click me</div>
</ContextMenu>`,
    variants: [
      { name: "Grouped", description: "Set separator on an item to draw a divider before it." },
      { name: "Disabled items", description: "Set disabled to keep an action visible but inert." },
    ],
    props: [
      { name: "actions", type: "ContextMenuAction[]", description: "Menu items in display order." },
      { name: "onAction", type: "(action) => void", description: "Called when an item is chosen." },
      { name: "children", type: "ReactNode", description: "The element that opens the menu on right-click." },
    ],
    accessibility: [
      "Opens with right-click, long-press on touch, or Shift+F10 on the keyboard.",
      "Items use role=menuitem with arrow-key navigation and Escape to dismiss.",
    ],
  },
  "resizable-panels": {
    usage: `import { ResizablePanels } from "@/components/fmui/resizable-panels";

<div className="h-64">
  <ResizablePanels left={<Editor />} right={<Preview />} defaultSplit={55} minSplit={25} maxSplit={75} />
</div>`,
    variants: [
      { name: "Even split", description: "Default 50/50 layout for side-by-side comparison." },
      { name: "Constrained", description: "Tighten minSplit and maxSplit to keep both panels usable." },
    ],
    props: [
      { name: "left", type: "ReactNode", description: "Content of the left panel." },
      { name: "right", type: "ReactNode", description: "Content of the right panel." },
      { name: "defaultSplit", type: "number", default: "50", description: "Initial left width in percent." },
      { name: "minSplit", type: "number", default: "20", description: "Minimum left width in percent." },
      { name: "maxSplit", type: "number", default: "80", description: "Maximum left width in percent." },
    ],
    accessibility: [
      "The handle is a focusable role=separator with aria-valuenow, min, and max.",
      "Arrow keys move by 2%, Shift+Arrow by 10%, Home/End snap to the limits, Enter resets.",
      "Pointer capture keeps dragging smooth even when the cursor leaves the handle.",
    ],
  },
  "spotlight-search": {
    usage: `import { SpotlightSearch } from "@/components/fmui/spotlight-search";

<SpotlightSearch
  results={[{ id: "1", title: "Quarterly report", subtitle: "Documents" }]}
  onSelect={(r) => open(r.id)}
/>`,
    variants: [
      { name: "With icons", description: "Provide icon on results to render a leading glyph." },
      { name: "Limited results", description: "Set maxResults to keep the dropdown short." },
    ],
    props: [
      { name: "results", type: "SpotlightResult[]", description: "The searchable set." },
      { name: "onSelect", type: "(result) => void", description: "Called on Enter or click." },
      { name: "placeholder", type: "string", default: "\"Search anything...\"", description: "Input placeholder." },
      { name: "maxResults", type: "number", default: "6", description: "Maximum visible results." },
    ],
    accessibility: [
      "Implements the combobox pattern with aria-activedescendant and a role=listbox.",
      "Arrow keys move the active option, Enter selects, Escape clears and blurs.",
      "Recent queries are plain buttons so they are reachable by keyboard.",
    ],
  },
  stepper: {
    usage: `import { Stepper } from "@/components/fmui/stepper";

<Stepper
  steps={[
    { id: "account", title: "Account", validate: () => (name ? null : "Enter a name"), content: <NameField /> },
    { id: "review", title: "Review", content: <Summary /> },
  ]}
  onComplete={submit}
/>`,
    variants: [
      { name: "Validated", description: "Return a message from validate to block the next step." },
      { name: "Free navigation", description: "Omit validate for purely informational steps." },
    ],
    props: [
      { name: "steps", type: "Step[]", description: "Ordered steps with content and optional validation." },
      { name: "onComplete", type: "() => void", description: "Called when the last step finishes." },
      { name: "className", type: "string", description: "Extra classes for the container." },
    ],
    accessibility: [
      "The current step indicator carries aria-current=\"step\" and each marker names its state.",
      "Validation messages are announced with role=alert.",
      "Step transitions use opacity and short slides that respect reduced motion.",
    ],
  },
  "metric-card": {
    usage: `import { MetricCard } from "@/components/fmui/metric-card";

<MetricCard
  title="Active users"
  ranges={[{ id: "7d", label: "7d", value: 4821, previous: 4410, series: [31, 38, 35, 42, 46, 44, 52] }]}
/>`,
    variants: [
      { name: "Single range", description: "Pass one range to hide the toggle and show a static metric." },
      { name: "Custom format", description: "Provide format to render currency or percentages." },
    ],
    props: [
      { name: "title", type: "string", description: "Metric name." },
      { name: "ranges", type: "MetricRange[]", description: "Selectable ranges with value, previous value, and bar series." },
      { name: "format", type: "(n: number) => string", default: "Intl.NumberFormat", description: "Value formatter." },
    ],
    accessibility: [
      "Range switcher is a native radio group labelled with the metric title.",
      "The bar chart is decorative; the number and delta carry the information.",
    ],
  },
  "sparkline-card": {
    usage: `import { SparklineCard } from "@/components/fmui/sparkline-card";

<SparklineCard title="Monthly revenue" unit="k" points={[{ label: "Jan", value: 120 }, { label: "Feb", value: 132 }]} />`,
    variants: [{ name: "With unit", description: "Append a unit such as k, %, or ms to the value." }],
    props: [
      { name: "title", type: "string", description: "Card title." },
      { name: "points", type: "SparklinePoint[]", description: "Ordered series with a label and value." },
      { name: "unit", type: "string", default: "\"\"", description: "Suffix for displayed values." },
    ],
    accessibility: [
      "The SVG has role=img with a descriptive label, and all values are listed in a visually hidden paragraph.",
      "Hover inspection is an enhancement; the latest value is always visible.",
    ],
  },
  "activity-feed": {
    usage: `import { ActivityFeed } from "@/components/fmui/activity-feed";

<ActivityFeed
  filters={[{ value: "all", label: "All" }, { value: "deploy", label: "Deploys" }]}
  items={[{ id: "1", actor: "Ada", action: "shipped", target: "v2.4", at: "2026-10-23T13:40:00Z", type: "deploy", icon: Rocket01Icon }]}
/>`,
    variants: [{ name: "Fixed reference time", description: "Pass now to render deterministic relative timestamps." }],
    props: [
      { name: "items", type: "ActivityItem[]", description: "Activity entries with an ISO timestamp and type." },
      { name: "filters", type: "{ value; label }[]", description: "Filter chips. Use value \"all\" for the first entry." },
      { name: "now", type: "string", default: "latest item", description: "Reference ISO time for relative labels." },
    ],
    accessibility: [
      "Filters are a tablist; the active filter is reported with aria-selected.",
      "Timestamps are time elements with machine-readable dateTime.",
    ],
  },
  timeline: {
    usage: `import { Timeline } from "@/components/fmui/timeline";

<Timeline milestones={[{ id: "1", title: "Kickoff", date: "Sep 2", status: "done", details: "Scope agreed." }]} />`,
    variants: [{ name: "Expandable", description: "Add details to a milestone to make it expandable." }],
    props: [
      { name: "milestones", type: "TimelineMilestone[]", description: "Ordered milestones with status done, current, or upcoming." },
    ],
    accessibility: [
      "Each expandable milestone is a button with aria-expanded.",
      "Status is communicated with text (In progress), not color alone.",
    ],
  },
  "pricing-card": {
    usage: `import { PricingCard } from "@/components/fmui/pricing-card";

<PricingCard
  plans={[{ id: "pro", name: "Pro", description: "For teams.", monthly: 24, yearly: 19, features: ["Unlimited projects"], highlighted: true }]}
  onSelect={(plan, interval) => checkout(plan.id, interval)}
/>`,
    variants: [{ name: "Highlighted tier", description: "Set highlighted on the plan you want to emphasize." }],
    props: [
      { name: "plans", type: "PricingPlan[]", description: "Plans with monthly and yearly prices." },
      { name: "onSelect", type: "(plan, interval) => void", description: "Called when a plan button is pressed." },
    ],
    accessibility: [
      "The billing toggle is a role=switch with an accessible name.",
      "Selected plan buttons expose aria-pressed.",
    ],
  },
  "progress-ring": {
    usage: `import { ProgressRing } from "@/components/fmui/progress-ring";

<ProgressRing value={64} label="Storage" />`,
    variants: [{ name: "Compact", description: "Reduce size and strokeWidth for inline use." }],
    props: [
      { name: "value", type: "number", description: "Progress from 0 to 100." },
      { name: "size", type: "number", default: "96", description: "Diameter in pixels." },
      { name: "strokeWidth", type: "number", default: "8", description: "Ring thickness." },
      { name: "label", type: "string", description: "Caption under the percentage." },
    ],
    accessibility: ["Exposes role=progressbar with aria-valuenow, min, and max."],
  },
  "ai-chat-bubble": {
    usage: `import { AIChatBubble } from "@/components/fmui/ai-chat-bubble";

<AIChatBubble message={{ id: "1", role: "assistant", name: "FMUI", content: "Hello!" }} onRegenerate={retry} />`,
    variants: [
      { name: "User", description: "role=\"user\" aligns right with a solid bubble." },
      { name: "Assistant", description: "role=\"assistant\" aligns left with copy, regenerate, and feedback actions." },
    ],
    props: [
      { name: "message", type: "ChatMessage", description: "The message to render." },
      { name: "onRegenerate", type: "(message) => void", description: "Called from the regenerate action." },
    ],
    accessibility: [
      "Each bubble announces the speaker with a visually hidden prefix.",
      "Action buttons are labelled and remain reachable by keyboard even when visually faded.",
    ],
  },
  "prompt-input": {
    usage: `import { PromptInput } from "@/components/fmui/prompt-input";

<PromptInput generating={isStreaming} onSubmit={(prompt, files) => send(prompt, files)} onStop={abort} />`,
    variants: [
      { name: "Idle", description: "Shows the send button, disabled until there is text." },
      { name: "Generating", description: "generating swaps the send button for a stop button." },
    ],
    props: [
      { name: "onSubmit", type: "(prompt: string, attachments: string[]) => void", description: "Called on Enter or send." },
      { name: "onStop", type: "() => void", description: "Called when stop is pressed." },
      { name: "generating", type: "boolean", default: "false", description: "Generating state." },
      { name: "placeholder", type: "string", default: "\"Ask anything...\"", description: "Textarea placeholder." },
      { name: "maxRows", type: "number", default: "8", description: "Maximum rows before scrolling." },
    ],
    accessibility: [
      "The textarea is labelled and grows with content, so nothing is hidden.",
      "Enter submits and Shift+Enter inserts a newline; composition events are respected.",
      "Attachment chips have labelled remove buttons.",
    ],
  },
  "streaming-text": {
    usage: `import { StreamingText } from "@/components/fmui/streaming-text";

<StreamingText text={answer} speed={40} onComplete={() => setDone(true)} />`,
    variants: [{ name: "Manual start", description: "Set autoStart to false and let the user press Resume." }],
    props: [
      { name: "text", type: "string", description: "Full text to stream." },
      { name: "speed", type: "number", default: "45", description: "Milliseconds between tokens." },
      { name: "autoStart", type: "boolean", default: "true", description: "Begin streaming on mount." },
      { name: "onComplete", type: "() => void", description: "Called when the last token renders." },
    ],
    accessibility: [
      "Output region uses aria-live=polite and aria-busy while streaming.",
      "With prefers-reduced-motion the full text appears immediately.",
    ],
  },
  "model-selector": {
    usage: `import { ModelSelector } from "@/components/fmui/model-selector";

<ModelSelector
  models={[{ id: "a", name: "Atlas Large", provider: "Atlas Labs", capabilities: ["vision"] }]}
  defaultValue="a"
  onValueChange={setModel}
/>`,
    variants: [{ name: "With capabilities", description: "Add capability strings to render small badges per model." }],
    props: [
      { name: "models", type: "ModelOption[]", description: "Models grouped by provider." },
      { name: "value", type: "string", description: "Selected model id (controlled)." },
      { name: "defaultValue", type: "string", default: "models[0].id", description: "Initial selection." },
      { name: "onValueChange", type: "(id: string) => void", description: "Called on change." },
    ],
    accessibility: [
      "Trigger is a labelled combobox; the list supports arrow keys and type-ahead.",
      "The selected model is marked with a check icon and remains in the trigger label.",
    ],
  },
  "ai-thinking-indicator": {
    usage: `import { AIThinkingIndicator } from "@/components/fmui/ai-thinking-indicator";

<AIThinkingIndicator steps={[{ label: "Reading the question", duration: 1200 }, { label: "Writing the answer", duration: 1400 }]} />`,
    variants: [{ name: "Manual start", description: "Set autoStart to false to show an idle state with a Start button." }],
    props: [
      { name: "steps", type: "ThinkingStep[]", description: "Steps with a label and duration in ms." },
      { name: "autoStart", type: "boolean", default: "true", description: "Run on mount." },
    ],
    accessibility: [
      "The current step is announced through aria-live=polite.",
      "The finished summary is a button with aria-expanded that reveals the step list.",
      "Shimmer runs only when motion is allowed.",
    ],
  },
  "animated-counter": {
    usage: `import { AnimatedCounter } from "@/components/fmui/animated-counter";

<AnimatedCounter value={downloads} duration={900} />`,
    variants: [{ name: "Formatted", description: "Pass format to render currency, percentages, or compact numbers." }],
    props: [
      { name: "value", type: "number", description: "Target value." },
      { name: "duration", type: "number", default: "900", description: "Animation length in ms." },
      { name: "format", type: "(n: number) => string", default: "toLocaleString", description: "Formatter for the displayed value." },
    ],
    accessibility: [
      "Uses aria-live=polite and aria-atomic so the final value is announced once.",
      "Jumps directly to the value when prefers-reduced-motion is set.",
    ],
  },
  "morphing-dialog": {
    usage: `import { MorphingDialog } from "@/components/fmui/morphing-dialog";

<MorphingDialog title="Release notes" subtitle="Version 0.1.0">
  <p>Dialog content.</p>
</MorphingDialog>`,
    variants: [{ name: "Reduced motion", description: "Falls back to a fade when the user prefers reduced motion." }],
    props: [
      { name: "title", type: "string", description: "Card and dialog heading." },
      { name: "subtitle", type: "string", description: "Secondary line." },
      { name: "children", type: "ReactNode", description: "Content shown only in the expanded dialog." },
    ],
    accessibility: [
      "The expanded state is role=dialog with aria-modal and a labelled heading.",
      "Focus moves to the close button on open and returns to the card on close.",
      "Escape and the backdrop both close the dialog.",
    ],
  },
  "floating-dock": {
    usage: `import { FloatingDock } from "@/components/fmui/floating-dock";

<FloatingDock items={[{ id: "home", label: "Home", icon: Home01Icon }]} onSelect={(item) => navigate(item.id)} />`,
    variants: [{ name: "Bottom fixed", description: "Wrap in a fixed container to pin the dock to the viewport." }],
    props: [
      { name: "items", type: "DockItem[]", description: "Dock entries with an icon and label." },
      { name: "onSelect", type: "(item) => void", description: "Called when an item is activated." },
    ],
    accessibility: [
      "Rendered as role=toolbar; each item is a labelled button with aria-pressed for the active entry.",
      "Keyboard focus magnifies the item exactly like hover does.",
    ],
  },
  "rolling-number": {
    usage: `import { RollingNumber } from "@/components/fmui/rolling-number";

<RollingNumber value={balance} format={(n) => "$" + n.toFixed(2)} />`,
    variants: [
      { name: "Integer", description: "The default format groups thousands with commas." },
      { name: "Formatted", description: "Pass format for currency, percentages, or times; non-digits render as-is." },
    ],
    props: [
      { name: "value", type: "number", description: "The number to show." },
      { name: "format", type: "(value: number) => string", default: "toLocaleString", description: "Turns the value into display text." },
      { name: "duration", type: "number", default: "600", description: "Roll duration in ms." },
      { name: "className", type: "string", description: "Typography classes; the digits inherit size and weight." },
    ],
    accessibility: [
      "The full value is rendered once in a visually hidden span; the rolling columns are aria-hidden.",
      "Uses tabular numbers so the width never jitters while digits roll.",
      "Digits switch instantly when prefers-reduced-motion is set.",
    ],
  },
  "like-button": {
    usage: `import { LikeButton } from "@/components/fmui/like-button";

<LikeButton count={1283} onLikedChange={(liked) => save(liked)} />`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultLiked and let the button own its state." },
      { name: "Controlled", description: "Pass liked and onLikedChange to sync with your API." },
    ],
    props: [
      { name: "count", type: "number", description: "Likes from everyone else; your like is added on top." },
      { name: "liked", type: "boolean", description: "Liked state (controlled)." },
      { name: "defaultLiked", type: "boolean", default: "false", description: "Initial state (uncontrolled)." },
      { name: "onLikedChange", type: "(liked: boolean) => void", description: "Called when the button is toggled." },
      { name: "label", type: "string", default: "\"likes\"", description: "Caption under the count." },
    ],
    accessibility: [
      "A real button with aria-pressed and a Like / Unlike label.",
      "The count is read from a hidden text value, not the rolling digits.",
      "The ring and pop are skipped when prefers-reduced-motion is set.",
    ],
  },
  "music-player": {
    usage: `import { MusicPlayer } from "@/components/fmui/music-player";

<MusicPlayer
  tracks={[
    { title: "Late Bloom", artist: "Juno Vale", duration: 187, color: "#2f55f0" },
    { title: "Saturn Walk", artist: "Kaito", duration: 204, color: "#f0694a" },
  ]}
  defaultPlaying
  onIndexChange={(i) => console.log("now playing", i)}
/>`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultIndex and defaultPlaying and let the player own its state." },
      { name: "Controlled", description: "Pass index and playing with their change handlers to sync with a real audio element." },
    ],
    props: [
      { name: "tracks", type: "MusicTrack[]", default: "3 sample tracks", description: "Tracks with title, artist, duration in seconds, and an artwork color." },
      { name: "index", type: "number", description: "Current track (controlled)." },
      { name: "defaultIndex", type: "number", default: "0", description: "Initial track (uncontrolled)." },
      { name: "onIndexChange", type: "(index: number) => void", description: "Called on previous, next, or when a track ends." },
      { name: "playing", type: "boolean", description: "Playback state (controlled)." },
      { name: "defaultPlaying", type: "boolean", default: "false", description: "Initial playback state (uncontrolled)." },
      { name: "onPlayingChange", type: "(playing: boolean) => void", description: "Called when play/pause is pressed." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "Rendered as a labelled section; previous, play/pause, and next are real buttons with accessible names.",
      "Playback position is a role=progressbar with an aria-valuetext like \"0:42 of 3:07\".",
      "The equalizer and artwork are aria-hidden, and the equalizer stops animating for reduced motion.",
    ],
  },
  "route-map": {
    usage: `import { RouteMap } from "@/components/fmui/route-map";

<RouteMap
  route={{
    points: [[22, 142], [22, 112], [90, 112], [90, 20], [230, 20]],
    label: "To client meeting",
    minutes: 12,
    miles: 2.5,
  }}
  progress={0.4}
/>`,
    variants: [
      { name: "In progress", description: "Any progress below 1 shows a rolling ETA in minutes and the distance left." },
      { name: "Arrived", description: "At progress 1 the ETA reads Arrived and the dot rests on the pin." },
    ],
    props: [
      { name: "route", type: "Route", default: "sample route", description: "Polyline points on a 248 x 160 map, a label, and the trip's minutes and miles." },
      { name: "progress", type: "number", description: "Share of the route travelled, 0 to 1. Update it continuously (GPS, rAF) to move the dot." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The map is role=img with a label stating how much of the route is travelled.",
      "ETA and distance are plain text, with rolling digits mirrored in a visually hidden span.",
      "The whole tile is a section labelled with the route name.",
    ],
  },
  "activity-rings": {
    usage: `import { ActivityRings } from "@/components/fmui/activity-rings";

<ActivityRings
  rings={[
    { label: "Move", value: 95, color: "#3358eb" },
    { label: "Exercise", value: 80, color: "#7b95f3" },
    { label: "Stand", value: 70, color: "#c9d4fb" },
  ]}
/>`,
    variants: [
      { name: "Three rings", description: "The classic move, exercise, and stand trio, outermost first." },
      { name: "Single ring", description: "Pass one ring for a simple goal meter with the same caption." },
    ],
    props: [
      { name: "rings", type: "ActivityRing[]", default: "Move, Exercise, Stand", description: "Rings with a label, a 0-100 value, and a color. The first one is captioned." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The tile is a labelled group; the caption reads the first ring's label and percentage.",
      "Values of the other rings are listed in a visually hidden list.",
      "The SVG is aria-hidden, and the sweep is disabled for reduced motion.",
    ],
  },
  "portfolio-chart": {
    usage: `import { PortfolioChart } from "@/components/fmui/portfolio-chart";

<PortfolioChart
  value={12553.41}
  change={2.9}
  series={[12480, 12512, 12497, 12530, 12601, 12553]}
/>`,
    variants: [
      { name: "Gain", description: "A positive change shows a + prefix in the blue pill." },
      { name: "Loss", description: "A negative change shows a minus sign; the line and fill stay on brand." },
    ],
    props: [
      { name: "value", type: "number", description: "Headline balance; digits roll when it changes." },
      { name: "change", type: "number", description: "Percent change, e.g. 2.9 for +2.9%." },
      { name: "series", type: "number[]", description: "Values oldest first. Same-length updates morph smoothly." },
      { name: "label", type: "string", default: "\"Portfolio\"", description: "Card title." },
      { name: "currency", type: "string", default: "\"USD\"", description: "ISO currency code for the balance." },
      { name: "className", type: "string", description: "Extra classes for the card." },
    ],
    accessibility: [
      "Balance and change are text; rolling digits keep the full value in a visually hidden span.",
      "The chart is role=img labelled with the card title.",
      "The line morph is skipped for users who prefer reduced motion.",
    ],
  },
  "focus-timer": {
    usage: `import { FocusTimer } from "@/components/fmui/focus-timer";

<FocusTimer duration={25 * 60} defaultRemaining={11 * 60 + 9} label="Focus" />`,
    variants: [
      { name: "Uncontrolled", description: "Starts running by default; clicking the ring pauses and resumes it." },
      { name: "Controlled", description: "Pass running and onRunningChange to drive it from your own session state." },
    ],
    props: [
      { name: "duration", type: "number", default: "1500", description: "Full session length in seconds; the arc shows what is left." },
      { name: "defaultRemaining", type: "number", default: "duration", description: "Seconds left when the timer mounts." },
      { name: "running", type: "boolean", description: "Whether the timer counts down (controlled)." },
      { name: "defaultRunning", type: "boolean", default: "true", description: "Initial running state (uncontrolled)." },
      { name: "onRunningChange", type: "(running: boolean) => void", description: "Called when the ring is clicked." },
      { name: "label", type: "string", default: "\"Focus\"", description: "Small label above the time." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The ring is a toggle button named \"Pause focus timer\" with aria-pressed reflecting the paused state.",
      "The time sits in role=timer, so it is not announced every second.",
      "Paused state also dims the arc, so it is not conveyed by motion alone.",
    ],
  },
  "clock-widget": {
    usage: `import { ClockWidget } from "@/components/fmui/clock-widget";

<ClockWidget city="Lisbon" timeZone="Europe/Lisbon" temperature={21} condition="Clear" />`,
    variants: [
      { name: "Live", description: "Without a date prop it follows the real time and re-renders once a minute." },
      { name: "Fixed moment", description: "Pass date to show a specific instant, e.g. for screenshots or replays." },
    ],
    props: [
      { name: "city", type: "string", default: "\"New York\"", description: "City name in the top-left corner." },
      { name: "timeZone", type: "string", default: "\"America/New_York\"", description: "IANA time zone used for time and date." },
      { name: "temperature", type: "number", default: "69", description: "Shown with a degree sign; digits roll on change." },
      { name: "condition", type: "string", default: "\"Sunny\"", description: "Weather condition next to the temperature." },
      { name: "date", type: "Date", description: "Show this moment instead of the live time." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The tile is a section labelled \"Time in <city>\".",
      "Rolling digits keep the full time and temperature in visually hidden text.",
      "The time renders only on the client, avoiding a server/client mismatch; the sun icon is aria-hidden.",
    ],
  },
  "otp-input": {
    usage: `import { OtpInput } from "@/components/fmui/otp-input";

<OtpInput length={6} onComplete={(code) => verify(code)} verifying={isVerifying} />`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultValue and handle the finished code in onComplete." },
      { name: "Controlled", description: "Pass value and onValueChange to clear or prefill the code yourself." },
    ],
    props: [
      { name: "length", type: "number", default: "6", description: "Number of digits in the code." },
      { name: "value", type: "string", description: "Entered digits (controlled)." },
      { name: "defaultValue", type: "string", default: "\"\"", description: "Initial digits (uncontrolled)." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called on every edit with the digits only." },
      { name: "onComplete", type: "(code: string) => void", description: "Called when every digit is filled." },
      { name: "verifying", type: "boolean", default: "false", description: "Shows the spinner while the code is checked." },
      { name: "title", type: "string", default: "\"Verification code\"", description: "Heading of the tile." },
      { name: "description", type: "string", default: "\"Sent to your phone\"", description: "Line under the heading." },
    ],
    accessibility: [
      "One real numeric input with autocomplete=\"one-time-code\", so paste and SMS autofill work.",
      "Arrow keys move between boxes; typing overwrites and Backspace deletes at the cursor.",
      "A status region announces when the code is being verified.",
    ],
  },
  "color-picker": {
    usage: `import { ColorPicker } from "@/components/fmui/color-picker";

<ColorPicker defaultValue="#3358EB" onValueChange={(hex) => setBrand(hex)} />`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultValue and read changes from onValueChange." },
      { name: "Custom presets", description: "Pass your own presets; the slider keeps the current color's saturation and lightness." },
    ],
    props: [
      { name: "value", type: "string", description: "Selected 6-digit hex color (controlled)." },
      { name: "defaultValue", type: "string", default: "\"#3358EB\"", description: "Initial color (uncontrolled)." },
      { name: "onValueChange", type: "(hex: string) => void", description: "Called with an uppercase hex when the color changes." },
      { name: "presets", type: "string[]", default: "5 brand hues", description: "Hex colors shown as quick picks." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The hue track is a slider with arrow, Page Up/Down, Home and End keys and a hex value text.",
      "Presets are buttons labelled with their hex and marked with aria-pressed.",
      "The color glide is skipped when prefers-reduced-motion is set.",
    ],
  },
  "week-picker": {
    usage: `import { WeekPicker } from "@/components/fmui/week-picker";

<WeekPicker month="November" week="Week 46" defaultValue={11} onValueChange={(day) => setDay(day)} />`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultValue with the day number to preselect." },
      { name: "Custom week", description: "Pass days, month and week to show any week of the year." },
    ],
    props: [
      { name: "days", type: "{ label: string; day: number }[]", default: "M-S, 9-15", description: "Weekday letter and date for each column." },
      { name: "value", type: "number", description: "Selected day number (controlled)." },
      { name: "defaultValue", type: "number", default: "days[0].day", description: "Initial day (uncontrolled)." },
      { name: "onValueChange", type: "(day: number) => void", description: "Called when a day is picked." },
      { name: "month", type: "string", default: "\"November\"", description: "Heading on the left." },
      { name: "week", type: "string", default: "\"Week 46\"", description: "Muted label on the right." },
    ],
    accessibility: [
      "A radiogroup of day radios named like \"November 11\".",
      "Roving focus: arrow keys move and select, Home and End jump to the ends.",
      "The pill only fades, without sliding, when prefers-reduced-motion is set.",
    ],
  },
  "vertical-slider": {
    usage: `import { VerticalSlider } from "@/components/fmui/vertical-slider";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon } from "@hugeicons/core-free-icons";

<VerticalSlider
  label="Brightness"
  icon={<HugeiconsIcon icon={Sun03Icon} size={14} strokeWidth={2} />}
  defaultValue={40}
  onValueChange={setBrightness}
/>`,
    variants: [
      { name: "Volume", description: "The default icon and label make a volume control." },
      { name: "Custom icon", description: "Pass any icon and label, e.g. brightness, with your own min, max and step." },
    ],
    props: [
      { name: "value", type: "number", description: "Current level (controlled)." },
      { name: "defaultValue", type: "number", default: "50", description: "Initial level (uncontrolled)." },
      { name: "onValueChange", type: "(value: number) => void", description: "Called while dragging or using keys." },
      { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Range and snapping." },
      { name: "icon", type: "ReactNode", default: "volume icon", description: "Icon at the bottom of the fill." },
      { name: "label", type: "string", default: "\"Volume\"", description: "Accessible name of the slider." },
    ],
    accessibility: [
      "role=\"slider\" with vertical orientation and a percentage value text.",
      "Arrow keys step, Page Up/Down jump ten steps, Home and End go to the ends.",
      "The fill glide is turned off when prefers-reduced-motion is set.",
    ],
  },
  "theme-switch": {
    usage: `import { ThemeSwitch } from "@/components/fmui/theme-switch";

<ThemeSwitch checked={theme === "dark"} onCheckedChange={(dark) => setTheme(dark ? "dark" : "light")} />`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultChecked and react in onCheckedChange." },
      { name: "Controlled", description: "Wire checked to your theme provider; the tile never changes the theme itself." },
    ],
    props: [
      { name: "checked", type: "boolean", description: "Dark mode on (controlled)." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state (uncontrolled)." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when the tile is toggled." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The whole tile is one button with role=\"switch\", aria-checked and the name \"Dark mode\".",
      "Space and Enter toggle it like any switch.",
      "Icon rotation is dropped for prefers-reduced-motion; the crossfade stays.",
    ],
  },
  "billing-toggle": {
    usage: `import { BillingToggle } from "@/components/fmui/billing-toggle";

<BillingToggle monthly={49} yearly={39} savingsLabel="Save 20%" onValueChange={setPeriod} />`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultValue and let the tile own the period." },
      { name: "Controlled", description: "Pass value and onValueChange to share the period with a plan grid." },
    ],
    props: [
      { name: "monthly", type: "number", default: "49", description: "Price per month when billed monthly." },
      { name: "yearly", type: "number", default: "39", description: "Price per month when billed yearly." },
      { name: "value", type: "\"monthly\" | \"yearly\"", description: "Selected period (controlled)." },
      { name: "defaultValue", type: "\"monthly\" | \"yearly\"", default: "\"monthly\"", description: "Initial period (uncontrolled)." },
      { name: "onValueChange", type: "(value: BillingPeriod) => void", description: "Called when the period changes." },
      { name: "savingsLabel", type: "string", default: "\"Save 20%\"", description: "Badge shown while yearly is selected." },
    ],
    accessibility: [
      "The switch is a radiogroup of two radios; arrow keys flip between them.",
      "The price is read from a hidden text value, not the rolling digits.",
      "The badge is hidden from screen readers while monthly is selected.",
    ],
  },
  "toast-stack": {
    usage: `import { ToastStack } from "@/components/fmui/toast-stack";

<ToastStack
  notifications={[
    { id: "2", title: "Stripe", body: "Payment received, $1,200", color: "#6b5cf6" },
    { id: "1", title: "Mail", body: "New lead from your site", color: "#1f9d74", time: "2m" },
  ]}
/>`,
    variants: [
      { name: "Live feed", description: "Prepend to the array; the newest card drops in and the oldest falls away." },
      { name: "Taller stack", description: "Raise max to keep more cards on screen at once." },
    ],
    props: [
      { name: "notifications", type: "StackNotification[]", description: "Newest first: id, title, body, icon color, and optional time." },
      { name: "max", type: "number", default: "3", description: "How many cards are visible." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The stack is a role=log live region, so new notifications are announced politely.",
      "App icons are aria-hidden; the title and body carry the meaning.",
      "Movement is dropped under prefers-reduced-motion; cards still fade in and out.",
    ],
  },
  "upload-card": {
    usage: `import { UploadCard } from "@/components/fmui/upload-card";

<UploadCard fileName="hero-v3.fig" progress={progress} />`,
    variants: [
      { name: "In progress", description: "Feed progress from your upload handler; the bar and percent follow it." },
      { name: "Custom labels", description: "Set uploadingLabel and doneLabel, e.g. \"Syncing\" and \"Synced\"." },
    ],
    props: [
      { name: "fileName", type: "string", description: "File name shown in bold." },
      { name: "progress", type: "number", description: "0 to 100. At 100 the file icon turns into a check." },
      { name: "uploadingLabel", type: "string", default: "\"Uploading\"", description: "Status text while uploading." },
      { name: "doneLabel", type: "string", default: "\"Uploaded\"", description: "Status text when done." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The bar is a role=progressbar with aria-valuenow and a label naming the file.",
      "The percent is read from a hidden text value, not the rolling digits.",
      "The bar and check pop skip motion under prefers-reduced-motion.",
    ],
  },
  "deploy-button": {
    usage: `import { DeployButton } from "@/components/fmui/deploy-button";

<DeployButton onDeploy={() => startDeploy()} />`,
    variants: [
      { name: "Simulated", description: "Leave status and progress unset; a click runs a 2.5 s deploy and goes live." },
      { name: "Controlled", description: "Pass status, progress, and onStatusChange to drive it from a real deploy." },
    ],
    props: [
      { name: "status", type: "\"idle\" | \"deploying\" | \"live\"", description: "Current status (controlled)." },
      { name: "defaultStatus", type: "DeployStatus", default: "\"idle\"", description: "Initial status (uncontrolled)." },
      { name: "onStatusChange", type: "(status: DeployStatus) => void", description: "Called on click and when a simulated deploy finishes." },
      { name: "onDeploy", type: "() => void", description: "Called when the user starts a deploy." },
      { name: "progress", type: "number", description: "0 to 100. Leave unset to simulate progress." },
      { name: "duration", type: "number", default: "2500", description: "Length of the simulated deploy in ms." },
      { name: "labels", type: "{ idle?, deploying?, live? }", description: "Override the three labels." },
    ],
    accessibility: [
      "A native button; it is aria-disabled while deploying and clicking Live resets it.",
      "A visually hidden role=status region announces Deploying and Live once, not every percent.",
      "Width, fill, and blur transitions are dropped under prefers-reduced-motion.",
    ],
  },
  "presence-avatars": {
    usage: `import { PresenceAvatars } from "@/components/fmui/presence-avatars";

<PresenceAvatars
  people={[
    { id: "1", name: "Rae", color: "#3358eb" },
    { id: "2", name: "Ines", color: "#f0714f" },
    { id: "3", name: "Omar", color: "#1f9d74" },
  ]}
/>`,
    variants: [
      { name: "Live roster", description: "Append people as they join and remove them as they leave; the row closes up." },
      { name: "More faces", description: "Raise max to show more avatars before the count takes over." },
    ],
    props: [
      { name: "people", type: "PresencePerson[]", description: "Everyone in the file, in join order: id, name, color." },
      { name: "max", type: "number", default: "4", description: "How many of the latest people get an avatar." },
      { name: "label", type: "string", default: "\"Live in file\"", description: "Heading next to the live dot." },
      { name: "caption", type: "string", default: "\"people editing\"", description: "Text after the count." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "Avatars are a labelled list; each item exposes the full name, not just the initial.",
      "The headcount is read from a hidden text value, not the rolling digits.",
      "The pulsing dot stops and avatars only fade under prefers-reduced-motion.",
    ],
  },
  "streak-tracker": {
    usage: `import { StreakTracker } from "@/components/fmui/streak-tracker";

<StreakTracker days={16} />`,
    variants: [
      { name: "Weekly", description: "The default 7 squares fill day by day and clear when a new week starts." },
      { name: "Custom label", description: "Set label and unit, e.g. \"Reading streak\" and \"nights\"." },
    ],
    props: [
      { name: "days", type: "number", description: "Current streak length." },
      { name: "weekLength", type: "number", default: "7", description: "Squares per row before it resets." },
      { name: "label", type: "string", default: "\"Design streak\"", description: "Caption above the count." },
      { name: "unit", type: "string", default: "\"days\"", description: "Text after the count." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The week row is a single role=img with a label like \"3 of 7 days done this week\".",
      "The count is read from a hidden text value, not the rolling digits.",
      "Squares only fade, without the pop, under prefers-reduced-motion.",
    ],
  },
  "battery-levels": {
    usage: `import { BatteryLevels } from "@/components/fmui/battery-levels";

<BatteryLevels
  devices={[
    { name: "Phone", level: 84, charging: true },
    { name: "Watch", level: 45 },
    { name: "Laptop", level: 69, charging: true },
  ]}
/>`,
    variants: [
      { name: "Charging", description: "Charging devices get a bolt and a blue bar." },
      { name: "On battery", description: "Devices that aren't charging show a neutral bar." },
    ],
    props: [
      { name: "devices", type: "BatteryDevice[]", description: "Each device's name, level (0 to 100), and charging flag." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "Each bar is a role=meter with aria-valuenow and a value text like \"84%, charging\".",
      "Charging is announced in the value text, so the bolt icon stays aria-hidden.",
      "Bars change color without sliding under prefers-reduced-motion.",
    ],
  },
  "kanban-board": {
    usage: `import { KanbanBoard } from "@/components/fmui/kanban-board";

<KanbanBoard
  title="Sprint"
  columns={[
    { id: "todo", title: "To do" },
    { id: "doing", title: "Doing" },
    { id: "done", title: "Done" },
  ]}
  defaultCards={[
    { id: "hero", title: "Hero", column: "doing", accent: true },
    { id: "copy", title: "Copy edits", column: "doing" },
  ]}
  trackedIds={["hero"]}
  onCardsChange={(cards) => save(cards)}
/>`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultCards and let the board own card positions." },
      { name: "Controlled", description: "Pass cards and onCardsChange to sync the board with your store." },
    ],
    props: [
      { name: "columns", type: "KanbanColumn[]", default: "To do / Doing / Done", description: "Columns with an id and title, left to right." },
      { name: "cards", type: "KanbanCard[]", description: "Cards with an id, title, column id, and optional accent dot (controlled)." },
      { name: "defaultCards", type: "KanbanCard[]", description: "Initial cards (uncontrolled)." },
      { name: "onCardsChange", type: "(cards: KanbanCard[]) => void", description: "Called when a card moves; the moved card comes first." },
      { name: "trackedIds", type: "string[]", default: "all cards", description: "Cards counted in the percent, each by how far along the columns it is." },
      { name: "title", type: "string", default: "\"Sprint\"", description: "Heading above the board." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "Each column is a labelled list and every card is focusable with its column in its name.",
      "Left/Right arrows (or [ and ]) move the focused card, and focus follows it to the new column.",
      "The percent is read from hidden text, and lift and glide are skipped with prefers-reduced-motion.",
    ],
  },
  "task-checklist": {
    usage: `import { TaskChecklist } from "@/components/fmui/task-checklist";

<TaskChecklist
  title="Today"
  items={[
    { id: "wireframe", label: "Wireframe the hero" },
    { id: "ship", label: "Ship it" },
  ]}
  defaultValue={["wireframe"]}
  onValueChange={(done) => save(done)}
/>`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultValue and let the list own which items are done." },
      { name: "Controlled", description: "Pass value and onValueChange to sync done items with your API." },
    ],
    props: [
      { name: "items", type: "ChecklistItem[]", description: "Tasks with an id and label." },
      { name: "value", type: "string[]", description: "Ids of the checked items (controlled)." },
      { name: "defaultValue", type: "string[]", default: "[]", description: "Initially checked ids (uncontrolled)." },
      { name: "onValueChange", type: "(value: string[]) => void", description: "Called when an item is checked or unchecked." },
      { name: "title", type: "string", default: "\"Today\"", description: "Heading above the list." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "Every row is a native checkbox inside its label, so clicks, Space, and screen readers just work.",
      "The focus ring is drawn on the whole row with :has(:focus-visible).",
      "The check and strikethrough stop moving with prefers-reduced-motion; the fill still fades.",
    ],
  },
  "chat-thread": {
    usage: `import { ChatThread } from "@/components/fmui/chat-thread";

<ChatThread
  contact={{ name: "Ines", color: "#f0694a", status: "online" }}
  messages={[
    { id: "1", from: "them", text: "ship it tonight?" },
    { id: "2", from: "me", text: "already live" },
  ]}
  typing="them"
/>`,
    variants: [
      { name: "Typing", description: "Set typing to \"me\" or \"them\" to show a dots bubble on that side." },
      { name: "Live feed", description: "Append messages with new ids; the list shifts up and the oldest fade out." },
    ],
    props: [
      { name: "messages", type: "ChatMessage[]", description: "Messages with an id, side (\"me\" | \"them\"), and text, oldest first." },
      { name: "typing", type: "\"me\" | \"them\" | null", default: "null", description: "Who is typing right now." },
      { name: "contact", type: "ChatContact", default: "Ines, online", description: "Name, avatar initial and color, and status line." },
      { name: "className", type: "string", description: "Extra classes for the tile." },
    ],
    accessibility: [
      "The message list is role=log with aria-live=polite, so new messages are announced once.",
      "The typing dots and avatar are aria-hidden decoration.",
      "With prefers-reduced-motion messages fade in without sliding and the dots pulse instead of bouncing.",
    ],
  },
  "quick-search": {
    usage: `import { QuickSearch } from "@/components/fmui/quick-search";

<QuickSearch
  placeholder="Search commands"
  commands={[
    { id: "deploy", label: "Deploy to production", keywords: ["ship", "release"] },
    { id: "invite", label: "Invite teammate" },
  ]}
  onSelect={(command) => run(command.id)}
/>`,
    variants: [
      { name: "Uncontrolled", description: "Pass defaultValue and let the search own its query." },
      { name: "Controlled", description: "Pass value and onValueChange (and activeIndex if needed) to drive it from outside." },
    ],
    props: [
      { name: "commands", type: "SearchCommand[]", description: "Commands with an id, label, and optional extra keywords." },
      { name: "onSelect", type: "(command: SearchCommand) => void", description: "Called on Enter or click." },
      { name: "placeholder", type: "string", default: "\"Search commands\"", description: "Input placeholder and accessible name." },
      { name: "value", type: "string", description: "The query (controlled)." },
      { name: "defaultValue", type: "string", default: "\"\"", description: "Initial query (uncontrolled)." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called as the query changes." },
      { name: "activeIndex", type: "number", description: "Highlighted row within the results (controlled)." },
      { name: "onActiveIndexChange", type: "(index: number) => void", description: "Called when the highlight moves." },
    ],
    accessibility: [
      "The input is a role=combobox that points at a role=listbox via aria-controls and aria-activedescendant.",
      "Up/Down move the highlight with wrap-around, Enter selects, and Escape clears the query.",
      "Focus stays in the input while clicking results, and the sliding highlight is aria-hidden.",
    ],
  },
    "comparison-table": {
      usage: `import { ComparisonTable } from "@/components/fmui/comparison-table";

<ComparisonTable
  highlight="pro"
  plans={[
    { id: "free", name: "Free", price: "$0" },
    { id: "pro", name: "Pro", price: "$12 / mo" },
  ]}
  sections={[
    {
      title: "Collaboration",
      rows: [
        { feature: "Seats", values: { free: 1, pro: 5 } },
        { feature: "Guest access", values: { free: false, pro: true } },
      ],
    },
  ]}
/>`,
      variants: [
        { name: "Highlighted plan", description: "Pass highlight with a plan id to tint its column and add a badge." },
        { name: "Wide plans", description: "With many plans the grid scrolls sideways and the feature column stays pinned." },
      ],
      props: [
        { name: "plans", type: "ComparisonPlan[]", description: "Columns, each with an id, name and optional price line." },
        { name: "sections", type: "ComparisonSection[]", description: "Feature groups; each row maps plan ids to true, false, text or a number." },
        { name: "highlight", type: "string", description: "Plan id whose column is tinted and badged." },
        { name: "badge", type: "string", default: "\"Popular\"", description: "Badge text on the highlighted plan." },
        { name: "caption", type: "string", default: "\"Plan comparison\"", description: "Accessible name of the table and scroll region." },
        { name: "maxHeight", type: "number", default: "320", description: "Height of the scroll area in px; the header row sticks inside it." },
        { name: "className", type: "string", description: "Extra classes for the outer shell." },
      ],
      accessibility: [
        "A real table with a caption, scope=col plan headers, scope=row feature headers and scope=rowgroup section headers.",
        "Checks and dashes carry visually hidden \"Included\" / \"Not included\" text.",
        "The scroll area is a focusable, labelled region, so keyboard users can scroll it with the arrow keys.",
      ],
    },
    "profile-card": {
      usage: `import { ProfileCard } from "@/components/fmui/profile-card";

<ProfileCard
  name="Maya Okafor"
  role="Product Designer"
  handle="@maya"
  status="online"
  stats={[
    { label: "Followers", value: 2481 },
    { label: "Shots", value: 86 },
  ]}
  onFollowingChange={(following) => save(following)}
  onMessage={() => openChat("maya")}
  menu={[
    { id: "copy", label: "Copy profile link" },
    { id: "block", label: "Block", destructive: true },
  ]}
  onMenuAction={(id) => run(id)}
/>`,
      variants: [
        { name: "Initials avatar", description: "Without avatarSrc (or when the image fails) initials render on the color you pass." },
        { name: "Controlled follow", description: "Pass following and onFollowingChange to keep the follow state in your store." },
      ],
      props: [
        { name: "name", type: "string", description: "Full name; also used for initials and accessible labels." },
        { name: "role", type: "string", description: "Job title or role line." },
        { name: "handle", type: "string", description: "Shown after the role, e.g. \"@maya\"." },
        { name: "avatarSrc", type: "string", description: "Avatar image URL." },
        { name: "color", type: "string", default: "\"#3358eb\"", description: "Background of the initials fallback." },
        { name: "status", type: "\"online\" | \"away\" | \"offline\"", description: "Presence dot on the avatar." },
        { name: "stats", type: "{ label: string; value: string | number }[]", default: "[]", description: "Small stats row; numbers are grouped with commas." },
        { name: "following", type: "boolean", description: "Follow state (controlled)." },
        { name: "defaultFollowing", type: "boolean", default: "false", description: "Initial follow state (uncontrolled)." },
        { name: "onFollowingChange", type: "(following: boolean) => void", description: "Called when Follow is toggled." },
        { name: "onMessage", type: "() => void", description: "Called by the Message button." },
        { name: "menu", type: "ProfileMenuAction[]", default: "[]", description: "Items in the more menu; the button is hidden when empty." },
        { name: "onMenuAction", type: "(id: string) => void", description: "Called with the chosen menu item id." },
      ],
      accessibility: [
        "Follow is a toggle button with aria-pressed and a stable name (\"Follow Maya Okafor\") while its label crossfades.",
        "The more menu is a Radix DropdownMenu: arrow keys, typeahead, Escape and focus return all work.",
        "Stats are a description list and the presence dot is labelled with its status.",
      ],
    },
    "file-card": {
      usage: `import { FileCard } from "@/components/fmui/file-card";

<FileCard
  name="Q3 board update.pdf"
  size={4_832_112}
  modified="Edited 2h ago"
  url="https://files.example.com/q3.pdf"
  onDownload={() => download(file)}
  onRename={() => startRename(file)}
  onDelete={() => remove(file)}
/>`,
      variants: [
        { name: "Type tint", description: "The extension picks the icon color: pdf, fig, zip, mp4, png, docx, csv and more; others fall back to grey." },
        { name: "Long names", description: "The base name truncates while the extension stays visible." },
      ],
      props: [
        { name: "name", type: "string", description: "File name including the extension." },
        { name: "size", type: "number", description: "Size in bytes, shown as B / KB / MB / GB." },
        { name: "modified", type: "string", description: "Preformatted time, e.g. \"Edited 2h ago\"." },
        { name: "url", type: "string", description: "Written to the clipboard by Copy link." },
        { name: "onCopyLink", type: "() => void", description: "Called after Copy link; the item shows a copied state before the menu closes." },
        { name: "onDownload", type: "() => void", description: "Called by Download." },
        { name: "onRename", type: "() => void", description: "Called by Rename." },
        { name: "onDelete", type: "() => void", description: "Called by Delete, shown in the danger color." },
      ],
      accessibility: [
        "The share button is labelled with the file name, e.g. \"Share Q3 board update.pdf\".",
        "The menu is a Radix DropdownMenu with arrow keys, typeahead and Escape.",
        "A status region announces \"Link copied\" when the link lands on the clipboard.",
      ],
    },
    "citation-card": {
      usage: `import { Citation, CitationList } from "@/components/fmui/citation-card";

const sources = [
  { title: "Interaction to Next Paint (INP)", url: "https://web.dev/articles/inp", snippet: "INP observes..." },
];

<p>
  Keep interactions under 200 ms<Citation source={sources[0]} index={1} />.
</p>
<CitationList sources={sources} />`,
      variants: [
        { name: "Inline chip", description: "Citation renders a numbered chip that previews the source on hover or focus." },
        { name: "Reference list", description: "CitationList renders the numbered sources under an answer, in the same order." },
      ],
      props: [
        { name: "source", type: "CitationSource", description: "Title, url, and optional site, snippet and favicon." },
        { name: "index", type: "number", description: "1-based number shown in the chip and the preview." },
        { name: "sources", type: "CitationSource[]", description: "CitationList: sources in reference order." },
        { name: "source.site", type: "string", default: "URL hostname", description: "Site name in the preview and list." },
        { name: "source.favicon", type: "string", description: "Favicon URL; the site's first letter is shown without it." },
        { name: "className", type: "string", description: "Extra classes for the chip or the list." },
      ],
      accessibility: [
        "Each chip is a real link named \"Source 1: title, site\", so Enter opens the source.",
        "The preview opens on keyboard focus as well as hover and closes on blur or Escape.",
        "The reference list is an ordered list labelled \"Sources\"; its numbers are decorative duplicates of the order.",
      ],
    },
    "suggestion-chips": {
      usage: `import { SuggestionChips } from "@/components/fmui/suggestion-chips";
import { SparklesIcon } from "@hugeicons/core-free-icons";

<SuggestionChips
  suggestions={[
    { id: "fix", label: "How do I fix it?", icon: SparklesIcon },
    { id: "compare", label: "Compare to last week" },
  ]}
  onSelect={(s) => send(s.label)}
  dismissible
/>`,
      variants: [
        { name: "New sets", description: "Passing suggestions with new ids remounts the row, so each set staggers in again." },
        { name: "Dismissible", description: "dismissible adds a close chip; control open to bring the set back." },
      ],
      props: [
        { name: "suggestions", type: "Suggestion[]", description: "Chips with an id, label and optional Hugeicons icon." },
        { name: "onSelect", type: "(suggestion: Suggestion) => void", description: "Called when a chip is picked; it stays highlighted and the others dim." },
        { name: "open", type: "boolean", description: "Whether the chips are shown (controlled)." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial visibility (uncontrolled)." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the dismiss chip is pressed." },
        { name: "dismissible", type: "boolean", default: "false", description: "Shows a dismiss chip at the end of the row." },
        { name: "label", type: "string", default: "\"Suggested follow-ups\"", description: "Accessible name of the toolbar." },
      ],
      accessibility: [
        "Rendered as role=toolbar with one tab stop; arrow keys, Home and End move focus between chips.",
        "Hidden chips are inert, so they leave the tab order and the accessibility tree.",
        "The stagger only delays opacity and position; press feedback is instant and reduced motion drops the movement.",
      ],
    },
    "token-counter": {
      usage: `import { TokenCounter } from "@/components/fmui/token-counter";

<textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
<TokenCounter text={prompt} limit={8000} />`,
      variants: [
        { name: "Estimated", description: "Pass text and the count is estimated at about 4 characters per token." },
        { name: "Exact count", description: "Pass count from your tokenizer or API usage; combine it with estimateTokens for history plus draft." },
      ],
      props: [
        { name: "text", type: "string", default: "\"\"", description: "Text to estimate. Ignored when count is set." },
        { name: "count", type: "number", description: "Exact token count, overrides the estimate." },
        { name: "limit", type: "number", description: "Context window size in tokens." },
        { name: "warnAt", type: "number", default: "0.8", description: "Fraction of the limit where the bar turns amber; past 1 it turns red." },
        { name: "label", type: "string", default: "\"Context\"", description: "Heading and accessible name prefix." },
        { name: "className", type: "string", description: "Extra classes for the tile." },
      ],
      accessibility: [
        "The bar is role=meter with aria-valuetext like \"1,240 of 8,000 tokens\".",
        "A status region announces only threshold crossings, not every keystroke.",
        "Over the limit is spelled out in text (\"240 tokens over\"), not only shown in red.",
      ],
    },
    "tag-input": {
      usage: `import { TagInput } from "@/components/fmui/tag-input";

<TagInput label="Skills" max={6} defaultValue={["Design", "React"]} onValueChange={setSkills} />`,
      variants: [
        { name: "Uncontrolled", description: "Pass defaultValue and read the list from onValueChange." },
        { name: "With a limit", description: "Pass max to cap the number of tags and show a count under the field." },
      ],
      props: [
        { name: "value", type: "string[]", description: "Current tags (controlled)." },
        { name: "defaultValue", type: "string[]", default: "[]", description: "Initial tags (uncontrolled)." },
        { name: "onValueChange", type: "(tags: string[]) => void", description: "Called when a tag is added or removed." },
        { name: "max", type: "number", description: "Most tags allowed. Unlimited when omitted." },
        { name: "label", type: "string", default: "\"Tags\"", description: "Visible label for the field." },
        { name: "placeholder", type: "string", default: "\"Add a tag\"", description: "Placeholder of the text input." },
        { name: "className", type: "string", description: "Extra classes for the wrapper." },
      ],
      accessibility: [
        "A real labelled text input: Enter, comma and Tab add a tag, and pasted lists are split on commas and new lines.",
        "Backspace on an empty field selects the last tag, a second Backspace removes it; every tag has a labelled remove button.",
        "A status region announces added, removed and duplicate tags; duplicates also shake the existing tag.",
      ],
    },
    "date-range-picker": {
      usage: `import { DateRangePicker, type DateRange } from "@/components/fmui/date-range-picker";

const [range, setRange] = useState<DateRange>({});

<DateRangePicker label="Trip dates" min={new Date()} value={range} onValueChange={setRange} />`,
      variants: [
        { name: "Uncontrolled", description: "Pass defaultValue with from and to dates and read changes from onValueChange." },
        { name: "Bounded", description: "Pass min and max to disable days outside a booking window." },
      ],
      props: [
        { name: "value", type: "{ from?: Date; to?: Date }", description: "Selected range (controlled)." },
        { name: "defaultValue", type: "{ from?: Date; to?: Date }", default: "{}", description: "Initial range (uncontrolled)." },
        { name: "onValueChange", type: "(range: DateRange) => void", description: "Called on each click; to is undefined until the end day is picked." },
        { name: "min", type: "Date", description: "Earliest selectable day." },
        { name: "max", type: "Date", description: "Latest selectable day." },
        { name: "label", type: "string", default: "\"Dates\"", description: "Visible label above the trigger." },
        { name: "placeholder", type: "string", default: "\"Pick a date range\"", description: "Trigger text when nothing is selected." },
      ],
      accessibility: [
        "Each month is a role=grid with weekday column headers; days are buttons with the full date as their name.",
        "Arrow keys move by day and week, Home and End to the week edges, Page Up and Page Down by month; Enter or Space picks.",
        "Focus moves into the calendar on open and back to the trigger on close; a live line says which date to pick next.",
      ],
    },
    "file-dropzone": {
      usage: `import { FileDropzone } from "@/components/fmui/file-dropzone";

<FileDropzone
  accept="image/*,.pdf"
  maxSize={5 * 1024 ** 2}
  value={files}
  onValueChange={setFiles}
  onFilesAdded={(added) => added.forEach(upload)}
/>`,
      variants: [
        { name: "Real uploads", description: "Control value and update each file's progress as your upload reports it." },
        { name: "Simulated", description: "Pass simulate to fake progress for prototypes and demos." },
      ],
      props: [
        { name: "value", type: "DropzoneFile[]", description: "Files with an id, the File, and optional progress (controlled)." },
        { name: "defaultValue", type: "DropzoneFile[]", default: "[]", description: "Initial files (uncontrolled)." },
        { name: "onValueChange", type: "(files: DropzoneFile[]) => void", description: "Called when files are added, removed or progress." },
        { name: "onFilesAdded", type: "(files: DropzoneFile[]) => void", description: "Called with the new valid files, the place to start uploads." },
        { name: "accept", type: "string", description: "Allowed types, same syntax as the input accept attribute." },
        { name: "maxSize", type: "number", description: "Largest allowed file in bytes." },
        { name: "simulate", type: "boolean", default: "false", description: "Fakes upload progress for demos." },
        { name: "hint", type: "string", description: "Line under the call to action, e.g. \"PNG or PDF up to 5 MB\"." },
      ],
      accessibility: [
        "The drop area is a real button that opens the file browser, so it works without drag and drop.",
        "Rejected files are listed in a role=alert region with the reason (type or size).",
        "Each upload has a labelled progressbar and a labelled remove button.",
      ],
    },
    "password-strength": {
      usage: `import { PasswordStrength } from "@/components/fmui/password-strength";

<PasswordStrength name="password" onValueChange={setPassword} />`,
      variants: [
        { name: "Uncontrolled", description: "Use it in a form with name and let the field own its value." },
        { name: "Controlled", description: "Pass value and onValueChange; scorePassword is exported to gate submit." },
      ],
      props: [
        { name: "value", type: "string", description: "Password (controlled)." },
        { name: "defaultValue", type: "string", default: "\"\"", description: "Initial password (uncontrolled)." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called on every edit." },
        { name: "label", type: "string", default: "\"Password\"", description: "Visible label for the field." },
        { name: "placeholder", type: "string", default: "\"Create a password\"", description: "Placeholder of the input." },
        { name: "name", type: "string", description: "Form field name." },
        { name: "className", type: "string", description: "Extra classes for the wrapper." },
      ],
      accessibility: [
        "The input is described by the strength label and the requirement list via aria-describedby.",
        "Each requirement says \"Met\" or \"Not met\" to screen readers, not only through the check icon.",
        "The show/hide button is labelled with its action and controls the input.",
      ],
    },
    "range-slider": {
      usage: `import { RangeSlider } from "@/components/fmui/range-slider";

<RangeSlider
  label="Price"
  max={1000}
  step={10}
  defaultValue={[120, 480]}
  formatValue={(n) => \`$\${n}\`}
  onValueChange={([low, high]) => setFilter({ low, high })}
/>`,
      variants: [
        { name: "Uncontrolled", description: "Pass defaultValue and read the pair from onValueChange." },
        { name: "Formatted", description: "Pass formatValue to show currency or units in the tooltips and header." },
      ],
      props: [
        { name: "value", type: "[number, number]", description: "Selected low and high values (controlled)." },
        { name: "defaultValue", type: "[number, number]", default: "[25, 75]", description: "Initial pair (uncontrolled)." },
        { name: "onValueChange", type: "(value: [number, number]) => void", description: "Called as either thumb moves." },
        { name: "min", type: "number", default: "0", description: "Lowest value." },
        { name: "max", type: "number", default: "100", description: "Highest value." },
        { name: "step", type: "number", default: "1", description: "Values snap to multiples of this from min." },
        { name: "formatValue", type: "(value: number) => string", default: "String", description: "Formats tooltips, header and aria-valuetext." },
        { name: "label", type: "string", default: "\"Range\"", description: "Visible group label; thumbs are named \"<label> minimum/maximum\"." },
      ],
      accessibility: [
        "Each thumb is a role=slider whose aria-valuemin/max are bounded by the other thumb, so they never cross.",
        "Arrow keys step, Page Up and Page Down move ten steps, Home and End jump to the ends.",
        "aria-valuetext uses formatValue, so screen readers hear \"$120\" rather than 120.",
      ],
    },
    "rating-input": {
      usage: `import { RatingInput } from "@/components/fmui/rating-input";

<RatingInput label="Your rating" defaultValue={3.5} onValueChange={setRating} />`,
      variants: [
        { name: "Half steps", description: "Default: the left half of each star picks a .5 rating." },
        { name: "Read only", description: "Pass readOnly to display an average without letting it change." },
      ],
      props: [
        { name: "value", type: "number", description: "Rating, 0 for none (controlled)." },
        { name: "defaultValue", type: "number", default: "0", description: "Initial rating (uncontrolled)." },
        { name: "onValueChange", type: "(value: number) => void", description: "Called when the rating is picked or cleared." },
        { name: "max", type: "number", default: "5", description: "Number of stars." },
        { name: "allowHalf", type: "boolean", default: "true", description: "Allow .5 ratings; arrow keys step by 0.5 instead of 1." },
        { name: "readOnly", type: "boolean", default: "false", description: "Render as a static image of the rating." },
        { name: "label", type: "string", default: "\"Rating\"", description: "Visible label and group name." },
      ],
      accessibility: [
        "A role=radiogroup with one radio per step (\"3.5 stars\") and a roving tabindex on the checked one.",
        "Arrow keys change the rating, Home and End jump to the ends, and Space or Enter on the checked value clears it.",
        "Read-only ratings render as role=img with a label like \"Average: 4.5 out of 5\".",
      ],
    },
    "hold-to-confirm": {
      usage: `import { HoldToConfirm } from "@/components/fmui/hold-to-confirm";

<HoldToConfirm
  label="Hold to delete"
  confirmedLabel="Deleted"
  onConfirm={() => deleteProject(id)}
/>`,
      variants: [
        { name: "Default", description: "A 1.5 s hold for everyday destructive actions like deleting a file." },
        { name: "Long hold", description: "Raise holdDuration (e.g. 3000) for actions that are hard to recover from." },
      ],
      props: [
        { name: "onConfirm", type: "() => void", description: "Fires once the press is held for the full duration." },
        { name: "label", type: "string", default: "\"Hold to delete\"", description: "Button text; it should tell the user to hold." },
        { name: "confirmedLabel", type: "string", default: "\"Deleted\"", description: "Shown briefly after the action fires." },
        { name: "holdDuration", type: "number", default: "1500", description: "How long the press must be held, in milliseconds." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
        { name: "className", type: "string", description: "Extra classes for the button." },
      ],
      accessibility: [
        "A real button: holding Space or Enter works like holding the pointer, and releasing or blurring cancels.",
        "aria-describedby points to a \"Press and hold to confirm\" hint so the gesture is announced.",
        "A polite role=status region announces the confirmed label when the action fires.",
      ],
    },
    "skeleton-loader": {
      usage: `import { Skeleton, SkeletonLoader } from "@/components/fmui/skeleton-loader";

<SkeletonLoader
  loading={isLoading}
  skeleton={
    <div className="flex items-center gap-3">
      <Skeleton shape="circle" />
      <Skeleton className="w-32" />
    </div>
  }
>
  <Profile user={user} />
</SkeletonLoader>`,
      variants: [
        { name: "Composed", description: "Build a content-shaped placeholder from line, circle, and rect Skeletons." },
        { name: "Crossfade", description: "Wrap it in SkeletonLoader to fade and unblur the real content in without a layout shift." },
      ],
      props: [
        { name: "loading", type: "boolean", description: "SkeletonLoader: shows the skeleton while true, the content when false." },
        { name: "skeleton", type: "ReactNode", description: "SkeletonLoader: the placeholder, shaped like the content." },
        { name: "children", type: "ReactNode", description: "SkeletonLoader: the real content." },
        { name: "label", type: "string", default: "\"Loading\"", description: "SkeletonLoader: text read to screen readers while loading." },
        { name: "shape", type: "\"line\" | \"circle\" | \"rect\"", default: "\"line\"", description: "Skeleton: base shape; size it with className." },
        { name: "className", type: "string", description: "Extra classes for either component." },
      ],
      accessibility: [
        "The region sets aria-busy while loading and exposes a visually hidden loading label.",
        "Skeleton blocks are aria-hidden, and the content layer is inert until it has loaded.",
        "The shimmer sweep is removed for prefers-reduced-motion; the crossfade stays as a gentle fade.",
      ],
    },
    "text-reveal": {
      usage: `import { TextReveal } from "@/components/fmui/text-reveal";

<TextReveal text="Interfaces that feel right, down to every word." />

<TextReveal mode="scroll" as="p" text="Every detail compounds." />`,
      variants: [
        { name: "On view", description: "Words fade, unblur, and rise in with a stagger the first time the text scrolls into view." },
        { name: "Scroll-linked", description: "mode=\"scroll\": words brighten from muted to full as the text moves through the viewport." },
      ],
      props: [
        { name: "text", type: "string", description: "The headline; split into words on whitespace." },
        { name: "mode", type: "\"inView\" | \"scroll\"", default: "\"inView\"", description: "One-shot reveal on view, or scroll-linked progress." },
        { name: "as", type: "\"h1\" | \"h2\" | \"h3\" | \"p\"", default: "\"h2\"", description: "Element to render." },
        { name: "scrollContainer", type: "RefObject<HTMLElement | null>", description: "Scroll mode: the scrolling element when it is not the page (needs position: relative)." },
        { name: "className", type: "string", description: "Extra classes for the text element." },
      ],
      accessibility: [
        "Screen readers get the full text once from a visually hidden copy; the animated words are aria-hidden.",
        "The heading element keeps its semantics, so it still appears in the document outline.",
        "With prefers-reduced-motion the blur and rise are dropped and words only fade in.",
      ],
    },
    "magnetic-button": {
      usage: `import { MagneticButton } from "@/components/fmui/magnetic-button";

<MagneticButton onClick={() => router.push("/signup")}>
  Get started
</MagneticButton>`,
      variants: [
        { name: "Primary", description: "The default pill with a label that drifts a little further than the button for depth." },
        { name: "Icon", description: "Pass aria-label, an icon child, and a higher strength for a round icon button." },
      ],
      props: [
        { name: "strength", type: "number", default: "0.35", description: "How far the button follows the cursor, as a fraction of its offset from center." },
        { name: "children", type: "ReactNode", description: "Button content; it moves slightly more than the button." },
        { name: "className", type: "string", description: "Extra classes for the button." },
        { name: "...props", type: "ButtonHTMLAttributes", description: "Any native button prop, e.g. onClick, disabled, type." },
      ],
      accessibility: [
        "A native button, so focus, Enter/Space activation, and disabled all behave normally.",
        "The pull only runs for hover-capable fine pointers; touch and keyboard users get a static button.",
        "No movement at all when prefers-reduced-motion is set.",
      ],
    },
    "status-pulse": {
      usage: `import { StatusPulse } from "@/components/fmui/status-pulse";

<StatusPulse status="online" label="Operational" />

<StatusPulse status="live" label="Live" size="sm" />`,
      variants: [
        { name: "Active", description: "online, live, and syncing pulse a soft halo to show something is happening now." },
        { name: "Idle", description: "away and offline render a still dot." },
      ],
      props: [
        { name: "status", type: "\"online\" | \"live\" | \"syncing\" | \"away\" | \"offline\"", description: "Sets the color and whether the halo pulses." },
        { name: "label", type: "string", description: "Visible text next to the dot." },
        { name: "size", type: "\"sm\" | \"md\"", default: "\"md\"", description: "Dot and label size." },
        { name: "className", type: "string", description: "Extra classes for the wrapper." },
      ],
      accessibility: [
        "Rendered as role=status, so changes to the status are announced politely.",
        "Screen readers always hear the status name (\"Away: Maya Lin\"), never just a color.",
        "With prefers-reduced-motion the pulse becomes a static ring.",
      ],
    },
    "breadcrumb-trail": {
      usage: `import { BreadcrumbTrail } from "@/components/fmui/breadcrumb-trail";
import { Home01Icon } from "@hugeicons/core-free-icons";

<BreadcrumbTrail
  items={[
    { id: "home", label: "Acme Inc.", href: "/", icon: Home01Icon },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "website", label: "Website redesign", href: "/projects/website" },
    { id: "design", label: "Design", href: "/projects/website/design" },
    { id: "assets", label: "Assets" },
  ]}
  maxItems={4}
/>`,
      variants: [
        { name: "Links", description: "Give items an href to render real links that navigate natively." },
        { name: "Client routing", description: "Leave out href and handle onNavigate to drive router state or a file browser." },
      ],
      props: [
        { name: "items", type: "BreadcrumbItem[]", description: "Path from the root to the current page, each with an id, label, and optional href and icon." },
        { name: "maxItems", type: "number", default: "4", description: "Most crumbs shown, counting the overflow menu. Beyond this the middle collapses. Minimum 3." },
        { name: "onNavigate", type: "(item: BreadcrumbItem) => void", description: "Called when a crumb or an overflow menu entry is chosen." },
        { name: "className", type: "string", description: "Extra classes for the nav element." },
      ],
      accessibility: [
        "Rendered as nav aria-label=\"Breadcrumb\" with an ordered list; the last crumb carries aria-current=\"page\".",
        "Separators are aria-hidden presentation items, so screen readers only hear the crumbs.",
        "The overflow button names how many levels it hides and opens a Radix menu with full arrow-key, Enter, and Escape support.",
      ],
    },
    "sidebar-nav": {
      usage: `import { SidebarNav } from "@/components/fmui/sidebar-nav";
import { Folder01Icon, Mail01Icon } from "@hugeicons/core-free-icons";

<SidebarNav
  groups={[
    {
      id: "workspace",
      label: "Workspace",
      items: [
        { id: "inbox", label: "Inbox", icon: Mail01Icon, badge: 4 },
        {
          id: "projects",
          label: "Projects",
          icon: Folder01Icon,
          items: [{ id: "website", label: "Website redesign" }],
        },
      ],
    },
  ]}
  value={page}
  onValueChange={setPage}
/>`,
      variants: [
        { name: "Expanded", description: "Full width with group headings, labels, badges, and nested sections." },
        { name: "Icons only", description: "Toggle collapsed (or pass defaultCollapsed) to shrink to icons with tooltips." },
      ],
      props: [
        { name: "groups", type: "SidebarNavGroup[]", description: "Headed groups of items. Items take an icon, badge, href, and one level of sub-items." },
        { name: "value", type: "string", description: "Active item id (controlled)." },
        { name: "defaultValue", type: "string", description: "Initial active item (uncontrolled). Its section starts open." },
        { name: "onValueChange", type: "(id: string) => void", description: "Called when an item is chosen." },
        { name: "collapsed", type: "boolean", description: "Icons-only mode (controlled)." },
        { name: "defaultCollapsed", type: "boolean", default: "false", description: "Initial icons-only mode (uncontrolled)." },
        { name: "onCollapsedChange", type: "(collapsed: boolean) => void", description: "Called when the collapse toggle is pressed." },
      ],
      accessibility: [
        "The active item has aria-current=\"page\"; nested sections are disclosure buttons with aria-expanded and aria-controls, and closed sections are inert.",
        "In icons-only mode labels stay in the accessible name and Radix tooltips show them on hover and focus.",
        "The active indicator slides on pointer clicks but moves instantly for keyboard activation and reduced motion.",
      ],
    },
    "bento-grid": {
      usage: `import { BentoGrid, BentoTile } from "@/components/fmui/bento-grid";
import { Analytics01Icon, Search01Icon } from "@hugeicons/core-free-icons";

<BentoGrid columns={3}>
  <BentoTile colSpan={2} icon={Search01Icon} title="Instant search" description="Find any record as you type." visual={<SearchArt />} />
  <BentoTile rowSpan={2} icon={Analytics01Icon} title="Analytics" description="Weekly trends at a glance." visual={<ChartArt />} />
  <BentoTile title="Shortcuts" description="Every action, one key away." />
</BentoGrid>`,
      variants: [
        { name: "Mixed spans", description: "Combine colSpan and rowSpan to build an asymmetric feature section." },
        { name: "Text only", description: "Leave out visual for compact tiles whose copy sits at the bottom." },
      ],
      props: [
        { name: "columns", type: "2 | 3 | 4", default: "3", description: "BentoGrid: columns once its container is at least 512px wide; narrower containers stack tiles." },
        { name: "colSpan", type: "1 | 2 | 3 | 4", default: "1", description: "BentoTile: columns spanned in the multi-column layout." },
        { name: "rowSpan", type: "1 | 2", default: "1", description: "BentoTile: rows spanned in the multi-column layout." },
        { name: "title", type: "string", description: "BentoTile: feature name." },
        { name: "description", type: "string", description: "BentoTile: one-line supporting copy." },
        { name: "icon", type: "IconSvgElement", description: "BentoTile: Hugeicons icon shown beside the title." },
        { name: "visual", type: "ReactNode", description: "BentoTile: artwork filling the space above the text." },
      ],
      accessibility: [
        "The grid is a list and each tile a list item, so screen readers announce how many features there are.",
        "Tile visuals are aria-hidden; the title (an h3) and description carry the content.",
        "The hover lift only runs on devices that can hover and is removed for reduced motion.",
      ],
    },
    "section-nav": {
      usage: `import { SectionNav } from "@/components/fmui/section-nav";

const scrollRef = useRef<HTMLDivElement>(null);

<div ref={scrollRef} className="h-96 overflow-y-auto">
  <div className="flex gap-6">
    <SectionNav
      root={scrollRef}
      sections={[
        { id: "overview", label: "Overview" },
        { id: "triggers", label: "Triggers" },
      ]}
    />
    <article>
      <section id="overview">...</section>
      <section id="triggers">...</section>
    </article>
  </div>
</div>`,
      variants: [
        { name: "Page", description: "Leave out root to track sections against the viewport, like a docs table of contents." },
        { name: "Scroll container", description: "Pass a ref to a scrolling element; only that element scrolls on click." },
      ],
      props: [
        { name: "sections", type: "SectionNavSection[]", description: "Section element ids and their link labels, in page order." },
        { name: "root", type: "RefObject<HTMLElement | null>", default: "viewport", description: "Scroll container that holds the sections." },
        { name: "label", type: "string", default: "\"On this page\"", description: "Heading above the links and the nav's accessible name." },
        { name: "className", type: "string", description: "Extra classes, e.g. a top-* offset for the sticky position." },
      ],
      accessibility: [
        "The link for the section in view carries aria-current=\"location\".",
        "Clicking a link scrolls its section into view and moves focus to it, so keyboard and screen reader users land there too.",
        "Scrolling is smooth only without prefers-reduced-motion; the indicator stops animating as well.",
      ],
    },
    "mega-menu": {
      usage: `import { MegaMenu } from "@/components/fmui/mega-menu";
import { Analytics01Icon, CodeIcon } from "@hugeicons/core-free-icons";

<MegaMenu
  panels={[
    {
      id: "product",
      label: "Product",
      groups: [
        { label: "Platform", links: [{ id: "analytics", title: "Analytics", description: "Dashboards that update live.", icon: Analytics01Icon, href: "/analytics" }] },
        { label: "Developers", links: [{ id: "api", title: "API reference", description: "REST and GraphQL endpoints.", icon: CodeIcon, href: "/docs/api" }] },
      ],
    },
    { id: "pricing", label: "Pricing", href: "/pricing" },
  ]}
/>`,
      variants: [
        { name: "Grouped panel", description: "Panels with groups open a wide menu with a preview column that follows hover and focus." },
        { name: "Plain link", description: "A panel without groups renders as a simple top-level link." },
      ],
      props: [
        { name: "panels", type: "MegaMenuPanel[]", description: "Top-level entries: a label plus grouped links, or an href for a plain link." },
        { name: "onNavigate", type: "(item: MegaMenuLink | MegaMenuPanel) => void", description: "Called when a link or plain top-level entry is chosen." },
        { name: "className", type: "string", description: "Extra classes for the root nav." },
      ],
      accessibility: [
        "Built on Radix NavigationMenu: triggers expose aria-expanded and Tab, arrow keys, and Escape move through and close panels.",
        "Each link group is a list labelled by its heading; the preview column repeats link text, so it is aria-hidden.",
        "Moving focus with the keyboard swaps the preview instantly; only pointer hover crossfades it.",
      ],
    },
};
