import { getImageProps } from "next/image";
import type { ReactNode } from "react";

type Props = {
  /** Landscape master, used from 640px up */
  desktopSrc: string;
  desktopWidth: number;
  desktopHeight: number;
  /** Portrait crop of the same scene, used on phones */
  mobileSrc: string;
  mobileWidth: number;
  mobileHeight: number;
  alt: string;
  children: ReactNode;
};

/**
 * The hero. One component, one height, on every page.
 *
 * Height is a flat 60svh (floored and capped so it stays sane on a watch or an
 * ultrawide) — the three pages previously ran 88svh, 46svh and 46svh, which is
 * why they never felt like the same site.
 *
 * It carries two overlays of its own: a bottom-weighted scrim for the headline
 * and a lighter top-weighted one for the masthead sitting over it. Both are
 * photographic treatment, not chrome — there is no header bar on this site.
 */
export default function Hero({
  desktopSrc,
  desktopWidth,
  desktopHeight,
  mobileSrc,
  mobileWidth,
  mobileHeight,
  alt,
  children,
}: Props) {
  const common = { alt, sizes: "100vw", quality: 82 };

  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: desktopSrc, width: desktopWidth, height: desktopHeight });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: mobileSrc, width: mobileWidth, height: mobileHeight });

  return (
    <section
      data-tone="dark"
      className="relative isolate flex min-h-[clamp(24rem,60svh,46rem)] items-end overflow-hidden bg-page"
    >
      <picture>
        <source media="(min-width: 640px)" srcSet={desktop} />
        <source srcSet={mobile} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img
          {...rest}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover motion-safe:animate-[hero-settle_1.4s_var(--ac-ease-out)_both]"
        />
      </picture>

      {/* Bottom-weighted, for the headline */}
      <div aria-hidden className="photo-scrim absolute inset-0 -z-10" />
      {/* Top-weighted, for the masthead that sits over this image */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[46%] bg-gradient-to-b from-ink/55 via-ink/20 to-transparent"
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      {/* Reserves the masthead's footprint. The mark is absolutely
          positioned over this image, so without this the headline runs
          straight under it on a laptop-height viewport. */}
      <div className="relative w-full pt-[clamp(9.5rem,23vw,17rem)] pb-[clamp(2.5rem,6vw,5rem)]">
        {children}
      </div>
    </section>
  );
}
