import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?: "cream" | "white" | "dark" | "black";
  id?: string;
  narrow?: boolean;
}

const backgrounds = {
  cream: "bg-cream",
  white: "bg-white",
  dark: "bg-navy text-white",
  black: "bg-charcoal text-white",
};

export function Section({
  children,
  className = "",
  bg = "cream",
  id,
  narrow,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-section-sm lg:py-section ${backgrounds[bg]} ${className}`}
    >
      <div className={`mx-auto px-6 lg:px-10 ${narrow ? "max-w-4xl" : "max-w-7xl"}`}>
        {children}
      </div>
    </section>
  );
}
