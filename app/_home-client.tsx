"use client";

import dynamic from "next/dynamic";

export const AxusiaParticleHero = dynamic(
  () => import("@/components/ui/particle-hero").then(m => ({ default: m.AxusiaParticleHero })),
  { ssr: false }
);

export const ScrollCard = dynamic(
  () => import("@/components/sections/home/ScrollCard").then(m => ({ default: m.ScrollCard })),
  { ssr: false }
);
