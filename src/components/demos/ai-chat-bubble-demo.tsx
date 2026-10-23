"use client";

import { useState } from "react";
import { AIChatBubble, type ChatMessage } from "@/registry/components/ai-chat-bubble/ai-chat-bubble";

const replies = [
  "Use a grid-template-rows transition from 0fr to 1fr. It animates height without measuring the content.",
  "Wrap the content in a grid container and toggle grid-template-rows between 0fr and 1fr. The inner element needs overflow hidden.",
];

export default function AIChatBubbleDemo() {
  const [replyIndex, setReplyIndex] = useState(0);
  const messages: ChatMessage[] = [
    { id: "u1", role: "user", name: "You", content: "How do I animate height to auto without JavaScript?" },
    { id: "a1", role: "assistant", name: "FMUI", content: replies[replyIndex] },
  ];
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      {messages.map((m) => (
        <AIChatBubble key={m.id} message={m} onRegenerate={() => setReplyIndex((i) => (i + 1) % replies.length)} />
      ))}
    </div>
  );
}
