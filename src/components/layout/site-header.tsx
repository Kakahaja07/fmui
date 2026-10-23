import { Suspense } from "react";
import { siteConfig } from "@/lib/metadata";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Wordmark } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MainNav, MainNavLinks } from "@/components/layout/main-nav";
import { SearchTrigger } from "@/components/layout/search-trigger";
import { GithubLink } from "@/components/layout/github-link";
import { FrameNodes } from "@/components/layout/frame";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-(--header-height) border-b border-border bg-page/80 backdrop-blur-md">
      <div className="container-site relative flex h-full items-center justify-between gap-4">
        <Wordmark />

        <div className="flex items-center gap-1">
          <nav aria-label="Main" className="mr-2 hidden items-center gap-0.5 md:flex">
            <Suspense fallback={<MainNavLinks />}>
              <MainNav />
            </Suspense>
          </nav>
          <SearchTrigger />
          <span aria-hidden="true" className="mx-2 hidden h-5 w-px bg-border md:block" />
          {siteConfig.githubRepo && (
            <Suspense fallback={null}>
              <GithubLink />
            </Suspense>
          )}
          <ThemeToggle />
          <MobileNav />
        </div>
        <FrameNodes edge="bottom" />
      </div>
    </header>
  );
}
