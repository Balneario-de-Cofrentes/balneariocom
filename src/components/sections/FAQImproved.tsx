"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ChevronDown, Search } from "lucide-react";

interface FAQItem {
  category: string;
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  { category: "Reservas", q: "Que tengo que traer?", a: "Ropa comoda, banador, chanclas para el circuito termal y la documentacion necesaria. Le enviaremos una guia completa antes de su llegada." },
  { category: "Reservas", q: "Como hago la solicitud IMSERSO?", a: "Nosotros nos encargamos de todo. Complete el formulario de reserva y le llamaremos para gestionar su plaza IMSERSO en menos de 2 minutos." },
  { category: "IMSERSO", q: "Tengo que esperar a que IMSERSO apruebe mi solicitud?", a: "No necesariamente. Nosotros le ayudamos a tramitar su solicitud IMSERSO y le mantendremos informado del proceso." },
  { category: "Alojamiento", q: "Hay acondicionadas?", a: "Si, las habitaciones disponen de calefaccion y aire acondicionado para su confort en cualquier epoca del ano." },
  { category: "Alojamiento", q: "Hay Wifi?", a: "Si, todas nuestras instalaciones disponen de WIFI. Los huespedes Club Longevidad tienen acceso a WIFI rapido en su habitacion." },
  { category: "Actividades", q: "Como me apunto a las actividades?", a: "Todas las actividades saludables estan incluidas en su estancia." },
  { category: "Tratamientos", q: "Como reservo tratamientos adicionales?", a: "Puede reservar tratamientos adicionales durante su estancia siempre que haya disponibilidad." },
  { category: "Clinica", q: "Como funciona el Club Longevidad?", a: "El Club Longevidad ofrece programas personalizados con diagnosticos avanzados y tratamientos especializados." },
  { category: "Transporte", q: "Hay autobuses directos?", a: "Si, disponemos de autobuses regulares desde Valencia. Consulte con antelacion para reservar su plaza." },
];

const CATEGORIES = ["Todos", "Reservas", "IMSERSO", "Alojamiento", "Actividades", "Tratamientos", "Clinica", "Transporte"];

function ImprovedFAQ() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.q.toLowerCase().includes(query) ||
        faq.a.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Section className="bg-cream">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <span className="brand-line mx-auto mb-4 inline-block" />
          <h2 className="font-display text-3xl lg:text-4xl text-charcoal">
            Preguntas Frecuentes
          </h2>
          <p className="mt-4 font-body text-stone">
            Busca entre {filteredFAQs.length} respuestas organizadas por categoria
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-body font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-navy-light text-white"
                    : "bg-sand text-charcoal hover:bg-sand/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone" />
            <input
              type="text"
              placeholder="Buscar preguntas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-2 border-sand bg-white pl-12 pr-4 py-3 font-body text-charcoal outline-none transition-all focus:border-navy-light focus:ring-2 focus:ring-navy-light/20"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl border-2 border-sand bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-sand/30"
              >
                <div className="flex-1">
                  <span className="mb-1.5 inline-block rounded-full bg-navy-light/10 px-2 py-0.5 text-[10px] font-semibold text-navy-light">
                    {faq.category}
                  </span>
                  <p className="font-body font-medium text-charcoal">
                    {faq.q}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`shrink-0 transition-transform duration-300 text-charcoal/60 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-sand"
                  >
                    <div className="px-6 py-5">
                      <p className="font-body leading-relaxed text-stone">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg font-body text-stone">
              No encontramos preguntas que coincidan con &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 rounded-full bg-navy-light px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-navy-light/90"
            >
              Limpiar busqueda
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}

export { ImprovedFAQ as FAQ };
