import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CatalogGrid } from "@/components/sections/servicios/CatalogGrid";
import { TrustStrip } from "@/components/sections/servicios/TrustStrip";
import { PricingCards } from "@/components/sections/servicios/PricingCards";
import { CtaBanner } from "@/components/sections/home/CtaBanner";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Catálogo completo de automatizaciones con IA para tu negocio. Desde agentes WhatsApp hasta gestión documental inteligente. Precios en COP.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Lo que podemos automatizar para ti"
        subtitle="Cada solución es configurada a la medida de tu proceso. Sin código de tu lado. Sin promesas vacías."
      />

      <section className="pt-10 lg:pt-14 pb-24 lg:pb-32">
        <div className="container-wide">
          <CatalogGrid />
        </div>
      </section>

      <TrustStrip />
      <PricingCards />
      <CtaBanner hideEyebrow />
    </>
  );
}
