import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { SimplifiedForm } from "./SimplifiedForm";

const HIDDEN_PATHS = ["/reserva", "/gracias-balneario"];

export function FloatingFormButton() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  // Hide on specific pages
  const isHidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));

  // Body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  const handleSuccess = useCallback(() => {
    setIsOpen(false);
    window.location.href = "/gracias-balneario";
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-coral px-5 py-3.5 text-white shadow-lg shadow-coral/25 hover:bg-coral/90 transition-colors"
            aria-label="Reservar estancia"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls="floating-reserva-dialog"
          >
            <Calendar size={18} />
            <span className="text-sm font-body font-medium hidden sm:inline">Reservar</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal overlay + form */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm origin-bottom-right"
              role="dialog"
              aria-modal="true"
              id="floating-reserva-dialog"
            >
              <div className="rounded-2xl bg-white p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-display text-xl text-charcoal">
                      Reservar estancia
                    </h3>
                    <p className="text-xs font-body text-warm-gray mt-0.5">
                      Le llamaremos para confirmar
                    </p>
                  </div>
                  <button
                    ref={closeButtonRef}
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors"
                    aria-label="Cerrar"
                  >
                    <X size={16} className="text-charcoal" />
                  </button>
                </div>

                {/* Form */}
                <SimplifiedForm onSuccess={handleSuccess} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
