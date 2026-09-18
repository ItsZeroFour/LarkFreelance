"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { isChunkLoadError, reloadOnceForChunkError } from "@/lib/chunkError";

/**
 * Граница ошибок страниц. Без неё любое исключение на клиенте Next
 * заменяет весь сайт белым «Application error».
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    console.error(error);
    if (isChunkLoadError(error)) setReloading(reloadOnceForChunkError());
  }, [error]);

  if (reloading) return null;

  return (
    <main className="grid min-h-[100svh] place-items-center bg-bg px-6 py-20 text-center">
      <div className="flex max-w-md flex-col items-center gap-5">
        <h1 className="t-section">Страница не загрузилась</h1>
        <p className="t-lead">
          Похоже, прервалось соединение. Попробуйте ещё раз.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => window.location.reload()}>Обновить</Button>
          <Button variant="ghost" onClick={reset}>
            Повторить
          </Button>
        </div>
      </div>
    </main>
  );
}
