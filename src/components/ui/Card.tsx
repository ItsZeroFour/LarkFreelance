"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { revealVariants } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Кликабельная: граница до border-strong, подъём 2px, тень md. */
  interactive?: boolean;
  /** Выделенная: плотная граница. Свечения нет - жёлтый на экране один. */
  featured?: boolean;
  as?: "div" | "article" | "li";
}

/**
 * Карточка на плоской поверхности сайта: фон равен фону страницы,
 * держит её волосяная граница. Ховер-подъём только у кликабельной,
 * нажатие возвращает на исходную высоту без тени - та же логика опоры,
 * что у кнопки.
 */
export function Card({
  children,
  className,
  interactive = false,
  featured = false,
  as = "div",
}: CardProps) {
  const MotionTag = m[as] as typeof m.div;

  return (
    <MotionTag
      variants={revealVariants("up")}
      className={cn(
        "lark-card",
        interactive && "lark-card--interactive",
        featured && "border-border-strong",
        className,
      )}
    >
      {children}
    </MotionTag>
  );
}
