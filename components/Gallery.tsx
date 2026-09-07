import Image from "next/image";
import Reveal from "@/components/Reveal";

export type GalleryItem = {
  src: string;
  /** Doubles as the hover caption, so write it like a caption */
  alt: string;
};

type Props = {
  items: GalleryItem[];
  /** Columns at the widest breakpoint */
  columns?: 3 | 6;
  className?: string;
};

const gridFor = {
  3: "grid-cols-2 md:grid-cols-3",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
} as const;

export default function Gallery({ items, columns = 6, className = "" }: Props) {
  return (
    <ul className={`grid gap-2 sm:gap-3 ${gridFor[columns]} ${className}`}>
      {items.map((item, i) => (
        <li key={item.src}>
          <Reveal delay={i * 0.05}>
            <figure className="group relative aspect-square overflow-hidden rounded-sm bg-sunken">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                quality={75}
                sizes={
                  columns === 6
                    ? "(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    : "(min-width: 768px) 33vw, 50vw"
                }
                className="object-cover transition-transform duration-[var(--ac-dur-slower)] ease-[var(--ac-ease-out)] group-hover:scale-[1.07]"
              />
              {/* Caption rides in from below on hover, over a gradient that only
                  appears with it — nothing covers the image at rest. */}
              <figcaption
                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 to-transparent p-3 text-2xs leading-snug text-paper opacity-0
                           transition-[opacity,transform] duration-[var(--ac-dur-base)] ease-out
                           group-hover:translate-y-0 group-hover:opacity-100"
              >
                {item.alt}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
