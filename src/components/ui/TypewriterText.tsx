"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Segment = { text: string; className?: string };

type Props = {
  segments: Segment[];
  /** Milliseconds between each character. Default 50ms. */
  speed?: number;
  /** Delay before typing starts. */
  delay?: number;
  /** Whether to show a blinking caret after typing completes. */
  caret?: boolean;
  caretChar?: ReactNode;
  caretClassName?: string;
  className?: string;
};

// Generic typewriter that respects reduced-motion: completes instantly in that case.
export function TypewriterText({
  segments,
  speed = 50,
  delay = 0,
  caret = true,
  caretChar = "▍",
  caretClassName,
  className,
}: Props) {
  const total = segments.reduce((acc, s) => acc + s.text.length, 0);
  const [count, setCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setCount(total);
      return;
    }
    setCount(0);
    const startTimer = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= total) {
            window.clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);
    return () => window.clearTimeout(startTimer);
  }, [delay, reducedMotion, speed, total]);

  // Walk segments and reveal `count` characters in order.
  let remaining = count;
  const done = count >= total;

  return (
    <span className={cn("inline-block", className)} aria-label={segments.map((s) => s.text).join("")}>
      {segments.map((seg, i) => {
        const visible = Math.max(0, Math.min(seg.text.length, remaining));
        remaining -= seg.text.length;
        const slice = seg.text.slice(0, visible);
        return (
          <span key={i} className={seg.className} aria-hidden>
            {slice}
          </span>
        );
      })}
      {caret && (
        <span
          className={cn(
            "ml-[2px] inline-block w-[0.5ch] align-baseline",
            done ? "animate-pulse" : "opacity-100",
            caretClassName,
          )}
          aria-hidden
        >
          {caretChar}
        </span>
      )}
    </span>
  );
}
