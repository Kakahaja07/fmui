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
};
