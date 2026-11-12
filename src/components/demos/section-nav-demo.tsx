"use client";

import { useRef } from "react";
import { SectionNav } from "@/registry/components/section-nav/section-nav";

const SECTIONS = [
  {
    id: "section-nav-overview",
    label: "Overview",
    body: [
      "Workflows run a series of steps whenever something happens in your workspace: a form is submitted, a deal changes stage, or a schedule fires.",
      "Each run is logged with its inputs and outputs, so you can see exactly what happened and replay it.",
    ],
  },
  {
    id: "section-nav-triggers",
    label: "Triggers",
    body: [
      "A trigger starts the workflow. Pick an event from any connected app, or run on a schedule from every minute to once a month.",
      "Filters on the trigger keep noise out: only deals over a set amount, only forms from a given page.",
    ],
  },
  {
    id: "section-nav-steps",
    label: "Steps",
    body: [
      "Steps act on the data the trigger produced. Send a message, update a record, call a webhook, or branch on a condition.",
      "Steps run in order. A failed step pauses the run and notifies the owner instead of silently skipping ahead.",
    ],
  },
  {
    id: "section-nav-limits",
    label: "Limits",
    body: [
      "Free workspaces include 1,000 runs a month. Paid plans raise this to 50,000 and add priority execution.",
    ],
  },
  {
    id: "section-nav-faq",
    label: "FAQ",
    body: ["Runs are kept for 30 days. Export them from the run history at any time."],
  },
];

export default function SectionNavDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="h-[320px] w-[560px] overflow-y-auto rounded-[20px] border border-border bg-background shadow-card"
    >
      <div className="flex gap-6 p-5">
        <SectionNav sections={SECTIONS} root={scrollRef} className="top-5 w-32" />
        <article className="min-w-0 flex-1 space-y-6 pb-4">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-5 outline-none">
              <h3 className="text-sm font-semibold text-heading">{section.label}</h3>
              {section.body.map((text) => (
                <p key={text} className="mt-2 text-[13px] leading-5 text-muted-foreground">
                  {text}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
