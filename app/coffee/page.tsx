import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import BarCategory from "@/components/BarCategory";
import BeansShelf from "@/components/BeansShelf";
import SectionHeading from "@/components/SectionHeading";
import ButtonLink from "@/components/ButtonLink";
import Reveal from "@/components/Reveal";
import { categories, grind, seasonalCallout } from "@/content/menu";
import { LEAD_AFTER_HEADING, stagger } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Coffee",
  description:
    "What’s on the shelf this week — single lots and blends roasted in twelve-kilo batches in Sheridan, Wyoming, ground to order or left whole.",
};

/* Three parts, matching the header dropdown. The page used to advertise six
   categories in this rail, four of which were drinks at the bar — which is not
   what the business sells. */
const sections = [
  { id: "beans", title: "Beans" },
  { id: "grind", title: "Grind" },
  { id: "bar", title: "At the bar" },
];

/* One representative shot per bar category, in place of two per category
   interspersed down the page. */
const barShots = [
  { src: "/images/product/menu-espresso.jpg", alt: "Espresso in a demitasse, crema intact" },
  { src: "/images/product/menu-filter.jpg", alt: "Filter coffee in a ceramic mug" },
  { src: "/images/product/menu-chai.jpg", alt: "House chai, spiced and steeped that morning" },
  { src: "/images/product/menu-croissant.jpg", alt: "A butter croissant on a plate" },
];

export default function CoffeePage() {
  return (
    <>
      <Hero
        desktopSrc="/images/hero/coffee-hero.jpg"
        desktopWidth={1600}
        desktopHeight={1000}
        mobileSrc="/images/hero/coffee-hero-mobile.jpg"
        mobileWidth={750}
        mobileHeight={1000}
        alt="Beans tumbling from the chute into the roaster’s cooling tray"
      >
        <Container>
          <p className="eyebrow text-muted">The shelf</p>
          <h1 className="mt-3 max-w-2xl text-4xl text-primary">
            What we’re roasting right now.
          </h1>
        </Container>
      </Hero>

      <CategoryNav sections={sections} />

      {/* ---------------------------------------------------------------- */}
      {/* Beans — the shop leads with what it actually sells                */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light" id="beans">
        <Container>
          <SectionHeading
            eyebrow="On the shelf"
            title="Four bags, and they move with the harvest"
            lead="Roasted in twelve-kilo batches and dated on the base. When a lot runs out we don’t reorder it — we find the next one."
            className="mb-12"
          />
          <BeansShelf />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Grind                                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark" id="grind">
        <Container>
          <SectionHeading eyebrow="Before it leaves" title={grind.title} lead={grind.body} className="mb-12" />

          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[1.4fr_1fr]">
            <ul className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2">
              {grind.options.map((option, i) => (
                <li key={option.name} className="bg-surface">
                  <Reveal delay={stagger(i)}>
                    <div className="flex h-full flex-col p-5">
                      <h3 className="font-body text-sm font-bold tracking-wide text-primary">
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
                    <Reveal delay={stagger(i, LEAD_AFTER_HEADING)}>
                      <div className="border-b border-hairline py-4">
                        <p className="font-body text-base font-bold text-primary">{size.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{size.note}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <Reveal delay={LEAD_AFTER_HEADING}>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  Not sure what to ask for? Tell us the machine and we’ll set it — that’s the
                  part most people get wrong at home.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* At the bar — one section, not four. It's the reason to visit,     */}
      {/* but it isn't the business.                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light" id="bar">
        <Container>
          <SectionHeading
            eyebrow="At the bar"
            title="Taste it before you buy a bag of it"
            lead="Everything on the shelf can be pulled as a shot or brewed on the cone. There’s food too, and somewhere to sit while you decide."
            className="mb-12"
          />

          <ul className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {barShots.map((shot, i) => (
              <li key={shot.src}>
                <Reveal delay={stagger(i)}>
                  <figure className="group relative aspect-square overflow-hidden rounded-sm bg-sunken">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      quality={75}
                      sizes="(min-width: 640px) 22vw, 45vw"
                      className="object-cover transition-transform duration-[var(--ac-dur-image)] ease-[var(--ac-ease-out)] group-hover:scale-[1.05]"
                    />
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="grid gap-x-14 gap-y-14 lg:grid-cols-2">
            {categories.map((category) => (
              <BarCategory key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Seasonal callout                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark">
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
                <h2 className="mt-3 text-2xl text-primary">{seasonalCallout.title}</h2>
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
      </Section>
    </>
  );
}
