"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Palmtree, Heart, Sparkles, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

const profiles = [
  {
    icon: Palmtree,
    title: "Turismo Relax",
    description:
      "Si solo quiere una escapada con alojamiento y acceso al Balneario y alguna actividad suelta.",
    cta: "Escapada termal",
    href: "/escapada-termal",
  },
  {
    icon: Heart,
    title: "Termalistas",
    description:
      "Si tiene derecho a IMSERSO o Termalismo Valenciano, le ayudamos a gestionar su plaza en 1 minuto.",
    cta: "Programa IMSERSO",
    href: "/programas/imserso-balneario",
  },
  {
    icon: Sparkles,
    title: "Club Longevidad",
    description:
      "Si esta interesado en los Programas de Longevidad (que puede combinar con programa IMSERSO si tiene derecho) complete el formulario y le tramitaremos su reserva preferente con alojamiento premium.",
    cta: "Ver programas",
    href: "/programas",
  },
  {
    icon: Crown,
    title: "Club Longevidad PRO",
    description:
      "Si lo que esta buscando es una propuesta personalizada con las terapias mas avanzadas, complete el formulario y nuestros especialistas le llamaran para proponerle el mejor protocolo de longevidad.",
    cta: "Contactar",
    href: "/reserva",
  },
];

export function AudienceSelector() {
  return (
    <Section bg="cream" id="perfiles">
      <div className="mb-12 lg:mb-16">
        <div className="mb-4 flex items-center gap-3">
          <span className="brand-line" />
          <span className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-navy-light">
            Tu perfil
          </span>
        </div>
        <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl text-charcoal">
          Encuentra tu experiencia ideal
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={profile.href}
              className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm border border-charcoal/5 transition-all duration-500 hover:border-lime/20 hover:shadow-xl hover:shadow-navy/5 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lime-muted text-navy transition-colors duration-300 group-hover:bg-lime group-hover:text-white">
                <profile.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl text-charcoal">{profile.title}</h3>
              <p className="mt-2 flex-1 text-[13px] font-body font-light leading-relaxed text-warm-gray">
                {profile.description}
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-[13px] font-body font-semibold text-navy-light transition-all duration-300 group-hover:gap-2.5">
                <span>{profile.cta}</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
