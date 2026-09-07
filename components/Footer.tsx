import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import shop from "@/content/shop";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { address, phone } = shop;

  return (
    <footer className="mt-auto border-t border-hairline bg-espresso text-on-dark">
      <Container className="py-section-tight">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Image
              src="/images/logo/Almanac-Coffee-Co-Logo.svg"
              alt=""
              width={56}
              height={54}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-5 font-display text-xl text-paper">{shop.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">{shop.neighborhood}</p>
          </div>

          <div>
            <h2 className="eyebrow text-on-dark-muted">Find us</h2>
            <address className="mt-4 space-y-1 text-sm not-italic text-on-dark-muted">
              <p className="text-paper">{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
            </address>
            <div className="mt-4 flex flex-col gap-1.5 text-sm">
              <a
                href={`tel:${phone.tel}`}
                className="w-fit text-paper underline decoration-white/25 underline-offset-4 transition-colors duration-[var(--ac-dur-fast)] hover:decoration-ember hover:text-ember"
              >
                {phone.display}
              </a>
              <a
                href={`mailto:${shop.email}`}
                className="w-fit text-paper underline decoration-white/25 underline-offset-4 transition-colors duration-[var(--ac-dur-fast)] hover:decoration-ember hover:text-ember"
              >
                {shop.email}
              </a>
            </div>
            <Link
              href="/visit"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-600 text-paper"
            >
              Hours &amp; directions
              <span
                aria-hidden
                className="transition-transform duration-[var(--ac-dur-fast)] ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <div>
            <h2 className="eyebrow text-on-dark-muted">Elsewhere</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {shop.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-2 text-on-dark-muted transition-colors duration-[var(--ac-dur-fast)] hover:text-paper"
                  >
                    <span className="text-paper">{s.label}</span>
                    <span className="opacity-70">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
            <nav aria-label="Footer" className="mt-6">
              <ul className="space-y-2 text-sm">
                {[
                  { href: "/", label: "Home" },
                  { href: "/menu", label: "Menu" },
                  { href: "/visit", label: "Visit" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-on-dark-muted transition-colors duration-[var(--ac-dur-fast)] hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline-dark pt-6 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {shop.legalName}. Roasted in Sheridan, Wyoming.
          </p>
          <p>A demonstration site. Nothing here can be ordered.</p>
        </div>
      </Container>
    </footer>
  );
}
