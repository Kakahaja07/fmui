"use client";

import { useState } from "react";
import { ModelSelector } from "@/registry/components/model-selector/model-selector";

const models = [
  { id: "atlas-large", name: "Atlas Large", provider: "Atlas Labs", description: "Best quality for long reasoning.", capabilities: ["reasoning", "vision", "128k"] },
  { id: "atlas-mini", name: "Atlas Mini", provider: "Atlas Labs", description: "Fast and inexpensive.", capabilities: ["fast", "32k"] },
  { id: "nimbus-pro", name: "Nimbus Pro", provider: "Nimbus", description: "Balanced general model.", capabilities: ["vision", "tools", "200k"] },
  { id: "nimbus-flash", name: "Nimbus Flash", provider: "Nimbus", description: "Lowest latency option.", capabilities: ["fast"] },
  { id: "orbit-7b", name: "Orbit 7B", provider: "Open weights", description: "Runs locally on a laptop.", capabilities: ["local", "8k"] },
];

export default function ModelSelectorDemo() {
  const [model, setModel] = useState("nimbus-pro");
  return (
    <div className="flex flex-col items-center gap-3">
      <ModelSelector models={models} value={model} onValueChange={setModel} />
      <p className="text-xs text-muted-foreground">
        Model names here are placeholders, not real products.
      </p>
    </div>
  );
}
