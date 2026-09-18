"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AniversarioCarta() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transiciones de color de fondo según el scroll
  // 0% -> Papel (Crema) | 20% -> Espacio (Negro) | 40% -> Azul Medianoche | 60% -> Taller (Azul oscuro tecnológico) | 80% -> Negro profundo
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.6, 0.85],
    ["#fdfbf7", "#050505", "#0a1128", "#020b14", "#000000"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["#1f2937", "#f3f4f6"]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor, color: textColor }}
      className="relative w-full min-h-[700vh] transition-colors duration-700 font-serif selection:bg-white/30"
    >
      {/* SECCIÓN 1: EL INICIO (Papel a Espacio) */}
      <Section opacityDelay={0.2}>
        <p className="text-2xl md:text-4xl leading-relaxed max-w-2xl text-center px-6">
          <span className="font-bold text-3xl md:text-5xl mb-6 block">
            Querida Mariana,
          </span>
          un día cualquiera, en un momento cualquiera... mi universo entero se reescribió.
        </p>
      </Section>

      {/* SECCIÓN 2: LA INCERTIDUMBRE (Schrödinger y Flash) */}
      <Section>
        {/* Efecto Flash oculto: un destello rápido al hacer scroll */}
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          whileInView={{ opacity: [0, 1, 0], x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 w-full h-1 bg-yellow-400/50 shadow-[0_0_30px_5px_rgba(250,204,21,0.6)] z-0 pointer-events-none"
        />
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-center px-6 relative z-10 text-gray-200">
          A veces pienso que enamorarse es como ese famoso experimento del gato en la caja: antes de abrirla, todo es incertidumbre. Nuestros miedos pueden engañarnos, hacernos temer cambiar de curso o dudar de avanzar, pero detrás de ese miedo casi siempre están las mejores oportunidades esperando a ser tomadas. Cuando decidimos abrir esa caja juntos, fuimos valientes, nos arriesgamos, y la función de onda colapsó en la mejor de las realidades posibles.
        </p>
      </Section>

      {/* SECCIÓN 3: EL ORDEN Y EL CAOS (Ultrón) */}
      <Section>
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-center px-6 text-gray-200">
          De repente, en medio de este mundo donde solemos creer que el orden y el caos son fuerzas opuestas, tú te convertiste en mi mayor certeza. Descubrí contigo que las cicatrices que tenemos solo nos hacen lo que somos, y que no hay nada en nosotros que esté roto y deba repararse. A tu lado entendí lo que significa aceptar las cosas que no puedo cambiar, tener el valor de cambiar las que sí puedo, y la sabiduría para conocer la diferencia. Encontré en ti ese orden perfecto que me da completa paz.
        </p>
      </Section>

      {/* SECCIÓN 4: EL BAILE Y EL HOGAR (Capitán América y Thor) */}
      <Section>
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-center px-6 text-gray-200">
          Por eso, cuando te conocí, supe de inmediato que había encontrado a la pareja de baile correcta, y que no quería compartir esa canción con nadie más. Si tuviera que viajar en el tiempo o cruzar el universo entero solo para asegurarme de llegar a nuestro baile, lo haría sin dudarlo. No importa cuántos mundos existan, ni las tormentas que haya que enfrentar, porque a tu lado es donde encuentro mi verdadero hogar. Dicen que todos necesitamos a alguien que nos dé valor, que nos haga nobles y que nos impulse a ser mejores; descubrir esa luz dentro de ti me ha convertido en ese hombre, en alguien digno, y siempre, en cualquier universo, te voy a elegir a ti.
        </p>
      </Section>

      {/* SECCIÓN 5: EL TALLER Y LA PISTA (Iron Man y F1) */}
      <Section>
        {/* Efecto Reactor Arc latiendo suavemente de fondo */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] rounded-full border-[2px] border-cyan-400/20 shadow-[0_0_100px_rgba(34,211,238,0.1)] z-0 pointer-events-none"
        />
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-center px-6 relative z-10 text-gray-200">
          Saber que te tengo a mi lado es lo que me impulsa todos los días. Sé que a veces mi mente va a la velocidad de la luz, llenándome de planes, de proyectos y construyendo mil cosas a la vez. Puede parecer que estoy armando una armadura tras otra de madrugada, pero en el fondo, todo ese esfuerzo es solo porque necesito cuidar lo que tenemos y proteger la única cosa en este mundo sin la cual no puedo vivir. Y esa eres tú. Pero incluso cuando me acelero y siento que debo solucionarlo todo, tú me ayudas a ver que no todos los problemas tienen solución, y que a veces, simplemente, tienes que soltar.
          <br /><br />
          Esa tranquilidad que me das es la que me hace entender que, en este mundo que tanto amamos, no somos pilotos peleando por la misma curva. Somos el mismo equipo. Tú eres quien me da calma por la radio cuando la pista se pone resbaladiza, la que me ayuda a pensar la mejor estrategia, y juntos somos los que marcamos el mejor tiempo por vuelta. Sinceramente, no hay campeonato que me interese correr, ni línea de meta que quiera cruzar, si no estás tú ahí para celebrarlo conmigo.
        </p>
      </Section>

      {/* SECCIÓN 6: EL JURAMENTO Y EL DESEO */}
      <Section>
        {/* Aura Verde Esmeralda (Linterna Verde) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent z-0 pointer-events-none"
        />
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-center px-6 text-gray-200 mb-12">
            Hoy cumplimos cuatro años, y cuando calculo todas las variables de mi futuro, hay una sola constante absoluta: mi sueño no estaría completo si no estás en él.
          </p>
          
          <p className="text-2xl md:text-4xl italic font-light text-center px-6 text-white mb-12">
            "Por eso, en el día más brillante, en la noche más oscura, siempre voy a ser tu escudo, tu apoyo y tu compañero en cada locura."
          </p>

          <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-center px-6 text-gray-200">
            Yo te amo de veritas, de veritas. Porque al final de todo, mi amor, una vida junto a ti es todo lo que puedo desear.
          </p>

          <p className="mt-16 text-3xl md:text-5xl font-bold text-white tracking-widest">
            Feliz aniversario. Juan.
          </p>
        </div>
      </Section>
    </motion.div>
  );
}

// Componente reutilizable para cada sección de texto
// Componente reutilizable para cada sección de texto
function Section({ children, opacityDelay = 0 }: { children: React.ReactNode, opacityDelay?: number }) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center relative py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: opacityDelay, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col gap-6"
      >
        {children}
      </motion.div>
    </section>
  );
}