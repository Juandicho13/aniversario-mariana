"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { useMusic } from "./music";

/* ===============================================================
   ACTO 1 · LA CARTA
   Sobre cerrado con sello de cera -> se abre -> sale la carta
   escrita a mano. Todo dibujado a mano con SVG (nada de imágenes).
=============================================================== */

/* Corazones que flotan de fondo (posiciones deterministas: sin
   Math.random, para que servidor y cliente pinten lo mismo). */
const HEARTS = Array.from({ length: 14 }, (_, i) => {
  const a = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
  const b = Math.abs(Math.sin((i + 1) * 4.1414) * 1234.567) % 1;
  return {
    left: `${(6 + a * 88).toFixed(2)}%`,
    size: 10 + Math.round(b * 16),
    delay: Number((a * 9).toFixed(2)),
    dur: Number((13 + b * 10).toFixed(2)),
    drift: Math.round((a - 0.5) * 70),
    opacity: Number((0.18 + b * 0.3).toFixed(2)),
  };
});

function FloatingHearts() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {HEARTS.map((h, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          width={h.size}
          height={h.size}
          style={{ left: h.left, opacity: h.opacity }}
          className="absolute -bottom-10 text-rose-400"
          initial={{ y: 0, x: 0, rotate: 0 }}
          animate={{ y: "-115vh", x: h.drift, rotate: h.drift }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          <path
            fill="currentColor"
            d="M12 21s-7.5-4.7-9.6-9A5.2 5.2 0 0 1 12 6.5 5.2 5.2 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9Z"
          />
        </motion.svg>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------
   El sobre cerrado
-------------------------------------------------------------- */
function ClosedEnvelope({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key="closed"
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 1.12, y: -30, transition: { duration: 0.45 } }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 flex flex-col items-center"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Abrir la carta"
        animate={reduce ? undefined : { rotate: [-1.2, 1.2, -1.2], y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative w-[min(86vw,420px)] cursor-pointer drop-shadow-[0_22px_40px_rgba(120,70,60,0.28)]"
      >
        <svg viewBox="0 0 340 226" className="w-full">
          {/* cuerpo del sobre */}
          <rect
            x="4"
            y="30"
            width="332"
            height="192"
            rx="8"
            fill="#f7e0dd"
            stroke="#4a3330"
            strokeWidth="3"
          />
          {/* pliegues laterales */}
          <path
            d="M6 218 L126 128 M334 218 L214 128"
            stroke="#4a3330"
            strokeWidth="2"
            opacity="0.25"
          />
          {/* solapa cerrada */}
          <path
            d="M4 36 L170 140 L336 36"
            fill="#efcbc8"
            stroke="#4a3330"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* estampilla dibujada a mano */}
          <g transform="translate(252 44)">
            <rect
              width="62"
              height="52"
              rx="3"
              fill="#fdf6ef"
              stroke="#4a3330"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
            <path
              d="M31 40 C20 32 12 26 12 19 a7 7 0 0 1 19-4 7 7 0 0 1 19 4 c0 7-8 13-19 21Z"
              fill="#d4605c"
            />
            <text
              x="31"
              y="49"
              textAnchor="middle"
              className="font-comic"
              fontSize="8"
              fill="#4a3330"
            >
              4 AÑOS · 2026
            </text>
          </g>

          {/* destinataria, escrito a mano */}
          <text
            x="34"
            y="182"
            className="font-hand"
            fontSize="30"
            fill="#4a3330"
            transform="rotate(-2 34 182)"
          >
            Para: Mariana
          </text>

          {/* sello de cera */}
          <g transform="translate(170 140)">
            <circle r="28" fill="#c2413f" stroke="#7d2422" strokeWidth="3" />
            <circle r="21" fill="none" stroke="#e98b88" strokeWidth="1.5" opacity="0.7" />
            <path
              d="M0 12 C-8 5 -13 1 -13 -4 a5 5 0 0 1 13 -3 5 5 0 0 1 13 3 c0 5-5 9-13 16Z"
              fill="#f2c4c2"
              opacity="0.9"
            />
          </g>
        </svg>
      </motion.button>

      <motion.p
        animate={reduce ? undefined : { opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="mt-8 font-hand text-2xl text-[#6b4a44] sm:text-3xl"
      >
        toca para abrir
      </motion.p>
    </motion.div>
  );
}

/* --------------------------------------------------------------
   La carta abierta
-------------------------------------------------------------- */
function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx("tape absolute h-7 w-24 rounded-[2px] opacity-80", className)}
    />
  );
}

function OpenLetter({ children }: { children: ReactNode }) {
  return (
    <motion.div
      key="open"
      initial={{ opacity: 0, y: 90, scale: 0.9, rotateX: -18 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      style={{ transformPerspective: 1200 }}
      className="relative z-20 w-full max-w-xl"
    >
      <Tape className="-left-2 -top-3 -rotate-6 sm:left-6" />
      <Tape className="-right-2 -top-3 rotate-6 sm:right-6" />

      <div className="letter-paper relative border border-[#e6d4c6] px-6 py-10 shadow-[0_28px_60px_-28px_rgba(90,50,40,0.55)] sm:px-10">
        {children}
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------------------
   Borde rasgado: el papel se rompe y empieza el cómic
-------------------------------------------------------------- */
const TORN_PATH = (() => {
  let d = "M0 64 L0 36";
  for (let i = 1; i <= 44; i++) {
    const x = (1200 / 44) * i;
    const y = i % 2 === 0 ? 24 + ((i * 7) % 13) : 46 - ((i * 5) % 15);
    d += ` L${x.toFixed(1)} ${y}`;
  }
  return `${d} L1200 64 Z`;
})();

export function TornEdge({ color = "#0a0a10" }: { color?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 64"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-10 w-full sm:h-14"
    >
      <path d={TORN_PATH} fill={color} />
    </svg>
  );
}

/* --------------------------------------------------------------
   Escena completa
-------------------------------------------------------------- */
export function LetterScene({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { start } = useMusic();

  const handleOpen = () => {
    setOpen(true);
    start(); // el toque de la carta es el gesto que arranca la música
  };

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24">
      {/* fondo pastel */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#fdf7f0_0%,#f8e8e3_55%,#f2dad6_100%)]"
      />
      <div aria-hidden className="paper-grain absolute inset-0 opacity-70" />
      <FloatingHearts />

      <div className="relative z-20 flex w-full max-w-xl flex-col items-center">
        <AnimatePresence mode="wait">
          {open ? (
            <OpenLetter key="open">{children}</OpenLetter>
          ) : (
            <ClosedEnvelope key="closed" onOpen={handleOpen} />
          )}
        </AnimatePresence>
      </div>

      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2 font-hand text-xl text-[#6b4a44]"
        >
          sigue bajando ↓
        </motion.div>
      ) : null}

      <TornEdge />
    </section>
  );
}