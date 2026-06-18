import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { LayoutAnimate } from "./_layout-animate";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axusai.co"),
  title: {
    default: "AXUSIA — Automatización con IA para tu negocio",
    template: "%s | AXUSIA",
  },
  description:
    "Diseñamos e implementamos flujos de automatización con inteligencia artificial adaptados a tu proceso. Sin código. Sin complicaciones. Resultados en 72 horas.",
  keywords: [
    "automatización IA",
    "inteligencia artificial Colombia",
    "n8n Barranquilla",
    "agente WhatsApp IA",
    "automatización PYME",
  ],
  authors: [{ name: "AXUSIA" }],
  creator: "AXUSIA",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://axusai.co",
    siteName: "AXUSIA",
    title: "AXUSIA — Automatización con IA para tu negocio",
    description:
      "Tu negocio trabajando solo mientras tú duermes. Automatizaciones con IA en 72 horas.",
    images: [{ url: "/og", width: 1200, height: 630, alt: "AXUSIA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AXUSIA — Automatización con IA",
    description: "Tu negocio trabajando solo mientras tú duermes.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">
          <Nav />
          <main><LayoutAnimate>{children}</LayoutAnimate></main>
          <Footer />
          <Analytics />
        </body>
    </html>
  );
}
