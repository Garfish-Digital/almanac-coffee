"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import shop from "@/content/shop";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string; hint: string }[];
};

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/menu",
    label: "Coffee",
    children: [
      { href: "/menu#beans", label: "Beans", hint: "What’s on the shelf this week" },
      { href: "/menu#grind", label: "Grind", hint: "Ground to match your brewer" },
      { href: "/menu#espresso", label: "At the bar", hint: "Taste it before you buy a bag" },
    ],
  },
  { href: "/visit", label: "Visit" },
];

export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Hover-out is delayed so a diagonal cursor path to the panel doesn’t
     close it, and so a 1px seam can never orphan the dropdown. */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, [cancelClose]);

  /* The header sits over the hero on Home and only takes on a surface once
     you’ve scrolled past it. Everywhere else it’s solid from the start. */
  const overlay = pathname === "/";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close both menus when the route changes. Adjusting state during render is
     React's documented pattern for this — an effect would commit the stale
     open menu first and then immediately re-render to close it. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Don’t let the page scroll behind the mobile panel */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => cancelClose, [cancelClose]);

  const solid = scrolled || !overlay || mobileOpen;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-solid={solid}
      className="fixed inset-x-0 top-0 z-50 h-header transition-[background-color,box-shadow,border-color] duration-[var(--ac-dur-base)] ease-out
                 border-b border-transparent
                 data-[solid=true]:border-hairline data-[solid=true]:bg-page/85 data-[solid=true]:shadow-xs data-[solid=true]:backdrop-blur-md"
    >
      <div className="mx-auto flex h-full max-w-page items-center justify-between gap-6 px-gutter">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label={`${shop.name} — home`}
          className="group flex items-center gap-3 rounded-sm"
        >
          <Image
            src="/images/logo/Almanac-Coffee-Co-Logo.svg"
            alt=""
            width={44}
            height={42}
            loading="eager"
            className={`h-9 w-auto transition-[transform,filter] duration-[var(--ac-dur-slow)] ease-out group-hover:scale-105 ${
              solid ? "" : "brightness-0 invert"
            }`}
          />
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-lg font-600 tracking-tight transition-colors duration-[var(--ac-dur-base)] ${
                solid ? "text-espresso" : "text-paper"
              }`}
            >
              {shop.name}
            </span>
            <span
              className={`mt-0.5 text-2xs tracking-widest uppercase transition-colors duration-[var(--ac-dur-base)] ${
                solid ? "text-muted" : "text-on-dark-muted"
              }`}
            >
              Est. Sheridan
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
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
                    className={`relative flex h-11 items-center gap-1.5 rounded-sm px-3.5 text-sm font-500 transition-colors duration-[var(--ac-dur-fast)]
                      ${solid ? "text-espresso hover:text-ember" : "text-paper hover:text-white"}`}
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
                        <path
                          d="M1 1l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 460, damping: 38 }
                        }
                        className={`absolute inset-x-3.5 bottom-1.5 h-px ${
                          solid ? "bg-ember" : "bg-paper/80"
                        }`}
                      />
                    )}
                  </Link>

                  {item.children && (
                    <AnimatePresence>
                      {open && (
                        /* Panel is anchored to the trigger and its wrapper starts
                           flush at the trigger’s bottom edge — there is no gap for
                           the pointer to fall through. */
                        <motion.div
                          initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                          transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                          className="absolute top-full left-0 pt-2"
                        >
                          <ul className="w-72 overflow-hidden rounded-md border border-hairline bg-surface p-1.5 shadow-lg">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="group/item flex flex-col gap-0.5 rounded-sm px-3 py-2.5 transition-colors duration-[var(--ac-dur-fast)] hover:bg-sunken"
                                >
                                  <span className="flex items-center gap-1.5 text-sm font-600 text-espresso">
                                    {child.label}
                                    <span
                                      aria-hidden
                                      className="translate-x-0 text-ember opacity-0 transition-all duration-[var(--ac-dur-fast)] ease-out group-hover/item:translate-x-1 group-hover/item:opacity-100"
                                    >
                                      →
                                    </span>
                                  </span>
                                  <span className="text-xs leading-normal text-muted">{child.hint}</span>
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

        <div className="flex items-center gap-2">
          <Link
            href="/visit#contact"
            className={`hidden h-11 items-center rounded-sm px-4 text-sm font-600 transition-all duration-[var(--ac-dur-fast)] ease-out md:inline-flex
              ${
                solid
                  ? "bg-espresso text-paper hover:bg-mahogany"
                  : "bg-paper/12 text-paper ring-1 ring-white/30 backdrop-blur-sm hover:bg-paper/22"
              }`}
          >
            Say hello
          </Link>

          {/* Mobile trigger — a 44px target, not a 24px one */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`grid h-11 w-11 place-items-center rounded-sm transition-colors md:hidden ${
              solid ? "text-espresso" : "text-paper"
            }`}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-[var(--ac-dur-base)] ease-out ${
                  mobileOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 block h-px w-full bg-current transition-opacity duration-[var(--ac-dur-fast)] ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-[var(--ac-dur-base)] ease-out ${
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-x-0 top-header max-h-[calc(100dvh-var(--ac-header-h))] overflow-y-auto border-b border-hairline bg-page px-gutter pt-2 pb-8 shadow-lg md:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.26,
                    delay: reduceMotion ? 0 : 0.04 + i * 0.05,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="border-b border-hairline last:border-b-0"
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-[3.25rem] items-center justify-between font-display text-2xl text-espresso"
                  >
                    {item.label}
                    <span aria-hidden className="text-ember">→</span>
                  </Link>
                  {item.children && (
                    <ul className="-mt-1 flex flex-wrap gap-x-4 gap-y-1 pb-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-ember"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
            <Link
              href="/visit#contact"
              className="mt-6 flex min-h-[3rem] items-center justify-center rounded-sm bg-espresso px-4 font-600 text-paper"
            >
              Say hello
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
