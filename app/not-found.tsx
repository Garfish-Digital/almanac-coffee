import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ButtonLink from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Not found",
};

/**
 * The masthead is light-on-dark and sits over the page rather than in a bar,
 * so any route without a hero needs a dark ground of its own — otherwise the
 * mark and the nav land on paper and disappear.
 */
export default function NotFound() {
  return (
    <Section tone="dark" className="flex min-h-[clamp(24rem,60svh,46rem)] items-end">
      <Container>
        <div className="pt-[clamp(9.5rem,23vw,17rem)]">
          <p className="eyebrow">Off the map</p>
          <h1 className="mt-3 max-w-2xl text-4xl text-primary">
            That page isn’t on the shelf.
          </h1>
          <p className="mt-4 max-w-measure text-md leading-relaxed text-muted">
            It may have sold out with the lot it belonged to. The coffee we have right now
            is all on one page.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/coffee">Shop the coffee</ButtonLink>
            <ButtonLink href="/" variant="plate">
              Back home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
