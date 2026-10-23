"use client";

import { ResizablePanels } from "@/registry/components/resizable-panels/resizable-panels";

function Panel({ title, lines }: { title: string; lines: number }) {
  return (
    <div className="h-full p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      <div className="mt-3 flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-2.5 rounded-full bg-accent" style={{ width: `${90 - i * 12}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function ResizablePanelsDemo() {
  return (
    <div className="h-56 w-full max-w-xl">
      <ResizablePanels left={<Panel title="Editor" lines={5} />} right={<Panel title="Preview" lines={4} />} defaultSplit={55} />
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Drag the handle, or focus it and use arrow keys. Double-click resets.
      </p>
    </div>
  );
}
