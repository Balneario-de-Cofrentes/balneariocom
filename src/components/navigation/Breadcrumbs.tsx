import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      <a
        href="/"
        className="flex items-center gap-1.5 text-stone transition-colors hover:text-charcoal"
        aria-label="Inicio"
      >
        <Home size={14} />
        <span className="hidden sm:inline">Inicio</span>
      </a>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-sand" />
          {item.href ? (
            <a
              href={item.href}
              className="text-stone transition-colors hover:text-charcoal"
            >
              {item.label}
            </a>
          ) : (
            <span className="font-medium text-charcoal" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
