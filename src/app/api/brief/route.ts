import { NextResponse } from "next/server";
import { BRIEF_LABELS } from "@/lib/claude";
import { deliver } from "@/lib/delivery";

/**
 * Доставка брифа, собранного консолью Larkins.
 *
 * Пять ответов клиента плюс контакт уходят команде теми же каналами, что и
 * быстрая заявка (/api/lead) - письмом на почту (Resend) и в Telegram. Если
 * ни один канал не настроен, роут честно отвечает ошибкой - интерфейс тогда
 * показывает прямые контакты, и бриф не теряется молча. Список переменных
 * окружения - в src/lib/delivery.ts.
 */

export const runtime = "nodejs";

/** Простейший предохранитель от перебора: 5 брифов с адреса за 10 минут. */
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

interface BriefBody {
  answers?: string[];
  contact?: string;
  company?: string; // ловушка для ботов
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

  let body: BriefBody;
  try {
    body = (await req.json()) as BriefBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  // Ловушка для ботов: поле скрыто от людей и всегда должно быть пустым.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const answers = Array.isArray(body.answers)
    ? body.answers.map((a) => String(a ?? "").trim().slice(0, 600))
    : [];
  if (answers.filter(Boolean).length < BRIEF_LABELS.length) {
    return NextResponse.json(
      { ok: false, error: "Бриф ещё не собран" },
      { status: 400 },
    );
  }

  const contact = String(body.contact ?? "").trim().slice(0, 120);
  if (!contact) {
    return NextResponse.json(
      { ok: false, error: "Оставьте контакт, чтобы мы могли ответить" },
      { status: 400 },
    );
  }

  const text = [
    "Бриф из консоли Larkins",
    ...BRIEF_LABELS.map((label, i) => `${label}: ${answers[i] || "-"}`),
    `Контакт: ${contact}`,
  ].join("\n");

  const result = await deliver("Новый бриф из консоли Larkins", text);

  if (result.unconfigured) {
    console.error(
      "[brief] Бриф собран, но доставка не настроена: нет RESEND_API_KEY и TELEGRAM_BOT_TOKEN/CHAT_ID.",
      { contact },
    );
    return NextResponse.json(
      { ok: false, error: "Не получилось отправить. Напишите нам напрямую - ответим сразу." },
      { status: 503 },
    );
  }

  if (!result.ok) {
    console.error("[brief] Не удалось доставить бриф ни одним каналом.", result.outcomes);
    return NextResponse.json(
      { ok: false, error: "Не получилось отправить. Напишите нам напрямую - ответим сразу." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
