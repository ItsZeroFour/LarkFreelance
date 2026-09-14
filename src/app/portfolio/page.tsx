import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Портфолио - Lark Freelance",
  description:
    "Работы, которые ушли в прод: лендинги, e-commerce, промо-кампании и интерактивные игры. Реальные проекты агентства Lark Freelance.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    url: "/portfolio",
    title: "Портфолио - Lark Freelance",
    description:
      "Лендинги, e-commerce, промо-кампании и интерактивные игры - реальные проекты Lark Freelance.",
  },
};

/** /portfolio - full gallery of delivered work. */
export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section className="pt-28 sm:pt-32 lg:pt-36">

          <SectionHeading
            eyebrow="Портфолио"
            title="Работы, которые <em>ушли в прод</em>"
            description="Лендинги, интернет-магазины, промо-кампании и интерактивные игры. Разные индустрии - один уровень исполнения."
          />

          {/* Quick scale line */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-text-2">
            <span>
              <span className="font-display text-text">{portfolio.length}</span>{" "}
              проектов в подборке
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span>от стоматологии до футбольных промо</span>
          </div>

          <div className="mt-10">
            <PortfolioGallery />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
