import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Droplets, HeartPulse, FlaskConical, Users } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Aguas mineromedicinales",
    description:
      "Manantial propio con aguas hipotermales de composición única, reconocidas por sus propiedades terapéuticas desde hace siglos.",
  },
  {
    icon: HeartPulse,
    title: "Medicina regenerativa",
    description:
      "Tratamientos avanzados de ozonoterapia, plasmaféresis, infiltraciones y neuromodulación con equipo médico especializado.",
  },
  {
    icon: FlaskConical,
    title: "Base científica",
    description:
      "Cada programa está respaldado por evidencia clínica y supervisado por un equipo multidisciplinar de profesionales de la salud.",
  },
  {
    icon: Users,
    title: "Atención personalizada",
    description:
      "Valoración médica inicial, plan de tratamiento adaptado a tus necesidades y seguimiento continuo durante tu estancia.",
  },
];

export function ValueProp() {
  return (
    <Section bg="cream">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group"
          >
            <div className="mb-5 inline-flex items-center justify-center rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-lime group-hover:text-white">
              <feature.icon size={24} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-xl text-charcoal">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm font-body font-light leading-relaxed text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
