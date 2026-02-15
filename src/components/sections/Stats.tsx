import { motion } from "framer-motion";

const stats = [
  { value: "130+", label: "Años de historia" },
  { value: "14", label: "Especialidades médicas" },
  { value: "20+", label: "Programas de salud" },
  { value: "10.000+", label: "Pacientes al año" },
];

export function Stats() {
  return (
    <section className="border-y border-charcoal/10 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-charcoal/10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="px-6 py-12 text-center lg:py-16"
          >
            <span className="block font-display text-4xl lg:text-5xl text-charcoal">
              {stat.value}
            </span>
            <span className="mt-2 block text-sm font-body text-warm-gray">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
