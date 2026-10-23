import { cn } from "@/lib/utils";

/**
 * One card style for components and blocks: a white shell with a small inset,
 * a light gray preview panel, and a single footer row (name left, detail right).
 */
export const showcaseCard = {
  shell:
    "group/card flex h-full flex-col rounded-[14px] border border-border bg-background p-1.5 shadow-xs transition-[transform,box-shadow,border-color] duration-200 ease-out-strong hover:border-border-strong hover:shadow-card motion-safe:hover:-translate-y-0.5",
  panel: "relative overflow-hidden rounded-[10px] border border-border bg-surface",
};

export function ShowcaseCardFooter({
  title,
  aside,
  className,
}: {
  title: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3 px-2.5 pb-1.5 pt-3", className)}>
      <h3 className="flex min-w-0 items-center gap-2 text-[15px] leading-5 tracking-[-0.015em]">{title}</h3>
      {aside && <div className="shrink-0 text-[12.5px] tabular-nums text-muted-foreground">{aside}</div>}
    </div>
  );
}
