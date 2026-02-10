import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTratamientos, getTratamiento } from "@/lib/content";
import { parseContent, renderCleanedMarkdown } from "@/lib/markdown";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { ArrowLeft, Phone, MessageCircle, ArrowRight, Check } from "lucide-react";

const treatmentImages: Record<string, string> = {
  "fisioterapia": "/images/clinica-fisioterapia.webp",
  "masajes": "/images/clinica-masaje-paciente.jpg",
  "medicina-regenerativa": "/images/clinica-plasmaferesis.webp",
  "ozonoterapia": "/images/clinica-ozonoterapia.webp",
  "balneoterapia-respiratoria": "/images/clinica-balneoterapia-respiratoria.webp",
  "nutricion": "/images/clinica-bioimpedancia-test.webp",
  "entrenamiento-funcional": "/images/clinica-entrenamiento-funcional.jpg",
  "salud-y-belleza-de-la-piel": "/images/clinica-dermapen.webp",
  "infiltraciones": "/images/clinica-infiltracion-hombro.webp",
  "sueros": "/images/clinica-sueros-intravenosos.webp",
  "plasmaferesis": "/images/clinica-plasmaferesis.webp",
  "neuromodulacion": "/images/clinica-neuromodulacion.webp",
  "terapia-acuatica": "/images/clinica-terapia-acuatica.webp",
  "parafangos": "/images/clinica-parafangos.webp",
  "terapia-hipertermal-progresiva": "/images/instalaciones-vaporarium.webp",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTratamientos().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getTratamiento(slug);
  if (!item) return {};
  return { title: item.meta.title, description: item.meta.description };
}

export default async function TratamientoPage({ params }: Props) {
  const { slug } = await params;
  const item = getTratamiento(slug);
  if (!item) notFound();

  const image = treatmentImages[slug];
  const parsed = parseContent(item.content);
  const bodyHtml = renderCleanedMarkdown(parsed.body);

  return (
    <>
      {/* Hero with image */}
      <section className="relative min-h-[45vh] overflow-hidden bg-navy pt-32 pb-16 flex items-end">
        {image && (
          <>
            <Image
              src={image}
              alt={item.meta.title}
              fill
              className="object-cover opacity-25"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-navy/60 to-navy/40" />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
          <Button
            href="/clinica"
            variant="ghost"
            size="sm"
            className="mb-6 text-white/50 hover:text-white"
          >
            <ArrowLeft size={14} />
            Clinica de Longevidad
          </Button>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-3 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
                Tratamiento
              </span>
              <h1 className="max-w-2xl font-display text-4xl text-white lg:text-5xl xl:text-6xl">
                {item.meta.title}
              </h1>
              {parsed.intro && (
                <p className="mt-4 max-w-xl text-base font-body font-light text-white/60 leading-relaxed">
                  {parsed.intro.length > 200 ? parsed.intro.slice(0, 200) + "..." : parsed.intro}
                </p>
              )}
            </div>
            {parsed.price && (
              <div className="shrink-0 rounded-xl bg-white/10 backdrop-blur-sm px-6 py-4 text-center">
                <span className="block text-[11px] font-body uppercase tracking-wider text-white/50">Desde</span>
                <span className="block font-display text-3xl text-white mt-1">
                  {parsed.price.replace(/^Desde\s+/, "")}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="bg-cream py-section-sm lg:py-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            {/* Main content */}
            <article
              className="prose prose-lg max-w-none font-body
                prose-headings:font-display prose-headings:font-normal prose-headings:text-charcoal
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-charcoal/8
                prose-h3:text-lg prose-h3:text-navy-light-dark prose-h3:mt-8
                prose-h4:text-base prose-h4:font-medium prose-h4:text-charcoal prose-h4:mt-6
                prose-p:text-[15px] prose-p:font-light prose-p:leading-[1.8] prose-p:text-warm-gray
                prose-strong:text-charcoal prose-strong:font-medium
                prose-ul:text-[15px] prose-ul:text-warm-gray prose-ul:font-light
                prose-ol:text-[15px] prose-ol:text-warm-gray prose-ol:font-light
                prose-li:leading-relaxed
                prose-a:text-navy-light prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            {/* Sticky sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start space-y-6">
              {/* Price & CTA card */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-charcoal/5">
                {parsed.price && (
                  <div className="mb-5 pb-5 border-b border-charcoal/8">
                    <span className="text-[11px] font-body uppercase tracking-wider text-stone">Precio</span>
                    <span className="mt-1 block font-display text-3xl text-charcoal">
                      {parsed.price.replace(/^Desde\s+/, "")}
                    </span>
                    {parsed.price.startsWith("Desde") && (
                      <span className="text-xs font-body text-stone">Precio orientativo</span>
                    )}
                  </div>
                )}
                <Button href="/reserva" className="w-full mb-3">
                  Reservar tratamiento
                </Button>
                <Button href="tel:961894025" variant="outline" className="w-full">
                  <Phone size={14} />
                  961 894 025
                </Button>
                <a
                  href="https://wa.me/34662359976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full py-3 text-[13px] font-body font-medium text-navy-light hover:text-navy-light-dark transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </div>

              {/* Related programs */}
              {parsed.relatedPrograms.length > 0 && (
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-charcoal/5">
                  <h3 className="text-[11px] font-body font-medium uppercase tracking-[0.15em] text-navy-light mb-4">
                    Programas con este tratamiento
                  </h3>
                  <div className="space-y-3">
                    {parsed.relatedPrograms.map((rp) => {
                      const programSlug = rp.name
                        .toLowerCase()
                        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        .replace(/\s+/g, "-");
                      return (
                        <Link
                          key={rp.name}
                          href={`/programas/${programSlug}`}
                          className="group flex items-center justify-between gap-3 rounded-lg p-3 -mx-1 hover:bg-cream transition-colors"
                        >
                          <div className="min-w-0">
                            <span className="block text-sm font-body font-medium text-charcoal truncate">
                              {rp.name}
                            </span>
                            {rp.price && (
                              <span className="text-xs font-body text-stone">{rp.price}</span>
                            )}
                          </div>
                          <ArrowRight size={14} className="shrink-0 text-navy-light opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
