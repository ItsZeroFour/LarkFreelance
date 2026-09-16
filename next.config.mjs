/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Gzip/Brotli the HTML and assets Next serves itself.
  compress: true,

  images: {
    // Скриншоты портфолио заранее ужаты и переведены в WebP скриптом
    // scripts/optimize-portfolio.cjs (ландшафт ≤1280px, телефоны ≤720px,
    // q80). Поэтому рантайм-оптимизацию Next выключаем: файлы отдаются
    // статикой напрямую, с иммутабельным кэшем (см. headers ниже) — это
    // мгновенно и не грузит CPU слабого VPS перекодированием.
    unoptimized: true,
  },

  experimental: {
    // Tree-shake large UI libraries down to the icons/components used.
    optimizePackageImports: ["framer-motion"],
  },

  async headers() {
    // Иммутабельный кэш — только для того, что не меняется без смены имени
    // файла. Скриншоты кейсов и файлы шрифтов подходят: их перезаливают
    // вместе с новым деплоем и новым путём.
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];

    // Заголовки безопасности. Ставим их здесь, а не в nginx: конфиг сервера
    // живёт отдельно от репозитория, и при переезде правила теряются.
    // CSP не объявляем — на странице есть инлайновые JSON-LD и стили ДС,
    // корректная политика требует nonce и отдельной работы.
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    return [
      // Только картинки. Раньше здесь стоял "/portfolio/:path*" — под шаблон
      // попадали и сами страницы кейсов (/portfolio/aquamarine), и браузер
      // держал их HTML в кэше год: правки на сайте до вернувшегося
      // посетителя не доезжали.
      { source: "/portfolio/:slug/:image(.+\.webp)", headers: immutable },
      { source: "/fonts/:path*", headers: immutable },
      { source: "/:path*", headers: security },
      // robots.txt и sitemap.xml генерируются на сборке и не меняются между
      // деплоями — сутки в кэше краулера экономят обращения к Node.
      {
        source: "/:file(robots.txt|sitemap.xml)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
