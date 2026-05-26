"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRUTAL_EASE, VIEWPORT } from "@/lib/animations";
import { BrutalCard } from "@/components/primitives/BrutalCard";

const ASSETS = {
  cornerSparkle: "/icons/skills/skillssparkle.svg",
  markSparkle: "/icons/skills/skillssparkle.svg",
  arrowSE: "/images/myself/arrow-southeast.png",
} as const;

// ────────────────────────────────────────────────────────────────────
// DATA — Desktop tools (3×2 grid, alternating dark/light bottoms)
// ────────────────────────────────────────────────────────────────────

type DesktopTool = {
  id: string;
  index: string;
  year: string;
  iconSrc: string;
  iconW: number;
  iconH: number;
  topBottomLeft: string;
  topBottomRight: string;
  name: string;
  description: string | null;
  lightBottomLeft?: string;
  lightBottomRight?: string;
  darkBottom: boolean;
};

const DESKTOP_TOOLS: DesktopTool[] = [
  {
    id: "illustrator",
    index: "FEATURED · 01",
    year: "2018",
    iconSrc: "/icons/skills/ai.svg",
    iconW: 123,
    iconH: 102,
    topBottomLeft: "MASTER · DAILY",
    topBottomRight: "VECTOR · TYPE",
    name: "ILLUSTRATOR",
    description:
      "Vector illustration, logo systems, and identity work. Daily craft since 2020.",
    darkBottom: true,
  },
  {
    id: "ai-tools",
    index: "// 02",
    year: "2022",
    iconSrc: "/icons/skills/AItools.svg",
    iconW: 113,
    iconH: 119,
    topBottomLeft: "WIZARD · COMPANION",
    topBottomRight: "PROMPT · ASSIST",
    name: "AI TOOLS",
    description: null,
    lightBottomLeft: "BRAND · IDENTITY",
    lightBottomRight: "STARTUP · SYSTEM",
    darkBottom: false,
  },
  {
    id: "after-effects",
    index: "// 03",
    year: "2020",
    iconSrc: "/icons/skills/After-effects.svg",
    iconW: 141,
    iconH: 84,
    topBottomLeft: "MASTER · DAILY",
    topBottomRight: "MOTION · LOOPS",
    name: "AFTER EFFECTS",
    description:
      "Motion graphics, transitions, and explainers. Loops to fully scripted sequences.",
    darkBottom: true,
  },
  {
    id: "premiere",
    index: "// 04",
    year: "2017",
    iconSrc: "/icons/skills/Premiere.svg",
    iconW: 139,
    iconH: 95,
    topBottomLeft: "ADVANCED · EDIT",
    topBottomRight: "CUT · COLOR",
    name: "PREMIERE PRO",
    description: null,
    lightBottomLeft: "VIDEO EDIT",
    lightBottomRight: "BRAND · LOGO · MARK",
    darkBottom: false,
  },
  {
    id: "figma",
    index: "// 05 DAILY",
    year: "2023",
    iconSrc: "/icons/skills/Figma.svg",
    iconW: 86,
    iconH: 124,
    topBottomLeft: "MASTER · DAILY",
    topBottomRight: "UI · PROTOTYPE",
    name: "FIGMA",
    description:
      "UI design, prototyping, components, and variables. Primary tool for product design.",
    darkBottom: true,
  },
  {
    id: "photoshop",
    index: "// 06",
    year: "2016",
    iconSrc: "/icons/skills/Photoshop.svg",
    iconW: 139,
    iconH: 104,
    topBottomLeft: "ADVANCED",
    topBottomRight: "RASTER · TYPE",
    name: "PHOTOSHOP",
    description: null,
    lightBottomLeft: "MOBILE",
    lightBottomRight: "APP · IOS",
    darkBottom: false,
  },
];

const CAPABILITIES = [
  "Product Design",
  "UI/UX Research",
  "Vibe Coding",
  "Motion Design",
  "Component Libraries",
  "Prototyping",
  "Digital Marketing",
  "Competitive Analysis",
  "Accessibility",
];

// ────────────────────────────────────────────────────────────────────
// DATA — Mobile tools (3 horizontal large + 3 small squares)
// ────────────────────────────────────────────────────────────────────

type MobileLargeTool = {
  id: string;
  name: string;
  iconSrc: string;
  iconW: number;
  iconH: number;
  topLabel: string;
  year: string;
  bottomTag: string;
  description: string;
};

const MOBILE_LARGE: MobileLargeTool[] = [
  {
    id: "illustrator",
    name: "ILLUSTRATOR",
    iconSrc: "/icons/skills/ai.svg",
    iconW: 59,
    iconH: 49,
    topLabel: "FEATURED · 01",
    year: "2018",
    bottomTag: "MASTER · DAILY",
    description:
      "Vector illustration, logo systems, and identity work. Daily craft since 2018",
  },
  {
    id: "figma",
    name: "FIGMA",
    iconSrc: "/icons/skills/Figma.svg",
    iconW: 39,
    iconH: 55,
    topLabel: "UI · PROTOTYPE",
    year: "2023",
    bottomTag: "MASTER · DAILY",
    description:
      "UI design, prototyping, components, and variables. Primary tool for product design.",
  },
  {
    id: "ae",
    name: "AFTER EFFECTS",
    iconSrc: "/icons/skills/After-effects.svg",
    iconW: 59,
    iconH: 35,
    topLabel: "MOTION LOOPS",
    year: "2020",
    bottomTag: "MASTER · DAILY",
    description:
      "Motion graphics, transitions, and explainers. Loops to fully scripted sequences.",
  },
];

type MobileSmallTool = {
  id: string;
  name: string;
  iconSrc: string;
  iconW: number;
  iconH: number;
  year: string;
  level: string;
};

const MOBILE_SMALL: MobileSmallTool[] = [
  {
    id: "ai-tools",
    name: "AI\nTOOLS",
    iconSrc: "/icons/skills/AItools.svg",
    iconW: 58,
    iconH: 61,
    year: "2016",
    level: "ADVANCED",
  },
  {
    id: "photoshop",
    name: "PHOTOSHOP",
    iconSrc: "/icons/skills/Photoshop.svg",
    iconW: 58,
    iconH: 40,
    year: "2016",
    level: "ADVANCED",
  },
  {
    id: "premiere",
    name: "PREMIERE",
    iconSrc: "/icons/skills/Premiere.svg",
    iconW: 58,
    iconH: 43,
    year: "2016",
    level: "ADVANCED",
  },
];

// ────────────────────────────────────────────────────────────────────
// Main section
// ────────────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full px-[20px] pt-0 pb-[12px] md:px-[80px] md:pt-[8px] md:pb-[24px]"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section meta — desktop only */}
        <div className="hidden items-center justify-between pb-[16px] font-mono md:flex">
          <p className="text-[13px] text-fg-secondary">
            {`// section 03 — skills`}
          </p>
          <p className="text-[12px] text-fg-muted">03 / 06</p>
        </div>

        {/* ─────── DESKTOP LAYOUT (>= md) ─────── */}
        <div className="hidden flex-col gap-[24px] md:flex">
          <DesktopHeader />
          <DesktopGrid />
        </div>

        {/* ─────── MOBILE LAYOUT (< md) ─────── */}
        <div className="flex flex-col gap-[12px] md:hidden">
          <MobileHeader />
          <div className="flex flex-col gap-[8px]">
            {MOBILE_LARGE.map((tool, i) => (
              <MobileLargeCard key={tool.id} tool={tool} delay={i * 0.08} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-[8px]">
            {MOBILE_SMALL.map((tool, i) => (
              <MobileSmallCard
                key={tool.id}
                tool={tool}
                delay={0.3 + i * 0.06}
              />
            ))}
          </div>
        </div>

        {/* CAPABILITIES band — responsive, visible on both layouts */}
        <div className="mt-[12px] md:mt-[24px]">
          <Capabilities />
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// DESKTOP COMPONENTS
// ════════════════════════════════════════════════════════════════════

function DesktopHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE }}
      className="flex h-[186px] items-center gap-[24px]"
    >
      {/* Left cell — SKILLS wordmark */}
      <BrutalCard className="flex h-[186px] flex-1 flex-col justify-between p-[28px]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[12px] font-bold tracking-[0.12em] text-fg-primary">
            ↘ TIMELINE · ROLES · IMPACT
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">
            TEN YRS · MANY HATS
          </p>
        </div>
        {/* SKILLS letters (S/K/I/L/L/S) render narrower than CAREER's in
            Monument Extended. 156px overshot the card width — 144 lands a
            similar fill ratio to CAREER@126 without spilling out. */}
        <h2 className="font-display text-[144px] leading-none uppercase text-fg-primary whitespace-nowrap">
          SKILLS
        </h2>
      </BrutalCard>

      {/* Right cell — // MARK · 03 + index + meta column */}
      <BrutalCard className="flex h-[186px] w-[413px] flex-col justify-between p-[28px]">
        <div className="flex items-start justify-between">
          <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
            {`// MARK · 03`}
          </p>
          <Image
            src={ASSETS.markSparkle}
            alt=""
            width={17}
            height={17}
            className="size-[17px] object-contain"
            aria-hidden
          />
        </div>
        <div className="flex items-end justify-between gap-[16px]">
          <span className="font-display text-[88px] leading-[0.88] tracking-[-0.06em] text-fg-primary">
            03
          </span>
          <div className="flex flex-col items-end font-mono text-fg-muted pb-[8px]">
            <span className="text-[14px] tracking-[0.04em]">/06</span>
            <span className="text-[9px] tracking-[0.06em]">DAILY</span>
          </div>
          <div className="flex flex-1 flex-col items-end gap-[6px] pb-[8px]">
            <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted text-right whitespace-nowrap">
              06 SOFTWARES · ADOBE + FIGMA
            </p>
            <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted text-right whitespace-nowrap">
              EST. 2014 · STILL LEARNING
            </p>
          </div>
        </div>
      </BrutalCard>
    </motion.div>
  );
}

function DesktopGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
      className="grid grid-cols-3 gap-[22px]"
    >
      {DESKTOP_TOOLS.map((tool) => (
        <DesktopSkillCard key={tool.id} tool={tool} />
      ))}
    </motion.div>
  );
}

function DesktopSkillCard({ tool }: { tool: DesktopTool }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: BRUTAL_EASE },
        },
      }}
    >
      <BrutalCard className="relative flex h-[400px] w-full flex-col">
        {/* TOP HALF (230h) — light bg, icon + meta */}
        <div className="flex h-[230px] flex-col justify-between bg-bg-surface-alt p-[24px]">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-fg-primary whitespace-nowrap">
              {tool.index}
            </p>
            <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">
              {tool.year}
            </p>
          </div>
          <div className="flex flex-1 items-center">
            <Image
              src={tool.iconSrc}
              alt={tool.name}
              width={tool.iconW}
              height={tool.iconH}
              className="h-auto w-auto max-h-[120px] object-contain"
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] whitespace-nowrap">
            <p className="font-bold tracking-[0.12em] text-fg-primary">
              {tool.topBottomLeft}
            </p>
            <p className="tracking-[0.06em] text-fg-muted">{tool.topBottomRight}</p>
          </div>
        </div>

        {/* BOTTOM HALF — flex-1 fills remaining card height (no light gap below). */}
        {tool.darkBottom ? (
          <div className="flex flex-1 flex-col justify-between bg-bg-inverted p-[24px]">
            <div className="flex items-start justify-between">
              <h3 className="font-body text-[30px] font-bold leading-none tracking-[-0.015em] text-fg-inverted whitespace-nowrap">
                {tool.name}
              </h3>
              <Image
                src={ASSETS.cornerSparkle}
                alt=""
                width={30}
                height={30}
                className="size-[30px] object-contain"
                aria-hidden
              />
            </div>
            {tool.description && (
              <p className="font-body text-[13px] font-medium leading-[1.4] text-fg-inverted">
                {tool.description}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-between bg-bg-surface-alt p-[24px]">
            <h3 className="font-body text-[30px] font-bold leading-none tracking-[-0.015em] text-fg-primary whitespace-nowrap">
              {tool.name}
            </h3>
            <div className="flex items-center justify-between font-mono whitespace-nowrap">
              <p className="text-[10px] font-bold tracking-[0.12em] text-fg-primary">
                {tool.lightBottomLeft}
              </p>
              <p className="text-[9px] tracking-[0.06em] text-fg-muted">
                {tool.lightBottomRight}
              </p>
            </div>
          </div>
        )}
      </BrutalCard>
    </motion.div>
  );
}

// Responsive — mobile shows 1 column at compact sizing, desktop falls back
// to the 3×3 grid + larger type.
function Capabilities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE }}
    >
      <BrutalCard className="flex w-full flex-col gap-[10px] p-[16px] md:h-[202px] md:gap-[14px] md:p-[28px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px] md:gap-[12px]">
            <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary md:text-[12px]">
              CAPABILITIES
            </p>
            <span className="inline-flex items-center bg-fg-primary px-[6px] py-[2px] font-mono text-[9px] font-bold tracking-[0.08em] text-fg-inverted md:px-[8px] md:py-[4px] md:text-[10px]">
              09
            </span>
          </div>
          <p className="font-mono text-[9px] tracking-[0.08em] text-fg-muted md:text-[11px]">
            DOMAINS I WORK IN
          </p>
        </div>

        {/* Mobile: single column / Desktop: 3 columns × 3 rows.
            Capabilities reveal row-by-row (mobile) / cell-by-cell (desktop)
            with a left-slide + fade — emphasises the "list grows" feel. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-[6px] pt-[2px] md:grid-cols-3 md:gap-x-[12px] md:gap-y-[10px] md:pt-[6px]"
        >
          {CAPABILITIES.map((cap, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={cap}
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.45, ease: BRUTAL_EASE },
                  },
                }}
                className="flex items-center gap-[10px] overflow-hidden md:gap-[12px]"
              >
                <span className="font-mono text-[9px] font-bold tracking-[0.08em] text-fg-muted md:text-[11px]">
                  {num}
                </span>
                <span className="font-mono text-[11px] text-fg-secondary md:text-[13px]">
                  →
                </span>
                <span className="font-body text-[14px] font-medium leading-[1.15] tracking-[-0.005em] text-fg-primary md:text-[17px]">
                  {cap}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </BrutalCard>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MOBILE COMPONENTS — kept from prior implementation
// ════════════════════════════════════════════════════════════════════

function MobileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE }}
      className="w-full"
    >
      <BrutalCard className="flex w-full flex-col gap-[6px] p-[16px]">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
            ↘ TIMELINE · ROLES · IMPACT
          </p>
          <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted">
            {`// MARK · 03`}
          </p>
        </div>
        <Image
          src={ASSETS.arrowSE}
          alt=""
          width={40}
          height={16}
          className="h-[16px] w-auto object-contain"
          aria-hidden
        />
        <div className="flex items-center gap-[12px]">
          <span className="font-display text-[36px] leading-[0.88] tracking-[-0.06em] text-fg-primary">
            03
          </span>
          <div className="flex flex-col font-mono text-fg-muted">
            <span className="text-[13px] tracking-[0.04em]">/06</span>
            <span className="text-[9px] tracking-[0.06em]">DAILY</span>
          </div>
          {/* Inline tick marks instead of timeline-frame.png — bracket-style. */}
          <div className="flex flex-1 items-center gap-[6px] overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="block h-[8px] w-[1px] shrink-0 bg-fg-muted"
                aria-hidden
              />
            ))}
          </div>
        </div>
        <h2 className="font-display text-[78px] leading-none uppercase text-fg-primary whitespace-nowrap">
          SKILLS
        </h2>
      </BrutalCard>
    </motion.div>
  );
}

function MobileLargeCard({
  tool,
  delay,
}: {
  tool: MobileLargeTool;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: BRUTAL_EASE, delay }}
      className="relative w-full"
    >
      {/* [&::after]:content-none drops the brutal step shadow — cards land
          flush in the stack per the user's reference SS. */}
      <BrutalCard tone="dark" className="relative flex h-[125px] w-full [&::after]:content-none">
        {/* Light-left width matches the AI Tools card width in the 3-col grid
            below, so the dark area starts at the same x position. */}
        <div className="flex h-full w-[calc((100%-16px)/3)] flex-col items-stretch justify-center gap-[5px] bg-bg-surface-alt p-[12px]">
          <p className="font-mono text-[8px] font-bold tracking-[0.12em] text-fg-muted whitespace-nowrap">
            {tool.topLabel}
          </p>
          {/* justify-center centers Ai/Figma/AE icons horizontally inside the
              left strip (was left-aligned by default flex-start). */}
          <div className="flex flex-1 items-center justify-center">
            <Image
              src={tool.iconSrc}
              alt={tool.name}
              width={tool.iconW}
              height={tool.iconH}
              className="h-auto w-auto max-h-[56px] object-contain"
            />
          </div>
          <p className="font-mono text-[8px] font-bold tracking-[0.12em] text-fg-muted">
            {tool.year}
          </p>
          <div className="flex w-full items-center justify-between">
            <p className="font-mono text-[7.5px] font-bold tracking-[0.12em] text-fg-primary whitespace-nowrap">
              {tool.bottomTag}
            </p>
            <p className="font-mono text-[7.5px] font-bold tracking-[0.12em] text-fg-primary">
              2016
            </p>
          </div>
        </div>
        <div className="absolute top-[14px] right-[12px] size-[30px]">
          <Image
            src={ASSETS.cornerSparkle}
            alt=""
            fill
            className="object-contain"
            aria-hidden
          />
        </div>
        <div className="flex flex-1 flex-col gap-[8px] p-[14px] pr-[48px]">
          <p className="font-body text-[16px] font-bold leading-none tracking-[-0.015em] text-fg-inverted">
            {tool.name}
          </p>
          <p className="font-body text-[12px] font-medium leading-[1.4] text-fg-inverted">
            {tool.description}
          </p>
        </div>
      </BrutalCard>
    </motion.div>
  );
}

function MobileSmallCard({
  tool,
  delay,
}: {
  tool: MobileSmallTool;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: BRUTAL_EASE, delay }}
    >
      <BrutalCard className="flex h-[165px] w-full flex-col items-center justify-between p-[12px]">
        <p className="self-start font-mono text-[8px] tracking-[0.08em] text-fg-muted">
          {tool.year}
        </p>
        <div className="flex flex-1 items-center justify-center">
          <Image
            src={tool.iconSrc}
            alt={tool.name}
            width={tool.iconW}
            height={tool.iconH}
            className="h-auto w-auto max-h-[60px] object-contain"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-[3px]">
          <p className="font-body text-[15px] font-bold leading-none tracking-[-0.015em] text-fg-primary whitespace-pre-line">
            {tool.name}
          </p>
          <p className="font-mono text-[7.5px] font-bold tracking-[0.12em] text-fg-primary">
            {tool.level}
          </p>
        </div>
      </BrutalCard>
    </motion.div>
  );
}
