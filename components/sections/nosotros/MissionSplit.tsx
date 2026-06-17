"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MissionSplit() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left: mission */}
          <div className="flex flex-col gap-6">
            <Eyebrow>Misión</Eyebrow>
            <motion.h2
              className="t-head text-[clamp(1.75rem,4vw,2.75rem)] max-w-[440px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            >
              Que cada negocio colombiano tenga acceso a IA que realmente funcione
            </motion.h2>
            <motion.p
              className="text-[15px] text-text/75 font-[family-name:var(--font-dm)] leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
            >
              La mayoría de las herramientas de automatización están diseñadas
              para empresas con equipos técnicos y presupuestos en dólares.
              Nosotros construimos para el negocio local que tiene WhatsApp, una
              hoja de cálculo y ganas de crecer.
            </motion.p>
          </div>

          {/* Right: why us */}
          <div className="flex flex-col gap-6">
            <Eyebrow>Por qué existimos</Eyebrow>
            <motion.p
              className="text-[15px] text-text/75 font-[family-name:var(--font-dm)] leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
            >
              Vimos cómo consultorios, inmobiliarias y pequeñas empresas en
              Barranquilla perdían horas cada día en tareas manuales que la
              tecnología podía resolver. El problema no era el acceso a la IA
              — era que nadie les explicaba cómo usarla en su proceso específico.
            </motion.p>
            <motion.p
              className="text-[15px] text-text/75 font-[family-name:var(--font-dm)] leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
            >
              AXUSIA nació para cerrar esa brecha: diagnóstico gratuito,
              implementación rápida, precios en COP, soporte humano real.
            </motion.p>

            {/* Quote accent */}
            <motion.blockquote
              className="mt-4 pl-5 border-l-2 border-accent text-[1.0625rem] text-text font-[family-name:var(--font-syne)] font-medium leading-relaxed italic"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            >
              "Tu negocio no necesita un equipo de ingenieros. Necesita los procesos correctos automatizados."
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
