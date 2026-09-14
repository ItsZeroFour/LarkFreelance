"use client";

import { useEffect } from "react";

const LOGO = `
   ██╗      █████╗ ██████╗ ██╗  ██╗
   ██║     ██╔══██╗██╔══██╗██║ ██╔╝
   ██║     ███████║██████╔╝█████╔╝
   ██║     ██╔══██║██╔══██╗██╔═██╗
   ███████╗██║  ██║██║  ██║██║  ██╗
   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

const TAG = "   AI-native execution unit · Lark Freelance";
const PITCH = [
  "",
  "   Нашли консоль? Возможно, вам стоит работать с нами.",
  "",
  "   → larkcosystem@proton.me",
  "   → https://t.me/larkfreelance",
  "",
].join("\n");

/**
 * Easter egg #28 - prints a stylized brand signature once per session when
 * devtools is opened. Idempotent via a window flag so HMR / route swaps
 * don't re-spam the console.
 */
export function ConsoleSignature() {
  useEffect(() => {
    const w = window as typeof window & { __larkSig?: boolean };
    if (w.__larkSig) return;
    w.__larkSig = true;

    const amber = "color:#e8b224;font-weight:600;text-shadow:0 0 8px rgba(212,160,23,0.35)";
    const tag = "color:#d4a017;font-weight:500;letter-spacing:0.12em;text-transform:uppercase";
    const muted = "color:#908b81;font-style:italic";

    console.log("%c" + LOGO, amber);
    console.log("%c" + TAG, tag);
    console.log("%c" + PITCH, muted);
  }, []);

  return null;
}
