"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link01Icon, TextBoldIcon, TextItalicIcon, TextUnderlineIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type Format = "bold" | "italic" | "underline";

const formats: { id: Format; label: string; icon: typeof TextBoldIcon; key: string }[] = [
  { id: "bold", label: "Bold", icon: TextBoldIcon, key: "B" },
  { id: "italic", label: "Italic", icon: TextItalicIcon, key: "I" },
  { id: "underline", label: "Underline", icon: TextUnderlineIcon, key: "U" },
];

export interface FloatingToolbarProps {
  /** Initial editable HTML. */
  defaultHtml: string;
  className?: string;
}

/**
 * An editable region that shows a formatting toolbar above the current
 * text selection. Active formats are read back from the selection so the
 * toolbar always reflects the real document state.
 */
export function FloatingToolbar({ defaultHtml, className }: FloatingToolbarProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ top: number; left: number } | null>(null);
  const [active, setActive] = useState<Record<Format, boolean>>({ bold: false, italic: false, underline: false });

  const sync = useCallback(() => {
    const editor = editorRef.current;
    const sel = window.getSelection();
    if (!editor || !sel || sel.rangeCount === 0 || sel.isCollapsed || !editor.contains(sel.anchorNode)) {
      setRect(null);
      return;
    }
    const r = sel.getRangeAt(0).getBoundingClientRect();
    const host = editor.getBoundingClientRect();
    // Convert screen pixels to local pixels in case an ancestor applies a CSS scale.
    const scale = editor.offsetWidth ? host.width / editor.offsetWidth : 1;
    setRect({ top: (r.top - host.top) / scale, left: (r.left - host.left + r.width / 2) / scale });
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", sync);
    return () => document.removeEventListener("selectionchange", sync);
  }, [sync]);

  function apply(format: Format) {
    document.execCommand(format);
    editorRef.current?.focus();
    sync();
  }

  return (
    <div className={cn("relative", className)}>
      {rect && (
        <div
          role="toolbar"
          aria-label="Text formatting"
          style={{ top: rect.top, left: rect.left }}
          className="absolute z-10 flex -translate-x-1/2 -translate-y-[calc(100%+8px)] items-center gap-0.5 rounded-[10px] border border-border bg-background p-1 shadow-float animate-in fade-in-0 zoom-in-[0.97] duration-150"
        >
          {formats.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-label={f.label}
              aria-pressed={active[f.id]}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => apply(f.id)}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-[7px] transition-colors",
                active[f.id] ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent",
              )}
            >
              <HugeiconsIcon icon={f.icon} size={16} strokeWidth={2} />
            </button>
          ))}
          <span className="mx-0.5 h-5 w-px bg-border" />
          <button
            type="button"
            aria-label="Add link"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              const url = window.prompt("Link URL");
              if (url) document.execCommand("createLink", false, url);
              sync();
            }}
            className="inline-flex size-8 items-center justify-center rounded-[7px] text-foreground transition-colors hover:bg-accent"
          >
            <HugeiconsIcon icon={Link01Icon} size={16} strokeWidth={2} />
          </button>
        </div>
      )}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Editable text. Select text to format it."
        onKeyDown={(e) => {
          if (!(e.metaKey || e.ctrlKey)) return;
          const f = formats.find((x) => x.key.toLowerCase() === e.key.toLowerCase());
          if (f) {
            e.preventDefault();
            apply(f.id);
          }
        }}
        className="rounded-[12px] border border-border bg-background p-5 text-[15px] leading-7 text-foreground outline-none focus-visible:border-border-strong [&_a]:underline [&_a]:underline-offset-2"
        dangerouslySetInnerHTML={{ __html: defaultHtml }}
      />
    </div>
  );
}
