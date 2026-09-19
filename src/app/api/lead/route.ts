import { NextResponse } from "next/server";
import { deliver } from "@/lib/delivery";

/**
 * Приём быстрой заявки: имя необязательно, телефон обязателен.
 *
 * Доставка - письмом на почту (Resend) и в Telegram агентства. Если ни один
 * канал не настроен, роут честно отвечает ошибкой: форма, которая делает вид,
 * что отправила, и молча теряет лида, хуже отсутствующей формы. Интерфейс в
 * этом случае показывает прямые контакты. Список переменных окружения - в
 * src/lib/delivery.ts.
 */

export const runtime = "nodejs";

/** Простейший предохранитель от перебора: 5 заявок с адреса за 10 минут. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

/** Оставляем цифры и ведущий плюс. 10–15 цифр - коридор для РФ и соседей. */
function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
  const count = digits.replace(/\D/g, "").length;
  if (count < 10 || count > 15) return null;
  return digits;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок подряд. Напишите нам напрямую." },
      { status: 429 },
    );
  }

  let body: {
    phone?: string;
    name?: string;
    source?: string;
    company?: string;
    topic?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  // Ловушка для ботов: поле скрыто от людей и всегда должно быть пустым.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const phone = normalisePhone(String(body.phone ?? ""));
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "Проверьте номер - похоже, в нём не хватает цифр" },
      { status: 400 },
    );
  }

  const name = String(body.name ?? "").trim().slice(0, 80);
  const source = String(body.source ?? "site").trim().slice(0, 40);
  // Направление, выбранное в карточке услуги. Необязательное: короткая
  // форма на первом экране его не передаёт.
  const topic = String(body.topic ?? "").trim().slice(0, 60);

  const text = [
    "Заявка с сайта",
    `Телефон: ${phone}`,
    name ? `Имя: ${name}` : null,
    topic ? `Тема: ${topic}` : null,
    `Откуда: ${source}`,
  ]
    .filter(Boolean)
    .join("\n");

  const result = await deliver("Новая заявка с сайта Lark Freelance", text);

  if (result.unconfigured) {
    console.error(
      "[lead] Заявка получена, но доставка не настроена: нет RESEND_API_KEY и TELEGRAM_BOT_TOKEN/CHAT_ID.",
      { phone, name, topic, source },
    );
    return NextResponse.json(
      { ok: false, error: "Не получилось отправить. Напишите нам напрямую - ответим сразу." },
      { status: 503 },
    );
  }

  if (!result.ok) {
    console.error("[lead] Не удалось доставить заявку ни одним каналом.", result.outcomes);
    return NextResponse.json(
      { ok: false, error: "Не получилось отправить. Напишите нам напрямую - ответим сразу." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
