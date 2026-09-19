"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { portfolio } from "@/data/portfolio";
import { getBlur } from "@/data/blurData";

/**
 * 04 - Портфолио. Одна строка из трёх кейсов - строительство, стоматология,
 * e-commerce: индустрии, в которых живёт заказчик, ради которого сделана эта
 * страница. Промо и игры показываем в полной подборке, а не на главной:
 * шесть кейсов растягивали мобильную страницу и размывали адресата.
 *
 * Снимок приглушён и проявляется на ховере с лёгким наездом. Персональный
 * цвет кейса удалён вместе с остальными произвольными цветами: категорию
 * теперь читает бейдж на снимке.
 */
export function Portfolio() {
  const featured = portfolio.slice(0, 3);

  return (
    <Section id="portfolio">
      {/* Нижний отступ шапки переносится на обёртку: иначе он встаёт между
          заголовком и кнопкой, а кнопка прилипает к сетке кейсов. */}
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="04 - Портфолио"
          title="Работы, которые *ушли в прод*"
          description="Сайты, которые продают, лечат и отгружают - от строительной компании до обувного бренда. Промо и игры в полной подборке."
          className="!mb-0"
        />

        <Button href="/portfolio" variant="secondary" className="self-start lg:self-auto">
          Все работы
          <Icon name="arrow-up-right" scale="xs" />
        </Button>
      </div>

      <m.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {featured.map((item) => (
          <m.article key={item.slug} variants={revealVariants("up")}>
            <Link href={`/portfolio/${item.slug}`} className="lark-case">
              <div className="lark-case__shot">
                <Image
                  src={item.cover}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  placeholder={getBlur(item.cover) ? "blur" : "empty"}
                  blurDataURL={getBlur(item.cover)}
                  className="object-cover"
                />
                <div className="lark-case__tags">
                  <span className="lark-badge lark-badge--sm lark-badge--neutral">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="lark-case__head">
                  <h3 className="lark-case__title">{item.title}</h3>
                  <span className="lark-case__year lark-num">{item.year}</span>
                </div>
                <p className="lark-body lark-dim">{item.tagline}</p>
                <p className="lark-caption text-text-3">{item.client}</p>
              </div>
            </Link>
          </m.article>
        ))}
      </m.div>
    </Section>
  );
}
