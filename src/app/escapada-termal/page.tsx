import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { Check, TreePine, Ship, Droplets } from "lucide-react";

export const metadata: Metadata = {
  title: "Escapada Termal",
  description:
    "Ven al Balneario de Cofrentes a una escapada termal con tu familia. Aguas volcanicas, crucero fluvial, actividades y relax.",
};

const includes = [
  "Alojamiento en el hotel",
  "Desayuno, comida o cena, usted decide",
  "1 acceso al Circuito Termal con recorrido completo",
  "Cama de burbujas de aire, chorros cervicales y lumbares",
  "Pediluvio, ducha circular, vaporarium y sala nebulizada",
];

const highlights = [
  {
    icon: TreePine,
    title: "Naturaleza",
    description: "Rodeados del bosque valenciano y en la confluencia de los rios Jucar y Cabriel.",
    image: "/images/instalaciones-vista-alrededores.jpeg",
  },
  {
    icon: Ship,
    title: "Actividades",
    description: "Piraguas, kayaks, rafting, nordic walking, barranquismo, visita al volcan, crucero fluvial.",
    image: "/images/instalaciones-excursion-barco.jpg",
  },
  {
    icon: Droplets,
    title: "Tratamientos",
    description: "Mucho mas que wellness. Anade tratamientos de la clinica de longevidad a tu escapada.",
    image: "/images/instalaciones-piscina-termal.webp",
  },
];

export default function EscapadaTermalPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-black pb-16 pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/instalaciones-piscina-recreativa.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span className="mb-4 inline-block text-xs font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Escapada Termal
          </span>
          <h1 className="max-w-4xl font-display text-5xl text-white lg:text-6xl xl:text-7xl">
            Ven a conocernos y disfrutar de unos dias de descanso y salud
          </h1>
          <div className="mt-8">
            <Button href="/reserva" size="lg">
              Reservar escapada
            </Button>
          </div>
        </div>
      </section>

      {/* Que incluye */}
      <Section bg="cream">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="La experiencia"
              title="Que incluye la escapada termal?"
              description="Nuestra escapada termal es la version mas sencilla de los programas del Balneario. Perfecta para una primera toma de contacto."
            />
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-body">
                  <Check size={16} className="mt-0.5 shrink-0 text-navy-light" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-body font-light text-gray-400 italic">
              Puede anadir tratamientos y excursiones adicionales. Reserve con
              antelacion ya que los huecos se llenan rapidamente.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/instalaciones-terapia-termal.webp"
              alt="Circuito termal del Balneario"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      {/* Highlights */}
      <Section bg="white">
        <div className="grid gap-6 lg:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="overflow-hidden rounded-2xl bg-cream">
              <div className="relative aspect-[16/9]">
                <Image
                  src={h.image}
                  alt={h.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 text-navy-light">
                  <h.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-charcoal">{h.title}</h3>
                <p className="mt-2 text-sm font-body font-light text-gray-600">
                  {h.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
