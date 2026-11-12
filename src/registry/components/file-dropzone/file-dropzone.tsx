"use client";

import { useEffect, useEffectEvent, useId, useRef, useState, type DragEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  CloudUploadIcon,
  File01Icon,
  FileAudioIcon,
  FileZipIcon,
  Image01Icon,
  Pdf01Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface DropzoneFile {
  id: string;
  file: File;
  /** 0 to 100. Leave undefined for files that are not uploading. */
  progress?: number;
}

export interface FileDropzoneProps {
  value?: DropzoneFile[];
  defaultValue?: DropzoneFile[];
  onValueChange?: (files: DropzoneFile[]) => void;
  /** Called with the newly added, valid files. Start uploads here and report progress through `value`. */
  onFilesAdded?: (files: DropzoneFile[]) => void;
  /** Same syntax as the input's accept attribute, e.g. "image/*,.pdf". */
  accept?: string;
  /** Largest allowed file in bytes. */
  maxSize?: number;
  /** Fakes upload progress. Handy for demos and prototypes. */
  simulate?: boolean;
  /** Shown under the call to action, e.g. "PNG, JPG or PDF up to 5 MB". */
  hint?: string;
  className?: string;
}

let nextId = 0;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

function accepts(file: File, accept?: string) {
  if (!accept) return true;
  return accept.split(",").some((rule) => {
    const r = rule.trim().toLowerCase();
    if (r.startsWith(".")) return file.name.toLowerCase().endsWith(r);
    if (r.endsWith("/*")) return file.type.startsWith(r.slice(0, -1));
    return file.type === r;
  });
}

function iconFor(file: File) {
  if (file.type.startsWith("image/")) return Image01Icon;
  if (file.type.startsWith("video/")) return Video01Icon;
  if (file.type.startsWith("audio/")) return FileAudioIcon;
  if (file.type === "application/pdf") return Pdf01Icon;
  if (/zip|compressed|tar/.test(file.type)) return FileZipIcon;
  return File01Icon;
}

/** A drop area with click-to-browse, type and size checks, and a file list with upload progress. */
export function FileDropzone({
  value: valueProp,
  defaultValue = [],
  onValueChange,
  onFilesAdded,
  accept,
  maxSize,
  simulate = false,
  hint,
  className,
}: FileDropzoneProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const files = valueProp ?? valueState;
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  // dragenter/dragleave fire for every child, so count them instead of trusting one event.
  const depth = useRef(0);
  const id = useId();

  function emit(next: DropzoneFile[]) {
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  }

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    const problems: string[] = [];
    const added: DropzoneFile[] = [];
    for (const file of Array.from(list)) {
      if (!accepts(file, accept)) problems.push(`${file.name} is not an allowed file type.`);
      else if (maxSize !== undefined && file.size > maxSize)
        problems.push(`${file.name} is larger than ${formatSize(maxSize)}.`);
      else added.push({ id: `file-${++nextId}`, file, progress: simulate ? 0 : undefined });
    }
    setErrors(problems);
    if (!added.length) return;
    emit([...files, ...added]);
    onFilesAdded?.(added);
  }

  const tick = useEffectEvent(() =>
    emit(
      files.map((f) =>
        f.progress !== undefined && f.progress < 100
          ? { ...f, progress: Math.min(100, f.progress + 6 + Math.random() * 14) }
          : f,
      ),
    ),
  );
  const uploading = simulate && files.some((f) => f.progress !== undefined && f.progress < 100);
  useEffect(() => {
    if (!uploading) return;
    const timer = setInterval(tick, 240);
    return () => clearInterval(timer);
  }, [uploading]);

  function onDrag(e: DragEvent<HTMLButtonElement>, delta: number) {
    e.preventDefault();
    depth.current = Math.max(0, depth.current + delta);
    setDragging(depth.current > 0);
  }

  return (
    <div className={cn("w-full max-w-[380px]", className)}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => onDrag(e, 1)}
        onDragLeave={(e) => onDrag(e, -1)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          onDrag(e, -depth.current);
          addFiles(e.dataTransfer.files);
        }}
        aria-describedby={`${id}-hint`}
        className={cn(
          "flex w-full flex-col items-center rounded-[18px] border border-dashed px-4 py-6 text-center transition-[scale,background-color,border-color] duration-200 ease-out-strong active:scale-[0.99]",
          dragging ? "border-[#3358eb] bg-[#3358eb]/[0.06]" : "border-border-strong bg-accent hover:bg-accent/70",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "grid size-10 place-items-center rounded-[12px] bg-background text-heading shadow-xs transition-[translate,scale,color] duration-200 ease-out-strong motion-reduce:transition-colors",
            dragging && "-translate-y-1 scale-105 text-[#3358eb]",
          )}
        >
          <HugeiconsIcon icon={CloudUploadIcon} size={20} strokeWidth={1.8} />
        </span>
        <span className="mt-3 text-[13px]/[16px] font-semibold text-heading">
          {dragging ? "Drop to upload" : <>Drop files here or <span className="text-[#3358eb]">browse</span></>}
        </span>
        <span id={`${id}-hint`} className="mt-1 text-xs text-muted-foreground">
          {hint ?? (maxSize ? `Up to ${formatSize(maxSize)} each` : "Any file type")}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {errors.length > 0 && (
        <ul role="alert" className="mt-2 space-y-0.5 text-xs text-danger">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul aria-label="Files" className="mt-3 space-y-2">
          {files.map(({ id: fileId, file, progress }) => {
            const pct = progress === undefined ? undefined : Math.round(progress);
            const done = pct === 100;
            return (
              <li
                key={fileId}
                className="flex items-center gap-3 rounded-[14px] bg-background p-2.5 shadow-xs ring-1 ring-border transition-[scale,opacity] duration-200 ease-out-strong starting:scale-[0.97] starting:opacity-0"
              >
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-accent text-heading">
                  <HugeiconsIcon icon={iconFor(file)} size={17} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px]/[16px] font-semibold text-heading">{file.name}</span>
                  <span className="mt-0.5 flex justify-between text-xs/[16px] text-muted-foreground">
                    <span>{formatSize(file.size)}</span>
                    {pct !== undefined && (
                      <span className={cn("tabular-nums", done && "text-[#1f9d74]")}>{done ? "Uploaded" : `${pct}%`}</span>
                    )}
                  </span>
                  {pct !== undefined && (
                    <span
                      role="progressbar"
                      aria-label={`Uploading ${file.name}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={pct}
                      className={cn(
                        "mt-1.5 block h-1 overflow-hidden rounded-full bg-heading/10 transition-opacity duration-300",
                        done && "opacity-0",
                      )}
                    >
                      <span
                        className="block h-full origin-left rounded-full bg-[#3358eb] transition-transform duration-300 ease-linear motion-reduce:transition-none"
                        style={{ transform: `scaleX(${pct / 100})` }}
                      />
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => emit(files.filter((f) => f.id !== fileId))}
                  className="grid size-7 shrink-0 place-items-center self-start rounded-[8px] text-muted-foreground transition-[scale,color] duration-150 ease-out-strong hover:bg-accent hover:text-heading active:scale-[0.94]"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={13} strokeWidth={2.2} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
