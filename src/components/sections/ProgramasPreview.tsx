"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const programas = [
  {
    title: "Escapada Termal",
    description: "Fin de semana de relax con circuito termal, alojamiento y pension completa.",
    duration: "2-3 noches",
    slug: "escapada-termal",
    highlight: true,
  },
  {
    title: "Programa Saludable",
    description: "Estancia termal con tratamientos basicos para mejorar tu bienestar general.",
    duration: "7-14 dias",
    slug: "programa-saludable-inicial",
    highlight: false,
  },
  {
    title: "Programa Anti-inflamatorio",
    description: "Tratamiento especializado para reducir inflamacion cronica y dolor articular.",
    duration: "7-14 dias",
    slug: "programa-anti-inflamatorio-inicial",
    highlight: false,
  },
  {
    title: "Programa Dolor",
    description: "Plan intensivo de fisioterapia y balneoterapia para el manejo del dolor cronico.",
    duration: "7-14 dias",
    slug: "programa-dolor-avanzado",
    highlight: false,
  },
  {
    title: "Programa Longevidad",
    description: "Nuestro programa mas completo: medicina regenerativa, nutricion y entrenamiento funcional.",
    duration: "Personalizado",
    slug: "programa-longevidad-personalizado",
    highlight: true,
  },
  {
    title: "IMSERSO",
    description: "Programa de termalismo social con todos los beneficios del balneario a precio subvencionado.",
    duration: "10-12 dias",
    slug: "imserso-balneario",
    highlight: false,
  },
];

export function ProgramasPreview() {
  return (
    <Section bg="dark" id="programas">
      <SectionHeader
        eyebrow="Programas"
        title="Un programa para cada necesidad"
        description="Desde una escapada de fin de semana hasta programas de longevidad personalizada. Todos incluyen valoracion medica inicial."
        dark
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programas.map((programa, i) => (
          <motion.div
            key={programa.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={`/programas/${programa.slug}`}
              className={`group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                programa.highlight
                  ? "bg-lime text-white hover:bg-lime-dark"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="mb-auto">
                <h3
                  className={`font-display text-2xl ${
                    programa.highlight ? "text-white" : "text-white"
                  }`}
                >
                  {programa.title}
                </h3>
                <p
                  className={`mt-3 text-sm font-body font-light leading-relaxed ${
                    programa.highlight ? "text-white/80" : "text-white/60"
                  }`}
                >
                  {programa.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div
                  className={`flex items-center gap-1.5 text-xs font-body ${
                    programa.highlight ? "text-white/70" : "text-white/40"
                  }`}
                >
                  <Clock size={12} />
                  <span>{programa.duration}</span>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-body font-medium transition-transform duration-300 group-hover:translate-x-1 ${
                    programa.highlight ? "text-white" : "text-navy-light"
                  }`}
                >
                  <span>Ver programa</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          href="/programas"
          variant="outline"
          size="lg"
          className="border-white/20 text-white hover:bg-white hover:text-charcoal"
        >
          Ver todos los programas
        </Button>
      </div>
    </Section>
  );
}
