"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { GIFT_VIDEO_ID, useMusic, ytEmbedUrl } from "./music";
import { Rays } from "./comic";

/* ===============================================================
   ACTO FINAL · LA CAJA DE REGALO
   Caja dibujada desde cero. Al tocarla: se vuela la tapa, sale la
   luz y sube la tarjeta con la canción.
=============================================================== */

/* Confeti determinista (sin Math.random, para no romper la hidratación) */
const CONFETTI = Array.from({ length: 18 }, (_, i) => {
  const a = Math.abs(Math.sin((i + 1) * 7.77) * 2371.19) % 1;
  const b = Math.abs(Math.sin((i + 1) * 3.33) * 8191.53) % 1;
  const angle = (Math.PI * 2 * i) / 18;
  return {
    x: Math.round(Math.cos(angle) * (90 + a * 90)),
    y: Math.round(Math.sin(angle) * (70 + b * 80)) - 60,
    rotate: Math.round((a - 0.5) * 540),
    size: 6 + Math.round(b * 8),
    delay: Number((a * 0.25).toFixed(2)),
    color: ["#fbbf24", "#f472b6", "#4ade80", "#60a5fa", "#fff"][i % 5],
  };
});

function GiftBox({ open }: { open: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-[min(72vw,260px)]">
      {/* luz que sale de la caja */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="glow"
            initial={{ opacity: 0, scaleY: 0.2 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute inset-x-6 bottom-[42%] top-[-40%] origin-bottom bg-[linear-gradient(0deg,rgba(251,191,36,0.55),transparent_75%)] blur-xl"
          />
        ) : null}
      </AnimatePresence>

      {/* confeti */}
      <AnimatePresence>
        {open
          ? CONFETTI.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 0], x: c.x, y: c.y, rotate: c.rotate, scale: 1 }}
                transition={{ duration: 1.5, delay: c.delay, ease: "easeOut" }}
                style={{
                  width: c.size,
                  height: c.size * 0.55,
                  background: c.color,
                  left: "50%",
                  top: "38%",
                }}
                className="pointer-events-none absolute rounded-[2px]"
              />
            ))
          : null}
      </AnimatePresence>

      <motion.svg
        viewBox="0 0 260 250"
        className="relative w-full drop-shadow-[0_22px_35px_rgba(0,0,0,0.55)]"
        animate={open ? { y: 6 } : reduce ? undefined : { y: [0, -9, 0] }}
        transition={
          open
            ? { duration: 0.5 }
            : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* sombra en el piso */}
        <ellipse cx="130" cy="240" rx="86" ry="10" fill="#000" opacity="0.35" />

        {/* cuerpo de la caja */}
        <g stroke="#3b0d12" strokeWidth="3.5" strokeLinejoin="round">
          <rect x="34" y="96" width="192" height="138" rx="6" fill="#c2243c" />
          {/* sombra lateral */}
          <path d="M186 96 L226 96 L226 234 L186 234 Z" fill="#9c1a2f" stroke="none" />
          {/* cinta vertical */}
          <rect x="108" y="96" width="44" height="138" fill="#f6c453" />
        </g>

        {/* tapa + moño (se van volando al abrir) */}
        <motion.g
          animate={
            open
              ? { y: -190, rotate: -18, opacity: 0 }
              : reduce
                ? undefined
                : { rotate: [-0.8, 0.8, -0.8] }
          }
          style={{ transformOrigin: "130px 90px" }}
          transition={
            open
              ? { duration: 0.9, ease: [0.3, 1.4, 0.5, 1] }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <g stroke="#3b0d12" strokeWidth="3.5" strokeLinejoin="round">
            <rect x="22" y="64" width="216" height="40" rx="5" fill="#d92e48" />
            <rect x="108" y="64" width="44" height="40" fill="#f6c453" />
          </g>
          {/* moño */}
          <g stroke="#3b0d12" strokeWidth="3.5" strokeLinejoin="round">
            <path d="M130 64 C104 64 84 48 88 32 C92 18 116 22 130 62 Z" fill="#f6c453" />
            <path d="M130 64 C156 64 176 48 172 32 C168 18 144 22 130 62 Z" fill="#f6c453" />
            <circle cx="130" cy="62" r="11" fill="#ffd97a" />
          </g>
        </motion.g>

        {/* etiqueta colgante */}
        <g transform="rotate(-8 60 150)">
          <path
            d="M32 132 L74 126 L82 150 L40 156 Z"
            fill="#fdf6ea"
            stroke="#3b0d12"
            strokeWidth="2.5"
          />
          <circle cx="40" cy="136" r="2.6" fill="#3b0d12" />
          <text x="44" y="147" className="font-hand" fontSize="16" fill="#3b0d12">
            Mariana
          </text>
        </g>
      </motion.svg>
    </div>
  );
}

export function GiftScene({
  songTitle,
  songArtist,
  children,
  signature,
}: {
  songTitle: string;
  songArtist: string;
  children: ReactNode;
  signature?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { pause } = useMusic();
  const reduce = useReducedMotion();

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    pause(); // se calla el sonido ambiente para que suene la canción
  };

  return (
    <section
      style={{ ["--accent" as string]: "#fbbf24" }}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(251,191,36,0.14),transparent_60%)]"
      />
      {open ? <Rays className="h-[130vmin] w-[130vmin] text-amber-200/15" spin={110} /> : null}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 mb-10 text-center font-comic text-sm uppercase tracking-[0.4em] text-white/60"
      >
        Falta una última cosa
      </motion.p>

      {/* la tarjeta con la canción sale de la caja */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <AnimatePresence>
          {open ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 80, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 130, damping: 17, delay: 0.45 }}
              className="mb-8 w-full border-2 border-white/25 bg-white/[0.05] p-4 shadow-[0_0_90px_-20px_var(--accent)] backdrop-blur-sm"
            >
              <p className="font-comic text-[11px] uppercase tracking-[0.35em] text-white/55">
                nuestra canción
              </p>
              <p className="mt-1 font-letter text-2xl leading-tight text-white sm:text-3xl">
                {songTitle}
              </p>
              <p className="text-sm text-white/55">{songArtist}</p>

              <div className="mt-4 aspect-video w-full overflow-hidden rounded-md border border-white/15 bg-black">
                <iframe
                  src={ytEmbedUrl(GIFT_VIDEO_ID, { autoplay: true })}
                  title={`${songTitle} — ${songArtist}`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>

              <div className="mt-4 font-hand text-xl leading-snug text-amber-100/90 sm:text-2xl">
                {children}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleOpen}
          disabled={open}
          aria-label="Abrir el regalo"
          className="relative cursor-pointer disabled:cursor-default"
        >
          <GiftBox open={open} />
        </button>

        <AnimatePresence>
          {!open ? (
            <motion.p
              key="hint"
              exit={{ opacity: 0 }}
              animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="mt-6 font-hand text-2xl text-amber-100/90"
            >
              toca la caja
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      {signature ? <div className="relative z-10 mt-16 w-full">{signature}</div> : null}
    </section>
  );
}
