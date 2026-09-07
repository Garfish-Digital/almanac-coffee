import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "onDark" | "quiet";

const base =
  "group inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-sm px-6 text-sm font-600 " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-[var(--ac-dur-fast)] ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:duration-[var(--ac-dur-instant)]";

const variants: Record<Variant, string> = {
  primary: "bg-ember text-cream shadow-sm hover:bg-amber hover:shadow-md",
  outline: "border border-hairline-strong bg-surface text-espresso hover:border-ember hover:text-ember hover:shadow-sm",
  onDark: "bg-paper/10 text-paper ring-1 ring-white/30 backdrop-blur-sm hover:bg-paper/20 hover:ring-white/50",
  quiet: "px-0 text-espresso hover:text-ember hover:translate-y-0",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Trailing arrow that slides on hover. Off for buttons that aren’t a journey. */
  arrow?: boolean;
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-[var(--ac-dur-base)] ease-[var(--ac-ease-spring)] group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </Link>
  );
}
