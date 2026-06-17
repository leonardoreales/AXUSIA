import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/contacto/ContactForm";
import { ContactInfo } from "@/components/sections/contacto/ContactInfo";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda tu diagnóstico gratuito de automatización con IA. Sin compromisos. Te respondemos en menos de 2 horas.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Diagnóstico gratuito"
        title="Hablemos de tu proceso"
        subtitle="30 minutos para entender dónde te podemos ahorrar horas cada semana. Sin costo, sin compromisos."
      />

      <section className="py-24 pb-36 lg:py-32 lg:pb-44">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_500px] gap-16 xl:gap-24 items-start">
            {/* Form */}
            <div>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="lg:sticky lg:top-28">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
