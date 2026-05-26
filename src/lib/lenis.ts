import type Lenis from "lenis";

// Module-level singleton so anchor click handlers anywhere in the tree can
// trigger smooth-scroll via the active Lenis instance without prop-drilling.
let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

type ScrollOptions = {
  /** Pixels of offset from the target element's top. Useful for fixed nav. */
  offset?: number;
  /** Override the default Lenis duration for this scroll. */
  duration?: number;
};

export function scrollToAnchor(href: string, options: ScrollOptions = {}) {
  if (!href.startsWith("#")) return;
  const target = document.querySelector(href);
  if (!target) return;

  const lenis = lenisInstance;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, {
      offset: options.offset ?? 0,
      duration: options.duration ?? 1.2,
    });
  } else {
    // Fallback when Lenis is disabled (reduced-motion) or not yet mounted.
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
