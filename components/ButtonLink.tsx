import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "plate" | "inverse";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  plate: "btn-plate",
  inverse: "btn-inverse",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/**
 * The button. Styling lives in the `.btn*` component layer in globals.css
 * rather than in utility soup here, because the variants need pseudo-element
 * flood layers and multi-stop box-shadows that don't express well as classes.
 *
 * No trailing arrow: the label carries the meaning, and a glyph repeated on
 * every control reads as decoration rather than direction.
 */
export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  return (
    <Link href={href} className={`btn ${variants[variant]} ${className}`}>
      <span className="btn-label">{children}</span>
    </Link>
  );
}
