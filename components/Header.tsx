"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import shop from "@/content/shop";
import { DUR, EASE_OUT } from "@/lib/motion";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string; hint: string }[];
};

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/coffee",
    label: "Coffee",
    children: [
      { href: "/coffee#beans", label: "Beans", hint: "What’s on the shelf this week" },
      { href: "/coffee#grind", label: "Grind", hint: "Ground to match your brewer" },
      { href: "/coffee#bar", label: "At the bar", hint: "Taste it before you buy a bag" },
    ],
  },
  { href: "/visit", label: "Visit" },
];

/**
 * The masthead. Not a header.
 *
 * There is no bar: no background, no border, no blur, no sticky behavior and
 * no collapse animation. It is positioned absolutely at the top of the document
 * so it sits directly on the hero photograph and scrolls away with it. Every
 * page is short and the footer carries the full navigation, so nothing here
 * needs to persist.
 *
 * It always sits over a hero, so it declares the dark tone once and never
 * switches — which is what removed the scroll listener, the layout animation
 * and the two-state color logic this component used to carry.
 */
export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, [cancelClose]);
  useEffect(() => cancelClose, [cancelClose]);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-tone="dark"
      className="absolute inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-page items-start justify-between gap-6 px-gutter pt-[clamp(1.25rem,2.5vw,2.5rem)]">
        <Link href="/" aria-label={`${shop.name} — home`} className="block rounded-sm">
          <span className="logo-mark" role="img" aria-hidden />
        </Link>

        <nav aria-label="Primary" className="pt-2 sm:pt-4">
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV.map((item) => {
              const active = isActive(item.href);
              const open = openMenu === item.label;
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    if (item.children) setOpenMenu(item.label);
                  }}
                  onMouseLeave={scheduleClose}
                  onFocus={() => {
                    cancelClose();
                    if (item.children) setOpenMenu(item.label);
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup={item.children ? "true" : undefined}
                    aria-expanded={item.children ? open : undefined}
                    className={`relative flex h-11 items-center gap-1.5 rounded-sm px-3 text-2xs font-extrabold tracking-widest uppercase transition-colors duration-[var(--ac-dur-fast)] ${
                      active ? "text-primary" : "text-primary/75 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <svg
                        viewBox="0 0 10 6"
                        aria-hidden
                        className={`h-1.5 w-2.5 transition-transform duration-[var(--ac-dur-fast)] ease-out ${
                          open ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    )}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-pill bg-accent" />
                    )}
                  </Link>

                  {item.children && (
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                          transition={{ duration: reduceMotion ? 0 : DUR.fast, ease: EASE_OUT }}
                          className="absolute top-full right-0 hidden pt-2 md:block"
                        >
                          <ul className="w-72 overflow-hidden rounded-md border border-hairline bg-surface p-1.5 shadow-lg">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="group/item flex flex-col gap-0.5 rounded-sm px-3 py-2.5 transition-colors duration-[var(--ac-dur-fast)] hover:bg-sunken"
                                >
                                  <span className="text-sm font-bold text-primary">{child.label}</span>
                                  <span className="text-xs text-muted">{child.hint}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
