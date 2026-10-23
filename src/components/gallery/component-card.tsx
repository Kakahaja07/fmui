import Link from "next/link";
import type { FMUIComponent } from "@/types/component";
import { cn } from "@/lib/utils";
import { hasDemo } from "@/components/demos";
import { ComponentThumbnail } from "@/components/gallery/component-thumbnail";
import { LiveDemoCanvas } from "@/components/docs/live-demo-canvas";
import { ShowcaseCardFooter, showcaseCard } from "@/components/ui/showcase-card";

export function ComponentCard({
  component,
  size = "md",
  className,
}: {
  component: FMUIComponent;
  size?: "md" | "lg";
  className?: string;
}) {
  const href = `/components/${component.slug}`;
  const live = component.status !== "coming-soon" && hasDemo(component.previewId);
  const panel = cn(showcaseCard.panel, size === "lg" ? "h-[272px]" : "h-[224px]");
  const sketch = <ComponentThumbnail slug={component.slug} category={component.category} />;

  return (
    <article className={cn(showcaseCard.shell, className)}>
      {live ? (
        <LiveDemoCanvas previewId={component.previewId!} placeholder={sketch} className={panel} />
      ) : (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className={cn(panel, "flex items-center justify-center [&>*]:opacity-50")}
        >
          {sketch}
        </Link>
      )}

      <ShowcaseCardFooter
        title={
          <>
            <Link href={href} className="truncate rounded-[4px] hover:underline hover:underline-offset-4">
              {component.name}
            </Link>
            {component.status === "preview" && (
              <span className="size-1.5 shrink-0 rounded-full bg-sky-500" title="Preview">
                <span className="sr-only">Preview</span>
              </span>
            )}
          </>
        }
        aside={
          live ? (
            <Link
              href={href}
              aria-label={`${component.name} documentation`}
              className="group/docs inline-flex items-center gap-1 font-medium transition-colors hover:text-heading"
            >
              Docs
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true" className="transition-transform duration-200 ease-out-strong group-hover/docs:translate-x-0.5">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : (
            "Coming soon"
          )
        }
      />
    </article>
  );
}
