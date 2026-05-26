"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { scrollToAnchor } from "@/lib/lenis";
import { LottieLogo } from "./LottieLogo";
import { LocaleSwitcher } from "./LocaleSwitcher";

type NavItem = {
  key: "home" | "myself" | "work" | "contact";
  href: string;
  icon: string;
  iconW: number;
  iconH: number;
};

// Per Figma 894:330 (desktop) + 896:373 (mobile bottom tab bar).
// Top nav holds only HOME/MYSELF/WORK/CONTACT — SKILLS & CAREER stay in the
// Hero's in-page section nav (desktop only — hidden on mobile).
const ITEMS: NavItem[] = [
  { key: "home", href: "#hero", icon: "/icons/Home-icon.svg", iconW: 26, iconH: 22 },
  { key: "myself", href: "#myself", icon: "/icons/Myself-icon.svg", iconW: 16, iconH: 17 },
  { key: "work", href: "#work", icon: "/icons/Work-icon.svg", iconW: 17, iconH: 18 },
  { key: "contact", href: "#contact", icon: "/icons/Contact-icon.svg", iconW: 20, iconH: 14 },
];

// All page sections in scroll order — including SKILLS & CAREER which don't
// have their own nav tabs. Skills extends MYSELF in spirit (identity/craft)
// and Career feeds into WORK (career → projects), so we map them onto those
// adjacent tabs so the active chip never falls into limbo mid-page.
const SECTION_ORDER: { id: string; key: NavItem["key"] }[] = [
  { id: "hero", key: "home" },
  { id: "myself", key: "myself" },
  { id: "skills", key: "myself" },
  { id: "career", key: "work" },
  { id: "work", key: "work" },
  { id: "contact", key: "contact" },
];

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<NavItem["key"]>("home");
  // Mobile nav reveals on scroll-up or after scroll stops; hides on scroll-down.
  const [navHidden, setNavHidden] = useState(false);
  const lastScroll = useRef(0);
  // After a tab click we lock the active state for the duration of the smooth
  // scroll so the chip doesn't flicker through intermediate sections mid-flight.
  const clickLockUntil = useRef(0);

  useEffect(() => {
    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;

    // Active = the latest section whose top has crossed the activation line.
    // Activation line sits 30% from the top of the viewport so the section
    // title settles just under the nav before the chip flips.
    const updateActive = () => {
      if (Date.now() < clickLockUntil.current) return;
      const activationY = window.innerHeight * 0.3;
      let nextActive: NavItem["key"] = "home";
      for (const { id, key } of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= activationY) {
          nextActive = key;
        } else {
          break;
        }
      }
      setActive((prev) => (prev === nextActive ? prev : nextActive));
    };

    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 80);

      const delta = current - lastScroll.current;
      if (current < 60) {
        // Always show near the top of the page.
        setNavHidden(false);
      } else if (delta > 4) {
        setNavHidden(true);
      } else if (delta < -4) {
        setNavHidden(false);
      }
      lastScroll.current = current;

      updateActive();

      // Show again after the user stops scrolling.
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => setNavHidden(false), 220);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    };
  }, []);

  // Intercepts anchor clicks so the page glides via Lenis instead of jumping.
  // #hero scrolls to absolute top; other sections leave ~90px under the
  // floating brand band so the section title is visible just below it.
  function handleAnchorClick(
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
    key: NavItem["key"],
  ) {
    e.preventDefault();
    setActive(key);
    // Lenis default duration is ~1.2s — lock for 1.3s to cover the full glide.
    clickLockUntil.current = Date.now() + 1300;
    const offset = href === "#hero" ? 0 : -90;
    scrollToAnchor(href, { offset });
  }

  // Index of the active tab in ITEMS — drives the shared pill translateX.
  const activeIndex = ITEMS.findIndex((item) => item.key === active);

  return (
    <>
      {/* ─────── DESKTOP — top pill nav (>= md) ─────── */}
      <div className="fixed top-[12px] left-1/2 z-50 hidden w-[calc(100%-32px)] max-w-[1400px] -translate-x-1/2 md:block">
        <header
          className={cn(
            "relative flex h-[60px] items-center overflow-hidden border-t border-white/80 rounded-[60px] backdrop-blur-[143px] transition-shadow duration-300",
            scrolled
              ? "bg-[rgba(240,240,240,0.92)] shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
              : "bg-[rgba(240,240,240,0.8)] shadow-[0_4px_19.8px_rgba(0,0,0,0.08)]",
          )}
        >
          {/* Logo container aspect (4.14:1) matches the Lottie canvas (1027x248)
              so the animation fills the slot without inner whitespace. */}
          <a
            href="#hero"
            aria-label="FRKN home"
            data-cursor="link"
            className="absolute left-[24px] top-1/2 flex h-[44px] w-[182px] -translate-y-1/2 items-center"
            onClick={(e) => handleAnchorClick(e, "#hero", "home")}
          >
            <LottieLogo className="h-full w-full" />
          </a>

          <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
            <ul className="flex items-center gap-[34px]">
              {ITEMS.map((item) => {
                const isActive = active === item.key;
                return (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item.href, item.key)}
                      data-cursor="link"
                      className={cn(
                        "relative flex items-center gap-[8px] px-[12px] py-[4px] transition-transform duration-200 hover:scale-[1.02]",
                        isActive && "rounded-[63px] bg-acid",
                      )}
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={item.iconW}
                        height={item.iconH}
                        className="h-[18px] w-auto object-contain"
                        aria-hidden
                      />
                      <span className="font-body text-[14px] font-semibold uppercase text-fg-primary">
                        {t(item.key)}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="absolute right-[24px] top-1/2 -translate-y-1/2">
            <LocaleSwitcher />
          </div>
        </header>
      </div>

      {/* ─────── MOBILE — top brand band (< md) ─────── */}
      {/* Flat header per Figma 919:1855 — solid canvas bg, thin white bottom
          border. Slides out of view on scroll-down, slides back on scroll-up
          or when the user stops scrolling. */}
      <motion.div
        initial={false}
        animate={{ y: navHidden ? "-110%" : 0 }}
        transition={{ type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{ willChange: "transform" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white bg-bg-canvas px-[20px] pb-[14px] pt-[max(14px,env(safe-area-inset-top))] md:hidden"
      >
        {/* Logo container aspect (4.14:1) matches Lottie canvas (1027x248). */}
        <a
          href="#hero"
          aria-label="FRKN home"
          onClick={(e) => handleAnchorClick(e, "#hero", "home")}
          className="flex h-[32px] w-[132px] items-center"
        >
          <LottieLogo className="h-full w-full" />
        </a>
        <LocaleSwitcher />
      </motion.div>

      {/* ─────── MOBILE — bottom floating tab bar (< md) ─────── */}
      {/* Single shared pill positioned by activeIndex. Animating `x` (translate)
          on a stable element avoids the layoutId re-measurement that caused
          the pill to jump when the parent nav was sliding away on scroll. */}
      <motion.nav
        aria-label="Primary"
        initial={false}
        animate={{ x: "-50%", y: navHidden ? "160%" : 0 }}
        transition={{ type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{ willChange: "transform" }}
        className="fixed bottom-[max(8px,env(safe-area-inset-bottom))] left-1/2 z-50 grid h-[60px] w-[calc(100%-32px)] max-w-[360px] grid-cols-4 items-center rounded-[51px] border-t border-white/80 bg-[rgba(240,240,240,0.92)] px-[2px] shadow-[0_4px_19.8px_rgba(0,0,0,0.12)] backdrop-blur-[35px] md:hidden"
      >
        {/* Acid pill — width matches each tab's content box (cell minus mx-2
            margins). Height sits INSIDE the nav bar with 1px margin top + bottom
            (total 2px shorter than the nav, within the requested 3px max). */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ left: `calc(${activeIndex * 25}% + 2px)` }}
          transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.7 }}
          style={{
            position: "absolute",
            top: "0px",
            bottom: "2px",
            width: "calc(25% - 4px)",
            willChange: "left",
          }}
          className="pointer-events-none rounded-[40px] border-t border-[#d7ffdf] bg-acid"
        />

        {ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href, item.key)}
              className="relative mx-[2px] flex h-[48px] flex-col items-center justify-center gap-[4px]"
              aria-current={isActive ? "page" : undefined}
            >
              <motion.div
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="relative z-10 flex flex-col items-center gap-[4px]"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={item.iconW}
                  height={item.iconH}
                  className="h-[16px] w-auto object-contain"
                  aria-hidden
                />
                <span className="font-body text-[10px] font-semibold uppercase leading-none text-fg-primary">
                  {t(item.key)}
                </span>
              </motion.div>
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}
