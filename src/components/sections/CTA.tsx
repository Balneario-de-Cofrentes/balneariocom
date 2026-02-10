"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Phone, MessageCircle } from "lucide-react";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        style={{ y }}
        className="absolute inset-[-10%]"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/instalaciones-piscina-termal.webp')" }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/75" />

      {/* Content */}
      <div className="relative z-10 py-24 lg:py-36">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="brand-line mx-auto mb-8" />

            <h2 className="font-display text-4xl text-white lg:text-6xl">
              Tu bienestar empieza aqui
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base font-body font-light leading-relaxed text-white/60">
              Reserva tu estancia y deja que nuestro equipo medico disene un plan
              de tratamiento personalizado para ti.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                href="/reserva"
                size="lg"
              >
                Reservar estancia
              </Button>
              <a
                href="tel:+34961894025"
                className="flex items-center gap-2 text-sm font-body text-white/50 transition-colors hover:text-white"
              >
                <Phone size={14} />
                <span>961 894 025</span>
              </a>
            </div>

            {/* WhatsApp secondary */}
            <a
              href="https://wa.me/34662359976"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-body text-white/30 transition-colors hover:text-white/60"
            >
              <MessageCircle size={14} />
              <span>O escribenos por WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
