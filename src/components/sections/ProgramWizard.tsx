"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Phone,
  Calendar,
  Clock,
  Heart,
  Sparkles,
  Shield,
  Zap,
  X,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { validateName, validatePhone } from "@/lib/validation";
import { submitWizardForm } from "@/lib/crm";
import { persistUTMParams } from "@/lib/tracking";

// --- Types ---

interface WizardData {
  age: number;
  goal: string;
  conditions: string[];
  hasImserso: boolean | null;
  duration: number;
}

interface RecommendationResult {
  program: string;
  description: string;
  duration: string;
  link: string;
  isPro: boolean;
  proSuggestion?: {
    program: string;
    description: string;
    link: string;
  };
}

// --- Constants ---

const goals = [
  { id: "pain", icon: Zap, label: "Aliviar el dolor", desc: "Dolor musculoesqueletico cronico" },
  { id: "inflammation", icon: Shield, label: "Reducir inflamacion", desc: "Inflamacion cronica sistemica" },
  { id: "wellness", icon: Sparkles, label: "Mejorar bienestar general", desc: "Salud preventiva y vitalidad" },
  { id: "basic", icon: Heart, label: "Solo termalismo basico", desc: "Relax y circuito termal" },
];

const conditions = [
  "Artrosis",
  "Dolor de espalda",
  "Dolor de rodilla",
  "Fatiga cronica",
  "Problemas de piel",
  "Osteoporosis",
  "Problemas digestivos",
  "Dormir mal",
  "Ninguno de los anteriores",
];

// --- Animation variants ---

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: "spring" as const, stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const cardStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
};

// --- Recommendation logic ---

function getRecommendation(data: WizardData): RecommendationResult {
  if (data.goal === "basic") {
    return {
      program: "Escapada Termal",
      description: "Unos dias de relax con circuito termal, alojamiento y pension completa",
      duration: data.duration === 9 ? "8 noches" : "13 noches",
      link: "/escapada-termal",
      isPro: false,
    };
  }

  if (data.hasImserso && data.age >= 65) {
    let subprogram = "Programa Saludable Inicial";
    if (
      data.conditions.includes("Artrosis") ||
      data.conditions.includes("Dolor de espalda") ||
      data.conditions.includes("Dolor de rodilla")
    ) {
      if (data.conditions.length > 3) subprogram = "Programa Dolor Intensivo Plus";
      else if (data.conditions.length > 2) subprogram = "Programa Dolor Intensivo";
      else subprogram = "Programa Dolor Avanzado";
    } else if (
      data.conditions.includes("Fatiga cronica") ||
      data.conditions.includes("Dormir mal")
    ) {
      if (data.conditions.length > 2) subprogram = "Programa Anti-inflamatorio Intensivo";
      else subprogram = "Programa Anti-inflamatorio Avanzado";
    }

    return {
      program: "IMSERSO + " + subprogram,
      description: "Aprovecha tu derecho IMSERSO y anade Club Longevidad con tratamientos personalizados",
      duration: "9 noches (fijo IMSERSO)",
      link: "/programas/imserso-balneario",
      isPro: false,
    };
  }

  let clubProgram = "Programa Saludable Inicial";
  if (data.goal === "pain") {
    if (data.conditions.length > 3) clubProgram = "Programa Dolor Intensivo Plus";
    else if (data.conditions.length > 2) clubProgram = "Programa Dolor Intensivo";
    else clubProgram = "Programa Dolor Avanzado";
  } else if (data.goal === "inflammation") {
    if (data.conditions.length > 2) clubProgram = "Programa Anti-inflamatorio Intensivo";
    else clubProgram = "Programa Anti-inflamatorio Avanzado";
  } else {
    if (data.conditions.length > 2) clubProgram = "Programa Saludable Intensivo";
    else if (data.conditions.length > 1) clubProgram = "Programa Saludable Avanzado";
  }

  const showProSuggestion =
    data.conditions.length > 3 || (data.goal === "pain" && data.conditions.length > 2);

  return {
    program: clubProgram,
    description: showProSuggestion
      ? "Club Longevidad con tratamientos intensivos personalizados para tus condiciones"
      : "Club Longevidad con tratamientos adaptados a tus objetivos",
    duration: data.duration === 9 ? "8 noches" : "13 noches",
    link: `/programas/${clubProgram.toLowerCase().replace(/ /g, "-")}`,
    isPro: false,
    proSuggestion: showProSuggestion
      ? {
          program: "Longevidad PRO",
          description:
            "Dada la complejidad de tus condiciones, podrias considerar tambien Club Longevidad PRO",
          link: "/programas/programa-longevidad-personalizado",
        }
      : undefined,
  };
}

// --- Component ---

export default function ProgramWizard() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<WizardData>({
    age: 65,
    goal: "",
    conditions: [],
    hasImserso: null,
    duration: 9,
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Persist UTM params on mount
  useEffect(() => {
    persistUTMParams();
  }, []);

  // Determine effective total steps (skip duration step if IMSERSO or basic)
  const shouldSkipDuration = data.hasImserso || data.goal === "basic";
  const totalSteps = 6;

  const nextStep = useCallback(() => {
    setDirection(1);
    if (step === 4 && shouldSkipDuration) {
      // Skip step 5 (duration), go straight to 6
      setStep(6);
    } else if (step < 6) {
      setStep((s) => s + 1);
    }
  }, [step, shouldSkipDuration]);

  const prevStep = useCallback(() => {
    setDirection(-1);
    if (step === 6 && shouldSkipDuration) {
      setStep(4);
    } else if (step > 1) {
      setStep((s) => s - 1);
    }
  }, [step, shouldSkipDuration]);

  const toggleCondition = useCallback((condition: string) => {
    setData((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition],
    }));
  }, []);

  const isStepValid = () => {
    switch (step) {
      case 1: return true;
      case 2: return data.goal !== "";
      case 3: return data.conditions.length > 0;
      case 4: return data.hasImserso !== null;
      case 5: return true;
      case 6: return validateName(name) && validatePhone(phoneNumber);
      default: return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName(name) || !validatePhone(phoneNumber)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitWizardForm({
      fullName: name,
      phone: phoneNumber,
      goal: data.goal,
      hasImserso: data.hasImserso || false,
      conditions: data.conditions,
    });

    setIsSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
      // Redirect after a brief moment to show success
      setTimeout(() => {
        window.location.href = "/gracias-balneario";
      }, 1500);
    } else {
      setSubmitError(result.error || "Error al enviar. Intentalo de nuevo.");
    }
  };

  // --- Submitted state ---
  if (submitted) {
    return (
      <section className="relative bg-coral/10 py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-coral/20"
          >
            <CheckCircle className="text-coral" size={40} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl text-charcoal lg:text-5xl"
          >
            Gracias por tu interes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg font-body font-light text-warm-gray"
          >
            Nos pondremos en contacto contigo lo antes posible.
          </motion.p>
        </div>
      </section>
    );
  }

  // --- Active wizard ---
  const recommendation = step === 6 ? getRecommendation(data) : null;

  return (
    <section className="relative bg-coral/5 py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl text-charcoal lg:text-5xl"
          >
            Encuentra tu programa ideal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg font-body font-light text-warm-gray"
          >
            Responde a algunas preguntas y te recomendaremos el programa perfecto
          </motion.p>

          <div className="mt-8 mx-auto max-w-md">
            <ProgressBar currentStep={step} totalSteps={totalSteps} />
          </div>
        </div>

        {/* Wizard card */}
        <div className="rounded-3xl bg-white p-8 lg:p-12 shadow-xl overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Age */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="space-y-8"
              >
                <div>
                  <label className="block font-display text-2xl text-charcoal mb-6">
                    ¿Cuantos anos tienes?
                  </label>
                  <div className="flex items-center gap-6 justify-center">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setData((prev) => ({ ...prev, age: Math.max(18, prev.age - 1) }))
                      }
                      className="h-14 w-14 rounded-full bg-coral/10 text-coral hover:bg-coral hover:text-white transition-colors flex items-center justify-center font-bold text-2xl"
                    >
                      -
                    </motion.button>
                    <div className="w-32 text-center">
                      <motion.span
                        key={data.age}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-7xl text-charcoal"
                      >
                        {data.age}
                      </motion.span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setData((prev) => ({ ...prev, age: Math.min(100, prev.age + 1) }))
                      }
                      className="h-14 w-14 rounded-full bg-coral/10 text-coral hover:bg-coral hover:text-white transition-colors flex items-center justify-center font-bold text-2xl"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Goal */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="space-y-6"
              >
                <label className="block font-display text-2xl text-charcoal mb-4">
                  ¿Cual es tu objetivo principal?
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  {goals.map((goal, i) => (
                    <motion.button
                      key={goal.id}
                      custom={i}
                      variants={cardStagger}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setData((prev) => ({ ...prev, goal: goal.id }))}
                      className={`group flex flex-col items-center rounded-2xl border-2 p-6 transition-colors ${
                        data.goal === goal.id
                          ? "border-coral bg-coral/5"
                          : "border-charcoal/10 hover:border-coral/40"
                      }`}
                    >
                      <motion.div
                        animate={
                          data.goal === goal.id
                            ? { scale: [1, 1.2, 1], rotate: [0, 5, 0] }
                            : {}
                        }
                        transition={{ duration: 0.3 }}
                        className={`mb-4 h-12 w-12 rounded-xl flex items-center justify-center ${
                          data.goal === goal.id
                            ? "bg-coral text-white"
                            : "bg-coral/10 text-coral"
                        }`}
                      >
                        <goal.icon size={24} />
                      </motion.div>
                      <h3 className="font-display text-lg text-charcoal text-center">
                        {goal.label}
                      </h3>
                      <p className="mt-2 text-sm font-body font-light text-warm-gray text-center">
                        {goal.desc}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Conditions */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="space-y-6"
              >
                <label className="block font-display text-2xl text-charcoal mb-2">
                  ¿Que condiciones o sintomas tienes?
                </label>
                <p className="text-sm font-body font-light text-warm-gray mb-6">
                  Selecciona todos los que apliquen
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {conditions.map((condition, i) => (
                    <motion.button
                      key={condition}
                      custom={i}
                      variants={cardStagger}
                      initial="hidden"
                      animate="visible"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleCondition(condition)}
                      className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
                        data.conditions.includes(condition)
                          ? "border-coral bg-coral/5"
                          : "border-charcoal/10 hover:border-coral/40"
                      }`}
                    >
                      <motion.div
                        animate={{
                          scale: data.conditions.includes(condition) ? [1, 1.3, 1] : 1,
                          backgroundColor: data.conditions.includes(condition)
                            ? "#ff462e"
                            : "#e5e5e5",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="h-6 w-6 rounded-full flex items-center justify-center"
                      >
                        {data.conditions.includes(condition) && (
                          <CheckCircle size={16} className="text-white" />
                        )}
                      </motion.div>
                      <span className="font-body text-charcoal">{condition}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: IMSERSO */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="space-y-6"
              >
                <label className="block font-display text-2xl text-charcoal mb-2">
                  ¿Tienes derecho al programa IMSERSO?
                </label>
                <p className="text-sm font-body font-light text-warm-gray mb-6">
                  Si tienes mas de 65 anos o eres pensionista de la Seguridad Social
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setData((prev) => ({ ...prev, hasImserso: true }))}
                    className={`flex flex-col items-center rounded-2xl border-2 p-6 transition-colors ${
                      data.hasImserso === true
                        ? "border-coral bg-coral/5"
                        : "border-charcoal/10 hover:border-coral/40"
                    }`}
                  >
                    <motion.div
                      animate={
                        data.hasImserso === true
                          ? { scale: [1, 1.2, 1] }
                          : {}
                      }
                      className={`mb-4 h-12 w-12 rounded-xl flex items-center justify-center ${
                        data.hasImserso === true
                          ? "bg-coral text-white"
                          : "bg-coral/10 text-coral"
                      }`}
                    >
                      <CheckCircle size={24} />
                    </motion.div>
                    <h3 className="font-display text-lg text-charcoal text-center">
                      Si, tengo derecho
                    </h3>
                    <p className="mt-2 text-sm font-body font-light text-warm-gray text-center">
                      Tengo derecho, quiero aplicarlo
                    </p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setData((prev) => ({ ...prev, hasImserso: false }))}
                    className={`flex flex-col items-center rounded-2xl border-2 p-6 transition-colors ${
                      data.hasImserso === false
                        ? "border-coral bg-coral/5"
                        : "border-charcoal/10 hover:border-coral/40"
                    }`}
                  >
                    <motion.div
                      animate={
                        data.hasImserso === false
                          ? { scale: [1, 1.2, 1] }
                          : {}
                      }
                      className={`mb-4 h-12 w-12 rounded-xl flex items-center justify-center ${
                        data.hasImserso === false
                          ? "bg-coral text-white"
                          : "bg-coral/10 text-warm-gray"
                      }`}
                    >
                      <X size={24} />
                    </motion.div>
                    <h3 className="font-display text-lg text-charcoal text-center">No</h3>
                    <p className="mt-2 text-sm font-body font-light text-warm-gray text-center">
                      Prefiero otros programas
                    </p>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {data.hasImserso === true && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-body font-light text-warm-gray text-center bg-cream rounded-lg p-4"
                    >
                      Las fechas se confirmaran solo una vez que IMSERSO confirme su plaza
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Step 5: Duration (only if not IMSERSO and not basic) */}
            {step === 5 && (
              <motion.div
                key="step5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="space-y-6"
              >
                <label className="block font-display text-2xl text-charcoal mb-4">
                  ¿Que duracion prefieres?
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setData((prev) => ({ ...prev, duration: 9 }))}
                    className={`flex flex-col items-center rounded-2xl border-2 p-6 transition-colors ${
                      data.duration === 9
                        ? "border-coral bg-coral/5"
                        : "border-charcoal/10 hover:border-coral/40"
                    }`}
                  >
                    <Calendar
                      className={`mb-4 ${data.duration === 9 ? "text-coral" : "text-warm-gray"}`}
                      size={32}
                    />
                    <h3 className="font-display text-lg text-charcoal">9 dias</h3>
                    <p className="mt-2 text-sm font-body font-light text-warm-gray text-center">
                      8 noches de estancia
                    </p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setData((prev) => ({ ...prev, duration: 14 }))}
                    className={`flex flex-col items-center rounded-2xl border-2 p-6 transition-colors ${
                      data.duration === 14
                        ? "border-coral bg-coral/5"
                        : "border-charcoal/10 hover:border-coral/40"
                    }`}
                  >
                    <Calendar
                      className={`mb-4 ${data.duration === 14 ? "text-coral" : "text-warm-gray"}`}
                      size={32}
                    />
                    <h3 className="font-display text-lg text-charcoal">14 dias</h3>
                    <p className="mt-2 text-sm font-body font-light text-warm-gray text-center">
                      13 noches de estancia
                    </p>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Contact + Recommendation + Submit */}
            {step === 6 && (
              <motion.div
                key="step6"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="space-y-8"
              >
                {/* Recommendation */}
                {recommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl bg-coral/5 border-2 border-coral/20 p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
                        <Heart className="text-coral" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl text-charcoal mb-2">
                          Recomendacion para ti
                        </h3>
                        <p className="font-display text-xl text-coral font-semibold">
                          {recommendation.program}
                        </p>
                        <p className="mt-2 text-sm font-body font-light text-warm-gray">
                          {recommendation.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-sm font-body text-charcoal">
                          <Clock size={16} />
                          <span>{recommendation.duration}</span>
                        </div>

                        <AnimatePresence>
                          {recommendation.proSuggestion && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-6 rounded-xl bg-lime/10 border-2 border-lime/30 p-6"
                            >
                              <h4 className="font-display text-lg text-charcoal mb-2 flex items-center gap-2">
                                <Sparkles size={20} className="text-lime" />
                                Sugerencia premium
                              </h4>
                              <p className="font-display text-base text-lime font-semibold mb-2">
                                {recommendation.proSuggestion.program}
                              </p>
                              <p className="text-sm font-body font-light text-warm-gray">
                                {recommendation.proSuggestion.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Contact form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block font-display text-lg text-charcoal mb-2">
                      ¿Como te llamas?
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border-2 border-charcoal/10 px-4 py-3 font-body text-charcoal focus:border-coral focus:outline-none transition-colors"
                      placeholder="Nombre y apellidos"
                    />
                    {name.length > 0 && !validateName(name) && (
                      <p className="mt-1 text-xs text-coral font-body">
                        Introduce nombre y al menos un apellido
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-display text-lg text-charcoal mb-2">
                      ¿Cual es tu telefono?
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray"
                        size={20}
                      />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full rounded-xl border-2 border-charcoal/10 pl-12 pr-4 py-3 font-body text-charcoal focus:border-coral focus:outline-none transition-colors"
                        placeholder="600 000 000"
                      />
                    </div>
                    {phoneNumber.length > 0 && !validatePhone(phoneNumber) && (
                      <p className="mt-1 text-xs text-coral font-body">
                        Introduce un telefono espanol valido (9 digitos)
                      </p>
                    )}
                  </div>

                  {/* Error state */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-xl bg-red-50 border border-red-200 p-4"
                      >
                        <p className="text-sm font-body text-red-700 mb-3">{submitError}</p>
                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="text-sm font-body font-medium text-coral hover:underline"
                          >
                            Reintentar
                          </button>
                          <a
                            href="https://wa.me/34662359976"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm font-body font-medium text-green-700 hover:underline"
                          >
                            <MessageCircle size={14} />
                            Contactar por WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={!isStepValid() || isSubmitting}
                    whileHover={isStepValid() && !isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={isStepValid() && !isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full rounded-xl px-6 py-4 text-center font-display text-lg flex items-center justify-center gap-2 transition-colors ${
                      isStepValid() && !isSubmitting
                        ? "bg-coral text-white hover:bg-coral/90"
                        : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <ArrowRight size={20} />
                        Enviar y que me llamen
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons (not on step 6) */}
          {step !== 6 && (
            <div className="mt-8 flex gap-4">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="flex items-center justify-center gap-2 flex-1 rounded-xl border-2 border-charcoal/20 px-6 py-3 text-center text-charcoal font-display hover:border-charcoal/40 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Atras
                </motion.button>
              )}
              <motion.button
                whileHover={isStepValid() ? { scale: 1.02 } : {}}
                whileTap={isStepValid() ? { scale: 0.98 } : {}}
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center justify-center gap-2 flex-1 rounded-xl px-6 py-3 text-center font-display transition-colors ${
                  isStepValid()
                    ? "bg-coral text-white hover:bg-coral/90"
                    : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"
                }`}
              >
                {step === 1 ? "Comenzar" : "Siguiente"}
                <ArrowRight size={18} />
              </motion.button>
            </div>
          )}

          {/* Back on step 6 */}
          {step === 6 && !isSubmitting && (
            <div className="mt-4">
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-sm font-body text-warm-gray hover:text-charcoal transition-colors"
              >
                <ArrowLeft size={14} />
                Volver atras
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
