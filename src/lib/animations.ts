import type { Variants } from "framer-motion";

// Brutal-out easing curve — used for entrances and hero reveals
export const BRUTAL_EASE: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: BRUTAL_EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const titleReveal: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: BRUTAL_EASE },
  },
};

export const cardLift: Variants = {
  rest: { y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { y: -4, transition: { duration: 0.3, ease: "easeOut" } },
};

// Standard viewport config — reuse across sections so reveals trigger once,
// 100px before fully scrolling into view.
export const VIEWPORT = { once: true, margin: "-100px" } as const;
