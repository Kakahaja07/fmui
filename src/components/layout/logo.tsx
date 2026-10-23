import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="FMUI home" className={cn("inline-flex items-center gap-2 rounded-[8px]", className)}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="8" className="fill-primary" />
        <path
          d="M8 20V8h8.5M8 14h6.5"
          className="stroke-primary-foreground"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="19" r="2" className="fill-primary-foreground" />
      </svg>
      <span className="font-heading text-[17px] font-semibold tracking-[-0.02em] text-foreground">FMUI</span>
    </Link>
  );
}
