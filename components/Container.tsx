import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** `narrow` for prose-led sections, `page` for grids and galleries */
  width?: "page" | "narrow";
  as?: ElementType;
  className?: string;
};

/**
 * The one place the page gutter and max width are decided. Every section uses
 * it, which is most of why the columns line up from one section to the next.
 */
export default function Container({
  children,
  width = "page",
  as: Tag = "div",
  className = "",
}: Props) {
  const max = width === "narrow" ? "max-w-narrow" : "max-w-page";
  return <Tag className={`mx-auto w-full ${max} px-gutter ${className}`}>{children}</Tag>;
}
