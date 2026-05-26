"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRUTAL_EASE, VIEWPORT } from "@/lib/animations";
import { BrutalCard } from "@/components/primitives/BrutalCard";

const SPARKLE = "/icons/skills/skillssparkle.svg";

// ────────────────────────────────────────────────────────────────────
// DATA — 3 social/status cards (Instagram · LinkedIn · Status)
// ────────────────────────────────────────────────────────────────────

type ContactCard = {
  id: string;
  label: string;
  handle: string;
  meta: string;
  href?: string;
  accent?: boolean; // acid green dot (Status card)
};

const CARDS: ContactCard[] = [
  {
    id: "instagram",
    label: "INSTAGRAM",
    handle: "@fyymaz",
    meta: "VISUAL · DAILY POSTS · BTS",
    href: "https://instagram.com/fyymaz",
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    handle: "A.F. Yılmaz",
    meta: "PRO NETWORK · CV INSIDE",
    href: "https://www.linkedin.com/in/ahmet-furkan-yilmaz",
  },
  {
    id: "status",
    label: "STATUS",
    handle: "Open · Available",
    meta: "FREELANCE · COLLAB",
    accent: true,
  },
];

// ────────────────────────────────────────────────────────────────────
// Main section
// ────────────────────────────────────────────────────────────────────

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full px-[20px] pt-0 pb-[40px] md:px-[80px] md:pt-0 md:pb-[60px]"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section meta — desktop only */}
        <div className="hidden items-center justify-between pb-[16px] font-mono md:flex">
          <p className="text-[13px] text-fg-secondary">
            {`// section 06 — contacts`}
          </p>
          <p className="text-[12px] text-fg-muted">06 / 06</p>
        </div>

        {/* ─────── DESKTOP LAYOUT (>= md) ─────── */}
        <div className="hidden flex-col gap-[24px] md:flex">
          <DesktopHeader />
          <DesktopCardsRow />
          <DesktopCTA />
        </div>

        {/* ─────── MOBILE LAYOUT (< md) — bento grid ─────── */}
        {/* Bento rhythm:
            1. CONTACT wordmark (full width)
            2. Instagram + LinkedIn (2-col)
            3. Status card (full width, acid dot)
            4. Dark CTA hero (full width tall) */}
        <div className="flex flex-col gap-[12px] md:hidden">
          <MobileHeader />
          <div className="grid grid-cols-2 gap-[12px]">
            <MobileSocialCard card={CARDS[0]} />
            <MobileSocialCard card={CARDS[1]} />
            <div className="col-span-2">
              <MobileSocialCard card={CARDS[2]} wide />
            </div>
          </div>
          <MobileCTA />
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
      className="flex h-[200px] items-center gap-[24px]"
    >
      {/* Left wide — CONTACT wordmark */}
      <BrutalCard className="flex h-[200px] flex-1 flex-col justify-between p-[28px]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[12px] font-bold tracking-[0.12em] text-fg-primary">
            ↘ LET&apos;S TALK · COLLAB · BUILD
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">
            OPEN TO PROJECTS
          </p>
        </div>
        {/* 7 chars vs CAREER's 6 — slightly smaller font so we keep the same
            fill ratio without overflowing the 28px padding. */}
        <h2 className="font-display text-[124px] leading-[0.88] uppercase tracking-[-0.02em] text-fg-primary whitespace-nowrap">
          CONTACT
        </h2>
      </BrutalCard>

      {/* Right — // MARK · 06 + index + meta */}
      <BrutalCard className="flex h-[200px] w-[413px] flex-col justify-between p-[28px]">
        <div className="flex items-start justify-between">
          <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
            {`// MARK · 06`}
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
            06
          </span>
          <div className="flex flex-col items-end pb-[8px] font-mono text-fg-muted">
            <span className="text-[14px] tracking-[0.04em]">/06</span>
            <span className="text-[9px] tracking-[0.06em]">INBOX</span>
          </div>
          <div className="flex flex-1 flex-col items-end pb-[6px]">
            <p className="font-body text-[18px] font-bold leading-[1.15] tracking-[-0.01em] text-fg-primary text-right">
              Let&apos;s
            </p>
            <p className="font-body text-[18px] font-bold leading-[1.15] tracking-[-0.01em] text-fg-primary text-right">
              collaborate
            </p>
          </div>
        </div>
      </BrutalCard>
    </motion.div>
  );
}

function DesktopCardsRow() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
      className="grid grid-cols-3 gap-[24px]"
    >
      {CARDS.map((card) => (
        <DesktopSocialCard key={card.id} card={card} />
      ))}
    </motion.div>
  );
}

function DesktopSocialCard({ card }: { card: ContactCard }) {
  const content = (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: BRUTAL_EASE },
        },
      }}
      whileHover={{ y: -4 }}
      className="block"
    >
      <BrutalCard className="relative flex h-[180px] w-full flex-col justify-between p-[24px]">
        {/* TOP — label + arrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            {card.accent ? (
              <motion.span
                className="block size-[8px] rounded-full bg-acid"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
            ) : (
              <span
                className="block size-[8px] bg-fg-primary"
                aria-hidden
              />
            )}
            <p className="font-mono text-[12px] font-bold tracking-[0.12em] text-fg-primary">
              {card.label}
            </p>
          </div>
          <span
            className="font-mono text-[16px] font-bold text-fg-primary"
            aria-hidden
          >
            ↗
          </span>
        </div>

        {/* MIDDLE — handle */}
        <p className="font-body text-[28px] font-bold leading-[1.1] tracking-[-0.01em] text-fg-primary">
          {card.handle}
        </p>

        {/* BOTTOM — meta */}
        <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted whitespace-nowrap">
          {card.meta}
        </p>
      </BrutalCard>
    </motion.div>
  );

  if (card.href) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        aria-label={`${card.label} — ${card.handle}`}
      >
        {content}
      </a>
    );
  }
  return content;
}

function DesktopCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: BRUTAL_EASE }}
    >
      <BrutalCard tone="dark" className="flex w-full flex-col justify-between gap-[40px] p-[40px]">
        {/* TOP META row */}
        <div className="flex items-center justify-between whitespace-nowrap">
          <div className="flex items-center gap-[10px]">
            <motion.span
              className="block size-[8px] rounded-full bg-acid"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <p className="font-mono text-[12px] font-bold tracking-[0.12em] text-fg-inverted">
              AVAILABLE · OPEN TO NEW PROJECTS
            </p>
          </div>
          <p className="font-mono text-[11px] tracking-[0.08em] text-fg-inverted">
            EST. 2014 · KADIKÖY · İSTANBUL
          </p>
        </div>

        {/* BIG SPLIT TYPOGRAPHY — 2-line title with acid second line.
            Word-by-word stagger via Framer Motion variants so the line lands
            in a brutal rolling reveal as it scrolls in. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
          }}
          className="flex flex-col gap-[6px]"
        >
          <motion.h2
            variants={titleLineVariants}
            className="font-display text-[120px] leading-[0.92] uppercase tracking-[-0.02em] text-fg-inverted"
          >
            LET&apos;S BUILD
          </motion.h2>
          <motion.h2
            variants={titleLineVariants}
            className="font-display text-[120px] leading-[0.92] uppercase tracking-[-0.02em] text-acid"
          >
            SOMETHING TOGETHER.
          </motion.h2>
        </motion.div>

        {/* BOTTOM email row */}
        <div className="flex items-center justify-between whitespace-nowrap">
          <a
            href="mailto:fyymaz@gmail.com"
            data-cursor="link"
            className="group flex items-center gap-[14px] transition-opacity hover:opacity-80"
          >
            <span
              className="font-mono text-[18px] font-bold text-fg-inverted"
              aria-hidden
            >
              →
            </span>
            <span className="font-body text-[26px] font-bold leading-none tracking-[-0.01em] text-fg-inverted underline decoration-transparent underline-offset-[6px] transition-colors group-hover:decoration-acid">
              fyymaz@gmail.com
            </span>
          </a>
          <p className="font-mono text-[11px] tracking-[0.08em] text-fg-inverted">
            24H RESPONSE · M-F
          </p>
        </div>
      </BrutalCard>
    </motion.div>
  );
}

const titleLineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: BRUTAL_EASE },
  },
};

// ════════════════════════════════════════════════════════════════════
// MOBILE — bento grid
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
            ↘ LET&apos;S TALK · COLLAB · BUILD
          </p>
          <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted">
            {`// MARK · 06`}
          </p>
        </div>
        <div className="flex items-center gap-[12px]">
          <span className="font-display text-[36px] leading-[0.88] tracking-[-0.06em] text-fg-primary">
            06
          </span>
          <div className="flex flex-col font-mono text-fg-muted">
            <span className="text-[13px] tracking-[0.04em]">/06</span>
            <span className="text-[9px] tracking-[0.06em]">INBOX</span>
          </div>
          <div className="ml-auto flex flex-col items-end gap-[2px] font-mono text-fg-muted">
            <p className="text-[9px] tracking-[0.06em]">OPEN TO PROJECTS</p>
            <p className="text-[9px] tracking-[0.06em]">24H RESPONSE · M-F</p>
          </div>
        </div>
        {/* 7 chars in Monument Extended — 60px with tightened tracking lands
            close to CAREER's 70px fill ratio on a 375px viewport. */}
        <h2 className="font-display text-[60px] leading-none uppercase tracking-[-0.04em] text-fg-primary whitespace-nowrap">
          CONTACT
        </h2>
      </BrutalCard>
    </motion.div>
  );
}

function MobileSocialCard({
  card,
  wide = false,
}: {
  card: ContactCard;
  wide?: boolean;
}) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: BRUTAL_EASE }}
      className="block h-full"
    >
      <BrutalCard
        className={`relative flex h-full w-full flex-col justify-between p-[14px] ${
          wide ? "min-h-[110px]" : "min-h-[140px]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            {card.accent ? (
              <motion.span
                className="block size-[7px] rounded-full bg-acid"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
            ) : (
              <span className="block size-[7px] bg-fg-primary" aria-hidden />
            )}
            <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
              {card.label}
            </p>
          </div>
          <span
            className="font-mono text-[13px] font-bold text-fg-primary"
            aria-hidden
          >
            ↗
          </span>
        </div>
        <p
          className={`font-body font-bold leading-[1.1] tracking-[-0.01em] text-fg-primary ${
            wide ? "text-[22px]" : "text-[18px]"
          }`}
        >
          {card.handle}
        </p>
        <p className="font-mono text-[8.5px] tracking-[0.08em] text-fg-muted whitespace-nowrap">
          {card.meta}
        </p>
      </BrutalCard>
    </motion.div>
  );

  if (card.href) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        aria-label={`${card.label} — ${card.handle}`}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function MobileCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE }}
    >
      <BrutalCard tone="dark" className="flex w-full flex-col gap-[24px] p-[20px]">
        {/* TOP meta — stacked on mobile so labels stay readable */}
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center gap-[8px]">
            <motion.span
              className="block size-[7px] rounded-full bg-acid"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-inverted">
              AVAILABLE · OPEN TO NEW PROJECTS
            </p>
          </div>
          <p className="font-mono text-[9px] tracking-[0.08em] text-fg-inverted/70">
            EST. 2014 · KADIKÖY · İSTANBUL
          </p>
        </div>

        {/* Title — word-by-word stagger same as desktop */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
          }}
          className="flex flex-col gap-[2px]"
        >
          <motion.h2
            variants={titleLineVariants}
            className="font-display text-[44px] leading-[0.92] uppercase tracking-[-0.02em] text-fg-inverted"
          >
            LET&apos;S BUILD
          </motion.h2>
          <motion.h2
            variants={titleLineVariants}
            className="font-display text-[44px] leading-[0.92] uppercase tracking-[-0.02em] text-acid"
          >
            SOMETHING TOGETHER.
          </motion.h2>
        </motion.div>

        {/* Email + response row */}
        <div className="flex flex-col gap-[10px]">
          <a
            href="mailto:fyymaz@gmail.com"
            className="flex items-center gap-[10px]"
          >
            <span
              className="font-mono text-[14px] font-bold text-fg-inverted"
              aria-hidden
            >
              →
            </span>
            <span className="font-body text-[18px] font-bold leading-none tracking-[-0.01em] text-fg-inverted underline decoration-acid underline-offset-[6px]">
              fyymaz@gmail.com
            </span>
          </a>
          <p className="font-mono text-[9px] tracking-[0.08em] text-fg-inverted/70">
            24H RESPONSE · M-F
          </p>
        </div>
      </BrutalCard>
    </motion.div>
  );
}
