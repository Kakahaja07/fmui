"use client";

import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon, AttachmentIcon, Cancel01Icon, StopIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface PromptInputProps {
  /** Called with the prompt text and attachment names on submit. */
  onSubmit?: (prompt: string, attachments: string[]) => void;
  /** Called when the user presses stop while generating. */
  onStop?: () => void;
  /** Controls the generating state (shows the stop button). */
  generating?: boolean;
  placeholder?: string;
  maxRows?: number;
  className?: string;
}

export function PromptInput({
  onSubmit,
  onStop,
  generating = false,
  placeholder = "Ask anything...",
  maxRows = 8,
  className,
}: PromptInputProps) {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const canSubmit = value.trim().length > 0 && !generating;

  function resize(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    const lineHeight = 24;
    el.style.height = `${Math.min(el.scrollHeight, lineHeight * maxRows)}px`;
  }

  function submit() {
    if (!canSubmit) return;
    onSubmit?.(value.trim(), attachments);
    setValue("");
    setAttachments([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  return (
    <div
      className={cn(
        "w-full rounded-[16px] border border-border bg-background p-2 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] duration-200 focus-within:border-border-strong focus-within:shadow-card",
        className,
      )}
    >
      {attachments.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 px-1 pb-2" aria-label="Attachments">
          {attachments.map((name) => (
            <li
              key={name}
              className="inline-flex h-7 items-center gap-1.5 rounded-[8px] border border-border bg-surface pl-2 pr-1 text-xs text-foreground animate-in fade-in-0 zoom-in-[0.96] duration-150"
            >
              <HugeiconsIcon icon={AttachmentIcon} size={12} strokeWidth={2} className="text-muted-foreground" />
              <span className="max-w-32 truncate">{name}</span>
              <button
                type="button"
                aria-label={`Remove ${name}`}
                onClick={() => setAttachments((a) => a.filter((n) => n !== name))}
                className="inline-flex size-5 items-center justify-center rounded-[5px] text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={11} strokeWidth={2.5} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        placeholder={placeholder}
        aria-label="Prompt"
        onChange={(e) => {
          setValue(e.target.value);
          resize(e.target);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            submit();
          }
        }}
        className="block w-full resize-none bg-transparent px-2 py-1.5 text-[15px] leading-6 text-foreground outline-none placeholder:text-muted-foreground"
      />
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1">
          <input
            ref={fileRef}
            type="file"
            multiple
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              const names = Array.from(e.target.files ?? []).map((f) => f.name);
              setAttachments((a) => Array.from(new Set([...a, ...names])));
              e.target.value = "";
            }}
          />
          <button
            type="button"
            aria-label="Attach files"
            onClick={() => fileRef.current?.click()}
            className="inline-flex size-8 items-center justify-center rounded-[8px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <HugeiconsIcon icon={AttachmentIcon} size={16} strokeWidth={2} />
          </button>
          <span className="hidden text-[11px] text-muted-foreground sm:inline">
            Enter to send, Shift+Enter for a new line
          </span>
        </div>
        {generating ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop generating"
            className="inline-flex size-8 items-center justify-center rounded-[9px] bg-primary text-primary-foreground transition-transform active:scale-[0.95]"
          >
            <HugeiconsIcon icon={StopIcon} size={14} strokeWidth={2.5} />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canSubmit}
            aria-label="Send prompt"
            className="inline-flex size-8 items-center justify-center rounded-[9px] bg-primary text-primary-foreground transition-[opacity,transform] duration-150 active:scale-[0.95] disabled:opacity-30"
          >
            <HugeiconsIcon icon={ArrowUp01Icon} size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
