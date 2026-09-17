import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import HoursTable from "@/components/HoursTable";
import ContactForm from "@/components/ContactForm";
import TeamGrid from "@/components/TeamGrid";
import Gallery from "@/components/Gallery";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import shop from "@/content/shop";
import { LEAD_AFTER_HEADING, stagger } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Hours, directions and parking for the Almanac Coffee roastery on N. Brooks Street in Sheridan, Wyoming — and a note to send us if you’d rather write first.",
};

const { address, phone } = shop;
const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  address.query
)}`;

/* Keyless embed form, so there's no API key to leak or expire in a demo. */
const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  address.query
)}&z=16&output=embed`;

const interiorGallery = [
  { src: "/images/place/inside-1.jpg", alt: "The back room, the board, and the long tables" },
  { src: "/images/place/inside-2.jpg", alt: "A latte set down on the counter" },
  { src: "/images/place/inside-3.jpg", alt: "The bar from the door, under the pendants" },
  {
    src: "/images/place/inside-4.jpg",
    alt: "The communal table, and the bar behind it",
    mobileOnly: true,
  },
];

export default function VisitPage() {
  return (
    <>
      <Hero
        desktopSrc="/images/hero/visit-hero.jpg"
        desktopWidth={2400}
        desktopHeight={1350}
        mobileSrc="/images/hero/visit-hero-mobile.jpg"
        mobileWidth={1200}
        mobileHeight={1600}
        alt="Tables at Almanac Coffee, cups and conversation in the afternoon"
      >
        <Container>
          <p className="eyebrow text-muted">{shop.neighborhood}</p>
          <h1 className="mt-3 max-w-2xl text-4xl text-primary">
            Open early, worth the drive
          </h1>
        </Container>
      </Hero>

      {/* ---------------------------------------------------------------- */}
      {/* Hours and address                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
            <Reveal>
              <h2 className="eyebrow">Hours</h2>
              <div className="mt-6">
                <HoursTable />
              </div>
            </Reveal>

            <Reveal delay={LEAD_AFTER_HEADING}>
              <h2 className="eyebrow">Where</h2>
              <address className="mt-6 font-display text-2xl leading-snug not-italic text-primary">
                {address.street}
                <br />
                {address.city}, {address.state} {address.zip}
              </address>

              {/* Both of these do something when tapped on a phone */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span className="btn-label">Get directions</span>
                </a>
                <a href={`tel:${phone.tel}`} className="btn btn-inverse">
                  <span className="btn-label">Call {phone.display}</span>
                </a>
              </div>

              <Reveal delay={LEAD_AFTER_HEADING}>
                <figure className="mt-10">
                  {/* Ratio box rather than a fixed pixel width, so the embed
                      scales instead of pushing the page sideways on a phone. */}
                  <div className="relative aspect-3/2 w-full overflow-hidden rounded-md border border-hairline bg-sunken">
                    <iframe
                      title={`Map showing ${shop.name} on ${address.street}`}
                      src={mapEmbedSrc}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-muted">
                    <a
                      href={directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold"
                    >
                      <span className="link-draw">Open in Google Maps</span>
                    </a>
                  </figcaption>
                </figure>
              </Reveal>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Getting here                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark">
        <Container>
          <SectionHeading
            eyebrow="Getting here"
            title="Three ways to arrive"
            className="mb-12"
          />
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {shop.gettingHere.map((item, i) => (
              <Reveal key={item.title} delay={stagger(i)}>
                <div className="border-t border-hairline-strong pt-6">
                  <h3 className="text-xl text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={LEAD_AFTER_HEADING}>
            <figure className="mt-14 overflow-hidden rounded-md">
              <div className="relative aspect-3/2 bg-sunken sm:aspect-[3/1]">
                <Image
                  src="/images/hero/home-hero.jpg"
                  alt="Two brass hand grinders beside a burlap sack of roasted beans"
                  fill
                  quality={75}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Interior gallery                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          <SectionHeading
            eyebrow="Inside"
            title="Somewhere to actually sit"
            lead="Twenty seats, a long communal table, and the roaster running behind the glass."
            className="mb-12"
          />
          <Gallery items={interiorGallery} layout="row" />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Contact                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark" id="contact">
        <Container width="narrow">
          <SectionHeading
            eyebrow="Say hello"
            title="Send us a note"
            lead="Questions about an order, or something you left on the window seat."
            className="mb-12"
          />
          <Reveal>
            <ContactForm />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The people                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          <SectionHeading
            eyebrow="The people"
            title="Who you’ll actually meet"
            className="mb-12"
          />
          <TeamGrid />
        </Container>
      </Section>
    </>
  );
}
