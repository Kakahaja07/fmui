"use client";

import { useId, useState } from "react";
import { Stepper } from "@/registry/components/stepper/stepper";

const inputClass =
  "h-9 w-full rounded-[9px] border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-border-strong";

export default function StepperDemo() {
  const [name, setName] = useState("");
  const planGroup = useId();
  const [plan, setPlan] = useState<string | null>(null);

  // The Stepper reads validate from its latest props, so these closures always see current state.
  return (
    <div className="w-full max-w-lg">
      <Stepper
        steps={[
          {
            id: "account",
            title: "Account",
            description: "Tell us what to call your workspace.",
            validate: () => (name.trim() ? null : "Enter a workspace name to continue."),
            content: (
              <input
                className={inputClass}
                placeholder="Workspace name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Workspace name"
              />
            ),
          },
          {
            id: "plan",
            title: "Plan",
            description: "You can change this later.",
            validate: () => (plan ? null : "Choose a plan to continue."),
            content: (
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Plan">
                {["Starter", "Pro"].map((p) => (
                  <label
                    key={p}
                    className={`flex h-10 cursor-pointer items-center justify-center rounded-[9px] border text-sm font-medium transition-colors ${
                      plan === p ? "border-primary text-foreground" : "border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <input type="radio" name={planGroup} className="sr-only" checked={plan === p} onChange={() => setPlan(p)} />
                    {p}
                  </label>
                ))}
              </div>
            ),
          },
          {
            id: "review",
            title: "Review",
            content: (
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
                <dt className="text-muted-foreground">Workspace</dt>
                <dd className="text-foreground">{name || "-"}</dd>
                <dt className="text-muted-foreground">Plan</dt>
                <dd className="text-foreground">{plan ?? "-"}</dd>
              </dl>
            ),
          },
        ]}
      />
    </div>
  );
}
