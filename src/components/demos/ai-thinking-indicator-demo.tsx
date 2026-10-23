"use client";

import { AIThinkingIndicator } from "@/registry/components/ai-thinking-indicator/ai-thinking-indicator";

export default function AIThinkingIndicatorDemo() {
  return (
    <AIThinkingIndicator
      steps={[
        { label: "Reading the question", duration: 1200 },
        { label: "Searching the documentation", duration: 1600 },
        { label: "Comparing three approaches", duration: 1800 },
        { label: "Writing the answer", duration: 1400 },
      ]}
    />
  );
}
