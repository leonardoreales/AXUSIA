"use client";

import { motion } from "framer-motion";

interface FilterBarProps {
  categories: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}

export function FilterBar({ categories, active, onChange }: FilterBarProps) {
  return (
    <div
      className="flex flex-wrap gap-2 pb-7 border-b border-border"
      role="group"
      aria-label="Filtrar por categoría"
    >
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              relative px-4 py-2 rounded-[2px] text-[11px]
              font-[family-name:var(--font-syne)] font-semibold tracking-[0.08em] uppercase
              transition-colors duration-200 cursor-pointer
              outline-none focus-visible:ring-1 focus-visible:ring-accent
              ${isActive
                ? "text-text bg-[rgba(232,148,58,0.1)] border border-[rgba(232,148,58,0.3)]"
                : "text-muted bg-transparent border border-border hover:text-text hover:border-border2"
              }
            `}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-[4px] bg-[rgba(232,148,58,0.08)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
