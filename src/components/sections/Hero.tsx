"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

const HERO_VIDEO_URL = "https://framerusercontent.com/assets/4er7AynMeROJ4lvhCGWdUeMn1P8.webm";
const HERO_POSTER = "/images/hero-piscina-termal.jpg";

const SPRING_CONFIG = {
  damping: 25,
  stiffness: 300,
};

function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <motion.span className={`inline-flex ${className}`}>
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ y: 100, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.04,
            ease: "circOut",
          }}
          className="inline-block will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function MagneticButton({ href, children, variant = "primary", size = "lg" }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = 20;

    const moveX = (e.clientX - centerX) / (rect.width / 2) * distance;
    const moveY = (e.clientY - centerY) / (rect.height / 2) * distance;

    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", ...SPRING_CONFIG }}
      className="cursor-pointer"
    >
      <Button href={href} variant={variant} size={size} className="!border-0">
        {children}
      </Button>
    </motion.button>
  );
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

function MouseBubbles() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isInHero, setIsInHero] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      const inHero = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      setIsInHero(inHero);

      if (inHero) {
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;

        const newBubbles: Bubble[] = [];
        const bubbleCount = 1 + Math.floor(Math.random() * 1);

        for (let i = 0; i < bubbleCount; i++) {
          const size = 15 + Math.random() * 15;
          newBubbles.push({
            id: Date.now() + i,
            x: relativeX,
            y: relativeY,
            size,
            opacity: 0.8 + Math.random() * 0.2,
          });
        }

        setBubbles((prev) => [...prev, ...newBubbles]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

   useEffect(() => {
    if (!isInHero) return;

    const interval = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((bubble) => ({
            ...bubble,
            y: bubble.y - 6 - Math.random() * 3,
            x: bubble.x + (Math.random() - 0.5) * 2,
            opacity: bubble.opacity * 0.992,
          }))
          .filter((bubble) => bubble.opacity > 0.01)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [isInHero]);

  return (
    <div ref={heroRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {isInHero &&
        bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              left: bubble.x - bubble.size / 2,
              top: bubble.y - bubble.size / 2,
              width: bubble.size,
              height: bubble.size,
              opacity: bubble.opacity,
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)`,
              border: `1px solid rgba(255, 255, 255, 0.15)`,
              backdropFilter: `blur(0.5px)`,
            }}
          />
        ))}
    </div>
  );
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);
  const scale1 = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

   return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div
        style={{ y: y1, opacity: opacity1, scale: scale1 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_POSTER}')` }}
        />

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={HERO_VIDEO_URL} type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/70" />
      </motion.div>

      <MouseBubbles />

      <motion.div
        style={{ opacity: opacity1 }}
        className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24 text-center lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
          className="mb-6 flex items-center justify-center gap-4"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "circOut" }}
            className="h-px bg-lime/60"
          />
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.35em] text-lime">
            La clinica de longevidad mas grande de Europa
          </span>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "circOut" }}
            className="h-px bg-lime/60"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
          className="font-display text-3xl font-normal text-white/90 sm:text-4xl md:text-5xl"
        >
          El balneario de la
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
          className="mt-1 font-display text-7xl font-normal leading-[0.95] text-white sm:text-8xl md:text-9xl lg:text-[8rem]"
          style={{ textShadow: "0 2px 40px rgba(0,0,0,0.3)" }}
        >
          <AnimatedText text="Longevidad" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "circOut" }}
          className="mx-auto mt-8 max-w-xl text-base font-body font-light leading-relaxed text-white/75"
        >
          Bienvenido a un balneario moderno que ofrece protocolos de longevidad
          de vanguardia en un entorno de paz y naturaleza.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "circOut" }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <MagneticButton href="/reserva" size="lg">
            Reservar estancia
          </MagneticButton>
          <MagneticButton
            href="#perfiles"
            variant="outline"
            size="lg"
            className="border-white/40 text-white hover:bg-white hover:text-navy hover:border-white"
          >
            Descubrir programas
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, ease: "circOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        style={{ opacity: opacity1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
