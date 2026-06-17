import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contacto/ContactHero";
import { ContactForm } from "@/components/sections/contacto/ContactForm";
import { ContactInfo } from "@/components/sections/contacto/ContactInfo";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda tu diagnóstico gratuito de automatización con IA. Sin compromisos. Te respondemos en menos de 2 horas.",
};

export default function ContactoPage() {
  return (
    <section className="relative pt-[184px] lg:pt-[212px] pb-24 lg:pb-36 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 900,
          height: 380,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(180,189,210,0.20) 0%, transparent 70%)",
        }}
      />

      {/* Nav separator line */}
      <div
        aria-hidden
        className="absolute top-[88px] left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent 100%)",
        }}
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_500px] gap-16 xl:gap-24 items-start">

          {/* Left — header + form */}
          <div className="flex flex-col gap-10">
            <ContactHero />
            <ContactForm />
          </div>

          {/* Right — info (sticky) */}
          <div className="lg:sticky lg:top-28">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
