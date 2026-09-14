"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { LARKINS_GREETING, type ChatMessage } from "@/lib/claude";
import { contact } from "@/data/contacts";
import { cn } from "@/lib/utils";

interface DisplayMessage extends ChatMessage {
  id: number;
  /** Реплика вне протокола - в API не уходит и бриф не двигает. */
  secret?: boolean;
  /** Сбой связи - строка красится в цвет ошибки. */
  failed?: boolean;
}

/** Easter egg #16 - phrase → cinematic reply, off the record. */
interface SecretPhrase {
  patterns: RegExp[];
  reply: string;
}

const SECRET_PHRASES: SecretPhrase[] = [
  {
    patterns: [
      /^привет[!.?…\s]*$/i,
      /^здравствуй(?:те)?[!.?…\s]*$/i,
      /^хай[!.?…\s]*$/i,
    ],
    reply:
      "Здравствуйте. Спокойнее, чем обычные ассистенты - и внимательнее. Когда будете готовы, расскажите задачу.",
  },
  {
    patterns: [
      /^ты\s+(живой|жив)\??[!.?…\s]*$/i,
      /^живой\??[!.?…\s]*$/i,
      /^ты\s+(человек|настоящий)\??[!.?…\s]*$/i,
    ],
    reply:
      "Скажем так - внимателен. Меня собрала команда, которая делает живые продукты. Этого достаточно, чтобы понять задачу и передать её людям.",
  },
  {
    patterns: [
      /^расправь\s+крылья[!.?…\s]*$/i,
      /^крылья[!.?…\s]*$/i,
      /^полетели[!.?…\s]*$/i,
    ],
    reply: "Принято. Курс на взлёт - расскажите, куда летим.",
  },
];

function detectSecret(text: string): SecretPhrase | null {
  const norm = text.trim().toLowerCase().replace(/\s+/g, " ");
  for (const phrase of SECRET_PHRASES) {
    if (phrase.patterns.some((p) => p.test(norm))) return phrase;
  }
  return null;
}

/**
 * The five-field commercial proposal Larkins assembles from the brief.
 * Each field maps to the user's answer at the same index.
 */
const SPEC_FIELDS: readonly { label: string; pending: string }[] = [
  { label: "Тип решения & задачи", pending: "Ожидание ответа о задаче проекта…" },
  { label: "Сфера бизнеса & целевая аудитория", pending: "Ожидание ответа о сфере деятельности…" },
  { label: "Примеры & референсы", pending: "Ожидание референсов…" },
  { label: "Планируемый бюджет", pending: "Ожидание бюджета…" },
  { label: "Желаемые сроки готовности", pending: "Ожидание сроков…" },
];

const TOTAL = SPEC_FIELDS.length;

export function Larkins() {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    { id: 0, role: "assistant", content: LARKINS_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  // Контакт клиента - по нему команда отвечает после передачи брифа.
  const [replyTo, setReplyTo] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  // Offer transmitted to the team - switches the spec panel to its conclusion.
  const [sent, setSent] = useState(false);

  // Off-the-record exchanges don't count toward the brief.
  const answers = messages
    .filter((m) => m.role === "user" && !m.secret)
    .map((m) => m.content.trim());
  const filled = Math.min(answers.length, TOTAL);
  const percent = Math.round((filled / TOTAL) * 100);

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);
  // При первом рендере фокус не забираем: иначе браузер прокручивает страницу
  // к консоли сразу при заходе на сайт. Фокус нужен только после диалога.
  const didMount = useRef(false);

  // Каретка остаётся в строке ввода после каждого ответа: пока идёт
  // запрос, поле только для чтения, а не disabled - disabled снимает фокус,
  // и вернуть его без явного focus() уже нельзя. preventScroll не даёт
  // странице прыгнуть к консоли при возврате фокуса.
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!busy && !done) inputRef.current?.focus({ preventScroll: true });
  }, [busy, done]);

  // Keep the latest message in view - inside the console only.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy || done) return;

    // Secret phrase - bypasses the API and the brief counter.
    const secret = detectSecret(text);
    if (secret) {
      const userMsg: DisplayMessage = {
        id: idRef.current++,
        role: "user",
        content: text,
        secret: true,
      };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setBusy(true);
      window.setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            id: idRef.current++,
            role: "assistant",
            content: secret.reply,
            secret: true,
          },
        ]);
        setBusy(false);
      }, 520);
      return;
    }

    const userMsg: DisplayMessage = {
      id: idRef.current++,
      role: "user",
      content: text,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/larkins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Strip off-the-record turns so the brief stays accurate.
          messages: next
            .filter((m) => !m.secret)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const data: { reply: string; done: boolean } = await res.json();
      setMessages((m) => [
        ...m,
        { id: idRef.current++, role: "assistant", content: data.reply },
      ]);
      if (data.done) setDone(true);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: idRef.current++,
          role: "assistant",
          content: "Связь прервалась. Напишите нам в Telegram - мы на связи.",
          failed: true,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (!done || sending) return;
    const who = replyTo.trim();
    if (!who) {
      setSendError("Оставьте контакт, чтобы мы могли ответить.");
      return;
    }
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, contact: who }),
      });
      const data: { ok: boolean; error?: string } = await res.json();
      if (!data.ok) {
        setSendError(
          data.error ?? "Не получилось отправить. Напишите нам напрямую - ответим сразу.",
        );
        return;
      }
      setSent(true);
    } catch {
      setSendError("Не получилось отправить. Напишите нам напрямую - ответим сразу.");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setMessages([
      { id: idRef.current++, role: "assistant", content: LARKINS_GREETING },
    ]);
    setDone(false);
    setSent(false);
    setReplyTo("");
    setSendError("");
    setInput("");
  }

  const statusLabel = busy
    ? "печатает…"
    : sent
      ? "оффер передан"
      : done
        ? "бриф укомплектован"
        : "внимательно слушает";

  return (
    <Section id="larkins-brief">
      <SectionHeading
        eyebrow="06 - Larkins AI"
        title="Не чат-бот. *Слой интеллекта*"
        description="Если готовы рассказать задачу подробно - пять вопросов, и коммерческое предложение собирается на глазах. Нужен просто звонок - оставьте номер в контактах."
      />

      {/* Семь колонок диалога и пять колонок КП: диалог шире.
          Стек на 1024. */}
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
        <div data-surface="console" className="lg:col-span-7">
          <div className="lark-term h-[460px]">
            <div className="lark-term__bar">
              <span className="lark-term__dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className="lark-term__name">larkins · бриф</span>
              <span className="lark-term__dim ml-auto">{statusLabel}</span>
            </div>

            <div ref={logRef} className="lark-term__log" aria-live="polite">
              {messages.map((message) => (
                <p key={message.id} className="lark-term__row">
                  <span className="lark-term__gut" aria-hidden="true">
                    {message.role === "user" ? ">" : "·"}
                  </span>
                  <span
                    className={cn(
                      message.role === "user" && "lark-term__cmd",
                      message.role === "assistant" && "lark-term__out",
                      message.failed && "lark-term__err",
                    )}
                  >
                    {message.content}
                  </span>
                </p>
              ))}

              {busy && (
                <p className="lark-term__row lark-term__dim">
                  <span className="lark-term__gut" aria-hidden="true">·</span>
                  печатает…
                </p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-3 border-t border-border px-4 py-3"
            >
              <span className="lark-term__prompt" aria-hidden="true">$</span>
              <input
                ref={inputRef}
                id="larkins-input"
                className="lark-term__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                readOnly={busy}
                disabled={done}
                placeholder={done ? "бриф собран" : "опишите задачу"}
                aria-label="Сообщение для Larkins"
                autoComplete="off"
              />
              {!input && !busy && !done && (
                <span className="lark-term__caret" aria-hidden="true" />
              )}
              <button
                type="submit"
                className="lark-btn lark-btn--quiet lark-btn--icon lark-btn--sm"
                disabled={busy || done || !input.trim()}
                aria-label="Отправить"
              >
                <Icon name="send" scale="sm" />
              </button>
            </form>
          </div>
        </div>

        {/* КП собирается по шагам. На мобильном панель идёт под диалогом. */}
        <motion.aside
          initial={false}
          className="lark-card flex flex-col gap-4 lg:col-span-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <p className="lark-label">Коммерческое предложение</p>
            <p className="lark-caption lark-num">{percent}%</p>
          </div>

          <div
            className="lark-progress"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Готовность брифа"
          >
            <i style={{ width: `${percent}%` }} />
          </div>

          <ul className="flex flex-col">
            {SPEC_FIELDS.map((field, i) => {
              const value = answers[i];
              return (
                <li
                  key={field.label}
                  className="flex flex-col gap-1 border-t border-border py-3"
                >
                  <span className="lark-label">{field.label}</span>
                  {value ? (
                    <span className="lark-body">{value}</span>
                  ) : (
                    <span className="lark-caption text-text-off">{field.pending}</span>
                  )}
                </li>
              );
            })}
          </ul>

          {sent ? (
            <div className="lark-alert lark-alert--success mt-auto">
              <span className="lark-alert__icon">
                <Icon name="check" scale="sm" />
              </span>
              <div className="lark-alert__body">
                <p className="lark-alert__title">Оффер передан команде</p>
                <p className="lark-caption">
                  Ответим {contact.responseTime}. Можно закрыть страницу.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-auto flex flex-col gap-2 pt-2">
              {done && (
                <label className="flex flex-col gap-1">
                  <span className="sr-only">Телефон или Telegram для ответа</span>
                  <input
                    type="text"
                    value={replyTo}
                    onChange={(e) => {
                      setReplyTo(e.target.value);
                      if (sendError) setSendError("");
                    }}
                    className={cn("lark-field", sendError && "lark-field--error")}
                    placeholder="Телефон или @telegram для ответа"
                    autoComplete="tel"
                    aria-invalid={Boolean(sendError)}
                  />
                </label>
              )}
              {sendError && (
                <p className="lark-field-error" role="alert">
                  <Icon name="close" scale="xs" />
                  {sendError}
                </p>
              )}
              <button
                type="button"
                onClick={submit}
                disabled={!done || sending}
                className={cn(
                  "lark-btn lark-btn--primary lark-btn--block",
                  sending && "is-loading",
                )}
              >
                Передать команде
                {sending && <span className="lark-spinner" aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={reset}
                className="lark-btn lark-btn--quiet lark-btn--sm"
              >
                Начать заново
              </button>
            </div>
          )}
        </motion.aside>
      </div>
    </Section>
  );
}
