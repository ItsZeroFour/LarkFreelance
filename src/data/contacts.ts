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
} as const;
