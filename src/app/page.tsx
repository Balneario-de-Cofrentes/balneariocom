import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import ProgramWizard from "@/components/sections/ProgramWizard";
import { Pricing } from "@/components/sections/Pricing";
import { ClinicaPreview } from "@/components/sections/ClinicaPreview";
import { ImageDivider } from "@/components/sections/ImageDivider";
import { Founder } from "@/components/sections/Founder";
import { Activities } from "@/components/sections/Activities";
import { FAQ } from "@/components/sections/FAQImproved";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProgramWizard />
      <ClinicaPreview />
      <ImageDivider
        image="/images/instalaciones-piscina-termal.webp"
        alt="Piscina termal exterior del Balneario de Cofrentes"
        quote="Conecte con su salud en estancias inmersivas de 10-30 dias con protocolos de vanguardia en longevidad"
      />
      <Pricing />
      <Founder />
      <Activities />
      <FAQ />
      <CTA />
    </>
  );
}
