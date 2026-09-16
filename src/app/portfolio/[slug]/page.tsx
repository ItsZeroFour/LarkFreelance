import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { portfolio, getPortfolioItem } from "@/data/portfolio";
import { getImageSize } from "@/data/imageSizes";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: { slug: string };
}

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getPortfolioItem(params.slug);
  if (!item) return { title: "Проект не найден" };
  const { width, height } = getImageSize(item.cover);
  const path = `/portfolio/${item.slug}`;
  return {
    title: `${item.title} - ${item.categoryLabel}`,
    description: `${item.client}. ${item.summary}`,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${item.title} - Lark Freelance`,
      description: item.summary,
      images: [
        { url: item.cover, width, height, alt: `${item.title} - обложка проекта` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} - Lark Freelance`,
      description: item.summary,
      images: [item.cover],
    },
  };
}

/** /portfolio/[slug] - single case study. */
export default function CaseStudyPage({ params }: PageProps) {
  const item = getPortfolioItem(params.slug);
  if (!item) notFound();

  const index = portfolio.findIndex((p) => p.slug === item.slug);
  const next = portfolio[(index + 1) % portfolio.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: item.title,
        headline: item.tagline,
        description: item.summary,
        url: `${SITE_URL}/portfolio/${item.slug}`,
        image: `${SITE_URL}${item.cover}`,
        dateCreated: item.year,
        keywords: item.services.join(", "),
        /* Ссылка по @id, а не второе описание организации: иначе в графе
           появляется дубль Lark Freelance и сигналы размазываются по двум
           сущностям. Узел с этим @id отдаёт корневой layout. */
        creator: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "ru-RU",
        about: item.client,
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
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: `${SITE_URL}/portfolio/${item.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <CaseStudy item={item} next={next} />
      </main>
      <Footer />
    </>
  );
}
