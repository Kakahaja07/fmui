import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface ComparisonPlan {
  id: string;
  name: string;
  /** Short line under the name, e.g. "$12 / mo". */
  price?: string;
}

/** `true` renders a check, `false` a dash, strings and numbers render as text. */
export type ComparisonValue = boolean | string | number;

export interface ComparisonSection {
  title: string;
  rows: { feature: string; values: Record<string, ComparisonValue> }[];
}

export interface ComparisonTableProps {
  plans: ComparisonPlan[];
  sections: ComparisonSection[];
  /** Plan id whose column is tinted and badged. */
  highlight?: string;
  /** Badge text on the highlighted plan. */
  badge?: string;
  /** Read by screen readers as the table's name. */
  caption?: string;
  /** Height of the scroll area in px. The header row sticks inside it. */
  maxHeight?: number;
  className?: string;
}

// Sticky cells need an opaque fill; the gradient layers the blue tint over the background color.
const TINT = "bg-[#3358eb]/[0.05]";
const STICKY_TINT = "bg-background bg-linear-to-b from-[#3358eb]/[0.05] to-[#3358eb]/[0.05]";

function Value({ value }: { value: ComparisonValue | undefined }) {
  if (value === true)
    return (
      <>
        <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={2.5} className="mx-auto text-heading" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false || value === undefined)
    return (
      <>
        <span aria-hidden="true" className="mx-auto block h-px w-2.5 bg-border-strong" />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="text-[13px] text-foreground">{typeof value === "number" ? value.toLocaleString("en-US") : value}</span>;
}

/**
 * A plan comparison grid. The header row sticks while the body scrolls, and the
 * feature column sticks when the plans overflow sideways on narrow screens.
 */
export function ComparisonTable({
  plans,
  sections,
  highlight,
  badge = "Popular",
  caption = "Plan comparison",
  maxHeight = 320,
  className,
}: ComparisonTableProps) {
  return (
    <div className={cn("w-full rounded-[20px] bg-accent p-1.5", className)}>
      <div
        role="region"
        aria-label={caption}
        tabIndex={0}
        style={{ maxHeight }}
        className="overflow-auto overscroll-contain rounded-[14px] bg-background shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#3358eb]/40"
      >
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 top-0 z-20 min-w-36 border-b border-border bg-background shadow-[1px_0_0_var(--color-border)]"
              >
                <span className="sr-only">Feature</span>
              </th>
              {plans.map((plan) => {
                const on = plan.id === highlight;
                return (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn(
                      "sticky top-0 z-10 min-w-24 border-b border-border px-3 pb-2.5 pt-3 text-center align-top font-normal",
                      on ? STICKY_TINT : "bg-background",
                    )}
                  >
                    <span className="block text-[13px]/[18px] font-semibold text-heading">{plan.name}</span>
                    {plan.price && <span className="block text-xs text-muted-foreground">{plan.price}</span>}
                    {on && (
                      <span className="mt-1.5 inline-block rounded-full bg-[#3358eb] px-1.5 py-px text-[10px] font-semibold text-white">
                        {badge}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          {sections.map((section) => (
            <tbody key={section.title}>
              <tr>
                <th
                  scope="rowgroup"
                  colSpan={plans.length + 1}
                  className="border-b border-border bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {/* The cell spans the full width, so the label itself sticks during sideways scroll. */}
                  <span className="sticky left-3">{section.title}</span>
                </th>
              </tr>
              {section.rows.map((row) => (
                <tr key={row.feature}>
                  <th
                    scope="row"
                    className="sticky left-0 z-[1] border-b border-border bg-background px-3 py-2.5 text-[13px] font-normal text-foreground shadow-[1px_0_0_var(--color-border)]"
                  >
                    {row.feature}
                  </th>
                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={cn("border-b border-border px-3 py-2.5 text-center", plan.id === highlight && TINT)}
                    >
                      <Value value={row.values[plan.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
