"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VALUES } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ValuesGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-col gap-4 mb-10 lg:mb-14 max-w-120">
          <Eyebrow>Valores</Eyebrow>
          <motion.h2
            className="t-head text-[clamp(1.75rem,4vw,2.5rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            Cómo trabajamos
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {VALUES.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              className="group flex flex-col gap-4 p-7 lg:p-8 rounded-[2px]
                         bg-surface2 border border-border
                         transition-[border-color] duration-300
                         hover:border-border2"
            >
              {val.icon}
              <h3 className="t-head text-[1rem] text-text">
                {val.title}
              </h3>
              <p className="text-[14px] text-text/75 font-[family-name:var(--font-dm)] leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
