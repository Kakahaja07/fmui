import { cn } from "@/lib/utils";

/** Square markers drawn where a horizontal divider meets the vertical frame lines. */
export function FrameNodes({ edge = "top" }: { edge?: "top" | "bottom" }) {
  const y = edge === "top" ? "-top-[4px]" : "-bottom-[4px]";
  return (
    <>
      <span aria-hidden="true" className={cn("frame-node -left-[4px]", y)} />
      <span aria-hidden="true" className={cn("frame-node -right-[4px]", y)} />
    </>
  );
}

/** Fixed vertical guide lines at the edges of the 1080px frame. */
export function FrameLines() {
  return <div aria-hidden="true" className="frame-lines" />;
}

/**
 * A full-width band of the framed layout. Draws a top divider with corner nodes
 * unless it is the first band on the page.
 */
export function FrameSection({
  id,
  className,
  children,
  divider = true,
  "aria-label": ariaLabel,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  divider?: boolean;
  "aria-label"?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("container-site relative", divider && "border-t border-border", className)}
    >
      {divider && <FrameNodes />}
      {children}
    </section>
  );
}
