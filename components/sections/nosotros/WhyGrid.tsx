"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WHY_ITEMS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WhyGrid() {
  return (
    <section className="py-20 lg:py-28 bg-surface relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
      />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 lg:gap-24 items-start">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-[120px] flex flex-col gap-5">
            <Eyebrow>Diferenciadores</Eyebrow>
            <motion.h2
              className="t-head text-[clamp(1.75rem,4vw,2.5rem)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            >
              Por qué trabajar con nosotros
            </motion.h2>
            <motion.p
              className="text-[14px] text-muted font-[family-name:var(--font-dm)] leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            >
              Cuatro compromisos concretos, no promesas de agencia.
            </motion.p>
          </div>

          {/* Right — numbered list */}
          <div className="flex flex-col divide-y divide-border">
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={item.number}
                className="grid grid-cols-[64px_1fr] gap-6 lg:gap-8 py-10 lg:py-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              >
                {/* Number column with connector */}
                <div className="flex flex-col items-center gap-1 pt-0.5">
                  <span
                    className="t-label"
                    style={{ color: "rgba(180,189,210,0.55)" }}
                  >
                    {item.number}
                  </span>
                  {i < WHY_ITEMS.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,255,255,0.07)" }} />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 pb-2">
                  <h3 className="t-head text-[1.0625rem] text-text">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-text/70 font-[family-name:var(--font-dm)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
