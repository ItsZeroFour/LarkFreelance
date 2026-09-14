"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  revealVariants,
  revealViewport,
  type RevealDirection,
} from "@/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}

/**
 * Wraps children in a cinematic in-view reveal.
 * Honors prefers-reduced-motion automatically via Framer Motion.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={revealVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
