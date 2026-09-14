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
    return [
      {
        // Long-lived, immutable caching for the static screenshot library.
        source: "/portfolio/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
