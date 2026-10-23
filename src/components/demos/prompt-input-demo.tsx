"use client";

import { useEffect, useRef, useState } from "react";
import { PromptInput } from "@/registry/components/prompt-input/prompt-input";

export default function PromptInputDemo() {
  const [generating, setGenerating] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className="w-full max-w-xl">
      <PromptInput
        generating={generating}
        onSubmit={(prompt, files) => {
          setLast(files.length ? `${prompt} (+${files.length} file${files.length > 1 ? "s" : ""})` : prompt);
          setGenerating(true);
          timer.current = window.setTimeout(() => setGenerating(false), 2500);
        }}
        onStop={() => {
          window.clearTimeout(timer.current);
          setGenerating(false);
        }}
      />
      <p className="mt-3 text-center text-xs text-muted-foreground" aria-live="polite">
        {generating ? "Generating... press stop to cancel" : last ? `Sent: ${last}` : "Type a prompt and press Enter"}
      </p>
    </div>
  );
}
