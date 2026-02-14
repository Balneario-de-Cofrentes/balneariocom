import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function About() {
  return (
    <Section bg="cream">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src="/images/instalaciones-terraza-vista.webp"
              alt="Vista exterior del Balneario de Cofrentes"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Floating stat */}
          <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-6 shadow-xl lg:-right-10">
            <span className="block font-display text-4xl text-navy-light">+130</span>
            <span className="text-sm font-body text-warm-gray">años de historia</span>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="mb-4 inline-block text-xs font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Sobre nosotros
          </span>
          <h2 className="text-4xl lg:text-5xl text-charcoal">
            De balneario tradicional a clínica de longevidad
          </h2>
          <p className="mt-6 text-lg font-body font-light leading-relaxed text-warm-gray">
            Somos el balneario más medicalizado de España. Nuestras aguas
            mineromedicinales, combinadas con las técnicas más avanzadas de
            medicina regenerativa, crean un enfoque único para el cuidado de la
            salud.
          </p>
          <p className="mt-4 text-lg font-body font-light leading-relaxed text-warm-gray">
            Nuestro equipo multidisciplinar de médicos, fisioterapeutas,
            nutricionistas y entrenadores trabaja de forma coordinada para
            diseñar un plan de tratamiento personalizado para cada persona.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/about" variant="secondary">
              Nuestra historia
            </Button>
            <Button href="/instalaciones" variant="outline">
              Ver instalaciones
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
