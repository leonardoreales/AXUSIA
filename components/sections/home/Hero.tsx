"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { HexMark3D } from "@/components/ui/HexMark3D";
import { WA_BASE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Hero ──────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-[72px]"
    >
      {/* ─ Background ──────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
        <div
          className="absolute top-[-10%] right-[-5%] w-225 h-225 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,148,58,0.28) 0%, transparent 60%)" }}
        />
        <div
          className="absolute bottom-[10%] left-[-10%] w-150 h-150 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(78,205,196,0.22) 0%, transparent 60%)" }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container relative z-10 py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 xl:gap-28 items-center">

          {/* ─ Content ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-7 max-w-[680px]">

            {/* Status chip */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <Chip variant="available" label="Disponible en Barranquilla" />
            </motion.div>

            {/* Terminal prompt — decorativo */}
            <span
              className="font-mono text-[0.85rem] tracking-[0.15em] select-none"
              style={{ color: "rgba(232,148,58,0.45)" }}
              aria-hidden
            >
              &gt;_
            </span>

            {/* Headline */}
            <motion.h1
              className="t-display text-[clamp(3.5rem,7vw,5.5rem)]"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.78, delay: 0.1, ease: EASE }}
            >
              Tu negocio trabajando{" "}
              <span
                className="relative inline-block"
                style={{
                  color: "#E8943A",
                  textShadow: "0 0 40px rgba(232,148,58,0.25)",
                }}
              >
                solo
              </span>{" "}
              mientras tú duermes
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-[1.125rem] text-text/75 leading-relaxed max-w-[520px] font-[family-name:var(--font-dm)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.2, ease: EASE }}
            >
              Diseñamos e implementamos automatizaciones con inteligencia
              artificial para empresas colombianas. Sin código. Sin
              complicaciones. Resultados en{" "}
              <span className="text-text font-medium">72 horas</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 pt-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            >
              <Button variant="primary" size="lg" href="/contacto">
                Agendar diagnóstico gratis
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href={WA_BASE}
                external
              >
                <svg
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="currentColor" aria-hidden className="shrink-0 text-teal"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                </svg>
                WhatsApp
              </Button>
            </motion.div>

            {/* Social proof micro line */}
            <motion.p
              className="text-[12px] text-muted font-[family-name:var(--font-dm)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.52, ease: EASE }}
            >
              Diagnóstico gratuito · Sin compromisos · Primera implementación en 72 h
            </motion.p>
          </div>

          {/* ─ Hex mark ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[320px] h-[320px] xl:w-[380px] xl:h-[380px]">
              <HexMark3D />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #080B10)" }}
      />
    </section>
  );
}
