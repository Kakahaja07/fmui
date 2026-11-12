"use client";

import { useId, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon, ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface PasswordStrengthProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  name?: string;
  className?: string;
}

const REQUIREMENTS = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Upper and lowercase letters", test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { label: "A number", test: (p: string) => /\d/.test(p) },
  { label: "A symbol", test: (p: string) => /[^A-Za-z0-9\s]/.test(p) },
];

const LEVELS = [
  { label: "", color: "" },
  { label: "Weak", color: "bg-red-500" },
  { label: "Fair", color: "bg-amber-500" },
  { label: "Good", color: "bg-[#3358eb]" },
  { label: "Strong", color: "bg-[#1f9d74]" },
];

/**
 * Score from 0 (empty) to 4. One point per requirement met, plus one for 14+ characters,
 * capped at 4. Anything typed scores at least 1, and under 8 characters never scores above 1.
 */
export function scorePassword(password: string) {
  if (!password) return 0;
  const met = REQUIREMENTS.filter((r) => r.test(password)).length;
  const score = Math.min(4, Math.max(1, met + (password.length >= 14 ? 1 : 0)));
  return password.length < 8 ? 1 : score;
}

/** A password field with a show/hide toggle, a four-step strength meter and a live requirement list. */
export function PasswordStrength({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  label = "Password",
  placeholder = "Create a password",
  name,
  className,
}: PasswordStrengthProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const password = valueProp ?? valueState;
  const [visible, setVisible] = useState(false);
  const id = useId();
  const score = scorePassword(password);

  return (
    <div className={cn("w-full max-w-[320px]", className)}>
      <label htmlFor={id} className="text-[13px]/[16px] font-semibold text-heading">
        {label}
      </label>
      <div className="mt-1.5 flex h-10 items-center rounded-[12px] border border-border bg-background pl-3 pr-1 shadow-xs transition-colors duration-150 focus-within:border-[#3358eb] focus-within:ring-3 focus-within:ring-[#3358eb]/15">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => {
            if (valueProp === undefined) setValueState(e.target.value);
            onValueChange?.(e.target.value);
          }}
          placeholder={placeholder}
          autoComplete="new-password"
          spellCheck={false}
          aria-describedby={`${id}-strength ${id}-rules`}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-controls={id}
          onClick={() => setVisible((v) => !v)}
          className="grid size-8 shrink-0 place-items-center rounded-[9px] text-muted-foreground transition-[scale,color] duration-150 ease-out-strong hover:text-heading active:scale-[0.94]"
        >
          <HugeiconsIcon icon={visible ? ViewOffSlashIcon : ViewIcon} size={16} strokeWidth={1.8} />
        </button>
      </div>

      <div aria-hidden="true" className="mt-2.5 grid grid-cols-4 gap-1.5">
        {LEVELS.slice(1).map((_, i) => (
          <span key={i} className="h-1 overflow-hidden rounded-full bg-heading/10">
            <span
              className={cn(
                "block h-full origin-left rounded-full transition-[scale,background-color] duration-300 ease-out-strong motion-reduce:transition-colors",
                i < score ? "scale-x-100" : "scale-x-0",
                LEVELS[score].color,
              )}
              style={{ transitionDelay: i < score ? `${i * 40}ms` : "0ms" }}
            />
          </span>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Strength</span>
        <span id={`${id}-strength`} className="grid font-medium text-heading">
          <span className="sr-only">Strength: {LEVELS[score].label || "none"}</span>
          {LEVELS.map((level, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                "col-start-1 row-start-1 text-right transition-[opacity,translate] duration-200 ease-out-strong",
                i === score ? "opacity-100" : "translate-y-1 opacity-0",
              )}
            >
              {level.label || "–"}
            </span>
          ))}
        </span>
      </div>

      <ul id={`${id}-rules`} aria-label="Password requirements" className="mt-3 space-y-1.5">
        {REQUIREMENTS.map((rule) => {
          const ok = rule.test(password);
          return (
            <li key={rule.label} className="flex items-center gap-2 text-xs">
              <span
                aria-hidden="true"
                className={cn(
                  "relative grid size-4 shrink-0 place-items-center rounded-full transition-colors duration-200",
                  ok ? "bg-[#1f9d74] text-white" : "bg-heading/10",
                )}
              >
                <span
                  className={cn(
                    "transition-[scale,opacity] duration-200 ease-out-strong",
                    ok ? "scale-100 opacity-100" : "scale-75 opacity-0",
                  )}
                >
                  <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
                </span>
              </span>
              <span className={cn("transition-colors duration-200", ok ? "text-heading" : "text-muted-foreground")}>
                <span className="sr-only">{ok ? "Met: " : "Not met: "}</span>
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
