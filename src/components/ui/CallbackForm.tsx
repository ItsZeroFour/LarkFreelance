"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { contact } from "@/data/contacts";
import {
  LEAD_TOPIC_EVENT,
  takeStoredLeadTopic,
  type LeadTopic,
} from "@/lib/leadTopic";
import { cn, formatRuPhone } from "@/lib/utils";

type State = "idle" | "sending" | "sent" | "error";

interface CallbackFormProps {
  /** Откуда пришла заявка - уходит в уведомление команде. */
  source: string;
  /** compact - строка на первом экране, block - завершающий блок страницы. */
  variant?: "compact" | "block";
  /**
   * Прямые каналы под формой. В контактах рядом стоят те же плитки -
   * показывать их дважды значит повторяться на последнем шаге.
   */
  showChannels?: boolean;
  className?: string;
}

/**
 * Быстрая заявка: номер - и перезвонили. Самый короткий путь к отклику,
 * поэтому он стоит первым, а бриф остаётся альтернативой для тех, кто
 * готов рассказать задачу подробно.
 *
 * Под формой всегда лежат прямые каналы: часть людей не оставляет номер
 * в принципе, и им нужен способ написать самим. Если доставка на сервере
 * не настроена или упала, форма честно об этом говорит и показывает те же
 * каналы - заявка не теряется молча.
 */
export function CallbackForm({
  source,
  variant = "compact",
  showChannels = true,
  className,
}: CallbackFormProps) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState(""); // ловушка для ботов
  const [topic, setTopic] = useState<LeadTopic | null>(null);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  const block = variant === "block";

  /**
   * Тему слушает только развёрнутая форма: кнопки в услугах и кейсах ведут
   * якорем именно к ней, а строка на первом экране остаётся коротким путём
   * «номер - и перезвонили» без лишних состояний.
   *
   * Сначала забираем тему, отложенную перед переходом со страницы кейса,
   * затем слушаем события с этой же страницы.
   */
  useEffect(() => {
    if (!block) return;

    const stored = takeStoredLeadTopic();
    if (stored) setTopic(stored);

    const onTopic = (e: Event) => {
      setTopic((e as CustomEvent<LeadTopic>).detail);
      setState((s) => (s === "sent" ? "idle" : s));
    };
    window.addEventListener(LEAD_TOPIC_EVENT, onTopic);
    return () => window.removeEventListener(LEAD_TOPIC_EVENT, onTopic);
  }, [block]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          name,
          company,
          source,
          topic: topic?.label,
        }),
      });
      const data: { ok: boolean; error?: string } = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Не получилось отправить");
        setState("error");
        return;
      }
      setState("sent");
    } catch {
      setError("Не получилось отправить. Напишите нам напрямую - ответим сразу.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className={cn("lark-alert lark-alert--success", className)}>
        <span className="lark-alert__icon">
          <Icon name="check" scale="sm" />
        </span>
        <div className="lark-alert__body">
          <p className="lark-alert__title">Заявка принята</p>
          <p className="lark-caption">
            Перезвоним {contact.responseTime} в рабочее время ({contact.workHours}).
            {" "}
            {contact.callPromise}. Если удобнее текстом - пишите в Telegram.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      {/* Тема, выбранная в услугах. Видна человеку - он должен понимать,
          что именно уедет команде, - и снимается одним нажатием. */}
      {topic && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="lark-label">Тема</span>
          <span className="lark-badge lark-badge--sm lark-badge--neutral">
            {topic.label}
          </span>
          <button
            type="button"
            onClick={() => setTopic(null)}
            className="lark-caption inline-flex min-h-[32px] items-center text-text-3
                       underline underline-offset-4"
          >
            другая тема
          </button>
        </div>
      )}

      <form
        onSubmit={submit}
        className={cn(
          "flex w-full flex-col gap-3",
          block ? "sm:flex-row sm:items-start" : "xs:flex-row xs:items-start",
        )}
      >
        {block && (
          <label className="w-full sm:w-auto sm:flex-1">
            <span className="sr-only">Как к вам обращаться</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="lark-field"
              placeholder="Как к вам обращаться"
              autoComplete="name"
            />
          </label>
        )}

        <label className={cn("w-full", block ? "sm:flex-1" : "xs:flex-1")}>
          <span className="sr-only">Телефон</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(formatRuPhone(e.target.value))}
            className={cn("lark-field", state === "error" && "lark-field--error")}
            placeholder="+7 (___) ___-__-__"
            maxLength={18}
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? `${source}-error` : undefined}
          />
        </label>

        {/* Скрыто от людей: если заполнено - это бот. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />

        <button
          type="submit"
          disabled={state === "sending"}
          className={cn(
            "lark-btn lark-btn--primary shrink-0",
            block ? "lark-btn--lg" : "",
            state === "sending" && "is-loading",
          )}
        >
          Перезвоните мне
          <Icon name="arrow-right" scale="xs" />
          {state === "sending" && <span className="lark-spinner" aria-hidden="true" />}
        </button>
      </form>

      {state === "error" && (
        <p id={`${source}-error`} className="lark-field-error" role="alert">
          <Icon name="close" scale="xs" />
          {error}
        </p>
      )}

      {/* Прямые каналы - для тех, кто номер не оставляет */}
      {showChannels && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="lark-caption text-text-3">Или напишите:</span>
          <a
            href={contact.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="lark-caption inline-flex items-center gap-1.5 text-text-2"
          >
            <Icon name="telegram" scale="xs" />
            {contact.telegram.handle}
          </a>
          <a
            href={contact.email.href}
            className="lark-caption inline-flex items-center gap-1.5 text-text-2"
          >
            <Icon name="mail" scale="xs" />
            {contact.email.label}
          </a>
        </div>
      )}

      <p className="lark-caption text-text-3">{contact.callPromise}.</p>

      <p className="lark-caption text-text-3">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <Link
          href={contact.privacyPath}
          className="text-text-2 underline underline-offset-4"
        >
          политикой обработки персональных данных
        </Link>
        .
      </p>
    </div>
  );
}
