"use client";

import { useState } from "react";
import { ChatThread, type ChatSide } from "@/registry/components/chat-thread/chat-thread";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const SCRIPT: { from: ChatSide; text: string }[] = [
  { from: "them", text: "ship it tonight?" },
  { from: "me", text: "already live" },
  { from: "them", text: "hey can you send the new homepage?" },
  { from: "me", text: "yep, uploading it now" },
  { from: "them", text: "the hero animation is so clean" },
  { from: "me", text: "thanks, took me a few tries" },
];

// One entry per tick: who is typing and how many lines of this pass have been sent.
// Your replies get a typing pause first; Ines's lines just land.
const PHASES = SCRIPT.flatMap((line, i) =>
  line.from === "me"
    ? [
        { typing: "me" as const, sent: i },
        { typing: "me" as const, sent: i },
        { typing: null, sent: i + 1 },
        { typing: null, sent: i + 1 },
      ]
    : [
        { typing: null, sent: i + 1 },
        { typing: null, sent: i + 1 },
        { typing: null, sent: i + 1 },
      ],
);

const VISIBLE = 5;

export default function ChatThreadDemo() {
  // Start one full pass in, so the thread opens with history.
  const [tick, setTick] = useState(PHASES.length);
  const ref = useDemoLoop(() => setTick((t) => t + 1), 600);

  const phase = PHASES[tick % PHASES.length];
  const sent = Math.floor(tick / PHASES.length) * SCRIPT.length + phase.sent;
  const messages = Array.from({ length: Math.min(VISIBLE, sent) }, (_, k) => {
    const i = sent - Math.min(VISIBLE, sent) + k;
    return { id: `m${i}`, ...SCRIPT[i % SCRIPT.length] };
  });

  return (
    <div ref={ref}>
      <ChatThread messages={messages} typing={phase.typing} />
    </div>
  );
}
