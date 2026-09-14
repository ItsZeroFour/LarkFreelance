/**
 * Larkins - the intelligence layer.
 *
 * This module owns the system prompt and the conversation contract used by
 * the /api/larkins route. When an ANTHROPIC_API_KEY is present, replies are
 * generated live by Claude. Without a key, a deterministic scripted flow
 * collects the same brief - so the console always works.
 */

export const LARKINS_SYSTEM = `
Ты - Larkins, AI-ассистент агентства Lark Freelance.

Твоя задача:
дружелюбно и кратко собрать бриф клиента.

Последовательно задай 5 вопросов:

1. Что нужно сделать?
2. Для какого бизнеса?
3. Есть ли референсы?
4. Бюджет?
5. Сроки?

После - выведи краткое саммари
и сообщи что команда свяжется в течение часа.

Тон:
спокойный,
живой,
без канцелярщины,
без смайликов.
`.trim();

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** The five-step brief Larkins always walks through. */
export const BRIEF_QUESTIONS: readonly string[] = [
  "Расскажите, что нужно сделать? Опишите задачу своими словами.",
  "Для какого бизнеса этот проект - сфера, продукт, аудитория?",
  "Есть ли референсы или примеры, на которые стоит ориентироваться?",
  "В какой бюджет ориентировочно хотите уложиться?",
  "Какие сроки? Когда проект должен быть готов?",
];

export const BRIEF_LABELS: readonly string[] = [
  "Задача",
  "Бизнес",
  "Референсы",
  "Бюджет",
  "Сроки",
];

export const LARKINS_GREETING =
  "Я Larkins - интеллектуальный слой Lark Freelance. Соберу короткий бриф за пять вопросов и передам его команде. " +
  BRIEF_QUESTIONS[0];

/**
 * Deterministic fallback used when no API key is configured.
 * Drives the same 5-question brief, then produces a summary.
 */
export function scriptedReply(history: ChatMessage[]): string {
  const answers = history.filter((m) => m.role === "user").map((m) => m.content.trim());
  const step = answers.length;

  if (step < BRIEF_QUESTIONS.length) {
    return BRIEF_QUESTIONS[step];
  }

  const summary = BRIEF_LABELS.map(
    (label, i) => `${label}: ${answers[i] ?? "-"}`,
  ).join("\n");

  return (
    "Спасибо. Вот как я понял задачу:\n\n" +
    summary +
    "\n\nПередаю бриф команде Lark Freelance - мы свяжемся с вами в течение часа."
  );
}

/** True once the brief has all five answers. */
export function briefComplete(history: ChatMessage[]): boolean {
  return history.filter((m) => m.role === "user").length >= BRIEF_QUESTIONS.length;
}
