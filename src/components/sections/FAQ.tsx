"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { faq } from "@/data/faq";

/**
 * 07 - Вопросы. Восемь колонок из двенадцати.
 *
 * Раскрытие по одному, первый открыт по умолчанию: закрытый аккордеон
 * выглядит как неработающий блок. Высота едет через grid-template-rows -
 * без замеров в JS, без AnimatePresence и height:auto.
 */
export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="07 - Вопросы"
        title="Коротко о *главном*"
        description="Всё, что обычно спрашивают до старта."
      />

      <div className="lark-faq lg:w-8/12">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className={`lark-faq__item ${isOpen ? "is-open" : ""}`}
            >
              <h3>
                <button
                  type="button"
                  className="lark-faq__q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {/* Номер - Inter с табличными цифрами, а не моно:
                      он часть заголовка, а не служебная метка. */}
                  <span className="lark-faq__num lark-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.q}
                  <Icon name="arrow-down" scale="sm" />
                </button>
              </h3>
              <div
                className="lark-faq__a"
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
              >
                <div>
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
