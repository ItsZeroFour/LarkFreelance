import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Оборачивает содержимое в контейнер сайта. */
  contained?: boolean;
}

/**
 * Вертикальный ритм. Один отступ между разделами, не два: иначе воздух
 * складывается вдвое и ритм рассыпается. Границу раздела обозначает линия
 * маркера, уходящая до правого края контейнера, - градиентный разделитель
 * удалён вместе с пропом `divided`.
 */
export function Section({
  id,
  children,
  className,
  contained = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("section overflow-x-clip", className)}
    >
      {contained ? <div className="shell relative">{children}</div> : children}
    </section>
  );
}
