import Link from "next/link";

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  /** Optional trailing text link, e.g. "View all". */
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="max-w-[560px]">
        <h2 className="text-balance text-[24px] leading-[1.15] tracking-[-0.035em] md:text-[28px]">{title}</h2>
        {description && <p className="mt-2 text-pretty text-[15px] leading-6 text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1 rounded-[6px] text-[13px] font-semibold text-muted-foreground transition-colors duration-150 hover:text-heading"
        >
          {action.label}
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" className="transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5">
            <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}
