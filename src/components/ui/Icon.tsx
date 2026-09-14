/**
 * Иконка из спрайта Lark DS. Сторонние наборы запрещены системой:
 * ни Lucide, ни Feather, ни Material - только собственные глифы.
 *
 * Размер задают классы системы, а не проп: 24 по умолчанию,
 * --sm 20, --xs 16. Штрих, cap и join приходят из токенов.
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-down"
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "plus"
  | "minus"
  | "check"
  | "send"
  | "telegram"
  | "message"
  | "mail"
  | "clock"
  | "shield"
  | "wing"
  | "user"
  | "phone"
  | "spark";

/**
 * Имена сайта → идентификаторы символов системы.
 * Пересопоставление намеренное: telegram и send - один глиф отправки,
 * sun - рассвет из бренд-набора, user - профиль.
 *
 * Префикс site- означает роль, которой в ДС пока нет, - см. IconSprite.
 */
const SYMBOL: Record<IconName, string> = {
  "arrow-right": "lark-arrow-right",
  "arrow-up-right": "lark-takeoff",
  "arrow-down": "lark-chevron-down",
  sun: "lark-sunrise",
  moon: "site-moon",
  menu: "lark-menu",
  close: "lark-close",
  plus: "lark-plus",
  minus: "lark-minus",
  check: "lark-check",
  send: "lark-send",
  telegram: "lark-send",
  message: "lark-message",
  mail: "lark-message",
  clock: "lark-clock",
  shield: "lark-shield",
  wing: "lark-wing",
  user: "lark-profile",
  phone: "site-phone",
  spark: "site-spark",
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  /** Ступень размера из системы. */
  scale?: "sm" | "xs";
}

export function Icon({ name, scale, className, ...rest }: IconProps) {
  return (
    <svg
      className={cn("lark-icon", scale && `lark-icon--${scale}`, className)}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <use href={`#${SYMBOL[name]}`} />
    </svg>
  );
}
