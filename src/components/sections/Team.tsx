"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { team } from "@/data/team";

/**
 * 05 - Команда. Четыре человека по три колонки.
 *
 * Четыре персональных оттенка заменены одним акцентом: инициалы живут
 * на нейтрали и заливаются жёлтым под курсором. Фотографий команды в
 * материалах нет, подставлять сток нельзя - инициалы заголовочным
 * шрифтом это осознанный приём, а не заглушка.
 *
 * Черта выводится сразу, а не по ховеру: скрытый текст на тач-устройствах
 * недоступен.
 */
export function Team() {
  return (
    <Section id="team">
      <SectionHeading
        eyebrow="05 - Команда"
        title="Четыре человека - *ядро* команды"
        description="Небольшая команда, где каждый отвечает за свой контур и видит продукт целиком."
      />

      <motion.ul
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid gap-5 xs:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {team.map((member) => (
          <motion.li
            key={member.id}
            variants={revealVariants("up")}
            className="lark-person"
          >
            <span className="lark-person__mark" aria-hidden="true">
              {member.monogram}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="lark-person__name">{member.name}</h3>
              <p className="lark-person__role">{member.caption}</p>
            </div>
            <p className="lark-caption">{member.trait}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
