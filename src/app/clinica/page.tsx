import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Clinica de Longevidad",
  description:
    "La clinica de longevidad mas grande de Europa. Tratamientos de fisioterapia, medicina regenerativa, ozonoterapia, balneoterapia y mas.",
};

interface TreatmentInfo {
  title: string;
  slug: string;
  image: string;
  description: string;
  price?: string;
}

const categories: { name: string; id: string; description: string; treatments: TreatmentInfo[] }[] = [
  {
    name: "Medicina Avanzada",
    id: "medicina",
    description: "Tratamientos de vanguardia en medicina regenerativa, ozonoterapia y terapias intravenosas.",
    treatments: [
      {
        title: "Medicina Regenerativa",
        slug: "medicina-regenerativa",
        image: "/images/clinica-plasmaferesis.webp",
        description: "Terapias avanzadas para la regeneracion celular y el rejuvenecimiento biologico.",
        price: "Desde 950€",
      },
      {
        title: "Ozonoterapia",
        slug: "ozonoterapia",
        image: "/images/clinica-ozonoterapia.webp",
        description: "Tratamiento con ozono para mejorar la oxigenacion, reducir inflamacion y combatir el dolor.",
        price: "Desde 90€",
      },
      {
        title: "Plasmaferesis",
        slug: "plasmaferesis",
        image: "/images/clinica-plasmaferesis.webp",
        description: "Tratamiento de purificacion sanguinea para mejorar la salud vascular y sistemica.",
      },
      {
        title: "Sueros Intravenosos",
        slug: "sueros",
        image: "/images/clinica-sueros-intravenosos.webp",
        description: "Terapia intravenosa con vitaminas, minerales y antioxidantes para el bienestar general.",
      },
      {
        title: "Infiltraciones",
        slug: "infiltraciones",
        image: "/images/clinica-infiltracion-hombro.webp",
        description: "Infiltraciones terapeuticas para el alivio del dolor articular y muscular.",
      },
      {
        title: "Neuromodulacion",
        slug: "neuromodulacion",
        image: "/images/clinica-neuromodulacion.webp",
        description: "Tecnicas avanzadas de estimulacion nerviosa para el manejo del dolor cronico.",
      },
    ],
  },
  {
    name: "Terapia Termal",
    id: "termal",
    description: "Aprovechamos las propiedades de nuestras aguas mineromedicinales en protocolos terapeuticos.",
    treatments: [
      {
        title: "Balneoterapia Respiratoria",
        slug: "balneoterapia-respiratoria",
        image: "/images/clinica-balneoterapia-respiratoria.webp",
        description: "Inhalaciones y tratamientos con aguas mineromedicinales para las vias respiratorias.",
      },
      {
        title: "Terapia Acuatica",
        slug: "terapia-acuatica",
        image: "/images/clinica-terapia-acuatica.webp",
        description: "Rehabilitacion en agua termal para mejorar movilidad y reducir impacto articular.",
      },
      {
        title: "Parafangos",
        slug: "parafangos",
        image: "/images/clinica-parafangos.webp",
        description: "Aplicacion de lodos termales con propiedades antiinflamatorias y descontracturantes.",
      },
      {
        title: "Terapia Hipertermal Progresiva",
        slug: "terapia-hipertermal-progresiva",
        image: "/images/instalaciones-vaporarium.webp",
        description: "Protocolo progresivo de calor termal para la desintoxicacion y mejora circulatoria.",
      },
    ],
  },
  {
    name: "Fisioterapia y Bienestar",
    id: "fisioterapia",
    description: "Terapias manuales, ejercicio supervisado y tecnicas de relajacion para la recuperacion funcional.",
    treatments: [
      {
        title: "Fisioterapia",
        slug: "fisioterapia",
        image: "/images/clinica-fisioterapia.webp",
        description: "Rehabilitacion y tratamiento del dolor a traves de tecnicas manuales y terapeuticas avanzadas.",
        price: "Desde 50€",
      },
      {
        title: "Masajes",
        slug: "masajes",
        image: "/images/clinica-masaje-paciente.jpg",
        description: "Masajes terapeuticos y relajantes adaptados a las necesidades de cada paciente.",
      },
      {
        title: "Entrenamiento Funcional",
        slug: "entrenamiento-funcional",
        image: "/images/clinica-entrenamiento-funcional.jpg",
        description: "Programas de ejercicio supervisado para mejorar fuerza, movilidad y equilibrio.",
      },
    ],
  },
  {
    name: "Nutricion y Estetica",
    id: "nutricion",
    description: "Planes nutricionales personalizados y tratamientos dermatologicos avanzados.",
    treatments: [
      {
        title: "Nutricion",
        slug: "nutricion",
        image: "/images/clinica-bioimpedancia-test.webp",
        description: "Planes nutricionales personalizados basados en bioimpedancia y analisis de composicion corporal.",
      },
      {
        title: "Salud y Belleza de la Piel",
        slug: "salud-y-belleza-de-la-piel",
        image: "/images/clinica-dermapen.webp",
        description: "Tratamientos dermatologicos avanzados para el cuidado y rejuvenecimiento de la piel.",
      },
    ],
  },
];

export default function ClinicaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-navy pb-16 pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/clinica-doctores-analiticas.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-navy/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Clinica de Longevidad
          </span>
          <h1 className="max-w-3xl font-display text-5xl text-white lg:text-6xl xl:text-7xl">
            Tratamientos que transforman tu salud
          </h1>
          <p className="mt-6 max-w-xl text-lg font-body font-light text-white/60">
            Un enfoque integral que combina medicina tradicional con las tecnicas
            mas avanzadas de regeneracion y bienestar.
          </p>
        </div>
      </section>

      {/* Category sections */}
      {categories.map((cat, catIdx) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`py-section-sm lg:py-section ${catIdx % 2 === 0 ? "bg-cream" : "bg-white"}`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Category header */}
            <div className="mb-10 max-w-2xl">
              <span className="mb-3 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
                {cat.treatments.length} tratamientos
              </span>
              <h2 className="font-display text-3xl text-charcoal lg:text-4xl">
                {cat.name}
              </h2>
              <p className="mt-3 text-base font-body font-light text-warm-gray leading-relaxed">
                {cat.description}
              </p>
            </div>

            {/* Treatment cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.treatments.map((t) => (
                <Link
                  key={t.slug}
                  href={`/clinica/${t.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-charcoal/5 transition-all duration-300 hover:shadow-lg hover:shadow-sage/5 hover:-translate-y-0.5"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {t.price && (
                      <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-body font-medium text-charcoal">
                        {t.price}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl text-charcoal">
                      {t.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] font-body font-light text-warm-gray leading-relaxed">
                      {t.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[13px] font-body font-medium text-navy-light transition-all duration-300 group-hover:gap-3">
                      <span>Ver tratamiento</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTA />
    </>
  );
}
