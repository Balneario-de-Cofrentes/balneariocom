import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/sections/CTA";
import { Building2, Stethoscope, TreePine, CalendarHeart } from "lucide-react";

export const metadata: Metadata = {
  title: "Instalaciones",
  description:
    "Mas de 200 hectareas de Villa Termal orientadas a la longevidad. Hotel, clinica, circuito termal, restaurante y entorno natural unico.",
};

const areas = [
  {
    icon: Building2,
    title: "Hoteleria y Restauracion",
    description:
      "Mas de 320 habitaciones de 3 y 4 estrellas distribuidas en mas de 200 hectareas de bosque. Restaurante buffet, dos cafeterias, multiples salones, iglesia, tienda y golf pitch&putt de 9 hoyos.",
    images: [
      "/images/instalaciones-habitacion.jpg",
      "/images/instalaciones-restaurante.webp",
      "/images/instalaciones-terraza-vista.webp",
    ],
  },
  {
    icon: Stethoscope,
    title: "La Clinica",
    description:
      "2 piscinas terapeuticas, salas de vaporarium, sauna, 6 salas de estetica, 6 salas de fisioterapia, 10 consultas medicas, sala quirurgica para medicina regenerativa e infiltraciones. Nuevo gimnasio y 6 salas de fisioterapia en construccion para 2026.",
    images: [
      "/images/instalaciones-clinica-centro-termal.webp",
      "/images/instalaciones-piscina-termal.webp",
      "/images/instalaciones-vaporarium.webp",
    ],
  },
  {
    icon: TreePine,
    title: "El Entorno",
    description:
      "La Villa Termal se ubica sobre un lago subterraneo con un Manantial Termal que justo en el edificio principal se junta con gas volcanico creando las aguas mas gaseosas naturales de Espana. Rodeado de naturaleza con rios, el Volcan Cerro de Agras y una riqueza natural unica.",
    images: [
      "/images/instalaciones-fuente.jpg",
      "/images/instalaciones-vista-alrededores.jpeg",
      "/images/instalaciones-piscina.jpg",
    ],
  },
  {
    icon: CalendarHeart,
    title: "Las Actividades",
    description:
      "Programa de actividades saludables de mas de 10 horas diarias: ejercicio, senderismo, meditacion, risoterapia, pilates, qi-kung, bailes nocturnos, conciertos. Crucero fluvial, visita al volcan, canoas y rafting, bodegas de Requena.",
    images: [
      "/images/instalaciones-excursion-barco.jpg",
      "/images/instalaciones-yoga.png",
      "/images/instalaciones-excursion.jpg",
    ],
  },
];

export default function InstalacionesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-black pb-16 pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/instalaciones-piscina-termal-hotel.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span className="mb-4 inline-block text-xs font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Instalaciones
          </span>
          <h1 className="max-w-4xl font-display text-5xl text-white lg:text-6xl xl:text-7xl">
            Mas de 200 hectareas de Villa Termal orientadas a la longevidad
          </h1>
          <p className="mt-6 max-w-xl text-lg font-body font-light text-white/70">
            El hotel mas grande de la Provincia de Valencia. Rodeado de
            naturaleza y con todos los servicios para concentrarse en lo mas
            importante: su salud.
          </p>
        </div>
      </section>

      {/* Areas */}
      {areas.map((area, i) => (
        <Section key={area.title} bg={i % 2 === 0 ? "cream" : "white"}>
          <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${i % 2 !== 0 ? "lg:[direction:rtl] lg:*:[direction:ltr]" : ""}`}>
            {/* Text */}
            <div>
              <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-white p-3 shadow-sm text-navy-light">
                <area.icon size={24} strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-4xl text-charcoal lg:text-5xl">
                {area.title}
              </h2>
              <p className="mt-6 text-base font-body font-light leading-relaxed text-gray-600">
                {area.description}
              </p>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src={area.images[0]}
                  alt={area.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={area.images[1]}
                  alt={`${area.title} detalle`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={area.images[2]}
                  alt={`${area.title} detalle`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Map */}
      <Section bg="white">
        <div className="text-center">
          <SectionHeader
            eyebrow="Ubicacion"
            title="Instalaciones en continuo crecimiento"
            align="center"
          />
          <div className="relative mx-auto max-w-4xl aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src="/images/mapa-balneario.webp"
              alt="Mapa del Balneario de Cofrentes"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
