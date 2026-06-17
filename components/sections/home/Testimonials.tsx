"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TESTIMONIALS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-surface">
      {/* Subtle glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, rgba(180,189,210,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Top border */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-14 lg:mb-20 max-w-[520px]">
          <Eyebrow>Clientes</Eyebrow>
          <motion.h2
            className="t-head text-[clamp(1.75rem,4vw,2.75rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            Lo que dicen quienes ya automatizaron
          </motion.h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">

          {/* Featured testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col justify-between gap-8 p-8 lg:p-10 rounded-[2px]
                       border-t-2 border-accent/50
                       border-x border-b border-border
                       bg-surface2"
          >
            {/* Quote */}
            <div className="flex flex-col gap-5">
              {/* Opening quote mark */}
              <div
                className="font-[family-name:var(--font-syne)] font-black leading-none select-none"
                style={{ fontSize: "clamp(3rem,6vw,5rem)", color: "rgba(180,189,210,0.12)" }}
                aria-hidden
              >
                &ldquo;
              </div>
              <p className="t-head text-[clamp(1rem,1.8vw,1.2rem)] text-text leading-relaxed -mt-4">
                {featured.quote}
              </p>
            </div>

            {/* Author + metric */}
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[14px] font-[family-name:var(--font-syne)] font-semibold text-text">
                  {featured.author}
                </p>
                <p className="text-[13px] text-muted font-[family-name:var(--font-dm)] mt-0.5">
                  {featured.role} · {featured.company}
                </p>
                <p className="text-[11px] text-muted font-[family-name:var(--font-dm)] mt-0.5">
                  {featured.sector}
                </p>
              </div>
              {featured.metric && (
                <div
                  className="px-3 py-1.5 rounded-[2px] shrink-0"
                  style={{
                    background: "rgba(180,189,210,0.08)",
                    border: "1px solid rgba(180,189,210,0.2)",
                  }}
                >
                  <p className="text-[12px] font-[family-name:var(--font-syne)] font-semibold text-accent">
                    {featured.metric}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Compact testimonials stacked */}
          <div className="flex flex-col gap-4">
            {rest.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                className="flex flex-col gap-4 p-6 rounded-[2px] border border-border
                           bg-surface2 flex-1"
              >
                <p className="text-[13px] text-text/80 font-[family-name:var(--font-dm)] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between gap-3 mt-auto flex-wrap border-t border-[rgba(255,255,255,0.05)] pt-4">
                  <div>
                    <p className="text-[13px] font-[family-name:var(--font-syne)] font-semibold text-text">
                      {t.author}
                    </p>
                    <p className="text-[11px] text-muted font-[family-name:var(--font-dm)] mt-0.5">
                      {t.role} · {t.company}
                    </p>
                  </div>
                  {t.metric && (
                    <span
                      className="text-[11px] font-[family-name:var(--font-syne)] font-semibold text-teal shrink-0"
                    >
                      {t.metric}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
