import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { CustomCursor } from "@/components/layout/CustomCursor";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { routing } from "@/i18n/routing";

import "../globals.css";

// Files live under /public/fonts/. .otf/.ttf for now; convert to .woff2 in Phase 1.5 polish for smaller payload.
const monument = localFont({
  src: "../../../public/fonts/MonumentExtended-Ultrabold.otf",
  variable: "--font-monument",
  display: "swap",
  weight: "800",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "../../../public/fonts/SpaceGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/SpaceGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../../../public/fonts/JetBrainsMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/JetBrainsMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FRKN.DESIGN — Ahmet Furkan Yılmaz",
  description:
    "UI/UX & Motion Designer based in Kadıköy, Istanbul. Brands, interfaces, and motion for small teams who care about craft.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${monument.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <CustomCursor />
          <Nav />
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
