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
