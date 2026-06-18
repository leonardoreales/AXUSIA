"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, Cpu, Calendar, FileText, CheckCircle,
  Globe, Search, Users, TrendingUp,
  ShoppingCart, Package, CreditCard, Zap,
  BookOpen, Shield, Bell, Truck, Database, Star, Dumbbell, ClipboardList,
} from 'lucide-react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/utils'

// ── Canvas constants ───────────────────────────────────────────────────────
const CW = 620  // canvas width  (px)
const CH = 220  // canvas height (px)
const NW = 128  // node width
const NH = 52   // node height

const ncx = (x: number) => x + NW / 2
const ncy = (y: number) => y + NH / 2

const bezierPath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = Math.abs(x2 - x1) * 0.5
  return `M ${x1} ${y1} C ${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`
}

const toSafeId = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '_')

// ── Types ──────────────────────────────────────────────────────────────────
type NodeKind = 'trigger' | 'process' | 'output'
type LIcon = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>

interface NodeDef {
  id: string
  label: string
  sublabel: string
  kind: NodeKind
  Icon: LIcon
  x: number
  y: number
}

interface FlowDef {
  nodes: NodeDef[]
  edges: [string, string][]
  description: string
}

// ── Flow data — one per sector ─────────────────────────────────────────────
const FLOWS: Record<string, FlowDef> = {
  "Salud y Bienestar": {
    description: "El paciente escribe, el agente clasifica, agenda y actualiza el historial — sin intervención humana.",
    nodes: [
      { id: 'a', label: 'WhatsApp',       sublabel: 'Paciente escribe',   kind: 'trigger',  Icon: MessageSquare, x: 10,  y: 84 },
      { id: 'b', label: 'Agente IA',      sublabel: 'Clasifica solicitud',kind: 'process',  Icon: Cpu,           x: 170, y: 84 },
      { id: 'c', label: 'Agenda',         sublabel: 'Verifica horarios',  kind: 'process',  Icon: Calendar,      x: 340, y: 24 },
      { id: 'd', label: 'Historial',      sublabel: 'Actualiza registro', kind: 'process',  Icon: FileText,      x: 340, y: 148 },
      { id: 'e', label: 'Cita Confirmada',sublabel: 'WhatsApp + Email',   kind: 'output',   Icon: CheckCircle,   x: 490, y: 84 },
    ],
    edges: [['a','b'],['b','c'],['b','d'],['c','e'],['d','e']],
  },
  "Inmobiliario": {
    description: "Cada lead web o WA es calificado por IA, registrado en el CRM y la visita queda agendada automáticamente.",
    nodes: [
      { id: 'a', label: 'Lead Web',        sublabel: 'Formulario / WA',    kind: 'trigger', Icon: Globe,       x: 10,  y: 84 },
      { id: 'b', label: 'Calificación IA', sublabel: 'Perfil e interés',   kind: 'process', Icon: Search,      x: 170, y: 84 },
      { id: 'c', label: 'CRM',             sublabel: 'Registra contacto',  kind: 'process', Icon: Users,       x: 330, y: 84 },
      { id: 'd', label: 'Visita Agendada', sublabel: 'Confirmación auto.', kind: 'output',  Icon: TrendingUp,  x: 490, y: 84 },
    ],
    edges: [['a','b'],['b','c'],['c','d']],
  },
  "Restaurantes & Retail": {
    description: "El pedido entra, cocina e inventario se notifican en paralelo, el cobro se procesa y el cliente recibe confirmación.",
    nodes: [
      { id: 'a', label: 'Pedido',      sublabel: 'WA / web / app',    kind: 'trigger', Icon: ShoppingCart, x: 10,  y: 84 },
      { id: 'b', label: 'Validación',  sublabel: 'Disponibilidad',    kind: 'process', Icon: Zap,          x: 170, y: 84 },
      { id: 'c', label: 'Cocina',      sublabel: 'Orden notificada',  kind: 'process', Icon: Bell,         x: 340, y: 24 },
      { id: 'd', label: 'Inventario',  sublabel: 'Stock descontado',  kind: 'process', Icon: Package,      x: 340, y: 148 },
      { id: 'e', label: 'Pedido Listo',sublabel: 'Cliente notificado',kind: 'output',  Icon: CheckCircle,  x: 490, y: 84 },
    ],
    edges: [['a','b'],['b','c'],['b','d'],['c','e'],['d','e']],
  },
  "Educación": {
    description: "El estudiante se inscribe, el sistema verifica, procesa el pago y da acceso al campus — sin carga administrativa.",
    nodes: [
      { id: 'a', label: 'Inscripción', sublabel: 'Formulario web',   kind: 'trigger', Icon: BookOpen,    x: 10,  y: 84 },
      { id: 'b', label: 'Verificación',sublabel: 'Revisa documentos',kind: 'process', Icon: Shield,      x: 170, y: 84 },
      { id: 'c', label: 'Pago',        sublabel: 'Link automático',  kind: 'process', Icon: CreditCard,  x: 330, y: 84 },
      { id: 'd', label: 'Acceso',      sublabel: 'Campus + bienvenida',kind:'output', Icon: CheckCircle, x: 490, y: 84 },
    ],
    edges: [['a','b'],['b','c'],['c','d']],
  },
  "Servicios Profesionales": {
    description: "La consulta se registra, el caso se asigna y los documentos se solicitan en paralelo — la factura llega sola al cerrar.",
    nodes: [
      { id: 'a', label: 'Consulta',    sublabel: 'WhatsApp / web',     kind: 'trigger', Icon: MessageSquare, x: 10,  y: 84 },
      { id: 'b', label: 'Caso Creado', sublabel: 'Registra detalles',  kind: 'process', Icon: ClipboardList, x: 170, y: 84 },
      { id: 'c', label: 'Asignación',  sublabel: 'Profesional asignado',kind:'process', Icon: Users,         x: 340, y: 24 },
      { id: 'd', label: 'Documentos',  sublabel: 'Solicitud automática',kind:'process', Icon: FileText,      x: 340, y: 148 },
      { id: 'e', label: 'Facturación', sublabel: 'Cobro automático',   kind: 'output',  Icon: CreditCard,    x: 490, y: 84 },
    ],
    edges: [['a','b'],['b','c'],['b','d'],['c','e'],['d','e']],
  },
  "Industria & Logística": {
    description: "La orden entra, el inventario se verifica, la guía se genera y el cliente recibe tracking en tiempo real.",
    nodes: [
      { id: 'a', label: 'Nueva Orden', sublabel: 'ERP / manual',    kind: 'trigger', Icon: Zap,         x: 10,  y: 84 },
      { id: 'b', label: 'Inventario',  sublabel: 'Verifica stock',  kind: 'process', Icon: Package,     x: 170, y: 84 },
      { id: 'c', label: 'Despacho',    sublabel: 'Guía generada',   kind: 'process', Icon: Truck,       x: 330, y: 84 },
      { id: 'd', label: 'Entregado',   sublabel: 'Firma + tracking',kind: 'output',  Icon: CheckCircle, x: 490, y: 84 },
    ],
    edges: [['a','b'],['b','c'],['c','d']],
  },
  "Deporte & Bienestar": {
    description: "El cliente reserva, el sistema confirma su cupo, envía recordatorio 24h antes y fideliza con encuesta post-clase.",
    nodes: [
      { id: 'a', label: 'Reserva',       sublabel: 'App / WA',          kind: 'trigger', Icon: Dumbbell,    x: 10,  y: 84 },
      { id: 'b', label: 'Disponibilidad',sublabel: 'Verifica cupos',     kind: 'process', Icon: Calendar,    x: 170, y: 84 },
      { id: 'c', label: 'Confirmación',  sublabel: 'Cupo asegurado',     kind: 'process', Icon: CheckCircle, x: 340, y: 24 },
      { id: 'd', label: 'Recordatorio',  sublabel: '24h antes auto.',    kind: 'process', Icon: Bell,        x: 340, y: 148 },
      { id: 'e', label: 'Fidelización',  sublabel: 'Post-clase encuesta',kind: 'output',  Icon: Star,        x: 490, y: 84 },
    ],
    edges: [['a','b'],['b','c'],['b','d'],['c','e'],['d','e']],
  },
  "Financiero & Seguros": {
    description: "La solicitud activa el KYC automático, el análisis de riesgo con IA y la aprobación llega al cliente en minutos.",
    nodes: [
      { id: 'a', label: 'Solicitud',  sublabel: 'Formulario digital', kind: 'trigger', Icon: FileText,    x: 10,  y: 84 },
      { id: 'b', label: 'KYC',        sublabel: 'Verifica identidad', kind: 'process', Icon: Shield,      x: 170, y: 84 },
      { id: 'c', label: 'Análisis IA',sublabel: 'Evalúa perfil',      kind: 'process', Icon: Database,    x: 330, y: 84 },
      { id: 'd', label: 'Aprobación', sublabel: 'Decisión + notif.',  kind: 'output',  Icon: CheckCircle, x: 490, y: 84 },
    ],
    edges: [['a','b'],['b','c'],['c','d']],
  },
}

const SECTOR_ORDER = Object.keys(FLOWS)

// ── Node card ──────────────────────────────────────────────────────────────
function NodeCard({ node }: { node: NodeDef }) {
  const { Icon, label, sublabel, kind, x, y } = node
  return (
    <div
      className={cn(
        "absolute flex flex-col justify-center gap-[5px] px-3 border",
        kind === 'trigger' && "border-accent/55 bg-surface2",
        kind === 'process' && "border-border   bg-surface",
        kind === 'output'  && "border-teal/40  bg-surface2",
      )}
      style={{
        left: x, top: y, width: NW, height: NH,
        clipPath: "polygon(10px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 10px)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <Icon
          size={12}
          strokeWidth={1.5}
          className={cn(
            "shrink-0",
            kind === 'trigger' && "text-accent",
            kind === 'process' && "text-muted",
            kind === 'output'  && "text-teal",
          )}
        />
        <span className={cn(
          "font-[family-name:var(--font-syne)] font-semibold text-[11px] leading-tight truncate",
          kind === 'trigger' && "text-accent",
          kind === 'process' && "text-text/90",
          kind === 'output'  && "text-teal",
        )}>
          {label}
        </span>
      </div>
      <span className="text-[10px] font-[family-name:var(--font-dm)] text-muted/65 leading-tight truncate">
        {sublabel}
      </span>
    </div>
  )
}

// ── Flow canvas ────────────────────────────────────────────────────────────
function FlowCanvas({ flow, flowKey }: { flow: FlowDef; flowKey: string }) {
  const { nodes, edges } = flow
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))
  const sk = toSafeId(flowKey)

  return (
    <div className="relative" style={{ width: CW, height: CH }}>
      {/* SVG: edges + animated packets */}
      <svg width={CW} height={CH} className="absolute inset-0 pointer-events-none">
        {edges.map(([fId, tId], i) => {
          const from = nodeMap[fId]
          const to   = nodeMap[tId]
          if (!from || !to) return null

          const x1 = ncx(from.x), y1 = ncy(from.y)
          const x2 = ncx(to.x),   y2 = ncy(to.y)
          const d  = bezierPath(x1, y1, x2, y2)
          const pid = `p_${sk}_${fId}_${tId}`

          return (
            <g key={pid}>
              {/* Base line */}
              <path id={pid} d={d} fill="none"
                stroke="rgba(255,255,255,0.05)" strokeWidth={1.5} />

              {/* Animated dashes */}
              <motion.path
                d={d} fill="none"
                stroke="rgba(180,189,210,0.20)"
                strokeWidth={1.5}
                strokeDasharray="5 9"
                animate={{ strokeDashoffset: [0, -14] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.18 }}
              />

              {/* Data packet — travels along path */}
              <circle r={3.5} fill="rgba(180,189,210,0.82)">
                <animateMotion
                  dur={`${2.1 + i * 0.32}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.52}s`}
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.42 0 0.58 1"
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore – mpath href is valid SVG2 */}
                  <mpath href={`#${pid}`} />
                </animateMotion>
              </circle>
            </g>
          )
        })}
      </svg>

      {/* Node cards (positioned above SVG) */}
      {nodes.map(node => <NodeCard key={node.id} node={node} />)}
    </div>
  )
}

// ── Main section ───────────────────────────────────────────────────────────
export function Industries() {
  const [active, setActive] = useState(SECTOR_ORDER[0])
  const flow = FLOWS[active]

  return (
    <section className="relative py-28 lg:py-40 bg-bg overflow-hidden">
      {/* Top border fade */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

      {/* Dot grid background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(180,189,210,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 50%, black 0%, transparent 100%)',
        }} />

      <div className="container relative">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 mb-16 lg:mb-20 max-w-[520px]">
          <Eyebrow>Sectores</Eyebrow>
          <h2 className="t-head text-[clamp(1.75rem,4vw,2.75rem)]">
            Trabajamos con tu industria
          </h2>
          <p className="text-[15px] text-muted font-[family-name:var(--font-dm)] leading-relaxed">
            Cada sector tiene sus procesos únicos. Nuestras soluciones se adaptan
            a cómo ya trabajas tú.
          </p>
        </div>

        {/* ── Body: selector + canvas ────────────────────────────────── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-10 items-start">

          {/* Sector selector */}
          <nav aria-label="Seleccionar sector"
            className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible
                       gap-0.5 pb-1 lg:pb-0 w-full lg:w-auto shrink-0">
            {SECTOR_ORDER.map((name, i) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={cn(
                  'relative flex items-center gap-2.5 shrink-0',
                  'pl-3 pr-4 py-3 rounded-[2px] text-left',
                  'transition-all duration-200',
                  active === name
                    ? 'bg-surface border-l-2 border-accent'
                    : 'border-l-2 border-transparent hover:bg-surface/50 hover:border-accent/25',
                )}
              >
                <span className={cn(
                  'text-[10px] font-[family-name:var(--font-syne)] font-semibold tracking-widest tabular-nums shrink-0',
                  active === name ? 'text-accent' : 'text-muted/45',
                )}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={cn(
                  'text-[13px] font-[family-name:var(--font-syne)] font-semibold whitespace-nowrap',
                  active === name ? 'text-text' : 'text-muted',
                )}>
                  {name}
                </span>
                {active === name && (
                  <motion.span
                    layoutId="sector-dot"
                    className="absolute right-3 w-1 h-1 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Flow canvas panel */}
          <div className="relative w-full overflow-hidden rounded-[2px] bg-surface border border-border">
            {/* Inner canvas dot grid */}
            <div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.032) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />

            <div className="relative p-5 lg:p-7">
              {/* Status bar */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                  <span className="text-[10px] font-[family-name:var(--font-syne)] font-semibold
                                   text-teal/75 tracking-widest uppercase">
                    Flujo Activo
                  </span>
                </div>
                <span className="text-[10px] text-muted/45 font-[family-name:var(--font-dm)]">
                  {flow.nodes.length} pasos · {flow.edges.length} conexiones
                </span>
              </div>

              {/* Animated canvas */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="overflow-x-auto">
                    <FlowCanvas flow={flow} flowKey={active} />
                  </div>

                  {/* Flow description */}
                  <p className="mt-5 pt-4 border-t border-border
                                text-[13px] font-[family-name:var(--font-dm)]
                                text-muted/75 leading-relaxed">
                    {flow.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
