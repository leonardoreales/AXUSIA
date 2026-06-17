"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { INDUSTRIES } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Industries() {
  return (
    <section className="relative py-20 lg:py-28 bg-surface">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div className="container">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end mb-12 lg:mb-0">
          <div className="flex flex-col gap-5">
            <Eyebrow>Sectores</Eyebrow>
            <motion.h2
              className="t-head text-[clamp(1.75rem,4vw,2.75rem)] max-w-[480px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            >
              Trabajamos con tu industria
            </motion.h2>
            <motion.p
              className="text-[15px] text-text/70 font-[family-name:var(--font-dm)] max-w-[440px]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
            >
              Cada sector tiene sus procesos únicos. Nuestras soluciones se adaptan a cómo ya trabajas tú.
            </motion.p>
          </div>

          {/* Count badge */}
          <motion.div
            className="hidden lg:flex items-center gap-2 pb-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          >
            <span
              className="font-[family-name:var(--font-syne)] font-black text-[3.5rem] leading-none"
              style={{ color: "rgba(232,148,58,0.15)" }}
            >
              {INDUSTRIES.length}
            </span>
            <span className="t-label text-muted/60">sectores</span>
          </motion.div>
        </div>

        {/* Typographic table */}
        <div className="divide-y divide-border/50 mt-0 lg:mt-10">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.name}
              className="group grid grid-cols-[48px_1fr] lg:grid-cols-[48px_260px_1fr]
                gap-6 lg:gap-10 items-center py-6 lg:py-8
                border-l-2 border-transparent
                transition-all duration-200
                hover:border-accent hover:bg-surface2
                -mx-4 px-4 lg:-mx-6 lg:px-6 rounded-[2px]"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
            >
              {/* Index */}
              <span
                className="t-label transition-colors duration-200 group-hover:text-accent"
                style={{ color: "rgba(122,131,152,0.7)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Name */}
              <p className="font-[family-name:var(--font-syne)] font-semibold text-[1.125rem] text-text leading-snug">
                {ind.name}
              </p>

              {/* Description — hidden on mobile */}
              <p className="hidden lg:block text-[13px] text-muted font-[family-name:var(--font-dm)]">
                {ind.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
