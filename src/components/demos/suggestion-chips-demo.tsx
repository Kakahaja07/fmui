"use client";

import { useEffect, useRef, useState } from "react";
import { BubbleChatIcon, SparklesIcon } from "@hugeicons/core-free-icons";
import { SuggestionChips, type Suggestion } from "@/registry/components/suggestion-chips/suggestion-chips";

interface Turn {
  reply: string;
  suggestions: Suggestion[];
}

const TURNS: Turn[] = [
  {
    reply: "Your landing page loads in 1.8 s on 4G. The hero image is 640 KB and blocks the first paint.",
    suggestions: [
      { id: "fix", label: "How do I fix the hero?", icon: SparklesIcon },
      { id: "compare", label: "Compare to last week" },
      { id: "mobile", label: "What about mobile?" },
    ],
  },
  {
    reply: "Serve it as AVIF at 1600 px wide and add fetchpriority=\"high\". That should save about 480 KB.",
    suggestions: [
      { id: "snippet", label: "Show the markup", icon: BubbleChatIcon },
      { id: "lazy", label: "Lazy-load the rest?" },
      { id: "cdn", label: "Which CDN settings?" },
    ],
  },
  {
    reply: "Use a <picture> element with an AVIF source and a JPEG fallback, sized with width and height to avoid shifts.",
    suggestions: [
      { id: "again", label: "Start over", icon: SparklesIcon },
      { id: "thanks", label: "Thanks, that helps" },
    ],
  },
];

const bubble = "rounded-[16px] px-3 py-2 text-[13px]/[19px] transition-[opacity,translate] duration-200 ease-out-strong starting:translate-y-1 starting:opacity-0";

function Asked({ text }: { text: string }) {
  return <p className={`${bubble} max-w-[80%] self-end rounded-br-[6px] bg-[#3358eb] text-white`}>{text}</p>;
}

export default function SuggestionChipsDemo() {
  const [step, setStep] = useState(0);
  const [asked, setAsked] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(true);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const turn = TURNS[step];

  function select(s: Suggestion) {
    if (pending) return;
    setAsked(s.label);
    setPending(true);
    // Hold the picked chip on screen for a beat, then answer and offer the next set.
    timer.current = window.setTimeout(() => {
      setStep((n) => (n + 1) % TURNS.length);
      setPending(false);
      setOpen(true);
    }, 700);
  }

  return (
    <div className="flex w-[360px] flex-col gap-2">
      {asked && !pending && <Asked key={`q${step}`} text={asked} />}
      <p key={`a${step}`} className={`${bubble} rounded-bl-[6px] bg-accent py-2.5 text-foreground`}>
        {turn.reply}
      </p>
      {asked && pending && <Asked text={asked} />}
      <div className="relative mt-1 min-h-8">
        <SuggestionChips
          suggestions={turn.suggestions}
          onSelect={select}
          open={open}
          onOpenChange={setOpen}
          dismissible
        />
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute left-0 top-0 h-8 rounded-full px-1 text-xs font-medium text-muted-foreground transition-colors hover:text-heading"
          >
            Show suggestions
          </button>
        )}
      </div>
    </div>
  );
}
