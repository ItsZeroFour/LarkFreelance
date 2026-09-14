import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImageSize } from "@/data/imageSizes";

/**
 * Рамки устройств: снимок получает достоверный корпус - строка браузера
 * для десктопных экранов, шасси телефона для мобильных историй.
 *
 * Персональный цвет кейса и свечение за телефоном удалены: акцент на экране
 * один, а свечений в системе нет как класса. Корпус держат линия и слой.
 */

interface BrowserFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Скрыть строку браузера - для скриншотов, где она уже впечатана в кадр. */
  hideBar?: boolean;
}

/** Desktop capture inside a calm browser window. */
export function BrowserFrame({ src, alt, className, hideBar }: BrowserFrameProps) {
  const { width, height } = getImageSize(src);
  return (
    <div
      className={cn(
        "overflow-hidden rounded-m border border-border-strong bg-elevated shadow-md",
        className,
      )}
    >
      {/* Title bar */}
      {!hideBar && (
        <div className="flex items-center gap-2 border-b border-border bg-elevated px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-pill bg-text-3/60" />
            <span className="h-2.5 w-2.5 rounded-pill bg-text-3/40" />
            <span className="h-2.5 w-2.5 rounded-pill bg-text-3/30" />
          </span>
          <span className="mx-auto hidden h-5 w-1/2 max-w-[260px] items-center rounded-md bg-bg/60 px-2 sm:flex">
            <span className="lark-mono truncate text-[0.62rem] text-text-3">
              lark.work
            </span>
          </span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 820px, 100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

/** Mobile story capture inside a notched phone shell. */
export function PhoneFrame({ src, alt, className }: PhoneFrameProps) {
  const { width, height } = getImageSize(src);
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[260px] rounded-[2.2rem] border border-border-strong",
        "bg-elevated p-2.5 shadow-md",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.7rem] border border-border bg-bg">
        {/* Notch */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-[2] h-4 w-20 -translate-x-1/2 rounded-pill bg-elevated"
        />
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="260px"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
