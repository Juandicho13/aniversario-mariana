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

export function ChapterTag({
  number,
  title,
  variant = "ink",
}: {
  number: string;
  title: string;
  variant?: "ink" | "paper";
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <span
        className="font-comic px-2.5 py-1 text-xs tracking-[0.25em] text-ink sm:text-sm"
        style={{ background: "var(--accent)" }}
      >
        CAP. {number}
      </span>
      <span
        className={clsx(
          "font-comic text-xs uppercase tracking-[0.35em] sm:text-sm",
          variant === "paper" ? "text-ink/70" : "text-white/55"
        )}
      >
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
    <div className={clsx("relative h-24 w-24 sm:h-32 sm:w-32", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[3px_4px_0_rgba(16,15,13,0.85)]">
        <polygon points={points} fill="var(--accent)" stroke="#100f0d" strokeWidth="2.5" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center font-comic leading-none text-paper">
        <span className="text-2xl sm:text-4xl">{label}</span>
        {sub ? (
          <span className="mt-0.5 text-[9px] uppercase tracking-[0.22em] sm:text-xs">{sub}</span>
        ) : null}
      </div>
    </div>
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
  count = 6,
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

export function ScrollCue({ label = "desliza" }: { label?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
      className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, 9, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 font-comic text-[10px] uppercase tracking-[0.4em] text-ink/60"
      >
        {label}
        <span className="block h-6 w-[2px] bg-ink/40" />
      </motion.div>
    </motion.div>
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