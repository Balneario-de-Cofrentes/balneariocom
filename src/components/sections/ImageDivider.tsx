"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ImageDividerProps {
  image: string;
  alt: string;
  quote?: string;
  author?: string;
}

export function ImageDivider({ image, alt, quote, author }: ImageDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[50vh] overflow-hidden lg:h-[60vh]">
      <motion.div
        style={{ y }}
        className="absolute inset-[-20%] bg-cover bg-center"
        aria-label={alt}
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-navy/50" />
      {quote && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl px-6 text-center"
          >
            <span className="gold-line mx-auto mb-6" />
            <blockquote className="font-display text-2xl leading-relaxed text-white lg:text-4xl">
              {quote}
            </blockquote>
            {author && (
              <p className="mt-4 text-sm font-body text-white/60">{author}</p>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
