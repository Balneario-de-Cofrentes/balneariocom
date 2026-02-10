"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center gap-3">
      {/* Bar */}
      <div className="flex-1 h-2 rounded-full bg-lime/20 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-lime"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <motion.div
              key={stepNum}
              className={`rounded-full transition-colors ${
                isCompleted
                  ? "bg-lime"
                  : isActive
                    ? "bg-lime"
                    : "bg-lime/20"
              }`}
              animate={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          );
        })}
      </div>
    </div>
  );
}
