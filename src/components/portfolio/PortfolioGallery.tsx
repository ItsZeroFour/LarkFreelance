"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import {
  portfolio,
  portfolioFilters,
  type PortfolioCategory,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Filter = PortfolioCategory | "all";

/**
 * Полная галерея работ. Первый кейс идёт на всю ширину - витрину открывает
 * самая сильная работа, а не ряд одинаковых плиток.
 *
 * Персональные цвета кейсов удалены вместе с остальными произвольными
 * оттенками: категорию читает бейдж на снимке, а акцент на экране один.
 */
export function PortfolioGallery() {
  const [active, setActive] = useState<Filter>("all");

  const items = useMemo(
    () =>
      active === "all"
        ? portfolio
        : portfolio.filter((p) => p.category === active),
    [active],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="lark-chips" role="group" aria-label="Фильтр работ">
        {portfolioFilters.map((f) => {
          const isActive = active === f.id;
          const count =
            f.id === "all"
              ? portfolio.length
              : portfolio.filter((p) => p.category === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={isActive}
              disabled={count === 0}
              onClick={() => setActive(f.id)}
              className={cn("lark-chip", isActive && "is-on")}
            >
              {f.label}
              <span className="lark-num text-text-3">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate="visible"
        viewport={revealViewport}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, i) => (
          <motion.article
            key={item.slug}
            variants={revealVariants("up")}
            className={cn(i === 0 && "sm:col-span-2 lg:col-span-3")}
          >
            <Link
              href={`/portfolio/${item.slug}`}
              className={cn("lark-case", i === 0 && "lg:gap-5")}
            >
              <div
                className={cn(
                  "lark-case__shot",
                  i === 0 && "aspect-[16/7]",
                )}
              >
                <Image
                  src={item.cover}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes={
                    i === 0
                      ? "(min-width: 640px) 92vw, 92vw"
                      : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  }
                  unoptimized
                  className="object-cover"
                />
                <div className="lark-case__tags">
                  <span className="lark-badge lark-badge--sm lark-badge--neutral">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="lark-case__head">
                  <h2 className="lark-case__title">{item.title}</h2>
                  <span className="lark-case__year lark-num">{item.year}</span>
                </div>
                <p className="lark-caption">{item.client}</p>
                {i === 0 && (
                  <p className="t-body mt-1">{item.summary}</p>
                )}
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      {items.length === 0 && (
        <div className="lark-empty">
          <p className="lark-empty__title">В этой категории пока пусто</p>
          <p className="lark-caption">Посмотрите остальные работы - их восемь.</p>
        </div>
      )}
    </div>
  );
}
