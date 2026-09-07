import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  /** Renders to the right on wide screens — usually a "see everything" link */
  action?: ReactNode;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  align = "start",
  tone = "light",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-6 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`eyebrow ${tone === "dark" ? "text-on-dark-muted" : ""}`}>{eyebrow}</p>
        )}
        <h2
          className={`mt-3 text-3xl ${tone === "dark" ? "text-paper" : "text-espresso"}`}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={`mt-4 max-w-measure text-md leading-relaxed ${
              tone === "dark" ? "text-on-dark-muted" : "text-muted"
            }`}
          >
            {lead}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
