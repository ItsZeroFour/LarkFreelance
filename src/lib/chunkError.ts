/**
 * Сбой загрузки JS-чанка. Бывает, когда соединение с сервером обрывается
 * посреди навигации или вкладка пережила деплой и просит файлы старой
 * сборки. Код тут ни при чём - страницу достаточно загрузить заново.
 */
export function isChunkLoadError(error: Error): boolean {
  return (
    error.name === "ChunkLoadError" ||
    /Loading (CSS )?chunk [\w-]+ failed/i.test(error.message)
  );
}

const RELOAD_KEY = "lark:chunk-reload";

/**
 * Перезагружает страницу один раз за 10 секунд. Если чанк не грузится и
 * после перезагрузки, возвращает false - показываем экран ошибки, а не
 * уходим в бесконечный цикл.
 */
export function reloadOnceForChunkError(): boolean {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
    if (Date.now() - last < 10_000) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // sessionStorage недоступен - перезагрузка всё равно лучше белого экрана.
  }
  window.location.reload();
  return true;
}
