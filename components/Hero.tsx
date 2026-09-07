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
  /** `full` fills the viewport (Home); `band` is a slimmer page header */
  height?: "full" | "band";
};

/**
 * Art-directed hero.
 *
 * `getImageProps` lets a real <picture> element choose between the portrait
 * and landscape crops, so a phone downloads the portrait master and nothing
 * else — rather than being handed a wide image and cropping it with CSS.
 *
 * Per the next/image docs, an art-directed <picture> must not use `preload` or
 * `loading="eager"` (both would defeat the source selection and pull down two
 * files). `fetchPriority="high"` is the correct lever for an LCP image here.
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
  height = "full",
}: Props) {
  const common = { alt, sizes: "100vw", quality: 82 };

  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: desktopSrc, width: desktopWidth, height: desktopHeight });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: mobileSrc, width: mobileWidth, height: mobileHeight });

  const box =
    height === "full"
      ? "min-h-[clamp(34rem,88svh,54rem)]"
      : "min-h-[clamp(20rem,46svh,30rem)]";

  return (
    <section className={`relative isolate flex ${box} items-end overflow-hidden bg-espresso`}>
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

      {/* Scrim, so the headline is legible over any part of the photograph.
          Both overlays sit behind the content rather than on top of it. */}
      <div aria-hidden className="photo-scrim absolute inset-0 -z-10" />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <div className="relative w-full pb-[clamp(3rem,7vw,6rem)] pt-header">{children}</div>
    </section>
  );
}
