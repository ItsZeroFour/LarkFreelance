/** The execution unit. Captions describe how someone thinks - never a title. */

export interface TeamMember {
  id: string;
  name: string;
  caption: string;
  /** A short trait line surfaced on hover. */
  trait: string;
  /** Monogram shown in the avatar plate. */
  monogram: string;
  /** Personal accent hue - gives each member a distinct, calm colour. */
  accent: string;
  /** Portrait photo path. Empty for now - the card shows a placeholder. */
  photo?: string;
}

export const team: TeamMember[] = [
  {
    id: "igor",
    name: "Игорь",
    caption: "Думает экосистемами",
    trait: "Видит продукт целиком - связи, а не отдельные экраны.",
    monogram: "ИГ",
    accent: "#e0a92a",
  },
  {
    id: "daniil",
    name: "Даниил",
    caption: "Делает так, чтобы работало",
    trait: "Доводит до состояния, когда система просто работает.",
    monogram: "ДН",
    accent: "#4fab8e",
  },
  {
    id: "mikhail",
    name: "Михаил",
    caption: "Превращает идеи в интерфейсы",
    trait: "Чувствует форму, ритм и тишину между элементами.",
    monogram: "МХ",
    accent: "#d07ea0",
  },
  {
    id: "ilya",
    name: "Илья",
    caption: "Учит продукты думать",
    trait: "Встраивает интеллект там, где раньше была рутина.",
    monogram: "ИЛ",
    accent: "#5f9fd4",
  },
];
