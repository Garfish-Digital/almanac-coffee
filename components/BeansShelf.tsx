import Image from "next/image";
import Reveal from "@/components/Reveal";
import { beans, price } from "@/content/menu";

export default function BeansShelf() {
  // Four across at desktop so the shelf reads as one row, rather than three
  // bags and an orphan on a second line.
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {beans.map((bean, i) => (
        <li key={bean.id}>
          <Reveal delay={i * 0.08} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-[var(--ac-dur-base)] ease-out hover:-translate-y-1 hover:border-hairline-strong hover:shadow-md">
              {/* The bag sits on a warm ground rather than a cut-out white box */}
              <div className="relative aspect-4/3 overflow-hidden bg-linen">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,var(--ac-cream),var(--ac-sand))]"
                />
                <Image
                  src={`/images/${bean.image}`}
                  alt={`${bean.name}, a ${bean.weight} retail bag`}
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-6 transition-transform duration-[var(--ac-dur-slower)] ease-[var(--ac-ease-out)] group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Titles run to one or two lines depending on the name, so the
                    price aligns to the top and the block reserves two lines —
                    otherwise the metadata below sits at a different height on
                    every card in the row. */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="min-h-[2.2em] text-xl leading-snug text-espresso">
                    {bean.name}
                  </h3>
                  <p className="shrink-0 font-body text-base font-600 text-secondary tabular-nums">
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
                      className="rounded-pill border border-hairline bg-sunken px-2.5 py-1 text-2xs font-600 tracking-wide text-secondary"
                    >
                      {note}
                    </li>
                  ))}
                </ul>

                <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-2 pt-6 text-xs">
                  <div>
                    <dt className="eyebrow">Altitude</dt>
                    <dd className="mt-1 text-espresso">{bean.altitude}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Process</dt>
                    <dd className="mt-1 text-espresso">{bean.process}</dd>
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
