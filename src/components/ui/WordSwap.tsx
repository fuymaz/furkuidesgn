"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  words: string[];
  /** Milliseconds each word is visible before swapping. Default 2500. */
  interval?: number;
  className?: string;
};

// Cycles through a list of words with a fade + soft vertical wipe per swap.
// The motion (0.45em wipe) is small enough that it stays comfortable for
// users with reduced-motion preferences — we don't gate the cycle on it.
export function WordSwap({ words, interval = 2500, className }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, words.length]);

  return (
    <span className={cn("relative inline-block align-baseline", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: "0.45em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.45em" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
