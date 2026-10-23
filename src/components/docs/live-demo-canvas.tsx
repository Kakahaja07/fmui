"use client";

import { useEffect, useRef, useState } from "react";
import { demoLayout } from "@/components/demos";
import { DemoRenderer } from "@/components/docs/demo-renderer";
import { cn } from "@/lib/utils";

const PADDING = 20;

/**
 * Renders a live, interactive demo inside a fixed-size card canvas.
 * The demo mounts when the card nears the viewport (the static sketch shows
 * until then, so layout never shifts) and is scaled down only when it is
 * larger than the canvas. At full size no transform is applied, so fixed and
 * portal-based UI inside demos behaves normally.
 */
export function LiveDemoCanvas({
  previewId,
  placeholder,
  className,
}: {
  previewId: string;
  placeholder: React.ReactNode;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const layout = demoLayout[previewId] ?? { width: 360 };
  const start = layout.align === "start";

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    const content = contentRef.current;
    if (!visible || !box || !content) return;
    // ResizeObserver fires once on observe, so the first measurement needs no sync call.
    const ro = new ResizeObserver(() => {
      const availW = box.clientWidth - PADDING * 2;
      const availH = box.clientHeight - PADDING * 2;
      const next = Math.min(1, availW / layout.width, availH / Math.max(content.offsetHeight, 1));
      setScale(Math.round(next * 1000) / 1000);
    });
    ro.observe(box);
    ro.observe(content);
    return () => ro.disconnect();
  }, [visible, layout.width]);

  return (
    <div ref={boxRef} className={cn("relative overflow-hidden", className)}>
      {visible ? (
        <div
          className={cn("absolute inset-0 flex justify-center", start ? "items-start" : "items-center")}
          style={{ padding: PADDING }}
        >
          <div
            ref={contentRef}
            className="flex flex-none justify-center"
            style={{
              width: layout.width,
              transform: scale < 1 ? `scale(${scale})` : undefined,
              transformOrigin: start ? "top center" : "center",
            }}
          >
            <DemoRenderer previewId={previewId} fallback={<div aria-hidden="true">{placeholder}</div>} />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          {placeholder}
        </div>
      )}
    </div>
  );
}
