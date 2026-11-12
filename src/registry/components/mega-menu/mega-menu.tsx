"use client";

import { useId, useState, type ReactNode } from "react";
import { NavigationMenu } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface MegaMenuLink {
  id: string;
  title: string;
  description?: string;
  icon?: IconSvgElement;
  /** Renders a link. Without it the entry is a button that only calls onNavigate. */
  href?: string;
  /** Artwork for the preview column. Defaults to the link's icon on a tinted card. */
  preview?: ReactNode;
}

export interface MegaMenuGroup {
  label: string;
  links: MegaMenuLink[];
}

export interface MegaMenuPanel {
  id: string;
  label: string;
  /** Grouped links shown in the panel. Leave out for a plain top-level link. */
  groups?: MegaMenuGroup[];
  href?: string;
}

export interface MegaMenuProps {
  panels: MegaMenuPanel[];
  /** Called when a link (or a top-level panel without groups) is chosen. */
  onNavigate?: (item: MegaMenuLink | MegaMenuPanel) => void;
  className?: string;
}

const topClass =
  "group inline-flex h-9 items-center gap-1 rounded-[10px] px-3 text-[13px] font-medium text-muted-foreground outline-none transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent data-[state=open]:text-heading";

function Panel({ groups, onNavigate }: { groups: MegaMenuGroup[]; onNavigate?: MegaMenuProps["onNavigate"] }) {
  const baseId = useId();
  const links = groups.flatMap((g) => g.links);
  // Pointer moves crossfade the preview; keyboard focus swaps it instantly.
  const [preview, setPreview] = useState({ id: links[0]?.id, animate: false });
  const shown = links.find((l) => l.id === preview.id) ?? links[0];
  const show = (id: string, animate: boolean) => setPreview((p) => (p.id === id ? p : { id, animate }));

  return (
    <div className="flex gap-2 p-2">
      {groups.map((group, g) => (
        <div key={group.label} className="w-44">
          <p id={`${baseId}-${g}`} className="px-2.5 pt-1.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {group.label}
          </p>
          <ul aria-labelledby={`${baseId}-${g}`}>
            {group.links.map((link) => {
              const body = (
                <>
                  {link.icon && (
                    <span className="grid size-8 shrink-0 place-items-center rounded-[9px] border border-border bg-surface text-muted-foreground transition-colors duration-150 group-data-[previewed=true]/link:text-[#3358eb]">
                      <HugeiconsIcon icon={link.icon} size={16} strokeWidth={1.8} />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold leading-5 text-heading">{link.title}</span>
                    {link.description && (
                      <span className="line-clamp-2 block text-xs leading-4 text-muted-foreground">{link.description}</span>
                    )}
                  </span>
                </>
              );
              const props = {
                "data-previewed": link.id === shown?.id,
                onPointerEnter: () => show(link.id, true),
                onFocus: () => show(link.id, false),
                className:
                  "group/link flex w-full items-start gap-2.5 rounded-[12px] px-2.5 py-2 text-left outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring data-[previewed=true]:bg-accent",
              };
              return (
                <li key={link.id}>
                  <NavigationMenu.Link asChild onSelect={() => onNavigate?.(link)}>
                    {link.href ? (
                      <a href={link.href} {...props}>
                        {body}
                      </a>
                    ) : (
                      <button type="button" {...props}>
                        {body}
                      </button>
                    )}
                  </NavigationMenu.Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {shown && (
        <div aria-hidden="true" className="w-40 shrink-0 rounded-[14px] bg-surface p-2">
          <div
            key={shown.id}
            className={cn(preview.animate && "animate-in fade-in-0 duration-150 motion-reduce:animate-none")}
          >
            <div className="relative grid h-24 place-items-center overflow-hidden rounded-[10px] bg-[#3358eb]/10 text-[#3358eb]">
              {shown.preview ?? (shown.icon && <HugeiconsIcon icon={shown.icon} size={32} strokeWidth={1.5} />)}
            </div>
            <p className="mt-2.5 px-1 text-[13px] font-semibold text-heading">{shown.title}</p>
            {shown.description && <p className="px-1 text-xs leading-4 text-muted-foreground">{shown.description}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * A site header menu built on Radix NavigationMenu: triggers open wide
 * panels of grouped links with a preview column, and the panel resizes
 * smoothly as you move between triggers.
 */
export function MegaMenu({ panels, onNavigate, className }: MegaMenuProps) {
  return (
    <NavigationMenu.Root className={cn("relative z-20", className)}>
      <NavigationMenu.List className="flex items-center gap-0.5">
        {panels.map((panel) =>
          panel.groups ? (
            <NavigationMenu.Item key={panel.id} value={panel.id}>
              <NavigationMenu.Trigger className={topClass}>
                {panel.label}
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={13}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="transition-[rotate] duration-200 ease-out-strong group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-0 left-0 duration-200 ease-out-strong data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in-0 data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out-0 data-[motion=from-end]:slide-in-from-right-6 data-[motion=from-start]:slide-in-from-left-6 data-[motion=to-end]:slide-out-to-right-6 data-[motion=to-start]:slide-out-to-left-6 motion-reduce:[--tw-enter-translate-x:0] motion-reduce:[--tw-exit-translate-x:0]">
                <Panel groups={panel.groups} onNavigate={onNavigate} />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item key={panel.id}>
              <NavigationMenu.Link asChild onSelect={() => onNavigate?.(panel)}>
                {panel.href ? (
                  <a href={panel.href} className={topClass}>
                    {panel.label}
                  </a>
                ) : (
                  <button type="button" className={topClass}>
                    {panel.label}
                  </button>
                )}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>
      <div className="absolute top-full left-0 pt-2">
        <NavigationMenu.Viewport className="relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-top-left overflow-hidden rounded-[18px] border border-border bg-background shadow-float transition-[width,height] duration-200 ease-out-strong data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.97] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.97] motion-reduce:transition-none" />
      </div>
    </NavigationMenu.Root>
  );
}
