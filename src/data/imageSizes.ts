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
  "/portfolio/aquamarine/1.webp": { width: 1400, height: 635 },
  "/portfolio/aquamarine/2.webp": { width: 1400, height: 638 },
  "/portfolio/aquamarine/3.webp": { width: 1400, height: 638 },
  "/portfolio/aquamarine/4.webp": { width: 1400, height: 542 },
  "/portfolio/aquamarine/5.webp": { width: 1400, height: 696 },
  "/portfolio/august/1.webp": { width: 1400, height: 660 },
  "/portfolio/august/2.webp": { width: 1400, height: 665 },
  "/portfolio/august/3.webp": { width: 1400, height: 659 },
  "/portfolio/august/4.webp": { width: 1400, height: 664 },
  "/portfolio/august/5.webp": { width: 1400, height: 662 },
  "/portfolio/big/1.webp": { width: 1400, height: 827 },
  "/portfolio/big/2.webp": { width: 1400, height: 879 },
  "/portfolio/big/3.webp": { width: 1400, height: 682 },
  "/portfolio/big/4.webp": { width: 1400, height: 796 },
  "/portfolio/big/5.webp": { width: 1361, height: 928 },
  "/portfolio/big/6.webp": { width: 1367, height: 919 },
  "/portfolio/big/7.webp": { width: 1400, height: 659 },
  "/portfolio/big/8.webp": { width: 1400, height: 805 },
  "/portfolio/binomo/1.webp": { width: 1400, height: 660 },
  "/portfolio/binomo/2.webp": { width: 1400, height: 661 },
  "/portfolio/binomo/3.webp": { width: 1400, height: 656 },
  "/portfolio/binomo/4.webp": { width: 1400, height: 660 },
  "/portfolio/binomo/5.webp": { width: 1400, height: 661 },
  "/portfolio/binomo/6.webp": { width: 1400, height: 650 },
  "/portfolio/binomo/7.webp": { width: 1400, height: 664 },
  "/portfolio/binomo/8.webp": { width: 1400, height: 717 },
  "/portfolio/fonbet/1.png": { width: 662, height: 807 },
  "/portfolio/fonbet/2.png": { width: 680, height: 804 },
  "/portfolio/fonbet/3.png": { width: 641, height: 761 },
  "/portfolio/fonbet/4.png": { width: 651, height: 774 },
  "/portfolio/fonbet/5.png": { width: 779, height: 823 },
  "/portfolio/fonbet/6.png": { width: 650, height: 793 },
  "/portfolio/fonbet/7.png": { width: 625, height: 832 },
  "/portfolio/nordan/1.webp": { width: 1400, height: 681 },
  "/portfolio/nordan/2.webp": { width: 1400, height: 679 },
  "/portfolio/nordan/3.webp": { width: 1400, height: 672 },
  "/portfolio/nordan/4.webp": { width: 1400, height: 679 },
  "/portfolio/nordan/5.webp": { width: 1400, height: 680 },
  "/portfolio/nordan/6.webp": { width: 1400, height: 683 },
  "/portfolio/nordan/7.webp": { width: 1400, height: 673 },
  "/portfolio/nordan/8.webp": { width: 1400, height: 672 },
  "/portfolio/nordan/9.webp": { width: 1400, height: 674 },
  "/portfolio/stockity/1.png": { width: 453, height: 768 },
  "/portfolio/stockity/2.png": { width: 487, height: 765 },
  "/portfolio/stockity/3.png": { width: 473, height: 761 },
  "/portfolio/stockity/4.png": { width: 434, height: 750 },
  "/portfolio/stockity/5.png": { width: 439, height: 757 },
  "/portfolio/stockity/6.png": { width: 443, height: 762 },
  "/portfolio/stockity/7.png": { width: 439, height: 753 },
  "/portfolio/stockity/8.png": { width: 438, height: 756 },
  "/portfolio/stockity-wallpaper/1.webp": { width: 1400, height: 660 },
  "/portfolio/stockity-wallpaper/2.webp": { width: 1400, height: 657 },
  "/portfolio/stockity-wallpaper/3.webp": { width: 1400, height: 662 },
  "/portfolio/stockity-wallpaper/4.webp": { width: 1400, height: 661 },
  "/portfolio/stockity-wallpaper/5.webp": { width: 1400, height: 660 },
};

/** Dimensions for a public image path, with a safe 16:10 fallback. */
export function getImageSize(src: string): ImageSize {
  return imageSizes[src] ?? { width: 1400, height: 875 };
}
