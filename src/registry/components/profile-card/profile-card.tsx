"use client";

import { useState } from "react";
import { DropdownMenu } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Message01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface ProfileMenuAction {
  id: string;
  label: string;
  destructive?: boolean;
}

export interface ProfileCardProps {
  name: string;
  role?: string;
  /** Shown after the role, e.g. "@maya". */
  handle?: string;
  /** Image URL. Initials on `color` are shown when it is missing or fails to load. */
  avatarSrc?: string;
  /** Background of the initials fallback. */
  color?: string;
  status?: "online" | "away" | "offline";
  stats?: { label: string; value: string | number }[];
  following?: boolean;
  defaultFollowing?: boolean;
  onFollowingChange?: (following: boolean) => void;
  onMessage?: () => void;
  /** Items in the "more" menu. The menu button is hidden when empty. */
  menu?: ProfileMenuAction[];
  onMenuAction?: (id: string) => void;
  className?: string;
}

const STATUS = { online: "bg-[#1f9d74]", away: "bg-amber-500", offline: "bg-border-strong" };
const itemClass =
  "flex cursor-default select-none items-center rounded-[8px] px-2.5 py-1.5 text-[13px] outline-none data-[highlighted]:bg-accent";
const pressable = "transition-transform duration-150 ease-out-strong active:scale-[0.97]";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** A person at a glance: avatar, role, a few stats, and follow / message / more actions. */
export function ProfileCard({
  name,
  role,
  handle,
  avatarSrc,
  color = "#3358eb",
  status,
  stats = [],
  following: followingProp,
  defaultFollowing = false,
  onFollowingChange,
  onMessage,
  menu = [],
  onMenuAction,
  className,
}: ProfileCardProps) {
  const [followingState, setFollowingState] = useState(defaultFollowing);
  const following = followingProp ?? followingState;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = avatarSrc && !imageFailed;

  function toggleFollow() {
    const next = !following;
    if (followingProp === undefined) setFollowingState(next);
    onFollowingChange?.(next);
  }

  return (
    <div className={cn("w-[300px] rounded-[24px] bg-accent p-4", className)}>
      <div className="flex items-center gap-3">
        <span className="relative shrink-0">
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- standalone component, no next/image dependency
            <img
              src={avatarSrc}
              alt=""
              onError={() => setImageFailed(true)}
              className="size-12 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="grid size-12 place-items-center rounded-full text-[15px] font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              {initials(name)}
            </span>
          )}
          {status && (
            <span
              role="img"
              aria-label={status}
              className={cn("absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-accent", STATUS[status])}
            />
          )}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px]/[18px] font-semibold text-heading">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{[role, handle].filter(Boolean).join(" · ")}</p>
        </div>
      </div>

      {stats.length > 0 && (
        <dl
          className="mt-4 grid rounded-[14px] bg-background py-2.5 shadow-xs"
          style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center">
              <dt className="text-[11px] text-muted-foreground">{stat.label}</dt>
              <dd className="text-[14px]/[18px] font-semibold tabular-nums text-heading">
                {typeof stat.value === "number" ? stat.value.toLocaleString("en-US") : stat.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          aria-pressed={following}
          aria-label={`Follow ${name}`}
          onClick={toggleFollow}
          className={cn(
            "grid h-9 flex-1 rounded-[12px] text-[13px] font-semibold transition-[scale,background-color,color] duration-150 ease-out-strong active:scale-[0.97]",
            following ? "bg-background text-heading shadow-xs" : "bg-[#3358eb] text-white",
          )}
        >
          {/* Both labels share one grid cell, so the button keeps its width while they crossfade. */}
          {(["Follow", "Following"] as const).map((label) => {
            const shown = (label === "Following") === following;
            return (
              <span
                key={label}
                aria-hidden="true"
                className={cn(
                  "col-start-1 row-start-1 self-center transition-[opacity,filter,translate] duration-200 ease-out-strong",
                  shown ? "opacity-100 blur-0" : "translate-y-1 opacity-0 blur-[2px] motion-reduce:translate-y-0",
                )}
              >
                {label}
              </span>
            );
          })}
        </button>
        <button
          type="button"
          onClick={onMessage}
          className={cn(
            "inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[12px] bg-background text-[13px] font-semibold text-heading shadow-xs",
            pressable,
          )}
        >
          <HugeiconsIcon icon={Message01Icon} size={15} strokeWidth={2} aria-hidden="true" />
          Message
        </button>
        {menu.length > 0 && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                aria-label={`More actions for ${name}`}
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-[12px] bg-background text-muted-foreground shadow-xs data-[state=open]:text-heading",
                  pressable,
                )}
              >
                <HugeiconsIcon icon={MoreHorizontalIcon} size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={6}
                className="z-50 min-w-40 origin-(--radix-dropdown-menu-content-transform-origin) rounded-[12px] border border-border bg-background p-1 shadow-float data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] duration-150"
              >
                {menu.map((action) => (
                  <DropdownMenu.Item
                    key={action.id}
                    onSelect={() => onMenuAction?.(action.id)}
                    className={cn(itemClass, action.destructive ? "text-danger" : "text-foreground")}
                  >
                    {action.label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}
      </div>
    </div>
  );
}
