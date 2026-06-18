import { AxusiaParticleHero, ScrollCard } from "./_home-client";
import { Hero } from "@/components/sections/home/Hero";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { ServicesTeaser } from "@/components/sections/home/ServicesTeaser";
import { Industries } from "@/components/sections/home/Industries";
import { Process } from "@/components/sections/home/Process";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { CtaBanner } from "@/components/sections/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <AxusiaParticleHero />
      <Hero />
      <StatsStrip />
      <ServicesTeaser />
      <ScrollCard />
      <Industries />
      <Process />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
