import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
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

const text = Inter({
  variable: "--lark-font-text",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
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
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090909",
};

/** Organization / ProfessionalService structured data for SEO. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Lark Freelance",
  description:
    "IT-агентство нового поколения: веб-разработка, AI-автоматизация и IT под ключ.",
  url: SITE_URL,
  email: contact.email.label,
  telephone: contact.phone.label,
  areaServed: "RU",
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
    availableLanguage: ["Russian"],
  },
  knowsAbout: [
    "Веб-разработка",
    "AI-автоматизация",
    "IT под ключ",
    "Продуктовая стратегия",
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
        {children}
        <ConsoleSignature />
      </body>
    </html>
  );
}
