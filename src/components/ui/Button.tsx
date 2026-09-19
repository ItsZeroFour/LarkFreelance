"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Подпись становится прозрачной, спиннер встаёт по центру, ширина не меняется. */
  loading?: boolean;
  "aria-label"?: string;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
  /** Ссылка ведёт по якорю, но по дороге может что-то сообщить - например тему обращения. */
  onClick?: () => void;
  "aria-label"?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary: "lark-btn--primary",
  secondary: "lark-btn--secondary",
  ghost: "lark-btn--ghost",
  quiet: "lark-btn--quiet",
};

/** Высота фиксированная - тап-таргет гарантирует она, а не паддинги. */
const sizes: Record<Size, string> = {
  sm: "lark-btn--sm",
  md: "",
  lg: "lark-btn--lg",
};

/**
 * Действие. Рендерится ссылкой или кнопкой.
 * Один primary на экран - это и есть жёлтый призыв страницы.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    fullWidth,
  } = props;

  const loading = "href" in props ? false : props.loading === true;

  const classes = cn(
    "lark-btn",
    variants[variant],
    sizes[size],
    fullWidth && "lark-btn--block",
    loading && "is-loading",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.onClick}
          aria-label={props["aria-label"]}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled || loading}
      aria-busy={loading || undefined}
      aria-label={props["aria-label"]}
      className={classes}
    >
      {children}
      {loading && <span className="lark-spinner" aria-hidden="true" />}
    </button>
  );
}
