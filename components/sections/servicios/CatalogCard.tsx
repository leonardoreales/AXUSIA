"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import type { CatalogItem } from "@/types";
import { WA_BASE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

interface CatalogCardProps {
  item: CatalogItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function CatalogCard({ item, isOpen, onToggle, index }: CatalogCardProps) {
  const waHref = `${WA_BASE}?text=${encodeURIComponent(item.detail.waMessage)}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, delay: index * 0.05, ease: EASE }}
      className="relative group"
    >
      {/* ── Row header ─────────────────────────────── */}
      <button
        onClick={onToggle}
        className="w-full text-left py-7 lg:py-8 cursor-pointer
                   grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)_auto]
                   gap-x-8 gap-y-4 items-start"
        aria-expanded={isOpen}
        aria-controls={`detail-${item.id}`}
        aria-label={`${isOpen ? "Cerrar" : "Ver"} detalles de ${item.title}`}
      >
        {/* Col 1 — category rail (quiet, structural) */}
        <span
          className="font-[family-name:var(--font-syne)] font-semibold text-[11px]
                     tracking-[2px] uppercase text-muted pt-0.5"
        >
          {item.categoryLabel}
        </span>

        {/* Col 2 — title + description + tags */}
        <div className="flex flex-col gap-3 pr-10 lg:pr-0">
          <h3 className="t-head text-[1.15rem] text-text leading-snug transition-colors duration-200 group-hover:text-accent">
            {item.title}
          </h3>
          <p className="text-[14px] text-text/75 font-[family-name:var(--font-dm)] leading-relaxed max-w-[44ch]">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Col 3 — price + toggle */}
        <div className="flex items-center gap-5 lg:flex-col lg:items-end lg:gap-4
                        absolute top-7 right-0 lg:static">
          <p className="hidden lg:block text-[13px] text-muted font-[family-name:var(--font-dm)] whitespace-nowrap">
            Desde {item.priceFrom}
          </p>
          <span
            className={`
              shrink-0 w-9 h-9 rounded-[2px] flex items-center justify-center
              border transition-all duration-300
              ${isOpen
                ? "border-[rgba(180,189,210,0.4)] bg-[rgba(180,189,210,0.08)] rotate-45"
                : "border-[rgba(255,255,255,0.1)] bg-transparent group-hover:border-[rgba(180,189,210,0.3)]"
              }
            `}
          >
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M6 2v8M2 6h8"
                stroke={isOpen ? "var(--color-accent)" : "var(--color-muted)"}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        {/* Mobile price (below grid, aligned with content) */}
        <p className="lg:hidden text-[13px] text-muted font-[family-name:var(--font-dm)] -mt-1">
          Desde {item.priceFrom}
        </p>
      </button>

      {/* ── Detail panel ───────────────────────────── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`detail-${item.id}`}
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.48, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-9 lg:pl-[212px]">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
                {/* Left — lead + features */}
                <div className="flex flex-col gap-5">
                  <p className="text-[14px] text-text/75 font-[family-name:var(--font-dm)] leading-relaxed max-w-[58ch]">
                    {item.detail.lead}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {item.detail.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-[13px] font-[family-name:var(--font-dm)] text-text"
                      >
                        <svg
                          width="14" height="14" viewBox="0 0 14 14"
                          fill="none" aria-hidden className="shrink-0 mt-0.5"
                        >
                          <circle cx="7" cy="7" r="6" stroke="rgba(180,189,210,0.3)" />
                          <path d="M4.5 7l2 2 3-3" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — pricing table + CTA */}
                <div className="flex flex-col gap-4">
                  <div className="rounded-[2px] bg-surface2 border border-[rgba(255,255,255,0.05)] overflow-hidden">
                    {item.detail.pricing.map((row, i) => (
                      <div
                        key={row.label}
                        className={`flex items-center justify-between px-4 py-2.5 text-[13px]
                                    ${i < item.detail.pricing.length - 1 ? "border-b border-[rgba(255,255,255,0.04)]" : ""}`}
                      >
                        <span className="text-muted font-[family-name:var(--font-dm)]">{row.label}</span>
                        <span className="font-[family-name:var(--font-syne)] font-semibold text-text">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="primary" size="sm" href={waHref}>
                    Quiero este servicio
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
