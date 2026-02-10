import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { ArrowRight, Clock, Heart, Zap, Shield, Sparkles, Dumbbell, Leaf } from "lucide-react";
import { getAllProgramas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programas de Salud",
  description:
    "Programas de salud personalizados: desde termalismo IMSERSO hasta longevidad avanzada. Incluyen valoracion medica, alojamiento y pension completa.",
};

const featuredPrograms = [
  {
    title: "Escapada Termal",
    description: "Fin de semana de relax con circuito termal, alojamiento y pension completa.",
    duration: "2-3 noches",
    href: "/escapada-termal",
    icon: Leaf,
  },
  {
    title: "IMSERSO / Termalismo",
    description: "Programa basico termal con alojamiento, pension completa y 3 tecnicas termales diarias.",
    duration: "9-12 noches",
    href: "/programas/imserso-balneario",
    icon: Heart,
  },
  {
    title: "Termalismo Valenciano",
    description: "Programa subvencionado por la Generalitat Valenciana para residentes.",
    duration: "10 dias",
    href: "/programas/termalismo-valenciano",
    icon: Shield,
  },
];

const programCategories = [
  {
    name: "Programas de Dolor",
    icon: Zap,
    description: "Protocolos especializados para el tratamiento del dolor musculoesqueletico cronico.",
    slugs: ["programa-dolor-avanzado", "programa-dolor-intensivo", "programa-dolor-intensivo-plus"],
  },
  {
    name: "Programas Anti-inflamatorios",
    icon: Shield,
    description: "Tratamientos enfocados en reducir la inflamacion cronica y sus efectos.",
    slugs: ["programa-anti-inflamatorio-inicial", "programa-anti-inflamatorio-avanzado", "programa-anti-inflamatorio-intensivo"],
  },
  {
    name: "Programas Saludables",
    icon: Sparkles,
    description: "Programas de bienestar general para mejorar tu salud y calidad de vida.",
    slugs: ["programa-saludable-inicial", "programa-saludable-avanzado", "programa-saludable-intensivo"],
  },
  {
    name: "Programas Especializados",
    icon: Dumbbell,
    description: "Programas a medida: regeneracion, detox, fortalecimiento, belleza y longevidad personalizada.",
    slugs: [
      "programa-medicina-regenerativa", "programa-detox-molecular", "programa-fortalecimiento-avanzado",
      "programa-fortalecimiento-intensivo", "programa-belleza-termal", "programa-bienestar-termal",
      "programa-longevidad-personalizado",
    ],
  },
];

export default function ProgramasPage() {
  const allProgramas = getAllProgramas();

  const getProgramBySlug = (slug: string) => allProgramas.find((p) => p.slug === slug);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-navy pb-16 pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/programas-consulta-longevidad.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Programas
          </span>
          <h1 className="max-w-3xl font-display text-5xl text-white lg:text-6xl xl:text-7xl">
            Un programa para cada necesidad
          </h1>
          <p className="mt-6 max-w-xl text-lg font-body font-light text-white/70">
            Desde una escapada de fin de semana hasta programas de longevidad personalizada.
            Todos incluyen valoracion medica inicial.
          </p>
        </div>
      </section>

      {/* Featured programs */}
      <Section bg="cream">
        <SectionHeader
          eyebrow="Programas populares"
          title="Empieza por aqui"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {featuredPrograms.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col rounded-2xl bg-white border border-charcoal/5 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sage/5"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-navy-light">
                <p.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl text-charcoal">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm font-body font-light text-warm-gray leading-relaxed">
                {p.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-body text-stone">
                  <Clock size={12} /> {p.duration}
                </span>
                <span className="flex items-center gap-1 text-sm font-body font-medium text-navy-light transition-all duration-300 group-hover:gap-2">
                  Ver <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Pricing />

      {/* Categorized programs */}
      {programCategories.map((cat, catIdx) => {
        const programs = cat.slugs
          .map(getProgramBySlug)
          .filter(Boolean) as typeof allProgramas;
        if (programs.length === 0) return null;

        return (
          <section
            key={cat.name}
            className={`py-section-sm lg:py-section ${catIdx % 2 === 0 ? "bg-cream" : "bg-white"}`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/10 text-navy-light">
                  <cat.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-charcoal lg:text-3xl">{cat.name}</h2>
                  <p className="mt-1 text-sm font-body font-light text-warm-gray">{cat.description}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {programs.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/programas/${p.slug}`}
                    className="group flex flex-col rounded-2xl bg-white border border-charcoal/5 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sage/5"
                  >
                    <h3 className="font-display text-xl text-charcoal group-hover:text-navy-light-dark transition-colors">
                      {p.meta.title}
                    </h3>
                    {p.meta.description && (
                      <p className="mt-2 flex-1 text-[13px] font-body font-light text-warm-gray line-clamp-2 leading-relaxed">
                        {p.meta.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-[13px] font-body font-medium text-navy-light opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span>Ver programa</span>
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTA />
    </>
  );
}
