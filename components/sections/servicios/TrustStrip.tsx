"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function TrustStrip() {
  return (
    <div className="border-y border-border">
      <div className="container-wide">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className="flex flex-col gap-1 px-8 py-10 lg:py-12 first:pl-0 last:pr-0"
            >
              <dt className="text-[2rem] font-[family-name:var(--font-syne)] font-extrabold text-text leading-none tracking-tight">
                {stat.value}
              </dt>
              <dd className="text-[13px] text-muted font-[family-name:var(--font-dm)] leading-snug max-w-[140px]">
                {stat.label}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
}
