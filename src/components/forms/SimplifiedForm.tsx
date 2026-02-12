import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Loader2, MessageCircle } from "lucide-react";
import { validateName, validatePhone } from "@/lib/validation";
import { submitSimplifiedForm } from "@/lib/crm";
import { persistUTMParams } from "@/lib/tracking";

const PROGRAMS = [
  { value: "termalismo_basic", label: "Termalismo IMSERSO / TV" },
  { value: "termalismo_longevity", label: "Club Longevidad" },
  { value: "longevity_club", label: "Longevidad PRO" },
];

interface SimplifiedFormProps {
  onSuccess?: () => void;
  defaultProgram?: string;
}

export function SimplifiedForm({ onSuccess, defaultProgram }: SimplifiedFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState(defaultProgram || "termalismo_basic");
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    persistUTMParams();
  }, []);

  const isValid = validateName(name) && validatePhone(phone) && accepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setError(null);

    const result = await submitSimplifiedForm({
      fullName: name,
      phone,
      program,
    });

    setIsSubmitting(false);

    if (result.ok) {
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = "/gracias-balneario";
      }
    } else {
      setError(result.error || "Error al enviar. Inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-body font-medium text-charcoal mb-1.5">
          Nombre y Apellidos
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
          className="w-full rounded-xl border border-gray-200 bg-cream px-4 py-3 text-sm font-body text-charcoal transition-colors focus:border-coral focus:outline-none"
          placeholder="Su nombre completo"
        />
        {name.length > 0 && !validateName(name) && (
          <p className="mt-1 text-xs text-coral font-body">
            Introduzca nombre y al menos un apellido
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-body font-medium text-charcoal mb-1.5">
          Teléfono
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" size={16} />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            required
            className="w-full rounded-xl border border-gray-200 bg-cream pl-10 pr-4 py-3 text-sm font-body text-charcoal transition-colors focus:border-coral focus:outline-none"
            placeholder="600 000 000"
          />
        </div>
        {phone.length > 0 && !validatePhone(phone) && (
          <p className="mt-1 text-xs text-coral font-body">
            Teléfono español válido (9 dígitos, empieza por 6/7/8/9)
          </p>
        )}
      </div>

      {/* Program */}
      <div>
        <label className="block text-sm font-body font-medium text-charcoal mb-1.5">
          Programa
        </label>
        <div className="space-y-2">
          {PROGRAMS.map((p) => (
            <label
              key={p.value}
              className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                program === p.value
                  ? "border-coral bg-coral/5"
                  : "border-gray-200 hover:border-coral/30"
              }`}
            >
              <input
                type="radio"
                name="program"
                value={p.value}
                checked={program === p.value}
                onChange={(e) => setProgram(e.target.value)}
                className="accent-coral"
              />
              <span className="text-sm font-body text-charcoal">{p.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-gray-300 accent-coral"
        />
        <span className="text-xs font-body text-gray-500">
          Quiero que me llamen y acepto la{" "}
          <a href="/politica-de-privacidad" className="text-coral underline">
            Política de privacidad
          </a>
        </span>
      </label>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg bg-red-50 border border-red-200 p-3"
          >
            <p className="text-xs font-body text-red-700 mb-2">{error}</p>
            <a
              href="https://wa.me/34662359976"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-body font-medium text-green-700 hover:underline"
            >
              <MessageCircle size={12} />
              Contactar por WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={!isValid || isSubmitting}
        whileHover={isValid && !isSubmitting ? { scale: 1.02 } : {}}
        whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
        className={`w-full rounded-full px-8 py-4 text-base font-body font-medium transition-all flex items-center justify-center gap-2 ${
          isValid && !isSubmitting
            ? "bg-coral text-white hover:bg-coral/90 active:scale-[0.98]"
            : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar solicitud"
        )}
      </motion.button>

      <p className="text-xs font-body text-gray-400">
        Finalidad del dato: Atender y gestionar su solicitud de contacto y/o tramitar las reservas.
      </p>
    </form>
  );
}
