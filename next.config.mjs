/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Gzip/Brotli the HTML and assets Next serves itself.
  compress: true,

  images: {
    // Serve modern formats first; the optimizer falls back automatically.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images on the CDN/edge for a month.
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
