/**
 * Intrinsic pixel dimensions for every portfolio screenshot.
 *
 * Generated from the files under /public/portfolio so <Image> can reserve
 * exact space (no layout shift) and request correctly sized sources.
 * Regenerate with: node scripts/gen-image-sizes.cjs
 */
export interface ImageSize {
  width: number;
  height: number;
}

export const imageSizes: Record<string, ImageSize> = {
  "/portfolio/aquamarine/1.webp": { width: 1280, height: 581 },
  "/portfolio/aquamarine/2.webp": { width: 1280, height: 583 },
  "/portfolio/aquamarine/3.webp": { width: 1280, height: 583 },
  "/portfolio/aquamarine/4.webp": { width: 1280, height: 496 },
  "/portfolio/aquamarine/5.webp": { width: 1280, height: 636 },
  "/portfolio/aquamarine/cover.webp": { width: 1280, height: 853 },
  "/portfolio/august/1.webp": { width: 1280, height: 603 },
  "/portfolio/august/2.webp": { width: 1280, height: 608 },
  "/portfolio/august/3.webp": { width: 1280, height: 603 },
  "/portfolio/august/4.webp": { width: 1280, height: 607 },
  "/portfolio/august/5.webp": { width: 1280, height: 605 },
  "/portfolio/big/1.webp": { width: 1280, height: 756 },
  "/portfolio/big/2.webp": { width: 1280, height: 804 },
  "/portfolio/big/3.webp": { width: 1280, height: 624 },
  "/portfolio/big/4.webp": { width: 1280, height: 728 },
  "/portfolio/big/5.webp": { width: 1280, height: 873 },
  "/portfolio/big/6.webp": { width: 1280, height: 861 },
  "/portfolio/big/7.webp": { width: 1280, height: 603 },
  "/portfolio/big/8.webp": { width: 1280, height: 736 },
  "/portfolio/binomo/1.webp": { width: 1280, height: 603 },
  "/portfolio/binomo/2.webp": { width: 1280, height: 604 },
  "/portfolio/binomo/3.webp": { width: 1280, height: 600 },
  "/portfolio/binomo/4.webp": { width: 1280, height: 603 },
  "/portfolio/binomo/5.webp": { width: 1280, height: 604 },
  "/portfolio/binomo/6.webp": { width: 1280, height: 594 },
  "/portfolio/binomo/7.webp": { width: 1280, height: 607 },
  "/portfolio/binomo/8.webp": { width: 1280, height: 608 },
  "/portfolio/fonbet/1.webp": { width: 662, height: 807 },
  "/portfolio/fonbet/2.webp": { width: 680, height: 804 },
  "/portfolio/fonbet/3.webp": { width: 641, height: 761 },
  "/portfolio/fonbet/4.webp": { width: 651, height: 774 },
  "/portfolio/fonbet/5.webp": { width: 720, height: 761 },
  "/portfolio/fonbet/6.webp": { width: 650, height: 793 },
  "/portfolio/fonbet/7.webp": { width: 625, height: 832 },
  "/portfolio/nordan/1.webp": { width: 1280, height: 623 },
  "/portfolio/nordan/2.webp": { width: 1280, height: 621 },
  "/portfolio/nordan/3.webp": { width: 1280, height: 614 },
  "/portfolio/nordan/4.webp": { width: 1280, height: 621 },
  "/portfolio/nordan/5.webp": { width: 1280, height: 622 },
  "/portfolio/nordan/6.webp": { width: 1280, height: 624 },
  "/portfolio/nordan/7.webp": { width: 1280, height: 615 },
  "/portfolio/nordan/8.webp": { width: 1280, height: 614 },
  "/portfolio/nordan/9.webp": { width: 1280, height: 616 },
  "/portfolio/sdstroy/1.webp": { width: 1280, height: 760 },
  "/portfolio/sdstroy/2.webp": { width: 1280, height: 813 },
  "/portfolio/sdstroy/3.webp": { width: 1280, height: 762 },
  "/portfolio/sdstroy/4.webp": { width: 1280, height: 838 },
  "/portfolio/sdstroy/5.webp": { width: 1280, height: 813 },
  "/portfolio/sdstroy/6.webp": { width: 1280, height: 724 },
  "/portfolio/sdstroy/cover.webp": { width: 1280, height: 760 },
  "/portfolio/stockity/1.webp": { width: 453, height: 768 },
  "/portfolio/stockity/2.webp": { width: 487, height: 765 },
  "/portfolio/stockity/3.webp": { width: 473, height: 761 },
  "/portfolio/stockity/4.webp": { width: 434, height: 750 },
  "/portfolio/stockity/5.webp": { width: 439, height: 757 },
  "/portfolio/stockity/6.webp": { width: 443, height: 762 },
  "/portfolio/stockity/7.webp": { width: 439, height: 753 },
  "/portfolio/stockity/8.webp": { width: 438, height: 756 },
  "/portfolio/stockity-wallpaper/1.webp": { width: 1280, height: 603 },
  "/portfolio/stockity-wallpaper/2.webp": { width: 1280, height: 601 },
  "/portfolio/stockity-wallpaper/3.webp": { width: 1280, height: 605 },
  "/portfolio/stockity-wallpaper/4.webp": { width: 1280, height: 604 },
  "/portfolio/stockity-wallpaper/5.webp": { width: 1280, height: 603 },
  "/portfolio/stockity-wallpaper/cover.webp": { width: 1177, height: 463 },
};

/** Dimensions for a public image path, with a safe 16:10 fallback. */
export function getImageSize(src: string): ImageSize {
  return imageSizes[src] ?? { width: 1400, height: 875 };
}
