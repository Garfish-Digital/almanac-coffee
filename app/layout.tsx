import type { Metadata, Viewport } from "next";
import { Grenze, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import shop from "@/content/shop";
import "./globals.css";

/* Display face — the vintage press serif that echoes the seal. */
const grenze = Grenze({
  variable: "--font-grenze",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Body face. One family, real weights, no synthesis. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://almanaccoffee.netlify.app"),
  title: {
    default: `${shop.name} — ${shop.tagline}`,
    template: `%s · ${shop.name}`,
  },
  description: shop.heroSubhead,
  applicationName: shop.name,
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png", sizes: "512x512" }],
    apple: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: shop.name,
    title: `${shop.name} — ${shop.tagline}`,
    description: shop.heroSubhead,
    locale: "en_US",
    images: [
      {
        url: "/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: `The bar at ${shop.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${shop.name} — ${shop.tagline}`,
    description: shop.heroSubhead,
    images: ["/images/og-share.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2f1000",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grenze.variable} ${jakarta.variable}`}>
      <body className="flex min-h-dvh flex-col bg-page text-espresso">
        {/* Runs before the body paints, so scroll-reveal targets are hidden
            from the first frame rather than flashing in and back out. Anyone
            without JS never gets this class, and sees every section. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-sm focus:bg-espresso focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
