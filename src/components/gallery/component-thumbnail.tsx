import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  Cursor01Icon,
  File01Icon,
  Search01Icon,
  SparklesIcon,
  StarIcon,
  Tick02Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";
import type { ComponentCategory } from "@/types/component";
import { cn } from "@/lib/utils";

/**
 * Static sketches used on cards. Server-rendered markup only, so a grid of 50
 * cards stays cheap and never loads the interactive demos.
 */
const Bar = ({ w, className }: { w: string; className?: string }) => (
  <span className={cn("block h-[7px] shrink-0 rounded-full bg-border-strong", className)} style={{ width: w }} />
);

const Frame = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={cn("rounded-[10px] border border-border bg-background p-3 shadow-sketch", className)}>{children}</div>
);

const I = ({ icon, className }: { icon: IconSvgElement; className?: string }) => (
  <HugeiconsIcon icon={icon} size={12} strokeWidth={2.2} className={cn("shrink-0 text-muted-foreground", className)} />
);

const Dot = ({ className }: { className?: string }) => <span className={cn("block size-3 shrink-0 rounded-full bg-border-strong", className)} />;

const sketches: Record<string, React.ReactNode> = {
  // Interactive
  "expandable-tabs": (
    <Frame className="flex items-center gap-1.5 p-1.5">
      <span className="flex h-7 items-center gap-1.5 rounded-[7px] bg-accent px-2">
        <Dot className="bg-heading" />
        <Bar w="30px" className="bg-heading" />
      </span>
      <Dot />
      <Dot />
      <Dot className="mr-1" />
    </Frame>
  ),
  "animated-segmented-control": (
    <div className="flex gap-1 rounded-[10px] border border-border bg-surface p-1 shadow-sketch">
      <span className="flex h-7 w-14 items-center justify-center rounded-[6px] bg-background shadow-sm ring-1 ring-border"><Bar w="24px" className="bg-heading" /></span>
      <span className="flex h-7 w-14 items-center justify-center"><Bar w="24px" /></span>
      <span className="flex h-7 w-14 items-center justify-center"><Bar w="24px" /></span>
    </div>
  ),
  "command-menu": (
    <Frame className="w-48 p-0">
      <div className="flex items-center gap-2 border-b border-border px-2.5 py-2"><I icon={Search01Icon} /><Bar w="55%" /></div>
      <div className="flex flex-col gap-0.5 p-1.5">
        <span className="flex items-center gap-2 rounded-[6px] bg-accent px-2 py-1.5"><Dot className="size-2.5 rounded-[3px] bg-heading" /><Bar w="50%" className="bg-heading/70" /><span className="ml-auto h-3.5 w-4 rounded-[3px] border border-border" /></span>
        <span className="flex items-center gap-2 px-2 py-1.5"><Dot className="size-2.5 rounded-[3px]" /><Bar w="40%" /></span>
        <span className="flex items-center gap-2 px-2 py-1.5"><Dot className="size-2.5 rounded-[3px]" /><Bar w="58%" /></span>
      </div>
    </Frame>
  ),
  "multi-select": (
    <div className="flex w-48 flex-col gap-1.5">
      <Frame className="flex items-center gap-1 p-1.5">
        <span className="flex h-5 items-center gap-1 rounded-[5px] bg-accent px-1.5"><Bar w="22px" className="bg-heading/60" /></span>
        <span className="flex h-5 items-center gap-1 rounded-[5px] bg-accent px-1.5"><Bar w="16px" className="bg-heading/60" /></span>
        <I icon={ArrowDown01Icon} className="ml-auto" />
      </Frame>
      <Frame className="flex flex-col gap-2 p-2">
        <span className="flex items-center gap-2"><span className="flex size-3 items-center justify-center rounded-[3px] bg-heading text-page"><I icon={Tick02Icon} className="size-2 text-page" /></span><Bar w="45%" /></span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-[3px] border border-border-strong" /><Bar w="60%" /></span>
      </Frame>
    </div>
  ),
  "smart-dropdown": (
    <div className="flex flex-col items-start gap-1.5">
      <Frame className="flex h-7 items-center gap-1.5 px-2.5 py-0"><Bar w="34px" className="bg-heading/70" /><I icon={ArrowDown01Icon} /></Frame>
      <Frame className="flex w-44 flex-col gap-2.5 p-2.5">
        {["70%", "55%", "62%"].map((w, i) => (
          <span key={i} className="flex items-start gap-2"><Dot className="size-2.5 rounded-[3px]" /><span className="flex flex-1 flex-col gap-1"><Bar w={w} className={i === 0 ? "bg-heading/60" : undefined} /><Bar w="40%" className="h-[5px] opacity-60" /></span></span>
        ))}
      </Frame>
    </div>
  ),
  "floating-toolbar": (
    <div className="flex flex-col items-center gap-2">
      <Frame className="flex gap-1 p-1">
        <span className="size-5 rounded-[5px] bg-heading" />
        <span className="size-5 rounded-[5px] bg-accent" />
        <span className="size-5 rounded-[5px] bg-accent" />
        <span className="mx-0.5 w-px bg-border" />
        <span className="size-5 rounded-[5px] bg-accent" />
      </Frame>
      <div className="flex w-40 flex-col gap-1.5">
        <Bar w="100%" />
        <span className="block h-[7px] w-3/4 rounded-full bg-sky-300/70 dark:bg-sky-500/40" />
        <Bar w="85%" />
      </div>
    </div>
  ),
  "context-menu": (
    <div className="relative h-24 w-48 rounded-[10px] border border-dashed border-border-strong">
      <I icon={Cursor01Icon} className="absolute left-8 top-5 size-3.5 text-heading" />
      <Frame className="absolute left-12 top-8 flex w-28 flex-col gap-2 p-2">
        <Bar w="70%" /><Bar w="55%" /><span className="-mx-2 h-px bg-border" /><Bar w="45%" className="bg-red-300 dark:bg-red-500/50" />
      </Frame>
    </div>
  ),
  "resizable-panels": (
    <Frame className="flex h-20 w-48 gap-0 p-0">
      <span className="flex w-[45%] flex-col gap-1.5 p-2.5"><Bar w="80%" /><Bar w="55%" /></span>
      <span className="flex w-2 items-center justify-center bg-surface"><span className="h-5 w-[3px] rounded-full bg-heading/40" /></span>
      <span className="flex flex-1 flex-col gap-1.5 p-2.5"><Bar w="60%" /><Bar w="85%" /></span>
    </Frame>
  ),
  "spotlight-search": (
    <div className="flex w-52 flex-col gap-1.5">
      <Frame className="flex h-9 items-center gap-2 rounded-[12px] px-3 py-0"><I icon={Search01Icon} className="size-3.5" /><Bar w="45%" /></Frame>
      <Frame className="flex flex-col gap-2 rounded-[12px] p-2">
        <span className="flex items-center gap-2 rounded-[6px] bg-accent p-1"><span className="size-5 rounded-[5px] border border-border bg-background" /><Bar w="50%" className="bg-heading/60" /></span>
        <span className="flex items-center gap-2 p-1"><span className="size-5 rounded-[5px] border border-border" /><Bar w="38%" /></span>
      </Frame>
    </div>
  ),
  stepper: (
    <Frame className="flex w-52 flex-col gap-3">
      <span className="flex items-center gap-1.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-heading"><I icon={Tick02Icon} className="size-2.5 text-page" /></span>
        <span className="h-px flex-1 bg-heading" />
        <span className="size-5 rounded-full border-2 border-heading" />
        <span className="h-px flex-1 bg-border-strong" />
        <span className="size-5 rounded-full border-2 border-border-strong" />
      </span>
      <Bar w="40%" className="bg-heading/60" />
      <span className="h-6 rounded-[6px] border border-border" />
    </Frame>
  ),

  // Cards & Data
  "metric-card": (
    <Frame className="w-44">
      <div className="flex items-center justify-between"><Bar w="40%" /><span className="h-3.5 w-12 rounded-[4px] bg-surface ring-1 ring-border" /></div>
      <span className="mt-2.5 block h-4 w-20 rounded-[4px] bg-heading" />
      <div className="mt-2 flex items-end justify-between">
        <Bar w="36px" className="bg-green-300 dark:bg-green-500/50" />
        <span className="flex items-end gap-0.5">{[3, 5, 4, 6, 7, 6, 8].map((h, i) => <span key={i} className={cn("w-1.5 rounded-sm", i === 6 ? "bg-heading" : "bg-border-strong")} style={{ height: h * 3 }} />)}</span>
      </div>
    </Frame>
  ),
  "sparkline-card": (
    <Frame className="w-44">
      <Bar w="50%" />
      <span className="mt-2 block h-3.5 w-14 rounded-[4px] bg-heading" />
      <svg viewBox="0 0 100 30" className="mt-2 h-8 w-full"><path d="M0 24 L15 20 L30 22 L45 14 L60 16 L75 8 L100 4" fill="none" stroke="currentColor" strokeWidth="2" className="text-heading" /><circle cx="100" cy="4" r="3" className="fill-background stroke-heading" strokeWidth="2" /></svg>
    </Frame>
  ),
  "activity-feed": (
    <Frame className="flex w-48 flex-col gap-3">
      {["75%", "60%", "70%"].map((w, i) => (
        <span key={i} className="flex items-center gap-2"><span className="size-5 shrink-0 rounded-full border border-border bg-surface" /><span className="flex flex-1 flex-col gap-1"><Bar w={w} className={i === 0 ? "bg-heading/50" : undefined} /><Bar w="30%" className="h-[5px] opacity-60" /></span></span>
      ))}
    </Frame>
  ),
  timeline: (
    <div className="relative flex w-40 flex-col gap-4 pl-6">
      <span className="absolute bottom-2 left-[7px] top-2 w-px bg-border-strong" />
      {[true, true, false].map((done, i) => (
        <span key={i} className="relative flex flex-col gap-1">
          <span className={cn("absolute -left-6 top-0 size-3.5 rounded-full border-2", done ? "border-heading bg-heading" : "border-border-strong bg-background")} />
          <Bar w={i === 1 ? "75%" : "60%"} className={done ? "bg-heading/60" : undefined} />
          <Bar w="35%" className="h-[5px] opacity-60" />
        </span>
      ))}
    </div>
  ),
  "pricing-card": (
    <div className="flex items-end gap-2">
      <Frame className="flex w-20 flex-col gap-1.5 p-2.5"><Bar w="50%" /><span className="h-3 w-8 rounded-[3px] bg-border-strong" /><Bar w="80%" className="mt-1" /><Bar w="70%" /><span className="mt-1 h-5 rounded-[5px] border border-border" /></Frame>
      <Frame className="flex w-24 flex-col gap-1.5 border-heading p-2.5"><Bar w="45%" className="bg-heading/60" /><span className="h-3.5 w-10 rounded-[3px] bg-heading" /><Bar w="85%" className="mt-1" /><Bar w="70%" /><Bar w="60%" /><span className="mt-1 h-5 rounded-[5px] bg-heading" /></Frame>
    </div>
  ),
  "progress-ring": (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 48 48" className="size-16"><circle cx="24" cy="24" r="20" fill="none" strokeWidth="5" className="stroke-border-strong/60" /><circle cx="24" cy="24" r="20" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="126" strokeDashoffset="45" className="origin-center -rotate-90 stroke-heading" /></svg>
      <svg viewBox="0 0 48 48" className="size-10"><circle cx="24" cy="24" r="19" fill="none" strokeWidth="6" className="stroke-border-strong/60" /><circle cx="24" cy="24" r="19" fill="none" strokeWidth="6" strokeLinecap="round" strokeDasharray="120" strokeDashoffset="80" className="origin-center -rotate-90 stroke-heading" /></svg>
    </div>
  ),
  "comparison-table": (
    <Frame className="grid w-48 grid-cols-[1fr_24px_24px] items-center gap-x-2 gap-y-2.5 p-2.5">
      <Bar w="60%" className="bg-heading/60" /><Bar w="100%" className="bg-heading/60" /><Bar w="100%" className="bg-heading/60" />
      {[[true, true], [false, true], [true, false]].map((row, i) => (
        <span key={i} className="contents"><Bar w={`${55 + i * 10}%`} />{row.map((v, j) => <span key={j} className="flex justify-center">{v ? <I icon={Tick02Icon} className="text-heading" /> : <span className="h-px w-2 bg-border-strong" />}</span>)}</span>
      ))}
    </Frame>
  ),
  "kanban-card": (
    <Frame className="flex w-44 flex-col gap-2">
      <span className="flex gap-1"><span className="h-3 w-8 rounded-full bg-amber-200 dark:bg-amber-500/40" /><span className="h-3 w-10 rounded-full bg-sky-200 dark:bg-sky-500/40" /></span>
      <Bar w="85%" className="bg-heading/60" /><Bar w="55%" />
      <span className="mt-1 flex items-center justify-between"><span className="flex -space-x-1.5"><span className="size-4 rounded-full border-2 border-background bg-border-strong" /><span className="size-4 rounded-full border-2 border-background bg-heading/40" /></span><Bar w="26px" /></span>
    </Frame>
  ),
  "profile-card": (
    <Frame className="flex w-40 flex-col items-center gap-2 py-4">
      <span className="size-9 rounded-full bg-gradient-to-br from-border-strong to-heading/40" />
      <Bar w="50%" className="bg-heading/60" /><Bar w="35%" />
      <span className="mt-1 h-5 w-20 rounded-[6px] bg-heading" />
    </Frame>
  ),
  "file-card": (
    <Frame className="flex w-48 items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-[8px] border border-border bg-surface"><I icon={File01Icon} className="size-4" /></span>
      <span className="flex flex-1 flex-col gap-1.5"><Bar w="75%" className="bg-heading/60" /><Bar w="40%" /></span>
      <span className="flex flex-col gap-0.5"><Dot className="size-1" /><Dot className="size-1" /><Dot className="size-1" /></span>
    </Frame>
  ),

  // Forms & Inputs
  "tag-input": (
    <Frame className="flex w-48 flex-wrap items-center gap-1 p-1.5">
      {["22px", "30px", "18px"].map((w, i) => <span key={i} className="flex h-5 items-center gap-1 rounded-[5px] bg-accent px-1.5"><Bar w={w} className="bg-heading/50" /><span className="text-[9px] leading-none text-muted-foreground">x</span></span>)}
      <span className="ml-0.5 h-3.5 w-px bg-heading" />
    </Frame>
  ),
  "otp-input": (
    <div className="flex items-center gap-1.5">
      {[true, true, false, false].map((filled, i) => (
        <Frame key={i} className={cn("flex size-9 items-center justify-center p-0", i === 2 && "ring-2 ring-heading/20 border-heading/50")}>
          {filled ? <Dot className="size-2 bg-heading" /> : i === 2 ? <span className="h-3.5 w-px bg-heading" /> : null}
        </Frame>
      ))}
    </div>
  ),
  "date-range-picker": (
    <Frame className="w-44 p-2.5">
      <span className="mb-2 flex items-center justify-between"><Bar w="40%" className="bg-heading/60" /><span className="flex gap-1"><Dot className="size-1.5" /><Dot className="size-1.5" /></span></span>
      <span className="grid grid-cols-7 gap-1">
        {Array.from({ length: 21 }).map((_, i) => (
          <span key={i} className={cn("h-3 rounded-[3px]", i === 9 || i === 13 ? "bg-heading" : i > 9 && i < 13 ? "bg-accent" : "bg-surface")} />
        ))}
      </span>
    </Frame>
  ),
  "file-dropzone": (
    <div className="flex w-48 flex-col items-center gap-2 rounded-[12px] border border-dashed border-border-strong bg-background/60 py-5">
      <span className="flex size-8 items-center justify-center rounded-full border border-border bg-background shadow-sketch"><I icon={Upload01Icon} className="size-3.5 text-heading" /></span>
      <Bar w="45%" /><Bar w="30%" className="h-[5px] opacity-60" />
    </div>
  ),
  "password-strength": (
    <div className="flex w-48 flex-col gap-2">
      <Frame className="flex h-8 items-center gap-1 px-2.5 py-0">{Array.from({ length: 8 }).map((_, i) => <Dot key={i} className="size-1.5 bg-heading" />)}</Frame>
      <span className="grid grid-cols-4 gap-1">{[0, 1, 2, 3].map((i) => <span key={i} className={cn("h-1 rounded-full", i < 3 ? "bg-green-400 dark:bg-green-500/70" : "bg-border-strong")} />)}</span>
      <span className="flex items-center gap-1.5"><I icon={Tick02Icon} className="text-green-600 dark:text-green-400" /><Bar w="45%" /></span>
    </div>
  ),
  "range-slider": (
    <div className="relative h-6 w-48">
      <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border-strong" />
      <span className="absolute left-[25%] right-[30%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-heading" />
      <span className="absolute left-[25%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-heading bg-background shadow-sketch" />
      <span className="absolute left-[70%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-heading bg-background shadow-sketch" />
    </div>
  ),
  "color-picker": (
    <Frame className="w-40 p-2.5">
      <span className="block h-12 rounded-[6px] bg-gradient-to-br from-white via-sky-400 to-neutral-900" />
      <span className="mt-2 flex gap-1">{["bg-rose-400", "bg-amber-400", "bg-emerald-400", "bg-sky-400", "bg-violet-400", "bg-heading"].map((c) => <span key={c} className={cn("size-3.5 rounded-full", c)} />)}</span>
    </Frame>
  ),
  "rating-input": (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <HugeiconsIcon key={i} icon={StarIcon} size={22} strokeWidth={1.8} className={i < 4 ? "fill-heading text-heading" : "text-border-strong"} />
      ))}
    </div>
  ),

  // Motion & Feedback
  "animated-counter": (
    <div className="flex flex-col items-center gap-1.5">
      <span className="font-heading text-[30px] font-semibold tracking-[-0.04em] text-heading tabular-nums">12,480</span>
      <Bar w="70px" className="h-[5px]" />
    </div>
  ),
  "morphing-dialog": (
    <div className="relative">
      <Frame className="w-24 opacity-60"><Bar w="60%" /><Bar w="40%" className="mt-1.5" /></Frame>
      <Frame className="absolute -right-12 -top-4 w-32 shadow-float"><Bar w="60%" className="bg-heading/70" /><Bar w="90%" className="mt-2" /><Bar w="70%" className="mt-1.5" /></Frame>
    </div>
  ),
  "hold-to-confirm": (
    <span className="relative flex h-9 w-36 items-center justify-center overflow-hidden rounded-[10px] border border-red-200 bg-red-50 shadow-sketch dark:border-red-900 dark:bg-red-950/40">
      <span className="absolute inset-y-0 left-0 w-[60%] bg-red-200/80 dark:bg-red-800/40" />
      <Bar w="60px" className="relative bg-red-400 dark:bg-red-400/70" />
    </span>
  ),
  "toast-stack": (
    <div className="relative h-20 w-48">
      <Frame className="absolute inset-x-4 bottom-0 h-10 opacity-50" />
      <Frame className="absolute inset-x-2 bottom-2 h-10 opacity-80" />
      <Frame className="absolute inset-x-0 bottom-4 flex items-center gap-2 py-2.5"><span className="flex size-4 items-center justify-center rounded-full bg-heading"><I icon={Tick02Icon} className="size-2.5 text-page" /></span><Bar w="60%" /></Frame>
    </div>
  ),
  "skeleton-loader": (
    <div className="flex w-48 items-start gap-2.5">
      <span className="size-9 shrink-0 animate-pulse rounded-full bg-accent" />
      <span className="flex flex-1 flex-col gap-2 pt-1"><span className="h-2.5 w-4/5 animate-pulse rounded-full bg-accent" /><span className="h-2.5 w-3/5 animate-pulse rounded-full bg-accent" /><span className="h-2.5 w-2/3 animate-pulse rounded-full bg-accent" /></span>
    </div>
  ),
  "text-reveal": (
    <div className="flex w-48 flex-wrap gap-1.5">
      {["32px", "48px", "24px", "40px", "36px", "28px", "44px"].map((w, i) => <Bar key={i} w={w} className={cn("h-2.5", i < 4 ? "bg-heading/70" : "opacity-40")} />)}
    </div>
  ),
  "magnetic-button": (
    <span className="relative flex items-center justify-center">
      <span className="absolute -inset-3 rounded-[14px] border border-dashed border-border-strong" />
      <span className="flex h-9 w-28 translate-x-1.5 -translate-y-1 items-center justify-center rounded-[10px] bg-heading shadow-sketch"><Bar w="50px" className="bg-page/60" /></span>
    </span>
  ),
  "status-pulse": (
    <span className="relative flex size-12 items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-green-400/20" />
      <span className="absolute inset-2.5 rounded-full bg-green-400/30" />
      <span className="relative size-3.5 rounded-full bg-green-500" />
    </span>
  ),

  // AI
  "ai-chat-bubble": (
    <div className="flex w-48 flex-col gap-2">
      <span className="flex items-center gap-1.5 self-end rounded-[12px] rounded-tr-[4px] bg-heading px-3 py-2"><Bar w="56px" className="bg-page/60" /></span>
      <span className="flex items-start gap-1.5">
        <span className="size-5 shrink-0 rounded-full bg-heading" />
        <span className="flex w-32 flex-col gap-1.5 rounded-[12px] rounded-tl-[4px] border border-border bg-background px-3 py-2 shadow-sketch"><Bar w="100%" /><Bar w="60%" /></span>
      </span>
    </div>
  ),
  "prompt-input": (
    <Frame className="w-52 rounded-[14px]">
      <Bar w="55%" />
      <span className="mt-5 flex items-center justify-between"><span className="size-4 rounded-[4px] border border-border" /><span className="flex size-6 items-center justify-center rounded-[7px] bg-heading"><span className="h-2.5 w-px bg-page" /></span></span>
    </Frame>
  ),
  "streaming-text": (
    <div className="flex w-48 flex-wrap items-center gap-1.5">
      {["40px", "28px", "52px", "34px", "46px"].map((w, i) => <Bar key={i} w={w} className="bg-heading/50" />)}
      <span className="h-3.5 w-[2px] animate-pulse bg-heading" />
    </div>
  ),
  "model-selector": (
    <div className="flex flex-col items-start gap-1.5">
      <Frame className="flex h-7 items-center gap-1.5 px-2.5 py-0"><Dot className="size-1.5 bg-green-500" /><Bar w="44px" className="bg-heading/60" /><I icon={ArrowDown01Icon} /></Frame>
      <Frame className="flex w-44 flex-col gap-2.5 p-2.5">
        {[["50%", 2], ["40%", 1]].map(([w, n], i) => (
          <span key={i} className="flex flex-col gap-1"><Bar w={w as string} className={i === 0 ? "bg-heading/60" : undefined} /><span className="flex gap-1">{Array.from({ length: n as number }).map((_, j) => <span key={j} className="h-2.5 w-7 rounded-full border border-border bg-surface" />)}</span></span>
        ))}
      </Frame>
    </div>
  ),
  "ai-thinking-indicator": (
    <Frame className="flex w-48 items-center gap-2.5">
      <span className="flex size-6 items-center justify-center rounded-full bg-heading"><I icon={SparklesIcon} className="text-page" /></span>
      <span className="h-[7px] flex-1 rounded-full bg-gradient-to-r from-border-strong via-heading/50 to-border-strong" />
      <Bar w="18px" className="h-[5px]" />
    </Frame>
  ),
  "token-counter": (
    <Frame className="flex w-44 flex-col gap-2">
      <span className="flex items-center justify-between"><Bar w="35%" /><span className="font-mono text-[10px] text-muted-foreground">2.4k / 8k</span></span>
      <span className="h-1.5 overflow-hidden rounded-full bg-border-strong"><span className="block h-full w-[30%] rounded-full bg-heading" /></span>
    </Frame>
  ),
  "citation-card": (
    <div className="flex w-48 flex-col gap-2">
      <span className="flex flex-wrap items-center gap-1.5"><Bar w="60px" /><span className="flex size-3.5 items-center justify-center rounded-[3px] bg-heading font-mono text-[8px] text-page">1</span><Bar w="44px" /><Bar w="30px" /></span>
      <Frame className="flex items-center gap-2 p-2"><span className="size-4 rounded-[4px] bg-border-strong" /><span className="flex flex-1 flex-col gap-1"><Bar w="70%" className="bg-heading/50" /><Bar w="45%" className="h-[5px]" /></span></Frame>
    </div>
  ),
  "suggestion-chips": (
    <div className="flex w-52 flex-wrap justify-center gap-1.5">
      {["56px", "44px", "64px", "38px"].map((w, i) => (
        <span key={i} className="flex h-7 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 shadow-sketch"><I icon={SparklesIcon} className="size-2.5" /><Bar w={w} /></span>
      ))}
    </div>
  ),

  // Navigation & Layout
  "floating-dock": (
    <div className="flex items-end gap-1.5 rounded-[14px] border border-border bg-background p-1.5 shadow-sketch">
      <span className="size-6 rounded-[6px] bg-accent" /><span className="size-8 rounded-[7px] bg-accent" /><span className="size-10 rounded-[9px] bg-heading" /><span className="size-8 rounded-[7px] bg-accent" /><span className="size-6 rounded-[6px] bg-accent" />
    </div>
  ),
  "breadcrumb-trail": (
    <div className="flex items-center gap-1.5">
      <Bar w="28px" /><I icon={ArrowRight01Icon} /><span className="flex h-5 items-center rounded-[5px] border border-border bg-background px-1.5 shadow-sketch"><span className="flex gap-0.5"><Dot className="size-1" /><Dot className="size-1" /><Dot className="size-1" /></span></span><I icon={ArrowRight01Icon} /><Bar w="40px" className="bg-heading/70" />
    </div>
  ),
  "sidebar-nav": (
    <Frame className="flex h-24 w-48 gap-0 p-0">
      <span className="flex w-16 flex-col gap-2 border-r border-border p-2">
        <Bar w="70%" /><span className="-mx-1 rounded-[4px] bg-accent px-1 py-1"><Bar w="80%" className="bg-heading/60" /></span><Bar w="60%" /><Bar w="75%" />
      </span>
      <span className="flex flex-1 flex-col gap-2 p-2.5"><Bar w="55%" className="bg-heading/50" /><Bar w="85%" /><Bar w="70%" /></span>
    </Frame>
  ),
  "bento-grid": (
    <div className="grid w-48 grid-cols-3 grid-rows-2 gap-1.5">
      <Frame className="col-span-2 h-10 p-0" /><Frame className="row-span-2 p-0" /><Frame className="h-10 p-0" /><Frame className="h-10 bg-heading p-0" />
    </div>
  ),
  "section-nav": (
    <div className="flex w-40 flex-col gap-2.5 border-l border-border pl-3">
      <Bar w="55%" /><span className="relative"><span className="absolute -left-3 -top-1 h-4 w-px bg-heading" /><Bar w="70%" className="bg-heading/70" /></span><Bar w="45%" /><Bar w="60%" />
    </div>
  ),
  "mega-menu": (
    <div className="flex w-52 flex-col gap-1.5">
      <Frame className="flex h-7 items-center gap-2 px-2.5 py-0"><Bar w="22px" className="bg-heading/60" /><Bar w="22px" /><Bar w="22px" /></Frame>
      <Frame className="grid grid-cols-3 gap-2 p-2.5">
        {[0, 1, 2].map((c) => <span key={c} className="flex flex-col gap-1.5"><Bar w="70%" className="bg-heading/50" /><Bar w="90%" /><Bar w="60%" /></span>)}
      </Frame>
    </div>
  ),
};

const categoryDefault: Record<ComponentCategory, React.ReactNode> = {
  interactive: sketches["animated-segmented-control"],
  "cards-data": sketches["metric-card"],
  "forms-inputs": sketches["tag-input"],
  "motion-feedback": sketches["animated-counter"],
  ai: sketches["ai-chat-bubble"],
  "navigation-layout": sketches["floating-dock"],
};

export function ComponentThumbnail({ slug, category }: { slug: string; category: ComponentCategory }) {
  return (
    <div className="pointer-events-none flex scale-[0.96] items-center justify-center transition-transform duration-300 ease-out-strong group-hover/card:scale-100">
      {sketches[slug] ?? categoryDefault[category]}
    </div>
  );
}
