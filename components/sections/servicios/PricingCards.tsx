"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Check } from "lucide-react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { PRICING_CARDS, WA_BASE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.14, duration: 0.55, ease: EASE },
  }),
  hidden: { filter: "blur(8px)", y: -12, opacity: 0 },
};

/* ─── Toggle ──────────────────────────────────────────────────────── */
function PricingSwitch({
  onSwitch,
  className,
}: {
  onSwitch: (value: string) => void;
  className?: string;
}) {
  const [selected, setSelected] = useState("0");

  const handle = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className={cn("flex", className)}>
      <div
        className="relative flex w-fit rounded-[3px] p-[3px] gap-[2px]"
        style={{ background: "var(--color-surface2)", border: "1px solid var(--color-border)" }}
      >
        {(["0", "1"] as const).map((val) => {
          const isActive = selected === val;
          return (
            <button
              key={val}
              onClick={() => handle(val)}
              className={cn(
                "relative z-10 cursor-pointer rounded-[2px] h-9 px-4",
                "font-[family-name:var(--font-syne)] text-[11px] font-semibold",
                "tracking-[0.08em] uppercase transition-colors duration-200",
                isActive ? "text-text" : "text-muted hover:text-text/70"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="pricing-switch"
                  className="absolute inset-0 rounded-[2px]"
                  style={{
                    background: "linear-gradient(to bottom, rgba(180,189,210,0.1), rgba(180,189,210,0.04))",
                    border: "1px solid rgba(180,189,210,0.14)",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                />
              )}
              <span className="relative">
                {val === "0" ? "Implementación" : "Mensualidad"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────────────── */
export function PricingCards() {
  const [isMonthly, setIsMonthly] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggle = (value: string) => setIsMonthly(parseInt(value) === 1);

  return (
    <section className="py-20 lg:py-28 relative" style={{ background: "var(--color-bg)" }}>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <div className="container" ref={sectionRef}>
        {/* Header */}
        <article className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-[520px]">
            <TimelineContent as="p" animationNum={0} customVariants={revealVariants} className="t-label mb-3">
              Planes y precios
            </TimelineContent>

            <h2
              className="font-[family-name:var(--font-syne)] font-bold text-text"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
            >
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.11}
                staggerFrom="first"
                reverse={true}
                containerClassName="justify-start"
                transition={{ type: "spring", stiffness: 240, damping: 38, delay: 0.08 }}
              >
                Elige tu punto de partida
              </VerticalCutReveal>
            </h2>

            <TimelineContent
              as="p"
              animationNum={1}
              customVariants={revealVariants}
              className="font-[family-name:var(--font-dm)] text-[13px] text-muted mt-3 leading-relaxed max-w-[380px]"
            >
              Todos incluyen soporte post-implementación y diagnóstico gratuito. Escala en cualquier momento.
            </TimelineContent>
          </div>

          <TimelineContent as="div" animationNum={2} customVariants={revealVariants} className="shrink-0">
            <PricingSwitch onSwitch={toggle} />
          </TimelineContent>
        </article>

        {/* Cards */}
        <TimelineContent
          as="div"
          animationNum={3}
          customVariants={revealVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-[4px] overflow-hidden"
          style={{ background: "var(--color-border)" }}
        >
          {PRICING_CARDS.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isMonthly={isMonthly}
              animationNum={index + 4}
            />
          ))}
        </TimelineContent>
      </div>
    </section>
  );
}

/* ─── Single card ─────────────────────────────────────────────────── */
function PricingCard({
  plan,
  isMonthly,
  animationNum,
}: {
  plan: (typeof PRICING_CARDS)[number];
  isMonthly: boolean;
  animationNum: number;
}) {
  const waHref = `${WA_BASE}?text=${encodeURIComponent(plan.waMessage)}`;
  const DIVIDER = plan.popular
    ? "rgba(180,189,210,0.1)"
    : "var(--color-border)";

  return (
    <TimelineContent
      as="div"
      animationNum={animationNum}
      customVariants={revealVariants}
      className="relative flex flex-col"
      style={
        plan.popular
          ? {
              background: "linear-gradient(175deg, rgba(180,189,210,0.06) 0%, var(--color-surface) 55%)",
              boxShadow: "inset 0 1px 0 rgba(180,189,210,0.12)",
            }
          : { background: "var(--color-surface)" }
      }
    >
      {plan.popular && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(180,189,210,0.1), transparent)",
          }}
        />
      )}

      <div className="relative flex flex-col flex-1 p-7 lg:p-8 gap-0">

        {/* ── 1. Identity ──────────────────────────────────────────── */}
        <div className="pb-6" style={{ borderBottom: `1px solid ${DIVIDER}` }}>
          <div className="flex items-start justify-between mb-3">
            <span className="t-label text-[10px]">{plan.name}</span>
            {plan.popular && (
              <span
                className="px-2.5 py-[3px] rounded-[2px] text-[9px] font-[family-name:var(--font-syne)] font-bold tracking-[0.16em] uppercase"
                style={{
                  background: "rgba(232,148,58,0.12)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(232,148,58,0.22)",
                }}
              >
                Recomendado
              </span>
            )}
          </div>
          <p
            className="font-[family-name:var(--font-dm)] leading-relaxed text-muted"
            style={{ fontSize: "13px" }}
          >
            {plan.description}
          </p>
        </div>

        {/* ── 2. Price ──────────────────────────────────────────────── */}
        <div className="py-6" style={{ borderBottom: `1px solid ${DIVIDER}` }}>
          {plan.isDesde && (
            <p
              className="font-[family-name:var(--font-dm)] text-muted mb-1"
              style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              Desde
            </p>
          )}
          <div className="flex items-start gap-1">
            <span
              className="font-[family-name:var(--font-syne)] font-semibold text-muted mt-1"
              style={{ fontSize: "14px", lineHeight: 1.4 }}
            >
              $
            </span>
            <span
              className="font-[family-name:var(--font-syne)] font-extrabold text-text tabular-nums"
              style={{ fontSize: "clamp(1.875rem, 3.2vw, 2.375rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              <NumberFlow
                value={isMonthly ? plan.monthlyPrice : plan.setupPrice}
                format={{ style: "decimal", maximumFractionDigits: 0 }}
                locales="es-CO"
              />
            </span>
          </div>
          <p
            className="font-[family-name:var(--font-dm)] text-muted mt-2"
            style={{ fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            COP · {isMonthly ? "por mes" : "pago único"}
          </p>
          {!isMonthly && (
            <p
              className="font-[family-name:var(--font-dm)] mt-1"
              style={{ fontSize: "11px", color: "rgba(122,131,152,0.55)" }}
            >
              {plan.id === "full"
                ? "+ mantenimiento a convenir"
                : `+ $${(plan.monthlyPrice / 1000).toFixed(0)}.000 COP/mes mantenimiento`}
            </p>
          )}
        </div>

        {/* ── 3. Features ───────────────────────────────────────────── */}
        <ul className="flex flex-col gap-3 pt-6 flex-1">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3">
              <span
                className="shrink-0 h-[18px] w-[18px] rounded-full grid place-content-center mt-[1px]"
                style={
                  plan.popular
                    ? { background: "rgba(180,189,210,0.1)", border: "1px solid rgba(180,189,210,0.2)" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }
                }
              >
                <Check
                  size={10}
                  strokeWidth={2.5}
                  style={{ color: plan.popular ? "rgba(180,189,210,0.7)" : "rgba(122,131,152,0.7)" }}
                />
              </span>
              <span
                className="font-[family-name:var(--font-dm)] leading-snug"
                style={{ fontSize: "13px", color: "rgba(240,238,232,0.65)" }}
              >
                {feat}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div
        className="px-7 lg:px-8 pb-7 lg:pb-8"
        style={{ borderTop: `1px solid ${DIVIDER}` }}
      >
        <Button
          variant={plan.popular ? "primary" : plan.id === "full" ? "ghost" : "secondary"}
          size="md"
          href={waHref}
          external
          className="w-full justify-center mt-5"
        >
          {plan.ctaLabel}
        </Button>
      </div>
    </TimelineContent>
  );
}
