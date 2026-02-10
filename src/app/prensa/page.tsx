import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/sections/CTA";
import { Mail, Download, Camera, Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "Kit de Prensa",
  description:
    "Kit de prensa del Balneario de Cofrentes. Contacto para medios, entrevistas, logos y recursos para periodistas.",
};

const pressResources = [
  {
    icon: Mic,
    title: "Quienes somos?",
    description:
      "Si quieres escribir sobre nosotros, probablemente quieras leer primero la pagina Sobre Nosotros, en la que explicamos mas sobre la historia y mision de nuestra empresa familiar.",
    href: "/about",
    cta: "Sobre Nosotros",
  },
  {
    icon: Camera,
    title: "Entrevistas",
    description:
      "Podeis venir al balneario a grabar y conocernos, aunque tambien hacemos videoconferencias a menudo. Tambien contamos con nuestro propio estudio de grabacion en el balneario para podcasts.",
    href: "mailto:prensa@balneario.com",
    cta: "Contactar",
  },
  {
    icon: Download,
    title: "Kit de prensa",
    description:
      "Si estais buscando logos podeis encontrarlos aqui en SVG. Si buscais fotografias, podeis usar cualquiera de nuestra web dando credito en el pie de foto. Contactad para alta resolucion.",
    href: "mailto:prensa@balneario.com",
    cta: "Solicitar recursos",
  },
];

export default function PrensaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="mb-4 inline-block text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-lime">
            Medios
          </span>
          <h1 className="max-w-3xl font-display text-5xl text-white lg:text-6xl">
            Kit de Prensa
          </h1>
          <p className="mt-6 max-w-xl text-lg font-body font-light text-white/60">
            Recursos para periodistas y medios de comunicacion.
          </p>
        </div>
      </section>

      <Section bg="cream">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Contact + Resources */}
          <div>
            {/* Contact */}
            <div className="mb-12 rounded-2xl bg-white p-8 border border-navy/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lime-muted text-navy">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-2xl text-charcoal">
                  Contacto de Prensa
                </h2>
              </div>
              <p className="text-sm font-body font-light leading-relaxed text-warm-gray">
                Si quereis entrevistar a nuestros fundadores, podeis escribir a{" "}
                <a
                  href="mailto:prensa@balneario.com"
                  className="font-semibold text-navy-light hover:underline"
                >
                  prensa@balneario.com
                </a>
              </p>
            </div>

            {/* Resource cards */}
            <div className="space-y-4">
              {pressResources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.href}
                  className="group flex gap-5 rounded-2xl bg-white p-6 border border-navy/5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-muted text-navy transition-colors group-hover:bg-lime group-hover:text-white">
                    <resource.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-charcoal">
                      {resource.title}
                    </h3>
                    <p className="mt-1 text-sm font-body font-light leading-relaxed text-warm-gray">
                      {resource.description}
                    </p>
                    <span className="mt-3 inline-block text-sm font-body font-semibold text-navy-light">
                      {resource.cta}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Logos */}
          <div>
            <h2 className="mb-6 font-display text-3xl text-charcoal">
              Logotipos
            </h2>
            <p className="mb-8 text-sm font-body font-light leading-relaxed text-warm-gray">
              Descarga nuestros logos en diferentes formatos. Para uso en fondos
              oscuros, utiliza la version en blanco. Contacta con nosotros para
              versiones en alta resolucion o formatos adicionales.
            </p>

            {/* Logo previews */}
            <div className="space-y-4">
              {/* Dark background logo */}
              <div className="flex items-center justify-center rounded-2xl bg-navy p-10">
                <Image
                  src="/images/logo.png"
                  alt="Logo Balneario de Cofrentes (fondo oscuro)"
                  width={260}
                  height={60}
                  className="h-14 w-auto"
                />
              </div>

              {/* Light background logo */}
              <div className="flex items-center justify-center rounded-2xl bg-white border border-navy/10 p-10">
                <Image
                  src="/images/logo.png"
                  alt="Logo Balneario de Cofrentes (fondo claro)"
                  width={260}
                  height={60}
                  className="h-14 w-auto brightness-0"
                />
              </div>

              {/* Cream background logo */}
              <div className="flex items-center justify-center rounded-2xl bg-cream-dark p-10">
                <Image
                  src="/images/logo.png"
                  alt="Logo Balneario de Cofrentes (fondo crema)"
                  width={260}
                  height={60}
                  className="h-14 w-auto brightness-0 opacity-80"
                />
              </div>
            </div>

            <p className="mt-6 text-xs font-body text-warm-gray">
              Estos logos estan disponibles en PNG. Para SVG o alta resolucion,
              contacta a{" "}
              <a
                href="mailto:prensa@balneario.com"
                className="text-navy-light hover:underline"
              >
                prensa@balneario.com
              </a>
            </p>
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
