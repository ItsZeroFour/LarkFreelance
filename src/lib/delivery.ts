/**
 * Доставка заявок с сайта команде.
 *
 * Два независимых канала: письмо на почту (через Resend) и сообщение в
 * Telegram-бота. Заявка считается принятой, если сработал хотя бы один
 * настроенный канал — так одиночный сбой (упал Resend или Telegram) не
 * теряет лида. Если не настроен ни один канал, доставка честно проваливается,
 * и интерфейс показывает прямые контакты.
 *
 * Переменные окружения:
 *   RESEND_API_KEY   — ключ API Resend (resend.com). Без него письмо не шлётся.
 *   LEAD_EMAIL_TO    — куда падают заявки (по умолчанию larkcosystem@proton.me)
 *   RESEND_FROM      — адрес отправителя (по умолчанию onboarding@resend.dev —
 *                      служебный домен Resend, работает без верификации домена;
 *                      после подтверждения своего домена замените на свой)
 *   TELEGRAM_BOT_TOKEN — токен бота из @BotFather
 *   TELEGRAM_CHAT_ID   — id чата или канала, куда падают заявки
 */

const DEFAULT_TO = "larkcosystem@proton.me";
const DEFAULT_FROM = "Lark Freelance <onboarding@resend.dev>";

type ChannelOutcome = "sent" | "skipped" | "failed";

/** Письмо на почту через Resend. */
async function sendEmail(subject: string, text: string): Promise<ChannelOutcome> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "skipped";

  const to = process.env.LEAD_EMAIL_TO || DEFAULT_TO;
  const from = process.env.RESEND_FROM || DEFAULT_FROM;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend ответил ${res.status} ${detail}`);
    }
    return "sent";
  } catch (error) {
    console.error("[delivery] Не удалось отправить письмо:", error);
    return "failed";
  }
}

/** Сообщение в Telegram-бота. */
async function sendTelegram(text: string): Promise<ChannelOutcome> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return "skipped";

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_notification: false }),
    });
    if (!res.ok) throw new Error(`Telegram ответил ${res.status}`);
    return "sent";
  } catch (error) {
    console.error("[delivery] Не удалось доставить в Telegram:", error);
    return "failed";
  }
}

export interface DeliveryResult {
  /** Хотя бы один настроенный канал доставил заявку. */
  ok: boolean;
  /** Ни один канал не настроен — команде нужно добавить переменные окружения. */
  unconfigured: boolean;
  outcomes: { email: ChannelOutcome; telegram: ChannelOutcome };
}

/**
 * Шлёт заявку во все каналы разом и сводит результат.
 * `subject` идёт в тему письма, `text` — в тело письма и в сообщение Telegram.
 */
export async function deliver(subject: string, text: string): Promise<DeliveryResult> {
  const [email, telegram] = await Promise.all([
    sendEmail(subject, text),
    sendTelegram(text),
  ]);

  const outcomes = { email, telegram };
  const unconfigured = email === "skipped" && telegram === "skipped";
  const ok = email === "sent" || telegram === "sent";

  return { ok, unconfigured, outcomes };
}
