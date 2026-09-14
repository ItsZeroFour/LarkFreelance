/**
 * Small, dependency-free helpers shared across the app.
 */

/** Join class names, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Clamp a number between a min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Promise-based delay. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Format an index as a zero-padded ordinal, e.g. 1 -> "01". */
export function pad(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

/**
 * Маска телефона под российский формат: +7 (000) 000-00-00.
 *
 * Берём из ввода только цифры, ведущую 8 или 7 считаем кодом страны и
 * приводим к 7. Дальше раскладываем оставшиеся до 10 цифр по группам,
 * дописывая скобки и дефисы только когда цифра для них уже введена -
 * так каретка не упирается в «пустые» разделители при удалении.
 */
export function formatRuPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (digits.startsWith("7")) digits = digits.slice(1);
  digits = digits.slice(0, 10);

  if (!digits) return "";

  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6, 8);
  const d = digits.slice(8, 10);

  let out = "+7";
  out += ` (${a}`;
  if (digits.length >= 3) out += ")";
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (d) out += `-${d}`;
  return out;
}
