/* ─── Navigation ─────────────────────────────────────────────────── */
export type PageId = "home" | "servicios" | "nosotros" | "contacto";

export interface NavLink {
  id: PageId;
  label: string;
  href: string;
}

/* ─── Services / Catalog ─────────────────────────────────────────── */
export type ServiceCategory =
  | "atencion"
  | "finanzas"
  | "ventas"
  | "ops";

export interface PriceRow {
  label: string;
  value: string;
}

export interface ServiceDetail {
  title: string;
  lead: string;
  features: string[];
  pricing: PriceRow[];
  waMessage: string;
}

export interface CatalogItem {
  id: string;
  category: ServiceCategory;
  categoryLabel: string;
  title: string;
  description: string;
  tags: string[];
  priceFrom: string;
  detail: ServiceDetail;
}

export interface PackagePlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSub: string;
  features: string[];
  featured?: boolean;
  ctaLabel: string;
}

export interface PricingCard {
  id: string;
  name: string;
  description: string;
  setupPrice: number;
  monthlyPrice: number;
  popular?: boolean;
  isDesde?: boolean;
  ctaLabel: string;
  features: string[];
  waMessage: string;
}

/* ─── Homepage ───────────────────────────────────────────────────── */
import type { ReactNode } from "react";

export interface Stat {
  value: string;
  label: string;
}

export interface ServiceTeaser {
  icon: ReactNode;
  title: string;
  description: string;
  category?: string;
}

export interface Industry {
  icon: ReactNode;
  name: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

/* ─── About ──────────────────────────────────────────────────────── */
export interface WhyItem {
  number: string;
  title: string;
  description: string;
}

export interface Value {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface StackItem {
  name: string;
  role: string;
  category: string;
}

/* ─── ScrollCard ─────────────────────────────────────────────────── */
export interface ScrollSlide {
  id: number;
  tag: string;
  tagColor: string;
  headline: string;
  body: string;
  metric: string;
  metricSub: string;
  bg: string;
  border: string;
  icon: ReactNode;
}

/* ─── Testimonials ───────────────────────────────────────────────── */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  sector: string;
  metric?: string;
}

/* ─── Contact form ───────────────────────────────────────────────── */
export interface ContactFormData {
  nombre: string;
  empresa: string;
  whatsapp: string;
  email: string;
  sector: string;
  interes: string;
  proceso: string;
}

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
