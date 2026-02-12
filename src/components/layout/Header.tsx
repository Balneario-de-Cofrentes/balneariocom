"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Clinica", href: "/clinica" },
  { label: "Programas", href: "/programas" },
  { label: "Instalaciones", href: "/instalaciones" },
  { label: "Escapada Termal", href: "/escapada-termal" },
  { label: "Sobre Nosotros", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="/images/logo.png"
            alt="Balneario de Cofrentes"
            width={180}
            height={40}
            className={`h-8 w-auto transition-all duration-500 ${
              scrolled && !isOpen ? "brightness-0" : ""
            }`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] font-body font-medium tracking-wide transition-colors duration-300 ${
                scrolled
                  ? "text-charcoal/70 hover:text-navy-light"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Contact */}
        <div className="flex items-center gap-5">
          <a
            href="tel:+34961894025"
            className={`hidden items-center gap-2 text-xs font-body font-medium transition-colors duration-300 lg:flex ${
              scrolled ? "text-charcoal/50 hover:text-navy-light" : "text-white/50 hover:text-white"
            }`}
            aria-label="Llamar al balneario"
          >
            <Phone size={12} />
            <span>961 894 025</span>
          </a>

          <Link
            href="/reserva"
            className={`hidden rounded-full px-6 py-2 text-[13px] font-body font-semibold transition-all duration-300 sm:block ${
              scrolled
                ? "bg-lime text-navy hover:bg-lime-dark"
                : "bg-white/15 text-white backdrop-blur-sm border border-white/25 hover:bg-white/25"
            }`}
          >
            Reservar
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 p-2 transition-colors lg:hidden ${
              isOpen ? "text-white" : scrolled ? "text-charcoal" : "text-white"
            }`}
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy"
          >
            <nav id="mobile-nav" className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-3xl text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.06 }}
              >
                <Link
                  href="/reserva"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 inline-block rounded-full bg-lime px-8 py-3 text-base font-body font-semibold text-navy"
                >
                  Reservar estancia
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
