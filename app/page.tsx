"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AniversarioCarta() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transiciones de color: Forzamos el negro puro desde el 80% hasta el 100%
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.6, 0.8, 1],
    ["#fdfbf7", "#050505", "#0a1128", "#020b14", "#000000", "#000000"]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full min-h-[700vh] bg-[#000000] transition-colors duration-700 font-serif selection:bg-white/30"
    >
      {/* SECCIÓN 1: EL INICIO */}
      <Section opacityDelay={0.2}>
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-900">
          <span className="font-bold text-3xl md:text-5xl mb-8 block text-center">
            Querida Mariana,
          </span>
          un día cualquiera, en un momento cualquiera... mi universo entero se reescribió.
        </p>
      </Section>

      {/* SECCIÓN 2: LA INCERTIDUMBRE (FLASH / SCHRÖDINGER) */}
      <Section
        backgroundEffect={
          /* ⚡️ EFECTO FLASH: Un rayo de luz amarilla/roja que cruza a toda velocidad */
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            whileInView={{ opacity: [0, 1, 0], x: "100%" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="absolute top-1/2 left-0 w-full h-1 bg-yellow-400/50 shadow-[0_0_40px_10px_rgba(250,204,21,0.4)]"
          />
        }
      >
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200">
          A veces pienso que enamorarse es como ese famoso experimento del gato en la caja: antes de abrirla, todo es incertidumbre.
        </p>
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-200">
          Nuestros miedos pueden engañarnos, hacernos temer cambiar de curso o dudar de avanzar, pero detrás de ese miedo casi siempre están las mejores oportunidades esperando a ser tomadas. Cuando decidimos abrir esa caja juntos, fuimos valientes, nos arriesgamos, y la función de onda colapsó en la mejor de las realidades posibles.
        </p>
      </Section>

      {/* SECCIÓN 3: EL ORDEN Y EL CAOS (ULTRÓN / FLASHPOINT) */}
      <Section
        backgroundEffect={
          /* 🤖 EFECTO ULTRÓN/VISIÓN: Un brillo sutil de red/menta que representa el orden naciendo del caos */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 3, repeatType: "reverse", repeat: Infinity }}

            className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-teal-500/5 via-transparent to-transparent rounded-full"
          />
        }
      >
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200">
          De repente, en medio de este mundo donde solemos creer que el orden y el caos son fuerzas opuestas, tú te convertiste en mi mayor certeza.
        </p>
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-200">
          Descubrí contigo que las cicatrices que tenemos solo nos hacen lo que somos, y que no hay nada en nosotros que esté roto y deba repararse. A tu lado entendí lo que significa aceptar las cosas que no puedo cambiar, tener el valor de cambiar las que sí puedo, y la sabiduría para conocer la diferencia. Encontré en ti ese orden perfecto que me da completa paz.
        </p>
      </Section>

      {/* SECCIÓN 4: EL BAILE Y EL HOGAR (CAPITÁN AMÉRICA / THOR) */}
      <Section
        backgroundEffect={
          /* 🛡️ EFECTO CAPITÁN AMÉRICA / THOR: Anillos sutiles girando lentamente como el escudo, con un brillo cósmico del Bifrost */
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[450px] h-[450px] border-[1px] border-blue-400/10 rounded-full border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] border-[2px] border-white/5 rounded-full"
            />
          </>
        }
      >
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200">
          Por eso, cuando te conocí, supe de inmediato que había encontrado a la pareja de baile correcta, y que no quería compartir esa canción con nadie más. Si tuviera que viajar en el tiempo o cruzar el universo entero solo para asegurarme de llegar a nuestro baile, lo haría sin dudarlo.
        </p>
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-200">
          No importa cuántos mundos existan, ni las tormentas que haya que enfrentar, porque a tu lado es donde encuentro mi verdadero hogar. Dicen que todos necesitamos a alguien que nos dé valor, que nos haga nobles y que nos impulse a ser mejores; descubrir esa luz dentro de ti me ha convertido en ese hombre, en alguien digno, y siempre, en cualquier universo, te voy a elegir a ti.
        </p>
      </Section>

      {/* SECCIÓN 5: EL TALLER Y LA PISTA (IRON MAN / FÓRMULA 1) */}
      <Section
        backgroundEffect={
          /* ⚙️ EFECTO IRON MAN: El Reactor Arc latiendo lentamente de fondo */
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute w-[350px] h-[350px] rounded-full border-[3px] border-cyan-400/30 shadow-[0_0_80px_rgba(34,211,238,0.2)]"
          />
        }
      >
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200">
          Saber que te tengo a mi lado es lo que me impulsa todos los días. Sé que a veces mi mente va a la velocidad de la luz, llenándome de planes, de proyectos y construyendo mil cosas a la vez. Puede parecer que estoy armando una armadura tras otra de madrugada, pero en el fondo, todo ese esfuerzo es solo porque necesito cuidar lo que tenemos y proteger la única cosa en este mundo sin la cual no puedo vivir. Y esa eres tú.
        </p>
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200">
          Pero incluso cuando me acelero y siento que debo solucionarlo todo, tú me ayudas a ver que no todos los problemas tienen solución, y que a veces, simplemente, tienes que soltar.
        </p>
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-200">
          Esa tranquilidad que me das es la que me hace entender que, en este mundo que tanto amamos, no somos pilotos peleando por la misma curva. Somos el mismo equipo. Tú eres quien me da calma por la radio cuando la pista se pone resbaladiza, la que me ayuda a pensar la mejor estrategia, y juntos somos los que marcamos el mejor tiempo por vuelta. Sinceramente, no hay campeonato que me interese correr, ni línea de meta que quiera cruzar, si no estás tú ahí para celebrarlo conmigo.
        </p>
      </Section>

      {/* SECCIÓN 6: EL JURAMENTO Y EL DESEO (LINTERNA VERDE / SHREK / GATO CON BOTAS) */}
      <Section
        backgroundEffect={
          /* 🟢 EFECTO LINTERNA VERDE Y LA ESTRELLA DEL DESEO */
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/15 via-transparent to-transparent"
            />
            {/* Estrella fugaz sutil cayendo */}
            <motion.div
              initial={{ opacity: 0, y: -200, x: 200 }}
              whileInView={{ opacity: [0, 1, 0], y: 300, x: -300 }}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
              className="absolute top-0 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,0.8)]"
            />
          </>
        }
      >
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-12 text-gray-200">
          Hoy cumplimos cuatro años, y cuando calculo todas las variables de mi futuro, hay una sola constante absoluta: mi sueño no estaría completo si no estás en él.
        </p>
        
        <p className="text-2xl md:text-4xl italic font-light text-center px-6 text-white mb-12 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
          "Por eso, en el día más brillante, en la noche más oscura, siempre voy a ser tu escudo, tu apoyo y tu compañero en cada locura."
        </p>

        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-16 text-gray-200">
          Yo te amo de veritas, de veritas. Porque al final de todo, mi amor, una vida junto a ti es todo lo que puedo desear.
        </p>

        <div className="flex flex-col items-center mt-10">
          <p className="text-3xl md:text-5xl font-bold text-white tracking-widest text-center mb-6">
            Feliz aniversario.
          </p>
          <p className="text-xl md:text-2xl text-gray-400 font-light uppercase tracking-[0.3em]">
            ATT : juan 2026
          </p>
        </div>
      </Section>
    </motion.div>
  );
}

// Componente reutilizable que ahora soporta efectos visuales de fondo
function Section({ 
  children, 
  backgroundEffect, 
  opacityDelay = 0 
}: { 
  children: React.ReactNode, 
  backgroundEffect?: React.ReactNode,
  opacityDelay?: number 
}) {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative py-20 overflow-hidden">
      {/* Capa del efecto visual oculto de los héroes */}
      {backgroundEffect && (
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          {backgroundEffect}
        </div>
      )}
      
      {/* Capa del texto */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: opacityDelay, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col items-center w-full max-w-4xl z-10 relative"
      >
        {children}
      </motion.div>
    </section>
  );
}
