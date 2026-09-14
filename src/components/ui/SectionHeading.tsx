"use client";

import { motion } from "framer-motion";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Метка раздела, например «02 - Услуги». Номер уходит в маркер и в фолио. */
  eyebrow?: string;
  /** Заголовок. Акцентное слово размечается звёздочками: «ушли в *прод*». */
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Шапка раздела: маркер с номером и линией до края контейнера, заголовок
 * с одним акцентным словом и необязательный лид.
 *
 * Линия маркера и есть приём - она связывает разделы в один вертикальный
 * маршрут. Пульсирующая точка из прежнего эйрбоу удалена: статус-точка
 * остаётся только там, где сообщает состояние.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const folio = eyebrow?.match(/\d+/)?.[0];
  // «02 - Услуги» → «Услуги». Номер уже показан маркером.
  const label = eyebrow?.replace(/^\s*\d+\s*[-–]\s*/, "").trim();

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      className={cn(
        "lark-section__head",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {/* Фолио - парная часть маркера, всегда в правом верхнем углу.
          Ниже 640px не выводится: см. .t-folio. */}
      {folio && align === "left" && (
        <span aria-hidden="true" className="t-folio">
          {folio}
        </span>
      )}

      {eyebrow && (
        <motion.div variants={revealVariants("up")} className="lark-marker">
          {folio && (
            <span className="lark-marker__num lark-mono lark-mono--sm">{folio}</span>
          )}
          <span className="lark-marker__dash" aria-hidden="true" />
          {label && <span className="lark-marker__title">{label}</span>}
          <span className="lark-marker__rule" aria-hidden="true" />
        </motion.div>
      )}

      <motion.h2
        variants={revealVariants("up")}
        className="t-section text-balance"
      >
        <AccentText text={title} />
      </motion.h2>

      {description && (
        <motion.p
          variants={revealVariants("up")}
          className={cn("t-lead", align === "center" && "mx-auto")}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

/**
 * Разбирает акцентное слово: «Работы, которые *ушли в прод*».
 * Копирайтер правит текст без разработчика, а в HTML не уезжает
 * произвольная разметка. Наследие с <em> понимается тоже.
 */
export function AccentText({ text }: { text: string }) {
  const normalised = text.replace(/<em>(.*?)<\/em>/g, "*$1*");
  const parts = normalised.split(/\*(.+?)\*/g);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <em key={i}>{part}</em> : part
      )}
    </>
  );
}
