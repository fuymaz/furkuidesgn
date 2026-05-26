"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Pixels per second. Negative = right-to-left, positive = left-to-right. */
  speed?: number;
  className?: string;
};

export function Marquee({ children, speed = -60, className }: Props) {
  // Duplicate content so the loop has a seamless wrap point. The animation
  // moves through one full content-width per cycle.
  const duration = Math.abs(1000 / speed);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="flex w-max gap-[64px] whitespace-nowrap"
        animate={{ x: speed > 0 ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex shrink-0 gap-[64px]">{children}</div>
        <div className="flex shrink-0 gap-[64px]" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
