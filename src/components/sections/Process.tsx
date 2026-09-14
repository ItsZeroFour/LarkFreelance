"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { processStages } from "@/data/process";

/**
 * 03 - Как мы работаем. Восемь колонок из двенадцати, без центрирования.
 *
 * Коннектор вертикальный на всех ширинах. Горизонтальная шина с прогрессом
 * по скроллу удалена: она ломалась на мобильном и требовала пружины на
 * каждый кадр. Крупный глиф-водяной знак тоже снят - иконки в системе
 * служебные, 24×24, а не декоративные.
 */
export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="03 - Как мы работаем"
        title="Процесс без *чёрных ящиков*"
        description="Каждый этап виден: вы всегда знаете, что происходит и что будет дальше."
      />

      <motion.ol
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="lg:w-8/12"
      >
        {processStages.map((stage, i) => (
          <motion.li
            key={stage.id}
            variants={revealVariants("up")}
            className="lark-step-card"
          >
            <div className="lark-step-card__rail">
              <span className="lark-step-card__dot lark-num">{stage.index}</span>
              {i < processStages.length - 1 && (
                <span className="lark-step-card__line" aria-hidden="true" />
              )}
            </div>

            <div className="lark-step-card__body">
              <span className="lark-step-card__meta lark-mono lark-mono--sm">
                {stage.marker}
              </span>
              <h3 className="lark-step-card__title">{stage.title}</h3>
              <p className="lark-body lark-dim">{stage.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
