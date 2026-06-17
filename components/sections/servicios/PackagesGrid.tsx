"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PACKAGES, WA_BASE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function Check({ accent }: { accent?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 mt-0.5">
      <circle
        cx="7" cy="7" r="6"
        stroke={accent ? "rgba(232,148,58,0.3)" : "rgba(255,255,255,0.1)"}
      />
      <path
        d="M4.5 7l2 2 3-3"
        stroke={accent ? "#E8943A" : "#7A8398"}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckTeal() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 mt-0.5">
      <circle cx="7" cy="7" r="6" stroke="rgba(78,205,196,0.25)" />
      <path d="M4.5 7l2 2 3-3" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PackagesGrid() {
  const pro     = PACKAGES.find(p => p.featured)!;
  const starter = PACKAGES.find(p => p.id === "starter")!;
  const full    = PACKAGES.find(p => p.id === "full")!;

  return (
    <section className="py-20 lg:py-28 bg-surface relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <div className="container">
        {/* Header — left aligned */}
        <div className="flex flex-col gap-3 mb-12 lg:mb-14 max-w-[520px]">
          <motion.h2
            className="t-head text-[clamp(1.75rem,4vw,2.5rem)]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            Elige tu punto de partida
          </motion.h2>
          <motion.p
            className="text-base text-muted font-[family-name:var(--font-dm)] max-w-[400px]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            Todos incluyen soporte post-implementación. Puedes escalar en cualquier momento.
          </motion.p>
        </div>

        {/* Asymmetric grid: Pro (featured) left 3fr, Starter + Full stacked right 2fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 items-start">

          {/* Pro — featured, main visual weight */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative flex flex-col gap-7 p-8 lg:p-10 rounded-[4px]
              border border-[rgba(232,148,58,0.35)] bg-[rgba(232,148,58,0.04)]"
          >
            {/* Popular badge — left-pinned, not centered */}
            <div className="absolute -top-3 left-8">
              <span className="px-3 py-1 rounded-[2px] text-[10px] font-[family-name:var(--font-syne)] font-bold tracking-widest uppercase bg-accent text-bg">
                Popular
              </span>
            </div>

            {/* Header */}
            <div className="pt-2">
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-[1.2rem] text-text">
                {pro.name}
              </h3>
              <p className="text-[13px] text-muted font-[family-name:var(--font-dm)] mt-1">
                {pro.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-[family-name:var(--font-syne)] font-extrabold text-[3rem] leading-none text-accent">
                {pro.price}
              </span>
              <span className="text-[12px] text-muted font-[family-name:var(--font-dm)] max-w-[180px] leading-snug">
                {pro.priceSub}
              </span>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3 flex-1">
              {pro.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-[14px] font-[family-name:var(--font-dm)] text-text/80">
                  <Check accent />
                  {feat}
                </li>
              ))}
            </ul>

            <div className="h-px" style={{ background: "rgba(232,148,58,0.15)" }} />

            <Button
              variant="primary"
              size="md"
              href={`${WA_BASE}?text=${encodeURIComponent(`Hola, me interesa el paquete ${pro.name} de AXUSIA`)}`}
            >
              {pro.ctaLabel}
            </Button>
          </motion.div>

          {/* Right column: Starter + Full */}
          <div className="flex flex-col gap-4">

            {/* Starter — compact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              className="flex flex-col gap-5 p-6 lg:p-7 rounded-[4px]
                border border-border bg-surface
                hover:border-border2 transition-[border-color] duration-300"
            >
              <div>
                <span className="t-label text-[10px]">Starter</span>
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-[1rem] text-text mt-2">
                  {starter.tagline}
                </h3>
              </div>

              <div>
                <span className="font-[family-name:var(--font-syne)] font-extrabold text-[1.875rem] leading-none text-text">
                  {starter.price}
                </span>
                <p className="text-[11px] text-muted font-[family-name:var(--font-dm)] mt-1 leading-snug">
                  {starter.priceSub}
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {starter.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-[12px] font-[family-name:var(--font-dm)] text-text/70">
                    <Check />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                variant="secondary"
                size="sm"
                href={`${WA_BASE}?text=${encodeURIComponent(`Hola, me interesa el paquete ${starter.name} de AXUSIA`)}`}
              >
                {starter.ctaLabel}
              </Button>
            </motion.div>

            {/* Full — enterprise band with teal accent */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
              className="flex flex-col gap-5 p-6 lg:p-7 rounded-[4px]
                border border-border border-l-2 bg-surface2
                transition-colors duration-300 hover:bg-surface3"
              style={{ borderLeftColor: "var(--color-teal)" }}
            >
              <div>
                <span
                  className="t-label text-[10px]"
                  style={{ color: "var(--color-teal)" }}
                >
                  Full — Enterprise
                </span>
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-[1rem] text-text mt-2">
                  {full.tagline}
                </h3>
              </div>

              <div>
                <span
                  className="font-[family-name:var(--font-syne)] font-extrabold text-[1.625rem] leading-none"
                  style={{ color: "var(--color-teal)" }}
                >
                  {full.price}
                </span>
                <p className="text-[11px] text-muted font-[family-name:var(--font-dm)] mt-1 leading-snug">
                  {full.priceSub}
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {full.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-[12px] font-[family-name:var(--font-dm)] text-text/70">
                    <CheckTeal />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                variant="ghost"
                size="sm"
                href={`${WA_BASE}?text=${encodeURIComponent(`Hola, me interesa el paquete ${full.name} de AXUSIA`)}`}
              >
                {full.ctaLabel}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
