import type { ReactNode } from "react";

/**
 * Wraps every route's content. Unlike a layout, a template remounts on
 * navigation, which is what lets the page animate in on each route change.
 *
 * Kept deliberately small (6px, one duration step) — a page that travels far
 * on every navigation reads as a slideshow. Server component, so this costs no
 * client JavaScript; the animation is pure CSS and disabled under
 * prefers-reduced-motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
