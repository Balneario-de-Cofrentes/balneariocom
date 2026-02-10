"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function FloatingParticles() {
  const { scrollY } = useScroll();
  const rotateZ = useTransform(scrollY, [0, 1000], [0, 360]);
  const rotateX = useSpring(useTransform(scrollY, [0, 500], [0, 45]), {
    stiffness: 100,
    damping: 30,
  });

  const particles = Array.from({ length: 6 }).map((_, i) => {
    const size = Math.random() * 20 + 10;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 2;

    return (
      <motion.div
        key={i}
        className="fixed z-0 rounded-full"
        style={{
          width: size,
          height: size,
          left: `${left}%`,
          top: `${top}%`,
          rotateZ: rotateZ.get(),
          rotateX: rotateX.get(),
          background: i % 2 === 0
            ? "radial-gradient(circle, rgba(247, 147, 26, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(34, 58, 120, 0.05) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          delay,
        }}
      />
    );
  });

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles}
    </div>
  );
}
