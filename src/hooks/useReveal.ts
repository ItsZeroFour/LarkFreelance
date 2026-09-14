"use client";

import type { Variants } from "framer-motion";

/**
 * Reveal motion presets - restrained and editorial.
 * Short travel, no blur, calm easing. Shared by <Reveal /> and any
 * section that staggers its children.
 */

export type RevealDirection = "up" | "down" | "left" | "right" | "fade";

const offsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 20 },
  down: { x: 0, y: -20 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  fade: { x: 0, y: 0 },
};

/** Variants for a single revealed element. */
export function revealVariants(direction: RevealDirection = "up"): Variants {
  const o = offsets[direction];
  return {
    hidden: { opacity: 0, x: o.x, y: o.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

/** Container variants that stagger their children on reveal. */
export function staggerContainer(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Shared viewport config for `whileInView`. */
export const revealViewport = { once: true, amount: 0.2 } as const;
