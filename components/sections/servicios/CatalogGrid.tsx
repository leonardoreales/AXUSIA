"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FilterBar } from "./FilterBar";
import { CatalogCard } from "./CatalogCard";
import { CATALOG } from "@/lib/constants";

const ALL = "all";

const CATEGORIES = [
  { id: ALL,        label: "Todos"           },
  { id: "atencion", label: "Atención"        },
  { id: "ventas",   label: "Ventas"          },
  { id: "finanzas", label: "Finanzas"        },
  { id: "ops",      label: "Operaciones"     },
];

export function CatalogGrid() {
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeFilter === ALL
        ? CATALOG
        : CATALOG.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  const handleFilter = (id: string) => {
    setActiveFilter(id);
    setOpenId(null);
  };

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="pt-2">
        <FilterBar
          categories={CATEGORIES}
          active={activeFilter}
          onChange={handleFilter}
        />
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pt-16 pb-8 flex flex-col items-center gap-4 text-center"
          >
            <p className="text-muted font-[family-name:var(--font-dm)] text-[15px]">
              No hay servicios en esta categoría todavía.
            </p>
            <button
              onClick={() => handleFilter(ALL)}
              className="text-accent text-[14px] font-[family-name:var(--font-dm)] hover:underline cursor-pointer"
            >
              Ver todos los servicios
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col divide-y divide-border border-t border-border pt-10 lg:pt-12"
          >
            {filtered.map((item, i) => (
              <CatalogCard
                key={item.id}
                item={item}
                index={i}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
