"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Ленивая загрузка движка анимаций.
 *
 * Компоненты `m.*` сами по себе не тянут реализацию: набор возможностей
 * подключается здесь один раз. `domAnimation` закрывает всё, чем пользуется
 * сайт - варианты, whileInView, hover/tap и выход через AnimatePresence, -
 * и не тащит drag и layout-анимации, которых в проекте нет.
 *
 * `strict` запрещает обычные `motion.*`: если такой компонент вернётся в код,
 * приложение упадёт сразу и явно, а не отдаст молча удвоенный бандл.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
