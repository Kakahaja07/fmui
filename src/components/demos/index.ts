import type { ComponentType } from "react";

/**
 * Map of previewId to a lazy demo module. Every entry corresponds to a real
 * registry component under src/registry/components.
 */
export const demoRegistry: Record<string, () => Promise<{ default: ComponentType }>> = {
  "expandable-tabs": () => import("./expandable-tabs-demo"),
  "animated-segmented-control": () => import("./animated-segmented-control-demo"),
  "command-menu": () => import("./command-menu-demo"),
  "multi-select": () => import("./multi-select-demo"),
  "smart-dropdown": () => import("./smart-dropdown-demo"),
  "floating-toolbar": () => import("./floating-toolbar-demo"),
  "context-menu": () => import("./context-menu-demo"),
  "resizable-panels": () => import("./resizable-panels-demo"),
  "spotlight-search": () => import("./spotlight-search-demo"),
  stepper: () => import("./stepper-demo"),
  "metric-card": () => import("./metric-card-demo"),
  "sparkline-card": () => import("./sparkline-card-demo"),
  "activity-feed": () => import("./activity-feed-demo"),
  timeline: () => import("./timeline-demo"),
  "pricing-card": () => import("./pricing-card-demo"),
  "progress-ring": () => import("./progress-ring-demo"),
  "ai-chat-bubble": () => import("./ai-chat-bubble-demo"),
  "prompt-input": () => import("./prompt-input-demo"),
  "streaming-text": () => import("./streaming-text-demo"),
  "model-selector": () => import("./model-selector-demo"),
  "ai-thinking-indicator": () => import("./ai-thinking-indicator-demo"),
  "animated-counter": () => import("./animated-counter-demo"),
  "morphing-dialog": () => import("./morphing-dialog-demo"),
  "floating-dock": () => import("./floating-dock-demo"),
};

/**
 * Natural layout width of each demo when shown in a card. Cards scale the demo
 * down to fit; "start" pins it to the top so dropdowns that open downward stay visible.
 */
export const demoLayout: Record<string, { width: number; align?: "center" | "start" }> = {
  "expandable-tabs": { width: 340 },
  "animated-segmented-control": { width: 300 },
  "command-menu": { width: 280 },
  "multi-select": { width: 360, align: "start" },
  "smart-dropdown": { width: 280, align: "start" },
  "floating-toolbar": { width: 460 },
  "context-menu": { width: 380 },
  "resizable-panels": { width: 520 },
  "spotlight-search": { width: 460, align: "start" },
  stepper: { width: 480 },
  "metric-card": { width: 340 },
  "sparkline-card": { width: 300 },
  "activity-feed": { width: 420 },
  timeline: { width: 400 },
  "pricing-card": { width: 640 },
  "progress-ring": { width: 280 },
  "ai-chat-bubble": { width: 420 },
  "prompt-input": { width: 400 },
  "streaming-text": { width: 400 },
  "model-selector": { width: 300, align: "start" },
  "ai-thinking-indicator": { width: 360 },
  "animated-counter": { width: 300 },
  "morphing-dialog": { width: 280 },
  "floating-dock": { width: 360 },
};

export function hasDemo(previewId?: string): previewId is string {
  return !!previewId && previewId in demoRegistry;
}
