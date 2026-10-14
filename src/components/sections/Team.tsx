"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { team } from "@/data/team";

/**
 * 05 - Команда. Четыре человека по три колонки.
 *
 * Квадратный портрет в рамке ДС, под курсором фото слегка приближается.
 * Если фото у участника нет, вместо него выводятся инициалы заголовочным
 * шрифтом на нейтрали - они заливаются жёлтым под курсором.
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

      <m.ul
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:gap-6"
      >
        {team.map((member) => (
          <m.li
            key={member.id}
            variants={revealVariants("up")}
            className="lark-person group"
          >
            {member.photo ? (
              <div className="lark-person__mark relative overflow-hidden">
                <Image
                  src={member.photo}
                  alt={`${member.name} - ${member.caption.toLowerCase()}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                />
              </div>
            ) : (
              <span className="lark-person__mark" aria-hidden="true">
                {member.monogram}
              </span>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="lark-person__name">{member.name}</h3>
              <p className="lark-person__role">{member.caption}</p>
            </div>
            <p className="lark-caption">{member.trait}</p>
          </m.li>
        ))}
      </m.ul>
    </Section>
  );
}
