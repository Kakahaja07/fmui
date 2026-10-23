import { HugeiconsIcon } from "@hugeicons/react";
import { NewTwitterIcon } from "@hugeicons/core-free-icons";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const { author } = siteConfig;

/** "Developed by" line with the author's name linking to X. */
export function AuthorCredit({ className }: { className?: string }) {
  return (
    <span className={cn("text-[13px] leading-5 text-muted-foreground", className)}>
      Developed by{" "}
      <a
        href={author.x}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-heading underline-offset-4 hover:underline"
      >
        {author.name}
      </a>
    </span>
  );
}

/** Compact pill linking to the author's X profile. */
export function AuthorXLink({ className }: { className?: string }) {
  return (
    <a
      href={author.x}
      target="_blank"
      rel="noreferrer"
      aria-label={`${author.name} on X`}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-border bg-background px-2.5 text-[13px] font-semibold text-heading shadow-xs transition-[border-color,transform] duration-150 hover:border-border-strong active:scale-[0.97]",
        className,
      )}
    >
      <HugeiconsIcon icon={NewTwitterIcon} size={14} strokeWidth={2} />
      {author.handle}
    </a>
  );
}
