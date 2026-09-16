import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { portfolio } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Портфолио",
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

/**
 * Список работ и хлебные крошки для поиска. ItemList отдаёт роботу порядок и
 * адреса кейсов до того, как он обойдёт галерею, BreadcrumbList рисует путь
 * «Главная › Портфолио» в выдаче вместо голого URL.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/portfolio#page`,
      url: `${SITE_URL}/portfolio`,
      name: "Портфолио Lark Freelance",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "ItemList",
      numberOfItems: portfolio.length,
      itemListElement: portfolio.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.title,
        url: `${SITE_URL}/portfolio/${item.slug}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Портфолио",
          item: `${SITE_URL}/portfolio`,
        },
      ],
    },
  ],
};

/** /portfolio - full gallery of delivered work. */
export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
