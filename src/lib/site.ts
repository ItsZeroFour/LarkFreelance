/**
 * Public site URL - single source of truth.
 *
 * Drives metadataBase, canonical URLs, Open Graph, the sitemap, robots.txt
 * and JSON-LD. Set NEXT_PUBLIC_SITE_URL in the environment once the real
 * domain is live; the placeholder below only keeps builds working until then.
 *
 * The trailing slash is stripped so callers can append paths freely.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://larkfreelance.dev"
).replace(/\/+$/, "");
