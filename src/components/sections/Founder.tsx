import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Founder() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-section-sm lg:py-section">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src="/images/dr-miguel-angel-portrait.jpg"
                alt="Miguel Angel Fernandez, fundador del Balneario de Cofrentes"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="brand-line" />
              <span className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-lime">
                Nuestro fundador
              </span>
            </div>

            <h2 className="text-4xl text-white lg:text-5xl">
              Miguel Angel Fernandez
            </h2>
            <p className="mt-3 text-base font-body font-light text-white/50 italic">
              Fundador, Director médico y autor de &quot;Las 10 claves para una Longevidad Saludable&quot;
            </p>

            {/* Quote */}
            <div className="mt-10 relative">
              <blockquote className="border-l-2 border-lime/40 pl-6">
                <p className="font-display text-xl leading-relaxed text-white/80 lg:text-2xl">
                  Este no es un balneario tradicional. Es el resultado de 35 años de trabajo
                  para crear la clínica de longevidad más grande de Europa.
                </p>
              </blockquote>
            </div>

            <p className="mt-8 text-[15px] font-body font-light leading-relaxed text-white/50">
              280 habitaciones, Clínica de Longevidad, Circuito Termal, Human Lab,
              Laboratorio, y más de 300 profesionales incluyendo 12 médicos y 3 ingenieros
              especializados en Inteligencia Artificial. Una apuesta por la tecnología
              y la longevidad que no existe en ningún otro balneario del mundo.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { number: "35+", label: "años operando" },
                { number: "12", label: "médicos en plantilla" },
                { number: "8", label: "proyectos de investigación" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block font-display text-3xl text-lime lg:text-4xl">
                    {stat.number}
                  </span>
                  <span className="mt-1 block text-xs font-body text-white/40">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
