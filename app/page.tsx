"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Chapter,
  ChapterDots,
  ProgressBar,
  Rays,
  StarBadge,
} from "./components/comic";
import {
  ChalkNote,
  HudFx,
  LabFx,
  LanternFx,
  StormFx,
  SynthFx,
} from "./components/effects";
import { GiftScene } from "./components/gift";
import { LetterScene } from "./components/letter";
import { MusicProvider } from "./components/music";

/* Tamaño y ritmo de los párrafos. El color lo pone cada viñeta,
   según la zona en la que esté. */
const P =
  "text-[1.05rem] leading-[1.9] sm:text-xl sm:leading-[1.95] md:text-[1.35rem] text-left md:text-justify hyphens-auto";

export default function AniversarioCarta() {
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // El fondo viaja del papel de la carta al color de cada zona
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.11, 0.17, 0.3, 0.44, 0.58, 0.72, 0.88, 1],
    [
      "#fdf7f0",
      "#fdf7f0",
      "#0d1a18",
      "#0d1a18",
      "#120a08",
      "#07091c",
      "#050d14",
      "#03130b",
      "#0a0508",
    ]
  );

  return (
    <MusicProvider>
      <ProgressBar progress={smooth} />
      <ChapterDots progress={smooth} count={7} />

      {/* Lienzo de fondo que cambia de color con el scroll */}
      <motion.div aria-hidden style={{ backgroundColor }} className="fixed inset-0 z-0" />

      <main className="relative z-10 w-full">
        {/* ============================================================
            ACTO 1 · LA CARTA
        ============================================================ */}
        <LetterScene>
          <p className="font-hand text-[2rem] leading-tight text-[#3f2f2c] sm:text-4xl">
            Querida Mariana,
          </p>
          <p className="mt-6 font-hand text-[1.45rem] leading-8 text-[#4a3a36] sm:text-[1.65rem]">
            un día cualquiera, en un momento cualquiera... mi universo entero se reescribió.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="mt-8 ml-auto h-6 w-6 text-rose-400"
            fill="currentColor"
          >
            <path d="M12 21s-7.5-4.7-9.6-9A5.2 5.2 0 0 1 12 6.5 5.2 5.2 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9Z" />
          </svg>
        </LetterScene>

        {/* ============================================================
            CAP. 02 — LA CAJA
            Pizarra de física + velocidad
        ============================================================ */}
        <Chapter
          number="02"
          title="La caja"
          label="colapso de la función de onda"
          theme="chalk"
          accent="#9fd8ff"
          effect={<LabFx />}
          after={<ChalkNote />}
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
            Sintético: el caos se ordena
        ============================================================ */}
        <Chapter
          number="03"
          title="Orden y caos"
          label="estado: certeza"
          theme="synth"
          accent="#e04b3a"
          effect={<SynthFx />}
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
            Tormenta, puente de luz y medallón
        ============================================================ */}
        <Chapter
          number="04"
          title="El baile"
          label="TUM-TUM"
          theme="forged"
          accent="#ff2d95"
          effect={<StormFx />}
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
            HUD de taller + telemetría
        ============================================================ */}
        <Chapter
          number="05"
          title="El taller y la pista"
          label="VUELTA 04 · P1"
          theme="hud"
          accent="#f5b301"
          effect={<HudFx />}
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
            La linterna, el anillo y la luz
        ============================================================ */}
        <Chapter
          number="06"
          title="El juramento"
          label="luz 100%"
          theme="light"
          accent="#22c55e"
          effect={<LanternFx />}
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
            </div>
          }
        >
          <p className={`${P} mb-8`}>
            Hoy cumplimos cuatro años, y cuando calculo todas las variables de mi futuro, hay una
            sola constante absoluta: mi sueño no estaría completo si no estás en él.
          </p>

          {/* el juramento, iluminado */}
          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="my-10 border-l-[3px] border-emerald-400/70 bg-emerald-400/[0.07] px-5 py-6 text-center text-[1.15rem] font-light italic leading-[1.7] text-white drop-shadow-[0_0_18px_rgba(34,197,94,0.45)] sm:text-2xl md:text-[1.75rem]"
          >
            &ldquo;Por eso, en el día más brillante, en la noche más oscura, siempre voy a ser tu
            escudo, tu apoyo y tu compañero en cada locura.&rdquo;
          </motion.p>

          <p className={P}>
            Yo te amo de veritas, de veritas. Porque al final de todo, mi amor, una vida junto a ti
            es todo lo que puedo desear.
          </p>
        </Chapter>

        {/* ============================================================
            ACTO FINAL · EL REGALO
        ============================================================ */}
        <GiftScene
          songTitle="Mi Vida Entera"
          songArtist="Morat"
          signature={
            <div className="flex flex-col items-center gap-6 text-center">
              <StarBadge label="4" sub="años" />
              <p className="font-comic text-sm uppercase tracking-[0.45em] text-white/55">
                ATT : juan 2026
              </p>
              <p className="font-comic text-[10px] uppercase tracking-[0.4em] text-white/25">
                Continuará… en el año 5
              </p>
            </div>
          }
        >
          {/* 👇 cambia esta línea por la tuya */}
          Ponle play, mi amor. Esta canción dice lo que a mí me faltan palabras para decir.
        </GiftScene>
      </main>
    </MusicProvider>
  );
}