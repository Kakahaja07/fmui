"use client";

import { Fragment } from "react";
import { DropdownMenu } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { ArrowRight01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  id: string;
  label: string;
  /** Renders the crumb as a link. Without it the crumb is a button that only calls onNavigate. */
  href?: string;
  icon?: IconSvgElement;
}

export interface BreadcrumbTrailProps {
  /** The path from the root to the current page. The last item is the current page. */
  items: BreadcrumbItem[];
  /** Most crumbs to show, counting the overflow menu. Beyond this the middle collapses. Minimum 3. */
  maxItems?: number;
  /** Called when a visible crumb or a crumb in the overflow menu is chosen. */
  onNavigate?: (item: BreadcrumbItem) => void;
  className?: string;
}

const crumbClass =
  "inline-flex h-7 max-w-[160px] items-center gap-1.5 rounded-[8px] px-1.5 text-[13px] text-muted-foreground outline-none transition-[color,background-color,scale] duration-150 ease-out-strong hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]";

const menuItemClass =
  "flex w-full cursor-default select-none items-center gap-2 rounded-[8px] px-2.5 py-2 text-sm text-foreground outline-none data-[highlighted]:bg-accent";

function CrumbContent({ item }: { item: BreadcrumbItem }) {
  return (
    <>
      {item.icon && <HugeiconsIcon icon={item.icon} size={15} strokeWidth={1.8} className="shrink-0" />}
      <span className="truncate">{item.label}</span>
    </>
  );
}

function Separator() {
  return (
    <li role="presentation" aria-hidden="true" className="flex text-muted-foreground/60">
      <HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2} className="mx-0.5" />
    </li>
  );
}

/**
 * Breadcrumbs that keep the first crumb and the tail visible and fold the
 * middle of a deep path into an overflow menu.
 */
export function BreadcrumbTrail({ items, maxItems = 4, onNavigate, className }: BreadcrumbTrailProps) {
  const max = Math.max(3, maxItems);
  const collapsed = items.length > max;
  // First crumb + overflow menu + the last (max - 2) crumbs.
  const tailStart = collapsed ? items.length - (max - 2) : 1;
  const hidden = collapsed ? items.slice(1, tailStart) : [];
  const visible = collapsed ? [items[0], ...items.slice(tailStart)] : items;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center">
        {visible.map((item, index) => {
          const current = index === visible.length - 1;
          return (
            <Fragment key={item.id}>
              <li className="flex min-w-0">
                {current ? (
                  <span
                    aria-current="page"
                    className="inline-flex h-7 max-w-[200px] items-center gap-1.5 px-1.5 text-[13px] font-medium text-heading animate-in fade-in-0 slide-in-from-left-1 duration-200 motion-reduce:animate-none"
                  >
                    <CrumbContent item={item} />
                  </span>
                ) : item.href ? (
                  <a href={item.href} onClick={() => onNavigate?.(item)} className={crumbClass}>
                    <CrumbContent item={item} />
                  </a>
                ) : (
                  <button type="button" onClick={() => onNavigate?.(item)} className={crumbClass}>
                    <CrumbContent item={item} />
                  </button>
                )}
              </li>
              {!current && <Separator />}
              {index === 0 && hidden.length > 0 && (
                <>
                  <li className="flex">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger
                        aria-label={`Show ${hidden.length} hidden ${hidden.length === 1 ? "level" : "levels"}`}
                        className={cn(crumbClass, "w-7 justify-center px-0 data-[state=open]:bg-accent data-[state=open]:text-foreground")}
                      >
                        <HugeiconsIcon icon={MoreHorizontalIcon} size={16} strokeWidth={2} />
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          align="start"
                          sideOffset={6}
                          className="z-50 min-w-44 max-w-64 origin-(--radix-dropdown-menu-content-transform-origin) rounded-[12px] border border-border bg-background p-1 shadow-float data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] duration-150 [&_svg]:text-muted-foreground"
                        >
                          {hidden.map((h) =>
                            h.href ? (
                              <DropdownMenu.Item key={h.id} asChild onSelect={() => onNavigate?.(h)}>
                                <a href={h.href} className={menuItemClass}>
                                  <CrumbContent item={h} />
                                </a>
                              </DropdownMenu.Item>
                            ) : (
                              <DropdownMenu.Item key={h.id} onSelect={() => onNavigate?.(h)} className={menuItemClass}>
                                <CrumbContent item={h} />
                              </DropdownMenu.Item>
                            ),
                          )}
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </li>
                  <Separator />
                </>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
