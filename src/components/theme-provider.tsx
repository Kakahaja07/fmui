"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SearchCommandProvider } from "@/components/layout/search-command";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <TooltipProvider delayDuration={300} skipDelayDuration={400}>
        <SearchCommandProvider>{children}</SearchCommandProvider>
      </TooltipProvider>
    </NextThemesProvider>
  );
}
