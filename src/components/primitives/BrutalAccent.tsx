import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// HANDOFF vocabulary (section 3.5) — one glyph per section so the eye reads "this is X section".
const GLYPHS = {
  hero: "✷",
  myself: "✷",
  skills: "✕",
  career: "↗",
  work: "▣",
  contact: "✉",
  footer: "✷",
} as const;

type Section = keyof typeof GLYPHS;

type Props = HTMLAttributes<HTMLSpanElement> & {
  section: Section;
  accent?: boolean;
};

export function BrutalAccent({
  section,
  accent = false,
  className,
  ...rest
}: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block font-display leading-none",
        accent && "text-acid",
        className,
      )}
      {...rest}
    >
      {GLYPHS[section]}
    </span>
  );
}
