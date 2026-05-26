# FRKN.DESIGN — Session Handover

**Date snapshot:** 2026-05-27
**Repo:** `C:\Users\MSI\frkn-design`
**Phase:** 1.4 in progress — sections done: Hero, Myself, Skills, Career, Work. **Remaining:** Contact, Footer, then Phase 1.5 polish.

---

## 1. Stack (locked, don't change)

- Next.js **16.2.6** (App Router, Turbopack) — **breaking from 15**, read `node_modules/next/dist/docs/` before touching APIs
- React 19, TypeScript strict
- Tailwind **v4** (`@theme` in `globals.css`, not `tailwind.config`)
- Framer Motion 12
- Lenis (smooth scroll) — instance shared via `src/lib/lenis.ts` module singleton
- next-intl 4 (TR default, EN second, `localePrefix: as-needed`)
- lottie-react (logo)

**Routing:** `src/app/[locale]/page.tsx` + `src/app/[locale]/layout.tsx`. Middleware in `src/middleware.ts`.

---

## 2. What's built

### Sections (in page order)

| Section | File | Status |
|---|---|---|
| Hero | `src/components/sections/Hero.tsx` | ✅ desktop + mobile |
| MarqueeBands (between Hero & Myself) | `src/components/primitives/MarqueeBands.tsx` | ✅ |
| Myself | `src/components/sections/Myself.tsx` | ✅ desktop + mobile |
| Skills (with Capabilities band) | `src/components/sections/Skills.tsx` | ✅ desktop + mobile |
| Career | `src/components/sections/Career.tsx` | ✅ desktop + mobile |
| Work | `src/components/sections/Work.tsx` | ✅ desktop + mobile |
| **Contact** | — | ⏳ next |
| **Footer** | — | ⏳ next |

### Layout / Primitives

| Component | File | Notes |
|---|---|---|
| Nav | `src/components/layout/Nav.tsx` | Desktop pill (max-w-1400) + mobile top brand band + mobile bottom tab bar (scroll-direction hide/show, active pill via animate left) |
| LottieLogo | `src/components/layout/LottieLogo.tsx` | Module-level cache shared across desktop/mobile instances, memoized |
| LocaleSwitcher | `src/components/layout/LocaleSwitcher.tsx` | EN | TR with `useTransition` + Lenis-aware route swap |
| SmoothScroll | `src/components/layout/SmoothScroll.tsx` | Lenis instance → `setLenis()` global helper |
| CustomCursor | `src/components/layout/CustomCursor.tsx` | mix-blend-difference, hidden on touch |
| BrutalCard | `src/components/primitives/BrutalCard.tsx` | `.brutal-card` utility with ::after shadow |
| BrutalAccent | `src/components/primitives/BrutalAccent.tsx` | ✷ ✕ ↗ ▣ ✉ glyphs per section |
| Marquee | `src/components/primitives/Marquee.tsx` | Single-row marquee (legacy, not used) |
| MarqueeBands | `src/components/primitives/MarqueeBands.tsx` | 2 diagonal bands ±5°, 200vw wide, h-120/200 container |
| SectionHeader | `src/components/primitives/SectionHeader.tsx` | 2-cell header primitive |
| WordSwap | `src/components/ui/WordSwap.tsx` | Used in Hero HELLO pill (FURKAN → DESIGNER → ARTIST → DREAMER) |
| TypewriterText | `src/components/ui/TypewriterText.tsx` | Built early, currently unused |

### Lib

- `src/lib/animations.ts` — `BRUTAL_EASE`, `VIEWPORT`, `fadeUp`, `staggerContainer`, `titleReveal`
- `src/lib/lenis.ts` — module singleton + `scrollToAnchor(href, { offset })`
- `src/lib/utils.ts` — `cn()` helper

### i18n

- `src/i18n/routing.ts`, `src/i18n/request.ts`
- `src/content/translations/tr.json`, `en.json` — keys exist but most section content is currently hardcoded English; **Phase 1.5 task**: pipe through `useTranslations`

---

## 3. Important conventions

### Code rules
1. `"use client"` only when needed (animations, hooks, interactivity)
2. No CSS-in-JS. Tailwind classes + `globals.css` variables only
3. Shadow technique: `.brutal-card::after` at `inset: 6px -6px -6px 6px`. **NEVER** `box-shadow`
4. Section structure: `<section id="...">` with `<div className="hidden md:flex">` desktop tree and `<div className="md:hidden">` mobile tree (separate JSX branches when layouts diverge)
5. Custom cursor states: `data-cursor="link"` (nav items, social, mail), `data-cursor="view"` (project cards)

### Animation defaults
- `BRUTAL_EASE = [0.16, 1, 0.3, 1]`
- `VIEWPORT = { once: true, margin: "-100px" }` — use everywhere for scroll-triggered reveals
- Entrance: `duration: 0.6-0.7s`. Hover: `duration: 0.2-0.3s`
- Respect `prefers-reduced-motion` (CSS in globals.css handles broad cases)

### Spacing tokens (in globals.css `:root`)
- `--section-y: 72px` `--section-x: 80px` `--card-gap: 24px` `--shadow-offset: 6px`
- Not heavily consumed yet — most components have hardcoded values; Phase 1.5 cleanup target.

### Section padding pattern
Most sections: `px-[20px] pt-[X] pb-[Y] md:px-[80px] md:pt-[X'] md:pb-[Y']`. Tight gaps requested by user — currently Skills→Career and Career→Work transitions are very compact (pt-0 / pb-12-24).

---

## 4. User preferences (CRITICAL — see also `~/.claude/projects/.../memory/`)

- **Speak Turkish in chat. Code + comments stay English.**
- **Direct execution.** Don't ever route through "paste this into Cursor Agent". Use the tools directly.
- **Mobile responsive is a hard requirement** for every section. User often draws mobile Figma after seeing desktop.
- **Pixel-perfect spacing matters.** User notices 2-3px misalignments and asks for fixes.
- **Acid green sparingly.** Max 2-3 accents per section.
- **No drop shadows, no border-radius, no gradients** unless explicitly approved. (Some rounded corners exist now per user request — e.g. nav pill, tab bar.)
- **"Nefes alan tasarım"** = breathing space. User dislikes cramped layouts.

---

## 5. Figma file map

File ID: `DyVdeOI5bLiEn2ZoW9aZHf`

| Section | Desktop node | Mobile node |
|---|---|---|
| Homepage (mobile bundle) | — | `896:371` |
| Hero | `808:256` | inside `896:371` |
| Nav bar (top) | `894:330` | `919:1855` (mobile) |
| Nav bar (mobile bottom) | — | inside `896:373` |
| Myself | `863:72` | `906:984` |
| Skills | `759:108` | inside `896:371` (single-col) |
| Career | `748:108` | (responsive, user said draw if needed) |
| Work | `778:108` | (responsive) |
| Marquee bands | `919:1635` | same component |
| Contact | `807:108` (original HANDOFF — may have updated) | ⏳ ask user |
| Footer | `815:180` (original HANDOFF — may have updated) | ⏳ ask user |

**Figma MCP plugin is connected in user's Cursor.** Use `mcp__00bc86ff-4ffb-4d38-8d40-17746e8c5293__get_design_context` with `fileKey` + `nodeId` to fetch.

---

## 6. Asset folders

```
public/
├── fonts/
│   ├── MonumentExtended-Ultrabold.otf  (display)
│   ├── SpaceGrotesk-{Medium,Bold}.ttf  (body)
│   └── JetBrainsMono-{Regular,Bold}.ttf  (mono labels)
├── icons/
│   ├── logo.json                       (Lottie nav logo)
│   ├── {Home,Myself,Work,Contact}-icon.svg  (nav)
│   ├── skills/
│   │   ├── ai.svg, AItools.svg, After-effects.svg, Figma.svg, Photoshop.svg, Premiere.svg
│   │   ├── skillssparkle.svg           (corner + header sparkle)
│   │   └── greensparkle.svg            (alt — currently unused)
│   └── myself/
│       ├── Ffavicon.svg                (F brand mark)
│       ├── sparkle.svg, frkdsgn-sparkle.svg, hello-typhography.svg
├── images/
│   ├── hero/
│   │   ├── welcome-with-hat.svg        (desktop)
│   │   ├── welcome-mobile.svg          (mobile, user provided)
│   │   ├── welcome.svg, hat-and-o.svg  (alternates)
│   └── myself/
│       ├── arrow-southeast.png, f-mark.png, star-brutalist.png, ...
│       ├── furkan-portrait.png         (user provided)
│       └── furkan-cat.jpg              (Figma placeholder — user will swap)
```

---

## 7. Known issues / pending tweaks

- **Mobile marquee X-cross** — currently ±5°. If user wants more dramatic, increase to ±6°.
- **Aurum project card click** → Phase 2 will wire `/work/[slug]` route. Currently `console.log` stub.
- **Capabilities band on mobile** — single column. User may want 2-col on tablet someday.
- **i18n** — translations exist in JSON but most section content is hardcoded English. Pipe through `useTranslations` in Phase 1.5.
- **Count-up numbers** (Career +20 / +50, Work stats) — static currently. `CountUp` component spec is in original HANDOFF section 6.4 but not built yet.
- **`prefers-reduced-motion`** — globals.css handles broad CSS animations; verify Lenis + Framer respect it on real devices.
- **Allowed dev origins** — `next.config.ts` has `allowedDevOrigins: ["192.168.1.190"]` for user's LAN. Add more IPs if testing from other devices.

---

## 8. dev server

User's LAN IP: `192.168.1.190`. Phone testing:

```powershell
cd C:\Users\MSI\frkn-design
npm run dev -- -H 0.0.0.0
```

Then phone Safari → `http://192.168.1.190:3000`.

**Always verify with `npm run build`** before declaring done (catches TS errors that `dev` may miss with Turbopack).

---

## 9. Memory files

User memory at `C:\Users\MSI\.claude\projects\C--Users-MSI\memory\`:
- `user_profile.md` — Furkan profile
- `feedback_execution_style.md` — Direct execution preference
- `project_frkn_design.md` — Project context
- `MEMORY.md` — Index

These persist across sessions. Read them on session start.

---

## 10. Next steps (priorities in order)

1. **Contact section** — User hasn't sent the updated Figma node yet. Original HANDOFF says `807:108`. Will need:
   - Header card with CONTACT wordmark
   - DARK CTA hero (~400h): `● AVAILABLE · OPEN TO NEW PROJECTS` + `Let's build something together.` (split text with acid green italic on second line) + email + 24h response
   - 3 footer cells: Instagram · LinkedIn · Status (acid dot)
   - Mobile responsive

2. **Footer section** — Original HANDOFF `815:180`. Big FRKN.DESIGN signature (144px, ink + acid ".DESIGN") + nav links + status + © notice. Mobile responsive.

3. **Phase 1.5 polish** (not yet started):
   - Count-up animations (Career +20 / +50)
   - i18n wiring (TR + EN translations)
   - Image optimization (.woff2 fonts, .jpg → .webp where possible)
   - OG image (1200×630)
   - Reduced motion audit
   - Lighthouse > 90 across metrics
   - Sitemap + robots.txt
   - Vercel deploy
