"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { WA_BASE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

interface CtaBannerProps {
  hideEyebrow?: boolean;
}

export function CtaBanner({ hideEyebrow = false }: CtaBannerProps) {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden bg-surface">
      {/* Radial glow — left-aligned to back the copy */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 28% 50%, rgba(232,148,58,0.18) 0%, rgba(232,148,58,0.06) 38%, transparent 65%)",
        }}
      />

      {/* Top border */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(232,148,58,0.55), transparent)",
        }}
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            {!hideEyebrow && (
              <motion.span
                className="t-label"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                Empieza hoy
              </motion.span>
            )}

            <motion.h2
              className="t-display text-[clamp(2.5rem,5vw,4rem)] max-w-[560px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.72, delay: 0.08, ease: EASE }}
            >
              ¿Listo para recuperar tu tiempo?
            </motion.h2>

            <motion.p
              className="text-[1.0625rem] text-text/75 font-[family-name:var(--font-dm)] max-w-[440px] leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            >
              Agendamos una llamada de 30 minutos, analizamos tu proceso y te
              decimos exactamente qué podemos automatizar y cuánto te ahorra.
              Sin costo, sin compromisos.
            </motion.p>
          </div>

          {/* Right — CTAs */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
          >
            <Button variant="primary" size="lg" href="/contacto">
              Agendar diagnóstico gratis
            </Button>
            <Button variant="ghost" size="lg" href={WA_BASE} external>
              Escribir por WhatsApp
            </Button>
            <p className="text-[12px] text-muted font-[family-name:var(--font-dm)] mt-2 leading-relaxed">
              Respondemos en menos de 2 horas en horario hábil
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
