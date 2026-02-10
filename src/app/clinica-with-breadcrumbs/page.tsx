import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clínica | Balneario de Cofrentes",
  description: "Nuestra clínica de longevidad ofrece tratamientos médicos avanzados con aguas minerales naturales.",
};

export default function ClinicaPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Clínica" }]} />
      <main>
        <div className="mx-auto max-w-7xl px-6 py-section-lg lg:px-10">
          <h1 className="font-display text-4xl lg:text-5xl text-charcoal">
            Clínica de Longevidad
          </h1>
          <p className="mt-4 max-w-2xl font-body text-stone">
            Descubre nuestros protocolos médicos avanzados para el dolor crónico,
            longevidad saludable y recuperación.
          </p>
        </div>
      </main>
    </>
  );
}
