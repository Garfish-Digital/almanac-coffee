import Image from "next/image";
import Reveal from "@/components/Reveal";
import { stagger } from "@/lib/motion";

export type GalleryItem = {
  src: string;
  /** Doubles as the hover caption, so write it like a caption */
  alt: string;
};

type Props = {
  items: GalleryItem[];
  /** `row` is an even line of squares; `editorial` is the offset three-column set */
  layout?: "row" | "editorial";
  className?: string;
};

/** Sequential chunks, so the order still reads correctly when the columns
 *  collapse to a single flow on a phone. */
function chunk<T>(items: T[], columns: number): T[][] {
  const perColumn = Math.ceil(items.length / columns);
  return Array.from({ length: columns }, (_, c) =>
    items.slice(c * perColumn, (c + 1) * perColumn)
  );
}

/* Varied ratios per column position — an even grid of identical squares is
   what made this read as contact-sheet filler rather than photography. */
const RATIOS = [
  ["md:aspect-4/5", "md:aspect-square"],
  ["md:aspect-square", "md:aspect-4/5"],
  ["md:aspect-4/5", "md:aspect-square"],
];

function Frame({
  item,
  ratio,
  delay,
}: {
  item: GalleryItem;
  ratio: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <figure className={`group relative aspect-square overflow-hidden rounded-sm bg-sunken ${ratio}`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          quality={75}
          sizes="(min-width: 768px) 32vw, 50vw"
          className="object-cover transition-transform duration-[var(--ac-dur-image)] ease-[var(--ac-ease-out)] group-hover:scale-[1.05]"
        />
        <figcaption
          className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 to-transparent p-3 text-2xs leading-snug text-paper opacity-0
                     transition-[opacity,transform] duration-[var(--ac-dur-base)] ease-out
                     group-hover:translate-y-0 group-hover:opacity-100"
        >
          {item.alt}
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function Gallery({ items, layout = "row", className = "" }: Props) {
  if (layout === "row") {
    return (
      <ul className={`grid grid-cols-2 gap-3 md:grid-cols-3 ${className}`}>
        {items.map((item, i) => (
          <li key={item.src}>
            <Frame item={item} ratio="" delay={stagger(i)} />
          </li>
        ))}
      </ul>
    );
  }

  /* Editorial: three columns, the middle one dropped, ratios alternating.
     `contents` lets the columns dissolve on a phone so the six frames flow
     into a plain two-up grid in their original order. */
  const columns = chunk(items, 3);
  let index = 0;

  return (
    <div className={`grid grid-cols-2 gap-3 md:grid-cols-3 md:items-start md:gap-5 ${className}`}>
      {columns.map((column, c) => (
        <div
          key={c}
          className={`contents md:flex md:flex-col md:gap-5 ${c === 1 ? "md:mt-16" : ""}`}
        >
          {column.map((item, r) => {
            const delay = stagger(index++);
            return <Frame key={item.src} item={item} ratio={RATIOS[c][r] ?? ""} delay={delay} />;
          })}
        </div>
      ))}
    </div>
  );
}
