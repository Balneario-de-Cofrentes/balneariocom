import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-lime text-navy hover:bg-lime-dark active:scale-[0.98] shadow-sm hover:shadow-md",
  secondary:
    "bg-navy text-white hover:bg-navy-light active:scale-[0.98] shadow-sm",
  outline:
    "border border-charcoal/20 text-charcoal hover:bg-navy hover:text-white hover:border-navy",
  ghost:
    "text-warm-gray hover:text-charcoal",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-[13px]",
  md: "px-7 py-3 text-[13px]",
  lg: "px-9 py-3.5 text-sm",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  external,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-300 cursor-pointer";
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
