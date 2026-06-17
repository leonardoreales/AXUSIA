"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PROCESS_STEPS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Process() {
  return (
    <section className="relative py-32 lg:py-44 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 400,
          background:
            "radial-gradient(ellipse at center, rgba(78,205,196,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col gap-5 mb-12 lg:mb-16 max-w-[520px]">
          <Eyebrow>Proceso</Eyebrow>
          <motion.h2
            className="t-head text-[clamp(1.75rem,4vw,2.75rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            Cómo lo hacemos
          </motion.h2>
          <motion.p
            className="text-[15px] text-text/75 font-[family-name:var(--font-dm)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
          >
            De la conversación inicial a tu sistema corriendo solo. Sin tecnicismos
            de tu lado.
          </motion.p>
        </div>

        {/* Steps — editorial table */}
        <div className="divide-y divide-border mt-0">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="grid grid-cols-[120px_1fr] lg:grid-cols-[160px_1fr] gap-8 lg:gap-16
                         py-10 lg:py-12 items-start group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
            >
              {/* Ghost number */}
              <span
                className="font-[family-name:var(--font-syne)] font-black leading-none select-none
                           text-[5rem] lg:text-[7rem] mt-1 transition-all duration-300
                           group-hover:opacity-20"
                style={{ color: "rgba(180,189,210,0.08)" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="t-label">{step.number}</span>
                <h3 className="t-head text-[1.125rem] lg:text-[1.25rem] text-text">
                  {step.title}
                </h3>
                <p className="text-[14px] text-text/70 font-[family-name:var(--font-dm)] leading-relaxed max-w-[480px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
