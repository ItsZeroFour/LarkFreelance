"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Trajectory } from "./Trajectory";
import { Button } from "@/components/ui/Button";
import { CallbackForm } from "@/components/ui/CallbackForm";
import { Icon } from "@/components/ui/Icon";
import { AccentText } from "@/components/ui/SectionHeading";
import { revealVariants, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

const capabilities = [
  "Web Development",
  "AI Automation",
  "IT под ключ",
  "Дизайн-системы",
  "Продуктовая стратегия",
  "Интеграции",
];

/**
 * Заказчики из раздела «Портфолио» - узнаваемые имена, каждое стоит за
 * реальным кейсом в src/data/portfolio.ts. Доказательство, а не украшение:
 * это первое, что ищет лид, пришедший с рекламы.
 */
const clients = ["FONBET", "Binomo", "Stockity", "NORDAN", "Дирекция кино", "Аквамарин"];

/**
 * Первый экран.
 *
 * Композиция 1c: центр, симметричная дуга, один графический элемент.
 * Два отступления от макета сделаны осознанно и в пользу конверсии.
 *
 * Первое: призыв стоит сразу под подзаголовком, а не в нижней строке
 * рамки. На макете подвал был частью показа в корпусе ноутбука; на живой
 * странице высотой в экран это уводило главную кнопку под сгиб.
 *
 * Второе: нижняя строка стала доказательной - счёт проектов, время ответа
 * и имена заказчиков. Одной метрики для лида, пришедшего с рекламы, мало,
 * а имена клиентов - самый дешёвый и честный аргумент из тех, что у нас есть.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16 pb-[var(--site-rhythm)]"
    >
      {/* Единственная фоновая текстура на сайте - и только здесь */}
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 -z-10
                   [mask-image:linear-gradient(180deg,#000_0%,transparent_85%)]"
      />

      <div className="shell relative flex min-h-[82svh] flex-col justify-center py-8">
        <motion.div
          variants={staggerContainer(reduce ? 0 : 0.08, 0.1)}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col items-center text-center"
        >
          <motion.span
            variants={revealVariants("up")}
            className="lark-badge lark-badge--neutral"
          >
            <span className="lark-dot text-ink" aria-hidden="true" />
            IT-агентство нового поколения
          </motion.span>

          <motion.h1 variants={revealVariants("up")} className="t-hero mt-6 text-balance">
            <AccentText text="*Живые* цифровые решения" />
          </motion.h1>

          <motion.p variants={revealVariants("up")} className="t-lead mt-5 text-pretty">
            Стратегия, дизайн и AI автоматизация в одной команде.
            Для бизнеса, который думает вперёд
          </motion.p>

          {/* Самый короткий путь к отклику: номер - и перезвонили.
              Стоит до сгиба, бриф остаётся альтернативой ниже. */}
          <motion.div
            variants={revealVariants("up")}
            className="mt-8 w-full max-w-xl text-left"
          >
            <CallbackForm source="hero" />
          </motion.div>

          {/* Траектория - единственный графический элемент экрана */}
          <Trajectory className="pointer-events-none mt-2 h-[96px] w-full max-w-4xl sm:h-[132px]" />
        </motion.div>

        {/* Доказательная строка */}
        <motion.div
          variants={revealVariants("up")}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
          className="mt-6 flex flex-col gap-4 border-t border-border pt-5
                     lg:flex-row lg:items-center lg:justify-between lg:gap-8"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="lark-caption lark-num shrink-0">
              <span className="text-text">10+</span> проектов запущено
            </p>
            <p className="lark-caption shrink-0">
              Перезваниваем {contact.responseTime}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="lark-label shrink-0">Работали с</span>
            {clients.map((client) => (
              <span
                key={client}
                className="font-display text-[length:var(--lark-size-caption)]
                           leading-none text-text-2"
              >
                {client}
              </span>
            ))}
          </div>

          <Button href="/portfolio" variant="ghost" size="sm" className="shrink-0">
            Смотреть работы
            <Icon name="arrow-up-right" scale="xs" />
          </Button>
        </motion.div>
      </div>

      {/* Бегущая строка направлений. Два трека подряд: анимация уводит
          первый ровно на его ширину, второй встаёт на его место. */}
      <div className="lark-marquee mask-x">
        {[0, 1].map((track) => (
          <div
            key={track}
            className="lark-marquee__track"
            aria-hidden={track > 0 ? "true" : undefined}
          >
            {capabilities.map((capability) => (
              <span key={capability} className="lark-marquee__item">
                {capability}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
