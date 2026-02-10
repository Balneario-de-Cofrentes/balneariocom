import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Phone, MessageCircle } from "lucide-react";
import { SimplifiedForm } from "@/components/forms/SimplifiedForm";

export const metadata: Metadata = {
  title: "Reservar",
  description:
    "Reserve su estancia en el Balneario de Cofrentes. Complete el formulario y le llamaremos para confirmar.",
};

export default function ReservaPage() {
  return (
    <>
      <section className="bg-black pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="mb-4 inline-block text-xs font-body font-medium uppercase tracking-[0.2em] text-coral">
            Reservas
          </span>
          <h1 className="max-w-3xl font-display text-5xl text-white lg:text-6xl">
            Reservar en 2 minutos
          </h1>
          <p className="mt-6 max-w-xl text-lg font-body font-light text-white/70">
            Complete sus datos basicos facilmente y sin coste y le llamaremos
            para confirmar su solicitud y encontrar fechas. Nosotros nos
            encargamos de todo para facilitarle la vida.
          </p>
        </div>
      </section>

      <Section bg="cream">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="font-display text-2xl text-charcoal">
                Registrar Solicitud
              </h2>
              <p className="mt-2 mb-8 text-sm font-body font-light text-gray-600">
                Le llamaremos en horario laboral lo antes posible.
              </p>

              <SimplifiedForm />
            </div>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white p-6">
              <h3 className="font-display text-xl text-charcoal">Contacto directo</h3>
              <div className="mt-4 space-y-3">
                <a
                  href="tel:+34961894025"
                  className="flex items-center gap-3 text-sm font-body text-gray-600 transition-colors hover:text-coral"
                >
                  <Phone size={16} className="text-coral" />
                  961 894 025
                </a>
                <a
                  href="https://wa.me/34662359976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-body text-gray-600 transition-colors hover:text-coral"
                >
                  <MessageCircle size={16} className="text-coral" />
                  WhatsApp: 662 35 99 76
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-navy p-6 text-white">
              <h3 className="font-display text-xl">Derecho a IMSERSO</h3>
              <p className="mt-3 text-sm font-body font-light text-white/70">
                Usted y su pareja tienen derecho al programa IMSERSO balneario
                si uno de ustedes tiene mas de 65 anos o una pension.
              </p>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
              <h3 className="font-display text-xl text-charcoal">Como llegar</h3>
              <div className="mt-3 space-y-2 text-sm font-body font-light text-gray-600">
                <p>
                  <strong className="font-medium text-charcoal">En coche:</strong>{" "}
                  Desde la A3, salida por Requena hacia Cofrentes.
                </p>
                <p>
                  <strong className="font-medium text-charcoal">En tren:</strong>{" "}
                  Hasta Valencia, nosotros podemos recogerle con nuestros
                  autobuses regulares.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
