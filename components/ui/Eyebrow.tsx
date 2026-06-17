"use client";

import { motion } from "framer-motion";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function Eyebrow({ children, className = "", animate = true }: EyebrowProps) {
  if (!animate) {
    return (
      <div className={`eyebrow ${className}`}>
        <span className="t-label">{children}</span>
      </div>
    );
  }

  return (
    <motion.div
      className={`eyebrow ${className}`}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="t-label">{children}</span>
    </motion.div>
  );
}
