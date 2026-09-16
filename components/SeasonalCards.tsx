import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { seasonal } from "@/content/menu";
import { stagger } from "@/lib/motion";

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
          <Reveal delay={stagger(i)} className="h-full">
            <Link
              href={card.href}
              className="card-surface group flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sunken">
                <Image
                  src={`/images/${card.image}`}
                  alt=""
                  fill
                  quality={75}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[var(--ac-dur-image)] ease-[var(--ac-ease-out)] group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow">{card.eyebrow}</p>
                <h3 className="mt-2.5 text-xl text-primary">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
                <span className="mt-auto pt-6 text-sm font-semibold">
                  {/* Rule draws in from the left when the whole card is hovered */}
                  <span className="link-draw">{card.linkLabel}</span>
                </span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
