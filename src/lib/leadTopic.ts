/**
 * Тема обращения: связывает карточку услуги или кейс с формой заявки.
 *
 * Человек, нажавший «Обсудить автоматизацию» или «Обсудить похожий проект»,
 * уже сказал, что ему нужно. Заставлять его повторять это в разговоре -
 * терять то, что он сообщил бесплатно, поэтому выбранное направление
 * доезжает до формы, показывается в ней и уходит команде вместе с номером.
 *
 * Два пути, потому что источники живут по-разному. Услуги стоят на одной
 * странице с формой - там хватает события. Кейс открыт на своей странице,
 * и переход на главную убивает всё, что жило в памяти вкладки, - поэтому
 * тема дополнительно откладывается в sessionStorage и забирается формой
 * при появлении.
 */

export const LEAD_TOPIC_EVENT = "lark:lead-topic";

/** Ключ переживает только переход между страницами и стирается при чтении. */
const STORAGE_KEY = "lark:lead-topic";

export interface LeadTopic {
  /** Стабильный идентификатор - уходит в уведомление команде. */
  id: string;
  /** Человеческое имя темы - показывается в форме. */
  label: string;
}

/** Сообщить форме заявки, о чём хочет говорить человек. */
export function requestLeadTopic(topic: LeadTopic): void {
  if (typeof window === "undefined") return;

  // Хранилище может быть недоступно - приватный режим, запрет на данные
  // сайта. Тогда теряется тема, но не заявка: форма работает как обычно.
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(topic));
  } catch {
    /* хранилище закрыто - тема просто не переживёт переход */
  }

  window.dispatchEvent(
    new CustomEvent<LeadTopic>(LEAD_TOPIC_EVENT, { detail: topic }),
  );
}

/**
 * Забрать тему, отложенную перед переходом на другую страницу.
 * Читается один раз: вернувшись на главную позже, человек не должен
 * обнаружить в форме тему позапрошлого визита.
 */
export function takeStoredLeadTopic(): LeadTopic | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(STORAGE_KEY);

    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as LeadTopic).id !== "string" ||
      typeof (parsed as LeadTopic).label !== "string"
    ) {
      return null;
    }
    const { id, label } = parsed as LeadTopic;
    return { id, label };
  } catch {
    return null;
  }
}
