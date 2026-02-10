"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Que tengo que traer?",
    a: "Ropa comoda, banador, chanclas para el circuito termal y la documentacion necesaria. Le enviaremos una guia completa antes de su llegada.",
  },
  {
    q: "Como hago la solicitud IMSERSO?",
    a: "Nosotros nos encargamos de todo. Complete el formulario de reserva y le llamaremos para gestionar su plaza IMSERSO en menos de 2 minutos.",
  },
  {
    q: "Por que elegirnos?",
    a: "Somos la clinica de longevidad mas grande de Europa, con mas de 300 profesionales, 12 medicos y protocolos de vanguardia. Nuestras aguas mineromedicinales son unicas.",
  },
  {
    q: "Como pido la beca si quiero ir 14 noches?",
    a: "Si desea ampliar su estancia a 14 noches, contacte con nosotros y le ayudaremos a gestionar la solicitud de beca correspondiente. Las plazas son limitadas, por lo que recomendamos reservar con antelacion.",
  },
  {
    q: "Tengo que esperar a que IMSERSO apruebe mi solicitud?",
    a: "No necesariamente. Nosotros le ayudamos a tramitar su solicitud IMSERSO y le mantenemos informado del proceso. Puede reservar su plaza con antelacion y gestionamos todo por usted.",
  },
  {
    q: "Hay autobuses directos?",
    a: "Si, disponemos de autobuses regulares desde Valencia. Consulte con antelacion para reservar su plaza ya que las plazas son limitadas.",
  },
  {
    q: "Hay Wifi?",
    a: "Si, todas nuestras instalaciones disponen de WIFI. Los huespedes Club Longevidad tienen acceso a WIFI rapido en su habitacion.",
  },
  {
    q: "Como me apunto a las actividades?",
    a: "Todas las actividades saludables (mas de 8 horas diarias) estan incluidas en su estancia. Al llegar le daremos un calendario con todas las opciones disponibles: clases, paseos, ejercicio, meditacion y actividades nocturnas.",
  },
  {
    q: "Como reservo tratamientos adicionales?",
    a: "Puede reservar tratamientos adicionales durante su estancia siempre que haya disponibilidad, pero le recomendamos haberlo reservado con antelacion. Contacte con nosotros o hable con su medico durante la consulta inicial.",
  },
  {
    q: "Como funciona el Club Longevidad?",
    a: "El Club Longevidad ofrece programas personalizados de salud con diagnosticos avanzados, tratamientos especializados y habitacion premium. Su medico le asesorara sobre el programa mas adecuado para sus necesidades.",
  },
  {
    q: "Como son los programas de rehabilitacion de estancias largas?",
    a: "Los programas de estancias largas son estancias intensivas-inmersivas de 10-30 dias con protocolos personalizados que incluyen diagnosticos, tratamientos diarios, seguimiento medico, clases de longevidad y un plan de continuacion para su vuelta a casa.",
  },
  {
    q: "Si viajo por termalismo, necesito aportar informacion medica?",
    a: "Si, es recomendable. En la primera consulta con el medico revisaremos su historial y condicion para personalizar su programa termal. Si tiene informes medicos recientes, traigalos para una mejor atencion.",
  },
  {
    q: "Tengo acceso a nevera para conservar alimentos o medicacion?",
    a: "Si, los huespedes Club Longevidad disponen de nevera en su habitacion premium. Si necesita conservar medicacion, consulte con recepcion y le facilitaremos una solucion.",
  },
  {
    q: "Puedo tener una habitacion individual?",
    a: "Si, disponemos de habitaciones individuales con suplemento. Consulte disponibilidad al hacer su reserva.",
  },
  {
    q: "Las habitaciones estan aclimatadas?",
    a: "Si, todas nuestras habitaciones disponen de calefaccion y aire acondicionado para su confort en cualquier epoca del ano.",
  },
  {
    q: "Puedo viajar con mis nietos?",
    a: "Si, los ninos son bienvenidos. Disponemos de actividades al aire libre y un entorno natural ideal para disfrutar en familia. Consulte con nosotros para las opciones de alojamiento familiar.",
  },
  {
    q: "Puedo viajar con mi mascota?",
    a: "Lamentablemente, por razones de higiene y la naturaleza clinica de nuestras instalaciones, no podemos admitir mascotas. Le ayudaremos a encontrar alternativas cercanas si lo necesita.",
  },
  {
    q: "Como hago el prepago de mi estancia?",
    a: "Le enviaremos instrucciones detalladas para el prepago una vez confirmada su reserva. Aceptamos transferencia bancaria y tarjeta. Para programas PRO, se requiere una senal de 300 euros a descontar del total.",
  },
  {
    q: "Una vez hecho el prepago, tengo que enviar justificante o llamar para avisar?",
    a: "Si, le rogamos que envie el justificante de pago por email o WhatsApp para que podamos confirmar su reserva definitivamente y organizar su programa.",
  },
  {
    q: "Como llegar?",
    a: "En coche desde la A3, salida por Requena hacia Cofrentes. En tren hasta Valencia, nosotros podemos recogerle con nuestros autobuses regulares (consulte con antelacion). Desde Madrid, aproximadamente 3 horas. Desde Valencia, 75 minutos en coche.",
  },
  {
    q: "Esta habilitado para personas con movilidad reducida?",
    a: "Si, nuestras instalaciones estan adaptadas para personas con movilidad reducida, incluyendo habitaciones accesibles y acceso a todas las areas de tratamiento.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section bg="cream" id="faq">
      <div className="mb-12 text-center lg:mb-16">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="brand-line" />
          <span className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-navy-light">
            Preguntas frecuentes
          </span>
          <span className="brand-line rotate-180" />
        </div>
        <h2 className="mx-auto max-w-xl text-3xl text-charcoal sm:text-4xl lg:text-5xl">
          Resolvemos tus dudas
        </h2>
      </div>

      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-charcoal/8">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-navy-light"
            >
              <span className="flex items-center gap-4 font-body text-base font-medium text-charcoal pr-4">
                <span className="text-xs text-stone tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {faq.q}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-stone transition-transform duration-300 ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pl-10 text-sm font-body font-light leading-relaxed text-warm-gray">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
