import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export interface BentoGridProps {
  /** Columns once the grid's container is at least 512px wide. Narrower containers stack tiles in one column. */
  columns?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

export interface BentoTileProps {
  /** Columns this tile spans in the multi-column layout. */
  colSpan?: 1 | 2 | 3 | 4;
  /** Rows this tile spans in the multi-column layout. */
  rowSpan?: 1 | 2;
  title?: string;
  description?: string;
  icon?: IconSvgElement;
  /** Artwork shown above the text, filling the tile's free space. */
  visual?: ReactNode;
  children?: ReactNode;
  className?: string;
}

// Full class names so Tailwind can see them.
const COLUMNS = { 2: "@lg:grid-cols-2", 3: "@lg:grid-cols-3", 4: "@lg:grid-cols-4" };
const COL_SPAN = { 1: "", 2: "@lg:col-span-2", 3: "@lg:col-span-3", 4: "@lg:col-span-4" };
const ROW_SPAN = { 1: "", 2: "@lg:row-span-2" };

/**
 * A feature grid with mixed tile sizes. It responds to its own width (a
 * container query), so it works in a page section, a card, or a sidebar.
 */
export function BentoGrid({ columns = 3, children, className }: BentoGridProps) {
  return (
    <div className="@container">
      <ul
        role="list"
        className={cn("grid auto-rows-[minmax(152px,auto)] grid-cols-1 gap-3", COLUMNS[columns], className)}
      >
        {children}
      </ul>
    </div>
  );
}

/** One feature in a BentoGrid. Spans only apply in the multi-column layout. */
export function BentoTile({
  colSpan = 1,
  rowSpan = 1,
  title,
  description,
  icon,
  visual,
  children,
  className,
}: BentoTileProps) {
  return (
    <li
      className={cn(
        "flex flex-col overflow-hidden rounded-[20px] border border-border bg-surface p-1.5 shadow-xs transition-[translate,box-shadow] duration-200 ease-out-strong hover:-translate-y-0.5 hover:shadow-card motion-reduce:hover:translate-y-0",
        COL_SPAN[colSpan],
        ROW_SPAN[rowSpan],
        className,
      )}
    >
      {visual && (
        <div aria-hidden="true" className="relative min-h-16 flex-1 overflow-hidden rounded-[14px] bg-background">
          {visual}
        </div>
      )}
      {(title || description || icon) && (
        <div className={cn("flex gap-2.5 px-2.5 pt-2.5 pb-2", !visual && "mt-auto")}>
          {icon && (
            <span className="mt-px grid size-6 shrink-0 place-items-center rounded-[7px] bg-[#3358eb]/10 text-[#3358eb]">
              <HugeiconsIcon icon={icon} size={14} strokeWidth={2} />
            </span>
          )}
          <div className="min-w-0">
            {title && <h3 className="text-[13px] font-semibold leading-5 text-heading">{title}</h3>}
            {description && <p className="text-xs leading-4 text-muted-foreground">{description}</p>}
          </div>
        </div>
      )}
      {children}
    </li>
  );
}
