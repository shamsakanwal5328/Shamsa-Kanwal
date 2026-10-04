import Link from "next/link";
import type { ReactNode } from "react";
import { isExternal } from "@/lib/data";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-base font-semibold transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "border border-primary bg-surface text-primary hover:bg-subtle",
  ghost: "px-0 text-secondary underline-offset-4 hover:text-primary hover:underline min-h-0",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  download?: string | boolean;
  newTab?: boolean;
  className?: string;
  "aria-label"?: string;
}

/** A link styled as a button. All site actions navigate, so no <button> is needed here. */
export default function Button({
  href,
  children,
  variant = "primary",
  download,
  newTab,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const opensFile = download !== undefined || newTab || isExternal(href) || href.startsWith("mailto:");

  if (opensFile) {
    const targetProps = newTab || isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a href={href} className={classes} download={download === true ? "" : download} {...targetProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
