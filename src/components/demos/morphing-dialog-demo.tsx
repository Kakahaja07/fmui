"use client";

import { MorphingDialog } from "@/registry/components/morphing-dialog/morphing-dialog";

export default function MorphingDialogDemo() {
  return (
    <MorphingDialog title="Release notes" subtitle="Version 0.1.0">
      <p>
        The first release ships the website, the catalog, and twenty working components. Click outside or press
        Escape to morph back into the card.
      </p>
      <ul className="mt-3 list-disc pl-5 text-muted-foreground">
        <li>Light and dark themes</li>
        <li>Keyboard accessible previews</li>
        <li>Copyable source code</li>
      </ul>
    </MorphingDialog>
  );
}
