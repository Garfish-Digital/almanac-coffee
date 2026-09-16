import type { ReactNode } from "react";

type Tone = "light" | "sunken" | "dark";

/**
 * A full-width page section, and the only place a section's ground color is
 * decided.
 *
 * `tone="dark"` sets `data-tone="dark"`, which reassigns the semantic tokens
 * for the whole subtree (see styles/tokens.css). `bg-page` therefore resolves
 * to paper in a light section and espresso in a dark one, and every child
 * built on semantic utilities inverts with it — no per-component dark variants.
 */
export default function Section({
  tone = "light",
  spacing = "normal",
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  spacing?: "normal" | "tight" | "none";
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ground = tone === "sunken" ? "bg-sunken" : "bg-page";
  const pad =
    spacing === "none" ? "" : spacing === "tight" ? "py-section-tight" : "py-section";

  return (
    <section
      id={id}
      data-tone={tone === "dark" ? "dark" : undefined}
      className={`${ground} ${pad} ${className}`}
    >
      {children}
    </section>
  );
}
