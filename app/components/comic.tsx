"use client";

import clsx from "clsx";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/* ===============================================================
   TEMAS POR ZONA
   Cada capítulo tiene marco de viñeta, tipografía y tono propios.
=============================================================== */

export type Theme = "chalk" | "synth" | "forged" | "hud" | "light";

const PANEL_BASE: Record<Theme, string> = {
  chalk: "bg-[#0c1a18]/90 text-sky-50/90",
  synth: "frame-synth bg-[#0e0a0b]/88 text-amber-50/90",
  forged: "frame-forged bg-[#060b1b]/88 text-slate-100/92",
  hud: "frame-hud bg-[#04101a]/88 text-cyan-50/90",
  light: "frame-light bg-[#03140b]/88 text-emerald-50/92",
};

/* ===============================================================
   TEXTURAS COMPARTIDAS
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

/* Estrellas deterministas: mismas posiciones en servidor y cliente. */
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
   ADORNOS DE MARCO (uno por tema)
=============================================================== */

function ChalkFrame() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 260"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <filter id="chalkRough">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="5" />
        </filter>
      </defs>
      <rect
        x="5"
        y="5"
        width="390"
        height="250"
        fill="none"
        stroke="#e8f6ff"
        strokeWidth="1.6"
        opacity="0.55"
        filter="url(#chalkRough)"
      />
    </svg>
  );
}

function SynthFrame() {
  return (
    <>
      {/* nodos en las esquinas */}
      {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map((c, i) => (
        <span
          key={i}
          aria-hidden
          className={clsx(
            "pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5b301]",
            c,
            i === 1 && "translate-x-1/2",
            i === 2 && "translate-y-1/2",
            i === 3 && "translate-x-1/2 translate-y-1/2"
          )}
        />
      ))}
      {/* costura: la grieta roja rellenada de oro */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-6 left-0 w-[2px] bg-[linear-gradient(180deg,#e04b3a,#f5b301,#e04b3a)]"
      />
      {/* traza de circuito arriba */}
      <svg
        aria-hidden
        viewBox="0 0 400 12"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -top-[1px] left-0 h-3 w-full opacity-70"
        fill="none"
      >
        <path
          d="M0 6 H120 L132 1 H212 L224 11 H300 L312 6 H400"
          stroke="#f5b301"
          strokeWidth="1"
        />
      </svg>
    </>
  );
}

function ForgedFrame() {
  return (
    <>
      {["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"].map((c, i) => (
        <span
          key={i}
          aria-hidden
          className={clsx(
            "pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-slate-300/45 shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]",
            c
          )}
        />
      ))}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 -top-[2px] h-[2px] bg-[linear-gradient(90deg,transparent,#ff2d95,#22d3ee,transparent)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 -bottom-[2px] h-[2px] bg-[linear-gradient(90deg,transparent,#22d3ee,#ff2d95,transparent)]"
      />
    </>
  );
}

function HudFrame() {
  return (
    <>
      {[
        "left-0 top-0 border-l-2 border-t-2",
        "right-0 top-0 border-r-2 border-t-2",
        "left-0 bottom-0 border-b-2 border-l-2",
        "right-0 bottom-0 border-b-2 border-r-2",
      ].map((c, i) => (
        <span
          key={i}
          aria-hidden
          className={clsx("pointer-events-none absolute h-5 w-5 border-cyan-300/80", c)}
        />
      ))}
      <span
        aria-hidden
        className="hud-ticks pointer-events-none absolute inset-x-10 top-[3px] h-[6px] text-cyan-300/30"
      />
      <span
        aria-hidden
        className="hud-ticks pointer-events-none absolute inset-x-10 bottom-[3px] h-[6px] text-cyan-300/20"
      />
      <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-30" />
    </>
  );
}

function LightFrame() {
  return (
    <>
      {[
        "left-1.5 top-1.5 border-l border-t",
        "right-1.5 top-1.5 border-r border-t",
        "left-1.5 bottom-1.5 border-b border-l",
        "right-1.5 bottom-1.5 border-b border-r",
      ].map((c, i) => (
        <span
          key={i}
          aria-hidden
          className={clsx(
            "pointer-events-none absolute h-6 w-6 border-emerald-200/80 shadow-[0_0_14px_rgba(34,197,94,0.6)]",
            c
          )}
        />
      ))}
    </>
  );
}

const FRAME_DECOR: Record<Theme, () => ReactNode> = {
  chalk: ChalkFrame,
  synth: SynthFrame,
  forged: ForgedFrame,
  hud: HudFrame,
  light: LightFrame,
};

/* ===============================================================
   VIÑETA
=============================================================== */

export function Panel({
  theme,
  children,
  className,
}: {
  theme: Theme;
  children: ReactNode;
  className?: string;
}) {
  const Decor = FRAME_DECOR[theme];
  return (
    <div
      className={clsx(
        "relative w-full px-5 py-8 backdrop-blur-[3px] sm:px-9 sm:py-10",
        PANEL_BASE[theme],
        className
      )}
    >
      <Decor />
      <div className="relative">{children}</div>
    </div>
  );
}

/* Viñeta de papel, para la portada y el regalo. */
export function PaperPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative w-full border-2 border-ink bg-[#fffdf6]/95 px-5 py-8 text-ink shadow-[7px_7px_0_0_var(--accent)] sm:px-9 sm:py-10",
        className
      )}
    >
      <Halftone className="text-ink opacity-[0.07]" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ===============================================================
   CABECERA DE CAPÍTULO
   La tipografía cambia con la zona: tiza, monoespaciada, neón...
=============================================================== */

function ChapterHeader({
  number,
  title,
  label,
  theme,
}: {
  number: string;
  title: string;
  label?: string;
  theme: Theme;
}) {
  if (theme === "chalk") {
    return (
      <div className="mb-4 flex w-full flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="chalk font-hand text-2xl text-sky-100/90 sm:text-3xl">Cap. {number}</span>
        <span className="chalk font-hand text-xl text-sky-100/55 sm:text-2xl">— {title}</span>
        {label ? (
          <span className="chalk font-hand ml-auto text-lg text-sky-200/50 sm:text-xl">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  if (theme === "synth") {
    return (
      <div className="mb-4 flex w-full flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-tech border border-[#f5b301]/70 px-2 py-1 text-[10px] tracking-[0.3em] text-[#f5b301] sm:text-xs">
          CAP.{number}
        </span>
        <span
          className="glitch font-tech text-[10px] uppercase tracking-[0.3em] text-white/70 sm:text-xs"
          data-text={title}
        >
          {title}
        </span>
        {label ? (
          <span className="font-tech ml-auto text-[9px] uppercase tracking-[0.25em] text-white/35 sm:text-[11px]">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  if (theme === "forged") {
    return (
      <div className="mb-4 flex w-full flex-wrap items-baseline gap-x-4 gap-y-1">
        <span
          className="neon-text font-comic text-2xl sm:text-3xl"
          style={{ ["--neon" as string]: "#ff2d95", ["--neon2" as string]: "#22d3ee" }}
        >
          CAP. {number}
        </span>
        <span className="font-comic text-lg uppercase tracking-[0.25em] text-slate-200/75 sm:text-xl">
          {title}
        </span>
        {label ? (
          <span
            className="neon-text font-comic ml-auto text-lg sm:text-xl"
            style={{ ["--neon" as string]: "#22d3ee", ["--neon2" as string]: "#ff2d95" }}
          >
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  if (theme === "hud") {
    return (
      <div className="mb-4 flex w-full flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-tech text-[10px] tracking-[0.25em] text-cyan-300 sm:text-xs">
          [ CAP.{number} ]
        </span>
        <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-white/55 sm:text-xs">
          {title}
        </span>
        <span aria-hidden className="hud-ticks hidden h-2 flex-1 text-cyan-300/30 sm:block" />
        {label ? (
          <span className="font-tech text-[9px] uppercase tracking-[0.2em] text-[#f5b301]/80 sm:text-[11px]">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  /* light */
  return (
    <div className="mb-4 flex w-full flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="font-comic text-2xl text-emerald-300 drop-shadow-[0_0_14px_rgba(34,197,94,0.9)] sm:text-3xl">
        CAP. {number}
      </span>
      <span className="font-comic text-lg uppercase tracking-[0.25em] text-emerald-100/70 sm:text-xl">
        {title}
      </span>
      {label ? (
        <span className="font-comic ml-auto text-lg uppercase tracking-[0.2em] text-emerald-200/60 sm:text-xl">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/* ===============================================================
   CAPÍTULO (sección completa)
=============================================================== */

export function Chapter({
  number,
  title,
  label,
  theme,
  accent,
  effect,
  children,
  after,
}: {
  number: string;
  title: string;
  label?: string;
  theme: Theme;
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
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-start"
      >
        <ChapterHeader number={number} title={title} label={label} theme={theme} />
        <Panel theme={theme}>{children}</Panel>
        {after}
      </motion.div>
    </section>
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
        className="h-full origin-left bg-gradient-to-r from-sky-200 via-[#ff2d95] to-emerald-400"
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
   SELLO DE ESTRELLA (cierre)
=============================================================== */

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
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full drop-shadow-[3px_4px_0_rgba(16,15,13,0.85)]"
      >
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