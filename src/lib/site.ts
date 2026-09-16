/**
 * Public site URL - single source of truth.
 *
 * Drives metadataBase, canonical URLs, Open Graph, the sitemap, robots.txt
 * and JSON-LD. The default is the live domain; override it with
 * NEXT_PUBLIC_SITE_URL only for staging or preview builds. A wrong value here
 * poisons every canonical, every og:url, the sitemap and the JSON-LD at once -
 * and does it silently, so the site looks fine while search engines index a
 * domain that does not exist.
 *
 * The trailing slash is stripped so callers can append paths freely.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lark.eco"
).replace(/\/+$/, "");
