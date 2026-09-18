"use client";

import clsx from "clsx";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/* ===============================================================
   TEXTURAS Y CAPAS DE FONDO
=============================================================== */

export function Halftone({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  return (
    <div
      aria-hidden
      className={clsx(
        "pointer-events-none absolute inset-0",
        size === "lg" ? "halftone-lg" : "halftone",
        className
      )}
    />
  );
}

export function Rays({ className, spin = 120 }: { className?: string; spin?: number }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className={clsx(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className
      )}
    >
      <motion.div
        className="rays h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: spin, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function SpeedLines({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0, 0.6, 0.22] }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1.6, ease: "easeOut" }}
      className={clsx("speedlines pointer-events-none absolute inset-0", className)}
    />
  );
}

/* Estrellas deterministas: mismas posiciones en servidor y cliente
   (nada de Math.random, si no React se queja de hidratación). */
const STARS = Array.from({ length: 70 }, (_, i) => {
  const a = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
  const b = Math.abs(Math.sin((i + 1) * 78.233) * 12345.6789) % 1;
  const c = Math.abs(Math.sin((i + 1) * 3.71) * 9876.5432) % 1;
  return {
    left: `${(a * 100).toFixed(3)}%`,
    top: `${(b * 100).toFixed(3)}%`,
    size: Number((0.9 + c * 1.9).toFixed(2)),
    delay: Number((c * 4).toFixed(2)),
    dur: Number((2.6 + a * 3).toFixed(2)),
  };
});

export function StarField({ className, count = 70 }: { className?: string; count?: number }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {STARS.slice(0, count).map((s, i) => (
        <motion.span
          key={i}
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          className="absolute rounded-full bg-white"
          animate={reduce ? undefined : { opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ===============================================================
   PIEZAS DE CÓMIC
=============================================================== */

export function Panel({
  children,
  variant = "ink",
  className,
}: {
  children: ReactNode;
  variant?: "ink" | "paper";
  className?: string;
}) {
  const paper = variant === "paper";
  return (
    <div
      className={clsx(
        "relative w-full border-2 px-5 py-8 sm:px-9 sm:py-10",
        paper
          ? "border-ink bg-[#fffdf6]/95 text-ink shadow-[7px_7px_0_0_var(--accent)]"
          : "border-white/20 bg-white/[0.035] text-zinc-200 shadow-[0_0_80px_-24px_var(--accent),6px_6px_0_0_rgba(255,255,255,0.05)] backdrop-blur-[2px]",
        className
      )}
    >
      <Halftone className={paper ? "text-ink opacity-[0.07]" : "text-white opacity-[0.05]"} />
      {/* esquinas marcadas de la viñeta */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[3px] -top-[3px] h-5 w-5 border-l-[3px] border-t-[3px]"
        style={{ borderColor: "var(--accent)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[3px] -right-[3px] h-5 w-5 border-b-[3px] border-r-[3px]"
        style={{ borderColor: "var(--accent)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function ChapterTag({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <span
        className="font-comic px-2.5 py-1 text-xs tracking-[0.25em] text-ink sm:text-sm"
        style={{ background: "var(--accent)" }}
      >
        CAP. {number}
      </span>
      <span className="font-comic text-xs uppercase tracking-[0.35em] text-white/55 sm:text-sm">
        {title}
      </span>
    </div>
  );
}

export function Sfx({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, scale: 0.35, rotate: -26 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -9 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 240, damping: 13, delay: 0.35 }}
      className={clsx(
        "comic-title pointer-events-none select-none text-3xl sm:text-5xl md:text-6xl [--stroke:#0a0a0f]",
        className
      )}
      style={{ color: "var(--accent)" }}
    >
      {children}
    </motion.span>
  );
}

export function StarBadge({
  label,
  sub,
  className,
}: {
  label: string;
  sub?: string;
  className?: string;
}) {
  const points = Array.from({ length: 28 }, (_, i) => {
    const r = i % 2 === 0 ? 49 : 36;
    const a = (Math.PI * 2 * i) / 28 - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");

  return (
    <div className={clsx("relative h-24 w-24 sm:h-28 sm:w-28", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[3px_4px_0_rgba(16,15,13,0.85)]">
        <polygon points={points} fill="var(--accent)" stroke="#100f0d" strokeWidth="2.5" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center font-comic leading-none text-ink">
        <span className="text-2xl sm:text-3xl">{label}</span>
        {sub ? (
          <span className="mt-0.5 text-[9px] uppercase tracking-[0.22em] sm:text-[11px]">{sub}</span>
        ) : null}
      </div>
    </div>
  );
}

/* ===============================================================
   EFECTO VELOCISTA (diseño propio)
   Estelas con eco, arcos eléctricos y un emblema de rombo + rayo
   dibujado desde cero.
=============================================================== */

const BOLTS = [
  "M120 20 L96 92 L132 86 L104 168",
  "M470 40 L500 104 L466 106 L494 178",
  "M300 8 L272 70 L306 66 L286 128",
];

export function SpeedsterFx() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(251,191,36,0.12),transparent_62%)]"
      />

      {/* emblema propio: rombo con rayo */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute h-[38vmin] w-[38vmin] max-h-[320px] max-w-[320px] opacity-[0.18]"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M60 4 L114 60 L60 116 L6 60 Z" fill="none" stroke="#fbbf24" strokeWidth="3" />
        <path d="M60 10 L108 60 L60 110 L12 60 Z" fill="none" stroke="#f87171" strokeWidth="1" />
        <path d="M68 26 L38 64 L57 64 L49 96 L84 56 L63 56 Z" fill="#fbbf24" />
      </motion.svg>

      {/* estelas con eco */}
      {[0, 0.11, 0.22].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: "-120%" }}
          whileInView={{ opacity: [0, 1, 0], x: "120%" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.35 + delay, ease: "easeOut" }}
          className="absolute left-0 h-[2px] w-full"
          style={{
            top: `${45 + i * 4}%`,
            background: i === 0 ? "#fde68a" : "#f87171",
            boxShadow:
              i === 0
                ? "0 0 55px 12px rgba(253,230,138,0.5)"
                : "0 0 40px 8px rgba(248,113,113,0.3)",
          }}
        />
      ))}

      {/* arcos eléctricos */}
      <svg
        viewBox="0 0 600 200"
        className="absolute h-[70vmin] w-[92vmin] opacity-70"
        fill="none"
      >
        {BOLTS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={i === 1 ? "#f87171" : "#fde68a"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 1.2,
              delay: 0.6 + i * 0.28,
              repeat: Infinity,
              repeatDelay: 2.4,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>

      <SpeedLines className="text-amber-200/25" />
    </>
  );
}

/* ===============================================================
   EFECTO LINTERNA (diseño propio)
   Farol hexagonal con núcleo de luz, anillo que se dibuja y
   partículas subiendo. Todo dibujado desde cero.
=============================================================== */

const MOTES = Array.from({ length: 16 }, (_, i) => {
  const a = Math.abs(Math.sin((i + 1) * 9.13) * 3571.11) % 1;
  const b = Math.abs(Math.sin((i + 1) * 5.77) * 1597.31) % 1;
  return {
    left: `${(24 + a * 52).toFixed(2)}%`,
    size: Number((2 + b * 3).toFixed(2)),
    delay: Number((a * 6).toFixed(2)),
    dur: Number((6 + b * 5).toFixed(2)),
    drift: Math.round((a - 0.5) * 60),
  };
});

export function LanternFx() {
  const reduce = useReducedMotion();
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(34,197,94,0.22),transparent_62%)]"
      />
      <StarField count={55} className="opacity-70" />
      <Rays className="h-[130vmin] w-[130vmin] text-emerald-300/10" spin={200} />

      {/* anillos */}
      <svg viewBox="0 0 200 200" className="absolute h-[76vmin] w-[76vmin]" fill="none">
        <motion.circle
          cx="100"
          cy="100"
          r="78"
          stroke="#4ade80"
          strokeWidth="1"
          strokeDasharray="3 7"
          opacity="0.5"
          style={{ transformOrigin: "100px 100px" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="62"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>

      {/* el farol */}
      <motion.svg
        viewBox="0 0 120 180"
        className="absolute h-[44vmin] max-h-[330px]"
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id="lanternCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0fff5" />
            <stop offset="42%" stopColor="#4ade80" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#14532d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* resplandor */}
        <motion.ellipse
          cx="60"
          cy="96"
          rx="52"
          ry="58"
          fill="url(#lanternCore)"
          animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <g stroke="#08361f" strokeWidth="3" strokeLinejoin="round">
          {/* asa */}
          <path d="M38 32 a22 20 0 0 1 44 0" fill="none" />
          {/* tapa */}
          <polygon points="60,34 94,52 94,60 26,60 26,52" fill="#1f7a4d" />
          {/* cuerpo */}
          <path d="M31 60 L89 60 L84 134 L36 134 Z" fill="#0f5132" fillOpacity="0.85" />
          {/* base */}
          <polygon points="26,134 94,134 99,152 21,152" fill="#1f7a4d" />
        </g>

        {/* núcleo de luz */}
        <motion.path
          d="M60 72 C76 92 71 112 60 122 C49 112 44 92 60 72 Z"
          fill="#dcfce7"
          animate={reduce ? undefined : { opacity: [0.75, 1, 0.75], scale: [1, 1.05, 1] }}
          style={{ transformOrigin: "60px 97px" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* barrotes del farol */}
        <path d="M46 60 L44 134 M74 60 L76 134" stroke="#08361f" strokeWidth="2.5" />
      </motion.svg>

      {/* partículas de luz subiendo */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {MOTES.map((m, i) => (
            <motion.span
              key={i}
              style={{ left: m.left, width: m.size, height: m.size }}
              className="absolute bottom-1/4 rounded-full bg-emerald-200 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -320, x: m.drift, opacity: [0, 0.9, 0] }}
              transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ===============================================================
   NAVEGACIÓN / PROGRESO
=============================================================== */

export function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-white/10">
      <motion.div
        style={{ scaleX: progress }}
        className="h-full origin-left bg-gradient-to-r from-amber-300 via-rose-500 to-emerald-400"
      />
    </div>
  );
}

function Dot({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const start = index / count;
  const end = (index + 1) / count;
  const mid = (start + end) / 2;
  const scale = useTransform(progress, [start - 0.04, mid, end + 0.04], [1, 2.1, 1]);
  const opacity = useTransform(progress, [start - 0.06, mid, end + 0.06], [0.25, 1, 0.25]);
  return (
    <motion.span style={{ scale, opacity }} className="block h-1.5 w-1.5 rounded-full bg-white" />
  );
}

export function ChapterDots({
  progress,
  count = 7,
}: {
  progress: MotionValue<number>;
  count?: number;
}) {
  return (
    <div
      aria-hidden
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex"
    >
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} index={i} count={count} progress={progress} />
      ))}
    </div>
  );
}

/* ===============================================================
   CAPÍTULO (sección completa)
=============================================================== */

export function Chapter({
  number,
  title,
  sfx,
  accent,
  effect,
  children,
  after,
}: {
  number: string;
  title: string;
  sfx?: string;
  accent: string;
  effect?: ReactNode;
  children: ReactNode;
  after?: ReactNode;
}) {
  return (
    <section
      style={{ "--accent": accent } as CSSProperties}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
    >
      {effect ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          {effect}
        </div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-start"
      >
        <ChapterTag number={number} title={title} />

        <div className="relative w-full">
          {sfx ? (
            <Sfx className="absolute -top-8 right-1 z-20 sm:-right-6 sm:-top-12">{sfx}</Sfx>
          ) : null}
          <Panel>{children}</Panel>
        </div>

        {after}
      </motion.div>
    </section>
  );
}