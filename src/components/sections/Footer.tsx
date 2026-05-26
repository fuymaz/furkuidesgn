"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRUTAL_EASE, VIEWPORT } from "@/lib/animations";
import { scrollToAnchor } from "@/lib/lenis";

// ────────────────────────────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { num: "00", label: "HERO", href: "#hero" },
  { num: "02", label: "MYSELF", href: "#myself" },
  { num: "03", label: "SKILLS", href: "#skills" },
  { num: "04", label: "CAREER", href: "#career" },
  { num: "05", label: "WORK", href: "#work" },
  { num: "06", label: "CONTACT", href: "#contact" },
] as const;

const EMAIL_LINES = [
  "fyymaz@gmail.com",
  "24h response · M-F",
  "open inbox",
];

const SOCIAL_LINES: { label: string; handle: string; href?: string }[] = [
  {
    label: "INSTAGRAM",
    handle: "@fyymaz",
    href: "https://instagram.com/fyymaz",
  },
  {
    label: "LINKEDIN",
    handle: "A.F. Yılmaz",
    href: "https://www.linkedin.com/in/ahmet-furkan-yilmaz",
  },
  { label: "READ.CV", handle: "soon" },
];

const STATUS_LINES = [
  "● open · available",
  "freelance · collab",
  "kadıköy/istanbul",
  "est. 2014",
];

// ────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────

export function Footer() {
  // Smooth-scrolls to the top via Lenis so the glide matches every other nav
  // link in the project. Offset 0 lands at the absolute top of the page.
  function handleBackToTop(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    scrollToAnchor("#hero", { offset: 0 });
  }

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    scrollToAnchor(href, { offset: href === "#hero" ? 0 : -90 });
  }

  return (
    <footer className="relative w-full bg-bg-inverted text-fg-inverted">
      {/* Mobile pb leaves room for the floating bottom tab bar (60px nav +
          safe-area inset + breathing room). Desktop uses normal padding. */}
      <div className="mx-auto max-w-[1440px] px-[20px] pt-[40px] pb-[140px] md:px-[80px] md:pt-[80px] md:pb-[60px]">
        <TopRow onBackToTop={handleBackToTop} />
        <Divider />
        <DataGrid onNavClick={handleNavClick} />
        <Divider />
        <BottomRow />
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────────
// Top row — big FRKN wordmark + BACK TO TOP + portfolio END caption
// ────────────────────────────────────────────────────────────────────

function TopRow({
  onBackToTop,
}: {
  onBackToTop: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE }}
    >
      <div className="flex items-start justify-between gap-[16px]">
        {/* Static footer FRKN wordmark — already exported in the light treatment
            for dark surfaces, so no invert filter needed. Aspect 609:116 ≈ 5.25:1. */}
        <div className="relative h-[53px] w-[280px] md:h-[114px] md:w-[600px]">
          <Image
            src="/icons/footerfrkn.svg"
            alt="FRKN"
            fill
            priority
            sizes="(max-width: 768px) 280px, 600px"
            className="object-contain object-left"
          />
        </div>

        <a
          href="#hero"
          onClick={onBackToTop}
          data-cursor="link"
          className="group flex flex-col items-end gap-[6px] pt-[6px] font-mono text-[11px] tracking-[0.12em] text-fg-inverted md:gap-[10px] md:text-[13px]"
          aria-label="Back to top"
        >
          <span className="font-bold">BACK TO TOP</span>
          <span
            className="font-mono text-[16px] leading-none transition-transform duration-300 group-hover:-translate-y-1 md:text-[20px]"
            aria-hidden
          >
            ↑
          </span>
        </a>
      </div>

      <p className="mt-[14px] flex items-center gap-[8px] font-mono text-[10px] tracking-[0.12em] text-fg-inverted md:mt-[10px] md:text-[12px]">
        <span>↘ PORTFOLIO · END</span>
        <span className="text-acid" aria-hidden>
          ✷
        </span>
      </p>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// 4-cell data grid — NAV · EMAIL · SOCIAL · STATUS
// ────────────────────────────────────────────────────────────────────

function DataGrid({
  onNavClick,
}: {
  onNavClick: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
      className="grid grid-cols-2 gap-x-[16px] gap-y-[28px] md:grid-cols-4 md:gap-x-[24px]"
    >
      <Cell label="NAV">
        <ul className="flex flex-col gap-[6px] font-mono text-[11px] tracking-[0.06em] text-fg-inverted md:text-[12px]">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
                data-cursor="link"
                className="inline-flex items-center gap-[8px] transition-opacity hover:opacity-70"
              >
                <span className="text-fg-inverted/70">{link.num}</span>
                <span>·</span>
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </Cell>

      <Cell label="EMAIL">
        <div className="flex flex-col gap-[6px] font-mono text-[11px] tracking-[0.06em] text-fg-inverted md:text-[12px]">
          <a
            href="mailto:fyymaz@gmail.com"
            data-cursor="link"
            className="font-body text-[15px] font-bold tracking-[-0.01em] transition-opacity hover:opacity-70 md:text-[16px]"
          >
            {EMAIL_LINES[0]}
          </a>
          <p className="text-fg-inverted/70">{EMAIL_LINES[1]}</p>
          <p className="text-fg-inverted/70">{EMAIL_LINES[2]}</p>
        </div>
      </Cell>

      <Cell label="SOCIAL">
        <ul className="flex flex-col gap-[6px] font-mono text-[11px] tracking-[0.06em] text-fg-inverted md:text-[12px]">
          {SOCIAL_LINES.map((social) => {
            const inner = (
              <span className="inline-flex flex-wrap items-center gap-[6px]">
                <span>{social.label}</span>
                <span aria-hidden>·</span>
                <span className="text-fg-inverted/80">{social.handle}</span>
              </span>
            );
            return (
              <li key={social.label}>
                {social.href ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="transition-opacity hover:opacity-70"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </Cell>

      <Cell label="STATUS" accent>
        <ul className="flex flex-col gap-[6px] font-mono text-[11px] tracking-[0.06em] text-fg-inverted md:text-[12px]">
          {STATUS_LINES.map((line, i) => (
            <li
              key={line}
              className={
                i === 0
                  ? "inline-flex items-center gap-[6px]"
                  : "text-fg-inverted/80"
              }
            >
              {i === 0 ? (
                <>
                  <motion.span
                    className="block size-[6px] rounded-full bg-acid"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  />
                  <span>{line.replace("● ", "")}</span>
                </>
              ) : (
                line
              )}
            </li>
          ))}
        </ul>
      </Cell>
    </motion.div>
  );
}

function Cell({
  label,
  accent,
  children,
}: {
  label: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: BRUTAL_EASE },
        },
      }}
      className="flex flex-col gap-[14px] md:gap-[18px]"
    >
      <div className="flex items-center gap-[8px]">
        {accent ? (
          <motion.span
            className="block size-[8px] rounded-full bg-acid"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        ) : (
          <span className="block size-[8px] bg-fg-inverted" aria-hidden />
        )}
        <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-fg-inverted md:text-[12px]">
          {label}
        </p>
      </div>
      {children}
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Bottom row — copyright + DESIGNED IN ISTANBUL
// ────────────────────────────────────────────────────────────────────

function BottomRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: BRUTAL_EASE }}
      className="flex flex-col gap-[10px] font-mono text-[10px] tracking-[0.08em] text-fg-inverted md:flex-row md:items-center md:justify-between md:text-[11px]"
    >
      <p className="flex flex-wrap items-center gap-x-[12px] gap-y-[4px]">
        <span>© 2026 · AHMET FURKAN YILMAZ</span>
        <span className="hidden text-fg-inverted/50 md:inline">|</span>
        <span>MADE IN KADIKÖY · WITH SPITE &amp; LOVE</span>
      </p>
      <p className="flex items-center gap-[8px] text-acid">
        <span>DESIGNED IN ISTANBUL</span>
        <span aria-hidden>✷</span>
      </p>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Shared
// ────────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: BRUTAL_EASE }}
      style={{ transformOrigin: "left" }}
      className="my-[28px] h-px w-full bg-fg-inverted/30 md:my-[44px]"
    />
  );
}
