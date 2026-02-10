"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const featured = {
  title: "Medicina Regenerativa",
  slug: "medicina-regenerativa",
  image: "/images/clinica-plasmaferesis.webp",
  description:
    "Terapias de vanguardia para la regeneracion celular: plasmaferesis, ozonoterapia, sueros intravenosos y protocolos personalizados de longevidad.",
};

const treatments = [
  {
    title: "Fisioterapia",
    slug: "fisioterapia",
    image: "/images/clinica-fisioterapia.webp",
  },
  {
    title: "Ozonoterapia",
    slug: "ozonoterapia",
    image: "/images/clinica-ozonoterapia.webp",
  },
  {
    title: "Balneoterapia",
    slug: "balneoterapia-respiratoria",
    image: "/images/clinica-balneoterapia-respiratoria.webp",
  },
  {
    title: "Masajes",
    slug: "masajes",
    image: "/images/clinica-masaje-paciente.jpg",
  },
  {
    title: "Nutricion",
    slug: "nutricion",
    image: "/images/clinica-bioimpedancia-test.webp",
  },
];

export function ClinicaPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-section-sm lg:py-section">
      {/* Warm background glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gold/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-center gap-4 lg:mb-16"
        >
          <span className="brand-line" />
          <span className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-navy-light">
            Clinica de Longevidad
          </span>
        </motion.div>

        <div className="mb-12 max-w-3xl lg:mb-16">
          <h2 className="text-3xl text-charcoal sm:text-4xl lg:text-5xl">
            Tratamientos que transforman tu salud
          </h2>
          <p className="mt-5 text-base font-body font-light leading-relaxed text-warm-gray">
            Un enfoque integral que combina medicina tradicional con las tecnicas
            mas avanzadas de regeneracion y bienestar.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* Featured large card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <Link
              href={`/clinica/${featured.slug}`}
              className="group relative block h-full min-h-[400px] overflow-hidden rounded-2xl"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <span className="mb-2 inline-block text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-lime">
                  Destacado
                </span>
                <h3 className="font-display text-3xl text-white lg:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-md text-sm font-body font-light text-white/60 leading-relaxed">
                  {featured.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-body font-medium text-white/80 transition-all duration-500 group-hover:gap-3 group-hover:text-white">
                  <span>Descubrir</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Small cards */}
          {treatments.slice(0, 4).map((treatment, i) => (
            <motion.div
              key={treatment.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <Link
                href={`/clinica/${treatment.slug}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl"
              >
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-xl text-white">
                    {treatment.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/clinica" variant="outline" size="lg">
            Ver todos los tratamientos
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}
