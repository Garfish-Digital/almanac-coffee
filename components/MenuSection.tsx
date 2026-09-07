import Image from "next/image";
import Reveal from "@/components/Reveal";
import { price, type MenuCategory } from "@/content/menu";

/**
 * One category of the bar list.
 *
 * Prices sit in their own column with tabular figures, so the right edge is a
 * true column rather than a ragged edge that happens to look close.
 */
export default function MenuSection({
  category,
  /** Flips the image stack to the other side so consecutive sections alternate */
  flip = false,
}: {
  category: MenuCategory;
  flip?: boolean;
}) {
  const shots = category.items.filter((i) => i.image).slice(0, 2);

  return (
    <section id={category.id} className="scroll-mt-[calc(var(--ac-header-h)+4.5rem)] py-section-tight">
      {/* Alternating sections swap sides, but the list keeps the wide column
          and the shots keep the narrow one — so every category is set to the
          same measure whichever way round it sits. */}
      <div
        className={`grid gap-x-14 gap-y-10 ${
          flip ? "lg:grid-cols-[1fr_1.35fr]" : "lg:grid-cols-[1.35fr_1fr]"
        }`}
      >
        <div className={flip ? "lg:col-start-2 lg:row-start-1" : ""}>
          <Reveal>
            <header className="border-b border-hairline pb-6">
              <h2 className="text-3xl text-espresso">{category.title}</h2>
              <p className="mt-3 max-w-measure text-sm leading-relaxed text-muted">
                {category.blurb}
              </p>
            </header>
          </Reveal>

          <ul>
            {category.items.map((item, i) => (
              <li key={item.id}>
                <Reveal delay={Math.min(i * 0.05, 0.2)}>
                  <div className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-hairline py-5 transition-colors duration-[var(--ac-dur-fast)] hover:border-hairline-strong">
                    <div>
                      <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-base font-700 text-espresso">
                        {item.name}
                        {item.featured && (
                          <span className="rounded-xs bg-accent-quiet px-1.5 py-0.5 text-2xs font-600 tracking-wide text-ember uppercase">
                            Ask for it
                          </span>
                        )}
                      </h3>
                      <p className="mt-1.5 max-w-measure text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                    <p className="w-16 text-right font-body text-base font-600 text-secondary tabular-nums">
                      {price(item.price)}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* Product shots sit beside the list, two across, so the column stays
            in proportion with it rather than towering over it. The second is
            dropped a little to keep the pair from reading as a plain grid. */}
        <div
          className={`flex gap-4 self-start lg:sticky lg:top-[calc(var(--ac-header-h)+5rem)] ${
            flip ? "lg:col-start-1 lg:row-start-1" : ""
          }`}
        >
          {shots.map((item, i) => (
            <Reveal key={item.id} delay={0.1 + i * 0.1} className="flex-1">
              <figure
                className={`group relative aspect-square overflow-hidden rounded-md bg-sunken ${
                  i === 1 ? "mt-8" : ""
                }`}
              >
                <Image
                  src={`/images/${item.image}`}
                  alt={`${item.name} — ${item.description}`}
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover transition-transform duration-[var(--ac-dur-slower)] ease-[var(--ac-ease-out)] group-hover:scale-[1.05]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 text-2xs tracking-widest text-paper uppercase">
                  {item.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
