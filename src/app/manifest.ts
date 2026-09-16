import type { MetadataRoute } from "next";

/**
 * Веб-манифест. Даёт имя и иконку при сохранении сайта на домашний экран,
 * а поисковым роботам — явную пару name/short_name на русском.
 * Цвета берутся из инварианта ДС: --lark-bg тёмной темы.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lark Freelance — IT-агентство нового поколения",
    short_name: "Lark Freelance",
    description:
      "Веб-разработка, AI-автоматизация и IT под ключ в одной команде.",
    lang: "ru",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#090909",
    theme_color: "#090909",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
