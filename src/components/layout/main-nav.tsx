"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function MainNavLinks({ pathname }: { pathname?: string }) {
  return (
    <>
      {mainNav.map((item) => {
        const active = !!pathname && (pathname === item.href || pathname.startsWith(item.href + "/"));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-[8px] px-2.5 py-1.5 text-[13.5px] font-medium transition-colors duration-150",
              active ? "bg-accent text-heading" : "text-muted-foreground hover:text-heading",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function MainNav() {
  const pathname = usePathname();
  return <MainNavLinks pathname={pathname} />;
}
