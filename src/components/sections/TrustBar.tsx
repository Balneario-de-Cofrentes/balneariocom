import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  {
    value: 185,
    suffix: "",
    label: "años de tradición termal",
  },
  {
    value: 13000,
    suffix: "",
    label: "pacientes cada año",
  },
  {
    value: 300,
    suffix: "+",
    label: "profesionales en el equipo",
  },
  {
    value: 12,
    suffix: "",
    label: "médicos en plantilla",
  },
];

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="block font-display text-5xl tracking-tight text-navy lg:text-6xl"
                duration={2}
              />
              <p className="mt-2 text-sm font-body font-medium text-charcoal/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
