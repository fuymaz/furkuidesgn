"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "tr"] as const;
type Locale = (typeof LOCALES)[number];

export function LocaleSwitcher() {
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === current || isPending) return;

    // Strip current locale prefix if present, then re-prefix for the target.
    // With localePrefix: "as-needed", the default locale (tr) has no prefix.
    const stripped = pathname.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";
    const target = next === "tr" ? stripped : `/en${stripped === "/" ? "" : stripped}`;

    startTransition(() => {
      router.replace(target);
    });
  }

  return (
    <div
      className="flex items-center gap-[8px] select-none"
      data-cursor="link"
    >
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={cn(
          "font-body text-[15px] uppercase transition-colors duration-200",
          current === "en"
            ? "font-bold text-fg-primary"
            : "font-medium text-fg-muted hover:text-fg-secondary",
        )}
      >
        EN
      </button>
      <span className="block h-[13px] w-[2px] bg-fg-primary" aria-hidden />
      <button
        type="button"
        onClick={() => switchTo("tr")}
        className={cn(
          "font-body text-[15px] uppercase transition-colors duration-200",
          current === "tr"
            ? "font-bold text-fg-primary"
            : "font-medium text-fg-muted hover:text-fg-secondary",
        )}
      >
        TR
      </button>
    </div>
  );
}
