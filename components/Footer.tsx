import Image from "next/image";
import Container from "@/components/Container";
import FooterNav from "@/components/FooterNav";
import shop from "@/content/shop";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { address, phone } = shop;
  const instagram = shop.social.find((s) => s.label === "Instagram");

  return (
    <footer data-tone="dark" className="mt-auto border-t border-hairline bg-page text-primary">
      <Container className="py-section-tight">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Image
              src="/images/brand/logo.svg"
              alt=""
              width={56}
              height={54}
              className="h-18 w-auto brightness-0 invert"
            />
            <p className="mt-5 font-display text-xl text-primary">{shop.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{shop.neighborhood}</p>
          </div>

          <div>
            <h2 className="eyebrow text-muted">Find us</h2>
            <address className="mt-4 space-y-1 text-sm not-italic text-muted">
              <p className="text-primary">{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
            </address>
            <div className="mt-4 flex flex-col gap-1.5 text-sm">
              <a
                href={`tel:${phone.tel}`}
                className="w-fit text-primary underline decoration-hairline-strong underline-offset-4 transition-colors duration-[var(--ac-dur-fast)] hover:decoration-accent hover:text-accent"
              >
                {phone.display}
              </a>
              {instagram && (
                <a
                  href={instagram.href}
                  className="w-fit text-primary underline decoration-hairline-strong underline-offset-4 transition-colors duration-[var(--ac-dur-fast)] hover:decoration-accent hover:text-accent"
                >
                  {instagram.handle}
                </a>
              )}
              <a
                href={`mailto:${shop.email}`}
                className="w-fit text-primary underline decoration-hairline-strong underline-offset-4 transition-colors duration-[var(--ac-dur-fast)] hover:decoration-accent hover:text-accent"
              >
                {shop.email}
              </a>
            </div>
          </div>

          <div>
            <FooterNav />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {shop.legalName}. Roasted in Sheridan, Wyoming.
          </p>
        </div>
      </Container>
    </footer>
  );
}
