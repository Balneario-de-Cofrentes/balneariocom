import { MapPin, Phone, Mail, Clock, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";

const footerSections = [
  {
    title: "Clínica de Longevidad",
    links: [
      { label: "Balneoterapia", href: "/clinica/balneoterapia-respiratoria" },
      { label: "Fisioterapia", href: "/clinica/fisioterapia" },
      { label: "Medicina Regenerativa", href: "/clinica/medicina-regenerativa" },
      { label: "Masajes", href: "/clinica/masajes" },
      { label: "Nutrición", href: "/clinica/nutricion" },
      { label: "Ozonoterapia", href: "/clinica/ozonoterapia" },
    ],
  },
  {
    title: "Programas",
    links: [
      { label: "Escapada Termal", href: "/programas/escapada-termal" },
      { label: "Programa Saludable", href: "/programas/programa-saludable-inicial" },
      { label: "Programa Anti-inflamatorio", href: "/programas/programa-anti-inflamatorio-inicial" },
      { label: "Programa Dolor", href: "/programas/programa-dolor-avanzado" },
      { label: "Programa Longevidad", href: "/programas/programa-longevidad-personalizado" },
      { label: "IMSERSO", href: "/programas/imserso-balneario" },
    ],
  },
  {
    title: "Información",
    links: [
      { label: "Sobre Nosotros", href: "/about" },
      { label: "Instalaciones", href: "/instalaciones" },
      { label: "Blog", href: "/blog" },
      { label: "Subvenciones", href: "/subvenciones" },
      { label: "Prensa", href: "/prensa" },
      { label: "HumanLab", href: "/humanlab" },
    ],
  },
];

const externalLinks = [
  { label: "Progevita", href: "https://progevita.com", description: "Longevidad 35-65 años" },
  { label: "Fundación MAFT", href: "https://maftfoundation.org", description: "Filantropía y longevidad" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setSubscribeError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer_newsletter" }),
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        const payload = await response.json().catch(() => ({}));
        setSubscribeError(
          typeof payload?.error === "string"
            ? payload.error
            : "No pudimos procesar su suscripción en este momento."
        );
      }
    } catch {
      setSubscribeError("No pudimos procesar su suscripción en este momento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-navy text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 bg-gradient-to-r from-navy/20 to-navy/10">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left lg:gap-12">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime text-navy">
                  <Sparkles size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl text-white lg:text-3xl">
                  Recibe consejos de longevidad
                </h3>
                <p className="mt-2 font-body text-white/70 lg:max-w-md">
                  Únete a nuestra newsletter y recibe consejos exclusivos sobre
                  medicina regenerativa, termalismo y salud de vanguardia.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  aria-label="Correo electrónico para newsletter"
                  className="flex-1 rounded-full border-2 border-white/30 bg-white px-6 py-3 text-charcoal placeholder:text-stone/50 outline-none transition-all focus:border-lime focus:ring-2 focus:ring-lime/20"
                  required
                />
                <button
                  type="submit"
                  disabled={loading || subscribed}
                  className="rounded-full bg-lime px-8 py-3 font-body font-semibold text-navy transition-all hover:scale-105 hover:shadow-lg hover:shadow-lime/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {subscribed ? "¡Suscrito!" : loading ? "Suscribiendo..." : "Suscribirse"}
                </button>
              </form>
              {subscribeError && (
                <p className="w-full text-xs font-body text-red-200 lg:max-w-sm">{subscribeError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block">
              <img
                src="/images/logo.webp"
                alt="Balneario de Cofrentes"
                width={200}
                height={44}
                loading="lazy"
                className="h-10 w-auto"
              />
            </a>
            <p className="mt-6 max-w-sm text-sm text-white/70">
              La clínica de longevidad más grande de Europa. Tratamientos
              termales y medicina regenerativa en el corazón de Valencia.
            </p>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <a
                href="https://maps.google.com/?q=Balneario+de+Cofrentes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Carretera del Balneario, s/n, 46625 Cofrentes, Valencia</span>
              </a>
              <a
                href="tel:+34961894025"
                className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Phone size={16} className="shrink-0" />
                <span>961 894 025</span>
              </a>
              <a
                href="mailto:info@balneario.com"
                className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Mail size={16} className="shrink-0" />
                <span>info@balneario.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Clock size={16} className="shrink-0" />
                <span>Lunes a Domingo, 8:00 - 20:00</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-body font-semibold uppercase tracking-wider text-white/70">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {section.title === "Información" && (
                  <>
                    <li className="pt-2 border-t border-white/5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Proyectos
                      </span>
                    </li>
                    {externalLinks.map((ext) => (
                      <li key={ext.href}>
                        <a
                          href={ext.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {ext.label}
                          <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-white/60 sm:flex-row lg:px-10">
          <p>&copy; {new Date().getFullYear()} Balneario de Cofrentes. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="/politica-de-privacidad-cookies" className="transition-colors hover:text-white">
              Aviso Legal
            </a>
            <a href="/politica-de-privacidad-cookies#politica-de-privacidad" className="transition-colors hover:text-white">
              Privacidad
            </a>
            <a href="/politica-de-privacidad-cookies#politica-de-cookies" className="transition-colors hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
