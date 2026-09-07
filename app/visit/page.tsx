import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import HoursTable from "@/components/HoursTable";
import ContactForm from "@/components/ContactForm";
import DispatchForm from "@/components/DispatchForm";
import TeamGrid from "@/components/TeamGrid";
import Gallery from "@/components/Gallery";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import shop from "@/content/shop";

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
  { src: "/images/visit-gallery-01.jpg", alt: "The seating nook at the back" },
  { src: "/images/visit-gallery-02.jpg", alt: "The counter and the pastry case" },
  { src: "/images/visit-gallery-03.jpg", alt: "The window seat, late afternoon" },
];

export default function VisitPage() {
  return (
    <>
      <Hero
        desktopSrc="/images/visit-hero.jpg"
        desktopWidth={2400}
        desktopHeight={1350}
        mobileSrc="/images/visit-hero-mobile.jpg"
        mobileWidth={1200}
        mobileHeight={1600}
        alt="Tables at Almanac Coffee, cups and conversation in the afternoon"
        height="band"
      >
        <Container>
          <p className="eyebrow text-on-dark-muted">{shop.neighborhood}</p>
          <h1 className="mt-3 max-w-2xl text-4xl text-paper">
            Open early. Worth the drive.
          </h1>
        </Container>
      </Hero>

      {/* ---------------------------------------------------------------- */}
      {/* Hours and address                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-section">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
            <Reveal>
              <h2 className="eyebrow">Hours</h2>
              <div className="mt-6">
                <HoursTable />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="eyebrow">Where</h2>
              <address className="mt-6 font-display text-2xl leading-snug not-italic text-espresso">
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
                  className="group inline-flex min-h-[3rem] items-center gap-2 rounded-sm bg-espresso px-5 text-sm font-600 text-paper transition-[background-color,transform] duration-[var(--ac-dur-fast)] ease-out hover:-translate-y-0.5 hover:bg-mahogany active:translate-y-0"
                >
                  Get directions
                  <span
                    aria-hidden
                    className="transition-transform duration-[var(--ac-dur-base)] ease-[var(--ac-ease-spring)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href={`tel:${phone.tel}`}
                  className="inline-flex min-h-[3rem] items-center gap-2 rounded-sm border border-hairline-strong bg-surface px-5 text-sm font-600 text-espresso transition-[border-color,color,transform] duration-[var(--ac-dur-fast)] ease-out hover:-translate-y-0.5 hover:border-ember hover:text-ember active:translate-y-0"
                >
                  Call {phone.display}
                </a>
              </div>

              <p className="mt-6 text-sm text-muted">
                Or write to{" "}
                <a
                  href={`mailto:${shop.email}`}
                  className="text-ember underline decoration-ember/30 underline-offset-4 transition-colors hover:decoration-ember"
                >
                  {shop.email}
                </a>
                .
              </p>

              <Reveal delay={0.12}>
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
                      className="group inline-flex items-center gap-1.5 font-600 text-ember transition-colors hover:text-amber"
                    >
                      Open in Google Maps
                      <span
                        aria-hidden
                        className="transition-transform duration-[var(--ac-dur-base)] ease-[var(--ac-ease-spring)] group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </a>
                  </figcaption>
                </figure>
              </Reveal>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Getting here                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-sunken py-section">
        <Container>
          <SectionHeading
            eyebrow="Getting here"
            title="Three ways to arrive"
            className="mb-12"
          />
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {shop.gettingHere.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="border-t border-hairline-strong pt-6">
                  <h3 className="text-xl text-espresso">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <figure className="mt-14 overflow-hidden rounded-md">
              <div className="relative aspect-3/2 bg-linen sm:aspect-[3/1]">
                <Image
                  src="/images/neighborhood.jpg"
                  alt="Brooks Street, looking north toward the tracks"
                  fill
                  quality={75}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Interior gallery                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-section">
        <Container>
          <SectionHeading
            eyebrow="Inside"
            title="Somewhere to actually sit"
            lead="Twenty seats, a long communal table, and the roaster running behind the glass on a Tuesday."
            className="mb-12"
          />
          <Gallery items={interiorGallery} columns={3} />
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Contact                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section id="contact" className="scroll-mt-header bg-sunken py-section">
        <Container width="narrow">
          <SectionHeading
            eyebrow="Say hello"
            title="Send us a note"
            lead="Questions about a lot, a wholesale or standing order, or something you left on the window seat."
            className="mb-12"
          />
          <Reveal>
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Seasonal dispatch                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-espresso py-section">
        <Container width="narrow">
          <Reveal>
            <DispatchForm />
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The people                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-section">
        <Container>
          <SectionHeading
            eyebrow="The people"
            title="Who you’ll actually meet"
            className="mb-12"
          />
          <TeamGrid />
        </Container>
      </section>
    </>
  );
}
