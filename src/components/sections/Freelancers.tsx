"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { AccentText } from "@/components/ui/SectionHeading";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

const offers = [
  {
    title: "Отбор, а не поток",
    body: "Мы зовём точечно. Маленькая команда сильных людей важнее большой случайной.",
  },
  {
    title: "Среда роста",
    body: "Сложные задачи, AI-инструменты и люди, у которых есть чему учиться.",
  },
  {
    title: "Своя орбита",
    body: "Прозрачные условия, уважение ко времени и доля ответственности за результат.",
  },
];

/**
 * Для фрилансеров - обособленный блок.
 *
 * Второй фон удалён: блок обособляет плотная граница и радиус. Три оффера
 * собраны в одну сетку без промежутков, как плитки контактов, - приём один,
 * применён дважды. CTA вторичный: главный жёлтый призыв страницы уже занят.
 */
export function Freelancers() {
  return (
    <Section id="freelancers">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="flex flex-col items-center gap-5 rounded-card border border-border-strong
                   px-5 py-10 text-center sm:px-10 sm:py-12"
      >
        <motion.span
          variants={revealVariants("up")}
          className="lark-badge lark-badge--brand"
        >
          <Icon name="wing" scale="xs" />
          Для фрилансеров
        </motion.span>

        <motion.h2 variants={revealVariants("up")} className="t-hero text-balance">
          <AccentText text="Летим *вместе*" />
        </motion.h2>

        <motion.p variants={revealVariants("up")} className="t-lead text-pretty">
          Lark - не биржа исполнителей. Это закрытый круг людей, которые умеют
          доводить до результата. Если вы из таких - в команде есть место рядом.
        </motion.p>

        <motion.ul
          variants={revealVariants("up")}
          className="lark-tiles mt-3 w-full text-left !grid-cols-1 lg:!grid-cols-3"
        >
          {offers.map((offer) => (
            <li key={offer.title} className="lark-tile cursor-default">
              <span className="lark-tile__label">{offer.title}</span>
              <span className="lark-tile__note">{offer.body}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={revealVariants("up")} className="mt-2">
          <Button href={contact.joinEmail.href} variant="secondary" external>
            Отправить заявку
            <Icon name="arrow-up-right" scale="xs" />
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
