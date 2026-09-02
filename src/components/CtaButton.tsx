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
  "group h-10 items-center gap-2.5 rounded-full pl-5 pr-1.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const variantClasses = {
  primary:
    "bg-accent text-white shadow-sm shadow-accent/30 hover:bg-accent-dark hover:shadow-md hover:shadow-accent/30",
  secondary:
    "border border-gray-300 bg-white/40 text-gray-900 hover:border-accent/40 hover:bg-white dark:border-gray-700 dark:bg-white/[0.04] dark:text-white dark:hover:border-accent-light/40 dark:hover:bg-white/10",
};

const circleClasses = {
  primary: "bg-white/20",
  secondary:
    "bg-gray-900/5 group-hover:bg-accent/10 dark:bg-white/10 dark:group-hover:bg-accent-light/15",
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
