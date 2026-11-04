import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick">;

const baseClasses =
  "group min-h-12 items-center gap-2.5 rounded-full pl-5 pr-1.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-background)]";

const variantClasses = {
  primary:
    "primary-action bg-accent site-on-accent shadow-sm hover:bg-accent-dark hover:shadow-md",
  secondary:
    "border site-divider bg-surface/40 site-text-primary hover:border-accent/40 hover:bg-surface",
};

const circleClasses = {
  primary: "bg-[var(--site-background)] text-theme-accent",
  secondary:
    "bg-surface-elevated group-hover:bg-accent/10",
};

const CtaButton = ({
  href,
  children,
  variant = "primary",
  external = false,
  onClick,
  className = "",
}: CtaButtonProps) => (
  <a
    href={href}
    onClick={onClick}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className={`${baseClasses} ${variantClasses[variant]} ${className}`}
  >
    {children}

    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full ${circleClasses[variant]}`}
    >
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </span>
  </a>
);

export default CtaButton;
