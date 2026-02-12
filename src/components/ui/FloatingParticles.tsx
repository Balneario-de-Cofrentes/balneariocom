"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Particle {
  size: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  isEven: boolean;
}

const PARTICLES: Particle[] = [
  { size: 14, left: 12, top: 18, delay: 0.2, duration: 9, isEven: true },
  { size: 18, left: 78, top: 22, delay: 0.8, duration: 11, isEven: false },
  { size: 22, left: 30, top: 68, delay: 0.1, duration: 10, isEven: true },
  { size: 16, left: 62, top: 74, delay: 1.4, duration: 12, isEven: false },
  { size: 20, left: 88, top: 42, delay: 0.5, duration: 9, isEven: true },
  { size: 12, left: 8, top: 84, delay: 1.1, duration: 10, isEven: false },
];

export function FloatingParticles() {
  const { scrollY } = useScroll();
  const rotateZ = useTransform(scrollY, [0, 1000], [0, 360]);
  const rotateX = useSpring(useTransform(scrollY, [0, 500], [0, 45]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="fixed z-0 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            rotateZ,
            rotateX,
            background: p.isEven
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
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
