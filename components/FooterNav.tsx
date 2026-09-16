"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/coffee", label: "Coffee" },
  { href: "/visit", label: "Visit" },
];

/**
 * The footer's page links. Client-side only because it needs the current route
 * to mark the active link — the rest of the footer stays a server component.
 *
 * Deliberately the same treatment as the masthead nav: uppercase, letterspaced,
 * weight 800, with an ember rule under the active page. With no header bar,
 * these two are the site's whole navigation, so they should read as one system.
 */
export default function FooterNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav aria-label="Footer">
      <ul className="space-y-3">
        {LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-block text-2xs font-extrabold tracking-widest uppercase transition-colors duration-[var(--ac-dur-fast)] ${
                  active ? "text-primary" : "text-primary/75 hover:text-primary"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-pill bg-accent"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
