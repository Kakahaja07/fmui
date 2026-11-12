"use client";

import { useEffect, useRef, useState } from "react";
import { DropdownMenu } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { Delete02Icon, Download04Icon, Link01Icon, PencilEdit02Icon, Share08Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface FileCardProps {
  /** File name with extension. The extension picks the icon color and never truncates. */
  name: string;
  /** Size in bytes, shown as KB / MB / GB. */
  size: number;
  /** Already formatted, e.g. "Edited 2h ago". */
  modified?: string;
  /** Written to the clipboard by "Copy link". */
  url?: string;
  onCopyLink?: () => void;
  onDownload?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  className?: string;
}

const TYPES: Record<string, string> = {
  pdf: "#e5484d",
  fig: "#8b5cf6",
  sketch: "#f59e0b",
  zip: "#d97706",
  rar: "#d97706",
  mp4: "#3358eb",
  mov: "#3358eb",
  mp3: "#db2777",
  wav: "#db2777",
  png: "#1f9d74",
  jpg: "#1f9d74",
  jpeg: "#1f9d74",
  svg: "#1f9d74",
  doc: "#2563eb",
  docx: "#2563eb",
  xls: "#15803d",
  xlsx: "#15803d",
  csv: "#15803d",
};

const itemClass =
  "flex cursor-default select-none items-center gap-2.5 rounded-[8px] px-2.5 py-1.5 text-[13px] outline-none data-[highlighted]:bg-accent";

export function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  const digits = unit === 0 || value >= 10 ? 0 : 1;
  return `${value.toFixed(digits)} ${units[unit]}`;
}

function MenuItem({ icon, label, onSelect, danger }: { icon: IconSvgElement; label: string; onSelect?: () => void; danger?: boolean }) {
  return (
    <DropdownMenu.Item onSelect={onSelect} className={cn(itemClass, danger ? "text-danger" : "text-foreground")}>
      <HugeiconsIcon icon={icon} size={15} strokeWidth={2} aria-hidden="true" className={danger ? "" : "text-muted-foreground"} />
      {label}
    </DropdownMenu.Item>
  );
}

/** A file row with a type-tinted icon, size, modified time and a share menu. */
export function FileCard({ name, size, modified, url, onCopyLink, onDownload, onRename, onDelete, className }: FileCardProps) {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
  const color = TYPES[ext] ?? "#737373";

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  function copyLink(e: Event) {
    // Keep the menu open long enough to show the confirmation, then close it.
    e.preventDefault();
    if (url) navigator.clipboard?.writeText(url).catch(() => {});
    onCopyLink?.();
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 900);
  }

  return (
    <div className={cn("flex w-[320px] items-center gap-3 rounded-[18px] bg-accent p-3", className)}>
      <svg viewBox="0 0 36 44" width="36" height="44" aria-hidden="true" className="shrink-0">
        <path d="M6 1h17l12 12v24a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V7a6 6 0 0 1 6-6z" fill={color} fillOpacity="0.14" />
        <path d="M23 1v7a5 5 0 0 0 5 5h7z" fill={color} fillOpacity="0.32" />
        <text x="17" y="34" textAnchor="middle" fill={color} fontSize="9" fontWeight="700" letterSpacing="0.02em">
          {(ext || "file").slice(0, 4).toUpperCase()}
        </text>
      </svg>

      <div className="min-w-0 flex-1">
        <p className="flex text-[13px]/[18px] font-semibold text-heading" title={name}>
          <span className="truncate">{base}</span>
          {ext && <span className="shrink-0">.{ext}</span>}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {formatBytes(size)}
          {modified && ` · ${modified}`}
        </p>
      </div>

      <DropdownMenu.Root
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) setCopied(false);
        }}
      >
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label={`Share ${name}`}
            className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-background text-muted-foreground shadow-xs transition-transform duration-150 ease-out-strong active:scale-[0.97] data-[state=open]:text-heading"
          >
            <HugeiconsIcon icon={Share08Icon} size={15} strokeWidth={2} aria-hidden="true" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={6}
            className="z-50 w-44 origin-(--radix-dropdown-menu-content-transform-origin) rounded-[12px] border border-border bg-background p-1 shadow-float data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] duration-150"
          >
            <DropdownMenu.Item onSelect={copyLink} className={cn(itemClass, "text-foreground")}>
              <span className="grid size-[15px] place-items-center *:col-start-1 *:row-start-1" aria-hidden="true">
                {[Link01Icon, Tick02Icon].map((icon, i) => (
                  <HugeiconsIcon
                    key={i}
                    icon={icon}
                    size={15}
                    strokeWidth={2}
                    className={cn(
                      "transition-[opacity,scale] duration-200 ease-out-strong",
                      i === 0 ? "text-muted-foreground" : "text-[#1f9d74]",
                      (i === 1) === copied ? "scale-100 opacity-100" : "scale-75 opacity-0",
                    )}
                  />
                ))}
              </span>
              {copied ? "Link copied" : "Copy link"}
            </DropdownMenu.Item>
            <MenuItem icon={Download04Icon} label="Download" onSelect={onDownload} />
            <MenuItem icon={PencilEdit02Icon} label="Rename" onSelect={onRename} />
            <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-border" />
            <MenuItem icon={Delete02Icon} label="Delete" onSelect={onDelete} danger />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <span role="status" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
