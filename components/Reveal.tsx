"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger position within a group, in seconds */
  delay?: number;
  /** Distance traveled, in px */
  y?: number;
  className?: string;
};

/**
 * A single rise-and-fade as an element first enters the viewport.
 *
 * The hidden state lives in CSS behind `html.js` (see globals.css), not in this
 * component’s markup. That matters:
 *
 *   - Server and client render identical, *visible* markup, so there is no
 *     hydration mismatch to leave an element stuck at `opacity: 0`.
 *   - With JS off, or if it fails, every section is simply visible.
 *   - `prefers-reduced-motion` disables the hiding rule outright.
 *
 * The `js` class is set before first paint, so there’s no flash of content
 * appearing and then hiding itself.
 */
export default function Reveal({ children, delay = 0, y = 22, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-revealed");

    // No observer, no reason to keep anything hidden.
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show();
          // Once only. A reveal that replays on every pass reads as a twitch.
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={
        {
          "--reveal-delay": `${delay * 1000}ms`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
