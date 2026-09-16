"use client";

import Link from "next/link";
import { m } from "framer-motion";
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
        <m.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <m.span
            variants={revealVariants("up")}
            className="lark-badge lark-badge--brand"
          >
            <span className="lark-dot" aria-hidden="true" />
            coming soon
          </m.span>

          <m.h1
            variants={revealVariants("up")}
            className="font-display mt-6 leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 14vw, 8.5rem)" }}
          >
            Larkins
          </m.h1>

          <m.p
            variants={revealVariants("up")}
            className="lark-label mt-4 text-text-3"
          >
            Lark Freelance · intelligence layer
          </m.p>

          <m.p
            variants={revealVariants("up")}
            className="t-lead text-pretty mt-7 text-text-2"
          >
            AI-ассистент нового поколения для вашего бизнеса. Спокойный
            интеллект, встроенный в работу команды.
          </m.p>

          {/* Traits */}
          <m.ul
            variants={staggerContainer(0.08)}
            className="mt-12 grid w-full gap-3 text-left sm:grid-cols-3"
          >
            {traits.map((t) => (
              <m.li
                key={t.title}
                variants={revealVariants("up")}
                className="rounded-l lark-card p-5"
              >
                <h2 className="font-display text-base">{t.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-2">
                  {t.body}
                </p>
              </m.li>
            ))}
          </m.ul>

          {/* Actions.
              Подписи кнопок lg не переносятся, поэтому в ряд пара встаёт
              только от sm. Раньше стоял xs (400px): на айфонах 414-430px
              ряд выходил шире экрана и правую кнопку срезало. */}
          <m.div
            variants={revealVariants("up")}
<<<<<<< HEAD
            className="mt-11 flex w-full min-w-0 flex-wrap gap-3"
          >
            <Link
              href="/#larkins-brief"
              className="lark-btn lark-btn--primary lark-btn--lg w-full max-sm:px-5 sm:w-auto"
=======
            className="mt-11 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center"
          >
            <Link
              href="/#larkins-brief"
              className="lark-btn lark-btn--primary lark-btn--lg lark-btn--block sm:w-auto"
>>>>>>> a3f551c416d92b04bb875f7d2157a0342090ce6c
            >
              Собрать бриф сейчас
              <Icon name="arrow-right" scale="xs" />
            </Link>
            <a
              href={contact.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
              className="lark-btn lark-btn--ghost lark-btn--lg w-full max-sm:px-5 sm:w-auto"
=======
              className="lark-btn lark-btn--ghost lark-btn--lg lark-btn--block sm:w-auto"
>>>>>>> a3f551c416d92b04bb875f7d2157a0342090ce6c
            >
              <Icon name="telegram" scale="xs" />
              Написать в Telegram
            </a>
          </m.div>

          <m.div variants={revealVariants("up")} className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-3
                         transition-colors hover:text-text cursor-pointer"
            >
              <Icon name="arrow-right" scale="xs" className="rotate-180" />
              На главную
            </Link>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
