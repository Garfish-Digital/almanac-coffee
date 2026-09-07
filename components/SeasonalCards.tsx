import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { seasonal } from "@/content/menu";

/**
 * The three seasonal cards. Every card is the same height, the same padding,
 * and its link sits on the same baseline as its siblings' — the grid does that
 * with `h-full` and a `mt-auto` footer rather than by hand-tuned margins.
 */
export default function SeasonalCards() {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {seasonal.map((card, i) => (
        <li key={card.id}>
          <Reveal delay={i * 0.08} className="h-full">
            <Link
              href={card.href}
              className="group flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-surface
                         transition-[border-color,box-shadow,transform] duration-[var(--ac-dur-base)] ease-out
                         hover:-translate-y-1 hover:border-hairline-strong hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sunken">
                <Image
                  src={`/images/${card.image}`}
                  alt=""
                  fill
                  quality={75}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[var(--ac-dur-slower)] ease-[var(--ac-ease-out)] group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow">{card.eyebrow}</p>
                <h3 className="mt-2.5 text-xl text-espresso">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-600 text-ember">
                  {card.linkLabel}
                  <span
                    aria-hidden
                    className="transition-transform duration-[var(--ac-dur-base)] ease-[var(--ac-ease-spring)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
