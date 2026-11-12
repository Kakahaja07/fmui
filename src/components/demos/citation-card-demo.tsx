"use client";

import { Citation, CitationList } from "@/registry/components/citation-card/citation-card";

const sources = [
  {
    title: "Interaction to Next Paint (INP)",
    url: "https://web.dev/articles/inp",
    snippet:
      "INP observes the latency of all click, tap, and keyboard interactions throughout the lifespan of a page and reports the longest one.",
  },
  {
    title: "GPU Animation: Doing It Right",
    url: "https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/",
    snippet: "Compositor-only properties skip layout and paint, so the browser can animate them on the GPU even when the main thread is busy.",
  },
  {
    title: "prefers-reduced-motion - CSS media feature",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion",
    site: "MDN Web Docs",
    snippet: "Detects whether the user has asked the system to minimize the amount of non-essential motion it uses.",
  },
];

export default function CitationCardDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-[14px]/[23px] text-foreground">
        Keep interactions under 200 ms to score a good INP
        <Citation source={sources[0]} index={1} />. Animate only transform and opacity, which the compositor can run off
        the main thread
        <Citation source={sources[1]} index={2} />, and drop movement for people who ask for reduced motion
        <Citation source={sources[2]} index={3} />.
      </p>
      <CitationList sources={sources} />
    </div>
  );
}
