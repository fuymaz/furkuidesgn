import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Myself } from "@/components/sections/Myself";
import { Skills } from "@/components/sections/Skills";
import { Career } from "@/components/sections/Career";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { MarqueeBands } from "@/components/primitives/MarqueeBands";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <Hero />
      <MarqueeBands />
      <Myself />
      <Skills />
      <Career />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}
