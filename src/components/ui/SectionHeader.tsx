interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`mb-12 max-w-2xl lg:mb-16 ${alignment}`}>
      {eyebrow && (
        <span
          className={`mb-4 inline-block text-[11px] font-body font-semibold uppercase tracking-[0.2em] ${
            dark ? "text-lime" : "text-navy-light"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base font-body font-light leading-relaxed ${
            dark ? "text-white/60" : "text-warm-gray"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
