import { ImageResponse } from "next/og";

/**
 * Generated Open Graph / social-share image.
 *
 * Next.js auto-detects this file and injects og:image (and, via twitter-image,
 * twitter:image) into every page's metadata - so links to the site finally
 * render a branded card instead of a blank preview.
 *
 * Text is kept Latin on purpose: next/og ships only a Latin font, and a brand
 * card needs no extra font fetch to stay reliable at build time. Swap this for
 * a designed image later by dropping an opengraph-image.png alongside it.
 */
export const alt = "Lark Freelance - AI-native digital agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0a0b";
const TEXT = "#f4f0e9";
const MUTED = "#908b81";
const ACCENT = "#d4a017";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
          padding: 48,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 28,
            padding: 64,
          }}
        >
          {/* Brand line */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: ACCENT,
              }}
            />
            <div
              style={{
                fontSize: 24,
                letterSpacing: 6,
                color: ACCENT,
                textTransform: "uppercase",
              }}
            >
              Lark Freelance
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 700,
                lineHeight: 1.05,
                color: TEXT,
                letterSpacing: -2,
              }}
            >
              AI-native digital agency
            </div>
            <div style={{ display: "flex", fontSize: 34, color: MUTED }}>
              Web development · AI automation · IT - under one roof
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: MUTED,
            }}
          >
            <div style={{ display: "flex" }}>Strategy · Design · Execution</div>
            <div style={{ display: "flex", color: TEXT }}>
              Crimea · Remote worldwide
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
