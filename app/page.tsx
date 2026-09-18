"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { CSSProperties } from "react";
import {
  Chapter,
  ChapterDots,
  Halftone,
  Panel,
  ProgressBar,
  Rays,
  ScrollCue,
  SpeedLines,
  StarBadge,
  StarField,
} from "./components/comic";

/* Estilo base de los párrafos de la carta */
const P =
  "text-[1.05rem] leading-[1.9] text-zinc-200/95 sm:text-xl sm:leading-[1.95] md:text-[1.35rem] text-left md:text-justify hyphens-auto";

export default function AniversarioCarta() {
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // De papel crema (portada) a tinta negra (el resto del cómic)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.17, 0.34, 0.52, 0.72, 0.9, 1],
    ["#f7f0e1", "#f7f0e1", "#0a0a10", "#0a1128", "#061019", "#04070d", "#000000", "#000000"]
  );

  return (
    <>
      <ProgressBar progress={smooth} />
      <ChapterDots progress={smooth} count={6} />

      {/* Lienzo de fondo que cambia de color con el scroll */}
      <motion.div aria-hidden style={{ backgroundColor }} className="fixed inset-0 z-0" />

      <main className="relative z-10 w-full">
        {/* ============================================================
            PORTADA · CAP. 01 — EL ORIGEN
        ============================================================ */}
        <section
          style={{ "--accent": "#e0241f" } as CSSProperties}
          className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 text-ink"
        >
          <div aria-hidden className="paper-grain absolute inset-0 bg-paper" />
          <Halftone size="lg" className="text-blood opacity-[0.13]" />
          <Rays className="h-[130vmin] w-[130vmin] text-blood/15" spin={150} />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(16,15,13,0.3))]"
          />

          {/* cabecera de portada */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 px-4 py-4 font-comic text-[10px] uppercase tracking-[0.3em] sm:px-8 sm:text-xs">
            <span className="border-2 border-ink px-2 py-1">Crónicas de un multiverso</span>
            <span className="bg-ink px-2 py-1 text-paper">Nº 04 · 2026</span>
          </div>

          {/* sello de los 4 años */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.9 }}
            className="absolute right-3 top-20 z-20 sm:right-10 sm:top-24"
          >
            <StarBadge label="4" sub="años" />
          </motion.div>

          <div className="relative z-20 flex w-full max-w-3xl flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="comic-title text-[clamp(2.3rem,10.5vw,6.5rem)] leading-[0.95] text-blood"
            >
              Querida Mariana,
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 w-full"
            >
              <Panel variant="paper">
                <p className="text-center text-[1.1rem] leading-[1.85] sm:text-2xl">
                  un día cualquiera, en un momento cualquiera... mi universo entero se reescribió.
                </p>
              </Panel>
            </motion.div>
          </div>

          <ScrollCue />
        </section>

        {/* ============================================================
            CAP. 02 — LA CAJA
        ============================================================ */}
        <Chapter
          number="02"
          title="La caja"
          sfx="¡ZAAAP!"
          accent="#ffd60a"
          effect={
            <>
              <StarField count={40} className="opacity-50" />
              {/* destello que cruza la pantalla */}
              <motion.div
                initial={{ opacity: 0, x: "-110%" }}
                whileInView={{ opacity: [0, 1, 0], x: "110%" }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                className="absolute left-0 top-1/2 h-[3px] w-full bg-yellow-300 shadow-[0_0_60px_14px_rgba(250,204,21,0.55)]"
              />
              {/* fogonazo */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 0.3, 0] }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="absolute inset-0 bg-yellow-200"
              />
              <SpeedLines className="text-yellow-200/25" />
            </>
          }
        >
          <p className={`${P} mb-7`}>
            A veces pienso que enamorarse es como ese famoso experimento del gato en la caja: antes
            de abrirla, todo es incertidumbre.
          </p>
          <p className={P}>
            Nuestros miedos pueden engañarnos, hacernos temer cambiar de curso o dudar de avanzar,
            pero detrás de ese miedo casi siempre están las mejores oportunidades esperando a ser
            tomadas. Cuando decidimos abrir esa caja juntos, fuimos valientes, nos arriesgamos, y la
            función de onda colapsó en la mejor de las realidades posibles.
          </p>
        </Chapter>

        {/* ============================================================
            CAP. 03 — ORDEN Y CAOS
        ============================================================ */}
        <Chapter
          number="03"
          title="Orden y caos"
          sfx="¡CRACK!"
          accent="#2dd4bf"
          effect={
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1.1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="absolute h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.12),transparent_65%)]"
              />
              {/* la cicatriz dorada que se dibuja: kintsugi */}
              <svg
                viewBox="0 0 400 400"
                className="absolute h-[78vmin] w-[78vmin] opacity-80"
                fill="none"
              >
                <defs>
                  <linearGradient id="kintsugi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fde68a" />
                    <stop offset="50%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M198 8 L176 96 L214 138 L168 214 L206 262 L172 334 L192 396"
                  stroke="url(#kintsugi)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 2.4, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.path
                  d="M214 138 L282 118 M168 214 L96 196 M206 262 L276 288"
                  stroke="url(#kintsugi)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 1.1 }}
                />
              </svg>
            </>
          }
        >
          <p className={`${P} mb-7`}>
            De repente, en medio de este mundo donde solemos creer que el orden y el caos son
            fuerzas opuestas, tú te convertiste en mi mayor certeza.
          </p>
          <p className={P}>
            Descubrí contigo que las cicatrices que tenemos solo nos hacen lo que somos, y que no hay
            nada en nosotros que esté roto y deba repararse. A tu lado entendí lo que significa
            aceptar las cosas que no puedo cambiar, tener el valor de cambiar las que sí puedo, y la
            sabiduría para conocer la diferencia. Encontré en ti ese orden perfecto que me da
            completa paz.
          </p>
        </Chapter>

        {/* ============================================================
            CAP. 04 — EL BAILE
        ============================================================ */}
        <Chapter
          number="04"
          title="El baile"
          sfx="¡TUM-TUM!"
          accent="#60a5fa"
          effect={
            <>
              <StarField count={55} className="opacity-70" />
              {/* arco de luz cruzando mundos */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(96,165,250,0.18),transparent_60%)]"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
                className="absolute h-[min(78vmin,520px)] w-[min(78vmin,520px)] rounded-full border border-dashed border-blue-300/25"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                className="absolute h-[min(64vmin,430px)] w-[min(64vmin,430px)] rounded-full border-2 border-white/10"
              />
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-[min(44vmin,300px)] w-[min(44vmin,300px)] rounded-full border border-blue-200/20 shadow-[0_0_120px_-20px_rgba(96,165,250,0.6)]"
              />
            </>
          }
        >
          <p className={`${P} mb-7`}>
            Por eso, cuando te conocí, supe de inmediato que había encontrado a la pareja de baile
            correcta, y que no quería compartir esa canción con nadie más. Si tuviera que viajar en
            el tiempo o cruzar el universo entero solo para asegurarme de llegar a nuestro baile, lo
            haría sin dudarlo.
          </p>
          <p className={P}>
            No importa cuántos mundos existan, ni las tormentas que haya que enfrentar, porque a tu
            lado es donde encuentro mi verdadero hogar. Dicen que todos necesitamos a alguien que nos
            dé valor, que nos haga nobles y que nos impulse a ser mejores; descubrir esa luz dentro
            de ti me ha convertido en ese hombre, en alguien digno, y siempre, en cualquier universo,
            te voy a elegir a ti.
          </p>
        </Chapter>

        {/* ============================================================
            CAP. 05 — EL TALLER Y LA PISTA
        ============================================================ */}
        <Chapter
          number="05"
          title="El taller y la pista"
          sfx="¡VROOOM!"
          accent="#22d3ee"
          effect={
            <>
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                className="absolute h-[min(52vmin,360px)] w-[min(52vmin,360px)] rounded-full border-[3px] border-cyan-300/40 shadow-[0_0_100px_rgba(34,211,238,0.25)]"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.1, 0.35] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                className="absolute h-[min(30vmin,200px)] w-[min(30vmin,200px)] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.35),transparent_70%)]"
              />
              <SpeedLines className="text-cyan-200/25" />
              <div aria-hidden className="checkers absolute inset-x-0 bottom-0 h-8 opacity-[0.07]" />
            </>
          }
        >
          <p className={`${P} mb-7`}>
            Saber que te tengo a mi lado es lo que me impulsa todos los días. Sé que a veces mi mente
            va a la velocidad de la luz, llenándome de planes, de proyectos y construyendo mil cosas
            a la vez. Puede parecer que estoy armando una armadura tras otra de madrugada, pero en el
            fondo, todo ese esfuerzo es solo porque necesito cuidar lo que tenemos y proteger la
            única cosa en este mundo sin la cual no puedo vivir. Y esa eres tú.
          </p>
          <p className={`${P} mb-7`}>
            Pero incluso cuando me acelero y siento que debo solucionarlo todo, tú me ayudas a ver
            que no todos los problemas tienen solución, y que a veces, simplemente, tienes que
            soltar.
          </p>
          <p className={P}>
            Esa tranquilidad que me das es la que me hace entender que, en este mundo que tanto
            amamos, no somos pilotos peleando por la misma curva. Somos el mismo equipo. Tú eres
            quien me da calma por la radio cuando la pista se pone resbaladiza, la que me ayuda a
            pensar la mejor estrategia, y juntos somos los que marcamos el mejor tiempo por vuelta.
            Sinceramente, no hay campeonato que me interese correr, ni línea de meta que quiera
            cruzar, si no estás tú ahí para celebrarlo conmigo.
          </p>
        </Chapter>

        {/* ============================================================
            CAP. 06 — EL JURAMENTO
        ============================================================ */}
        <Chapter
          number="06"
          title="El juramento"
          sfx="¡FIUUU!"
          accent="#22c55e"
          effect={
            <>
              <StarField count={70} />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 2.5 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_62%)]"
              />
              <Rays className="h-[120vmin] w-[120vmin] text-emerald-300/10" spin={180} />
              {/* estrella fugaz */}
              <motion.div
                initial={{ opacity: 0, y: -240, x: 240 }}
                whileInView={{ opacity: [0, 1, 0], y: 320, x: -320 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 2.2, delay: 1, ease: "easeOut" }}
                className="absolute right-1/4 top-0 h-1 w-1 rounded-full bg-white shadow-[0_0_30px_10px_rgba(255,255,255,0.8)]"
              />
            </>
          }
          after={
            <div className="relative mt-20 flex w-full flex-col items-center text-center">
              <div className="relative flex w-full items-center justify-center py-6">
                <Rays className="h-[80vmin] w-[80vmin] text-emerald-300/20" spin={80} />
                <motion.p
                  initial={{ scale: 0.6, opacity: 0, rotate: -3 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: -1.5 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 190, damping: 14 }}
                  className="comic-title relative z-10 text-[clamp(2.2rem,9vw,5.5rem)] uppercase leading-[0.95] text-white [--stroke:#052e16]"
                >
                  Feliz aniversario.
                </motion.p>
              </div>

              <p className="mt-6 font-comic text-sm uppercase tracking-[0.45em] text-white/55 sm:text-base">
                ATT : juan 2026
              </p>

              <p className="mt-14 font-comic text-[10px] uppercase tracking-[0.4em] text-white/25">
                Continuará… en el año 5
              </p>
            </div>
          }
        >
          <p className={`${P} mb-8`}>
            Hoy cumplimos cuatro años, y cuando calculo todas las variables de mi futuro, hay una
            sola constante absoluta: mi sueño no estaría completo si no estás en él.
          </p>

          {/* cartucho de diálogo destacado */}
          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="my-10 border-l-[3px] border-emerald-400/70 bg-emerald-400/[0.06] px-5 py-6 text-center text-[1.15rem] font-light italic leading-[1.7] text-white drop-shadow-[0_0_18px_rgba(34,197,94,0.35)] sm:text-2xl md:text-[1.75rem]"
          >
            &ldquo;Por eso, en el día más brillante, en la noche más oscura, siempre voy a ser tu
            escudo, tu apoyo y tu compañero en cada locura.&rdquo;
          </motion.p>

          <p className={P}>
            Yo te amo de veritas, de veritas. Porque al final de todo, mi amor, una vida junto a ti
            es todo lo que puedo desear.
          </p>
        </Chapter>
      </main>
    </>
  );
}