"use client";

import { m } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Trajectory } from "@/components/hero/Trajectory";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";
import type { IconName } from "@/components/ui/Icon";

interface Channel {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  /** Единственная жёлтая плитка - она и есть основное действие. */
  primary?: boolean;
  note: string;
}

const channels: Channel[] = [
  {
    icon: "telegram",
    label: "Telegram",
    value: contact.telegram.handle,
    href: contact.telegram.url,
    external: true,
    primary: true,
    note: `Самый быстрый способ - ответим ${contact.responseTime}`,
  },
  {
    icon: "phone",
    label: "Телефон",
    value: contact.phone.label,
    href: contact.phone.href,
    note: "Звонок в рабочее время",
  },
  {
    icon: "mail",
    label: "Почта",
    value: contact.email.label,
    href: contact.email.href,
    note: "Для подробных задач и документов",
  },
];

const guarantees = [
  `Первый ответ ${contact.responseTime}`,
  "Разговор ни к чему не обязывает",
  "Можно оставить номер на первом экране - перезвоним",
];

/**
 * 08 - Контакты. Завершающий блок страницы: с ним заказчик остаётся один
 * на один, поэтому он идёт после блока для фрилансеров, а не до.
 *
 * Здесь только наши каналы, без формы: короткий путь «оставил номер -
 * перезвонили» живёт на первом экране, а страница закрывается тем, как
 * с нами связаться напрямую.
 *
 * Плитки идут по старшинству: Telegram занимает всю ширину и он же
 * единственный жёлтый, телефон и почта - под ним. Три равные коробки
 * не показывали, какой канал быстрее.
 *
 * Сюда же приходит траектория - та самая дуга с первого экрана, только
 * на посадке. Страница открывается размахом и закрывается приземлением.
 */
export function Contact() {
  return (
    <Section id="contact">
      {/* Заголовок стоит первым — так фолио-номер «08» встаёт напротив
          своего маркера, а не уезжает к верху раздела. */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SectionHeading
            eyebrow="08 - Контакты"
            title="Обсудим *ваш проект*"
            description="Расскажите задачу - мы предложим решение, назовём сроки и вилку стоимости. Без обязательств и долгих форм."
            className="!mb-0"
          />

          <p className="lark-label">{contact.location}</p>

          <m.ul
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="flex flex-col"
          >
            {guarantees.map((row) => (
              <m.li
                key={row}
                variants={revealVariants("up")}
                className="flex items-center gap-3 border-t border-border py-3 lark-caption"
              >
                <Icon name="check" scale="xs" className="shrink-0 text-ink" />
                {row}
              </m.li>
            ))}
          </m.ul>
        </div>

        <m.div
          variants={revealVariants("up")}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="lark-tiles h-fit !grid-cols-1 sm:!grid-cols-2 lg:col-span-7"
        >
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className={`lark-tile ${channel.primary ? "lark-tile--accent sm:col-span-2" : ""}`}
            >
              <span className="lark-tile__label flex items-center gap-2">
                <Icon name={channel.icon} scale="xs" />
                {channel.label}
              </span>
              <span className="lark-tile__note">{channel.note}</span>
              <span className="lark-tile__value">{channel.value}</span>
            </a>
          ))}
        </m.div>
      </div>

      {/* Дуга-приземление закрывает страницу: открылись размахом на первом
          экране — здесь заходим на посадку. */}
      <Trajectory
        variant="landing"
        trigger="inView"
        className="pointer-events-none mt-12 h-[64px] w-full sm:h-[88px]"
      />
    </Section>
  );
}
