import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import ButtonLink from "@/components/ButtonLink";
import SectionHeading from "@/components/SectionHeading";
import SeasonalCards from "@/components/SeasonalCards";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import shop from "@/content/shop";

const galleryItems = [
  { src: "/images/gallery-01.jpg", alt: "Steamed milk poured from a pitcher at the bar" },
  { src: "/images/gallery-02.jpg", alt: "Roasted beans with a sampling scoop" },
  { src: "/images/gallery-03.jpg", alt: "A grower raking coffee cherries across a drying bed" },
  { src: "/images/gallery-04.jpg", alt: "A hand grinder loaded with beans" },
  { src: "/images/gallery-05.jpg", alt: "Two hands cupped around freshly roasted beans" },
  { src: "/images/gallery-06.jpg", alt: "A pour-over brewed with a gooseneck kettle" },
];

/** Staggered entrance for the hero copy, in a single beat after the image. */
const rise = (delay: number) => ({
  animation: `rise-in 0.7s var(--ac-ease-out) ${delay}s both`,
});

export default function HomePage() {
  return (
    <>
      <Hero
        desktopSrc="/images/home-hero.jpg"
        desktopWidth={2400}
        desktopHeight={1350}
        mobileSrc="/images/home-hero-mobile.jpg"
        mobileWidth={1200}
        mobileHeight={1600}
        alt="The bar at Almanac Coffee, wheat sheaves in glass vases along the counter"
      >
        <Container>
          <div className="max-w-3xl motion-reduce:*:animate-none">
            <p className="eyebrow text-on-dark-muted" style={rise(0.15)}>
              Sheridan, Wyoming · Est. 2016
            </p>
            <h1 className="mt-4 text-5xl text-paper" style={rise(0.25)}>
              {shop.heroHeadline}
            </h1>
            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted"
              style={rise(0.35)}
            >
              {shop.heroSubhead}
            </p>
            <div className="mt-9 flex flex-wrap gap-3" style={rise(0.45)}>
              <ButtonLink href="/menu">Shop the coffee</ButtonLink>
              <ButtonLink href="/visit" variant="onDark" arrow={false}>
                Plan a visit
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Hero>

      {/* ---------------------------------------------------------------- */}
      {/* The Almanac — statement of craft                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-section">
        <Container>
          <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="eyebrow">The Almanac</p>
              <Reveal>
                <h2 className="mt-3 text-3xl text-espresso">
                  A book of what grew, when, and how it tasted.
                </h2>
              </Reveal>
              {shop.story.map((para, i) => (
                <Reveal key={i} delay={0.08 + i * 0.06}>
                  <p className="mt-5 max-w-measure text-md leading-relaxed text-muted">{para}</p>
                </Reveal>
              ))}

              <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-1">
                {shop.ethos.map((item, i) => (
                  <li key={item.title} className="bg-surface">
                    <Reveal delay={0.1 + i * 0.07}>
                      <div className="flex flex-col gap-1 p-5 sm:flex-row sm:gap-6">
                        <h3 className="shrink-0 font-body text-sm font-700 tracking-wide text-espresso sm:w-52">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={0.1}>
              <figure className="group relative aspect-4/5 overflow-hidden rounded-md bg-sunken">
                <Image
                  src="/images/almanac-story.jpg"
                  alt="A cup resting on an open atlas, the ledger we keep every lot in"
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-[var(--ac-dur-slower)] ease-[var(--ac-ease-out)] group-hover:scale-[1.04]"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Seasonal three-up                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-sunken py-section">
        <Container>
          <SectionHeading
            eyebrow="In season"
            title="From the tree to your grinder"
            lead="Where this month’s coffee came from, how we roasted it, and how it leaves the building."
            action={
              <ButtonLink href="/menu" variant="outline">
                All the coffee
              </ButtonLink>
            }
            className="mb-12"
          />
          <SeasonalCards />
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Atmosphere band                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate flex min-h-[clamp(22rem,52svh,34rem)] items-center overflow-hidden bg-espresso">
        <Image
          src="/images/atmosphere-band.jpg"
          alt=""
          fill
          quality={82}
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/55" />
        <div aria-hidden className="grain absolute inset-0 -z-10" />
        <Container>
          <Reveal>
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote className="font-display text-4xl leading-snug text-balance text-paper">
                “{shop.pullQuote.text}”
              </blockquote>
              <figcaption className="mt-6 text-2xs tracking-widest uppercase text-on-dark-muted">
                {shop.pullQuote.attribution}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Gallery strip                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-section">
        <Container>
          <SectionHeading
            eyebrow="The room"
            title="Mornings on Brooks Street"
            lead="Six frames from an ordinary week."
            className="mb-12"
          />
          <Gallery items={galleryItems} columns={6} />
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Two ways in                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="pb-section">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/menu",
                eyebrow: "The shelf",
                title: "Shop the coffee",
                body: "Four bags on the shelf right now, ground to whatever you brew on, or left whole.",
                image: "/images/menu-hero.jpg",
              },
              {
                href: "/visit",
                eyebrow: "Brooks Street",
                title: "Come by the shop",
                body: "Hours, directions, where to park, and how to reach us.",
                image: "/images/storefront.jpg",
              },
            ].map((panel, i) => (
              <Reveal key={panel.href} delay={i * 0.08}>
                <Link
                  href={panel.href}
                  className="group relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-md bg-espresso p-8"
                >
                  <Image
                    src={panel.image}
                    alt=""
                    fill
                    quality={75}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="-z-10 object-cover opacity-70 transition-[transform,opacity] duration-[var(--ac-dur-slower)] ease-[var(--ac-ease-out)] group-hover:scale-105 group-hover:opacity-85"
                  />
                  <div aria-hidden className="photo-scrim absolute inset-0 -z-10" />
                  <p className="eyebrow text-on-dark-muted">{panel.eyebrow}</p>
                  <h2 className="mt-2 text-2xl text-paper">{panel.title}</h2>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-on-dark-muted">
                    {panel.body}
                  </p>
                  <span className="mt-5 flex items-center gap-1.5 text-sm font-600 text-paper">
                    Go
                    <span
                      aria-hidden
                      className="transition-transform duration-[var(--ac-dur-base)] ease-[var(--ac-ease-spring)] group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
