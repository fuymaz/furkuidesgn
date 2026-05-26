"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRUTAL_EASE, VIEWPORT } from "@/lib/animations";
import { BrutalCard } from "@/components/primitives/BrutalCard";

// Asset paths — identity marks ship as SVGs in /icons/myself/, photos in
// /images/myself/. Drop your final B&W cat photo at `furkan-cat.jpg`.
const ASSETS = {
  fMark: "/icons/myself/Ffavicon.svg",
  arrowSE: "/images/myself/arrow-southeast.png",
  star: "/icons/myself/sparkle.svg",
  greenSparkle: "/icons/skills/greensparkle.svg",
  circleStamp: "/icons/myself/frkdsgn-sparkle.svg",
  helloStack: "/icons/myself/hello-typhography.svg",
  portrait: "/images/myself/furkan-portrait.png",
  cat: "/images/myself/furkan-cat.jpg",
} as const;

export function Myself() {
  return (
    <section
      id="myself"
      className="relative w-full px-[20px] pt-[12px] pb-[12px] md:px-[80px] md:pt-[72px] md:pb-[24px]"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section meta — desktop only */}
        <div className="hidden items-center justify-between pb-[16px] font-mono md:flex">
          <p className="text-[13px] text-fg-secondary">
            {`// section 02 — about`}
          </p>
          <p className="text-[12px] text-fg-muted">02 / 06</p>
        </div>

        {/* ─────── DESKTOP LAYOUT (>= md) ─────── */}
        <div className="hidden flex-col gap-[24px] md:flex">
          <HeaderRowDesktop />
          <PhotosRowDesktop />
          <FooterRowDesktop />
        </div>

        {/* ─────── MOBILE LAYOUT (< md) ─────── */}
        {/* Order per latest Figma 896:371 + user feedback:
            1. MYSELF wordmark
            2. Portrait + bento (Furkan dark / green sparkle + HELLO)
            3. Intro card (cat photo + furkan.txt)
            4. MAIL + SOCIAL (lifted above marks so it reads as Myself content,
               not a transition into Skills)
            5. F-mark + sparkle marks (sparkle has scroll-tied gentle rotation) */}
        <div className="flex flex-col gap-[20px] md:hidden">
          <MobileWordmarkCard />
          <MobilePortraitBentoRow />
          <MobileIntroCard />
          <MobileFooterRow />
          <MobileMarksRow />
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// DESKTOP — Row 1: F-mark + MYSELF wordmark + ✷ star (3 cells, 186h)
// ────────────────────────────────────────────────────────────────────

function HeaderRowDesktop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE }}
      className="flex h-[186px] items-start gap-[24px]"
    >
      {/* Left small cell — F-mark.
          Width 310 aligns with the portrait card below (also 310) so the
          left column edge is consistent across rows. */}
      <MarkCard
        className="h-[186px] w-[310px]"
        topLeft="MYSELF"
        bottomLeft="EST. MMXVI"
        bottomRight="/06"
        mark={
          <Image
            src={ASSETS.fMark}
            alt="FRKN"
            width={119}
            height={80}
            className="h-[80px] w-auto object-contain"
            priority
          />
        }
      />

      {/* Middle wide cell — MYSELF wordmark.
          No outer overflow-hidden (it was clipping the ::after brutal shadow);
          font sized down to fit cleanly within the cell's right padding. */}
      <BrutalCard className="relative flex flex-1 h-[186px] flex-col justify-between p-[28px]">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[12px] font-bold tracking-[0.12em] text-fg-primary">
            ↘ EXPERIENCE · DOMAINS · CRAFT
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">
            12 YRS · MANY HATS · ONE BRAIN
          </p>
        </div>
        <h2 className="font-display text-[124px] leading-none uppercase text-fg-primary whitespace-nowrap">
          MYSELF
        </h2>
      </BrutalCard>

      {/* Right small cell — ✷ star */}
      <MarkCard
        className="h-[186px] w-[310px]"
        topLeft="MYSELF"
        topRight="02/06"
        bottomLeft="FRKN"
        bottomRight="EST. MMXVI"
        mark={
          <Image
            src={ASSETS.star}
            alt=""
            width={98}
            height={98}
            className="h-[98px] w-auto object-contain"
            aria-hidden
          />
        }
      />
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// DESKTOP — Row 2: Portrait + Bento + Intro (3 cells, 602h)
// ────────────────────────────────────────────────────────────────────

function PhotosRowDesktop() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
      }}
      className="flex h-[602px] items-start gap-[24px]"
    >
      <PhotoCardItem>
        <PortraitCard
          name="FURKAN, 30"
          role={["Product & Motion", "UI/UX Designer, Artist"]}
          location="Kadıköy / İstanbul"
          photoSrc={ASSETS.portrait}
          className="h-[602px] w-[310px]"
        />
      </PhotoCardItem>

      <PhotoCardItem>
        <BentoCardDesktop className="h-[602px] w-[293px]" />
      </PhotoCardItem>

      <PhotoCardItem>
        <IntroCard
          photoSrc={ASSETS.cat}
          tag="furkan.txt"
          body={
            "I design brands, interfaces and motion.\n\nTwelve years and counting — mostly shipping with small teams who care about typography, craft and the work people actually use."
          }
          className="h-[602px] flex-1"
        />
      </PhotoCardItem>
    </motion.div>
  );
}

function PhotoCardItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: BRUTAL_EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// DESKTOP — Row 3: MAIL + SOCIAL | EDUCATION (2 cells, 138h)
// ────────────────────────────────────────────────────────────────────

function FooterRowDesktop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE }}
      className="flex h-[138px] items-start gap-[24px]"
    >
      {/* MAIL + SOCIAL cell */}
      <BrutalCard className="flex h-[138px] flex-1 items-start gap-[45px] p-[24px]">
        {/* MAIL */}
        <div className="flex w-[251px] flex-col gap-[6px]">
          <KeyLabel label="MAIL" />
          <a
            href="mailto:fyymaz@gmail.com"
            data-cursor="link"
            className="font-body text-[18px] font-bold leading-[1.2] tracking-[-0.005em] text-fg-primary transition-opacity hover:opacity-70"
          >
            fyymaz@gmail.com
          </a>
          <p className="font-mono text-[10px] leading-[1.3] tracking-[0.05em] text-fg-muted">
            open inbox · 24h response
          </p>
        </div>

        <div className="h-[86px] w-[2px] bg-fg-primary" aria-hidden />

        {/* SOCIAL */}
        <div className="flex w-[210px] flex-col gap-[6px]">
          <KeyLabel label="SOCIAL" />
          <a
            href="https://instagram.com/fyymaz"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="font-mono text-[11px] leading-[1.4] tracking-[0.04em] text-fg-primary transition-opacity hover:opacity-70"
          >
            {`INSTAGRAM  —  @fyymaz`}
          </a>
          <a
            href="https://www.linkedin.com/in/ahmet-furkan-yilmaz"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="font-mono text-[11px] leading-[1.4] tracking-[0.04em] text-fg-primary transition-opacity hover:opacity-70"
          >
            {`LINKEDIN   —  A.F. YILMAZ`}
          </a>
        </div>
      </BrutalCard>

      {/* EDUCATION cell */}
      <BrutalCard className="flex h-[138px] flex-1 flex-col gap-[8px] p-[24px]">
        <div className="flex items-center justify-between">
          <KeyLabel label="EDUCATION" />
          <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted">
            2016 — 2020
          </p>
        </div>
        <p className="font-body text-[20px] font-bold leading-[1.2] tracking-[-0.005em] text-fg-primary">
          Ahmet Furkan Yılmaz
        </p>
        <p className="font-body text-[14px] font-medium leading-[1.3] tracking-[-0.003em] text-fg-secondary">
          Faculty of Communication & Design
        </p>
      </BrutalCard>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// MOBILE — Row 1: MYSELF wordmark card (full width)
// ────────────────────────────────────────────────────────────────────

function MobileWordmarkCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE }}
      className="w-full"
    >
      <BrutalCard className="flex w-full flex-col gap-[12px] p-[16px]">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-fg-primary">
            ↘ EXPERIENCE · DOMAINS · CRAFT
          </p>
          <p className="font-mono text-[8px] tracking-[0.08em] text-fg-muted">
            MANY HATS · ONE BRAIN
          </p>
        </div>
        {/* overflow-hidden wraps only the wordmark so the BrutalCard's ::after
            shadow plate stays visible past the card edges. */}
        <div className="overflow-hidden">
          <h2 className="font-display text-[70px] leading-none uppercase text-fg-primary whitespace-nowrap">
            MYSELF
          </h2>
        </div>
      </BrutalCard>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// MOBILE — Row 2: F-mark + ✷ star (2 cells side-by-side)
// ────────────────────────────────────────────────────────────────────

// Sparkle mark with scroll-tied gentle rotation. As the mark passes through
// the viewport its rotation maps from -14° to +14° over its scroll travel —
// just enough motion to feel alive without becoming a focal point.
function RotatingSparkle({
  src,
  width,
  height,
  className,
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  return (
    <motion.div
      ref={ref}
      style={{ rotate }}
      className="inline-flex items-center justify-center"
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className={className}
        aria-hidden
      />
    </motion.div>
  );
}

function MobileMarksRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE }}
      className="grid grid-cols-2 gap-[12px]"
    >
      {/* Card taller (140) so both marks have breathing room above + below. */}
      <MarkCard
        className="h-[140px]"
        topLeft="MYSELF"
        bottomLeft="EST. MMXVI"
        bottomRight="/06"
        mark={
          <Image
            src={ASSETS.fMark}
            alt="FRKN"
            width={64}
            height={44}
            className="h-[44px] w-auto object-contain"
          />
        }
      />
      <MarkCard
        className="h-[140px]"
        topLeft="MYSELF"
        bottomLeft="EST. MMXVI"
        bottomRight="/06"
        mark={
          <RotatingSparkle
            src={ASSETS.star}
            width={72}
            height={72}
            className="h-[72px] w-auto object-contain"
          />
        }
      />
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// MOBILE — Row 3: FURKAN portrait + HELLO bento (2 cells side-by-side)
// ────────────────────────────────────────────────────────────────────

function MobilePortraitBentoRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.2 }}
      className="grid grid-cols-2 gap-[12px]"
    >
      <PortraitCard
        name="FURKAN, 30"
        role={["Product & Motion", "Designer, Artist."]}
        location="Kadıköy / İstanbul"
        photoSrc={ASSETS.portrait}
        className="h-[415px]"
      />
      <BentoCardMobile className="h-[415px]" />
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// MOBILE — Row 4: Cat photo + intro card (full width)
// ────────────────────────────────────────────────────────────────────

function MobileIntroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.3 }}
      className="w-full"
    >
      <IntroCard
        photoSrc={ASSETS.cat}
        tag="furkan.txt"
        body={
          "I design brands, interfaces and motion.\n\nTen years and counting — mostly shipping with small teams who care about typography, craft and the work people actually use."
        }
        className="h-[343px]"
        compact
      />
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// MOBILE — Row 5: MAIL + SOCIAL (2 cells, no EDUCATION on mobile)
// ────────────────────────────────────────────────────────────────────

function MobileFooterRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: BRUTAL_EASE, delay: 0.4 }}
      className="grid grid-cols-2 gap-[12px]"
    >
      {/* MAIL */}
      <BrutalCard className="flex h-[88px] flex-col gap-[6px] p-[12px]">
        <KeyLabel label="MAIL" />
        <a
          href="mailto:fyymaz@gmail.com"
          data-cursor="link"
          className="truncate font-body text-[16px] font-bold leading-[1.2] tracking-[-0.005em] text-fg-primary"
        >
          fyymaz@gmail.com
        </a>
        <p className="font-mono text-[8px] leading-[1.3] tracking-[0.06em] text-fg-muted">
          open inbox · 24h response
        </p>
      </BrutalCard>

      {/* SOCIAL — two platforms side-by-side so the card height matches MAIL */}
      <BrutalCard className="flex h-[88px] flex-col gap-[6px] p-[12px]">
        <KeyLabel label="SOCIAL" />
        <div className="grid grid-cols-2 gap-[8px]">
          <SocialPair platform="INSTAGRAM" handle="@fyymaz" href="https://instagram.com/fyymaz" />
          <SocialPair platform="LINKEDIN" handle="@fyymaz" href="https://www.linkedin.com/in/ahmet-furkan-yilmaz" />
        </div>
      </BrutalCard>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Shared primitives — reused across desktop + mobile
// ────────────────────────────────────────────────────────────────────

function MarkCard({
  className,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  mark,
}: {
  className?: string;
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  mark: React.ReactNode;
}) {
  return (
    <BrutalCard className={`flex flex-col justify-between p-[16px] md:p-[28px] ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        {topLeft && <MetaText>{topLeft}</MetaText>}
        {topRight && <MetaText>{topRight}</MetaText>}
      </div>
      <div className="flex flex-1 items-center justify-center">{mark}</div>
      <div className="flex items-center justify-between">
        {bottomLeft && <MetaText>{bottomLeft}</MetaText>}
        {bottomRight && <MetaText>{bottomRight}</MetaText>}
      </div>
    </BrutalCard>
  );
}

function MetaText({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.08em] text-fg-muted whitespace-nowrap">
      {children}
    </p>
  );
}

function KeyLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-[8px]">
      <span className="block size-[6px] bg-fg-primary" aria-hidden />
      <span className="font-mono text-[11px] font-bold tracking-[0.12em] text-fg-primary md:text-[12px] md:tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}

function SocialPair({
  platform,
  handle,
  href,
}: {
  platform: string;
  handle: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-start gap-[4px]">
      <span className="font-mono text-[9px] tracking-[0.04em] text-fg-primary">
        {platform}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        className="inline-flex items-center bg-fg-primary px-[6px] py-[3px] font-mono text-[10px] font-bold tracking-[0.04em] text-fg-inverted transition-opacity hover:opacity-80"
      >
        {handle}
      </a>
    </div>
  );
}

function PortraitCard({
  name,
  role,
  location,
  photoSrc,
  className,
}: {
  name: string;
  role: string[];
  location: string;
  photoSrc: string;
  className?: string;
}) {
  return (
    <BrutalCard
      tone="dark"
      className={`relative flex flex-col ${className ?? ""}`}
    >
      {/* Name + role header */}
      <div className="flex flex-col gap-[2px] p-[16px] md:gap-[4px] md:p-[20px]">
        <p className="font-body text-[18px] font-semibold tracking-[-0.02em] text-fg-inverted md:text-[22px] md:tracking-[-0.02em]">
          {name}
        </p>
        <div className="font-mono text-[10px] leading-[1.3] text-fg-inverted md:text-[12px]">
          {role.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      {/* Portrait image — fills remaining space */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={photoSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 308px"
          className="object-cover object-center"
        />
      </div>

      {/* Location footer with acid dot */}
      <div className="flex items-center gap-[6px] p-[12px] md:gap-[8px] md:p-[14px] md:px-[20px]">
        <motion.span
          className="block size-[6px] rounded-full bg-acid md:size-[8px]"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <span className="font-mono text-[8px] font-medium tracking-[0.04em] text-fg-inverted md:text-[12px] md:tracking-[0.04em]">
          {location}
        </span>
      </div>
    </BrutalCard>
  );
}

function BentoCardDesktop({ className }: { className?: string }) {
  // Desktop: 2 stacked sub-cards inside the bento area
  return (
    <div className={`flex flex-col gap-[24px] ${className ?? ""}`}>
      <BrutalCard className="relative flex h-[281px] items-center justify-center p-[24px]">
        <Image
          src={ASSETS.circleStamp}
          alt=""
          width={240}
          height={240}
          className="h-auto w-[240px] object-contain"
          aria-hidden
        />
      </BrutalCard>
      <BrutalCard className="relative flex flex-1 items-center justify-center p-[24px]">
        <Image
          src={ASSETS.helloStack}
          alt="HELLO"
          width={220}
          height={250}
          className="h-auto w-[220px] object-contain"
        />
      </BrutalCard>
    </div>
  );
}

function BentoCardMobile({ className }: { className?: string }) {
  // Two separate brutal cards stacked so each gets its own ::after shadow plate.
  // Top: FRKNDSGN circular stamp (has acid green sparkle baked into the SVG),
  // gently scroll-rotates to nod at the rubber-stamp metaphor. Bottom: HELLO
  // stacked typography. Both stay on the default light card surface.
  const stampRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stampRef,
    offset: ["start end", "end start"],
  });
  const stampRotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <div className={`flex flex-col gap-[12px] ${className ?? ""}`}>
      <BrutalCard className="flex flex-1 items-center justify-center p-[12px]">
        <motion.div
          ref={stampRef}
          style={{ rotate: stampRotate }}
          className="flex items-center justify-center"
        >
          <Image
            src={ASSETS.circleStamp}
            alt=""
            width={158}
            height={158}
            className="h-auto w-[140px] object-contain"
            aria-hidden
          />
        </motion.div>
      </BrutalCard>
      <BrutalCard className="flex flex-1 items-center justify-center p-[12px]">
        <Image
          src={ASSETS.helloStack}
          alt="HELLO"
          width={150}
          height={170}
          className="h-auto w-[120px] object-contain"
        />
      </BrutalCard>
    </div>
  );
}

function IntroCard({
  photoSrc,
  tag,
  body,
  className,
  compact = false,
}: {
  photoSrc: string;
  tag: string;
  body: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <BrutalCard className={`relative flex flex-col ${className ?? ""}`}>
      {/* Top half — photo */}
      <div className="relative h-[55%] w-full overflow-hidden bg-fg-inverted">
        <Image
          src={photoSrc}
          alt="Furkan with cat"
          fill
          sizes="(max-width: 768px) 100vw, 620px"
          className="object-cover object-center"
        />
      </div>

      {/* Bottom half — tag + intro */}
      <div className={`flex flex-col gap-[12px] ${compact ? "p-[11px] pt-[14px]" : "p-[24px] pt-[24px]"} flex-1`}>
        <div className={`inline-flex w-fit items-center bg-fg-primary ${compact ? "px-[12px] py-[8px]" : "px-[18px] py-[12px]"}`}>
          <span className={`font-mono font-bold tracking-[0.04em] text-fg-inverted ${compact ? "text-[11px]" : "text-[13px]"}`}>
            {tag}
          </span>
        </div>
        {/* whitespace-pre-line preserves \n\n in the body string as a visible
            paragraph break, so the cat-card intro reads as two paragraphs
            (sentence + manifesto) rather than one long block. */}
        <p className={`whitespace-pre-line font-body font-medium leading-[1.4] text-fg-primary ${compact ? "text-[12px]" : "text-[20px] md:text-[22px]"}`}>
          {body}
        </p>
      </div>
    </BrutalCard>
  );
}
