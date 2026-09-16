import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import ButtonLink from "@/components/ButtonLink";
import SectionHeading from "@/components/SectionHeading";
import SeasonalCards from "@/components/SeasonalCards";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import shop from "@/content/shop";
import { LEAD_AFTER_HEADING, stagger } from "@/lib/motion";

const galleryItems = [
  { src: "/images/story/gallery-01.jpg", alt: "Steamed milk poured from a pitcher at the bar" },
  { src: "/images/story/gallery-02.jpg", alt: "Roasted beans with a sampling scoop" },
  { src: "/images/story/gallery-03.jpg", alt: "A grower raking coffee cherries across a drying bed" },
  { src: "/images/story/gallery-04.jpg", alt: "A hand grinder loaded with beans" },
  { src: "/images/story/gallery-05.jpg", alt: "Two hands cupped around freshly roasted beans" },
  { src: "/images/story/gallery-06.jpg", alt: "A pour-over brewed with a gooseneck kettle" },
];

/** Staggered entrance for the hero copy, in a single beat after the image. */
const rise = (delay: number) => ({
  animation: `rise-in 0.7s var(--ac-ease-out) ${delay}s both`,
});

export default function HomePage() {
  return (
    <>
      <Hero
        desktopSrc="/images/hero/home-hero.jpg"
        desktopWidth={2400}
        desktopHeight={1350}
        mobileSrc="/images/hero/home-hero-mobile.jpg"
        mobileWidth={1013}
        mobileHeight={1350}
        alt="Two brass hand grinders beside a burlap sack of roasted beans"
      >
        <Container>
          <div className="max-w-3xl motion-reduce:*:animate-none">
            <p className="eyebrow text-muted" style={rise(0.15)}>
              Sheridan, Wyoming · Est. 2016
            </p>
            <h1 className="mt-4 text-4xl text-primary" style={rise(0.25)}>
              {shop.heroHeadline}
            </h1>
            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
              style={rise(0.35)}
            >
              {shop.heroSubhead}
            </p>
            <div className="mt-9 flex flex-wrap gap-3" style={rise(0.45)}>
              <ButtonLink href="/coffee">Shop the coffee</ButtonLink>
              <ButtonLink href="/visit" variant="onDark">
                Plan a visit
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Hero>

      {/* ---------------------------------------------------------------- */}
      {/* The Almanac — statement of craft                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          {/*
            Flat grid rather than two nested columns, so the plate can sit
            between the heading and the body text on a phone, and still move
            into its own narrow column at desktop. Nesting it inside the text
            column would strand it below the ethos list on mobile.
          */}
          {/*
            Block flow on phones so the plate can float and the story wraps
            around it; a real grid from lg up, where the plate takes its own
            narrow column. Floats don't apply to grid items, which is why the
            grid only switches on at the breakpoint.
          */}
          <div className="lg:grid lg:grid-cols-[1fr_1fr_0.5fr] lg:gap-x-14 lg:gap-y-10">
            <div className="mb-6 lg:col-span-2 lg:col-start-1 lg:mb-0">
              <p className="eyebrow">The Almanac</p>
              <Reveal>
                <h2 className="mt-3 text-3xl text-primary">
                  A book of what grew, when, and how it tasted.
                </h2>
              </Reveal>
            </div>

            {/*
              The master for this one is only 315x350, so it is set as a
              tipped-in plate rather than blown up to fill a column: capped at
              176px on phones and 240px at desktop, on the source's own 9:10
              ratio so the crop doesn't discard pixels we can't spare. Keeping
              it small is what keeps it sharp, and the mat makes the size read
              as a deliberate choice.
            */}
            <Reveal
              delay={LEAD_AFTER_HEADING}
              className="float-right mb-4 ml-5 w-[45%] max-w-[176px] lg:float-none lg:mb-0 lg:ml-0 lg:w-full lg:max-w-[240px] lg:col-start-3 lg:row-start-1 lg:row-span-3"
            >
              <figure>
                <div className="rounded-sm border border-hairline bg-surface p-2 shadow-sm">
                  <div className="relative aspect-9/10 overflow-hidden rounded-xs bg-sunken">
                    <Image
                      src="/images/story/almanac-story.jpg"
                      alt="A cup resting on an open atlas, the ledger we keep every lot in"
                      fill
                      quality={82}
                      sizes="(min-width: 1024px) 240px, 176px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-xs leading-relaxed text-muted">
                  The ledger, and the reason the shelf keeps moving.
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-2 lg:col-start-1">
              {/* Spacing goes on the wrapper: each <p> is the only child of its
                  own Reveal, so a :not(:first-child) rule would never match. */}
              {shop.story.map((para, i) => (
                <Reveal key={i} delay={stagger(i, LEAD_AFTER_HEADING)} className={i > 0 ? "mt-5" : ""}>
                  <p className="max-w-measure text-md leading-relaxed text-muted">{para}</p>
                </Reveal>
              ))}
            </div>

            <ul className="clear-both mt-10 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline lg:col-span-2 lg:col-start-1 lg:clear-none lg:mt-0">
              {shop.ethos.map((item, i) => (
                <li key={item.title} className="bg-surface">
                  <Reveal delay={stagger(i, LEAD_AFTER_HEADING)}>
                    <div className="flex flex-col gap-1 p-5 sm:flex-row sm:gap-6">
                      <h3 className="shrink-0 font-body text-sm font-bold tracking-wide text-primary sm:w-52">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Seasonal three-up                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark">
        <Container>
          <SectionHeading
            eyebrow="In season"
            title="From the tree to your grinder"
            lead="Where this month’s coffee came from, how we roasted it, and how it leaves the building."
            action={
              <ButtonLink href="/coffee">
                All the coffee
              </ButtonLink>
            }
            className="mb-12"
          />
          <SeasonalCards />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Atmosphere band                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light" className="border-y border-hairline">
        <Container width="narrow">
          <Reveal>
            <figure className="mx-auto max-w-3xl text-center">
              {/* The one large, non-interactive use of ember on this page. */}
              <span aria-hidden className="mx-auto block h-1 w-16 rounded-pill bg-accent" />
              <blockquote className="mt-9 font-display text-4xl leading-snug text-balance text-primary">
                “{shop.pullQuote.text}”
              </blockquote>
              <figcaption className="mt-7 text-2xs tracking-widest text-muted uppercase">
                {shop.pullQuote.attribution}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Gallery strip                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark">
        <Container>
          <SectionHeading
            eyebrow="The room"
            title="Mornings on Brooks Street"
            lead="Six frames from an ordinary week."
            className="mb-12"
          />
          <Gallery items={galleryItems} layout="editorial" />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The close                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          {/*
            Deliberately uneven: the shop is the business, so it takes the
            larger panel. Two equal boxes here read as a second navigation bar
            rather than as a closing invitation.
          */}
          <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr] lg:gap-6">
            {[
              {
                href: "/coffee",
                eyebrow: "The shelf",
                title: "Four bags this season",
                body: "Single lots and one blend, ground or left whole.",
                link: "Shop the coffee",
                image: "/images/hero/coffee-hero.jpg",
                tall: true,
              },
              {
                href: "/visit",
                eyebrow: "Brooks Street",
                title: "Come by the shop",
                body: "You can watch the roaster run.",
                link: "Hours & directions",
                image: "/images/hero/visit-hero.jpg",
                tall: false,
              },
            ].map((panel, i) => (
              <Reveal key={panel.href} delay={stagger(i)} className="h-full">
                <Link
                  href={panel.href}
                  data-tone="dark"
                  className={`group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-md bg-page ${
                    panel.tall
                      ? "min-h-[19rem] p-8 sm:min-h-[26rem] sm:p-12"
                      : "min-h-[17rem] p-8 sm:min-h-[22rem] sm:p-10"
                  }`}
                >
                  <Image
                    src={panel.image}
                    alt=""
                    fill
                    quality={75}
                    sizes={panel.tall ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
                    className="-z-10 object-cover opacity-70 transition-[transform,scale,opacity] duration-[var(--ac-dur-image)] ease-[var(--ac-ease-out)] group-hover:scale-105 group-hover:opacity-85"
                  />
                  <div aria-hidden className="photo-scrim absolute inset-0 -z-10" />
                  <p className="eyebrow text-muted">{panel.eyebrow}</p>
                  <h2
                    className={`mt-3 max-w-md text-primary ${panel.tall ? "text-3xl" : "text-2xl"}`}
                  >
                    {panel.title}
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{panel.body}</p>
                  <span className="mt-8 text-sm font-semibold">
                    {/* text-accent, not text-ember: the accent is the tone-aware
                        interactive role, so inside these dark panels it resolves
                        to the brighter #e0651a that the nav and cards already use.
                        The drawn rule inherits it via currentColor. */}
                    <span className="link-draw text-accent">{panel.link}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

    </>
  );
}
