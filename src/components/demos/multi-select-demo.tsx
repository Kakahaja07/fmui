"use client";

import { useState } from "react";
import { MultiSelect } from "@/registry/components/multi-select/multi-select";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt" },
  { value: "vite", label: "Vite" },
];

export default function MultiSelectDemo() {
  const [value, setValue] = useState<string[]>(["next"]);
  return (
    <div className="w-full max-w-sm">
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
        Frameworks
      </label>
      <MultiSelect
        aria-label="Frameworks"
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Pick frameworks..."
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {value.length} selected. Backspace in the search removes the last chip.
      </p>
    </div>
  );
}
