import type { Metadata } from "next";
import { SleepingOrb } from "@/components/easter/SleepingOrb";

export const metadata: Metadata = {
  title: "404 - спящий слой",
  description: "Страница ускользнула. Но Larkins пока спит - разбудите его.",
  /* 404 не должна попадать в индекс и передавать вес по ссылкам с неё. */
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-bg px-6 py-20 text-center">
      {/* Та же фоновая сетка, что на первом экране. Свечение снято
          вместе с остальным декоративным слоем. */}
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 -z-10
                   [mask-image:linear-gradient(180deg,#000_0%,transparent_80%)]"
      />

      <SleepingOrb />
    </main>
  );
}
