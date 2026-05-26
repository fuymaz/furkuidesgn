"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRUTAL_EASE, VIEWPORT } from "@/lib/animations";
import { BrutalCard } from "@/components/primitives/BrutalCard";

const SPARKLE = "/icons/skills/skillssparkle.svg";

// ────────────────────────────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────────────────────────────

type WorkEntry = {
  initial: string;
  company: string;
  role: string;
  years: string | null; // "5+" badge — only shown when set
  current: boolean; // acid dot indicator for current role
};

const WORK_HISTORY: WorkEntry[] = [
  {
    initial: "M",
    company: "Mobiva",
    role: "Product Designer",
    years: "5+",
    current: true,
  },
  {
    initial: "M",
    company: "Mobiva",
    role: "Creative Artist",
    years: "5+",
    current: false,
  },
  {
    initial: "F",
    company: "Freelancer",
    role: "UI/UX Designer",
    years: null,
    current: false,
  },
  {
    initial: "Y",
    company: "Youtube",
    role: "Youtube Channel Editor",
    years: null,
    current: false,
  },
];

// 21 ticks for the 2014→2026 timeline. Anchor ticks (every 7th) are taller;
// the final tick is acid green to mark the current year.
const TIMELINE_TICKS = Array.from({ length: 21 }, (_, i) => ({
  height: i === 20 ? 28 : i % 7 === 0 ? 20 : 14,
  acid: i === 20,
}));

// ────────────────────────────────────────────────────────────────────
// Main section
// ────────────────────────────────────────────────────────────────────

export function Career() {
  return (
    <section
      id="career"
      className="relative w-full px-[20px] pt-0 pb-[12px] md:px-[80px] md:pt-0 md:pb-[40px]"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section meta — desktop only */}
        <div className="hidden items-center justify-between pb-[16px] font-mono md:flex">
          <p className="text-[13px] text-fg-secondary">
            {`// section 04 — career`}
          </p>
          <p className="text-[12px] text-fg-muted">04 / 06</p>
        </div>

        {/* ─────── DESKTOP LAYOUT (>= md) ─────── */}
        <div className="hidden flex-col gap-[24px] md:flex">
          <DesktopHeader />
          <DesktopMainRow />
          <Timeline />
        </div>

        {/* ─────── MOBILE LAYOUT (< md) ─────── */}
        <div className="flex flex-col gap-[12px] md:hidden">
          <MobileHeader />
          <div className="grid grid-cols-2 gap-[8px]">
            <MobileStatCard
              index="FEATURED · 01"
              indexAccent
              meta="ALL TIME"
              number={20}
              caption="SHIPPED APPS"
              hint="& COUNTING"
              dark
              description="End-to-end product design across fintech, enterprise, and consumer apps."
              footer={{ left: "12 YRS · ACTIVE", right: "BUILDING", dot: true }}
            />
            <MobileStatCard
              index="// 02 PROJECTS"
              indexAccent={false}
              meta="EST. 2014"
              number={50}
              caption="PRODUCT DESIGN"
              hint="B2B · CONSUMER"
              dark={false}
              description="B2B, consumer, and brand work across mobile, web, and design systems since 2014."
              footer={{ left: "BRAND · IDENTITY", right: "ONGOING", dot: false }}
              flipped
            />
          </div>
          <MobileWorkHistory />
          <Timeline />
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// DESKTOP
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
      {/* Left wide — CAREER wordmark */}
      <BrutalCard className="flex h-[186px] flex-1 flex-col justify-between p-[28px]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[12px] font-bold tracking-[0.12em] text-fg-primary">
            ↘ TIMELINE · ROLES · IMPACT
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">
            12 YRS · MANY HATS
          </p>
        </div>
        <h2 className="font-display text-[126px] leading-none uppercase text-fg-primary whitespace-nowrap">
          CAREER
        </h2>
      </BrutalCard>

      {/* Right — // MARK · 04 + index + meta */}
      <BrutalCard className="flex h-[186px] w-[413px] flex-col justify-between p-[28px]">
        <div className="flex items-start justify-between">
          <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
            {`// MARK · 04`}
          </p>
          <Image
            src={SPARKLE}
            alt=""
            width={17}
            height={17}
            className="size-[17px] object-contain"
            aria-hidden
          />
        </div>
        <div className="flex items-end justify-between gap-[16px]">
          <span className="font-display text-[88px] leading-[0.88] tracking-[-0.06em] text-fg-primary">
            04
          </span>
          <div className="flex flex-col items-end pb-[8px] font-mono text-fg-muted">
            <span className="text-[14px] tracking-[0.04em]">/06</span>
            <span className="text-[9px] tracking-[0.06em]">ACTIVE</span>
          </div>
          <div className="flex flex-1 flex-col items-end gap-[6px] pb-[8px]">
            <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted text-right whitespace-nowrap">
              4 COMPANIES · 12 YRS
            </p>
            <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted text-right whitespace-nowrap">
              ACTIVE @ MOBIVA · 2021→
            </p>
          </div>
        </div>
      </BrutalCard>
    </motion.div>
  );
}

function DesktopMainRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.1 }}
      className="flex h-[492px] items-start gap-[24px]"
    >
      {/* Left column — two stat cards side-by-side, each w-326 */}
      <div className="flex flex-1 gap-[24px]">
        <DesktopStatCard
          index="FEATURED · 01"
          indexAccent
          meta="ALL TIME"
          number={20}
          caption="SHIPPED APPS"
          hint="& COUNTING"
          darkBottom
          description="End-to-end product design across fintech, enterprise, and consumer apps."
          darkFooter={{ left: "12 YRS · ACTIVE", right: "BUILDING", dot: true }}
        />
        <DesktopStatCard
          index="// 02 PROJECTS"
          indexAccent={false}
          meta="EST. 2014"
          number={50}
          caption="PRODUCT DESIGN"
          hint="B2B · CONSUMER"
          darkBottom={false}
          description="B2B, consumer, and brand work across mobile, web, and design systems since 2014."
          lightFooter={{ left: "BRAND · IDENTITY", right: "ONGOING" }}
          flipped
        />
      </div>

      {/* Right column — work history stack */}
      <div className="flex w-[562px] flex-col gap-[18px]">
        {WORK_HISTORY.map((entry, i) => (
          <WorkHistoryCard key={`${entry.company}-${entry.role}`} entry={entry} delay={i * 0.08} />
        ))}
      </div>
    </motion.div>
  );
}

type StatCardProps = {
  index: string;
  indexAccent: boolean;
  meta: string;
  number: number;
  caption: string;
  hint: string;
  darkBottom: boolean;
  description: string;
  darkFooter?: { left: string; right: string; dot: boolean };
  lightFooter?: { left: string; right: string };
  /** If true the light half is on bottom (e.g. +50 PRODUCT DESIGN card). */
  flipped?: boolean;
};

function DesktopStatCard({
  index,
  indexAccent,
  meta,
  number,
  caption,
  hint,
  darkBottom,
  description,
  darkFooter,
  lightFooter,
  flipped,
}: StatCardProps) {
  const lightHalf = (
    <div className="flex h-[280px] flex-col justify-between bg-bg-surface-alt p-[24px]">
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-[8px]">
          <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-fg-primary">
            {index}
          </p>
          {indexAccent && (
            <span aria-hidden className="text-[14px] leading-[0.9] text-acid">
              ✷
            </span>
          )}
        </div>
        <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">{meta}</p>
      </div>
      <div className="flex flex-1 items-center">
        <p className="font-display leading-[0.88] tracking-[-0.04em] text-fg-primary whitespace-nowrap">
          <span className="text-[78px]">+</span>
          <span className="text-[98px]">{number}</span>
        </p>
      </div>
      <div className="flex items-center justify-between whitespace-nowrap">
        <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
          {caption}
        </p>
        <p className="font-mono text-[10px] tracking-[0.06em] text-fg-muted">{hint}</p>
      </div>
    </div>
  );

  const darkHalf = darkBottom && darkFooter ? (
    <div className="flex flex-1 flex-col justify-between bg-bg-inverted p-[24px]">
      <h3 className="font-body text-[28px] font-bold leading-none tracking-[-0.015em] uppercase text-fg-inverted whitespace-nowrap">
        {caption}
      </h3>
      <p className="font-body text-[12px] font-medium leading-[1.4] text-fg-inverted">
        {description}
      </p>
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-[8px]">
          {darkFooter.dot && (
            <motion.span
              className="block size-[6px] rounded-full bg-acid"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          )}
          <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-inverted">
            {darkFooter.left}
          </p>
        </div>
        <p className="font-mono text-[9px] tracking-[0.06em] text-fg-inverted">
          {darkFooter.right}
        </p>
      </div>
    </div>
  ) : !darkBottom && lightFooter ? (
    <div className="flex flex-1 flex-col justify-between bg-bg-inverted p-[24px]">
      <h3 className="font-body text-[26px] font-bold leading-none tracking-[-0.015em] uppercase text-fg-inverted whitespace-nowrap">
        {caption}
      </h3>
      <p className="font-body text-[12px] font-medium leading-[1.4] text-fg-inverted">
        {description}
      </p>
      <div className="flex items-center justify-between whitespace-nowrap">
        <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-inverted">
          {lightFooter.left}
        </p>
        <p className="font-mono text-[9px] tracking-[0.06em] text-fg-inverted">
          {lightFooter.right}
        </p>
      </div>
    </div>
  ) : null;

  return (
    <BrutalCard className="flex h-[486px] w-[326px] flex-col">
      {flipped ? (
        <>
          {darkHalf}
          {lightHalf}
        </>
      ) : (
        <>
          {lightHalf}
          {darkHalf}
        </>
      )}
    </BrutalCard>
  );
}

function WorkHistoryCard({ entry, delay }: { entry: WorkEntry; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: BRUTAL_EASE, delay }}
    >
      {/* All cards use the light tone — `current` only drives the acid dot. */}
      <BrutalCard className="relative flex h-[108px] w-full items-center gap-[20px] p-[20px]">
        {/* Initial */}
        <div className="flex size-[60px] shrink-0 items-center justify-center font-display text-[44px] leading-[0.9] tracking-[-0.04em] text-fg-primary">
          {entry.initial}
        </div>

        {/* Name + role */}
        <div className="flex flex-1 flex-col gap-[4px]">
          <p className="font-body text-[26px] font-bold leading-none tracking-[-0.01em] text-fg-primary">
            {entry.company}
          </p>
          <p className="font-body text-[14px] font-medium leading-[1.3] text-fg-secondary">
            {entry.role}
          </p>
        </div>

        {/* Years badge */}
        {entry.years && (
          <div className="flex h-[76px] w-[91px] shrink-0 flex-col items-center justify-center bg-fg-primary text-fg-inverted">
            <p className="font-display leading-[0.88] tracking-[-0.01em]">
              <span className="text-[36px]">{entry.years.replace("+", "")}</span>
              <span className="text-[22px]">+</span>
            </p>
            <p className="font-display text-[10px] tracking-[0.18em]">YEARS</p>
          </div>
        )}

        {/* Current indicator */}
        {entry.current && (
          <motion.span
            className="absolute top-[16px] right-[24px] block size-[8px] rounded-full bg-acid"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        )}
      </BrutalCard>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MOBILE
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
      <BrutalCard className="flex w-full flex-col gap-[10px] p-[16px]">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
            ↘ TIMELINE · ROLES · IMPACT
          </p>
          <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted">
            {`// MARK · 04`}
          </p>
        </div>
        <div className="flex items-center gap-[12px]">
          <span className="font-display text-[36px] leading-[0.88] tracking-[-0.06em] text-fg-primary">
            04
          </span>
          <div className="flex flex-col font-mono text-fg-muted">
            <span className="text-[13px] tracking-[0.04em]">/06</span>
            <span className="text-[9px] tracking-[0.06em]">ACTIVE</span>
          </div>
          <div className="ml-auto flex flex-col items-end gap-[2px] font-mono text-fg-muted">
            <p className="text-[9px] tracking-[0.06em]">4 COMPANIES · 12 YRS</p>
            <p className="text-[9px] tracking-[0.06em]">ACTIVE @ MOBIVA · 2021→</p>
          </div>
        </div>
        <h2 className="font-display text-[70px] leading-none uppercase text-fg-primary whitespace-nowrap">
          CAREER
        </h2>
      </BrutalCard>
    </motion.div>
  );
}

function MobileStatCard({
  index,
  indexAccent,
  meta,
  number,
  caption,
  hint,
  description,
  footer,
  flipped,
}: {
  index: string;
  indexAccent: boolean;
  meta: string;
  number: number;
  caption: string;
  hint: string;
  description: string;
  /** Reserved — currently mobile renders both halves regardless of theme. */
  dark?: boolean;
  footer: { left: string; right: string; dot: boolean };
  flipped?: boolean;
}) {
  const lightHalf = (
    <div className="flex flex-1 flex-col justify-between bg-bg-surface-alt p-[12px]">
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-[4px]">
          <p className="font-mono text-[8px] font-bold tracking-[0.12em] text-fg-primary">
            {index}
          </p>
          {indexAccent && (
            <span aria-hidden className="text-[10px] leading-[0.9] text-acid">
              ✷
            </span>
          )}
        </div>
        <p className="font-mono text-[8px] tracking-[0.08em] text-fg-muted">{meta}</p>
      </div>
      <p className="font-display leading-[0.88] tracking-[-0.04em] text-fg-primary whitespace-nowrap">
        <span className="text-[42px]">+</span>
        <span className="text-[54px]">{number}</span>
      </p>
      <div className="flex items-center justify-between whitespace-nowrap">
        <p className="font-mono text-[7.5px] font-bold tracking-[0.12em] text-fg-primary">
          {caption}
        </p>
        <p className="font-mono text-[7.5px] tracking-[0.06em] text-fg-muted">{hint}</p>
      </div>
    </div>
  );

  const darkHalf = (
    <div className="flex flex-1 flex-col justify-between bg-bg-inverted p-[12px]">
      <h3 className="font-body text-[16px] font-bold leading-none tracking-[-0.015em] uppercase text-fg-inverted">
        {caption}
      </h3>
      <p className="font-body text-[10px] font-medium leading-[1.35] text-fg-inverted">
        {description}
      </p>
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-[4px]">
          {footer.dot && (
            <motion.span
              className="block size-[5px] rounded-full bg-acid"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          )}
          <p className="font-mono text-[7.5px] font-bold tracking-[0.12em] text-fg-inverted">
            {footer.left}
          </p>
        </div>
        <p className="font-mono text-[7px] tracking-[0.06em] text-fg-inverted">
          {footer.right}
        </p>
      </div>
    </div>
  );

  return (
    // [&::after]:content-none disables the brutal 6px offset shadow so the
    // mobile stat cards line up edge-to-edge in the 2-col grid (per user req).
    <BrutalCard className="flex h-[320px] flex-col [&::after]:content-none">
      {flipped ? (
        <>
          {darkHalf}
          {lightHalf}
        </>
      ) : (
        <>
          {lightHalf}
          {darkHalf}
        </>
      )}
    </BrutalCard>
  );
}

function MobileWorkHistory() {
  // Mobile work history as a 2×2 square grid — denser composition than the
  // stacked horizontal list. Big monogram top-left, optional years badge
  // top-right (or acid dot for current role), company + role anchored to the
  // bottom of the card.
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.2 }}
      className="grid grid-cols-2 gap-[12px]"
    >
      {WORK_HISTORY.map((entry) => (
        <BrutalCard
          key={`${entry.company}-${entry.role}`}
          className="relative flex aspect-square w-full flex-col justify-between p-[14px] [&::after]:content-none"
        >
          {/* Top — initial + years badge or acid dot */}
          <div className="flex items-start justify-between">
            <span className="font-display text-[44px] leading-[0.85] tracking-[-0.04em] text-fg-primary">
              {entry.initial}
            </span>
            {entry.years ? (
              <div className="flex h-[40px] w-[44px] shrink-0 flex-col items-center justify-center bg-fg-primary text-fg-inverted">
                <p className="font-display leading-[0.88] tracking-[-0.01em]">
                  <span className="text-[16px]">{entry.years.replace("+", "")}</span>
                  <span className="text-[10px]">+</span>
                </p>
                <p className="font-display text-[6px] tracking-[0.18em]">YEARS</p>
              </div>
            ) : (
              <span className="font-mono text-[9px] tracking-[0.08em] text-fg-muted pt-[6px]">
                ARCHIVE
              </span>
            )}
          </div>

          {/* Bottom — company + role */}
          <div className="flex flex-col gap-[2px]">
            <p className="font-body text-[18px] font-bold leading-none tracking-[-0.01em] text-fg-primary">
              {entry.company}
            </p>
            <p className="font-body text-[11px] font-medium leading-[1.3] text-fg-secondary">
              {entry.role}
            </p>
          </div>

          {/* Current indicator — acid dot in the top-right corner, sits above
              the years badge so the dot reads as a status badge on it. */}
          {entry.current && (
            <motion.span
              className="absolute top-[8px] right-[8px] block size-[6px] rounded-full bg-acid"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          )}
        </BrutalCard>
      ))}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SHARED — Timeline strip (responsive)
// ════════════════════════════════════════════════════════════════════

function Timeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.3 }}
    >
      <BrutalCard className="flex w-full flex-col gap-[10px] p-[16px] md:gap-[14px] md:p-[28px]">
        <div className="flex items-center justify-between whitespace-nowrap">
          <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary md:text-[11px]">
            {`// TIMELINE`}
          </p>
          <p className="font-mono text-[9px] tracking-[0.06em] text-fg-muted md:text-[10px]">
            EST. 2014
          </p>
        </div>

        {/* Tick row — flex distributes ticks evenly across full width.
            Each tick grows from the bottom with a staggered delay, so the
            timeline reveals as a left-to-right "echo" wave when it scrolls
            into view. transformOrigin: bottom keeps the growth grounded to
            the baseline rather than centered. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
          }}
          className="flex items-end justify-between"
        >
          {TIMELINE_TICKS.map((tick, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { scaleY: 0, opacity: 0 },
                visible: {
                  scaleY: 1,
                  opacity: 1,
                  transition: { duration: 0.45, ease: BRUTAL_EASE },
                },
              }}
              className={`block w-[3px] shrink-0 ${tick.acid ? "bg-acid" : "bg-fg-primary"}`}
              style={{ height: tick.height, transformOrigin: "bottom" }}
              aria-hidden
            />
          ))}
        </motion.div>

        {/* Year labels */}
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.04em] whitespace-nowrap">
          <p className="text-fg-muted">2014</p>
          <p className="font-bold text-acid">2026</p>
        </div>

        {/* Caption */}
        <div className="flex flex-col gap-[2px]">
          <p className="font-body text-[18px] font-medium leading-none tracking-[-0.01em] text-fg-primary md:text-[20px]">
            10+ Years
          </p>
          <p className="font-mono text-[9px] tracking-[0.06em] text-fg-muted md:text-[10px]">
            designing · shipping · learning
          </p>
        </div>
      </BrutalCard>
    </motion.div>
  );
}
