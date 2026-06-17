"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: PageHeaderProps) {
  return (
    <section
      className={`relative pt-[184px] lg:pt-[212px] pb-20 lg:pb-28 overflow-hidden ${className}`}
    >
      {/* Ambient radial glow — top center */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 900,
          height: 380,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(232,148,58,0.20) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal rule fade */}
      <div
        aria-hidden
        className="absolute top-[88px] left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent 100%)",
        }}
      />

      <div className="container relative">
        {/* Eyebrow */}
        {eyebrow && (
          <div className="mb-5">
            <Eyebrow animate>{eyebrow}</Eyebrow>
          </div>
        )}

        {/* Title */}
        <motion.h1
          className="t-display text-[clamp(1.875rem,3.25vw,3.25rem)] max-w-[680px] text-balance"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: eyebrow ? 0.12 : 0.05, ease: EASE }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="mt-6 text-[1rem] text-text/75 leading-relaxed max-w-[500px] font-[family-name:var(--font-dm)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative bottom line */}
        <motion.div
          className="mt-12 h-px w-16 bg-accent origin-left"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.35, ease: EASE }}
        />
      </div>
    </section>
  );
}
