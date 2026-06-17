import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MissionSplit } from "@/components/sections/nosotros/MissionSplit";
import { WhyGrid } from "@/components/sections/nosotros/WhyGrid";
import { ValuesGrid } from "@/components/sections/nosotros/ValuesGrid";
import { StackGrid } from "@/components/sections/nosotros/StackGrid";
import { CtaBanner } from "@/components/sections/home/CtaBanner";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Somos AXUSIA, una agencia de automatización con IA fundada en Barranquilla para ayudar a negocios colombianos a recuperar su tiempo.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quiénes somos"
        title="Una empresa de Barranquilla construida para el negocio local"
        subtitle="No somos una agencia multinacional. Somos un equipo pequeño con foco absoluto en hacer que la IA funcione para tu proceso específico."
      />
      <MissionSplit />
      <WhyGrid />
      <ValuesGrid />
      <StackGrid />
      <CtaBanner />
    </>
  );
}
