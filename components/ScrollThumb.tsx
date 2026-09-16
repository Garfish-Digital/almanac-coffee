"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_THUMB = 48;
const INSET = 4;

/**
 * A scroll thumb that floats over the content, with no track.
 *
 * A native scrollbar always occupies a gutter outside the content box, and the
 * body's background propagates to the canvas — so even a fully transparent
 * track paints as a pale strip beside the dark sections. There is no CSS that
 * removes it. Hiding the native bar and drawing the thumb over the page is the
 * only way to get a thumb without a track.
 *
 * Keyboard and trackpad scrolling are untouched; this replaces the painted
 * scrollbar, not the scrolling. The thumb is draggable so it stays useful.
 */
export default function ScrollThumb() {
  const [metrics, setMetrics] = useState({ height: 0, offset: 0, visible: false });
  const dragging = useRef<{ startY: number; startScroll: number } | null>(null);

  const measure = useCallback(() => {
    const doc = document.documentElement;
    const viewport = doc.clientHeight;
    const total = doc.scrollHeight;
    const scrollable = total - viewport;

    if (scrollable <= 8) {
      setMetrics((m) => (m.visible ? { ...m, visible: false } : m));
      return;
    }
    const track = viewport - INSET * 2;
    const height = Math.max(MIN_THUMB, (viewport / total) * track);
    const offset = (window.scrollY / scrollable) * (track - height);
    setMetrics({ height, offset, visible: true });
  }, []);

  useEffect(() => {
    /* No synchronous measure() here: ResizeObserver fires once on observe(),
       which covers the initial read without a setState inside the effect body. */
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    // Reveal animations and lazy images change the page height as you go
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const state = dragging.current;
      if (!state) return;
      const doc = document.documentElement;
      const viewport = doc.clientHeight;
      const scrollable = doc.scrollHeight - viewport;
      const track = viewport - INSET * 2 - metrics.height;
      if (track <= 0) return;
      const delta = e.clientY - state.startY;
      window.scrollTo({ top: state.startScroll + (delta / track) * scrollable, behavior: "instant" });
    };
    const onUp = () => {
      dragging.current = null;
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [metrics.height]);

  if (!metrics.visible) return null;

  return (
    <div
      aria-hidden
      onPointerDown={(e) => {
        e.preventDefault();
        dragging.current = { startY: e.clientY, startScroll: window.scrollY };
        document.body.style.userSelect = "none";
      }}
      style={{ height: `${metrics.height}px`, transform: `translateY(${metrics.offset}px)` }}
      className="scroll-thumb fixed top-[4px] right-[3px] z-[60] w-2 cursor-grab rounded-pill bg-amber/85 transition-colors duration-[var(--ac-dur-fast)] hover:bg-ember active:cursor-grabbing active:bg-ember"
    />
  );
}
