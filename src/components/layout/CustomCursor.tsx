"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CursorState = "default" | "link" | "view";

const SIZE: Record<CursorState, number> = {
  default: 24,
  link: 64,
  view: 80,
};

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<CursorState>("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip on touch / reduced-motion devices — system cursor stays
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const updateState = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const cursorType =
        target?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? null;
      if (cursorType === "link" || cursorType === "view") {
        setState(cursorType);
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", updateState);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", updateState);
    };
  }, []);

  if (!enabled) return null;

  const size = SIZE[state];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      animate={{ x: pos.x - size / 2, y: pos.y - size / 2 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
    >
      <motion.div
        className="relative bg-white"
        animate={{ width: size, height: size }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {state === "view" && (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold tracking-mono text-black uppercase">
            View ↗
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
