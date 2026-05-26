"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRUTAL_EASE } from "@/lib/animations";
import { scrollToAnchor } from "@/lib/lenis";
import { WordSwap } from "@/components/ui/WordSwap";

// In-page section nav at hero bottom — desktop only, mobile uses bottom tab bar.
const SECTION_LINKS = [
  { id: "02", label: "MYSELF", href: "#myself", arrow: "↓" },
  { id: "03", label: "SKILLS", href: "#skills", arrow: "↓" },
  { id: "04", label: "CAREER", href: "#career", arrow: "↓" },
  { id: "05", label: "WORK", href: "#work", arrow: "↓" },
  { id: "06", label: "CONTACT", href: "#contact", arrow: "↗" },
] as const;

// Edit this list to change the rotating identity in the HELLO pill.
const IDENTITY_WORDS = ["FURKAN", "DESIGNER", "ARTIST", "DREAMER"];

function HelloPill({ size }: { size: "sm" | "lg" }) {
  // size sm = mobile (19.5px text, 38px height), lg = desktop (37px text, 72px height)
  // Solid-dark variant: dropped the stepped-lift shadow plate per user request,
  // pill body is ink with inverted text. Tighter silhouette, more brutal.
  const small = size === "sm";
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.1 }}
      className="relative w-fit"
    >
      <div
        className={
          small
            ? "relative flex h-[38px] w-[320px] items-center bg-fg-primary px-[11px]"
            : "relative flex h-[64px] w-[500px] items-center bg-fg-primary px-[18px]"
        }
      >
        <p
          className={
            small
              ? "font-mono text-[19px] leading-[0.88] tracking-[1.56px] whitespace-nowrap text-fg-inverted"
              : "font-mono text-[32px] leading-[0.88] tracking-[2.4px] whitespace-nowrap text-fg-inverted"
          }
        >
          <span className="font-bold">{`» HELLO, I'M `}</span>
          {/* Fixed-width slot prevents pill-internal layout jump as the word swaps. */}
          <span
            className={
              small
                ? "relative inline-block w-[114px] overflow-hidden align-baseline"
                : "relative inline-block w-[180px] overflow-hidden align-baseline"
            }
          >
            <WordSwap
              words={IDENTITY_WORDS}
              interval={2500}
              className="font-extrabold"
            />
          </span>
        </p>
      </div>
    </motion.div>
  );
}

function AvailableIndicator({ label = "AVAILABLE Q3 2026" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.4 }}
      className="flex items-center gap-[8px]"
    >
      <motion.span
        className="block h-[8px] w-[8px] rounded-full bg-acid"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <span className="font-mono text-[13px] font-medium tracking-[0.78px] text-fg-primary">
        {label}
      </span>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1440px] flex-col px-[20px] pt-[80px] pb-[110px] md:px-[80px] md:pt-[140px] md:pb-[25px]"
    >
      {/* ─────── MOBILE LAYOUT (< md) ─────── */}
      {/* Per updated Figma 896:371:
          - Top group: AVAILABLE + WELCOME wordmark + PRODUCT DESIGNER
          - Mid (mt-auto): KADIKÖY meta block sitting just above the HELLO pill
          - Bottom: HELLO pill above the floating tab bar */}
      <div className="flex flex-1 flex-col md:hidden">
        <div className="flex flex-col gap-[16px]">
          <AvailableIndicator label="AVAILABLE · 2026" />

          {/* mt-[48px] = original 8px + 40px requested shift. PRODUCT DESIGNER
              below inherits the offset through the flex-col gap stack. */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: BRUTAL_EASE, delay: 0.25 }}
            className="relative mt-[48px] w-full"
          >
            <Image
              src="/images/hero/welcome-mobile.svg?v=2"
              alt="WELCOME"
              width={340}
              height={157}
              className="block h-auto w-full"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.55 }}
            className="flex flex-col gap-[7px] font-mono text-fg-primary"
          >
            <p className="leading-none">
              <span className="text-[19px] font-extrabold">PRODUCT DESIGNER</span>
              <span className="text-[13px] font-bold"> · </span>
            </p>
            {/* Single-line role copy — 15px on JetBrains Mono Medium lands
                ~290px wide for the 32-char string, fits inside a 335px-inner
                card with margin to spare. */}
            <p className="text-[15px] leading-[1.28] font-medium whitespace-nowrap">
              UI/UX &amp; MOTION DESIGNER, ARTIST.
            </p>
          </motion.div>
        </div>

        {/* Bottom group — KADIKÖY meta + HELLO pill anchored to viewport floor. */}
        <div className="mt-auto flex flex-col gap-[24px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.7 }}
            className="font-mono text-[14px] leading-[1.45] font-medium text-fg-primary"
          >
            <p>30 ·</p>
            <p>KADIKÖY, ISTANBUL</p>
            <p>EST. 2014</p>
          </motion.div>
          <HelloPill size="sm" />
        </div>
      </div>

      {/* ─────── DESKTOP LAYOUT (>= md) ─────── */}
      {/* flex-1 expands to fill section min-h-[100dvh]; mt-auto pushes META
          + NAV group to the bottom band, sitting right above the viewport edge. */}
      <div className="hidden flex-1 flex-col md:flex">
        {/* TOP BAND — HELLO pill + AVAILABLE + WELCOME wordmark.
            mt-[20px] shifts the whole top-band block (HelloPill + WELCOME)
            20px lower per request, while META + section nav stay anchored to
            the bottom via mt-auto on the next sibling. */}
        <div className="relative mt-[20px] h-[377px] w-full">
          <div className="pt-[60px]">
            <HelloPill size="lg" />
          </div>

          <div className="absolute top-[179px] right-0">
            <AvailableIndicator />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: BRUTAL_EASE, delay: 0.25 }}
            className="absolute inset-x-0 bottom-0"
          >
            <Image
              src="/images/hero/welcome-with-hat.svg"
              alt="WELCOME"
              width={1280}
              height={362}
              className="mx-auto block h-auto w-full max-w-[1100px]"
              priority
            />
          </motion.div>
        </div>

        {/* META ROW — left: role, right: age/location (text left-aligned within) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.55 }}
          className="mt-auto flex items-start justify-between font-mono text-fg-primary"
        >
          <div className="flex flex-col gap-[10px]">
            <p className="leading-none">
              <span className="text-[24px] font-extrabold">PRODUCT DESIGNER</span>
              <span className="text-[17px] font-bold"> · </span>
            </p>
            <div className="text-[17px] leading-[1.28] font-medium">
              <p>UI/UX & MOTION</p>
              <p>DESIGNER, ARTIST.</p>
            </div>
          </div>

          <div className="text-left text-[17px] font-medium leading-tight">
            <p>30 ·</p>
            <p>KADIKÖY, ISTANBUL</p>
            <p>EST. 2014</p>
          </div>
        </motion.div>

        {/* BOTTOM IN-PAGE SECTION NAV — desktop only, sits right under META */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.7 }}
          className="mt-[28px] flex items-center justify-between"
        >
          <nav className="flex items-center gap-[28px]">
            {SECTION_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                data-cursor="link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor(link.href, { offset: -90 });
                }}
                className="flex items-center gap-[6px] font-mono text-[13px] font-bold tracking-[1.04px] text-fg-primary transition-transform duration-200 hover:scale-[1.02]"
              >
                <span>
                  [{link.id}] {link.label}
                </span>
                <span className="font-body text-[16px]">{link.arrow}</span>
              </a>
            ))}
          </nav>

          <p className="font-mono text-[12px] font-normal text-fg-muted">
            section 01 / 06
          </p>
        </motion.div>
      </div>
    </section>
  );
}
