"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

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
        getComputedStyle(document.documentElement).getPropertyValue("--ac-header-h")
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

  /* Keep the active pill in view when the rail scrolls horizontally on phones */
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion ? "auto" : "smooth" });
  }, [active, reduceMotion]);

  return (
    <div className="sticky top-header z-40 border-y border-hairline bg-page/88 backdrop-blur-md">
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
                  data-id={s.id}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex h-11 items-center rounded-sm px-4 text-sm font-600 whitespace-nowrap transition-colors duration-[var(--ac-dur-fast)] ${
                    isActive ? "text-cream" : "text-muted hover:text-espresso"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="category-pill"
                      transition={
                        reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }
                      }
                      className="absolute inset-0 -z-10 rounded-sm bg-espresso"
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
