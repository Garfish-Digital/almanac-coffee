import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  /** Renders to the right on wide screens — usually a "see everything" link */
  action?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  align = "start",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-6 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      {/* No tone branching: the semantic tokens invert themselves inside a
          section marked data-tone="dark". */}
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 text-3xl text-primary">{title}</h2>
        {lead && (
          <p className="mt-4 max-w-measure text-md leading-relaxed text-muted">{lead}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
