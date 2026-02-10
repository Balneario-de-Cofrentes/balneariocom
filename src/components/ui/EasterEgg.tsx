"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface EasterEggProps {
  children: React.ReactNode;
  secretCode: string;
  onTrigger: () => void;
}

export function EasterEgg({ children, secretCode, onTrigger }: EasterEggProps) {
  const [keys, setKeys] = useState<string[]>([]);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = [...keys, e.key].slice(-secretCode.length);
      setKeys(newKeys);

      if (newKeys.join("") === secretCode && !found) {
        setFound(true);
        onTrigger();

        setTimeout(() => {
          setFound(false);
          setKeys([]);
        }, 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys, secretCode, found, onTrigger]);

  return (
    <>
      {children}
      {found && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
          className="fixed bottom-20 right-20 z-[100] rounded-2xl bg-gradient-to-br from-lime to-lime/80 px-6 py-4 shadow-2xl"
        >
          <div className="text-center">
            <span className="text-4xl">🌊</span>
            <p className="mt-2 font-display font-semibold text-navy">
              ¡Has descubierto el secreto termal!
            </p>
            <p className="mt-1 text-sm font-body text-navy/80">
              Las aguas del Balneario tienen efectos regeneradores...
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
