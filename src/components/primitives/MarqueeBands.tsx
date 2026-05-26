"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Repeated phrase per band — short, brutal-aesthetic design vocab.
const BAND_A_PHRASE = "ORGANIZE LAYERS  ·  MOTION  ·  CRAFT  ·  TYPOGRAPHY  ·  INTERFACES";
const BAND_B_PHRASE = "RADIATES  ·  BRAND  ·  ART DIRECTION  ·  PRODUCT  ·  DESIGN";

type BandProps = {
  phrase: string;
  rotate: number;
  /** Seconds per scroll cycle. Lower = faster. */
  duration: number;
  direction: "ltr" | "rtl";
  /** Tailwind classes applied to the colored strip (bg, height, text). */
  stripClassName: string;
  /** CSS value for vertical center within parent — supports %, px, calc, etc. */
  centerY: string;
};

function Band({
  phrase,
  rotate,
  duration,
  direction,
  stripClassName,
  centerY,
}: BandProps) {
  const chunk = (
    <span className="inline-flex items-center gap-[40px] px-[20px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="inline-flex items-center gap-[40px] whitespace-nowrap">
          <span aria-hidden>★</span>
          <span>{phrase}</span>
        </span>
      ))}
    </span>
  );

  return (
    // Band is 200vw wide so its physical ends sit far outside the viewport
    // after rotation — only a continuous mid-strip is visible inside the
    // container, no triangular tips at the left/right edges.
    <div
      className="absolute left-1/2"
      style={{
        top: centerY,
        width: "200vw",
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        transformOrigin: "center center",
      }}
    >
      <div
        className={cn(
          "w-full overflow-hidden font-mono font-bold uppercase tracking-[0.1em]",
          stripClassName,
        )}
      >
        <motion.div
          className="flex h-full w-max items-center"
          animate={{
            x: direction === "rtl" ? ["0%", "-50%"] : ["-50%", "0%"],
          }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <div className="flex shrink-0">{chunk}</div>
          <div className="flex shrink-0" aria-hidden>
            {chunk}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function MarqueeBands() {
  // Symmetric rotations (-3° / +3°) so both bands have identical rotated
  // bounding-box height and both fit cleanly inside the container — no
  // visible triangular tips, identical visual treatment for both colors.
  // X-cross is still produced by the opposite-sign rotation.
  //
  // BBOX math at -3°: 200vw·sin(3°) + 40·cos(3°) ≈ 134 + 40 = 174px on
  // 1280-wide viewport. h-[200px] desktop leaves a comfortable buffer.
  return (
    <div
      role="presentation"
      aria-hidden
      className="relative my-0 h-[120px] w-full overflow-hidden md:my-[24px] md:h-[200px]"
    >
      {/* Band A — acid green, dark text, rotated -5deg */}
      <Band
        phrase={BAND_A_PHRASE}
        rotate={-5}
        duration={32}
        direction="rtl"
        centerY="50%"
        stripClassName="bg-acid text-fg-primary h-[40px] text-[15px] md:h-[44px] md:text-[20px]"
      />
      {/* Band B — dark, acid text, rotated +5deg, same centerY for X-cross */}
      <Band
        phrase={BAND_B_PHRASE}
        rotate={5}
        duration={40}
        direction="ltr"
        centerY="50%"
        stripClassName="bg-fg-primary text-acid h-[40px] text-[15px] md:h-[44px] md:text-[20px]"
      />
    </div>
  );
}
