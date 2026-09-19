/** Service offerings rendered in the Services section. */

export interface Service {
  id: string;
  index: string;
  title: string;
  summary: string;
  capabilities: string[];
  /** Display price - "от …" for project work, "По подписке" for Larkins. */
  price: string;
  /**
   * Действие карточки. Без него человек, выбравший направление, вынужден
   * искать форму сам - а он уже сказал, о чём хочет говорить.
   */
  cta: string;
  /** Ссылка вместо формы. Есть только у Larkins: у него своя страница. */
  href?: string;
  /** Larkins gets a distinct, almost-released treatment. */
  featured?: boolean;
  status?: string;
}

export const services: Service[] = [
  {
    id: "web",
    index: "01",
    title: "Web Development",
    summary:
      "Интерфейсы и продукты, которые ощущаются дорого и работают быстро - от лендинга до сложной платформы.",
    capabilities: [
      "Продуктовые сайты и платформы",
      "Дизайн-системы и фронтенд",
      "Высоконагруженные интеграции",
    ],
    price: "от 80 000 ₽",
    cta: "Обсудить сайт",
  },
  {
    id: "ai",
    index: "02",
    title: "AI Automation",
    summary:
      "Встраиваем интеллект в бизнес-процессы: ассистенты, агенты, автоматизация рутины без шума и хайпа.",
    capabilities: [
      "AI-ассистенты и агенты",
      "Автоматизация операций",
      "Внутренние интеллект-инструменты",
    ],
    price: "от 70 000 ₽",
    cta: "Обсудить автоматизацию",
  },
  {
    id: "turnkey",
    index: "03",
    title: "IT под ключ",
    summary:
      "Полный цикл - от стратегии и архитектуры до запуска и сопровождения. Одна команда, одна ответственность.",
    capabilities: [
      "Архитектура и инфраструктура",
      "Запуск и поддержка",
      "Технологический консалтинг",
    ],
    price: "от 200 000 ₽",
    cta: "Обсудить проект под ключ",
  },
  {
    id: "larkins",
    index: "04",
    title: "Larkins AI",
    summary:
      "Интеллектуальный слой агентства - собственная AI-система, которая думает вместе с командой.",
    capabilities: [
      "Сбор брифа и аналитика",
      "Интеллектуальная поддержка проектов",
      "Адаптивный AI-интерфейс",
    ],
    price: "По подписке",
    cta: "Посмотреть Larkins",
    href: "/larkins",
    featured: true,
    status: "coming soon",
  },
];
