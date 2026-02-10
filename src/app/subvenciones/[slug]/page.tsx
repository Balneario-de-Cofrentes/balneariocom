import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { getAllSubvenciones, getSubvencion } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSubvenciones().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getSubvencion(slug);
  if (!item) return {};
  return {
    title: item.meta.title,
    description: item.meta.description,
  };
}

export default async function SubvencionPage({ params }: Props) {
  const { slug } = await params;
  const item = getSubvencion(slug);
  if (!item) notFound();

  return (
    <>
      <section className="bg-navy pb-16 pt-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Button
            href="/subvenciones"
            variant="ghost"
            size="sm"
            className="mb-8 text-white/50 hover:text-white"
          >
            <ArrowLeft size={14} />
            Subvenciones
          </Button>
          <span className="mb-3 inline-block text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-lime">
            Subvencion {item.meta.year ? `- ${item.meta.year}` : ""}
          </span>
          <h1 className="max-w-3xl font-display text-4xl text-white lg:text-5xl">
            {item.meta.title}
          </h1>
        </div>
      </section>

      <Section bg="cream" narrow>
        <article
          className="prose prose-lg max-w-none font-body
            prose-headings:font-display prose-headings:font-normal prose-headings:text-charcoal
            prose-h2:text-3xl prose-h3:text-xl prose-h3:text-navy-light-dark
            prose-p:text-base prose-p:font-light prose-p:leading-[1.8] prose-p:text-warm-gray
            prose-strong:text-charcoal prose-strong:font-medium
            prose-a:text-navy-light prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(item.content) }}
        />

        {/* Institutional logos */}
        <div className="mt-12 rounded-2xl bg-white p-6 border border-navy/5">
          <p className="mb-4 text-xs font-body font-semibold uppercase tracking-[0.15em] text-warm-gray">
            Con el apoyo de:
          </p>
          <div className="space-y-4">
            <Image
              src="/images/footer-logo-1-banner.png"
              alt="Generalitat Valenciana, IVACE+I, Financiado por la Union Europea"
              width={600}
              height={56}
              className="h-10 w-auto object-contain lg:h-12"
            />
            <div className="flex flex-wrap items-center gap-4">
              <Image
                src="/images/footer-logo-2-wide-banner.png"
                alt="Gobierno de Espana, CDTI Innovacion"
                width={400}
                height={70}
                className="h-8 w-auto object-contain lg:h-10"
              />
              <Image
                src="/images/footer-logo-4.png"
                alt="AVI - Agencia Valenciana de la Innovacio"
                width={150}
                height={105}
                className="h-8 w-auto object-contain lg:h-10"
              />
            </div>
            <Image
              src="/images/footer-logo-3-banner.png"
              alt="Ministerio de Industria y Turismo, Plan de Recuperacion, GVANext, Turisme"
              width={600}
              height={68}
              className="h-8 w-auto object-contain lg:h-10"
            />
          </div>
        </div>

        <div className="mt-8">
          <Button href="/subvenciones" variant="outline">
            Volver a subvenciones
          </Button>
        </div>
      </Section>

      <CTA />
    </>
  );
}
