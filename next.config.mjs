/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Gzip/Brotli the HTML and assets Next serves itself.
  compress: true,

  images: {
    // Только WebP. AVIF даёт файлы чуть меньше, но кодируется в разы дольше:
    // на слабом VPS первый посетитель кейса ждёт, пока сервер перекодирует
    // все скриншоты галереи. WebP кодируется быстро и всё так же сжимает.
    formats: ["image/webp"],
    // Держим оптимизированные варианты в кэше подольше - год.
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Trim the breakpoint list to the sizes this layout actually requests,
    // so fewer variants are generated and cached.
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
