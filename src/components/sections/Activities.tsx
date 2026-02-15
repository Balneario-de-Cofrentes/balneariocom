import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Mountain, Ship, Footprints } from "lucide-react";

const activities = [
  {
    icon: Mountain,
    title: "Visite el Volcán",
    description:
      "Volcán del que emana el gas que enriquece nuestras aguas minero-medicinales.",
    image: "/images/instalaciones-fuente.webp",
  },
  {
    icon: Ship,
    title: "Crucero Fluvial",
    description:
      "Súbase al barco para visitar los cañones del Júcar. Una experiencia impresionante que no se espera.",
    image: "/images/instalaciones-excursion-barco.webp",
  },
  {
    icon: Footprints,
    title: "Senderismo y Nordic Walking",
    description:
      "Acompáñenos en caminos de baja, media y alta dificultad por un entorno natural único.",
    image: "/images/instalaciones-excursion.webp",
  },
];

export function Activities() {
  return (
    <Section bg="white">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Text */}
        <div>
          <div className="mb-12 lg:mb-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="brand-line" />
              <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-navy-light">
                Montaña y Salud
              </span>
            </div>
            <h2 className="font-display max-w-xl text-3xl text-charcoal sm:text-4xl lg:text-5xl">
              Toda una villa termal a su alcance
            </h2>
            <p className="mt-5 max-w-xl text-base font-body text-warm-gray">
              Un calendario completo con más de 8 horas diarias de actividades saludables y de montaña todos los días del año para complementar su programa de salud.
            </p>
          </div>

          <div className="space-y-2 text-sm font-body text-warm-gray">
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              Colaboramos con SuAventura.com
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              8 horas de actividades gratuitas diarias
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              Salud y sostenibilidad en la España Vaciada
            </p>
          </div>

          <div className="mt-8 text-sm font-body text-stone">
            <p>En coche desde la A3, salida por Requena hacia Cofrentes.</p>
            <p className="mt-1">
              En tren hasta Valencia, nosotros podemos recogerle con nuestros
              autobuses regulares (consulte con antelación).
            </p>
          </div>
        </div>

        {/* Right: Activity cards */}
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex gap-5 rounded-2xl bg-cream p-5 transition-all duration-300 hover:shadow-md"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="mb-1 text-navy-light">
                  <activity.icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-charcoal">
                  {activity.title}
                </h3>
                <p className="mt-1 text-sm font-body text-warm-gray">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
