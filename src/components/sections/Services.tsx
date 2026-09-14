"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { services } from "@/data/services";

/**
 * 02 - Услуги. Четыре направления по три колонки на 1280.
 *
 * Рамки у карточек нет: направления разделяет линия сверху, она же
 * загорается на ховере, и туда же уходит номер. Карточка Larkins
 * отличается бейджем статуса и плотной линией, а не свечением -
 * жёлтый призыв на экране один, и он не здесь.
 */
export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="02 - Услуги"
        title="Четыре направления, *одна* команда"
        description="Закрываем полный цикл цифровой работы - без передачи задач между подрядчиками."
      />

      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {services.map((service) => (
          <motion.article
            key={service.id}
            variants={revealVariants("up")}
            className={`lark-service ${service.featured ? "border-t-border-strong" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="lark-service__num">{service.index}</span>
              {service.status && (
                <span className="lark-badge lark-badge--sm lark-badge--brand">
                  {service.status}
                </span>
              )}
            </div>

            <h3 className="lark-service__title">{service.title}</h3>

            <p className="lark-body lark-dim">{service.summary}</p>

            <ul className="lark-service__list">
              {service.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>

            <p className="lark-caption lark-num mt-auto pt-2">{service.price}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
