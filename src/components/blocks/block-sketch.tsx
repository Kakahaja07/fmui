import { cn } from "@/lib/utils";

/**
 * Miniature page layouts for planned block groups. Pure markup, so a grid of
 * them stays cheap. Proportions are relative, so they scale with the card.
 */
const L = ({ w, className }: { w: string; className?: string }) => (
  <span className={cn("block h-[5px] shrink-0 rounded-full bg-border-strong", className)} style={{ width: w }} />
);
const Box = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={cn("rounded-[5px] border border-border bg-background", className)}>{children}</div>
);
const Dot = ({ className }: { className?: string }) => <span className={cn("block size-2 shrink-0 rounded-full bg-border-strong", className)} />;

function Screen({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("absolute inset-3 overflow-hidden rounded-[8px] border border-border bg-background shadow-sketch", className)}>
      {children}
    </div>
  );
}

const sketches: Record<string, React.ReactNode> = {
  "app-shell": (
    <Screen className="flex">
      <div className="flex w-[26%] flex-col gap-2 border-r border-border bg-surface/60 p-2">
        <span className="mb-1 flex items-center gap-1"><span className="size-2.5 rounded-[3px] bg-heading" /><L w="50%" className="bg-heading/60" /></span>
        <L w="70%" />
        <span className="-mx-1 rounded-[4px] bg-background px-1 py-1 shadow-xs ring-1 ring-border"><L w="80%" className="bg-heading/60" /></span>
        <L w="60%" /><L w="75%" /><L w="55%" />
        <span className="mt-auto flex items-center gap-1"><Dot className="size-2.5" /><L w="55%" /></span>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex h-6 items-center justify-between border-b border-border px-2">
          <span className="h-3 w-1/3 rounded-full border border-border bg-surface" />
          <Dot className="size-2.5 bg-heading/40" />
        </div>
        <div className="grid flex-1 grid-cols-3 grid-rows-[auto_1fr] gap-1.5 p-2">
          {[0, 1, 2].map((i) => (
            <Box key={i} className="flex flex-col gap-1 p-1.5"><L w="50%" /><span className="h-2 w-2/3 rounded-[2px] bg-heading/70" /></Box>
          ))}
          <Box className="col-span-3 flex flex-col gap-1.5 p-2"><L w="30%" className="bg-heading/50" /><L w="90%" /><L w="80%" /><L w="85%" /></Box>
        </div>
      </div>
    </Screen>
  ),
  analytics: (
    <Screen className="flex flex-col gap-2 p-2.5">
      <div className="flex items-center justify-between"><L w="30%" className="bg-heading/60" /><span className="h-3 w-12 rounded-[3px] bg-heading" /></div>
      <div className="grid grid-cols-4 gap-1.5">
        {["60%", "45%", "55%", "40%"].map((w, i) => (
          <Box key={i} className="flex flex-col gap-1 p-1.5"><L w="70%" /><span className="h-2 rounded-[2px] bg-heading/70" style={{ width: w }} /></Box>
        ))}
      </div>
      <Box className="relative h-[34%] p-1.5">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)]">
          <path d="M0 24 L12 20 L24 22 L36 14 L48 17 L60 9 L72 12 L84 6 L100 4" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="text-heading" />
        </svg>
      </Box>
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex items-center gap-2"><Dot /><L w="35%" /><L w="15%" className="ml-auto" /><span className="h-1.5 w-8 rounded-full bg-green-300 dark:bg-green-500/50" /></span>
        ))}
      </div>
    </Screen>
  ),
  "ai-chat": (
    <Screen className="flex flex-col items-center justify-center gap-2.5 p-3">
      <span className="flex size-5 items-center justify-center rounded-[5px] bg-heading"><span className="h-2 w-1 rounded-full bg-page" /></span>
      <L w="45%" className="h-2 bg-heading/70" />
      <Box className="flex w-[85%] flex-col gap-3 rounded-[8px] p-2 shadow-xs">
        <L w="65%" />
        <span className="flex items-center justify-between"><Dot className="size-2.5 rounded-[3px]" /><span className="flex size-3.5 items-center justify-center rounded-full bg-heading" /></span>
      </Box>
      <div className="flex gap-1">
        {["28px", "22px", "26px", "20px"].map((w, i) => (
          <span key={i} className="flex h-3.5 items-center rounded-full border border-border px-1.5"><L w={w} className="h-1" /></span>
        ))}
      </div>
    </Screen>
  ),
  pricing: (
    <Screen className="flex flex-col items-center gap-2 p-2.5">
      <L w="35%" className="h-2 bg-heading/70" />
      <span className="flex items-center gap-1"><L w="18px" /><span className="h-2.5 w-4 rounded-full bg-heading" /><L w="18px" /></span>
      <div className="grid w-full flex-1 grid-cols-3 gap-1.5">
        {[false, true, false].map((hi, i) => (
          <Box key={i} className={cn("flex flex-col gap-1.5 p-1.5", hi && "border-heading")}>
            <L w="50%" className={hi ? "bg-heading/60" : undefined} />
            <span className={cn("h-2.5 w-1/2 rounded-[2px]", hi ? "bg-heading" : "bg-border-strong")} />
            <L w="85%" /><L w="70%" /><L w="75%" />
            <span className={cn("mt-auto h-3 rounded-[3px]", hi ? "bg-heading" : "border border-border")} />
          </Box>
        ))}
      </div>
    </Screen>
  ),
  onboarding: (
    <Screen className="flex">
      <div className="flex w-[34%] flex-col gap-3 border-r border-border bg-surface/60 p-2.5">
        {[2, 1, 0].map((state, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-full border", state === 2 && "border-heading bg-heading", state === 1 && "border-heading", state === 0 && "border-border-strong")} />
            <L w="60%" className={state > 0 ? "bg-heading/50" : undefined} />
          </span>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <L w="45%" className="h-2 bg-heading/70" /><L w="70%" />
        <span className="mt-1 h-4 rounded-[4px] border border-border" />
        <span className="h-4 rounded-[4px] border border-border" />
        <span className="mt-auto h-4 w-1/3 self-end rounded-[4px] bg-heading" />
      </div>
    </Screen>
  ),
  activity: (
    <Screen className="flex flex-col gap-2.5 p-2.5">
      <div className="flex gap-1">{["All", "a", "b"].map((k, i) => <span key={k} className={cn("h-3 w-8 rounded-[3px]", i === 0 ? "bg-heading" : "bg-surface ring-1 ring-border")} />)}</div>
      <div className="relative flex flex-col gap-2.5 pl-1">
        <span className="absolute bottom-1 left-[8px] top-1 w-px bg-border" />
        {["65%", "50%", "70%", "45%"].map((w, i) => (
          <span key={i} className="relative flex items-center gap-2"><span className="size-3 shrink-0 rounded-full border border-border bg-surface" /><span className="flex flex-1 flex-col gap-1"><L w={w} className={i === 0 ? "bg-heading/50" : undefined} /><L w="20%" className="h-1 opacity-60" /></span></span>
        ))}
      </div>
    </Screen>
  ),
  "ai-agents": (
    <Screen className="flex flex-col gap-2 p-2.5">
      <div className="flex items-center justify-between"><L w="35%" className="h-2 bg-heading/70" /><span className="flex h-3 items-center gap-1 rounded-full bg-green-100 px-1.5 dark:bg-green-500/20"><Dot className="size-1 bg-green-500" /><L w="14px" className="h-1 bg-green-500/60" /></span></div>
      <Box className="flex flex-col gap-1.5 p-1.5">
        {[true, true, false].map((done, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-full", done ? "bg-heading" : "border-2 border-heading border-r-transparent")} />
            <L w={["55%", "45%", "60%"][i]} className={done ? undefined : "bg-heading/50"} />
          </span>
        ))}
      </Box>
      <Box className="flex flex-1 flex-col gap-1.5 p-1.5"><L w="80%" /><L w="90%" /><L w="60%" /><span className="h-2 w-px animate-pulse bg-heading" /></Box>
    </Screen>
  ),
  hero: (
    <Screen className="flex flex-col items-center gap-2 p-2.5">
      <div className="flex w-full items-center justify-between"><span className="size-2.5 rounded-[3px] bg-heading" /><span className="flex gap-1.5"><L w="14px" /><L w="14px" /><L w="14px" /></span><span className="h-2.5 w-6 rounded-[3px] bg-heading" /></div>
      <span className="mt-1 h-2.5 w-[70%] rounded-full bg-heading/80" />
      <span className="h-2.5 w-[50%] rounded-full bg-heading/80" />
      <L w="55%" />
      <span className="flex gap-1"><span className="h-3 w-10 rounded-[3px] bg-heading" /><span className="h-3 w-10 rounded-[3px] border border-border" /></span>
      <div className="mt-auto grid w-full grid-cols-3 grid-rows-2 gap-1">
        <Box className="col-span-2 h-4" /><Box className="row-span-2" /><Box className="h-4" /><Box className="h-4 bg-surface" />
      </div>
    </Screen>
  ),
};

export function BlockSketch({ id }: { id: string }) {
  return <>{sketches[id] ?? sketches["app-shell"]}</>;
}
