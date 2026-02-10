import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/sections/CTA";
import { getAllSubvenciones } from "@/lib/content";
import { ArrowRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Subvenciones Recibidas",
  description:
    "Transparencia: subvenciones y ayudas publicas recibidas por el Balneario de Cofrentes para proyectos de innovacion, turismo y salud.",
};

export default function SubvencionesPage() {
  const items = getAllSubvenciones();

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="mb-4 inline-block text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-lime">
            Transparencia
          </span>
          <h1 className="max-w-3xl font-display text-5xl text-white lg:text-6xl">
            Subvenciones recibidas
          </h1>
          <p className="mt-6 max-w-xl text-lg font-body font-light text-white/60">
            Proyectos de innovacion, turismo y salud financiados con ayudas publicas,
            ordenados del mas reciente al mas antiguo.
          </p>
        </div>
      </section>

      <Section bg="cream">
        {/* Institutional logos */}
        <div className="mb-12 rounded-2xl bg-white p-8 border border-navy/5">
          <p className="mb-6 text-center text-xs font-body font-semibold uppercase tracking-[0.15em] text-warm-gray">
            Con el apoyo de:
          </p>
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <Image
                src="/images/footer-logo-1-banner.png"
                alt="Generalitat Valenciana, IVACE+I, Financiado por la Union Europea"
                width={800}
                height={75}
                className="h-12 w-auto object-contain lg:h-16"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Image
                src="/images/footer-logo-2-wide-banner.png"
                alt="Gobierno de Espana, Ministerio de Ciencia, CDTI Innovacion"
                width={600}
                height={100}
                className="h-10 w-auto object-contain lg:h-14"
              />
              <Image
                src="/images/footer-logo-4.png"
                alt="AVI - Agencia Valenciana de la Innovacio"
                width={200}
                height={140}
                className="h-10 w-auto object-contain lg:h-14"
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/footer-logo-3-banner.png"
                alt="Ministerio de Industria y Turismo, Plan de Recuperacion, GVANext, Turisme Comunitat Valenciana"
                width={800}
                height={90}
                className="h-10 w-auto object-contain lg:h-14"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/subvenciones/${item.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-navy/5 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-lime-muted text-navy">
                  <FileText size={16} strokeWidth={1.5} />
                </div>
                {(item.meta.year as number | string | undefined) && (
                  <span className="rounded-full bg-navy/5 px-3 py-0.5 text-xs font-body font-semibold text-navy">
                    {String(item.meta.year as number | string)}
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl text-charcoal group-hover:text-navy-light transition-colors line-clamp-2">
                {item.meta.title}
              </h3>
              {item.meta.description && (
                <p className="mt-3 flex-1 text-sm font-body font-light text-warm-gray line-clamp-3">
                  {item.meta.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-1.5 text-sm font-body font-semibold text-navy-light opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>Ver detalle</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
