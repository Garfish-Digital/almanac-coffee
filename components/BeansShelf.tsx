import Image from "next/image";
import Reveal from "@/components/Reveal";
import { beans, price } from "@/content/menu";
import { stagger } from "@/lib/motion";

export default function BeansShelf() {
  // Four across at desktop so the shelf reads as one row, rather than three
  // bags and an orphan on a second line.
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {beans.map((bean, i) => (
        <li key={bean.id}>
          <Reveal delay={stagger(i)} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-surface card-surface">
              {/* Origin photography rather than a cut-out bag, so it fills the
                  frame — no plinth or radial ground underneath it. */}
              <div className="relative aspect-4/3 overflow-hidden bg-sunken">
                <Image
                  src={`/images/${bean.image}`}
                  alt={bean.imageAlt}
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[var(--ac-dur-image)] ease-[var(--ac-ease-out)] group-hover:scale-[1.05]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Titles run to one or two lines depending on the name, so the
                    price aligns to the top and the block reserves two lines —
                    otherwise the metadata below sits at a different height on
                    every card in the row. */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="min-h-[2.2em] text-xl leading-snug text-primary">
                    {bean.name}
                  </h3>
                  <p className="shrink-0 font-body text-base font-semibold text-secondary tabular-nums">
                    {price(bean.price)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {bean.origin} · {bean.weight}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {bean.notes.map((note) => (
                    <li
                      key={note}
                      className="rounded-pill border border-hairline bg-sunken px-2.5 py-1 text-2xs font-semibold tracking-wide text-secondary"
                    >
                      {note}
                    </li>
                  ))}
                </ul>

                <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-2 pt-6 text-xs">
                  <div>
                    <dt className="eyebrow">Altitude</dt>
                    <dd className="mt-1 text-primary">{bean.altitude}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Process</dt>
                    <dd className="mt-1 text-primary">{bean.process}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
