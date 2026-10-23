"use client";

import { FloatingToolbar } from "@/registry/components/floating-toolbar/floating-toolbar";

const html =
  "<p>Select any part of this paragraph to reveal the formatting toolbar. You can make text <b>bold</b>, <i>italic</i>, or underlined, and the toolbar reflects the formatting under your selection.</p>";

export default function FloatingToolbarDemo() {
  return (
    <div className="w-full max-w-lg pt-10">
      <FloatingToolbar defaultHtml={html} />
    </div>
  );
}
