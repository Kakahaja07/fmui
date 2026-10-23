"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ComputerIcon, FullScreenIcon, Moon02Icon, RefreshIcon, SmartPhone01Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DemoRenderer } from "@/components/docs/demo-renderer";
import { CodeViewer, type CodeTab } from "@/components/docs/code-viewer";

interface CanvasProps {
  previewId: string;
  dark: boolean;
  mobile: boolean;
  resetKey: number;
  className?: string;
}

function Canvas({ previewId, dark, mobile, resetKey, className }: CanvasProps) {
  return (
    <div
      className={cn(
        "canvas-dots flex min-h-[340px] items-center justify-center overflow-hidden rounded-[14px] border border-border bg-page p-6 transition-colors",
        dark && "dark",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center transition-[max-width] duration-300 ease-out-strong",
          mobile ? "max-w-[375px] rounded-[16px] border border-border bg-background p-4" : "max-w-full",
        )}
      >
        <DemoRenderer key={resetKey} previewId={previewId} />
      </div>
    </div>
  );
}

export function ComponentPreview({ previewId, name, tabs }: { previewId: string; name: string; tabs: CodeTab[] }) {
  const [dark, setDark] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const controls = (
    <div className="flex items-center gap-1.5">
      <ToggleGroup
        type="single"
        value={dark ? "dark" : "light"}
        onValueChange={(v) => v && setDark(v === "dark")}
        aria-label="Preview theme"
      >
        <ToggleGroupItem value="light" aria-label="Light preview">
          <HugeiconsIcon icon={Sun03Icon} strokeWidth={2} />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark preview">
          <HugeiconsIcon icon={Moon02Icon} strokeWidth={2} />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        type="single"
        value={mobile ? "mobile" : "desktop"}
        onValueChange={(v) => v && setMobile(v === "mobile")}
        aria-label="Preview width"
        className="hidden sm:inline-flex"
      >
        <ToggleGroupItem value="desktop" aria-label="Desktop width">
          <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
        </ToggleGroupItem>
        <ToggleGroupItem value="mobile" aria-label="Mobile width">
          <HugeiconsIcon icon={SmartPhone01Icon} strokeWidth={2} />
        </ToggleGroupItem>
      </ToggleGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            aria-label="Reset demo"
            className="inline-flex size-8 items-center justify-center rounded-[8px] border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
          >
            <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Reset demo</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            aria-label="Open preview fullscreen"
            className="inline-flex size-8 items-center justify-center rounded-[8px] border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
          >
            <HugeiconsIcon icon={FullScreenIcon} size={14} strokeWidth={2} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Fullscreen</TooltipContent>
      </Tooltip>
    </div>
  );

  return (
    <Tabs defaultValue="preview">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        {controls}
      </div>
      <TabsContent value="preview" className="mt-3">
        <Canvas previewId={previewId} dark={dark} mobile={mobile} resetKey={resetKey} />
      </TabsContent>
      <TabsContent value="code" className="mt-3">
        <CodeViewer tabs={tabs} />
      </TabsContent>

      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="h-[calc(100vh-32px)] w-[calc(100vw-32px)] max-w-none p-4 sm:p-6">
          <DialogTitle className="text-sm font-medium text-foreground">{name} preview</DialogTitle>
          <DialogDescription className="sr-only">Fullscreen interactive preview</DialogDescription>
          <Canvas previewId={previewId} dark={dark} mobile={mobile} resetKey={resetKey} className="mt-3 h-[calc(100%-36px)]" />
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}
