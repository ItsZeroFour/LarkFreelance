"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

const traits = [
  {
    title: "Собирает бриф",
    body: "Пять точных вопросов вместо длинной формы - задача оформляется сама.",
  },
  {
    title: "Думает с командой",
    body: "Интеллектуальный слой внутри процессов агентства, а не отдельный чат-бот.",
  },
  {
    title: "Передаёт задачу",
    body: `Готовое саммари сразу уходит команде - ответ ${contact.responseTime}.`,
  },
];

export function LarkinsStage() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-32">

      <div className="shell relative">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={revealVariants("up")}
            className="lark-badge lark-badge--brand"
          >
            <span className="lark-dot" aria-hidden="true" />
            coming soon
          </motion.span>

          <motion.h1
            variants={revealVariants("up")}
            className="font-display mt-6 leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 14vw, 8.5rem)" }}
          >
            Larkins
          </motion.h1>

          <motion.p
            variants={revealVariants("up")}
            className="lark-label mt-4 text-text-3"
          >
            Lark Freelance · intelligence layer
          </motion.p>

          <motion.p
            variants={revealVariants("up")}
            className="t-lead text-pretty mt-7 text-text-2"
          >
            AI-ассистент нового поколения для вашего бизнеса. Спокойный
            интеллект, встроенный в работу команды.
          </motion.p>

          {/* Traits */}
          <motion.ul
            variants={staggerContainer(0.08)}
            className="mt-12 grid w-full gap-3 text-left sm:grid-cols-3"
          >
            {traits.map((t) => (
              <motion.li
                key={t.title}
                variants={revealVariants("up")}
                className="rounded-l lark-card p-5"
              >
                <h2 className="font-display text-base">{t.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-2">
                  {t.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          {/* Actions */}
          <motion.div
            variants={revealVariants("up")}
            className="mt-11 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center"
          >
            <Link
              href="/#larkins-brief"
              className="lark-btn lark-btn--primary lark-btn--lg lark-btn--block sm:w-auto"
            >
              Собрать бриф сейчас
              <Icon name="arrow-right" scale="xs" />
            </Link>
            <a
              href={contact.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="lark-btn lark-btn--ghost lark-btn--lg lark-btn--block sm:w-auto"
            >
              <Icon name="telegram" scale="xs" />
              Написать в Telegram
            </a>
          </motion.div>

          <motion.div variants={revealVariants("up")} className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-3
                         transition-colors hover:text-text cursor-pointer"
            >
              <Icon name="arrow-right" scale="xs" className="rotate-180" />
              На главную
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
