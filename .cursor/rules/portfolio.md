# FRKN.DESIGN — Portfolio Handoff (v2)

Ahmet Furkan Yılmaz · UI/UX & Motion Designer · Kadıköy/İstanbul  
Figma file: `DyVdeOI5bLiEn2ZoW9aZHf` · Phase 1 → Single-page homepage  
Phase 2 → Project detail pages (later)

---

## 🚀 STARTER PROMPT — Paste into Cursor

> Copy everything inside the codeblock below and paste as your **first message** in Cursor after creating the project. This sets all conventions, project rules, and the initial task in one shot.

````
You are helping me build my portfolio website — a single-page neo-brutalist site with rich animations. Read `.cursor/rules/portfolio.md` (this file) before doing anything. It contains the complete design spec, tokens, component inventory, and animation system.

## Project context
- Designer: Ahmet Furkan Yılmaz (FRKN.DESIGN)
- Aesthetic: neo-brutalist, warm gray palette, acid green accents, big display typography
- Phase 1 (now): Build the single-page homepage with all 7 sections (Hero, Myself, Skills, Career, Work, Contact, Footer)
- Phase 2 (later): Add /work/[slug] project detail pages — DO NOT scaffold these yet

## Stack (already chosen, don't suggest alternatives)
- Next.js 15 (App Router) + TypeScript
- Tailwind v4 (CSS variables in @theme)
- Framer Motion for animations
- Lenis for smooth scroll
- next-intl for TR/EN i18n (TR is default)
- Deploy target: Vercel

## Coding rules (always follow)
1. **No new dependencies without asking.** Stack above is final.
2. **No CSS-in-JS.** Use Tailwind classes + globals.css variables.
3. **Server components by default.** Only use "use client" when needed (animations, hooks, interactivity).
4. **Component file naming:** PascalCase. One component per file.
5. **Section components** live in `src/components/sections/`. **Reusable primitives** in `src/components/primitives/`. **Small UI pieces** in `src/components/ui/`.
6. **Shadow technique is sacred:** every card has a `::after` pseudo-element offset by 6px to create the hard shadow. NEVER use CSS `box-shadow` for this. See globals.css `.brutal-card` utility.
7. **No drop shadows, no border-radius, no gradients anywhere** unless I explicitly ask.
8. **Typography hierarchy:** display font for titles only, body for paragraphs, mono for labels/meta. Never mix.
9. **Acid green sparingly:** max 2-3 accents per section.
10. **Match Figma 1:1 on first pass.** Adjust only when I request changes.
11. **Comment intentions, not actions.** `// stagger reveals on viewport entry` is good. `// loop through array` is noise.
12. **Animation defaults:** `ease: [0.16, 1, 0.3, 1]` (brutal-out), duration 600-800ms for entrances, 200-300ms for hovers.
13. **Reduced motion:** every animation must respect `prefers-reduced-motion: reduce`.
14. **Mobile responsive:** desktop-first design, but every section must work on 375px width.

## Your first task — Phase 1.1 Foundation
1. Set up the project with the dependencies listed above
2. Replace `globals.css` with the version from section 2 of portfolio.md
3. Configure `next/font/local` for the 3 fonts (Monument Extended, Space Grotesk, JetBrains Mono) — I will place font files in `/public/fonts/` myself. Reference the file names listed in section 8 of portfolio.md.
4. Set up `next-intl` middleware + locale routing per section 7 (TR default, EN as second locale)
5. Build `BrutalCard` and `BrutalCardDark` primitives in `src/components/primitives/`
6. Build `SmoothScroll` Lenis wrapper in `src/components/layout/`
7. Build `CustomCursor` component in `src/components/layout/` using the code in section 6.2
8. Wire all three into `src/app/[locale]/layout.tsx`

After this is done, stop and show me the file tree + the layout.tsx. Don't proceed to building sections until I confirm.

Use Turkish in chat with me when you need to ask questions. Code/comments stay English.
````

> After Cursor finishes Phase 1.1 and you confirm, prompt for Phase 1.2 (Nav + Hero), then 1.3 (Myself + Skills), then 1.4 (Career + Work + Contact + Footer), then 1.5 (animations polish). One phase per prompt to keep Cursor focused.

---

## 0. TL;DR

**Phase 1 (this build):** Animated, interactive single-page portfolio  
**Stack:** Next.js 15 + TS + Tailwind v4 + Framer Motion + Lenis + next-intl  
**Animation feasibility:** All specified animations are standard-grade for this stack. Hardest one (FLIP page transitions) is in Phase 2.

---

## 1. Animation Feasibility — quick reference

Every animation in this spec is comfortable in React + Framer Motion. The pattern in each row below tells you the technique:

| Animation | Pattern | Notes |
|---|---|---|
| Custom cursor | `useEffect` + mouse listener + `motion.div` with spring | Mix-blend-difference for inverted color |
| Smooth scroll | Lenis instance wrapped in client component | `requestAnimationFrame` loop |
| Scroll-triggered reveals | `motion.div` with `whileInView={{ opacity: 1, y: 0 }}` | `viewport={{ once: true, margin: "-100px" }}` |
| Card hover lift | `whileHover={{ y: -4 }}` with transition | Pair with shadow scale |
| Marquee infinite | `animate={{ x: [0, -1000] }}` with `repeat: Infinity, ease: linear` | Duplicate content for seamless loop |
| Count-up numbers | Custom hook with `useMotionValue` + `useTransform` | Triggered on `whileInView` |
| Split text reveal | Map each char to `motion.span` with stagger | Wrap in `motion.div` with `staggerChildren` |
| Letter-by-letter | Same as above with `delay: i * 0.08` | |
| Hover monogram rotate | `whileHover={{ rotate: 360, scale: 1.05 }}` | 600ms duration |
| Acid pulse | `animate={{ opacity: [1, 0.4, 1] }}` infinite | 2-3s duration |
| Status dot pulse | Same as above + scale variation | |

**Awwwards-tier extras you could add later** (not in current spec): WebGL backgrounds (Three.js), SVG path morphing (GSAP DrawSVG), 3D card tilt on cursor (use `useMotionValue` + perspective). These are stretch goals.

---

## 2. Design Tokens

### 2.1 CSS Variables (drop into `src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  /* ─── COLOR TOKENS ─── */
  --color-bg-canvas: #f0f0f0;
  --color-bg-surface-alt: #e2e2e2;
  --color-bg-inverted: #1b1b1b;
  
  --color-fg-primary: #1b1b1b;
  --color-fg-secondary: #4a4a4a;
  --color-fg-muted: #6b6b6b;
  --color-fg-inverted: #f2f2f2;
  
  --color-action-primary: #04ff3a;
  
  --color-border-default: #1b1b1b;
  
  /* ─── TYPOGRAPHY ─── */
  --font-display: "Monument Extended", "Anybody", system-ui, sans-serif;
  --font-body: "Space Grotesk", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", monospace;
  
  /* ─── SPACING ─── */
  --spacing-section-y: 72px;
  --spacing-section-x: 80px;
  --spacing-card-gap: 24px;
  --spacing-shadow-offset: 6px;
  
  /* ─── ANIMATION ─── */
  --ease-brutal: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --duration-fast: 200ms;
  --duration-base: 400ms;
  --duration-slow: 800ms;
}

/* Lenis smooth scroll classes */
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }

body {
  background: var(--color-bg-canvas);
  color: var(--color-fg-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  cursor: none;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  body { cursor: auto; }
}

@layer utilities {
  /* Brutal shadow card */
  .brutal-card {
    position: relative;
    background: var(--color-bg-surface-alt);
  }
  .brutal-card::after {
    content: "";
    position: absolute;
    inset: 6px -6px -6px 6px;
    background: var(--color-fg-primary);
    z-index: -1;
  }
  .brutal-card-dark {
    background: var(--color-bg-inverted);
    color: var(--color-fg-inverted);
  }
  
  /* Mono label spacing */
  .tracking-mono { letter-spacing: 0.12em; }
  .tracking-mono-sm { letter-spacing: 0.08em; }
  
  /* Acid */
  .text-acid { color: var(--color-action-primary); }
  .bg-acid { background-color: var(--color-action-primary); }
}
```

### 2.2 Typography Scale

| Token | Size | Font | Use |
|---|---|---|---|
| `display-mega` | 144px | Monument Black | Footer FRKN.DESIGN signature |
| `display-xxl` | 124px | Monument Black | Hero |
| `display-xl` | 112px | Monument Black | Section titles (MYSELF, SKILLS, …) |
| `display-lg` | 88px | Monument Black | Mark cell numbers |
| `display-md` | 64-76px | Monument Black | Tool monograms (Ai, Fg, Ae) |
| `display-sm` | 30-48px | Monument Black | Card titles (ILLUSTRATOR, AURUM) |
| `body-lg` | 22-24px | Space Grotesk Bold | Stat values, email |
| `body-md` | 16-18px | Space Grotesk Medium | Card descriptions |
| `body-sm` | 13-14px | Space Grotesk Medium | Eyebrows, captions |
| `mono-md` | 11-12px | JetBrains Mono Bold | Labels (// MARK, FEATURED) |
| `mono-sm` | 9-10px | JetBrains Mono Regular | Meta, tags |

---

## 3. Visual Language Rules

Non-negotiable for consistency:

1. **Shadow technique** — `::after` pseudo-element at 6px offset, dark fill. Never `box-shadow`.
2. **Padding scale (tiered, NOT blanket):**
   - Sub-structured cards (have thumbnail/cover frames inside) → outer padding `0`
   - Narrow/short cards (`<200w` or `<130h`) → `20px`
   - Wide banner cards (`≥700w` and `≤240h`) → `28px`
   - Large feature cards (`≥380w` and `≥280h`) → `28px`
   - Default medium → `24px`
3. **Card half-half pattern** — top half light with monogram, bottom half DARK or LIGHT with content. Checkerboard alternation.
4. **Acid green sparing** — max 2-3 accents per section.
5. **Brutal symbols vocabulary:**
   - **✷** Hero, Myself, Footer
   - **✕** Skills · **↗** Career · **▣** Work · **✉** Contact
6. **Typography hierarchy** — display for titles, body for paragraphs, mono for labels. Don't mix.
7. **No drop shadows, no border radius, no gradients** — flat brutal only.

---

## 4. File Structure (Phase 1 only)

```
frkn-design/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx              # locale layout + smooth scroll wrapper
│   │   │   └── page.tsx                # ALL sections on one page
│   │   ├── globals.css                 # tokens
│   │   └── favicon.ico
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   └── SmoothScroll.tsx
│   │   ├── primitives/
│   │   │   ├── BrutalCard.tsx          # shadow + card
│   │   │   ├── HalfHalfCard.tsx        # two-half pattern
│   │   │   ├── Marquee.tsx
│   │   │   ├── SectionHeader.tsx       # 2-cell header
│   │   │   └── BrutalAccent.tsx        # ✷ ✕ ↗ ▣ ✉ glyph component
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Myself.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Career.tsx
│   │   │   ├── Work.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── ProjectCard.tsx
│   │       ├── ToolCard.tsx
│   │       ├── WorkHistoryItem.tsx
│   │       ├── StatCard.tsx
│   │       └── CountUp.tsx             # animated number
│   ├── lib/
│   │   ├── animations.ts               # shared Framer Motion variants
│   │   ├── projects.ts                 # project data (for Work cards)
│   │   └── utils.ts                    # cn() helper
│   ├── content/
│   │   └── translations/
│   │       ├── tr.json
│   │       └── en.json
│   ├── i18n.ts
│   └── middleware.ts
├── public/
│   ├── fonts/
│   │   ├── MonumentExtended-Ultrabold.woff2
│   │   ├── SpaceGrotesk-Variable.woff2
│   │   └── JetBrainsMono-Variable.woff2
│   ├── images/
│   │   ├── furkan-portrait.jpg
│   │   ├── furkan-cat.jpg
│   │   ├── frkn-logo.svg
│   │   ├── hedra.png
│   │   ├── projects/                   # cover images for Work cards
│   │   │   ├── aurum/cover.jpg
│   │   │   ├── nova/cover.jpg
│   │   │   ├── atlas/cover.jpg
│   │   │   ├── forge/cover.jpg
│   │   │   ├── pulse/cover.jpg
│   │   │   └── beacon/cover.jpg
│   │   └── og.png
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Section Specs (Homepage)

### 5.1 Nav Bar (sticky top, 88px)

**Structure:** Left FRKN logo · Right `HOME · MYSELF · WORK · CONTACT · TR | EN`

**States:**
- Active page item: acid pill background, ink text
- Inactive: icon + text
- Language toggle: TR bold ink · 2×12 separator · EN medium muted

**Interactions:**
- Scroll > 100px → nav shrinks to 64px with shadow
- Hover item: scale 1.02 + cursor changes to "link" state
- Click `EN` / `TR` → smooth locale swap (no reload)
- Click nav items → smooth scroll to section anchor

### 5.2 Hero Section

**Layout:** FRKN logo · PORTFOLIO wordmark · hedra image + tagline + scroll indicator

**Animations:**
- Mount: stagger reveal of FRKN letters (80ms apart)
- PORTFOLIO: split-text reveal letter by letter (120ms apart)
- Hedra image: scale 0.95 → 1 over 800ms
- Scroll indicator: infinite bounce loop (2s cycle)

### 5.3 Myself Section

**Structure:**
```
HEADER (1270 inner):
  Cell A (950×186) — eyebrow + F mark + MYSELF combined
  Cell B (296×186) — // MARK · 02 + ✷ + EST. MMXVI

PHOTOS (3 cells, 602h):
  Cell L (308) — Furkan portrait DARK with name + role overlay
  Cell M (308) — HELLO bento with circular FRKNDSGN text
  Cell R (~600) — Furkan + cat photo + intro paragraph card

FOOTER (1270 inner, 138h):
  Cell L (623) — MAIL + SOCIAL combined (vertical divider between)
  Cell R (623) — EDUCATION
```

**Animations:**
- Section enter viewport: photos slide up + fade (100ms stagger)
- MYSELF title: split-text scale-in
- Cat photo hover: slight rotation ~3° + scale 1.02
- Email link hover: underline draws left → right

### 5.4 Skills Section

**Structure:**
```
HEADER 2-cell:
  Title cell — SKILLS + inner meta column:
    "Tools · Daily craft" / "Master + support" (17px sgBold)
    "06 SOFTWARES · ADOBE + FIGMA" / "EST. 2014 · STILL LEARNING" (10px mono)
    ✕ acid accent
  Mark cell — // MARK · 03 + ✷ + 03 + /06

GRID 3×2 two-half cards (412×400):
  Row 1: Ai DARK FEATURED✷ / AI Tools LIGHT / Ae DARK
  Row 2: Pr LIGHT / Fg DARK DAILY / Ps LIGHT
  
  Each card:
    TOP HALF (230 light): index label + accent? + year + 130px monogram + meta row
    BOTTOM HALF (164):
      DARK: 30px title + 3-line description + indicator row (acid dot if FEATURED)
      LIGHT: 30px title + tag row

CAPABILITIES BAND: wide horizontal pill with capability list (preserved from Figma)
```

**Animations:**
- Cards stagger in on scroll (80ms between cards, viewport: once, margin: -100px)
- Hover card: lift -4px Y + shadow extends from 6px to 10px
- Hover monogram: scale 1.05 + rotate 2°
- ✷ accent on featured cards: subtle pulse (opacity 1 → 0.6 → 1 over 2s)

### 5.5 Career Section

**Structure:**
```
HEADER 2-cell — CAREER + meta column:
  "Roles · Companies" / "Timeline · Impact"
  "4 COMPANIES · 12 YRS" / "ACTIVE @ MOBIVA · 2021→"
  ↗ acid accent
  Mark cell — // MARK · 04 + ✷ + 04 + /06

MAIN ROW 3 cols:
  Left (308): "20+" half-half — FEATURED · 01 + ✷ top + Shipped Apps DARK bottom with description + ● 12 YRS · ACTIVE
  Middle (302): "50+" half-half — // 02 PROJECTS top + Product Design DARK bottom + BRAND · IDENTITY
  Right (634): WORK HISTORY STACK — 4 vertical cards:
    1. Mobiva SR. UI/UX Designer · +4 Years (DARK, current, acid badge)
    2. Mobiva Creative Artist · +4 Years
    3. Freelancer UI/UX Designer · +2 Years
    4. Youtube Channel Editor · +2 Years

BOTTOM TIMELINE STRIP: full width, 16 ticks from 2014 → 2026
```

**Animations:**
- Big numbers (20+, 50+): count-up from 0 over 1.2s when in view
- Work history cards: cascade slide-in from right (100ms stagger)
- Timeline ticks: animate in left-to-right (50ms each)
- Current role dot (Mobiva DARK card): pulsing acid green
- "ACTIVE @ MOBIVA · 2021→" arrow: subtle horizontal slide loop

### 5.6 Work Section

**Structure:**
```
HEADER 2-cell — WORK + meta column:
  "Projects · Cases" / "Brand · Product"
  "06 FEATURED · 50+ TOTAL" / "FROM 2022 TO 2025"
  ▣ acid accent

GRID 3×2 two-half cards (412×400, same pattern as Skills):
  Row 1: Aurum DARK FEATURED✷ / Nova LIGHT / Atlas DARK
  Row 2: Forge LIGHT / Pulse DARK / Beacon LIGHT
  
  Each card → links to /work/[slug] (Phase 2 — for now, show "Coming soon" toast or disable link)

FOOTER CELLS (3): TOTAL SHIPPED · SELECTION · VIEW ALL (acid CTA)
```

**Animations:**
- Scroll stagger reveal
- Hover card: lift -4px + monogram 360° rotation over 600ms
- Cursor becomes "view" state (large circle with VIEW ↗ text) when hovering project cards
- Featured Aurum ✷: constant subtle glow animation
- Card click: stub `console.log` for Phase 1 (we'll wire detail pages in Phase 2)

### 5.7 Contact Section

**Structure:**
```
HEADER 2-cell — CONTACT + meta column:
  "Let's collaborate" / "Reach out · build"
  "FYYMAZ@GMAIL · 24H REPLY" / "OPEN · FREELANCE · F/T"
  ✉ acid accent

HERO CTA (1280×400 DARK):
  ● AVAILABLE · OPEN TO NEW PROJECTS    EST. 2014 · KADIKÖY
  "Let's build" (124px display, ink)
  "something together." (124px display ITALIC, acid green)
  → fyymaz@gmail.com    24H RESPONSE · M-F

BOTTOM 3 cells: Instagram · LinkedIn · Status (acid dot)
```

**Animations:**
- "Let's build / something together." split text reveal (word stagger 200ms)
- Email link hover: scale 1.02 + acid underline draws left → right
- Status acid dot: pulsing continuously
- "AVAILABLE" text rotates between "AVAILABLE" / "OPEN" / "READY" every 4s with fade

### 5.8 Footer

**Structure:**
```
ROW 1:
  ↘ PORTFOLIO · END ✷                                  BACK TO TOP ↑
  FRKN.DESIGN (144px, ink + acid green ".DESIGN")

ROW 2 (4 cells):
  NAV (jump-to-section list)
  EMAIL (fyymaz@gmail.com + 24h response + open inbox)
  SOCIAL (Instagram @fyymaz + LinkedIn A.F. YILMAZ)
  STATUS (● open · available, freelance · F/T, kadıköy, est. 2014)

ROW 3:
  © 2026 · AHMET FURKAN YILMAZ | MADE IN KADIKÖY · WITH SPITE & LOVE
                                            DESIGNED IN ISTANBUL ✷
```

**Animations:**
- FRKN.DESIGN parallax: as you scroll into footer, `.DESIGN` shifts slightly
- BACK TO TOP button: hover scale 1.05, click triggers Lenis scrollTo(0)
- Nav links in footer: hover underline draws + cursor "link" state

---

## 6. Animation System (Framer Motion)

### 6.1 Shared Variants (`src/lib/animations.ts`)

```typescript
import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  },
};

export const titleReveal: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

export const cardLift = {
  rest: { y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { y: -4, transition: { duration: 0.3, ease: "easeOut" } },
};

// Standard viewport config — use everywhere
export const VIEWPORT = { once: true, margin: "-100px" };

// Use in components:
// <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp} />
```

### 6.2 Custom Cursor (`src/components/layout/CustomCursor.tsx`)

```typescript
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CursorState = "default" | "link" | "view";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<CursorState>("default");
  
  useEffect(() => {
    // Don't render custom cursor on touch devices
    if (window.matchMedia("(hover: none)").matches) return;
    
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    
    const updateState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      setState((cursorType as CursorState) ?? "default");
    };
    
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", updateState);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", updateState);
    };
  }, []);
  
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      animate={{ x: pos.x - 12, y: pos.y - 12 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
    >
      <motion.div
        className="bg-white"
        animate={{
          width: state === "default" ? 24 : state === "link" ? 64 : 80,
          height: state === "default" ? 24 : state === "link" ? 64 : 80,
        }}
        transition={{ duration: 0.2 }}
      />
      {state === "view" && (
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold uppercase tracking-mono text-black">
          View ↗
        </span>
      )}
    </motion.div>
  );
}
```

Usage:
- Add `data-cursor="link"` to nav items, footer links, emails
- Add `data-cursor="view"` to project cards in Work section

### 6.3 Smooth Scroll Wrapper

```typescript
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  
  return <>{children}</>;
}
```

### 6.4 Count-Up Component (`src/components/ui/CountUp.tsx`)

```typescript
"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { motion } from "framer-motion";

type Props = { from?: number; to: number; suffix?: string; duration?: number };

export function CountUp({ from = 0, to, suffix = "", duration = 1.2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v));
  
  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, count, to, duration]);
  
  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
```

Usage in Career section:
```jsx
<span className="text-display-lg font-display">
  <CountUp to={20} suffix="+" />
</span>
```

### 6.5 Animation Priority — Build Order

Build animations in this order to ship the most-impactful pieces first:

| # | Animation | Where | Cost |
|---|---|---|---|
| 1 | Custom cursor | Global | 30 min |
| 2 | Smooth scroll | Global wrap | 15 min |
| 3 | Scroll fade-up reveals | All sections (one variant) | 30 min |
| 4 | Card hover lift | All cards | 10 min |
| 5 | Marquee bands | Section separators | 30 min |
| 6 | Title split-text | Hero, section headers | 1 hr |
| 7 | Count-up (20+, 50+) | Career | 30 min |
| 8 | Acid pulse on featured | Aurum + Ai | 15 min |
| 9 | Hover monogram rotate | Skills/Work cards | 20 min |
| 10 | "View" cursor state | Work cards | 20 min |
| 11 | Status dot pulse | Contact, Footer | 10 min |
| 12 | Word rotator (AVAILABLE/OPEN/READY) | Contact CTA | 25 min |

**Total animation budget: ~5 hours.** Spread across Phase 1 polish stage.

---

## 7. i18n Setup

### 7.1 Config (`src/i18n.ts`)

```typescript
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();
  return {
    messages: (await import(`./content/translations/${locale}.json`)).default,
  };
});
```

### 7.2 Middleware (`src/middleware.ts`)

```typescript
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

### 7.3 Translate vs Keep Universal

**Translate:**
- Eyebrows (`↘ TOOLS · STACK · STUDIO`)
- 17px taglines (`Tools · Daily craft`)
- Card body descriptions
- CTAs (`Let's build something together`, `View case ↗`)
- Footer (`MADE IN KADIKÖY · WITH SPITE & LOVE`)

**Keep universal:**
- Section titles (MYSELF, SKILLS, WORK)
- Email, social handles
- Numbers and dates (20+, 2016—2020)
- Tool/software names (Figma, Adobe Illustrator)

### 7.4 Sample `tr.json`

```json
{
  "nav": { "home": "ANA SAYFA", "myself": "BEN", "work": "İŞLER", "contact": "İLETİŞİM" },
  "hero": {
    "tagline": "İstanbul merkezli tasarımcı",
    "scroll": "AŞAĞI KAYDIR"
  },
  "myself": {
    "eyebrow": "↘ DENEYİM · ALANLAR · ZANAAT",
    "rightMeta": "12 YIL · ÇOK ŞAPKA · TEK BEYİN",
    "tagline1": "Markalar · Arayüzler",
    "tagline2": "Hareket · Kimlik",
    "intro": "Markalar, arayüzler ve hareket tasarlıyorum. On iki yıl ve sayıyorum — çoğunlukla küçük ekiplerle, tipografiyi, zanaatı ve gerçekten kullanılan işi önemseyenlerle çalışarak.",
    "edu": "EĞİTİM", "mail": "E-POSTA", "social": "SOSYAL"
  },
  "skills": {
    "eyebrow": "↘ ARAÇLAR · STACK · STÜDYO",
    "rightMeta": "EST. 2014",
    "tagline1": "Araçlar · Günlük zanaat",
    "tagline2": "Usta + destek"
  },
  "career": {
    "eyebrow": "↘ ZAMAN ÇİZGİSİ · ROLLER · ETKİ",
    "rightMeta": "12 YIL · ÇOK ŞAPKA",
    "tagline1": "Roller · Şirketler",
    "tagline2": "Zaman çizgisi · Etki",
    "shipped": "Yayınlanan Uygulama",
    "products": "Ürün Tasarımı"
  },
  "work": {
    "eyebrow": "↘ PROJELER · ÖRNEKLER · ZANAAT",
    "tagline1": "Projeler · Vakalar",
    "tagline2": "Marka · Ürün"
  },
  "contact": {
    "eyebrow": "↘ KONUŞALIM · İŞBİRLİĞİ · İNŞA",
    "tagline1": "İşbirliği yapalım",
    "tagline2": "Ulaş · birlikte inşa et",
    "heroLine1": "Birlikte",
    "heroLine2": "bir şey inşa edelim.",
    "available": "MÜSAİT · YENİ PROJELERE AÇIK",
    "response": "24 SAAT İÇİNDE YANIT · PZT-CUM"
  },
  "footer": {
    "end": "↘ PORTFOLYO · SON",
    "backToTop": "BAŞA DÖN",
    "madeIn": "KADIKÖY'DE YAPILDI · NEFRET & SEVGİ İLE",
    "designedIn": "İSTANBUL'DA TASARLANDI"
  }
}
```

---

## 8. Asset Pipeline

### 8.1 Fonts (you provide)

Place in `/public/fonts/`:

1. **Monument Extended** — Ultrabold (.woff2) — you must own/license
2. **Space Grotesk** — Variable .woff2 from [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk) or static Bold + Medium + SemiBold
3. **JetBrains Mono** — Variable .woff2 or static Regular + Bold

Load via `next/font/local`:

```typescript
// src/app/[locale]/layout.tsx
import localFont from "next/font/local";

const monument = localFont({
  src: "../../../public/fonts/MonumentExtended-Ultrabold.woff2",
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: [
    { path: "../../../public/fonts/SpaceGrotesk-Medium.woff2", weight: "500" },
    { path: "../../../public/fonts/SpaceGrotesk-Bold.woff2", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    { path: "../../../public/fonts/JetBrainsMono-Regular.woff2", weight: "400" },
    { path: "../../../public/fonts/JetBrainsMono-Bold.woff2", weight: "700" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${monument.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 8.2 Images (you extract from Figma)

For Phase 1 you need:
- `furkan-portrait.jpg` — Myself main portrait
- `furkan-cat.jpg` — Myself cat photo
- `frkn-logo.svg` — Brand mark (nav + hero + footer) — extract as SVG
- `hedra.png` — Hero illustration
- `projects/{slug}/cover.jpg` — 6 project covers (Aurum/Nova/Atlas/Forge/Pulse/Beacon)
- `og.png` — 1200×630 social share image

Extract from Figma: select node → Export → 2× PNG/JPG. Use `next/image`:

```typescript
import Image from "next/image";

<Image
  src="/images/furkan-portrait.jpg"
  alt="Ahmet Furkan Yılmaz"
  width={308}
  height={580}
  priority
/>
```

---

## 9. Project Data (`src/lib/projects.ts`)

For Phase 1, we only need the card-level data (name, mono, year, tags, description). Full detail content lives in Phase 2.

```typescript
export type ProjectCard = {
  slug: string;
  mono: string;          // "Au"
  name: string;          // "Aurum"
  title: string;         // "AURUM"
  year: string;
  role: string;
  client: string;
  tags: string[];
  featured: boolean;
  dark: boolean;
  accent: boolean;
  index: string;
  indexLabel: string;
  description: string;
  // Phase 2 will add: tagline, meta, context, screens, metaCards
};

export const projects: ProjectCard[] = [
  {
    slug: "aurum", mono: "Au", name: "Aurum", title: "AURUM", year: "2025",
    role: "UI · UX · APP", client: "Aurum Bank", tags: ["FINTECH", "MOBILE"],
    featured: true, dark: true, accent: true,
    index: "01", indexLabel: "FEATURED · 01",
    description: "Banking redesign for 100K+ active users. End-to-end product design with motion.",
  },
  {
    slug: "nova", mono: "Nv", name: "Nova", title: "NOVA", year: "2024",
    role: "BRAND · IDENTITY", client: "Nova Studio", tags: ["STARTUP", "SYSTEM"],
    featured: false, dark: false, accent: false,
    index: "02", indexLabel: "// 02",
    description: "Visual identity for an early-stage tech startup. Logo, typography, motion principles.",
  },
  {
    slug: "atlas", mono: "At", name: "Atlas", title: "ATLAS", year: "2024",
    role: "PRODUCT · B2B", client: "Atlas HQ", tags: ["ENTERPRISE", "CRM"],
    featured: false, dark: true, accent: false,
    index: "03", indexLabel: "// 03",
    description: "Enterprise CRM redesign serving 500+ accounts. Component library and key flows.",
  },
  {
    slug: "forge", mono: "Fo", name: "Forge", title: "FORGE", year: "2023",
    role: "BRAND", client: "Forge Co.", tags: ["LOGO", "MARK"],
    featured: false, dark: false, accent: false,
    index: "04", indexLabel: "// 04",
    description: "Brand mark and identity exploration for a craft tool startup.",
  },
  {
    slug: "pulse", mono: "Pu", name: "Pulse", title: "PULSE", year: "2023",
    role: "MOTION", client: "Pulse SaaS", tags: ["EXPLAINER", "LOOP"],
    featured: false, dark: true, accent: false,
    index: "05", indexLabel: "// 05",
    description: "Motion-led explainer for a SaaS launch. 90-second narrative with custom art.",
  },
  {
    slug: "beacon", mono: "Bc", name: "Beacon", title: "BEACON", year: "2022",
    role: "UX", client: "Beacon Inc.", tags: ["ONBOARDING", "FLOW"],
    featured: false, dark: false, accent: false,
    index: "06", indexLabel: "// 06",
    description: "Onboarding flow redesign and UX research for a consumer product.",
  },
];
```

**Note:** Project metadata above is placeholder. Replace `description`, `client`, `role` with your real values before launch.

---

## 10. Build Roadmap — Phase 1 (Homepage)

### Phase 1.1 — Foundation (Day 1 morning)
1. `create-next-app` + dependencies
2. `globals.css` with tokens
3. Fonts via `next/font/local`
4. `next-intl` middleware + locale routing
5. `BrutalCard` + `BrutalCardDark` primitives
6. `SmoothScroll` Lenis wrapper
7. `CustomCursor` component
8. Wire all three into `[locale]/layout.tsx`

### Phase 1.2 — Layout + Hero (Day 1 afternoon)
9. `Nav` with TR/EN toggle (functional locale swap)
10. `SectionHeader` 2-cell primitive
11. `BrutalAccent` glyph component
12. `Marquee` primitive
13. `Hero` section (with letter stagger reveal)
14. `Footer` section (simple, builds confidence)

### Phase 1.3 — Identity Sections (Day 2)
15. `Myself` section (rebuilt header layout + photos + footer cells)
16. `Skills` section (3×2 two-half grid with hover effects)

### Phase 1.4 — Work Sections (Day 3)
17. `Career` section (with `CountUp` for 20+/50+ + work history + timeline)
18. `Work` section (3×2 grid, cards link with placeholder href for Phase 2)
19. `Contact` section (DARK CTA with split-text reveal)

### Phase 1.5 — Polish (Day 4)
20. All animations refined (consult section 6.5 priority list)
21. i18n translations complete (TR + EN)
22. Image optimization + lazy loading
23. SEO meta tags + OG image
24. Reduced motion fallbacks
25. Mobile responsive pass (375px, 768px, 1024px)
26. Lighthouse audit + fixes
27. Deploy to Vercel

**Phase 1 total estimate: 4 days** of focused work with Cursor assistance.

---

## 11. Phase 2 — Project Detail Pages (LATER)

Once Phase 1 ships, scope for Phase 2:

- `/work/[slug]` dynamic route
- 7-section detail page layout (header → hero image → context bento → screens → meta → next CTA → footer)
- FLIP page transition from Work card to detail page (shared layout id on title)
- Full project content in `src/lib/projects.ts` (tagline, meta, context, screens, metaCards)
- Real screenshots in `/public/images/projects/{slug}/`

**Defer until Phase 1 is live and you have real project content ready.**

---

## 12. Cursor-Specific Workflow

1. **Drop this file at `.cursor/rules/portfolio.md`** so Cursor always has it as context.
2. **For each phase, send the starter prompt** at the top of this file, then sub-task prompts per phase 1.X.
3. **For each component, prompt Cursor:**
   > "Build the [SectionName] component per section 5.X of @portfolio.md. Use primitives from `src/components/primitives/`. Add the specified animations from section 5.X."
4. **For tricky layouts, screenshot the Figma section and drop into Cursor:**
   > "Match this exactly to the Figma reference. Cell dimensions and gaps as specified in section 5.X."
5. **For animations, reference section 6:**
   > "Add the count-up animation to the 20+ number using `CountUp` from section 6.4."
6. **When Cursor goes off-script, redirect:**
   > "Stop. Re-read section 3 visual language rules. The shadow must use ::after, not box-shadow. Fix it."

---

## 13. Manual Steps Reminder

You handle these yourself:

- **Monument Extended licensing** — license + place in `/public/fonts/`
- **Real photos** — Furkan portrait, cat photo
- **Project covers** — 6 cover images in `/public/images/projects/{slug}/cover.jpg`
- **Copy review** — every TR/EN translation needs your final tone pass
- **FRKN logo SVG** — extract from Figma file or recreate inline
- **Vercel deploy** — connect GitHub repo, set domain (frkn.design or chosen)
- **Analytics** — add Vercel Analytics after first deploy

---

## 14. Production Checklist (before launch)

- [ ] All sections responsive (375 / 768 / 1024 / 1440)
- [ ] Lighthouse > 90 across all metrics
- [ ] Custom cursor disabled on touch devices
- [ ] Smooth scroll respects `prefers-reduced-motion`
- [ ] All `<Image>` components have `alt` text
- [ ] OG image generated and tested with social debuggers
- [ ] Favicon set
- [ ] 404 page styled in brutal aesthetic
- [ ] Sitemap.xml + robots.txt
- [ ] SSL active on production domain
- [ ] TR/EN switch tested end-to-end
- [ ] Email link `mailto:` works
- [ ] Social links open in new tab

---

## 15. Figma File Map (reference)

| Section | Node ID | Notes |
|---|---|---|
| Nav bar | `846:313` | With TR/EN toggle |
| Hero | `658:342` | FRKN logo + PORTFOLIO + hedra |
| Myself | `863:73` (parent `863:72`) | Combined cells |
| Skills | `759:108` | 3×2 two-half grid |
| Career | `748:108` | 20+/50+ half-half + work history + timeline |
| Work | `778:108` | 3×2 two-half grid |
| Contact | `807:108` | CTA + 3 cells |
| Footer | `815:180` | DARK signature |

---

**Phase 1 hedef: 4 günde canlıda. Animasyonlar Phase 1.5'te toplu polish, çekirdek mimari erkenden sağlam dursun.**

— Built with Claude · ready for Cursor
