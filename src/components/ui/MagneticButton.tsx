"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Flame, Zap } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-lime text-navy hover:bg-lime-dark";
      case "secondary":
        return "bg-navy text-white hover:bg-navy/90";
      default:
        return "bg-lime text-navy hover:bg-lime-dark";
    }
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className={`relative rounded-full px-8 py-4 font-body font-semibold transition-all ${getVariantStyles()} ${className}`}
      animate={{
        x: position.x * 0.15,
        y: position.y * 0.15,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}

      {isHovered && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -right-8 -top-8"
          >
            {variant === "primary" ? (
              <Sparkles className="h-6 w-6 text-navy" />
            ) : (
              <Heart className="h-6 w-6 text-navy" />
            )}
          </motion.div>
        </AnimatePresence>
      )}

      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        whileHover={{ opacity: 0.1 }}
        style={{
          background:
            variant === "primary"
              ? "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
        }}
      />
    </motion.button>
  );
}

export function DelightButton({
  children,
  onClick,
  delay = 0,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  delay?: number;
}) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.button
      onClick={() => {
        setIsClicked(true);
        onClick?.();
        setTimeout(() => setIsClicked(false), 1000);
      }}
      className="group relative overflow-hidden rounded-full bg-gradient-to-r from-lime to-lime-dark px-8 py-4 font-body font-semibold text-navy"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span className="relative z-10">{children}</motion.span>

      <AnimatePresence>
        {isClicked && (
          <>
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                animate={{ rotate: 360, scale: 1.5 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
              }}
            />
          </>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
