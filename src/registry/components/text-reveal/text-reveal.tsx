"use client";

import { Fragment, useEffect, useRef, useState, type RefObject } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  text: string;
  /**
   * inView: words fade, unblur and rise in one after another the first time the text scrolls into view.
   * scroll: words brighten from muted to full as the text scrolls through the viewport.
   */
  mode?: "inView" | "scroll";
  as?: "h1" | "h2" | "h3" | "p";
  /** Scroll mode only: the scrolling element, when it is not the page. It needs position: relative. */
  scrollContainer?: RefObject<HTMLElement | null>;
  className?: string;
}

const STAGGER_MS = 40;

/** A headline that reveals word by word on scroll. Screen readers get the plain text once. */
export function TextReveal({ text, mode = "inView", as: Tag = "h2", scrollContainer, className }: TextRevealProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag className={cn("text-[26px]/[1.15] font-semibold tracking-[-0.02em] text-balance text-heading", className)}>
      <span className="sr-only">{text}</span>
      {mode === "scroll" ? (
        <ScrollWords words={words} container={scrollContainer} />
      ) : (
        <InViewWords words={words} />
      )}
    </Tag>
  );
}

function InViewWords({ words }: { words: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} aria-hidden="true">
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            className={cn(
              "inline-block transition-[opacity,filter,translate] duration-500 ease-out-strong motion-reduce:translate-y-0 motion-reduce:blur-[0px]",
              shown ? "translate-y-0 opacity-100 blur-[0px]" : "translate-y-[0.3em] opacity-0 blur-[6px]",
            )}
            style={{ transitionDelay: shown ? `${i * STAGGER_MS}ms` : "0ms" }}
          >
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </span>
  );
}

function ScrollWords({ words, container }: { words: string[]; container?: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLSpanElement>(null);
  // 0 when the text's top enters the lower part of the viewport, 1 when its bottom passes the middle.
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ["start 0.9", "end 0.55"] });

  return (
    <span ref={ref} aria-hidden="true" className="block">
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </span>
  );
}

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}
