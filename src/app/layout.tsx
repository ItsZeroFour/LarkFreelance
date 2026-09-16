import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { ConsoleSignature } from "@/components/easter/ConsoleSignature";
import { IconSprite } from "@/components/ui/IconSprite";
import { contact } from "@/data/contacts";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * Типографика Lark DS.
 * Заголовки - Involve: вариативный, с настоящим наклонным начертанием
 * и полной кириллицей. Система берёт вес 700 на всех ступенях, наклон -
 * для акцентного слова внутри заголовка.
 * Интерфейс - Inter, сабсет cyrillic обязателен.
 * Служебные метки и консоль Larkins - JetBrains Mono.
 * Involve и JetBrains Mono лежат локально в public/fonts вместе с файлами
 * лицензий OFL.txt и OFL-JetBrainsMono.txt - они обязаны остаться в поставке.
 */
const display = localFont({
  variable: "--lark-font-display",
  display: "swap",
  src: [
    { path: "../../public/fonts/Involve-VF.woff2", weight: "400 700", style: "normal" },
    {
      path: "../../public/fonts/Involve-Oblique-VF.woff2",
      weight: "400 700",
      style: "oblique 0deg 12deg",
    },
  ],
});

const mono = localFont({
  variable: "--lark-font-mono",
  display: "swap",
  src: [
    { path: "../../public/fonts/JetBrainsMono-VF.woff2", weight: "100 800", style: "normal" },
    {
      path: "../../public/fonts/JetBrainsMono-Italic-VF.woff2",
      weight: "100 800",
      style: "italic",
    },
  ],
});

/* Без weight next/font отдаёт вариативный Inter: два файла (latin + cyrillic)
   вместо восьми статических начертаний, при этом доступны все веса 100-900,
   которыми оперирует ДС. Минус ~6 запросов и ~120 КБ на первой загрузке. */
const text = Inter({
  variable: "--lark-font-text",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lark Freelance - IT-агентство нового поколения",
    template: "%s · Lark Freelance",
  },
  description: `Lark Freelance - технологическая команда нового поколения. Веб-разработка, AI-автоматизация и IT под ключ в одном контуре. Стратегия, дизайн и execution. Ответ ${contact.responseTime}.`,
  keywords: [
    "Lark Freelance",
    "IT-агентство",
    "веб-разработка",
    "разработка сайтов",
    "AI автоматизация",
    "IT под ключ",
    "digital агентство",
    "разработка под ключ",
    "Крым",
  ],
  authors: [{ name: "Lark Freelance" }],
  creator: "Lark Freelance",
  applicationName: "Lark Freelance",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Lark Freelance",
    title: "Lark Freelance - IT-агентство нового поколения",
    description:
      "Веб-разработка, AI-автоматизация и IT под ключ в одной команде. Цифровые решения, которые работают.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lark Freelance - IT-агентство нового поколения",
    description:
      "Веб-разработка, AI-автоматизация и IT под ключ в одной команде.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* Верхнего предела масштаба нет намеренно: запрет зума ломает доступность. */
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090909" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

/**
 * Структурированные данные уровня сайта.
 *
 * Один @graph вместо двух отдельных блоков: узлы связаны через @id, поэтому
 * Google видит, что организация из ProfessionalService и издатель сайта -
 * это одно лицо. logo обязателен, чтобы значок попал в панель знаний;
 * без него Organization остаётся безымянной строкой.
 */
const ORG_ID = `${SITE_URL}/#organization`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: "Lark Freelance",
      alternateName: "Ларк Фриланс",
      description:
        "IT-агентство нового поколения: веб-разработка, AI-автоматизация и IT под ключ.",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/opengraph-image.png`,
      email: contact.email.label,
      telephone: contact.phone.label,
      priceRange: "$",
      areaServed: { "@type": "Country", name: "Россия" },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Республика Крым",
        addressCountry: "RU",
      },
      sameAs: [contact.telegram.url],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: contact.phone.label,
        email: contact.email.label,
        areaServed: "RU",
        availableLanguage: ["Russian"],
      },
      knowsAbout: [
        "Веб-разработка",
        "AI-автоматизация",
        "IT под ключ",
        "Продуктовая стратегия",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Lark Freelance",
      inLanguage: "ru-RU",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      data-surface="web"
      className={`${display.variable} ${text.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="lark">
        <IconSprite />
        <MotionProvider>
          {children}
          <ConsoleSignature />
        </MotionProvider>
      </body>
    </html>
  );
}
