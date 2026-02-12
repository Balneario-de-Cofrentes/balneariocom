import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Termalismo IMSERSO",
    price: "427",
    priceNote: "* Sujeto a subvención IMSERSO",
    duration: "9 noches",
    description:
      "Es el programa termal básico del balneario, que puede ampliar, si lo desea, con diagnósticos y tratamientos según sus necesidades.",
    features: [
      "10 días / 9 noches en habitación doble compartida",
      "Pensión completa",
      "Consulta inicial con el médico",
      "3 técnicas termales diarias",
    ],
    cta: "Solicitar plaza",
    href: "/programas/imserso-balneario",
    featured: false,
  },
  {
    name: "Club Longevidad",
    price: "627",
    priceNote: "",
    duration: "9-14 noches",
    description:
      "Programas orientados al alivio del dolor, la inflamación, bienestar, composición corporal, etc. Su médico le asesorará y hará modificaciones según necesidades.",
    features: [
      "Todos los servicios del programa básico",
      "Diagnósticos y tratamientos adicionales según programa",
      "Habitación premium",
      "WIFI rápido en la habitación",
    ],
    cta: "Ver programas",
    href: "/programas",
    featured: true,
  },
  {
    name: "Longevidad PRO",
    price: "2.000",
    priceNote: "",
    duration: "Personalizado",
    description:
      "Para los que se toman su salud en serio y quieren un programa a medida con una revisión integral. El otro miembro de la pareja puede elegir un programa más básico.",
    features: [
      "Todos los servicios de Club Longevidad",
      "Diagnósticos y tratamientos de vanguardia",
      "1 consulta integrativa por vídeo antes de su llegada",
      "1 consulta médica integrativa de 1 hora",
      "Bioimpedancia y consulta de composición corporal",
    ],
    cta: "Contactar especialista",
    href: "/reserva",
    featured: false,
  },
];

export function Pricing() {
  return (
    <Section bg="white" id="pricing">
      <div className="mb-12 text-center lg:mb-16">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="brand-line" />
          <span className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-navy-light">
            Longevidad accesible
          </span>
          <span className="brand-line rotate-180" />
        </div>
        <h2 className="mx-auto max-w-2xl text-3xl text-charcoal sm:text-4xl lg:text-5xl">
          Programas adaptados a cada necesidad
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base font-body font-light leading-relaxed text-warm-gray">
          Desde termalismo IMSERSO subvencionado hasta programas de longevidad personalizados.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-2xl p-7 transition-shadow duration-300 ${
              plan.featured
                ? "bg-navy text-white shadow-xl ring-1 ring-lime/30"
                : "bg-cream-dark/50"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-navy-light px-4 py-1 text-[11px] font-body font-semibold text-white">
                Recomendado
              </span>
            )}

            <h3
              className={`font-body text-[11px] font-semibold uppercase tracking-[0.15em] ${
                plan.featured ? "text-lime" : "text-navy-light"
              }`}
            >
              {plan.name}
            </h3>

            <div className="mt-4 flex items-baseline gap-1">
              <span className={`text-xs font-body ${plan.featured ? "text-white/40" : "text-stone"}`}>
                Desde
              </span>
              <span className="font-display text-4xl">{plan.price}&euro;</span>
            </div>
            <p className={`mt-0.5 text-[11px] font-body ${plan.featured ? "text-white/40" : "text-stone"}`}>
              / {plan.duration}
            </p>
            {plan.priceNote && (
              <p className={`mt-1.5 text-[11px] font-body italic ${plan.featured ? "text-white/30" : "text-stone"}`}>
                {plan.priceNote}
              </p>
            )}

            <p className={`mt-4 text-sm font-body font-light leading-relaxed ${plan.featured ? "text-white/60" : "text-warm-gray"}`}>
              {plan.description}
            </p>

            <div className={`my-5 border-t ${plan.featured ? "border-white/10" : "border-navy/8"}`} />

            <ul className="flex-1 space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[13px] font-body">
                  <Check
                    size={14}
                    className={`mt-0.5 shrink-0 ${plan.featured ? "text-lime" : "text-navy-light"}`}
                  />
                  <span className={plan.featured ? "text-white/70" : "text-warm-gray"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button
                href={plan.href}
                variant={plan.featured ? "primary" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
