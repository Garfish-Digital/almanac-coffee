"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { springIndicator } from "@/lib/motion";

type Section = { id: string; title: string };

/**
 * Sticky category sub-nav with scroll-spy.
 *
 * The highlighted category is the one you are actually reading — decided from
 * scroll position against a line just below the sticky header.
 */
export default function CategoryNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const headerH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--ac-subnav-h")
      ) * 16 || 72;

    /* The current category is the last one whose top has passed a line just
       below the sticky header. Deciding by position rather than intersection
       means there is always an answer — including above the first section,
       where an observer band would sit in the hero and match nothing, leaving
       the previous category highlighted. */
    const onScroll = () => {
      const line = window.scrollY + headerH + 120;

      let current = targets[0].id;
      for (const el of targets) {
        if (el.getBoundingClientRect().top + window.scrollY <= line) current = el.id;
      }

      // At the very bottom, make sure a short final section can still win.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = targets[targets.length - 1].id;

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  /* Keep the active pill in view when the rail scrolls horizontally on phones.
     This deliberately scrolls the rail's own axis rather than calling
     scrollIntoView: even with `block: "nearest"`, scrollIntoView will scroll
     ANY scrollable ancestor — including the document — to reveal the element.
     On navigating to this page while scrolled, that dragged the window back
     down and fought the router's scroll-to-top, landing you mid-page. */
  useEffect(() => {
    const rail = listRef.current;
    const el = rail?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!rail || !el) return;
    const left = el.offsetLeft - rail.clientWidth / 2 + el.clientWidth / 2;
    rail.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [active, reduceMotion]);

  /* Anchor clicks scroll smoothly. `scroll-behavior: smooth` is deliberately
     NOT set globally — it makes the router's scroll-to-top animate on every
     navigation, which reads as sluggish and can be interrupted mid-glide. */
  const onAnchorClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target || reduceMotion) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div
      /* Same treatment as the footer: dark ground, paper type. The tone flag
         makes bg-page resolve to espresso and the link colours invert. */
      data-tone="dark"
      className="sticky top-0 z-40 border-y border-hairline bg-page"
    >
      <nav aria-label="Menu categories" className="mx-auto max-w-page px-gutter">
        <ul
          ref={listRef}
          className="-mx-1 flex snap-x gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="snap-center">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => onAnchorClick(e, s.id)}
                  data-id={s.id}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex h-11 items-center rounded-sm px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-[var(--ac-dur-fast)] ${
                    isActive ? "text-on-accent" : "text-muted hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="category-pill"
                      transition={reduceMotion ? { duration: 0 } : springIndicator}
                      className="absolute inset-0 -z-10 rounded-sm bg-accent"
                    />
                  )}
                  <span className="relative">{s.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
