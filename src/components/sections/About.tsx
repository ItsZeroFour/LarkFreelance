"use client";

import { m } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";

const principles = [
  {
    title: "Один контур ответственности",
    body: "Стратегия, дизайн и разработка не передаются между подрядчиками - всё держит одна команда.",
  },
  {
    title: "Продукт, а не макет",
    body: "Доводим до состояния, когда система работает в реальности, а не выглядит хорошо на слайде.",
  },
  {
    title: "Интеллект внутри процесса",
    body: "AI у нас - рабочий инструмент, встроенный в то, как мы думаем и делаем, а не витрина.",
  },
];

/**
 * 01 - Кто мы. Семь колонок текста плюс пять колонок принципов.
 *
 * Принципы перестали быть карточками: три строки, разделённые волосяной
 * линией. Двенадцать границ и три spotlight-слоя заменяет одна линия на
 * строку - на плоской поверхности это читается спокойнее и занимает
 * заметно меньше высоты.
 *
 * Первая линия принципов стоит на одной высоте с линией маркера слева:
 * без этого она висела на 8 px выше - ровно на половину строки маркера.
 */
export function About() {
  return (
    <Section id="about">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <SectionHeading
            eyebrow="01 - Кто мы"
            title="Команда, которая делает *живые* цифровые продукты"
            className="!mb-0"
          />
          <m.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="flex flex-col gap-4"
          >
            <m.p variants={revealVariants("up")} className="t-body">
              Мы не digital-агентство в привычном смысле и не биржа исполнителей.
              Мы - небольшая технологическая команда, которая берёт задачу
              целиком: от первой формулировки до работающего продукта в проде.
            </m.p>
            <m.p variants={revealVariants("up")} className="t-body">
              Без презентационного тумана. Есть задача бизнеса - есть инженерное
              решение, доведённое до результата.
            </m.p>
          </m.div>
        </div>

        <m.ul
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-col lg:col-span-5 lark-rule-aligned"
        >
          {principles.map((principle, i) => (
            <m.li
              key={principle.title}
              variants={revealVariants("up")}
              className="flex flex-col gap-2 border-t border-border py-5"
            >
              <div className="flex items-baseline gap-4">
                <span className="lark-mono lark-mono--sm text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="lark-h3 text-[length:var(--lark-size-body-l)] leading-[var(--lark-line-body-l)]">
                  {principle.title}
                </h3>
              </div>
              <p className="lark-body lark-dim">{principle.body}</p>
            </m.li>
          ))}
        </m.ul>
      </div>
    </Section>
  );
}
