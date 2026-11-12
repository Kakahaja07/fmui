"use client";

import { useState } from "react";
import { ToastStack, type StackNotification } from "@/registry/components/toast-notification/toast-notification";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const FEED: Omit<StackNotification, "id">[] = [
  { title: "Mail", body: "New lead from your site", color: "#1f9d74" },
  { title: "Calendar", body: "Client call in 15 min", color: "#3358eb" },
  { title: "Vercel", body: "Deploy is live", color: "#111111" },
  { title: "Stripe", body: "Payment received, $1,200", color: "#6b5cf6" },
  { title: "Figma", body: "Rae commented on Hero", color: "#111111" },
];

// Newest first, so the opening stack reads Vercel, Calendar, Mail like the video.
const INITIAL = [2, 1, 0].map((i) => ({ ...FEED[i], id: String(i) }));

export default function ToastStackDemo() {
  const [items, setItems] = useState<StackNotification[]>(INITIAL);
  const [next, setNext] = useState(3);

  const ref = useDemoLoop(() => {
    setItems((list) => [{ ...FEED[next % FEED.length], id: String(next) }, ...list].slice(0, 4));
    setNext((n) => n + 1);
  }, 2000);

  return (
    <div ref={ref}>
      <ToastStack notifications={items} />
    </div>
  );
}
