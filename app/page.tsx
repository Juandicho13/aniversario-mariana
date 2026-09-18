"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AniversarioCarta() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transiciones de color de fondo (Aseguramos que termine en negro profundo)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.6, 0.9],
    ["#fdfbf7", "#050505", "#0a1128", "#020b14", "#050505"]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      // Se agregó bg-[#050505] como respaldo por si falla el scroll
      className="relative w-full min-h-[700vh] bg-[#050505] transition-colors duration-700 font-serif selection:bg-white/30"
    >
      {/* SECCIÓN 1: EL INICIO */}
      <Section opacityDelay={0.2}>
        {/* 💌 REFERENCIA: A todos los chicos de los que me enamoré (Lara Jean) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-900">
          <span className="font-bold text-3xl md:text-5xl mb-8 block text-center">
            Querida Mariana,
          </span>
          un día cualquiera, en un momento cualquiera... mi universo entero se reescribió.
        </p>
      </Section>

      {/* SECCIÓN 2: LA INCERTIDUMBRE */}
      <Section>
        {/* 📦 REFERENCIA: The Big Bang Theory (El gato de Schrödinger) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200">
          A veces pienso que enamorarse es como ese famoso experimento del gato en la caja: antes de abrirla, todo es incertidumbre.
        </p>
        
        {/* ⚡️ REFERENCIA: The Flash (El discurso sobre el miedo y el colapso de la realidad) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-200">
          Nuestros miedos pueden engañarnos, hacernos temer cambiar de curso o dudar de avanzar, pero detrás de ese miedo casi siempre están las mejores oportunidades esperando a ser tomadas. Cuando decidimos abrir esa caja juntos, fuimos valientes, nos arriesgamos, y la función de onda colapsó en la mejor de las realidades posibles.
        </p>
      </Section>

      {/* SECCIÓN 3: EL ORDEN Y EL CAOS */}
      <Section>
        {/* 🤖 REFERENCIA: Avengers Era de Ultrón (Conversación final de Visión y Ultrón) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200">
          De repente, en medio de este mundo donde solemos creer que el orden y el caos son fuerzas opuestas, tú te convertiste en mi mayor certeza.
        </p>

        {/* ⚡️ REFERENCIA: Flashpoint (Aceptar las cicatrices y la Oración de la Serenidad) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-200">
          Descubrí contigo que las cicatrices que tenemos solo nos hacen lo que somos, y que no hay nada en nosotros que esté roto y deba repararse. A tu lado entendí lo que significa aceptar las cosas que no puedo cambiar, tener el valor de cambiar las que sí puedo, y la sabiduría para conocer la diferencia. Encontré en ti ese orden perfecto que me da completa paz.
        </p>
      </Section>

      {/* SECCIÓN 4: EL BAILE Y EL HOGAR */}
      <Section>
        {/* 🛡️ REFERENCIA: Capitán América (El baile pendiente con Peggy Carter y viajar en el tiempo) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200">
          Por eso, cuando te conocí, supe de inmediato que había encontrado a la pareja de baile correcta, y que no quería compartir esa canción con nadie más. Si tuviera que viajar en el tiempo o cruzar el universo entero solo para asegurarme de llegar a nuestro baile, lo haría sin dudarlo.
        </p>

        {/* 🔨 REFERENCIA: Thor (Jane Foster haciéndolo digno) + 🕷️ Spider-Man (Tía May en Spider-Man 2) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-200">
          No importa cuántos mundos existan, ni las tormentas que haya que enfrentar, porque a tu lado es donde encuentro mi verdadero hogar. Dicen que todos necesitamos a alguien que nos dé valor, que nos haga nobles y que nos impulse a ser mejores; descubrir esa luz dentro de ti me ha convertido en ese hombre, en alguien digno, y siempre, en cualquier universo, te voy a elegir a ti.
        </p>
      </Section>

      {/* SECCIÓN 5: EL TALLER Y LA PISTA */}
      <Section>
        {/* ⚙️ REFERENCIA: Iron Man (Tony Stark en el sótano creando armaduras para proteger a Pepper) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200 relative z-10">
          Saber que te tengo a mi lado es lo que me impulsa todos los días. Sé que a veces mi mente va a la velocidad de la luz, llenándome de planes, de proyectos y construyendo mil cosas a la vez. Puede parecer que estoy armando una armadura tras otra de madrugada, pero en el fondo, todo ese esfuerzo es solo porque necesito cuidar lo que tenemos y proteger la única cosa en este mundo sin la cual no puedo vivir. Y esa eres tú.
        </p>

        {/* ⚡️ REFERENCIA: The Flash (Aprender a soltar lo que no tiene solución) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-8 text-gray-200 relative z-10">
          Pero incluso cuando me acelero y siento que debo solucionarlo todo, tú me ayudas a ver que no todos los problemas tienen solución, y que a veces, simplemente, tienes que soltar.
        </p>

        {/* 🏎️ REFERENCIA: Fórmula 1 (La sinergia del equipo, no rivales de pista) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 text-gray-200 relative z-10">
          Esa tranquilidad que me das es la que me hace entender que, en este mundo que tanto amamos, no somos pilotos peleando por la misma curva. Somos el mismo equipo. Tú eres quien me da calma por la radio cuando la pista se pone resbaladiza, la que me ayuda a pensar la mejor estrategia, y juntos somos los que marcamos el mejor tiempo por vuelta. Sinceramente, no hay campeonato que me interese correr, ni línea de meta que quiera cruzar, si no estás tú ahí para celebrarlo conmigo.
        </p>
      </Section>

      {/* SECCIÓN 6: EL JURAMENTO Y EL DESEO */}
      <Section>
        {/* 🐸 REFERENCIA: La Princesa y el Sapo (El sueño no está completo sin ti) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-12 text-gray-200">
          Hoy cumplimos cuatro años, y cuando calculo todas las variables de mi futuro, hay una sola constante absoluta: mi sueño no estaría completo si no estás en él.
        </p>
        
        {/* 🟢 REFERENCIA: Linterna Verde (El juramento de protección) */}
        <p className="text-2xl md:text-4xl italic font-light text-center px-6 text-white mb-12 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
          "Por eso, en el día más brillante, en la noche más oscura, siempre voy a ser tu escudo, tu apoyo y tu compañero en cada locura."
        </p>

        {/* 🧅 REFERENCIA: Shrek (De veritas) + 🐱 El Gato con Botas (Una vida contigo es todo lo que deseo) */}
        <p className="text-xl md:text-3xl leading-relaxed max-w-3xl text-justify px-6 mb-16 text-gray-200">
          Yo te amo de veritas, de veritas. Porque al final de todo, mi amor, una vida junto a ti es todo lo que puedo desear.
        </p>

        <p className="mt-8 text-3xl md:text-5xl font-bold text-white tracking-widest text-center">
          Feliz aniversario. Juan.
        </p>
      </Section>
    </motion.div>
  );
}

// Componente reutilizable ajustado para mejor espaciado
function Section({ children, opacityDelay = 0 }: { children: React.ReactNode, opacityDelay?: number }) {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: opacityDelay, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col items-center w-full max-w-4xl"
      >
        {children}
      </motion.div>
    </section>
  );
}
