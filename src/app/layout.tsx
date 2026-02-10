import type { Metadata } from "next";
import { Forum, Raleway, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { FloatingFormButton } from "@/components/forms/FloatingFormButton";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { SchemaOrg } from "@/components/seo/SchemaOrg";
import "./globals.css";

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Balneario de Cofrentes | La Clinica de Longevidad mas grande de Europa",
    template: "%s | Balneario de Cofrentes",
  },
  description:
    "Balneario de Cofrentes, la clinica de longevidad mas grande de Europa. Tratamientos termales, medicina regenerativa, fisioterapia y programas de salud personalizados en Valencia.",
  keywords: [
    "balneario",
    "cofrentes",
    "longevidad",
    "termalismo",
    "medicina regenerativa",
    "spa",
    "valencia",
    "tratamientos termales",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://balneario.com",
    siteName: "Balneario de Cofrentes",
    title: "Balneario de Cofrentes | La Clinica de Longevidad mas grande de Europa",
    description:
      "Tratamientos termales, medicina regenerativa y programas de salud personalizados.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <meta name="theme-color" content="#1E293B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Balneario" />
      </head>
      <body
        className={`${forum.variable} ${raleway.variable} ${inter.variable} antialiased`}
      >
        <ScrollProgress />
        <FloatingParticles />
        <SchemaOrg type="localbusiness" />
        <SchemaOrg type="website" />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatbotWidget />
        <FloatingFormButton />
      </body>
    </html>
  );
}
