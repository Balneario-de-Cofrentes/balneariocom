"use client";

import { motion } from "framer-motion";
import { CheckCircle, Phone, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GraciasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-lime/20"
          >
            <CheckCircle className="text-lime" size={48} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl text-white lg:text-5xl"
          >
            Gracias por tu solicitud
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-4 text-lg font-body font-light text-white/70"
          >
            Hemos recibido tus datos correctamente. Nuestro equipo se pondra en
            contacto contigo lo antes posible en horario laboral.
          </motion.p>
        </div>
      </section>

      {/* Next steps */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            <h2 className="font-display text-2xl text-charcoal mb-6">
              Proximos pasos
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral font-display text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-display text-lg text-charcoal">
                    Te llamaremos
                  </h3>
                  <p className="mt-1 text-sm font-body font-light text-warm-gray">
                    Un asesor te contactara para confirmar tus datos y resolver
                    cualquier duda sobre tu programa.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral font-display text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-display text-lg text-charcoal">
                    Confirmaremos fechas
                  </h3>
                  <p className="mt-1 text-sm font-body font-light text-warm-gray">
                    Encontraremos las mejores fechas disponibles para tu estancia
                    segun tus preferencias.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral font-display text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-display text-lg text-charcoal">
                    Disfruta tu estancia
                  </h3>
                  <p className="mt-1 text-sm font-body font-light text-warm-gray">
                    Nosotros nos encargamos de todo para que solo tengas que
                    preocuparte de disfrutar.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <a
              href="tel:+34961894025"
              className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10">
                <Phone size={18} className="text-coral" />
              </div>
              <div>
                <p className="text-sm font-body font-medium text-charcoal">Llamar ahora</p>
                <p className="text-xs font-body text-warm-gray">961 894 025</p>
              </div>
            </a>

            <a
              href="https://wa.me/34662359976"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <MessageCircle size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-body font-medium text-charcoal">WhatsApp</p>
                <p className="text-xs font-body text-warm-gray">662 35 99 76</p>
              </div>
            </a>
          </motion.div>

          {/* Browse programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-sm font-body text-warm-gray mb-4">
              Mientras tanto, explora nuestros programas
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/programas"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-sm font-body font-medium text-charcoal hover:border-coral hover:text-coral transition-colors"
              >
                Ver programas
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/clinica"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-sm font-body font-medium text-charcoal hover:border-coral hover:text-coral transition-colors"
              >
                Clinica de longevidad
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/instalaciones"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-sm font-body font-medium text-charcoal hover:border-coral hover:text-coral transition-colors"
              >
                Instalaciones
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
