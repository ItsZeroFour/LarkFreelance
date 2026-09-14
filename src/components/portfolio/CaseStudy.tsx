"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";
import { getBlur } from "@/data/blurData";
import type { PortfolioItem } from "@/data/portfolio";

interface CaseStudyProps {
  item: PortfolioItem;
  next: PortfolioItem;
}

/**
 * Страница кейса. Это витрина: с неё показывают работу вживую и с неё же
 * приходит отклик, поэтому страница заканчивается не «следующим проектом»,
 * а предложением обсудить похожую задачу.
 *
 * Параллакс обложки и персональный цвет кейса удалены: движение в системе
 * описано тремя переходами, а акцент на экране один.
 */
export function CaseStudy({ item, next }: CaseStudyProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const isPortrait = item.orientation === "portrait";

  // Esc закрывает просмотр, скролл страницы под ним блокируется.
  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <article>
      {/* ===== Обложка ===== */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={item.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder={getBlur(item.cover) ? "blur" : "empty"}
            blurDataURL={getBlur(item.cover)}
            className="object-cover object-top"
          />
        </div>
        {/* Затемнение под текстом - читаемость важнее снимка */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--lark-bg) 62%, transparent) 0%, color-mix(in srgb, var(--lark-bg) 78%, transparent) 45%, var(--lark-bg) 100%)",
          }}
        />

        <div className="shell relative flex min-h-[62svh] flex-col justify-end pb-10 pt-28 sm:pb-14 sm:pt-32">
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            animate="visible"
            className="flex max-w-3xl flex-col gap-4"
          >
            <motion.div variants={revealVariants("up")} className="lark-crumbs">
              <Link href="/portfolio">Работы</Link>
              <span className="lark-crumbs__sep" aria-hidden="true">
                <Icon name="arrow-right" scale="xs" />
              </span>
              <span className="lark-crumbs__now">{item.title}</span>
            </motion.div>

            <motion.h1 variants={revealVariants("up")} className="t-hero">
              {item.title}
            </motion.h1>

            <motion.p variants={revealVariants("up")} className="t-lead">
              {item.tagline}
            </motion.p>

            <motion.div
              variants={revealVariants("up")}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="lark-badge lark-badge--sm lark-badge--neutral">
                {item.categoryLabel}
              </span>
              <span className="lark-caption lark-num">{item.year}</span>
              <span className="lark-caption">{item.client}</span>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ===== Что делали ===== */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="flex flex-col gap-4 lg:col-span-7"
          >
            {item.overview.map((paragraph, i) => (
              <motion.p key={i} variants={revealVariants("up")} className="t-body">
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={revealVariants("up")}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="flex flex-col gap-5 lg:col-span-5"
          >
            <div className="flex flex-col gap-3">
              <p className="lark-label">Что делали</p>
              <ul className="lark-chips">
                {item.services.map((service) => (
                  <li key={service} className="lark-chip cursor-default">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Цифры клиента, а не наши результаты - подписано честно. */}
            <div className="flex flex-col gap-3">
              <p className="lark-label">О клиенте</p>
              <ul className="flex flex-col">
                {item.stats.map((stat) => (
                  <li
                    key={stat.label}
                    className="flex items-baseline justify-between gap-4
                               border-t border-border py-3"
                  >
                    <span className="lark-caption">{stat.label}</span>
                    <span className="font-display lark-num text-[length:var(--lark-size-body-l)] leading-none">
                      {stat.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ===== Решения ===== */}
      {item.highlights.length > 0 && (
        <Section>
          <motion.ul
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="grid gap-x-6 sm:grid-cols-2"
          >
            {item.highlights.map((highlight, i) => (
              <motion.li
                key={highlight.title}
                variants={revealVariants("up")}
                className="flex flex-col gap-2 border-t border-border py-5"
              >
                <div className="flex items-baseline gap-4">
                  <span className="lark-mono lark-mono--sm text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="lark-h3 text-[length:var(--lark-size-body-l)] leading-[var(--lark-line-body-l)]">
                    {highlight.title}
                  </h2>
                </div>
                <p className="lark-body lark-dim">{highlight.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </Section>
      )}

      {/* ===== Экраны ===== */}
      <Section>
        {/* Экраны рендерятся сразу видимыми - без scroll-анимации (whileInView).
            В высокой галерее (nordan/binomo и т.п.) порог видимости контейнера
            был недостижим, и нижние экраны оставались скрытыми (пустой экран
            при прокрутке). Плавность даёт ленивая подгрузка + blur-заглушка,
            а корректность важнее анимации. */}
        <div
          className={
            isPortrait
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-8"
          }
        >
          {item.gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`Открыть экран ${i + 1}`}
              className="block w-full cursor-zoom-in border-none bg-transparent p-0 text-left
                         focus-visible:outline-2 focus-visible:outline-accent"
            >
              {isPortrait ? (
                <PhoneFrame src={src} alt={`${item.title} - экран ${i + 1}`} />
              ) : (
                <BrowserFrame
                  src={src}
                  alt={`${item.title} - экран ${i + 1}`}
                  hideBar={item.hideBrowserBar}
                />
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* ===== Отклик ===== */}
      <Section>
        <div className="flex flex-col items-start gap-5 rounded-card border border-border-strong p-6 sm:p-10">
          <p className="lark-label">Похожая задача?</p>
          <h2 className="t-section">
            Соберём такой же - <em>под ваш бизнес</em>
          </h2>
          <p className="t-lead">
            Оставьте номер - перезвоним за 15 минут, предложим решение
            и назовём сроки и вилку стоимости.
          </p>
          {/* Две кнопки lg в ряд помещаются только от ~600px: до sm они идут
              столбцом на всю ширину, дальше - в ряд с переносом. */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button href={contact.phone.href} size="lg">
              Обсудить проект
              <Icon name="arrow-right" scale="xs" />
            </Button>
            <Button href="/portfolio" variant="ghost" size="lg">
              Другие работы
            </Button>
          </div>
        </div>
      </Section>

      {/* ===== Следующий кейс ===== */}
      <Section>
        <Link href={`/portfolio/${next.slug}`} className="lark-case">
          <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
            <div className="flex flex-col gap-1">
              <span className="lark-label">Следующая работа</span>
              <span className="lark-case__title">{next.title}</span>
            </div>
            <Icon name="arrow-right" className="text-ink" />
          </div>
        </Link>
      </Section>

      {/* ===== Просмотр экрана ===== */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${item.title} - экран ${lightbox + 1}`}
            onClick={() => setLightbox(null)}
            // На мобильном ДС прижимает содержимое .lark-scrim к низу - это
            // шторка для модалок. Просмотр экрана должен стоять по центру.
            className="lark-scrim cursor-zoom-out !items-center !p-4"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Закрыть"
              className="lark-btn lark-btn--ghost lark-btn--icon absolute right-5 top-5"
            >
              <Icon name="close" scale="sm" />
            </button>
            <Image
              src={item.gallery[lightbox]}
              alt={`${item.title} - экран ${lightbox + 1}`}
              width={1400}
              height={900}
              sizes="92vw"
              placeholder={getBlur(item.gallery[lightbox]) ? "blur" : "empty"}
              blurDataURL={getBlur(item.gallery[lightbox])}
              className="max-h-full w-auto max-w-full rounded-m object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
