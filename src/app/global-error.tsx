"use client";

import { useEffect } from "react";
import { isChunkLoadError, reloadOnceForChunkError } from "@/lib/chunkError";

/**
 * Последний рубеж - ошибка в самом корневом layout. Стили сайта здесь
 * недоступны, поэтому разметка минимальная и инлайновая.
 */
export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
    if (isChunkLoadError(error)) reloadOnceForChunkError();
  }, [error]);

  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div>
          <p>Страница не загрузилась.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Обновить
          </button>
        </div>
      </body>
    </html>
  );
}
