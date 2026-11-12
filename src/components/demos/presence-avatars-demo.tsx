"use client";

import { useState } from "react";
import { PresenceAvatars, type PresencePerson } from "@/registry/components/presence-avatars/presence-avatars";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const POOL: PresencePerson[] = [
  { id: "nina", name: "Nina", color: "#111111" },
  { id: "rae", name: "Rae", color: "#3358eb" },
  { id: "theo", name: "Theo", color: "#111111" },
  { id: "ines", name: "Ines", color: "#f0714f" },
  { id: "omar", name: "Omar", color: "#1f9d74" },
  { id: "lena", name: "Lena", color: "#8b5cf6" },
  { id: "jules", name: "Jules", color: "#e0457b" },
  { id: "maya", name: "Maya", color: "#f2b33d" },
  { id: "eli", name: "Eli", color: "#3358eb" },
];
const MAX = 4;
const PATTERN = ["join", "join", "leave", "join", "join", "leave", "leave", "leave"] as const;

export default function PresenceAvatarsDemo() {
  const [people, setPeople] = useState(POOL.slice(0, MAX));
  const [step, setStep] = useState(0);

  const ref = useDemoLoop(() => {
    const move = people.length <= 3 ? "join" : people.length >= 7 ? "leave" : PATTERN[step % PATTERN.length];
    if (move === "join") {
      // Next person in the pool who isn't here yet.
      const last = POOL.findIndex((p) => p.id === people[people.length - 1].id);
      const ids = new Set(people.map((p) => p.id));
      const next = [...POOL.slice(last + 1), ...POOL].find((p) => !ids.has(p.id));
      if (next) setPeople([...people, next]);
    } else {
      // The leftmost visible avatar leaves, so the row visibly closes up.
      const i = Math.max(0, people.length - MAX);
      setPeople(people.filter((_, j) => j !== i));
    }
    setStep(step + 1);
  }, 1500);

  return (
    <div ref={ref}>
      <PresenceAvatars people={people} max={MAX} />
    </div>
  );
}
