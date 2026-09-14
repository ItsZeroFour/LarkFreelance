/** The four-stage working process rendered as a timeline. */

export interface ProcessStage {
  id: string;
  index: string;
  title: string;
  description: string;
  /** Служебная метка шага: diagnose / architect / execute / ship. */
  marker: string;
}

export const processStages: ProcessStage[] = [
  {
    id: "consultation",
    index: "01",
    title: "Консультация",
    description:
      "Слушаем задачу без шаблонов. Разбираем контекст, ограничения и то, что на самом деле важно бизнесу.",
    marker: "diagnose",
  },
  {
    id: "strategy",
    index: "02",
    title: "Стратегия",
    description:
      "Собираем архитектуру решения: что строим, в каком порядке и почему именно так.",
    marker: "architect",
  },
  {
    id: "development",
    index: "03",
    title: "Разработка",
    description:
      "Делаем - короткими видимыми итерациями. Вы видите продукт по мере того, как он оживает.",
    marker: "execute",
  },
  {
    id: "launch",
    index: "04",
    title: "Запуск",
    description:
      "Выводим в прод, стабилизируем, передаём управление. Остаёмся рядом для развития.",
    marker: "ship",
  },
];
