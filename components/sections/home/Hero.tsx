"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const HexMark3D = dynamic(
  () => import("@/components/ui/HexMark3D").then(m => ({ default: m.HexMark3D })),
  { ssr: false }
);

const EASE = [0.16, 1, 0.3, 1] as const;

const SIGNALS = [
  { label: "Menos tiempo operativo", value: "30h/sem" },
  { label: "Precios en COP", value: "Local" },
  { label: "Decisiones con datos", value: "Reportes" },
];

const CHAT = [
  {
    side: "in",
    text: "Hola, quiero cotizar mantenimiento locativo.",
    time: "10:32 a. m.",
  },
  {
    side: "out",
    text: "Claro. Para ayudarte, dime ciudad y área aproximada.",
    time: "10:33 a. m.",
  },
  {
    side: "in",
    text: "Barranquilla, barrio Los Alpes. 120 m2 aprox.",
    time: "10:34 a. m.",
  },
  {
    side: "out",
    text: "Listo. Generamos la cotización y la enviamos por WhatsApp.",
    time: "10:35 a. m.",
  },
];

const FLOW = [
  "Entrada WhatsApp",
  "IA entiende intención",
  "Valida cliente y servicio",
  "Genera cotización",
  "Registra en CRM",
];

const QUOTES = [
  { id: "COT-1248", client: "Cliente salud", value: "$2.350.000", status: "Enviada" },
  { id: "COT-1247", client: "Constructora local", value: "$5.680.000", status: "Enviada" },
  { id: "COT-1246", client: "Gimnasio norte", value: "$1.980.000", status: "Aceptada" },
  { id: "COT-1245", client: "Ferretería local", value: "$3.420.000", status: "Enviada" },
];

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path
        d="M20 10c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  );
}

function MiniIcon({ children }: { children: string }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] border border-[rgba(78,205,196,0.22)] bg-[rgba(78,205,196,0.08)] font-[family-name:var(--font-syne)] text-[11px] font-bold text-teal">
      {children}
    </span>
  );
}

function OperationalProof() {
  return (
    <div className="relative overflow-hidden rounded-[3px] border border-border2 bg-surface">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative grid grid-cols-1 border-b border-border lg:grid-cols-3">
        {[
          ["01", "Captura", "WhatsApp"],
          ["02", "Automatización", "Flujos + IA"],
          ["03", "Resultado", "Reporte"],
        ].map(([step, title, label], index) => (
          <div
            key={step}
            className="flex min-h-[78px] items-center gap-4 border-border px-5 py-4 lg:border-r last:lg:border-r-0"
          >
            <span className="font-[family-name:var(--font-syne)] text-[1.35rem] font-bold text-teal">
              {step}
            </span>
            <div>
              <p className="font-[family-name:var(--font-syne)] text-[13px] font-semibold text-text">
                {title}
              </p>
              <p className="font-[family-name:var(--font-syne)] text-[9px] uppercase tracking-[0.18em] text-muted">
                {label}
              </p>
            </div>
            {index < 2 && (
              <span className="ml-auto hidden h-px w-14 bg-text/35 lg:block" aria-hidden />
            )}
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.05fr_1.35fr]">
        <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WhatsAppIcon className="text-teal" />
              <div>
                <p className="font-[family-name:var(--font-syne)] text-[12px] font-semibold text-text">
                  WhatsApp Business
                </p>
                <p className="text-[10px] text-teal">En línea</p>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-teal" aria-hidden />
          </div>

          <div className="flex flex-col gap-3">
            {CHAT.map((msg) => (
              <div
                key={`${msg.time}-${msg.text}`}
                className={`max-w-[86%] rounded-[4px] border px-3 py-2 ${
                  msg.side === "out"
                    ? "ml-auto border-[rgba(78,205,196,0.14)] bg-[rgba(78,205,196,0.14)]"
                    : "border-[rgba(255,255,255,0.07)] bg-surface2"
                }`}
              >
                <p className="text-[11px] leading-relaxed text-text/85">{msg.text}</p>
                <p className="mt-1 text-right text-[9px] text-muted">{msg.time}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[3px] border border-border bg-bg px-3 py-2">
            <span className="text-[10px] text-muted">Escribe un mensaje</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        </div>

        <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
          <div className="mb-4">
            <p className="font-[family-name:var(--font-syne)] text-[12px] font-semibold text-text">
              Flujo de automatización
            </p>
            <p className="text-[10px] text-teal">En ejecución</p>
          </div>

          <div className="flex flex-col items-center">
            {FLOW.map((node, index) => (
              <div key={node} className="flex w-full flex-col items-center">
                <div className="grid w-full grid-cols-[32px_1fr_auto] items-center gap-3 rounded-[4px] border border-[rgba(255,255,255,0.08)] bg-surface2 px-3 py-2.5">
                  <MiniIcon>{index === 0 ? "W" : index === 1 ? "IA" : index === 2 ? "OK" : index === 3 ? "$" : "DB"}</MiniIcon>
                  <span className="text-[11px] text-text/85">{node}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                </div>
                {index < FLOW.length - 1 && (
                  <span className="h-5 w-px bg-[rgba(78,205,196,0.35)]" aria-hidden />
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
            <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.18em] text-muted">
              Ejecuciones hoy
            </span>
            <span className="font-[family-name:var(--font-syne)] text-[2rem] font-bold leading-none text-teal">
              87
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-[family-name:var(--font-syne)] text-[12px] font-semibold text-text">
                Resumen del día
              </p>
              <p className="text-[10px] text-muted">Ejemplo de operación</p>
            </div>
            <span className="rounded-[2px] border border-border px-2 py-1 text-[10px] text-muted">
              Hoy
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              ["Leads", "128", "+32%"],
              ["Cotizadas", "64", "+28%"],
              ["Agendadas", "23", "+35%"],
            ].map(([label, value, delta]) => (
              <div key={label} className="rounded-[3px] border border-border bg-bg p-3">
                <p className="text-[9px] text-muted">{label}</p>
                <p className="mt-1 font-[family-name:var(--font-syne)] text-[1.05rem] font-bold text-text">
                  {value}
                </p>
                <p className="mt-1 text-[10px] text-teal">{delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-[3px] border border-border">
            {QUOTES.map((quote, index) => (
              <div
                key={quote.id}
                className={`grid grid-cols-[0.85fr_1.4fr_1fr_0.85fr] gap-2 px-3 py-2 text-[10px] ${
                  index < QUOTES.length - 1 ? "border-b border-[rgba(255,255,255,0.05)]" : ""
                }`}
              >
                <span className="text-muted">{quote.id}</span>
                <span className="truncate text-text/75">{quote.client}</span>
                <span className="text-text/75">{quote.value}</span>
                <span className={quote.status === "Aceptada" ? "text-accent" : "text-teal"}>
                  {quote.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] text-muted">Facturación mes</p>
              <p className="font-[family-name:var(--font-syne)] text-[1.9rem] font-bold leading-none text-teal">
                $153.7M
              </p>
            </div>
            <div className="mt-3 flex h-14 items-end gap-1.5">
              {[22, 28, 32, 38, 35, 46, 42, 52, 50, 58, 66, 62, 72].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-[2px] bg-[rgba(78,205,196,0.55)]"
                  style={{ height: `${height}%` }}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border bg-surface2 px-5 py-4">
        <span className="font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.18em] text-muted">
          Conexiones activas
        </span>
        {["WhatsApp", "Sheets", "Calendar", "Gmail", "Siesa"].map((tool) => (
          <span key={tool} className="text-[11px] text-text/75">
            {tool}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-2 text-[11px] text-muted">
          <span className="h-5 w-5 rounded-[2px] border border-[rgba(78,205,196,0.3)] bg-[rgba(78,205,196,0.08)]" />
          Datos encriptados
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const rm = useReducedMotion();

  const fadeIn = (y = 0, delay = 0, duration = 0.55) => ({
    initial: rm ? { opacity: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: rm ? { duration: 0.15 } : { duration, delay, ease: EASE },
  });

  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-[72px]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none opacity-20 hidden lg:block">
          <HexMark3D />
        </div>
        <div
          className="absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(180,189,210,0.18) 0%, transparent 64%)" }}
        />
        <div
          className="absolute bottom-[8%] left-[-16rem] h-[32rem] w-[32rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(78,205,196,0.14) 0%, transparent 66%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container relative z-10 py-20 lg:py-24 xl:py-28">
        <div className="grid min-h-[calc(100dvh-9rem)] grid-cols-1 items-center gap-12 xl:grid-cols-[1fr_1.1fr] xl:gap-14">
          <div className="flex max-w-[640px] flex-col gap-7">
            <motion.div
              {...fadeIn(-12, 0, 0.55)}
              className="inline-flex w-fit items-center gap-2 rounded-[2px] border border-[rgba(78,205,196,0.22)] bg-[rgba(78,205,196,0.08)] px-3 py-2 font-[family-name:var(--font-syne)] text-[11px] font-semibold uppercase tracking-[0.14em] text-teal"
            >
              <PinIcon />
              Barranquilla, Colombia
            </motion.div>

            <motion.h1
              className="t-display text-[clamp(2.5rem,3.75vw,3.75rem)]"
              {...fadeIn(32, 0.1, 0.78)}
            >
              Transforma tus operaciones manuales{" "}
              <span className="text-accent">con IA.</span>
            </motion.h1>

            <motion.p
              className="max-w-[520px] font-[family-name:var(--font-dm)] text-[1.08rem] leading-relaxed text-text/75"
              {...fadeIn(20, 0.2, 0.68)}
            >
              Convertimos tus flujos operativos en una{" "}
              <strong className="font-semibold text-text/90">
                infraestructura autónoma que trabaja sola.
              </strong>{" "}
              Resultados reales, de forma ágil. Sin código de tu lado.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              {...fadeIn(16, 0.32, 0.6)}
            >
              <Button variant="primary" size="lg" href="/contacto">
                Agendar diagnóstico
              </Button>
              <Button variant="secondary" size="lg" href="/servicios">
                Ver servicios
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3"
              {...fadeIn(12, 0.44, 0.55)}
            >
              {SIGNALS.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-[3px] border border-border bg-[rgba(255,255,255,0.025)] px-4 py-3"
                >
                  <p className="font-[family-name:var(--font-syne)] text-[12px] font-semibold text-text">
                    {signal.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted">
                    {signal.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.p
              className="max-w-[440px] border-t border-border pt-5 text-[13px] text-muted"
              {...fadeIn(0, 0.56, 0.55)}
            >
              Somos de Barranquilla. Entendemos tu negocio, tu mercado y tu gente.
            </motion.p>
          </div>

          <motion.div
            {...fadeIn(28, 0.22, 0.65)}
            className="min-w-0"
          >
            <OperationalProof />
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }}
      />
    </section>
  );
}
