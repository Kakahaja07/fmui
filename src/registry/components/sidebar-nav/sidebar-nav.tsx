"use client";

import { useId, useLayoutEffect, useRef, useState, type MouseEvent, type ReactElement } from "react";
import { Tooltip } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { ArrowRight01Icon, SidebarLeftIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: IconSvgElement;
  badge?: string | number;
  /** Renders the item as a link. Without it the item is a button. */
  href?: string;
  /** Sub-items, shown in a collapsible section under this item. One level deep. */
  items?: SidebarNavItem[];
}

export interface SidebarNavGroup {
  id: string;
  label: string;
  items: SidebarNavItem[];
}

export interface SidebarNavProps {
  groups: SidebarNavGroup[];
  /** Id of the active item (controlled). */
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Icons-only mode (controlled). */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  "aria-label"?: string;
  className?: string;
}

const rowClass =
  "relative z-10 flex w-full items-center gap-2.5 rounded-[10px] px-3 text-left text-[13px] outline-none transition-[color,background-color,scale] duration-150 ease-out-strong focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]";

/**
 * An app sidebar with grouped items, collapsible sub-sections, a sliding
 * active indicator, and an icons-only mode with tooltips.
 */
export function SidebarNav({
  groups,
  value: valueProp,
  defaultValue,
  onValueChange,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  "aria-label": ariaLabel = "Sidebar",
  className,
}: SidebarNavProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const value = valueProp ?? valueState;
  const [collapsedState, setCollapsedState] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? collapsedState;
  const baseId = useId();

  const parentOf = new Map<string, string>();
  for (const item of groups.flatMap((g) => g.items)) item.items?.forEach((child) => parentOf.set(child.id, item.id));

  // Sections start open when they hold the active item.
  const [open, setOpen] = useState(() => new Set(value && parentOf.has(value) ? [parentOf.get(value)!] : []));
  const parent = value ? parentOf.get(value) : undefined;
  // When the active item is hidden inside a closed section, the indicator sits on its parent.
  const target = parent && (collapsed || !open.has(parent)) ? parent : value;

  const scrollRef = useRef<HTMLDivElement>(null);
  const animateNext = useRef(false);
  const last = useRef({ y: -1, h: -1 });
  const [indicator, setIndicator] = useState<{ y: number; h: number; animate: boolean } | null>(null);

  useLayoutEffect(() => {
    const root = scrollRef.current;
    if (!root || !target) return setIndicator(null);
    const measure = (animate: boolean) => {
      const el = root.querySelector<HTMLElement>(`[data-nav-id="${CSS.escape(target)}"]`);
      if (!el) return;
      const y = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
      const h = el.offsetHeight;
      if (y === last.current.y && h === last.current.h) return;
      last.current = { y, h };
      setIndicator({ y, h, animate });
    };
    measure(animateNext.current);
    animateNext.current = false;
    // Sections opening above the active item move it: follow the layout frame by frame.
    const ro = new ResizeObserver(() => measure(false));
    ro.observe(root.firstElementChild ?? root);
    return () => ro.disconnect();
  }, [target]);

  // Pointer clicks slide the indicator; keyboard activation (detail 0) moves it instantly.
  const track = (e: MouseEvent) => {
    animateNext.current = e.detail !== 0;
  };

  function select(id: string) {
    if (valueProp === undefined) setValueState(id);
    onValueChange?.(id);
  }

  function setCollapsed(next: boolean) {
    if (collapsedProp === undefined) setCollapsedState(next);
    onCollapsedChange?.(next);
  }

  function toggleSection(id: string) {
    const next = new Set(open);
    if (collapsed) {
      next.add(id);
      setCollapsed(false);
    } else if (!next.delete(id)) next.add(id);
    setOpen(next);
  }

  // Tooltips only exist in icons-only mode, where labels are hidden.
  const withTooltip = (label: string, row: ReactElement) =>
    collapsed ? (
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{row}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            sideOffset={10}
            className="z-50 rounded-[8px] bg-primary px-2 py-1 text-xs font-medium text-primary-foreground shadow-float data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-[0.97] duration-150"
          >
            {label}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    ) : (
      row
    );

  function renderItem(item: SidebarNavItem, nested: boolean) {
    const active = item.id === value;
    const isParent = !!item.items?.length;
    const sectionOpen = isParent && open.has(item.id) && !collapsed;
    const highlighted = item.id === target || (isParent && item.id === parent);
    const content = (
      <>
        {item.icon && (
          <HugeiconsIcon
            icon={item.icon}
            size={16}
            strokeWidth={1.8}
            className={cn("shrink-0 transition-colors duration-150", highlighted ? "text-[#3358eb]" : "text-muted-foreground")}
          />
        )}
        <span className={cn("truncate transition-opacity duration-150", collapsed && "opacity-0")}>{item.label}</span>
        {item.badge !== undefined && (
          <>
            <span
              className={cn(
                "ml-auto rounded-full bg-[#3358eb]/10 px-1.5 text-[11px] font-semibold leading-[18px] text-[#3358eb] transition-opacity duration-150",
                collapsed && "opacity-0",
              )}
            >
              {item.badge}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-[26px] top-1.5 size-1.5 rounded-full bg-[#3358eb] transition-opacity duration-150",
                !collapsed && "opacity-0",
              )}
            />
          </>
        )}
        {isParent && (
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={14}
            strokeWidth={2}
            aria-hidden="true"
            className={cn(
              "ml-auto shrink-0 text-muted-foreground transition-[rotate,opacity] duration-200 ease-out-strong",
              sectionOpen && "rotate-90",
              collapsed && "opacity-0",
            )}
          />
        )}
      </>
    );
    const rowProps = {
      "data-nav-id": item.id,
      className: cn(
        rowClass,
        nested ? "h-7 pl-9" : "h-8",
        highlighted ? "font-medium text-heading" : "text-muted-foreground hover:bg-accent hover:text-foreground",
      ),
    };

    if (isParent) {
      const sectionId = `${baseId}-${item.id}`;
      return (
        <li key={item.id}>
          {withTooltip(
            item.label,
            <button
              type="button"
              aria-expanded={sectionOpen}
              aria-controls={sectionId}
              onClick={(e) => {
                track(e);
                toggleSection(item.id);
              }}
              {...rowProps}
            >
              {content}
            </button>,
          )}
          <div
            className="grid transition-[grid-template-rows] duration-200 ease-out-strong motion-reduce:transition-none"
            style={{ gridTemplateRows: sectionOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <ul
                id={sectionId}
                inert={!sectionOpen}
                className="relative space-y-0.5 py-0.5 before:absolute before:inset-y-1 before:left-5 before:w-px before:bg-border"
              >
                {item.items!.map((child) => renderItem(child, true))}
              </ul>
            </div>
          </div>
        </li>
      );
    }

    const onClick = (e: MouseEvent) => {
      track(e);
      select(item.id);
    };
    return (
      <li key={item.id}>
        {withTooltip(
          item.label,
          item.href ? (
            <a href={item.href} aria-current={active ? "page" : undefined} onClick={onClick} {...rowProps}>
              {content}
            </a>
          ) : (
            <button type="button" aria-current={active ? "page" : undefined} onClick={onClick} {...rowProps}>
              {content}
            </button>
          ),
        )}
      </li>
    );
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <nav
        aria-label={ariaLabel}
        className={cn(
          "flex h-full shrink-0 flex-col overflow-hidden border-r border-border bg-surface transition-[width] duration-200 ease-out-strong motion-reduce:transition-none",
          collapsed ? "w-14" : "w-56",
          className,
        )}
      >
        <div ref={scrollRef} className="relative flex-1 overflow-y-auto overflow-x-hidden p-2">
          <div className="space-y-3">
            {groups.map((group) => (
              <div key={group.id}>
                <div
                  id={`${baseId}-${group.id}-label`}
                  className={cn(
                    "flex h-7 items-center whitespace-nowrap px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground transition-opacity duration-150",
                    collapsed && "opacity-0",
                  )}
                >
                  {group.label}
                </div>
                <ul aria-labelledby={`${baseId}-${group.id}-label`} className="space-y-0.5">
                  {group.items.map((item) => renderItem(item, false))}
                </ul>
              </div>
            ))}
          </div>
          {indicator && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-2 top-0 rounded-[10px] bg-background shadow-xs ring-1 ring-border",
                indicator.animate && "transition-transform duration-200 ease-out-strong motion-reduce:transition-none",
              )}
              style={{ transform: `translateY(${indicator.y}px)`, height: indicator.h }}
            />
          )}
        </div>
        <div className="border-t border-border p-2">
          {withTooltip(
            "Expand sidebar",
            <button
              type="button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed(!collapsed)}
              className={cn(rowClass, "h-8 text-muted-foreground hover:bg-accent hover:text-foreground")}
            >
              <HugeiconsIcon icon={SidebarLeftIcon} size={16} strokeWidth={1.8} className="shrink-0" />
              <span className={cn("truncate transition-opacity duration-150", collapsed && "opacity-0")}>Collapse</span>
            </button>,
          )}
        </div>
      </nav>
    </Tooltip.Provider>
  );
}
