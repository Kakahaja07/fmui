"use client";

import { useId, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Most tags allowed. Unlimited when omitted. */
  max?: number;
  label?: string;
  placeholder?: string;
  className?: string;
}

const SEPARATORS = /[,\n]/;

/**
 * A text field that turns what you type into removable tags. Enter, comma and Tab add a tag,
 * Backspace on an empty field selects and then removes the last one, and pasted lists are split.
 */
export function TagInput({
  value: valueProp,
  defaultValue = [],
  onValueChange,
  max,
  label = "Tags",
  placeholder = "Add a tag",
  className,
}: TagInputProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const tags = valueProp ?? valueState;
  const [draft, setDraft] = useState("");
  // The last tag is "armed" by the first Backspace and removed by the second.
  const [armed, setArmed] = useState(false);
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const tagEls = useRef(new Map<string, HTMLElement>());
  const id = useId();
  const full = max !== undefined && tags.length >= max;

  function emit(next: string[]) {
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  }

  // Point at the tag that already exists instead of silently ignoring the duplicate.
  function nudge(tag: string) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tagEls.current.get(tag.toLowerCase())?.animate(
      reduce
        ? [{ opacity: 1 }, { opacity: 0.4 }, { opacity: 1 }]
        : ["0", "-3px", "3px", "-2px", "0"].map((x) => ({ transform: `translateX(${x})` })),
      { duration: 320, easing: "ease-in-out" },
    );
  }

  function add(raw: string) {
    const next = [...tags];
    const seen = new Set(next.map((t) => t.toLowerCase()));
    const added: string[] = [];
    let message = "";
    for (const part of raw.split(SEPARATORS)) {
      const tag = part.trim();
      if (!tag) continue;
      if (seen.has(tag.toLowerCase())) {
        nudge(tag);
        message = `${tag} is already added`;
      } else if (max !== undefined && next.length >= max) {
        message = `Up to ${max} tags`;
        break;
      } else {
        seen.add(tag.toLowerCase());
        next.push(tag);
        added.push(tag);
      }
    }
    setDraft("");
    setArmed(false);
    if (added.length) emit(next);
    setStatus(added.length ? `Added ${added.join(", ")}` : message);
  }

  function remove(index: number) {
    setStatus(`Removed ${tags[index]}`);
    setArmed(false);
    emit(tags.filter((_, i) => i !== index));
    inputRef.current?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing) return;
    const hasDraft = draft.trim() !== "";
    if (e.key === "," || (hasDraft && (e.key === "Enter" || (e.key === "Tab" && !e.shiftKey)))) {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && draft === "" && tags.length) {
      e.preventDefault();
      if (armed) remove(tags.length - 1);
      else setArmed(true);
    } else {
      setArmed(false);
    }
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    if (!SEPARATORS.test(text)) return;
    e.preventDefault();
    add(draft + text);
  }

  return (
    <div className={cn("w-full max-w-[360px]", className)}>
      <label htmlFor={id} className="text-[13px]/[16px] font-semibold text-heading">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.focus()}
        className="mt-1.5 flex min-h-10 cursor-text flex-wrap items-center gap-1.5 rounded-[12px] border border-border bg-background p-1.5 shadow-xs transition-colors duration-150 focus-within:border-[#3358eb] focus-within:ring-3 focus-within:ring-[#3358eb]/15"
      >
        {tags.map((tag, i) => (
          <span
            key={tag}
            ref={(el) => {
              const key = tag.toLowerCase();
              if (el) tagEls.current.set(key, el);
              return () => {
                tagEls.current.delete(key);
              };
            }}
            className={cn(
              "inline-flex h-7 items-center gap-0.5 rounded-[8px] bg-accent pl-2.5 pr-1 text-[13px] font-medium text-heading transition-[scale,opacity] duration-200 ease-out-strong starting:scale-95 starting:opacity-0",
              armed && i === tags.length - 1 && "bg-[#3358eb]/10 text-[#3358eb] ring-1 ring-inset ring-[#3358eb]/40",
            )}
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={(e) => {
                e.stopPropagation();
                remove(i);
              }}
              className="grid size-5 place-items-center rounded-[6px] text-muted-foreground transition-colors hover:bg-border-strong/60 hover:text-heading"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={11} strokeWidth={2.5} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={id}
          value={draft}
          onChange={(e) => {
            // Soft keyboards don't always report the comma key, so split here too.
            if (SEPARATORS.test(e.target.value)) add(e.target.value);
            else setDraft(e.target.value);
            setArmed(false);
          }}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onBlur={() => setArmed(false)}
          placeholder={full ? `Limit of ${max} reached` : placeholder}
          aria-describedby={`${id}-hint`}
          className="h-7 min-w-[96px] flex-1 bg-transparent px-1.5 text-sm text-heading outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
        <span id={`${id}-hint`}>Press Enter or comma to add</span>
        {max !== undefined && (
          <span className="tabular-nums">
            {tags.length}/{max}
          </span>
        )}
      </div>
      <span role="status" className="sr-only">
        {status}
      </span>
    </div>
  );
}
