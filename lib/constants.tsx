import type {
  NavLink,
  Stat,
  ServiceTeaser,
  Industry,
  ProcessStep,
  CatalogItem,
  PackagePlan,
  PricingCard,
  WhyItem,
  Value,
  StackItem,
  ScrollSlide,
  Testimonial,
} from "@/types";

/* ─── Navigation ─────────────────────────────────────────────────── */
export const NAV_LINKS: NavLink[] = [
  { id: "home",      label: "Inicio",    href: "/"          },
  { id: "servicios", label: "Servicios", href: "/servicios" },
  { id: "nosotros",  label: "Nosotros",  href: "/nosotros"  },
  { id: "contacto",  label: "Contacto",  href: "/contacto"  },
];

export const WA_BASE = "https://wa.me/573000000000";

// TODO: actualizar con los handles reales antes de producción
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/axusia", icon: "linkedin" as const },
  { label: "Instagram", href: "https://instagram.com/axusia.co", icon: "instagram" as const },
] satisfies { label: string; href: string; icon: "linkedin" | "instagram" }[];

/* ─── Home — Stats ───────────────────────────────────────────────── */
export const STATS: Stat[] = [
  { value: "72h",  label: "Tiempo de implementación"       },
  { value: "30+",  label: "Horas ahorradas por semana"     },
  { value: "0",    label: "Conocimiento técnico requerido" },
  { value: "24/7", label: "Tu sistema operando solo"       },
];

/* ─── Home — Services Teaser ─────────────────────────────────────── */
export const SERVICES_TEASER: ServiceTeaser[] = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Agente WhatsApp con IA",
    description:
      "Tu número responde solo, agenda citas, filtra consultas y escala a un humano cuando es necesario. 24/7 sin personal extra.",
    category: "Atención al cliente",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Automatización Contable",
    description:
      "Facturas, gastos y reportes registrados automáticamente desde correo o WhatsApp. Cero entrada manual de datos.",
    category: "Finanzas",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Captura de Leads",
    description:
      "Cada interesado queda registrado y recibe seguimiento automático. Tu equipo solo habla con quien ya quiere comprar.",
    category: "Ventas",
  },
];

/* ─── Home — Industries ──────────────────────────────────────────── */
export const INDUSTRIES: Industry[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Salud y Bienestar",
    description: "Consultorios, clínicas, centros de estética, laboratorios",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Inmobiliario",
    description: "Inmobiliarias, constructoras, administraciones PH",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Restaurantes & Retail",
    description: "Cadenas, franquicias, tiendas, domicilios",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Educación",
    description: "Colegios, universidades, academias, formación técnica",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Servicios Profesionales",
    description: "Abogados, contadores, consultores, agencias",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Industria & Logística",
    description: "Ferreterías, distribuidoras, transporte",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Deporte & Bienestar",
    description: "Gimnasios, academias deportivas, spas",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
        <path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3l9-5zM3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Financiero & Seguros",
    description: "Asesores, cooperativas, microfinancieras",
  },
];

/* ─── Home — Process ─────────────────────────────────────────────── */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    description:
      "30 minutos conversando sobre tu proceso actual. Identificamos qué tareas repetitivas te consumen más tiempo y cuál automatizar primero.",
  },
  {
    number: "02",
    title: "Propuesta a la medida",
    description:
      "Te enviamos exactamente qué automatizamos, cómo funciona, en cuánto tiempo y a qué precio. Sin letra chiquita.",
  },
  {
    number: "03",
    title: "Implementación y pruebas",
    description:
      "Construimos el flujo, lo probamos con datos reales de tu negocio y ajustamos hasta que funcione perfecto.",
  },
  {
    number: "04",
    title: "Activación y soporte",
    description:
      "Lo encendemos, te explicamos cómo monitorearlo y quedamos disponibles. El sistema trabaja solo; nosotros garantizamos que siga así.",
  },
];

/* ─── Catalog ────────────────────────────────────────────────────── */
export const CATALOG: CatalogItem[] = [
  {
    id: "wa",
    category: "atencion",
    categoryLabel: "Atención al cliente",
    title: "Agente WhatsApp con IA",
    description:
      "Tu número responde solo, agenda citas y filtra consultas 24/7 sin personal extra.",
    tags: ["Clínicas", "Restaurantes", "Inmobiliarias", "Gimnasios"],
    priceFrom: "$180.000 COP/mes",
    detail: {
      title: "Agente WhatsApp con IA",
      lead: "Un agente conversacional instalado en tu número de WhatsApp Business, entrenado con la información de tu negocio. Entiende lenguaje natural, responde preguntas, agenda citas y filtra clientes automáticamente.",
      features: [
        "Respuestas inmediatas a preguntas frecuentes de tu negocio",
        "Agendamiento de citas integrado con tu calendario",
        "Captura y registro automático de datos del cliente",
        "Escala a asesor humano cuando el caso lo requiere",
        "Disponible 24/7 sin costo de personal adicional",
        "Reporte semanal de conversaciones y leads captados",
      ],
      pricing: [
        { label: "Configuración e instalación",  value: "$350.000"  },
        { label: "Mensualidad (mantenimiento)",   value: "$180.000"  },
        { label: "Entrenamiento adicional",        value: "$120.000"  },
        { label: "Tiempo de implementación",       value: "72 horas"  },
      ],
      waMessage: "Hola, me interesa el Agente WhatsApp con IA de AXUSIA",
    },
  },
  {
    id: "cont",
    category: "finanzas",
    categoryLabel: "Finanzas",
    title: "Automatización Contable",
    description:
      "Facturas, gastos y reportes registrados automáticamente. Cero entrada manual de datos.",
    tags: ["PYMEs", "Contadores", "Distribuidoras"],
    priceFrom: "$350.000 COP",
    detail: {
      title: "Automatización Contable",
      lead: "Convierte el proceso manual de registrar facturas y gastos en un flujo 100% automático. Desde la llegada del correo o foto del recibo hasta el registro en tu hoja de cálculo o sistema contable.",
      features: [
        "Extracción automática de datos de facturas (proveedor, valor, fecha, IVA)",
        "Clasificación inteligente de gastos por categoría",
        "Registro automático en Google Sheets o tu sistema contable",
        "Alerta de pagos próximos a vencer por WhatsApp o correo",
        "Reporte mensual de flujo de caja generado automáticamente",
        "Reconciliación de pagos bancarios con registros internos",
      ],
      pricing: [
        { label: "Configuración del flujo completo",  value: "$650.000"   },
        { label: "Mensualidad (mantenimiento)",        value: "$200.000"   },
        { label: "Integración con sistema contable",   value: "$350.000"   },
        { label: "Tiempo de implementación",           value: "5–7 días"   },
      ],
      waMessage: "Hola, me interesa la Automatización Contable de AXUSIA",
    },
  },
  {
    id: "inv",
    category: "ops",
    categoryLabel: "Operaciones",
    title: "Control de Inventario",
    description:
      "Alertas automáticas de stock bajo y reportes de movimiento sin intervención manual.",
    tags: ["Ferreterías", "Farmacias", "Tiendas"],
    priceFrom: "$420.000 COP",
    detail: {
      title: "Control de Inventario",
      lead: "Alertas y reportes automáticos para que nunca te quedes sin stock ni pierdas tiempo contando manualmente. Conectado a tu hoja de cálculo o sistema de ventas actual.",
      features: [
        "Alerta automática por WhatsApp cuando un producto baja del mínimo",
        "Reporte diario o semanal de movimiento de inventario",
        "Registro de entradas y salidas desde formulario o WhatsApp",
        "Identificación automática de productos más y menos vendidos",
        "Sincronización entre múltiples puntos de venta o bodegas",
        "Generación automática de órdenes de compra al proveedor",
      ],
      pricing: [
        { label: "Configuración del sistema",         value: "$750.000"   },
        { label: "Mensualidad (mantenimiento)",        value: "$220.000"   },
        { label: "Por punto de venta adicional",       value: "$150.000"   },
        { label: "Tiempo de implementación",           value: "5–7 días"   },
      ],
      waMessage: "Hola, me interesa el Control de Inventario de AXUSIA",
    },
  },
  {
    id: "leads",
    category: "ventas",
    categoryLabel: "Ventas",
    title: "Captura y Seguimiento de Leads",
    description:
      "Cada interesado queda registrado y con seguimiento automático hasta que está listo para comprar.",
    tags: ["Inmobiliarias", "Seguros", "Educación"],
    priceFrom: "$280.000 COP",
    detail: {
      title: "Captura y Seguimiento de Leads",
      lead: "Automatiza todo el proceso desde que alguien muestra interés hasta que se convierte en cliente. Tu equipo de ventas recibe solo los prospectos calificados y listos para cerrar.",
      features: [
        "Captura automática desde Instagram, Facebook, web y WhatsApp",
        "Calificación inteligente de cada prospecto con IA",
        "Secuencia automática de seguimiento por WhatsApp o correo",
        "Registro en CRM o hoja de cálculo sin intervención manual",
        "Alerta al asesor cuando el lead está listo para cerrar",
        "Reporte semanal de conversión por canal y campaña",
      ],
      pricing: [
        { label: "Configuración del flujo",            value: "$550.000"   },
        { label: "Mensualidad (mantenimiento)",         value: "$180.000"   },
        { label: "Canal adicional (Instagram, etc.)",  value: "$200.000"   },
        { label: "Tiempo de implementación",            value: "3–5 días"   },
      ],
      waMessage: "Hola, me interesa la Captura de Leads de AXUSIA",
    },
  },
  {
    id: "agenda",
    category: "atencion",
    categoryLabel: "Atención",
    title: "Agendamiento Automático",
    description:
      "Citas agendadas directamente por el cliente. Recordatorios y confirmaciones automáticos.",
    tags: ["Consultorios", "Salones", "Coaches"],
    priceFrom: "$200.000 COP",
    detail: {
      title: "Agendamiento Automático",
      lead: "El cliente agenda directamente desde WhatsApp, tu web o Instagram. El sistema verifica disponibilidad, confirma, envía recordatorios y maneja re-agendamientos sin que tú intervengas.",
      features: [
        "Agendamiento por WhatsApp con lenguaje natural",
        "Verificación de disponibilidad en tiempo real",
        "Confirmación y recordatorio automático 24h antes",
        "Manejo de cancelaciones y re-agendamientos",
        "Sincronización con Google Calendar",
        "Reporte mensual de citas atendidas y canceladas",
      ],
      pricing: [
        { label: "Configuración del flujo",    value: "$420.000"      },
        { label: "Mensualidad (mantenimiento)", value: "$150.000"      },
        { label: "Integración con pagos",       value: "$250.000"      },
        { label: "Tiempo de implementación",    value: "48–72 horas"   },
      ],
      waMessage: "Hola, me interesa el Agendamiento Automático de AXUSIA",
    },
  },
  {
    id: "docs",
    category: "ops",
    categoryLabel: "Administración",
    title: "Gestión Documental con IA",
    description:
      "Contratos, cotizaciones y reportes generados automáticamente. Aprobaciones por WhatsApp.",
    tags: ["Constructoras", "Universidades", "Jurídicas"],
    priceFrom: "$480.000 COP",
    detail: {
      title: "Gestión Documental con IA",
      lead: "Contratos, cotizaciones y actas generados automáticamente desde una solicitud por WhatsApp o formulario. Archivados, enviados y aprobados sin tocar un papel.",
      features: [
        "Generación automática desde plantillas personalizadas",
        "Envío automático al cliente y al equipo interno",
        "Aprobación y firma digital por WhatsApp",
        "Archivo automático en Google Drive con nombre y fecha correcta",
        "Alerta de documentos próximos a vencer",
        "Registro de versiones con trazabilidad completa",
      ],
      pricing: [
        { label: "Configuración base (1 tipo doc.)",      value: "$850.000"   },
        { label: "Mensualidad (mantenimiento)",            value: "$250.000"   },
        { label: "Por tipo de documento adicional",        value: "$300.000"   },
        { label: "Tiempo de implementación",               value: "7–10 días"  },
      ],
      waMessage: "Hola, me interesa la Gestión Documental de AXUSIA",
    },
  },
];

/* ─── Packages ───────────────────────────────────────────────────── */
export const PACKAGES: PackagePlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Para negocios que quieren empezar",
    price: "$350K",
    priceSub: "pago único + $150K/mes mantenimiento",
    features: [
      "1 automatización sencilla a elegir",
      "Integración con WhatsApp o correo",
      "1 reporte automático mensual",
      "Soporte por WhatsApp 5×8",
      "Implementación en 72 horas",
    ],
    ctaLabel: "Comenzar",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Para negocios con procesos complejos",
    price: "$950K",
    priceSub: "pago único + $250K/mes mantenimiento",
    features: [
      "Hasta 3 automatizaciones integradas",
      "Agente WhatsApp con IA incluido",
      "Dashboard de monitoreo básico",
      "Reportes automáticos semanales",
      "Soporte prioritario 7×12",
      "Implementación en 7 días",
    ],
    featured: true,
    ctaLabel: "Comenzar",
  },
  {
    id: "full",
    name: "Full",
    tagline: "Para empresas que quieren escalar",
    price: "Desde $2.5M",
    priceSub: "pago único + mantenimiento personalizado",
    features: [
      "Sistema completo multi-proceso",
      "Panel de administración propio",
      "Base de datos PostgreSQL dedicada",
      "Integraciones con ERP o CRM existente",
      "Soporte 7×24 con SLA garantizado",
      "Implementación planificada a medida",
    ],
    ctaLabel: "Hablar con nosotros",
  },
];

/* ─── Pricing Cards ──────────────────────────────────────────────── */
export const PRICING_CARDS: PricingCard[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Para negocios que quieren empezar. Una automatización lista en 72 horas.",
    setupPrice: 350_000,
    monthlyPrice: 150_000,
    popular: false,
    ctaLabel: "Comenzar",
    features: [
      "1 automatización sencilla a elegir",
      "Integración con WhatsApp o correo",
      "1 reporte automático mensual",
      "Soporte por WhatsApp 5×8",
      "Implementación en 72 horas",
    ],
    waMessage: "Hola, me interesa el paquete Starter de AXUSIA",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para negocios con procesos complejos que necesitan múltiples automatizaciones.",
    setupPrice: 950_000,
    monthlyPrice: 250_000,
    popular: true,
    ctaLabel: "Comenzar",
    features: [
      "Hasta 3 automatizaciones integradas",
      "Agente WhatsApp con IA incluido",
      "Dashboard de monitoreo básico",
      "Reportes automáticos semanales",
      "Soporte prioritario 7×12",
      "Implementación en 7 días",
    ],
    waMessage: "Hola, me interesa el paquete Pro de AXUSIA",
  },
  {
    id: "full",
    name: "Full",
    description: "Para empresas que quieren escalar. Sistema completo multi-proceso a medida.",
    setupPrice: 2_500_000,
    monthlyPrice: 400_000,
    popular: false,
    isDesde: true,
    ctaLabel: "Hablar con nosotros",
    features: [
      "Sistema completo multi-proceso",
      "Panel de administración propio",
      "Base de datos dedicada",
      "Integraciones con ERP o CRM existente",
      "Soporte 7×24 con SLA garantizado",
      "Implementación planificada a medida",
    ],
    waMessage: "Hola, me interesa el paquete Full de AXUSIA",
  },
];

/* ─── About — Why ────────────────────────────────────────────────── */
export const WHY_ITEMS: WhyItem[] = [
  {
    number: "01",
    title: "Entendemos tu negocio primero",
    description:
      "Antes de escribir una sola línea de flujo, nos sentamos a entender exactamente cómo funciona tu proceso y qué resultado necesitas. No suponemos. Preguntamos.",
  },
  {
    number: "02",
    title: "Precios en COP, para PYMEs",
    description:
      "Todas las agencias de automatización en Colombia apuntan a empresas medianas con presupuestos altos. Nosotros construimos para el negocio que tiene 2 empleados y factura por WhatsApp.",
  },
  {
    number: "03",
    title: "Sin código en tu lado",
    description:
      "Tú no tocas nada técnico. Nos das acceso a lo que necesitamos, validamos contigo que todo funcione, y desde ahí el sistema corre solo. Tu rol es supervisar, no operar.",
  },
  {
    number: "04",
    title: "Soporte real, no tickets",
    description:
      "Cuando algo no funciona, nos escribes por WhatsApp y respondemos. No hay sistema de tickets, no hay tiempos de espera de 48 horas. Somos una empresa pequeña que trata a sus clientes como personas.",
  },
];

/* ─── About — Values ─────────────────────────────────────────────── */
export const VALUES: Value[] = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Resultados sobre tecnología",
    description:
      "El cliente no compra n8n ni Claude API. Compra horas recuperadas y procesos que no fallan. La tecnología es interna; el resultado es lo que importa.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Transparencia total",
    description:
      "Precios claros, plazos reales y comunicación directa. Si algo no es posible, lo decimos antes de cobrar, no después de entregar.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Velocidad sin sacrificar calidad",
    description:
      "72 horas no es marketing. Es el tiempo que nos tomamos en serio para entregar algo que funcione bien desde el primer día.",
  },
];

/* ─── About — Stack ──────────────────────────────────────────────── */
export const STACK_ITEMS: StackItem[] = [
  { name: "n8n",               role: "Motor de automatización",  category: "Motor"         },
  { name: "Claude AI",         role: "Inteligencia artificial",  category: "IA"            },
  { name: "WhatsApp Business", role: "Canal de comunicación",    category: "Comunicación"  },
  { name: "Gmail",             role: "Automatización de correo", category: "Comunicación"  },
  { name: "Google Workspace",  role: "Productividad y docs",     category: "Productividad" },
  { name: "Google Drive",      role: "Almacenamiento y archivos",category: "Productividad" },
  { name: "PostgreSQL",        role: "Base de datos",            category: "Datos"         },
  { name: "FastAPI / Python",  role: "Backend y APIs",           category: "Datos"         },
];

/* ─── ScrollCard Slides ──────────────────────────────────────────── */
export const SCROLL_SLIDES: ScrollSlide[] = [
  {
    id: 0,
    tag: "El problema",
    tagColor: "#B4BDD2",
    headline: "Tu equipo atascado en tareas que no escalan",
    body: "Cotizaciones manuales, seguimiento de pedidos, facturas a mano. Horas valiosas consumidas en trabajo repetitivo que nunca termina.",
    metric: "30h",
    metricSub: "semanales perdidas en tareas manuales",
    bg: "rgba(180,189,210,0.05)",
    border: "rgba(180,189,210,0.15)",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="#B4BDD2" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="#B4BDD2" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="#B4BDD2" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 1,
    tag: "La solución",
    tagColor: "#4ECDC4",
    headline: "IA que trabaja 24/7 mientras tú descansas",
    body: "Agentes inteligentes que responden clientes, registran datos y ejecutan flujos completos. Sin código. Sin personal extra. Sin interrupciones.",
    metric: "24/7",
    metricSub: "operando sin intervención humana",
    bg: "rgba(78,205,196,0.05)",
    border: "rgba(78,205,196,0.15)",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="8" width="18" height="13" rx="2" stroke="#4ECDC4" strokeWidth="1.5" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="14" r="2" stroke="#4ECDC4" strokeWidth="1.5" />
        <path d="M12 16v2" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    tag: "La implementación",
    tagColor: "#B4BDD2",
    headline: "De diagnóstico a producción en 72 horas",
    body: "Llamada gratuita, análisis de tu proceso, diseño del flujo y puesta en marcha. Sin meses de espera ni contratos interminables.",
    metric: "72h",
    metricSub: "de diagnóstico gratis a sistema activo",
    bg: "rgba(180,189,210,0.05)",
    border: "rgba(180,189,210,0.15)",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#B4BDD2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 3,
    tag: "Los resultados",
    tagColor: "#4ECDC4",
    headline: "ROI medible desde la primera semana",
    body: "Nuestros clientes recuperan la inversión en menos de 4 semanas. Métricas claras, soporte continuo y escala cuando tú lo decides.",
    metric: "30+",
    metricSub: "horas ahorradas por semana en promedio",
    bg: "rgba(78,205,196,0.05)",
    border: "rgba(78,205,196,0.15)",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 20h18" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
];

/* ─── Testimonials ───────────────────────────────────────────────── */
// TODO: reemplazar con testimonios reales de clientes antes de producción
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Antes pasaba 3 horas diarias respondiendo el mismo tipo de preguntas por WhatsApp. Ahora el bot lo hace solo y yo me dedico a cerrar los casos que realmente necesitan mi atención.",
    author: "Camila Restrepo",
    role: "Gerente General",
    company: "Centro Médico del Norte",
    sector: "Salud",
    metric: "3h diarias recuperadas",
  },
  {
    quote:
      "Implementaron el sistema de agendamiento en 2 días. Mis clientes agendan solos desde WhatsApp y no he vuelto a perder una cita por falta de confirmación.",
    author: "Andrés Morales",
    role: "Propietario",
    company: "Estudio Fit Barranquilla",
    sector: "Deporte",
    metric: "0 citas perdidas por no-show",
  },
  {
    quote:
      "El proceso contable que hacíamos manual tardaba 2 días al mes. Ahora se genera automáticamente cada semana. El ROI fue inmediato desde el primer mes.",
    author: "Diana Torres",
    role: "Directora Financiera",
    company: "Distribuidora LogiCol",
    sector: "Logística",
    metric: "ROI en menos de 30 días",
  },
];

/* ─── Contact — Sectors / Interests ─────────────────────────────── */
export const SECTORS = [
  "Salud y Bienestar",
  "Inmobiliario",
  "Restaurantes y Retail",
  "Educación",
  "Servicios Profesionales",
  "Industria y Logística",
  "Deporte y Entretenimiento",
  "Financiero y Seguros",
  "Otro",
] as const;

export const INTERESTS = [
  "Agente WhatsApp con IA",
  "Automatización Contable",
  "Control de Inventario",
  "Captura y Seguimiento de Leads",
  "Agendamiento Automático",
  "Gestión Documental",
  "No lo tengo claro todavía",
] as const;
