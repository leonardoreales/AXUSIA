"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SERVICES_TEASER } from "@/lib/constants";
import { WaDemo } from "./demos/WaDemo";
import { ContaDemo } from "./demos/ContaDemo";
import { LeadsDemo } from "./demos/LeadsDemo";

const EASE = [0.16, 1, 0.3, 1] as const;

const DEMOS = [WaDemo, ContaDemo, LeadsDemo];

export function ServicesTeaser() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(232,148,58,0.09) 0%, transparent 60%)",
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col gap-5 mb-4 max-w-[560px]">
          <Eyebrow>Qué automatizamos</Eyebrow>
          <motion.h2
            className="t-head text-[clamp(1.75rem,4vw,2.75rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            Las tareas que más tiempo te roban,{" "}
            resueltas con IA
          </motion.h2>
        </div>

        {/* Zig-zag rows */}
        <div className="divide-y divide-border mt-10 lg:mt-14">
          {SERVICES_TEASER.map((svc, i) => {
            const isEven = i % 2 === 0;
            const DemoComponent = DEMOS[i];
            return (
              <motion.div
                key={svc.title}
                className="grid grid-cols-1 lg:grid-cols-2 min-h-[340px]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              >
                {/* Text column */}
                <div
                  className={`flex flex-col justify-center gap-5 py-14 lg:py-16
                    ${isEven ? "lg:pr-20 order-2 lg:order-1" : "lg:pl-20 order-2 lg:order-2"}`}
                >
                  {/* Ghost index */}
                  <span
                    className="font-[family-name:var(--font-syne)] font-black text-[clamp(4.5rem,9vw,7rem)] leading-none select-none -mb-8"
                    style={{ color: "rgba(232,148,58,0.08)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-3 relative z-10">
                    <span className="t-label">{svc.category ?? "Automatización"}</span>
                    <h3 className="t-head text-[clamp(1.35rem,2.6vw,1.875rem)] text-text">
                      {svc.title}
                    </h3>
                    <p className="text-[14px] text-text/70 font-[family-name:var(--font-dm)] leading-relaxed max-w-[420px]">
                      {svc.description}
                    </p>
                  </div>

                  <Link
                    href="/servicios"
                    className="inline-flex items-center gap-2 text-[11px]
                      font-[family-name:var(--font-syne)] font-semibold
                      text-muted tracking-[0.1em] uppercase
                      transition-colors hover:text-accent group/link w-fit mt-1"
                  >
                    Ver detalle
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
                      className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                    >
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                {/* Visual column — product demo */}
                <div
                  className={`relative flex items-center justify-center
                    overflow-hidden min-h-[320px] lg:min-h-0 p-10
                    ${isEven ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}
                  style={{ background: "#0a1628" }}
                >
                  {/* Subtle grid overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), " +
                        "linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Ambient glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: i % 2 === 0
                        ? "radial-gradient(circle at 50% 60%, rgba(232,148,58,0.18) 0%, transparent 65%)"
                        : "radial-gradient(circle at 50% 60%, rgba(78,205,196,0.14) 0%, transparent 65%)",
                    }}
                    aria-hidden
                  />

                  {/* Preview badge */}
                  <div className="absolute top-4 right-4 z-20" aria-hidden>
                    <span
                      className="text-[9px] font-[family-name:var(--font-syne)] font-bold tracking-[0.12em]
                                 uppercase px-2 py-1 rounded-[3px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      Preview
                    </span>
                  </div>

                  {/* Demo — scaled + shadow */}
                  <div
                    className="relative z-10"
                    style={{
                      transform: "scale(1.05)",
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.55))",
                    }}
                  >
                    {DemoComponent && <DemoComponent />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.25, ease: EASE }}
        >
          <Button variant="secondary" size="md" href="/servicios">
            Ver catálogo completo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
