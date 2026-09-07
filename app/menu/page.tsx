import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import MenuSection from "@/components/MenuSection";
import BeansShelf from "@/components/BeansShelf";
import SectionHeading from "@/components/SectionHeading";
import ButtonLink from "@/components/ButtonLink";
import Reveal from "@/components/Reveal";
import { categories, grind, seasonalCallout } from "@/content/menu";

export const metadata: Metadata = {
  title: "Coffee",
  description:
    "What’s on the shelf this week — single lots and blends roasted in twelve-kilo batches in Sheridan, Wyoming, ground to order or left whole.",
};

/* Order matches the order of the sections below, so the scroll-spy agrees
   with what you're actually reading. */
const sections = [
  { id: "beans", title: "Beans" },
  { id: "grind", title: "Grind" },
  ...categories.map((c) => ({ id: c.id, title: c.title })),
];

export default function MenuPage() {
  return (
    <>
      <Hero
        desktopSrc="/images/menu-hero.jpg"
        desktopWidth={2400}
        desktopHeight={1000}
        mobileSrc="/images/menu-hero.jpg"
        mobileWidth={2400}
        mobileHeight={1000}
        alt="Bags of freshly roasted coffee lined up on the packing bench"
        height="band"
      >
        <Container>
          <p className="eyebrow text-on-dark-muted">The shelf</p>
          <h1 className="mt-3 max-w-2xl text-4xl text-paper">
            What we’re roasting right now.
          </h1>
        </Container>
      </Hero>

      <CategoryNav sections={sections} />

      {/* ---------------------------------------------------------------- */}
      {/* Beans — the shop leads with what it actually sells                */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="beans"
        className="scroll-mt-[calc(var(--ac-header-h)+4.5rem)] py-section"
      >
        <Container>
          <SectionHeading
            eyebrow="On the shelf"
            title="Four bags, and they move with the harvest"
            lead="Roasted in twelve-kilo batches and dated on the base. When a lot runs out we don’t reorder it — we find the next one."
            className="mb-12"
          />
          <BeansShelf />
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Grind                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="grind"
        className="scroll-mt-[calc(var(--ac-header-h)+4.5rem)] bg-sunken py-section"
      >
        <Container>
          <SectionHeading eyebrow="Before it leaves" title={grind.title} lead={grind.body} className="mb-12" />

          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[1.4fr_1fr]">
            <ul className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2">
              {grind.options.map((option, i) => (
                <li key={option.name} className="bg-surface">
                  <Reveal delay={Math.min(i * 0.04, 0.2)}>
                    <div className="flex h-full flex-col p-5">
                      <h3 className="font-body text-sm font-700 tracking-wide text-espresso">
                        {option.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{option.note}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <div>
              <h3 className="eyebrow">How it’s bagged</h3>
              <ul className="mt-5">
                {grind.sizes.map((size, i) => (
                  <li key={size.name}>
                    <Reveal delay={0.08 + i * 0.06}>
                      <div className="border-b border-hairline py-4">
                        <p className="font-body text-base font-700 text-espresso">{size.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{size.note}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <Reveal delay={0.2}>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  Not sure what to ask for? Tell us the machine and we’ll set it — that’s the
                  part most people get wrong at home.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* At the bar — secondary to the shop, but the reason to visit       */}
      {/* ---------------------------------------------------------------- */}
      <section className="pt-section">
        <Container>
          <SectionHeading
            eyebrow="At the bar"
            title="Taste it before you buy a bag of it"
            lead="Everything on the shelf can be pulled as a shot or brewed on the cone. That’s what the bar is for."
          />
        </Container>
      </section>

      <Container>
        {categories.map((category, i) => (
          <MenuSection key={category.id} category={category} flip={i % 2 === 1} />
        ))}
      </Container>

      {/* ---------------------------------------------------------------- */}
      {/* Seasonal callout                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-section">
        <Container>
          <Reveal>
            <div className="grid items-stretch overflow-hidden rounded-md border border-hairline bg-surface lg:grid-cols-2">
              <div className="relative min-h-[16rem] bg-sunken">
                <Image
                  src={`/images/${seasonalCallout.image}`}
                  alt="Green coffee in a burlap sack, being sorted by hand"
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="eyebrow">{seasonalCallout.eyebrow}</p>
                <h2 className="mt-3 text-2xl text-espresso">{seasonalCallout.title}</h2>
                <p className="mt-4 max-w-measure text-md leading-relaxed text-muted">
                  {seasonalCallout.body}
                </p>
                <div className="mt-8">
                  <ButtonLink href="/visit">Come and taste it</ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
