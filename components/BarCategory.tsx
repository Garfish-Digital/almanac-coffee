import Reveal from "@/components/Reveal";
import { price, type MenuCategory } from "@/content/menu";
import { LEAD_AFTER_HEADING, stagger } from "@/lib/motion";

/**
 * One category of the bar list.
 *
 * Deliberately compact and image-free: the bar is secondary to the shelf, and
 * the previous full-width treatment gave four drink categories more of the page
 * than the beans and grind sections combined. Photography for the bar lives in
 * a single strip above these, not two shots per category.
 *
 * Prices sit in their own column with tabular figures so the right edge is a
 * true column rather than a ragged edge that happens to look close.
 */
export default function BarCategory({ category }: { category: MenuCategory }) {
  return (
    <section id={category.id}>
      <Reveal>
        <header className="border-b border-hairline pb-4">
          <h3 className="text-2xl text-primary">{category.title}</h3>
          <p className="mt-2 max-w-measure text-sm leading-relaxed text-muted">
            {category.blurb}
          </p>
        </header>
      </Reveal>

      <ul>
        {category.items.map((item, i) => (
          <li key={item.id}>
            <Reveal delay={stagger(i, LEAD_AFTER_HEADING)}>
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-hairline py-3.5">
                <div>
                  <h4 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-base font-bold text-primary">
                    {item.name}
                    {item.featured && (
                      <span className="rounded-xs bg-accent-quiet px-1.5 py-0.5 text-2xs font-semibold tracking-wide text-accent uppercase">
                        Ask for it
                      </span>
                    )}
                  </h4>
                  <p className="mt-1 max-w-measure text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
                <p className="w-16 text-right font-body text-base font-semibold text-secondary tabular-nums">
                  {price(item.price)}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
