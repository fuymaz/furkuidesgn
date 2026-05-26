"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRUTAL_EASE, VIEWPORT } from "@/lib/animations";
import { BrutalCard } from "@/components/primitives/BrutalCard";

const SPARKLE = "/icons/skills/skillssparkle.svg";

// ────────────────────────────────────────────────────────────────────
// DATA — 6 projects, checkerboard dark/light bottoms
// ────────────────────────────────────────────────────────────────────

type Project = {
  slug: string;
  index: string;
  indexAccent: boolean; // acid ✷ next to label (featured marker)
  year: string;
  mono: string; // Au / Nv / At / Fo / Pu / Bc
  name: string;
  topMetaLeft: string;
  topMetaRight: string;
  description: string | null; // only on dark bottoms
  bottomLeft: string;
  darkBottom: boolean;
  featured?: boolean; // adds the acid dot indicator on dark bottom
};

// Mobile card variants:
//   - "feature": col-span-2, tall half-half (used for the hero/featured slot)
//   - "default": col-span-1, compact half-half (paired in 2-col rows)
//   - "wide":    col-span-2, horizontal banner (visual break between pairs)
type MobileVariant = "feature" | "default" | "wide";

const MOBILE_ORDER: { slug: string; variant: MobileVariant }[] = [
  // Uniform 2-col grid: all 6 cards as the default half-half variant. Aurum
  // still reads as featured via its acid dot + ✷ accent + dark bottom, but
  // its dimensions match the rest of the grid.
  { slug: "aurum", variant: "default" },
  { slug: "nova", variant: "default" },
  { slug: "atlas", variant: "default" },
  { slug: "forge", variant: "default" },
  { slug: "pulse", variant: "default" },
  { slug: "beacon", variant: "default" },
];

const PROJECTS: Project[] = [
  {
    slug: "aurum",
    index: "FEATURED · 01",
    indexAccent: true,
    year: "2025",
    mono: "Au",
    name: "AURUM",
    topMetaLeft: "FINTECH · MOBILE",
    topMetaRight: "MASTER",
    description:
      "Banking redesign for 100K+ active users. End-to-end product design with motion.",
    bottomLeft: "FEATURED",
    darkBottom: true,
    featured: true,
  },
  {
    slug: "nova",
    index: "// 02",
    indexAccent: false,
    year: "2024",
    mono: "Nv",
    name: "NOVA",
    topMetaLeft: "BRAND · IDENTITY",
    topMetaRight: "STARTUP",
    description: null,
    bottomLeft: "STARTUP · SYSTEM",
    darkBottom: false,
  },
  {
    slug: "atlas",
    index: "// 03",
    indexAccent: false,
    year: "2024",
    mono: "At",
    name: "ATLAS",
    topMetaLeft: "PRODUCT · B2B",
    topMetaRight: "MASTER",
    description:
      "Enterprise CRM redesign serving 500+ accounts. Component library and key flows.",
    bottomLeft: "ENTERPRISE · CRM",
    darkBottom: true,
  },
  {
    slug: "forge",
    index: "// 04",
    indexAccent: false,
    year: "2023",
    mono: "Fo",
    name: "FORGE",
    topMetaLeft: "BRAND",
    topMetaRight: "LOGO · MARK",
    description: null,
    bottomLeft: "LOGO · MARK",
    darkBottom: false,
  },
  {
    slug: "pulse",
    index: "// 05",
    indexAccent: false,
    year: "2023",
    mono: "Pu",
    name: "PULSE",
    topMetaLeft: "MOTION",
    topMetaRight: "EXPLAINER",
    description:
      "Motion-led explainer for a SaaS product launch. 90-second narrative with custom art.",
    bottomLeft: "MOTION · LOOP",
    darkBottom: true,
  },
  {
    slug: "beacon",
    index: "// 06",
    indexAccent: false,
    year: "2022",
    mono: "Bc",
    name: "BEACON",
    topMetaLeft: "UX",
    topMetaRight: "ONBOARDING",
    description: null,
    bottomLeft: "ONBOARDING · FLOW",
    darkBottom: false,
  },
];

// ────────────────────────────────────────────────────────────────────
// Main section
// ────────────────────────────────────────────────────────────────────

export function Work() {
  return (
    <section
      id="work"
      className="relative w-full px-[20px] pt-0 pb-[40px] md:px-[80px] md:pt-[8px] md:pb-[60px]"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section meta — desktop only */}
        <div className="hidden items-center justify-between pb-[16px] font-mono md:flex">
          <p className="text-[13px] text-fg-secondary">
            {`// section 05 — work · projects`}
          </p>
          <p className="text-[12px] text-fg-muted">05 / 06</p>
        </div>

        {/* ─────── DESKTOP LAYOUT (>= md) ─────── */}
        <div className="hidden flex-col gap-[24px] md:flex">
          <DesktopHeader />
          <DesktopGrid />
        </div>

        {/* ─────── MOBILE LAYOUT (< md) ─────── */}
        {/* Asymmetric 2-col grid: Aurum (featured) spans full width tall,
            Nova+Atlas as paired square cards, Forge as a horizontal banner
            spanning full width, Pulse+Beacon paired again. Bookending wide
            cards create rhythm without letting the default cards float. */}
        <div className="flex flex-col gap-[12px] md:hidden">
          <MobileHeader />
          <div className="grid grid-cols-2 gap-[12px]">
            {MOBILE_ORDER.map(({ slug, variant }, i) => {
              const project = PROJECTS.find((p) => p.slug === slug);
              if (!project) return null;
              const span = variant === "default" ? "" : "col-span-2";
              return (
                <div key={slug} className={span}>
                  <MobileProjectCard
                    project={project}
                    variant={variant}
                    delay={i * 0.06}
                  />
                </div>
              );
            })}
          </div>
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
      {/* Left wide — WORK wordmark */}
      <BrutalCard className="flex h-[186px] flex-1 flex-col justify-between p-[28px]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[12px] font-bold tracking-[0.12em] text-fg-primary">
            ↘ PROJECTS · CASES · CRAFT
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">
            7 SELECTED · 50+ TOTAL
          </p>
        </div>
        {/* WORK is only 4 chars — bigger font matches CAREER's card-fill ratio. */}
        <h2 className="font-display text-[160px] leading-none uppercase text-fg-primary whitespace-nowrap">
          WORK
        </h2>
      </BrutalCard>

      {/* Right — // MARK · 05 + index + meta */}
      <BrutalCard className="flex h-[186px] w-[413px] flex-col justify-between p-[28px]">
        <div className="flex items-start justify-between">
          <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
            {`// MARK · 05`}
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
            05
          </span>
          <div className="flex flex-col items-end pb-[8px] font-mono text-fg-muted">
            <span className="text-[14px] tracking-[0.04em]">/06</span>
            <span className="text-[9px] tracking-[0.06em]">ARCHIVE</span>
          </div>
          <div className="flex flex-1 flex-col items-end gap-[6px] pb-[8px]">
            <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted text-right whitespace-nowrap">
              06 FEATURED · 50+ TOTAL
            </p>
            <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted text-right whitespace-nowrap">
              FROM 2022 TO 2025
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
      {PROJECTS.map((project) => (
        <DesktopProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}

function DesktopProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={`#work-${project.slug}`}
      onClick={(e) => {
        // Phase 2 — wire up to /work/[slug] detail pages.
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log(`[work] open ${project.slug}`);
      }}
      data-cursor="view"
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: BRUTAL_EASE },
        },
      }}
      whileHover={{ y: -4 }}
      className="block"
    >
      <BrutalCard className="relative flex h-[400px] w-full flex-col">
        {/* TOP HALF — light, monogram + meta */}
        <div className="flex h-[230px] flex-col justify-between bg-bg-surface-alt p-[24px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-fg-primary whitespace-nowrap">
                {project.index}
              </p>
              {project.indexAccent && (
                <span aria-hidden className="text-[14px] leading-[0.9] text-acid">
                  ✷
                </span>
              )}
            </div>
            <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">
              {project.year}
            </p>
          </div>
          <div className="flex flex-1 items-center">
            <p className="font-display text-[90px] leading-[0.88] tracking-[0.06em] text-fg-primary whitespace-nowrap">
              {project.mono}
            </p>
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] whitespace-nowrap">
            <p className="font-bold tracking-[0.12em] text-fg-primary">
              {project.topMetaLeft}
            </p>
            <p className="tracking-[0.06em] text-fg-muted">{project.topMetaRight}</p>
          </div>
        </div>

        {/* BOTTOM HALF — dark (with description) or light (compact) */}
        {project.darkBottom ? (
          <div className="flex flex-1 flex-col justify-between bg-bg-inverted p-[24px]">
            <h3 className="font-display text-[30px] leading-none tracking-[-0.015em] uppercase text-fg-inverted whitespace-nowrap">
              {project.name}
            </h3>
            {project.description && (
              <p className="font-body text-[13px] font-medium leading-[1.4] text-fg-inverted">
                {project.description}
              </p>
            )}
            <div className="flex items-center justify-between whitespace-nowrap">
              <div className="flex items-center gap-[8px]">
                {project.featured && (
                  <motion.span
                    className="block size-[6px] rounded-full bg-acid"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  />
                )}
                <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-inverted">
                  {project.bottomLeft}
                </p>
              </div>
              <span className="font-mono text-[13px] font-bold text-fg-inverted" aria-hidden>
                ↗
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-between bg-bg-surface-alt p-[24px]">
            <h3 className="font-display text-[30px] leading-none tracking-[-0.015em] uppercase text-fg-primary whitespace-nowrap">
              {project.name}
            </h3>
            <div className="flex items-center justify-between whitespace-nowrap">
              <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
                {project.bottomLeft}
              </p>
              <span className="font-mono text-[13px] font-bold text-fg-primary" aria-hidden>
                ↗
              </span>
            </div>
          </div>
        )}
      </BrutalCard>
    </motion.a>
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
            ↘ PROJECTS · CASES · CRAFT
          </p>
          <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted">
            {`// MARK · 05`}
          </p>
        </div>
        <div className="flex items-center gap-[12px]">
          <span className="font-display text-[36px] leading-[0.88] tracking-[-0.06em] text-fg-primary">
            05
          </span>
          <div className="flex flex-col font-mono text-fg-muted">
            <span className="text-[13px] tracking-[0.04em]">/06</span>
            <span className="text-[9px] tracking-[0.06em]">ARCHIVE</span>
          </div>
          <div className="ml-auto flex flex-col items-end gap-[2px] font-mono text-fg-muted">
            <p className="text-[9px] tracking-[0.06em]">06 FEATURED · 50+ TOTAL</p>
            <p className="text-[9px] tracking-[0.06em]">FROM 2022 TO 2025</p>
          </div>
        </div>
        {/* 100px was spilling out of the 303px inner card width — 88px lands
            ~90% fill without overflow on 375px viewports. */}
        <h2 className="font-display text-[88px] leading-none uppercase text-fg-primary whitespace-nowrap">
          WORK
        </h2>
      </BrutalCard>
    </motion.div>
  );
}

function MobileProjectCard({
  project,
  variant,
  delay,
}: {
  project: Project;
  variant: MobileVariant;
  delay: number;
}) {
  if (variant === "wide") {
    return <MobileWideCard project={project} delay={delay} />;
  }
  return <MobileHalfHalfCard project={project} variant={variant} delay={delay} />;
}

// Half-half card used for both "feature" (col-span-2 tall, full description)
// and "default" (col-span-1 compact, no description on dark bottom). Sharing
// markup keeps the two variants visually anchored to the same vocabulary.
function MobileHalfHalfCard({
  project,
  variant,
  delay,
}: {
  project: Project;
  variant: "feature" | "default";
  delay: number;
}) {
  const isFeature = variant === "feature";
  const padding = isFeature ? "p-[18px]" : "p-[12px]";
  const topGap = isFeature ? "gap-[14px]" : "gap-[8px]";
  const monoSize = isFeature ? "text-[96px]" : "text-[52px]";
  const nameSize = isFeature ? "text-[30px]" : "text-[18px]";
  const indexSize = isFeature ? "text-[10px]" : "text-[8.5px]";
  const accentSize = isFeature ? "text-[13px]" : "text-[10px]";
  const yearSize = isFeature ? "text-[10px]" : "text-[8.5px]";
  const metaSize = isFeature ? "text-[9.5px]" : "text-[7.5px]";
  const descSize = isFeature ? "text-[12.5px]" : "text-[10.5px]";
  const arrowSize = isFeature ? "text-[14px]" : "text-[11px]";
  const dotSize = isFeature ? "size-[6px]" : "size-[5px]";
  const bottomGap = isFeature ? "gap-[14px]" : "gap-[8px]";

  return (
    <motion.a
      href={`#work-${project.slug}`}
      onClick={(e) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log(`[work] open ${project.slug}`);
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: BRUTAL_EASE, delay }}
      className="block h-full"
    >
      <BrutalCard className="relative flex h-full w-full flex-col">
        {/* TOP HALF — light, monogram + meta */}
        <div className={`flex flex-1 flex-col justify-between bg-bg-surface-alt ${topGap} ${padding}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <p className={`font-mono ${indexSize} font-bold tracking-[0.12em] text-fg-primary whitespace-nowrap`}>
                {project.index}
              </p>
              {project.indexAccent && (
                <span aria-hidden className={`${accentSize} leading-[0.9] text-acid`}>
                  ✷
                </span>
              )}
            </div>
            <p className={`font-mono ${yearSize} tracking-[0.08em] text-fg-muted`}>
              {project.year}
            </p>
          </div>
          <p className={`font-display ${monoSize} leading-[0.88] tracking-[0.04em] text-fg-primary whitespace-nowrap`}>
            {project.mono}
          </p>
          <div className={`flex items-center justify-between font-mono ${metaSize} whitespace-nowrap`}>
            <p className="font-bold tracking-[0.12em] text-fg-primary">
              {project.topMetaLeft}
            </p>
            <p className="tracking-[0.06em] text-fg-muted">{project.topMetaRight}</p>
          </div>
        </div>

        {/* BOTTOM HALF — dark or light */}
        {project.darkBottom ? (
          <div className={`flex flex-1 flex-col justify-between bg-bg-inverted ${bottomGap} ${padding}`}>
            <h3 className={`font-display ${nameSize} leading-none tracking-[-0.015em] uppercase text-fg-inverted whitespace-nowrap`}>
              {project.name}
            </h3>
            {isFeature && project.description && (
              <p className={`font-body ${descSize} font-medium leading-[1.4] text-fg-inverted`}>
                {project.description}
              </p>
            )}
            <div className="flex items-center justify-between whitespace-nowrap">
              <div className="flex items-center gap-[6px]">
                {project.featured && (
                  <motion.span
                    className={`block ${dotSize} rounded-full bg-acid`}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  />
                )}
                <p className={`font-mono ${metaSize} font-bold tracking-[0.12em] text-fg-inverted`}>
                  {project.bottomLeft}
                </p>
              </div>
              <span className={`font-mono ${arrowSize} font-bold text-fg-inverted`} aria-hidden>
                ↗
              </span>
            </div>
          </div>
        ) : (
          <div className={`flex flex-1 flex-col justify-between bg-bg-surface-alt ${bottomGap} ${padding}`}>
            <h3 className={`font-display ${nameSize} leading-none tracking-[-0.015em] uppercase text-fg-primary whitespace-nowrap`}>
              {project.name}
            </h3>
            <div className="flex items-center justify-between whitespace-nowrap">
              <p className={`font-mono ${metaSize} font-bold tracking-[0.12em] text-fg-primary`}>
                {project.bottomLeft}
              </p>
              <span className={`font-mono ${arrowSize} font-bold text-fg-primary`} aria-hidden>
                ↗
              </span>
            </div>
          </div>
        )}
      </BrutalCard>
    </motion.a>
  );
}

// Wide horizontal banner card — used for both Aurum (dark) and Forge (light).
// Left strip is always light (monogram + index + year); right half mirrors the
// project's own darkBottom flag so Aurum reads as a featured dark hero and
// Forge reads as a light banner — same skeleton, different palette.
function MobileWideCard({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  const isDark = project.darkBottom;
  const rightBg = isDark ? "bg-bg-inverted" : "bg-bg-surface-alt";
  const rightText = isDark ? "text-fg-inverted" : "text-fg-primary";
  const rightMuted = isDark ? "text-fg-inverted/70" : "text-fg-muted";

  return (
    <motion.a
      href={`#work-${project.slug}`}
      onClick={(e) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log(`[work] open ${project.slug}`);
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: BRUTAL_EASE, delay }}
      className="block"
    >
      <BrutalCard className="relative flex h-[122px] w-full">
        {/* Left strip — monogram + index + year, always light bg */}
        <div className="flex w-[118px] shrink-0 flex-col justify-between bg-bg-surface-alt p-[12px]">
          <div className="flex items-center gap-[5px]">
            <p className="font-mono text-[8.5px] font-bold tracking-[0.12em] text-fg-primary whitespace-nowrap">
              {project.index}
            </p>
            {project.indexAccent && (
              <span aria-hidden className="text-[10px] leading-[0.9] text-acid">
                ✷
              </span>
            )}
          </div>
          <p className="font-display text-[52px] leading-[0.88] tracking-[0.04em] text-fg-primary whitespace-nowrap">
            {project.mono}
          </p>
          <p className="font-mono text-[8px] tracking-[0.08em] text-fg-muted">
            {project.year}
          </p>
        </div>

        {/* Right — name + meta, dark or light per project */}
        <div className={`flex flex-1 flex-col justify-between p-[14px] ${rightBg}`}>
          <div className="flex items-start justify-between gap-[10px]">
            <h3 className={`font-display text-[26px] leading-none tracking-[-0.015em] uppercase whitespace-nowrap ${rightText}`}>
              {project.name}
            </h3>
            <p className={`pt-[4px] font-mono text-[8px] tracking-[0.08em] whitespace-nowrap ${rightMuted}`}>
              {project.topMetaRight}
            </p>
          </div>
          <div className="flex items-center justify-between whitespace-nowrap">
            <div className="flex items-center gap-[6px]">
              {project.featured && (
                <motion.span
                  className="block size-[6px] rounded-full bg-acid"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />
              )}
              <p className={`font-mono text-[8.5px] font-bold tracking-[0.12em] ${rightText}`}>
                {project.bottomLeft}
              </p>
            </div>
            <span className={`font-mono text-[13px] font-bold ${rightText}`} aria-hidden>
              ↗
            </span>
          </div>
        </div>
      </BrutalCard>
    </motion.a>
  );
}
