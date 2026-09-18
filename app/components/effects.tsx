"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ===============================================================
   EFECTOS DE FONDO, UNO POR ZONA.
   Todo dibujado desde cero con SVG/CSS: sin imágenes, sin logos.
   Los tamaños usan min(Xvmin, Ypx) para que en el celular no se
   desborden ni tapen el texto.
=============================================================== */

/* ---------------------------------------------------------------
   CAP. 02 · LA PIZARRA Y EL VELOCISTA
   Aula de física: ecuaciones de tiza, la caja dibujada a mano y un
   rayo que cruza la pizarra dejando eco.
--------------------------------------------------------------- */

const ECUACIONES = [
  { t: "iħ ∂ψ/∂t = Ĥψ", c: "left-3 top-[12%] text-2xl sm:left-10 sm:text-4xl" },
  { t: "|ψ⟩ = α|0⟩ + β|1⟩", c: "right-3 top-[20%] text-xl sm:right-12 sm:text-3xl" },
  { t: "Δx · Δp ≥ ħ/2", c: "left-4 bottom-[16%] text-xl sm:left-16 sm:text-3xl" },
  { t: "P = |⟨φ|ψ⟩|²", c: "right-4 bottom-[22%] hidden text-2xl sm:block sm:right-14 sm:text-3xl" },
];

export function LabFx() {
  const reduce = useReducedMotion();

  return (
    <>
      <div aria-hidden className="chalkboard absolute inset-0" />

      {/* ecuaciones de tiza */}
      {ECUACIONES.map((e, i) => (
        <span
          key={i}
          aria-hidden
          className={`chalk font-hand absolute select-none text-sky-100/25 ${e.c}`}
        >
          {e.t}
        </span>
      ))}

      {/* dibujo de tiza: la caja cerrada con la incógnita */}
      <svg
        aria-hidden
        viewBox="0 0 220 170"
        className="absolute bottom-[8%] left-1/2 hidden h-[130px] -translate-x-1/2 text-sky-100/25 sm:block sm:h-[170px]"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M40 60 H170 V150 H40 Z" />
          <path d="M40 60 L66 34 H196 L170 60" />
          <path d="M170 60 L196 34 V124 L170 150" />
        </g>
        <text
          x="105"
          y="122"
          textAnchor="middle"
          className="font-hand chalk"
          fontSize="52"
          fill="currentColor"
          stroke="none"
        >
          ?
        </text>
      </svg>

      {/* el rayo cruza la pizarra: tres ecos */}
      {[0, 0.09, 0.18].map((delay, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ opacity: 0, x: "-120%" }}
          whileInView={{ opacity: [0, 1, 0], x: "120%" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.85, delay: 0.4 + delay, ease: "easeOut" }}
          className="absolute left-0 h-[2px] w-full"
          style={{
            top: `${47 + i * 3}%`,
            background: i === 0 ? "#e8f6ff" : "#7dd3fc",
            boxShadow:
              i === 0
                ? "0 0 45px 10px rgba(232,246,255,0.45)"
                : "0 0 32px 7px rgba(125,211,252,0.28)",
          }}
        />
      ))}

      {/* chispa eléctrica ramificada */}
      <svg
        aria-hidden
        viewBox="0 0 600 220"
        className="absolute h-[52vmin] max-h-[240px] w-[min(94vw,760px)] opacity-70"
        fill="none"
      >
        {[
          "M150 18 L124 92 L160 86 L132 208",
          "M452 26 L482 96 L448 100 L476 200",
          "M300 6 L274 66 L308 62 L288 126",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={i === 1 ? "#7dd3fc" : "#e8f6ff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: [0, 1, 1], opacity: [0, 0.9, 0] }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 1.1,
              delay: 0.6 + i * 0.26,
              repeat: Infinity,
              repeatDelay: 2.6,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>

      {/* polvo de tiza levantado por el rayo */}
      {!reduce && (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }, (_, i) => {
            const a = Math.abs(Math.sin((i + 1) * 11.31) * 4271.19) % 1;
            const b = Math.abs(Math.sin((i + 1) * 6.17) * 2711.53) % 1;
            return (
              <motion.span
                key={i}
                className="absolute rounded-full bg-sky-100/50"
                style={{
                  left: `${(10 + a * 80).toFixed(2)}%`,
                  top: `${(44 + b * 12).toFixed(2)}%`,
                  width: 1.5 + b * 2,
                  height: 1.5 + b * 2,
                }}
                animate={{ y: [0, -60 - a * 40], opacity: [0, 0.7, 0], x: [0, (a - 0.5) * 50] }}
                transition={{
                  duration: 4 + b * 3,
                  delay: a * 5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

/* Anotación de tiza que se escribe debajo de la viñeta del cap. 02 */
export function ChalkNote() {
  return (
    <div className="relative mt-8 flex w-full justify-center sm:justify-end sm:pr-6">
      <div className="relative px-6 py-3">
        <motion.svg
          aria-hidden
          viewBox="0 0 240 90"
          className="absolute inset-0 h-full w-full text-sky-100/50"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M26 18 C90 2, 190 6, 220 34 C236 54, 180 82, 110 84 C46 86, 4 66, 12 46 C18 30, 54 18, 96 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.8 }}
          />
        </motion.svg>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="chalk font-hand relative text-2xl text-sky-100/85 sm:text-3xl"
        >
          P(nosotros) = 1
        </motion.p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   CAP. 03 · SINTÉTICO
   El caos (rojo, glitch) se ordena en una retícula dorada alrededor
   de un cristal facetado. Diseño propio.
--------------------------------------------------------------- */

export function SynthFx() {
  const reduce = useReducedMotion();

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,179,1,0.12),transparent_62%)]"
      />

      {/* retícula hexagonal = el orden */}
      <svg aria-hidden className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <pattern id="synthHex" width="30" height="52" patternUnits="userSpaceOnUse">
            <path
              d="M15 1 L29 9 V27 L15 35 L1 27 V9 Z"
              fill="none"
              stroke="#f5b301"
              strokeWidth="0.8"
            />
          </pattern>
          <radialGradient id="synthFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="synthMask">
            <rect width="100%" height="100%" fill="url(#synthFade)" />
          </mask>
        </defs>
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#synthHex)"
          mask="url(#synthMask)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
        />
      </svg>

      {/* barras de interferencia = el caos */}
      {!reduce &&
        Array.from({ length: 7 }, (_, i) => {
          const a = Math.abs(Math.sin((i + 1) * 8.91) * 3331.77) % 1;
          return (
            <motion.div
              key={i}
              aria-hidden
              className="absolute left-0 w-full bg-[#e04b3a]"
              style={{ top: `${(12 + a * 76).toFixed(1)}%`, height: 1 + Math.round(a * 3) }}
              animate={{ opacity: [0, 0.45, 0, 0.2, 0], x: [0, 8, -6, 0] }}
              transition={{
                duration: 0.5,
                delay: a * 6,
                repeat: Infinity,
                repeatDelay: 3 + a * 4,
              }}
            />
          );
        })}

      {/* cristal facetado */}
      <motion.svg
        aria-hidden
        viewBox="0 0 160 200"
        className="absolute h-[min(46vmin,260px)]"
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="crystalA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe9a8" />
            <stop offset="100%" stopColor="#f5b301" />
          </linearGradient>
          <linearGradient id="crystalB" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5b301" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <radialGradient id="crystalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f5b301" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.circle
          cx="80"
          cy="100"
          r="78"
          fill="url(#crystalGlow)"
          animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }}
          style={{ transformOrigin: "80px 100px" }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <g stroke="#7c2d12" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M80 26 L124 70 L80 174 L36 70 Z" fill="url(#crystalA)" />
          <path d="M80 26 L124 70 L80 96 Z" fill="url(#crystalB)" opacity="0.85" />
          <path d="M36 70 L80 96 L80 174 Z" fill="#fde68a" opacity="0.5" />
        </g>
        <path d="M80 26 L80 174 M36 70 L124 70" stroke="#fff7e0" strokeWidth="0.8" opacity="0.5" />
      </motion.svg>

      {/* trazas de circuito que crecen desde el cristal */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="absolute h-[min(86vmin,560px)] w-[min(86vmin,560px)] opacity-60"
        fill="none"
      >
        {[
          "M200 200 H300 V140 H352",
          "M200 200 H100 V262 H46",
          "M200 200 V96 H272",
          "M200 200 V308 H128",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#f5b301"
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.75 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 2, delay: 0.4 + i * 0.25, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </>
  );
}

/* ---------------------------------------------------------------
   CAP. 04 · TORMENTA Y PUENTE DE LUZ
   Arco de luz neón cruzando el cielo, relámpagos y un medallón
   original de ocho puntas con dos arcos entrelazados (ustedes dos).
--------------------------------------------------------------- */

export function StormFx() {
  const reduce = useReducedMotion();

  const petalos = Array.from({ length: 8 }, (_, i) => i * 45);

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(255,45,149,0.16),transparent_58%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(34,211,238,0.14),transparent_55%)]"
      />

      {/* estrellas */}
      {!reduce && (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 46 }, (_, i) => {
            const a = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
            const b = Math.abs(Math.sin((i + 1) * 78.233) * 12345.6789) % 1;
            return (
              <motion.span
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${(a * 100).toFixed(2)}%`,
                  top: `${(b * 100).toFixed(2)}%`,
                  width: 1 + b * 1.6,
                  height: 1 + b * 1.6,
                }}
                animate={{ opacity: [0.15, 0.85, 0.15] }}
                transition={{ duration: 2.6 + a * 3, delay: a * 4, repeat: Infinity }}
              />
            );
          })}
        </div>
      )}

      {/* el puente de luz */}
      <svg
        aria-hidden
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-[12%] h-[38vmin] max-h-[300px] w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="bifrost" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="22%" stopColor="#ff2d95" />
            <stop offset="52%" stopColor="#22d3ee" />
            <stop offset="78%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-40 380 C 260 60, 940 60, 1240 380"
          stroke="url(#bifrost)"
          strokeWidth="26"
          strokeLinecap="round"
          opacity="0.28"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M-40 380 C 260 60, 940 60, 1240 380"
          stroke="url(#bifrost)"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
      </svg>

      {/* relámpagos lejanos */}
      {!reduce &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_18%,rgba(226,232,240,0.22),transparent_38%)]"
            style={{ ["--x" as string]: i === 0 ? "18%" : "82%" }}
            animate={{ opacity: [0, 0.9, 0, 0.5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 + i * 3.5 }}
          />
        ))}

      {/* medallón: ocho puntas + dos arcos entrelazados */}
      <motion.svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute h-[min(56vmin,340px)] w-[min(56vmin,340px)] opacity-[0.22]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="86" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#22d3ee" strokeWidth="1" />
        {petalos.map((deg) => (
          <path
            key={deg}
            d="M100 16 L110 52 L100 62 L90 52 Z"
            fill="#ff2d95"
            opacity="0.55"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
        <path
          d="M74 112 a26 26 0 1 1 52 0 a26 26 0 1 1 -52 0"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="2"
          opacity="0.8"
        />
        <path d="M78 88 a30 30 0 0 1 44 0" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <path d="M78 112 a30 30 0 0 0 44 0" fill="none" stroke="#ff2d95" strokeWidth="2.5" />
      </motion.svg>
    </>
  );
}

/* ---------------------------------------------------------------
   CAP. 05 · EL TALLER (HUD)
   Plano holográfico girando, núcleo hexagonal latiendo, telemetría
   y marcos de interfaz. Todo geometría propia.
--------------------------------------------------------------- */

export function HudFx() {
  const reduce = useReducedMotion();

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,179,1,0.1),transparent_60%)]"
      />
      <div aria-hidden className="scanlines absolute inset-0 opacity-[0.35]" />

      {/* esquinas de interfaz */}
      {[
        "left-3 top-3 border-l-2 border-t-2 sm:left-6 sm:top-6",
        "right-3 top-3 border-r-2 border-t-2 sm:right-6 sm:top-6",
        "left-3 bottom-3 border-b-2 border-l-2 sm:left-6 sm:bottom-6",
        "right-3 bottom-3 border-b-2 border-r-2 sm:right-6 sm:bottom-6",
      ].map((c, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute h-8 w-8 border-cyan-300/40 sm:h-12 sm:w-12 ${c}`}
        />
      ))}

      {/* plano holográfico girando */}
      <motion.svg
        aria-hidden
        viewBox="0 0 300 300"
        className="absolute h-[min(82vmin,520px)] w-[min(82vmin,520px)] opacity-[0.35]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="2 8" />
        <circle cx="150" cy="150" r="112" stroke="#22d3ee" strokeWidth="0.6" />
        {Array.from({ length: 6 }, (_, i) => (
          <path
            key={i}
            d="M150 44 A106 106 0 0 1 203 58"
            stroke="#f5b301"
            strokeWidth="3"
            opacity="0.5"
            transform={`rotate(${i * 60} 150 150)`}
          />
        ))}
        {Array.from({ length: 24 }, (_, i) => (
          <line
            key={i}
            x1="150"
            y1="24"
            x2="150"
            y2="34"
            stroke="#22d3ee"
            strokeWidth="1"
            opacity="0.6"
            transform={`rotate(${i * 15} 150 150)`}
          />
        ))}
      </motion.svg>

      {/* núcleo hexagonal */}
      <motion.svg
        aria-hidden
        viewBox="0 0 120 120"
        className="absolute h-[min(34vmin,210px)] w-[min(34vmin,210px)]"
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff7e0" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#f5b301" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f5b301" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#coreGlow)" />
        <circle cx="60" cy="60" r="40" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
        <polygon
          points="60,26 89,43 89,77 60,94 31,77 31,43"
          fill="none"
          stroke="#f5b301"
          strokeWidth="2.5"
        />
        <motion.polygon
          points="60,38 78,48 78,72 60,82 42,72 42,48"
          fill="#ffe9a8"
          animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* telemetría abajo */}
      <svg
        aria-hidden
        viewBox="0 0 600 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[7%] h-12 w-full opacity-60"
        fill="none"
      >
        <motion.path
          d="M0 44 L60 44 L86 18 L120 50 L168 26 L210 40 L260 12 L300 46 L346 22 L392 44 L440 20 L486 46 L536 30 L600 38"
          stroke="#22d3ee"
          strokeWidth="1.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </svg>

      <div aria-hidden className="checkers absolute inset-x-0 bottom-0 h-7 opacity-[0.06]" />
    </>
  );
}

/* ---------------------------------------------------------------
   CAP. 06 · LA LINTERNA
   Farol hexagonal, anillo con gema y luz de voluntad subiendo.
   Diseño propio de principio a fin.
--------------------------------------------------------------- */

const MOTAS = Array.from({ length: 16 }, (_, i) => {
  const a = Math.abs(Math.sin((i + 1) * 9.13) * 3571.11) % 1;
  const b = Math.abs(Math.sin((i + 1) * 5.77) * 1597.31) % 1;
  return {
    left: `${(22 + a * 56).toFixed(2)}%`,
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
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,rgba(34,197,94,0.24),transparent_62%)]"
      />

      {/* rayos de voluntad */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 text-emerald-300/10"
      >
        <motion.div
          className="rays h-full w-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* anillos */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute h-[min(80vmin,560px)] w-[min(80vmin,560px)]"
        fill="none"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="82"
          stroke="#4ade80"
          strokeWidth="0.8"
          strokeDasharray="3 8"
          opacity="0.45"
          style={{ transformOrigin: "100px 100px" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="64"
          stroke="#22c55e"
          strokeWidth="1.8"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>

      {/* el farol */}
      <motion.svg
        aria-hidden
        viewBox="0 0 120 180"
        className="absolute h-[min(46vmin,320px)]"
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

        <motion.ellipse
          cx="60"
          cy="96"
          rx="54"
          ry="60"
          fill="url(#lanternCore)"
          animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <g stroke="#08361f" strokeWidth="3" strokeLinejoin="round">
          <path d="M38 32 a22 20 0 0 1 44 0" fill="none" />
          <polygon points="60,34 94,52 94,60 26,60 26,52" fill="#1f7a4d" />
          <path d="M31 60 L89 60 L84 134 L36 134 Z" fill="#0f5132" fillOpacity="0.88" />
          <polygon points="26,134 94,134 99,152 21,152" fill="#1f7a4d" />
        </g>

        <motion.path
          d="M60 72 C76 92 71 112 60 122 C49 112 44 92 60 72 Z"
          fill="#dcfce7"
          animate={reduce ? undefined : { opacity: [0.75, 1, 0.75], scale: [1, 1.05, 1] }}
          style={{ transformOrigin: "60px 97px" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <path d="M46 60 L44 134 M74 60 L76 134" stroke="#08361f" strokeWidth="2.5" />
      </motion.svg>

      {/* el anillo con la gema */}
      <motion.svg
        aria-hidden
        viewBox="0 0 160 120"
        className="absolute bottom-[10%] right-[6%] hidden h-[110px] sm:block md:h-[140px]"
        animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-6, 2, -6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        fill="none"
      >
        <ellipse cx="80" cy="70" rx="46" ry="28" stroke="#134e33" strokeWidth="11" />
        <ellipse cx="80" cy="70" rx="46" ry="28" stroke="#4ade80" strokeWidth="3" opacity="0.8" />
        <g>
          <motion.circle
            cx="80"
            cy="40"
            r="26"
            fill="#22c55e"
            opacity="0.25"
            animate={reduce ? undefined : { opacity: [0.15, 0.4, 0.15], r: [24, 30, 24] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <polygon
            points="80,24 96,38 80,56 64,38"
            fill="#86efac"
            stroke="#065f46"
            strokeWidth="2"
          />
          <path d="M80 24 L80 56 M64 38 L96 38" stroke="#ecfdf5" strokeWidth="1" opacity="0.7" />
        </g>
      </motion.svg>

      {/* motas de luz */}
      {!reduce && (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {MOTAS.map((m, i) => (
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