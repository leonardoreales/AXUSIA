"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function StatsStrip() {
  return (
    <section className="relative border-y border-[rgba(255,255,255,0.06)] bg-surface">
      {/* Accent line top */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232,148,58,0.50) 30%, rgba(232,148,58,0.50) 70%, transparent 100%)",
        }}
      />

      <div className="container py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 items-center">

          {/* Hero stat — 72h */}
          <motion.div
            className="flex flex-col gap-2 pb-10 lg:pb-0 lg:pr-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <span
              className="font-[family-name:var(--font-syne)] font-black leading-none"
              style={{ fontSize: "clamp(4rem,9vw,6.5rem)", color: "var(--color-accent)" }}
            >
              {STATS[0].value}
            </span>
            <span className="text-[15px] text-text/70 font-[family-name:var(--font-dm)] max-w-[220px] leading-snug">
              {STATS[0].label}
            </span>
          </motion.div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block self-stretch"
            style={{ background: "rgba(255,255,255,0.07)", width: 1, minHeight: 120 }}
            aria-hidden
          />

          {/* Secondary stats — 3 apilados */}
          <div className="flex flex-col divide-y divide-border/60 lg:pl-16 border-t border-border/60 lg:border-t-0">
            {STATS.slice(1).map((stat, i) => (
              <motion.div
                key={stat.value}
                className="flex items-center gap-5 py-5"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
              >
                <span
                  className="font-[family-name:var(--font-syne)] font-extrabold leading-none shrink-0"
                  style={{ fontSize: "clamp(1.75rem,3.5vw,2.25rem)", color: "var(--color-accent)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[13px] text-muted font-[family-name:var(--font-dm)] leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
