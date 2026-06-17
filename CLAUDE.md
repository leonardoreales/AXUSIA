# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Session Start — Leer Memoria Nuclear PRIMERO

**Al inicio de cada sesión, antes de cualquier tarea, leer:**

```
C:\Users\Leonardo Reales\.claude\projects\c--Users-Leonardo-Reales-Desktop-AXUS-IA-AXUS-IA\memory\AXUSIA-CORE.md
```

Este archivo es la única fuente de verdad sobre AXUSIA: quién es Leo, modelo de negocio, estado actual del sitio, tareas pendientes, reglas de colaboración, arquitectura completa y hoja de ruta. Cuando Leo diga "actualiza la memoria", editar exclusivamente ese archivo.

Si además se necesita contexto de dependencias del grafo, leer también:
```
C:\Users\Leonardo Reales\Desktop\AXUS IA\graphify-out\GRAPH_REPORT.md
```

## Project

**AXUSIA** — Sitio web de producción para agencia de automatización IA en Barranquilla, Colombia.
Stack: **Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · React Hook Form · Zod · Resend**

## Commands

```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Production build (TypeScript + lint)
npm run start    # Run production build locally
npm run lint     # ESLint
```

## Environment

Copy `.env.example` → `.env.local` and fill:
- `RESEND_API_KEY` — from resend.com (free tier works for contact form)
- `NEXT_PUBLIC_SITE_URL` — production URL (https://axusai.co)

## Architecture

### File Structure

```
app/
  layout.tsx              # Root layout: Syne + DM Sans fonts, base metadata, html lang="es"
  globals.css             # Design tokens (@theme inline), reset, utility classes
  page.tsx                # Home → renders <HomePage />
  servicios/page.tsx      # Servicios → renders <ServiciosPage />
  nosotros/page.tsx       # Nosotros → renders <NosotrosPage />
  contacto/page.tsx       # Contacto → renders <ContactoPage />
  api/
    contacto/route.ts     # POST handler → validates with Zod → sends email via Resend

components/
  ui/
    Button.tsx            # btn-primary | btn-secondary | btn-ghost variants
    Chip.tsx              # "Disponible en Barranquilla" status chip with blink dot
    Tag.tsx               # Small category tag
    Logo.tsx              # Hexagon SVG mark + wordmark (reused in Nav + Footer)
    Eyebrow.tsx           # t-label + accent line (section labels)
  layout/
    Nav.tsx               # Fixed nav, auto-hide on scroll, mobile menu, active link
    Footer.tsx            # Logo + links + copyright (repeated on each page)
    PageHeader.tsx        # Inner-page hero: eyebrow + h1 + subtitle
  sections/
    home/
      Hero.tsx            # Main hero: headline, sub, CTA buttons, animated hex mark
      StatsStrip.tsx      # 4-stat bar (72h / 30+ / 0 / 24/7)
      ServicesTeaser.tsx  # 3-card grid preview → links to /servicios
      Industries.tsx      # 8-sector grid
      Process.tsx         # 4-step numbered process
      CtaBanner.tsx       # Full-width CTA with radial glow
    servicios/
      FilterBar.tsx       # Category filter buttons (client component)
      CatalogGrid.tsx     # Grid of CatalogCard + DetailPanel (client, manages open state)
      CatalogCard.tsx     # Service card with expand toggle
      DetailPanel.tsx     # Expanded detail: features list + price box + CTA
      PackagesGrid.tsx    # Starter / Pro / Full pricing plans
    nosotros/
      MissionSplit.tsx    # Two-column mission / why-we-exist
      WhyGrid.tsx         # 4-item 2×2 differentiators grid
      ValuesGrid.tsx      # 3-value cards
      StackGrid.tsx       # 8-tech stack items grid
    contacto/
      ContactForm.tsx     # React Hook Form + Zod → POST /api/contacto (client)
      ContactInfo.tsx     # Channels: WA / email / location / hours + promise box

lib/
  constants.ts            # ALL site content: NAV_LINKS, STATS, CATALOG, PACKAGES, etc.
  email.ts                # Resend helper: sendContactEmail(data)

types/
  index.ts                # All TypeScript interfaces (CatalogItem, PackagePlan, etc.)
```

### Design System (Tailwind v4)

Tokens defined in `globals.css → @theme inline`. Use them as Tailwind utilities:

| Token | Value | Tailwind class |
|---|---|---|
| `--color-bg` | `#080B10` | `bg-bg` |
| `--color-surface` | `#0F1420` | `bg-surface` |
| `--color-surface2` | `#161C2E` | `bg-surface2` |
| `--color-accent` | `#E8943A` | `text-accent`, `bg-accent`, `border-accent` |
| `--color-text` | `#F0EEE8` | `text-text` |
| `--color-muted` | `#7A8398` | `text-muted` |
| `--color-border` | `rgba(255,255,255,.07)` | `border-border` |
| `--font-display` | Syne | `font-[family-name:var(--font-syne)]` |
| `--font-body` | DM Sans | `font-[family-name:var(--font-dm)]` |

**CSS helper classes** (not Tailwind, defined in globals.css):
- `.t-display` — Syne 800, -1.5px tracking, lh 1.0
- `.t-head` — Syne 700, -0.5px tracking, lh 1.1
- `.t-label` — Syne 600, 11px, 2px tracking, uppercase, accent color
- `.t-muted` — muted color
- `.container` — max-w 1280px, px-12 (px-6 on mobile)
- `.eyebrow` — flex row with accent underline after
- `.reveal` / `.reveal.in` — scroll-triggered fade-up (IntersectionObserver in Nav or a hook)

### Routing

**Real Next.js routes** (not SPA-style navigate()):
- `/` → Home
- `/servicios` → Services catalog
- `/nosotros` → About
- `/contacto` → Contact

Use `<Link href="...">` for navigation. Active state via `usePathname()` in Nav.

### Animations (Framer Motion)

- **Scroll reveal**: use `motion.div` with `whileInView` + `viewport={{ once: true }}` instead of the manual IntersectionObserver from the HTML prototype.
- **Hero hex**: `animate={{ y: [0, -14, 0] }}` loop for float effect.
- **Page transitions**: `AnimatePresence` in layout if needed (optional).

### Contact Form Flow

1. `ContactForm.tsx` (client) → validates with Zod schema → POST `/api/contacto`
2. `app/api/contacto/route.ts` → re-validates with same Zod schema → calls `sendContactEmail()` from `lib/email.ts`
3. On success → show success state (same as HTML prototype)
4. On error → show inline error message

### Content

All copy, prices, tags, and data live in `lib/constants.ts`. **Never hardcode content in components** — always import from constants.

### Key Constraints

- `globals.css` uses Tailwind v4 `@theme inline` syntax — NOT `tailwind.config.ts`. All new tokens go there.
- Font variables from `next/font/google` are `--font-syne` and `--font-dm` (set in `layout.tsx`). Use them with `font-[family-name:var(--font-syne)]` in Tailwind or `var(--font-display)` in CSS.
- The `CatalogGrid` / `FilterBar` must be `"use client"` because they manage interactive state.
- All other sections can be Server Components (no `"use client"` needed).
- The `ContactForm` must be `"use client"` (React Hook Form requires it).
- The grain overlay is in `globals.css body::after` — do not add it to components.

## Estado y Progreso

Ver `AXUSIA-CORE.md` — sección 6 (Estado Actual) y sección 7 (Hoja de Ruta).
