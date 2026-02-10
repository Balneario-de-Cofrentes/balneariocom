"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Mountain, Ship, Footprints } from "lucide-react";

const activities = [
  {
    icon: Mountain,
    title: "Visite el Volcan",
    description:
      "Volcan del que emana el gas que enriquece nuestras aguas minero-medicinales.",
    image: "/images/instalaciones-fuente.jpg",
  },
  {
    icon: Ship,
    title: "Crucero Fluvial",
    description:
      "Subase al barco para visitar los canones del Jucar. Una experiencia impresionante que no se espera.",
    image: "/images/instalaciones-excursion-barco.jpg",
  },
  {
    icon: Footprints,
    title: "Senderismo y Nordic Walking",
    description:
      "Acompanenos en caminos de baja, media y alta dificultad por un entorno natural unico.",
    image: "/images/instalaciones-excursion.jpg",
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
              <span className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-navy-light">
                Montana y Salud
              </span>
            </div>
            <h2 className="max-w-xl text-3xl text-charcoal sm:text-4xl lg:text-5xl">
              Toda una villa termal a su alcance
            </h2>
            <p className="mt-5 max-w-xl text-base font-body font-light leading-relaxed text-warm-gray">
              Un calendario completo con mas de 8 horas diarias de actividades saludables y de montana todos los dias del ano para complementar su programa de salud.
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
              Salud y sostenibilidad en la Espana Vaciada
            </p>
          </div>

          <div className="mt-8 text-sm font-body text-stone">
            <p>En coche desde la A3, salida por Requena hacia Cofrentes.</p>
            <p className="mt-1">
              En tren hasta Valencia, nosotros podemos recogerle con nuestros
              autobuses regulares (consulte con antelacion).
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
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="96px"
                />
              </div>
              <div>
                <div className="mb-1 text-navy-light">
                  <activity.icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-charcoal">
                  {activity.title}
                </h3>
                <p className="mt-1 text-sm font-body font-light text-warm-gray">
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
