import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  href: string;
  eyebrow?: string;
  className?: string;
}

export function Card({
  title,
  description,
  image,
  href,
  eyebrow,
  className = "",
}: CardProps) {
  return (
    <a
      href={href}
      className={`group block overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      )}
      <div className="p-6">
        {eyebrow && (
          <span className="mb-2 inline-block text-xs font-body font-medium uppercase tracking-wider text-navy-light">
            {eyebrow}
          </span>
        )}
        <h3 className="font-display text-xl lg:text-2xl text-charcoal group-hover:text-navy-light transition-colors duration-300">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm font-body text-warm-gray line-clamp-2">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2 text-sm font-body font-medium text-navy-light opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
          <span>Descubrir</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </a>
  );
}
