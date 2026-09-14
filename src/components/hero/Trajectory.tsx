"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Траектория полёта - второй графический мотив системы: дуга с точками-узлами.
 *
 * Два состояния замыкают страницу. На первом экране - `arc`: симметричный
 * размах под текстом, центрированная композиция не терпит направленного
 * движения. В финальном блоке - `landing`: та же линия приходит слева,
 * выполаживается и садится в квадратный узел. Открывается размахом,
 * закрывается посадкой - метафора самого бренда, а не украшение.
 *
 * Подсветка: полоса лежит приглушённой с первого кадра, и по ней один раз
 * проходит волна - узлы загораются по очереди с системным стаггером. Каждый
 * узел вспыхивает и садится обратно в покой, поэтому если анимация не
 * проиграется, полоса всё равно на месте.
 *
 * Движет CSS: @keyframes плюс animation-delay на каждом узле. SMIL не
 * используем - он не запускается в части окружений и оставляет узлы в
 * стартовом состоянии, то есть невидимыми.
 *
 * Цвет - accent-ink, а не бренд-жёлтый: тонкая жёлтая линия на светлом
 * фоне даёт 1,44:1 и правилами системы запрещена.
 */

type Variant = "arc" | "landing";

const PATHS: Record<Variant, string> = {
  arc: "M0 150C320 20 880 20 1200 150",
  landing: "M0 24C420 28 820 140 1200 152",
};

// Узлы на равных долях длины дуги - посчитаны из тех же кривых и уходят
// в разметку числами. В рантайме никакой математики.
const NODES: Record<Variant, { wide: [number, number][]; narrow: [number, number][] }> = {
  arc: {
    wide: [
      [0, 150], [46.1, 132.7], [92.4, 117.9], [139.8, 104.9], [187.5, 93.7],
      [235.5, 84.1], [283.7, 75.9], [332.3, 69.1], [380.5, 63.5], [429.5, 59.1],
      [478.3, 55.8], [526.8, 53.7], [575.6, 52.6], [625.1, 52.6], [673.8, 53.7],
      [722.4, 55.9], [771.2, 59.1], [820.1, 63.6], [868.4, 69.1], [917, 76],
      [965.1, 84.2], [1013.1, 93.8], [1060.7, 105], [1108.1, 118.1],
      [1154.4, 132.9], [1200, 150],
    ],
    narrow: [
      [0, 150], [82.8, 120.8], [167.2, 98.2], [252.4, 81], [339.2, 68.2],
      [425.6, 59.4], [513, 54.2], [600, 52.5], [687.6, 54.2], [775.1, 59.5],
      [861.4, 68.3], [948.2, 81.1], [1033.4, 98.4], [1117.8, 121], [1200, 150],
    ],
  },
  landing: {
    wide: [
      [0, 24], [57.8, 25.2], [115.4, 27.7], [172.7, 31.3], [229.8, 35.9],
      [287.2, 41.4], [344.4, 47.8], [401.3, 54.7], [458.6, 62.3], [515.6, 70.3],
      [572.3, 78.6], [629.4, 87.2], [686.2, 95.7], [742.7, 104.1], [800.1, 112.5],
      [856.7, 120.4], [913.6, 127.8], [970.8, 134.6], [1028.2, 140.6],
      [1085.4, 145.6], [1142.8, 149.5], [1200, 152],
    ],
    narrow: [
      [0, 24], [109.8, 27.4], [219.3, 35], [329.1, 46], [437.9, 59.5],
      [546.4, 74.8], [655.1, 91], [763.5, 107.2], [872.6, 122.5], [981.2, 135.8],
      [1090.6, 146], [1200, 152],
    ],
  },
};

const SESSION_KEY = "lark-wave";

function Nodes({
  points,
  step,
  landing,
}: {
  points: [number, number][];
  step: number;
  landing: boolean;
}) {
  const last = points.length - 1;
  return (
    <>
      {points.map(([x, y], i) => {
        const delay = { animationDelay: `${300 + i * step}ms` };
        // Точка посадки - квадратный узел: направленная линия должна
        // где-то заканчиваться, и это «где-то» читается как приземление.
        if (landing && i === last) {
          return (
            <rect
              key={i}
              className="lark-node"
              x={x - 3.5}
              y={y - 3.5}
              width={7}
              height={7}
              rx={1}
              style={delay}
            />
          );
        }
        return (
          <circle key={i} className="lark-node" cx={x} cy={y} r={2.5} style={delay} />
        );
      })}
    </>
  );
}

interface TrajectoryProps {
  variant?: Variant;
  /** load - сразу при загрузке, inView - когда блок доехал до экрана. */
  trigger?: "load" | "inView";
  className?: string;
}

export function Trajectory({
  variant = "arc",
  trigger = "load",
  className,
}: TrajectoryProps) {
  const [wave, setWave] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Один проход за сессию на каждую траекторию: повторная анимация
    // на каждом переходе раздражает быстрее, чем радует.
    const key = `${SESSION_KEY}-${variant}`;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      /* хранилище недоступно - просто проигрываем */
    }

    const play = () => {
      try {
        sessionStorage.setItem(key, "1");
      } catch {
        /* не критично */
      }
      setWave(true);
    };

    if (trigger === "load") {
      play();
      return;
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { rootMargin: "-15% 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, trigger]);

  const nodes = NODES[variant];
  const landing = variant === "landing";

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 1200 176"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={`${wave ? "hero-wave " : ""}${className ?? ""}`}
    >
      <path
        d={PATHS[variant]}
        stroke="var(--lark-accent-ink)"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 10"
      />
      <g fill="var(--lark-accent-ink)">
        <g className="hidden sm:block">
          <Nodes points={nodes.wide} step={landing ? 45 : 40} landing={landing} />
        </g>
        <g className="sm:hidden">
          <Nodes points={nodes.narrow} step={landing ? 55 : 50} landing={landing} />
        </g>
      </g>
    </svg>
  );
}
