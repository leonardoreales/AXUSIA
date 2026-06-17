"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { STACK_ITEMS } from "@/lib/constants";
import type { StackItem } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORY_COLORS: Record<string, {
  dot: string;
  label: string;
  chipBorder: string;
  chipBg: string;
  chipText: string;
}> = {
  Motor:         { dot: "#4ECDC4", label: "#4ECDC4", chipBorder: "rgba(78,205,196,0.28)",  chipBg: "rgba(78,205,196,0.06)",  chipText: "#4ECDC4" },
  IA:            { dot: "#E8943A", label: "#E8943A", chipBorder: "rgba(232,148,58,0.28)",  chipBg: "rgba(232,148,58,0.06)",  chipText: "#E8943A" },
  Comunicación:  { dot: "#60A5FA", label: "#93C5FD", chipBorder: "rgba(96,165,250,0.22)",  chipBg: "rgba(96,165,250,0.05)",  chipText: "#93C5FD" },
  Productividad: { dot: "#34D399", label: "#6EE7B7", chipBorder: "rgba(52,211,153,0.22)",  chipBg: "rgba(52,211,153,0.05)",  chipText: "#6EE7B7" },
  Datos:         { dot: "#A78BFA", label: "#C4B5FD", chipBorder: "rgba(167,139,250,0.22)", chipBg: "rgba(167,139,250,0.05)", chipText: "#C4B5FD" },
};

export function StackGrid() {
  // Group items by category preserving insertion order
  const categories = Array.from(
    STACK_ITEMS.reduce((map, item) => {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
      return map;
    }, new Map<string, StackItem[]>())
  );

  return (
    <section className="py-20 lg:py-28 bg-surface relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
      />

      <div className="container">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-10 lg:mb-14 max-w-[500px]">
          <Eyebrow>Tecnología</Eyebrow>
          <motion.h2
            className="t-head text-[clamp(1.75rem,4vw,2.5rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            Las herramientas detrás de cada solución
          </motion.h2>
          <motion.p
            className="text-[15px] text-text/70 font-[family-name:var(--font-dm)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          >
            Tú no necesitas conocerlas — nosotros las manejamos por ti.
          </motion.p>
        </div>

        {/* Category table */}
        <div className="divide-y divide-border">
          {categories.map(([category, items], i) => {
            const colors = CATEGORY_COLORS[category] ?? {
              dot: "#7A8398",
              label: "#7A8398",
              chipBorder: "rgba(122,131,152,0.25)",
              chipBg: "rgba(122,131,152,0.05)",
              chipText: "#7A8398",
            };
            return (
              <motion.div
                key={category}
                className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-4 lg:gap-10 items-start py-6 lg:py-7"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              >
                {/* Category label */}
                <div className="flex items-center gap-2.5 pt-0.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: colors.dot }}
                  />
                  <span
                    className="t-label"
                    style={{ color: colors.label }}
                  >
                    {category}
                  </span>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2.5">
                  {items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col gap-0.5 px-4 py-2.5 rounded-[2px] border"
                      style={{
                        borderColor: colors.chipBorder,
                        backgroundColor: colors.chipBg,
                      }}
                    >
                      <span
                        className="text-[12px] font-[family-name:var(--font-syne)] font-semibold leading-none"
                        style={{ color: colors.chipText }}
                      >
                        {item.name}
                      </span>
                      <span className="text-[11px] text-muted font-[family-name:var(--font-dm)] mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
