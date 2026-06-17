"use client";

import { motion } from "framer-motion";
import { WA_BASE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const CHANNELS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-teal">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+57 300 000 0000",
    href: WA_BASE,
    description: "Respuesta inmediata en horario hábil",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Email",
    value: "hola@axusai.co",
    href: "mailto:hola@axusai.co",
    description: "Respondemos en menos de 2 horas",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Ubicación",
    value: "Barranquilla, Colombia",
    href: null,
    description: "Atención presencial previa cita",
  },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-10">
      {/* Promise box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="p-7 lg:p-8 rounded-[2px] border border-[rgba(232,148,58,0.2)] bg-[rgba(232,148,58,0.04)]"
      >
        <h3 className="t-head text-[1rem] text-text mb-3">
          Lo que pasa después de que envías el formulario
        </h3>
        <ol className="flex flex-col gap-3">
          {[
            "Recibes confirmación inmediata por correo",
            "Te contactamos en menos de 2 horas hábiles por WhatsApp",
            "Agendamos una llamada de 30 minutos para el diagnóstico",
            "Te enviamos propuesta por escrito sin costo",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px] font-[family-name:var(--font-dm)] text-text/75">
              <span
                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]
                           font-[family-name:var(--font-syne)] font-bold"
                style={{
                  background: "rgba(232,148,58,0.1)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(232,148,58,0.2)",
                }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Channels */}
      <div className="flex flex-col gap-5">
        {CHANNELS.map((ch, i) => (
          <motion.div
            key={ch.label}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
            className="flex items-start gap-4 p-5 rounded-[2px]
                       border border-border
                       bg-surface2"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0
                            bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
              {ch.icon}
            </div>
            <div>
              <p className="text-[11px] text-muted font-[family-name:var(--font-syne)] uppercase tracking-wider">
                {ch.label}
              </p>
              {ch.href ? (
                <a
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-[14px] font-[family-name:var(--font-dm)] text-text hover:text-accent transition-colors duration-200"
                >
                  {ch.value}
                </a>
              ) : (
                <p className="text-[14px] font-[family-name:var(--font-dm)] text-text">
                  {ch.value}
                </p>
              )}
              <p className="text-[12px] text-muted font-[family-name:var(--font-dm)] mt-0.5">
                {ch.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hours */}
      <div className="text-[12px] text-muted font-[family-name:var(--font-dm)]">
        Horario hábil: Lunes a Viernes · 8:00 am – 6:00 pm (COT)
      </div>
    </div>
  );
}
