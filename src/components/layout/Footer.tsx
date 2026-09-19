"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { AccentText } from "@/components/ui/SectionHeading";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

const footerNav = [
  {
    title: "Разделы",
    links: [
      { label: "Услуги", href: "/#services" },
      { label: "Процесс", href: "/#process" },
      { label: "Работы", href: "/portfolio" },
      { label: "Команда", href: "/#team" },
      { label: "Larkins", href: "/larkins" },
      // Найм живёт здесь: на главной он перехватывал путь заказчика к заявке.
      { label: "Работа в Lark", href: "/join" },
    ],
  },
];

const contactLinks = [
  { label: contact.telegram.handle, href: contact.telegram.url, external: true },
  { label: contact.phone.label, href: contact.phone.href },
  { label: contact.email.label, href: contact.email.href },
];

/**
 * Футер. Фоновая сетка и свечение сняты - блок отделяет линия.
 *
 * Слоган набран ступенью Display и стоит в закрывающей строке: это
 * последнее, что читают, и единственное место, где метафора полёта
 * звучит в полный голос.
 */
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="shell">
        <m.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6"
        >
          <m.div
            variants={revealVariants("up")}
            className="flex flex-col gap-3 sm:col-span-2 lg:col-span-5"
          >
            <Link href="/" aria-label="Lark Freelance - на главную" className="text-text">
              <Logo size={28} />
            </Link>
            <p className="lark-body lark-dim max-w-[42ch]">
              IT-агентство нового поколения. Веб-разработка, AI-автоматизация
              и IT под ключ.
            </p>
            <p className="lark-caption">{contact.location}</p>
          </m.div>

          {footerNav.map((group) => (
            <m.nav
              key={group.title}
              variants={revealVariants("up")}
              className="flex flex-col gap-3 lg:col-span-3"
              aria-label={group.title}
            >
              <p className="lark-label">{group.title}</p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="lark-body text-text-2">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.nav>
          ))}

          <m.div
            variants={revealVariants("up")}
            className="flex flex-col gap-3 lg:col-span-4"
          >
            <p className="lark-label">Связаться</p>
            <ul className="flex flex-col gap-2">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="lark-body text-text-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        </m.div>

        <div className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row
                        sm:items-baseline sm:justify-between">
          <p className="t-section !max-w-none">
            <AccentText text="Расправь *свои крылья*" />
          </p>
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <Link href="/privacy" className="lark-caption text-text-2">
              Политика обработки персональных данных
            </Link>
            <p className="lark-caption lark-num">
              © {new Date().getFullYear()} Lark Freelance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
