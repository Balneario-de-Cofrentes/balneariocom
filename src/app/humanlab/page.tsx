import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { Database, FlaskConical, Users, Handshake, Globe, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "HumanLab - Research & Biobank",
  description:
    "Come do research with us. Access thousands of patients during immersive-intensive stays. Digital Biobank, Clinical Data as a Service, Science4Equity.",
};

const capabilities = [
  {
    icon: Database,
    title: "Digital Biobank",
    description:
      "Supported by CDTI Misiones 2024, we built a digital biobank to create digital twins with multi-year longitudinal data including molecular data, functional data, microbiome, genetics, epigenetics, and more.",
  },
  {
    icon: Users,
    title: "15,000+ Patients/Year",
    description:
      "Our scale allows us to find the patients that fit your requirements and who want to participate during long stays and multiple years. Virtually any selection criteria.",
  },
  {
    icon: FlaskConical,
    title: "Full Technical Team",
    description:
      "Software engineers, doctors, physiotherapists, biologists, nutritionists, psychologists who can help you plan, organize, develop, take and analyze data.",
  },
];

const cdaasFeatures = [
  "Compliant data collection",
  "Data measured by specialized physiotherapists, doctors and engineers",
  "Control groups",
  "Any data you need, with patient protocols (nutrition, sleep, exercise) during long stays",
  "Anonymized access to data of thousands of patients",
  "Support with Ethics Committee approval",
  "Your devices or technology installed in our smart rooms or facilities",
];

export default function HumanLabPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
              HumanLab
            </span>
            <span className="rounded-full bg-white/10 px-3 py-0.5 text-[10px] font-body uppercase tracking-wider text-white/50">
              Research Partnerships
            </span>
          </div>
          <h1 className="max-w-4xl font-display text-5xl text-white lg:text-6xl xl:text-7xl">
            Come do research with us
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-body font-light text-white/60 leading-relaxed">
            Access thousands of patients during immersive-intensive stays to control every aspect of your clinical trial.
            Since 2019, we collaborate with biotech companies, startups, and public institutions in research projects.
          </p>
          <div className="mt-8">
            <Button href="mailto:partners@balneario.com" size="lg">
              <Mail size={16} />
              partners@balneario.com
            </Button>
          </div>
        </div>
      </section>

      {/* Approach */}
      <Section bg="cream">
        <SectionHeader
          eyebrow="Our approach"
          title="Longevity science at scale"
        />
        <p className="mx-auto max-w-3xl text-center text-base font-body font-light text-warm-gray leading-relaxed -mt-4 mb-12">
          The base of our research in Longevity is seeking new protocols that accelerate the improvement
          of hallmarks of aging or key biomarkers during immersive intensive stays like those we provide at our clinic.
          This allows us to push the edge of the state of the art, testing new treatments, hallmarks and combinations
          to measure effective improvements based on data.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-2xl bg-white border border-charcoal/5 p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-navy-light">
                <cap.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl text-charcoal">{cap.title}</h3>
              <p className="mt-2 text-sm font-body font-light text-warm-gray leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Clinical Data as a Service */}
      <Section bg="white">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <span className="mb-3 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
              Clinical Data as a Service
            </span>
            <h2 className="font-display text-3xl text-charcoal lg:text-4xl">
              We take on research projects
            </h2>
            <p className="mt-4 text-base font-body font-light text-warm-gray leading-relaxed">
              With the recent development of our Digital Biobank, we are now in an ideal position
              to support your research with compliant, high-quality clinical data collection.
            </p>
          </div>
          <ul className="space-y-3">
            {cdaasFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-lg bg-cream/60 p-3 text-sm font-body text-warm-gray"
              >
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Science4Equity */}
      <Section bg="cream">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime/10 text-navy-light">
            <Handshake size={24} strokeWidth={1.5} />
          </div>
          <span className="mb-3 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            For startups Pre-seed to Series A
          </span>
          <h2 className="font-display text-3xl text-charcoal lg:text-4xl">
            Science4Equity
          </h2>
          <p className="mt-4 text-base font-body font-light text-warm-gray leading-relaxed">
            We understand it can be a challenge to raise a round of VC funding only to spend it on data collection
            and clinical trials. We innovate with a Science4Equity approach whereby we participate in your round
            in the form of equity in exchange for supporting your data acquisition, reducing the impact on your
            hard-raised cash.
          </p>
          <p className="mt-4 text-base font-body font-light text-warm-gray leading-relaxed">
            This will help you find early results, use the cash for your tech, and optimize for your next round.
            In occasion we might top it up with a minority investment from our family office.
            We understand startup risk and are easy going.
          </p>
          <div className="mt-8">
            <Button href="mailto:partners@balneario.com" variant="outline">
              <Mail size={14} />
              Get in touch
            </Button>
          </div>
        </div>
      </Section>

      {/* Longevity Ecosystem */}
      <Section bg="white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime/10 text-navy-light">
            <Globe size={24} strokeWidth={1.5} />
          </div>
          <span className="mb-3 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Community
          </span>
          <h2 className="font-display text-3xl text-charcoal lg:text-4xl">
            Longevity Ecosystem
          </h2>
          <p className="mt-4 text-base font-body font-light text-warm-gray leading-relaxed">
            We are an active member of the longevity ecosystem. In the last few years we have been hosts to the
            LBF4, LBF7, Longevity State Conference, Hidromed, and others. We also travel internationally to meet
            other entrepreneurs, clinics, research facilities and to speak at conferences.
          </p>
          <p className="mt-4 text-sm font-body text-warm-gray">
            Want to organize a longevity-related event at our clinic, or have our founders speak at your conference?
            Get in touch, we love to make new friends along the way.
          </p>
        </div>
      </Section>

      <CTA />
    </>
  );
}
