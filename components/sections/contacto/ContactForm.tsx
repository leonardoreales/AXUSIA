"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SECTORS, INTERESTS, WA_BASE } from "@/lib/constants";
import type { ContactApiResponse } from "@/types";

const schema = z.object({
  nombre:    z.string().min(2, "Ingresa tu nombre"),
  empresa:   z.string().min(2, "Ingresa el nombre de tu empresa"),
  whatsapp:  z.string().min(7, "Ingresa un número de WhatsApp válido"),
  email:     z.string().email("Ingresa un email válido"),
  sector:    z.string().min(1, "Selecciona tu sector"),
  interes:   z.string().min(1, "Selecciona un área de interés"),
  proceso:   z.string().min(20, "Cuéntanos un poco más (mínimo 20 caracteres)"),
});

type FormData = z.infer<typeof schema>;

const EASE = [0.16, 1, 0.3, 1] as const;

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-[family-name:var(--font-syne)] font-semibold text-muted tracking-wide uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-400 font-[family-name:var(--font-dm)]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = `
  w-full px-4 py-3 rounded-[4px]
  bg-[rgba(255,255,255,0.03)]
  border border-[rgba(255,255,255,0.08)]
  text-[14px] font-[family-name:var(--font-dm)] text-text
  placeholder:text-muted
  transition-[border-color,box-shadow] duration-200
  outline-none
  focus:border-[rgba(180,189,210,0.4)]
  focus:shadow-[0_0_0_3px_rgba(180,189,210,0.07)]
`;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: ContactApiResponse = await res.json();
      if (json.success) {
        setStatus("success");
        reset();
      } else {
        setServerMsg(json.error ?? "Error al enviar. Inténtalo de nuevo.");
        setStatus("error");
      }
    } catch {
      setServerMsg("Error de conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  };

  const NEXT_STEPS = [
    "Revisamos la información de tu proceso",
    "Preparamos una propuesta personalizada",
    "Primera reunión — gratis, sin compromiso",
  ];

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col gap-8 py-12 px-8 rounded-[2px]
                   border border-[rgba(180,189,210,0.2)]
                   bg-[rgba(180,189,210,0.03)]"
      >
        {/* Checkmark animado */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.1 }}
            className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center
                       border border-[rgba(180,189,210,0.35)] bg-[rgba(180,189,210,0.08)]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12l5 5 9-9" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <div>
            <h3 className="t-head text-[1.15rem] text-text">¡Solicitud recibida!</h3>
            <p className="text-[13px] text-muted font-[family-name:var(--font-dm)] mt-0.5">
              Te contactamos en menos de 2 horas hábiles
            </p>
          </div>
        </div>

        {/* Próximos pasos */}
        <div className="flex flex-col gap-3 border-t border-[rgba(255,255,255,0.06)] pt-6">
          <p className="text-[11px] text-muted font-[family-name:var(--font-syne)] uppercase tracking-widest">
            Lo que sigue
          </p>
          <ol className="flex flex-col gap-2.5">
            {NEXT_STEPS.map((step, i) => (
              <li key={i} className="flex items-center gap-3 text-[13px] font-[family-name:var(--font-dm)] text-text/80">
                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]
                             font-[family-name:var(--font-syne)] font-bold"
                  style={{
                    background: "rgba(180,189,210,0.1)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(180,189,210,0.2)",
                  }}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" href="/servicios">
            Explorar servicios
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              reset();
              setStatus("idle");
            }}
          >
            Enviar otra consulta
          </Button>
        </div>

        {/* Urgencia */}
        <p className="text-[12px] text-muted font-[family-name:var(--font-dm)]">
          ¿Urgente?{" "}
          <a
            href={WA_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:text-text transition-colors"
          >
            Escríbenos ahora por WhatsApp
          </a>
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nombre" error={errors.nombre?.message}>
          <input
            {...register("nombre")}
            placeholder="Tu nombre"
            className={inputClass}
            autoComplete="name"
          />
        </Field>
        <Field label="Empresa" error={errors.empresa?.message}>
          <input
            {...register("empresa")}
            placeholder="Nombre de tu empresa o negocio"
            className={inputClass}
            autoComplete="organization"
          />
        </Field>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="WhatsApp" error={errors.whatsapp?.message}>
          <input
            {...register("whatsapp")}
            placeholder="+57 300 000 0000"
            className={inputClass}
            type="tel"
            autoComplete="tel"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            placeholder="tucorreo@empresa.com"
            className={inputClass}
            type="email"
            autoComplete="email"
          />
        </Field>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Sector" error={errors.sector?.message}>
          <select {...register("sector")} className={`${inputClass} cursor-pointer`}>
            <option value="">Selecciona tu sector</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="¿Qué quieres automatizar?" error={errors.interes?.message}>
          <select {...register("interes")} className={`${inputClass} cursor-pointer`}>
            <option value="">Selecciona un área</option>
            {INTERESTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Textarea */}
      <Field label="Cuéntanos tu proceso actual" error={errors.proceso?.message}>
        <textarea
          {...register("proceso")}
          placeholder="Describe brevemente cómo lo haces hoy y qué parte te consume más tiempo..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </Field>

      {/* Server error */}
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[13px] text-red-400 font-[family-name:var(--font-dm)]"
          >
            {serverMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={status === "loading"}
        className="self-start"
      >
        Enviar solicitud de diagnóstico
      </Button>

      <p className="text-[12px] text-muted font-[family-name:var(--font-dm)]">
        Sin spam. Respondemos en menos de 2 horas en horario hábil.
      </p>
    </form>
  );
}
