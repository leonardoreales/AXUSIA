"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactHero() {
  return (
    <div className="flex flex-col gap-5 max-w-[560px]">
      <Eyebrow>Diagnóstico gratuito</Eyebrow>

      <motion.h1
        className="t-display text-[clamp(2.25rem,4.5vw,3.75rem)] text-balance"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.1, ease: EASE }}
      >
        Hablemos de tu proceso
      </motion.h1>

      <motion.p
        className="text-[1rem] text-text/75 leading-relaxed font-[family-name:var(--font-dm)] max-w-[460px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
      >
        30 minutos para entender dónde te podemos ahorrar horas cada semana.
        Sin costo, sin compromisos.
      </motion.p>
    </div>
  );
}
