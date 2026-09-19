/**
 * Single source of truth for contact details.
 * Swap these values to update the whole site (header, contact section, footer,
 * structured data). The phone below is a placeholder - replace with the real
 * number when available.
 */

export const contact = {
  telegram: {
    handle: "@larkfreelance",
    url: "https://t.me/larkfreelance",
  },
  phone: {
    /** Display form. */
    label: "+7 (978) 679-10-16",
    /** tel: form - digits only with leading +. */
    href: "tel:+79786791016",
  },
  email: {
    label: "larkcosystem@proton.me",
    href: "mailto:larkcosystem@proton.me",
  },
  /** For freelancer applications. */
  joinEmail: {
    label: "larkcosystem@proton.me",
    href: "mailto:larkcosystem@proton.me",
  },
  location: "Крым · работаем удалённо",
  /** Typical first-response time - used as a conversion signal. */
  responseTime: "за 15 минут",
  /**
   * Рабочие часы. Без них обещание «за 15 минут» читается как круглосуточное
   * и ломается на первой же ночной заявке - поэтому оно везде идёт в паре
   * с этой строкой.
   */
  workHours: "будни 10:00-20:00 МСК",
  /** Что будет после того, как человек оставил номер. */
  callPromise: "Уточним задачу, обсудим бюджет и следующий шаг",
  /** Документ под формой. Согласие без доступного текста ничего не значит. */
  privacyPath: "/privacy",
} as const;
