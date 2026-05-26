import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrutalAccent } from "./BrutalAccent";

type Section = "myself" | "skills" | "career" | "work" | "contact";

type Props = {
  section: Section;
  index: string;
  total?: string;
  title: string;
  eyebrow: string;
  rightMeta?: string;
  tagline1?: string;
  tagline2?: string;
  className?: string;
  children?: ReactNode;
};

// 2-cell section header — left is the big title + eyebrow + tagline pair,
// right is the // MARK · NN · /total meta card with the accent glyph.
export function SectionHeader({
  section,
  index,
  total = "06",
  title,
  eyebrow,
  rightMeta,
  tagline1,
  tagline2,
  className,
  children,
}: Props) {
  return (
    <header className={cn("grid gap-[24px]", className)}>
      <div className="grid grid-cols-[1fr_296px] items-end gap-[24px]">
        <div className="flex flex-col gap-[12px]">
          <p className="font-mono text-[11px] font-bold tracking-mono uppercase text-fg-muted">
            {eyebrow}
          </p>
          <h2 className="font-display text-[112px] leading-none uppercase">
            {title}
          </h2>
          {(tagline1 || tagline2) && (
            <div className="mt-[8px] flex flex-col gap-[2px] text-[17px] font-bold text-fg-secondary">
              {tagline1 && <p>{tagline1}</p>}
              {tagline2 && <p>{tagline2}</p>}
            </div>
          )}
        </div>

        <div className="flex h-full flex-col justify-between gap-[12px] border-l border-border-default pl-[24px]">
          <p className="font-mono text-[10px] font-bold tracking-mono uppercase text-fg-muted">
            // MARK · {index}
          </p>
          <div className="flex items-center justify-between font-display text-[64px] leading-none">
            <BrutalAccent section={section} accent />
            <span>{index}</span>
            <span className="text-fg-muted">/{total}</span>
          </div>
          {rightMeta && (
            <p className="font-mono text-[10px] font-bold tracking-mono uppercase text-fg-muted">
              {rightMeta}
            </p>
          )}
        </div>
      </div>
      {children}
    </header>
  );
}
