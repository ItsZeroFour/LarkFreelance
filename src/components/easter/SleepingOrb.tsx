"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

const COPY = {
  asleep: "Он не нашёл эту страницу. Но мы найдём решение.",
  waking: "Просыпается…",
  awake: "Дома. Возвращаю на главную.",
};

/** Easter egg #38 - sleeping orb on the 404. Three pokes wake it and
 *  redirect home with a cinematic fade. */
export function SleepingOrb() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [pokes, setPokes] = useState(0);
  const [waking, setWaking] = useState(false);
  const awake = pokes >= 3;
  const stage = awake ? "awake" : waking ? "waking" : "asleep";

  useEffect(() => {
    if (!awake) return;
    const t = window.setTimeout(() => router.push("/"), 1500);
    return () => window.clearTimeout(t);
  }, [awake, router]);

  const poke = () => {
    if (awake) return;
    setPokes((p) => p + 1);
    setWaking(true);
    window.setTimeout(() => setWaking(false), 380);
  };

  return (
    <div className="flex flex-col items-center gap-9">
      <span className="lark-label text-text-3">404 · страница не найдена</span>

      <button
        type="button"
        onClick={poke}
        aria-label={awake ? "Larkins проснулся" : "Разбудить Larkins"}
        className="group relative grid h-[260px] w-[260px] place-items-center
                   rounded-pill outline-none focus-visible:ring-2
                   focus-visible:ring-accent/40 cursor-pointer
                   disabled:cursor-default"
        disabled={awake}
      >
        {/* Outer breathing glow */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-pill"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--lark-color-yellow) 16%, transparent) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={
            reduce
              ? undefined
              : awake
                ? { scale: [1, 1.5], opacity: [0.6, 1] }
                : { scale: [1, 1.06, 1], opacity: [0.45, 0.75, 0.45] }
          }
          transition={{
            duration: awake ? 1.2 : 5.5,
            repeat: awake ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        {/* The orb body */}
        <motion.span
          aria-hidden="true"
          className="relative grid h-[150px] w-[150px] place-items-center rounded-pill"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--lark-color-yellow) 75%, transparent), color-mix(in srgb, var(--lark-color-yellow) 12%, var(--lark-surface-elevated)) 70%, var(--lark-bg))",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -22px 30px rgba(0,0,0,0.55), 0 0 35px rgba(212,160,23,0.25)",
          }}
          animate={
            reduce
              ? undefined
              : awake
                ? { scale: [1, 1.12, 1] }
                : { scale: [1, 1.025, 1] }
          }
          transition={{
            duration: awake ? 0.9 : 4.5,
            repeat: awake ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Eye - closed when asleep, opens on wake */}
          <Eye stage={stage} reduce={!!reduce} />
        </motion.span>

        {/* Sleep "Z" particles */}
        {!awake && !reduce && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute font-mono text-xs text-text-3"
                style={{ left: "70%", top: "20%" }}
                animate={{
                  x: [0, 18, 30],
                  y: [0, -20, -42],
                  opacity: [0, 0.55, 0],
                  scale: [0.7, 1, 1.2],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  delay: i * 1.1,
                  ease: "easeOut",
                }}
              >
                z
              </motion.span>
            ))}
          </>
        )}

        {/* Wake-up burst */}
        <AnimatePresence>
          {awake && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-pill border border-[color:var(--lark-accent-ink)]/70"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 2.2, opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </AnimatePresence>
      </button>

      {/* Poke counter */}
      <div className="flex h-2 items-center gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-6 rounded-pill transition-colors duration-300"
            style={{
              background:
                i < pokes ? "var(--lark-color-yellow)" : "var(--lark-surface-elevated)",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="t-lead max-w-md text-balance text-text-2"
        >
          {COPY[stage]}
        </motion.p>
      </AnimatePresence>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-text-3
                   transition-colors hover:text-text cursor-pointer"
      >
        <Icon name="arrow-right" scale="xs" className="rotate-180" />
        Или сразу на главную
      </Link>
    </div>
  );
}

function Eye({ stage, reduce }: { stage: "asleep" | "waking" | "awake"; reduce: boolean }) {
  const closed = stage === "asleep" || stage === "waking";
  return (
    <svg width="56" height="32" viewBox="0 0 56 32" aria-hidden="true">
      <defs>
        <radialGradient id="orb-iris" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde58a" />
          <stop offset="65%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#5a3a04" />
        </radialGradient>
      </defs>
      {/* Closed-eye line */}
      <motion.path
        d="M 6 16 Q 28 22, 50 16"
        stroke="rgba(20,16,8,0.85)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        animate={{ opacity: closed ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
      {/* Open eye */}
      <motion.g
        animate={{ opacity: closed ? 0 : 1, scale: closed ? 0.3 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "28px 16px" }}
      >
        <ellipse cx="28" cy="16" rx="14" ry="9" fill="rgba(20,16,8,0.55)" />
        <circle cx="28" cy="16" r="6.5" fill="url(#orb-iris)" />
        <motion.circle
          cx="28"
          cy="16"
          r="2.4"
          fill="#0a0a0b"
          animate={
            reduce
              ? undefined
              : { x: [-1, 1, -1], y: [0.5, -0.5, 0.5] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="30" cy="14.5" r="1" fill="rgba(255,255,255,0.85)" />
      </motion.g>
    </svg>
  );
}
