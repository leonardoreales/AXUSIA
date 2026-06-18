---
name: AXUSIA
description: Agencia de automatización IA para PYMEs colombianas
colors:
  midnight-navy: "#0C1228"
  navy-surface: "#162854"
  navy-surface2: "#1E3268"
  navy-surface3: "#263C7A"
  platinum-pearl: "#B4BDD2"
  teal: "#4ECDC4"
  ghost-white: "#F0EEE8"
  static: "#7A8398"
  dead-channel: "#4A5168"
typography:
  display:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-1.5px"
  headline:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.5px"
  title:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.25px"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.6
  label:
    fontFamily: "Syne, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: "2px"
rounded:
  sharp: "2px"
  sm: "4px"
  md: "8px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    background: "linear-gradient(105deg,#6A7A98 0%,#A8B4C8 28%,#D8DCE6 52%,#FFFEF8 62%,#C8CED8 78%,#6A7A98 100%)"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.sharp}"
    padding: "0 36px"
    height: "54px"
  button-primary-hover:
    background: "brightness(1.07) + shadow 0 4px 28px rgba(180,189,210,0.32)"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.sharp}"
    padding: "0 36px"
    height: "54px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ghost-white}"
    rounded: "{rounded.sharp}"
    padding: "0 28px"
    height: "44px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.static}"
    rounded: "{rounded.sharp}"
    padding: "0 28px"
    height: "44px"
---

# Design System: AXUSIA

## 1. Overview

**Creative North Star: "Midnight Navy + Platinum Pearl"**

AXUSIA habita la estética del instrumento de precisión en su forma más refinada: la densidad de un tablero de control nocturno, la calidad de un reloj de ingeniería bajo luz fría, la quietud operacional de un centro de mando en plena función. El fondo Midnight Navy no es oscuridad genérica — es la profundidad del azul nocturno donde la inteligencia opera sin ruido. Platinum Pearl aparece como el filo de una herramienta de precisión: frío, exacto, presente solo donde guía una acción decisiva.

El sistema rechaza tres caminos: el SaaS amigable-pastel (Canva, Notion) que diluye la propuesta técnica; las consultoras corporativas en azul frío y distante (McKinsey, Accenture); y los clones de OpenAI con gradientes azul-púrpura que convirtieron "IA" en un género visual saturado. AXUSIA no imita el lenguaje visual de la IA hype — construye el suyo: cool-tone, premium, diferenciado. Donde los clones gritan neón, AXUSIA destella metal.

La densidad es un valor, no un problema. Cada sección lleva información real. Las superficies no tienen sombras convencionales: la profundidad emerge de capas de azul marino graduadas. El movimiento responde a interacciones, no improvisa coreografías.

**Key Characteristics:**
- Midnight Navy intencional — azul profundo, no negro absoluto — como fondo vivo
- Platinum Pearl como señal fría de precisión: metálico, no caloroso, no neón
- Teal (#4ECDC4) solo para estado funcional (disponibilidad): no como acento de diseño
- Syne pesado (800) para display, DM Sans ligero (300) para cuerpo: la brecha es el motor de jerarquía
- Esquinas casi rectas (2px): precisión sobre suavidad
- Elevación tonal via capas navy, sin box-shadow posicional en superficies
- Grain textural sutil sobre el fondo (no glassmorphism)
- Grain overlay en `body::after`: una textura de ambiente, nunca sobre componentes

## 2. Colors: La Paleta de Precisión

Platinum Pearl sobre escala de azules nocturnos. El color aparece cuando algo importa.

### Primary
- **Platinum Pearl** (`#B4BDD2`): El acento del sistema. Botones CTA (en gradiente metálico), etiquetas `.t-label`, el after del `.eyebrow`, selecciones de texto (`::selection`). Temperatura fría sobre navy profundo — contraste sin agresividad. Su cualidad metálica le da peso sin calor. Usado con parsimonia para preservar su peso.

### Secondary
- **Teal** (`#4ECDC4`): Solo para estado funcional. Chip de disponibilidad "Disponible en Barranquilla". No es un acento de diseño — es una señal de proceso activo. No debe aparecer en layout, tipografía, ni decoración.

  **Excepción documentada:** en componentes demo que representan flujos de sistema vivo (como `OperationalProof` en el Hero), teal puede usarse como señal de "sistema respondiendo" — WhatsApp en línea, flujos en ejecución, métricas activas, conectores de nodo. Fuera de contextos demo técnicos, la regla se mantiene.

### Neutral
- **Midnight Navy** (`#0C1228`): Fondo de página. El nivel cero de la jerarquía tonal. Azul profundo, no negro puro — la diferencia es perceptible y es parte de la identidad.
- **Navy Surface** (`#162854`): Primera superficie — tarjetas en reposo, barra de navegación, footer.
- **Navy Surface 2** (`#1E3268`): Segunda superficie — paneles expandidos, contenedores internos, hover de tarjetas.
- **Navy Surface 3** (`#263C7A`): Tercera superficie — elementos elevados, active states de superficie.
- **Ghost White** (`#F0EEE8`): Texto principal de cuerpo. Ligeramente cálido para reducir fatiga visual. Contraste vs Midnight Navy: ≥17:1 (WCAG AAA ✓).
- **Static** (`#7A8398`): Texto secundario, captions, metadatos, placeholders. Solo para texto ≥18px o bold ≥14px. Para texto pequeño normal: preferir Ghost White.
- **Dead Channel** (`#4A5168`): Texto terciario, elementos deshabilitados, bordes de texto. Nunca para texto informativo en tamaño body.

### Named Rules

**The Pearl Rule.** Platinum Pearl ocupa ≤20% de cualquier pantalla. Su poder viene de la escasez y de su cualidad metálica: cuando aparece, señala precisión y acción. Diluirlo en fondos o decoración destruye esa señal.

**The Tonal Depth Rule.** La profundidad emerge de la escala de azules navy (midnight-navy → navy-surface → navy-surface2 → navy-surface3), no de sombras con offset. Nunca usar `box-shadow` con `y-offset` en superficies de contenido. La sombra direccional sutil en botones primarios es el único vocabulario de profundidad.

## 3. Typography: Precisión y Flujo

**Display Font:** Syne (400, 600, 700, 800 — Google Fonts)
**Body Font:** DM Sans (300, 400, 500 — Google Fonts)

**Character:** Syne es geométrico, compacto y de alta tensión: su 800 con tracking negativo construye autoridad técnica sin frialdad corporativa. DM Sans es humanista y ligero, la contraparte accesible que asegura que el cuerpo se lea sin esfuerzo. La brecha de peso (800 display / 300 body) es el motor de toda la jerarquía. Dos familias, propósitos opuestos, resultado unificado.

### Hierarchy
- **Display** (Syne 800, clamp(2.5rem → 5rem), lh 1.0, -1.5px tracking): Titulares de hero. Máximo uno por sección. `text-wrap: balance`.
- **Headline** (Syne 700, clamp(1.75rem → 3rem), lh 1.1, -0.5px tracking): Títulos de sección dentro de páginas. El pilar de la jerarquía de contenido. `text-wrap: balance`.
- **Title** (Syne 600, clamp(1.25rem → 1.75rem), lh 1.2, -0.25px tracking): Títulos de tarjeta, nombre de servicio, encabezados de panel de detalle.
- **Body** (DM Sans 300, 1rem / 16px, lh 1.6): Todo el texto corrido. Máximo 65ch de ancho de línea. `text-wrap: pretty` en párrafos largos.
- **Label** (Syne 600, 11px, 2px tracking, uppercase, Platinum Pearl): Etiquetas de categoría, eyebrows de sección. Uso máximo en 40% de las secciones de una página.

### Named Rules

**The Weight Contrast Rule.** Syne para estructura (titulares, labels), DM Sans para lectura (cuerpo, UI). Nunca Syne 700/800 en texto de cuerpo corrido. La separación de roles es la base de la jerarquía: violarlo aplana el sistema.

**The One Eyebrow Rule.** `.t-label` es un acento, no un scaffold. Máximo en el 40% de las secciones de cualquier página. Cuando aparece, debe señalar algo genuinamente categorial. Eyebrow en cada sección = AI grammar. Eyebrow deliberado = voz de marca.

## 4. Elevation: Profundidad Tonal

AXUSIA es un sistema de superficie plana con profundidad tonal graduada en azul navy. No usa `box-shadow` con offset posicional en superficies. La jerarquía espacial se expresa a través de cuatro niveles de color de fondo: Midnight Navy → Navy Surface → Navy Surface 2 → Navy Surface 3. Subir un nivel en la jerarquía de contenido significa moverse un paso en esa escala, nunca flotarse sobre ella con sombras.

La única excepción son las **sombras direccionales** en botones primarios: `box-shadow: 0 2px 16px rgba(180,189,210,0.18)` en reposo, `0 4px 28px rgba(180,189,210,0.32)` en hover. Son sombras sutiles y direccionales — no glows de neón, no radiales puras. Señalan presencia física del botón, no energía artificial.

### Shadow Vocabulary
- **Pearl Shadow — reposo** (`box-shadow: 0 2px 16px rgba(180,189,210,0.18)`): Solo en `button-primary`. Sutil, direccional. Indica acción disponible.
- **Pearl Shadow — hover** (`box-shadow: 0 4px 28px rgba(180,189,210,0.32)`): Amplifica la señal en el estado hover del `button-primary`.

### Named Rules

**The Flat-By-Default Rule.** Las superficies son planas en reposo. Las sombras de acento solo existen en botones primarios y son direccionales, no radiales. Usar `box-shadow: 0 0 ...` (glow neon) está prohibido en todo el sistema. Usar `box-shadow` con offset Y en tarjetas o paneles importa la estética SaaS-flotante que el sistema rechaza.

## 5. Components

### Buttons

Forma casi ortogonal (2px radius). La angularidad es deliberada: precisión de herramienta, no suavidad de app de consumo. Tres variantes establecen jerarquía de intención clara.

- **Shape:** 2px radius. No redondear más — la ortogonalidad es identidad del sistema.
- **Primary:** Gradiente metálico platinum pearl (`linear-gradient(105deg,#6A7A98 0%,#A8B4C8 28%,#D8DCE6 52%,#FFFEF8 62%,#C8CED8 78%,#6A7A98 100%)`), texto Midnight Navy (`#0C1228`). Altura 54px (lg), 44px (md), 36px (sm). Sombra direccional `0 2px 16px rgba(180,189,210,0.18)` en reposo. Hover: `brightness(1.07)` + sombra amplificada + shine sweep blanco-transparente (`via-white/15`). Mouse-follow spring (stiffness 240, damping 22, mass 0.5). Tap scale 0.97.
- **Secondary:** Fondo transparente, borde `rgba(255,255,255,0.18)`, texto Ghost White. Hover: borde Platinum Pearl, texto Platinum Pearl, micro-sombra `0 0 20px rgba(180,189,210,0.12)`.
- **Ghost:** Fondo transparente, sin borde, texto Static. Hover: texto Ghost White. Para acciones de menor jerarquía.
- **Focus:** Ring 2px Platinum Pearl (`#B4BDD2`), `ring-offset-2 ring-offset-bg`, sobre Midnight Navy.
- **Disabled / Loading:** Opacidad 40%, `cursor: not-allowed`. El spinner usa Ghost White.

### Chips & Tags

- **Chip de disponibilidad (available):** Fondo `rgba(78,205,196,0.07)`, texto teal (`#4ECDC4`), borde `rgba(78,205,196,0.20)`. Punto parpadeante en teal (`blink` 2s). Uno por página. Señal funcional de estado real, no decoración.
- **Chip live:** Fondo `rgba(180,189,210,0.07)`, texto Platinum Pearl, borde `rgba(180,189,210,0.20)`. Punto parpadeante en platinum (`blink` 1.5s).
- **Tag:** Fondo `navy-surface2` (`#1E3268`), texto Static, sin borde. Categorización visual sin peso jerárquico.

### Cards / Containers

- **Corner Style:** 2px para tarjetas de datos y servicio; 4px para contenedores de sección más amplios.
- **Background:** `navy-surface` (`#162854`) en reposo; `navy-surface2` (`#1E3268`) en hover y paneles expandidos.
- **Shadow:** Ninguna. Borde `rgba(255,255,255,0.07)` para delimitación. En hover: borde `rgba(255,255,255,0.12)`.
- **Internal Padding:** 24–32px desktop, 16–20px mobile.
- **Transición de hover:** `background-color 200ms ease`, `border-color 200ms ease`. Sin transform ni sombra en tarjetas.

### Ledger Layout (preferred over cards)

Cuando el contenido es un catálogo o lista de ítems con jerarquía clara, usar layout de ledger en lugar de card grid:
- `flex flex-col divide-y divide-border border-t` en el contenedor
- Grid por fila: `[columna-fija_minmax(0,1fr)_auto]` para rail | contenido central | precio/acción
- No usar 3-column equal card grids — están prohibidos por el sistema

### Inputs / Fields

- **Style:** Fondo `navy-surface` o `navy-surface2`, borde `rgba(255,255,255,0.18)`, radius 4px. Sin fondo blanco.
- **Focus:** Outline 2px Platinum Pearl, `outline-offset: 2px`. El borde cambia a `border-accent`.
- **Placeholder:** Static (`#7A8398`).
- **Error:** Texto de error en rojo funcional (`#E55B5B`), 13px DM Sans 400, debajo del campo. Sin background rojo.
- **Disabled:** Opacidad 50%, cursor `not-allowed`, sin hover.

### Navigation

- **Style:** Posición fija, fondo Midnight Navy con leve transparencia (`rgba(12,18,40,0.92)`) + `backdrop-filter: blur(12px)`. Auto-hide en scroll hacia abajo, reveal en scroll hacia arriba.
- **Typography:** DM Sans 400, 14px, texto Ghost White. Link activo: Platinum Pearl. Hover: Platinum Pearl con `transition 200ms`.
- **Mobile:** Menú desplegable (`clipPath` curtain). Links en Syne 700. Overlay oscuro sobre el contenido.
- **Logo en nav:** Tamaño `sm`, sin animación GSAP (la animación solo en el primer load de sesión).

### Hexagon Logo + Wordmark (Componente Signature)

El mark es un hexágono SVG con animación de draw GSAP al cargar — `strokeDashoffset` de 100% a 0% en 1.2s ease expo. La wordmark "AXUS**IA**" usa Syne 800: "AXUS" en gradiente platinum pearl sweep, "IA" en gradiente grafito premium. Mouse parallax: 6 capas de extrusión en motion.div, face se mueve 25% menos (ilusión de pop-out 3D). Configuración sutil: 6 capas, offset 1.0/0.7px por capa, opacidad 0.28, spring `stiffness:60 damping:28`. Tres tamaños: `sm` (nav/footer, 28px), `md` (40px), `lg` (hero, 64px).

**Wordmark gradient stops (componente firma — no reutilizar fuera del Logo):**
- **AXUS** (platinum sweep): `linear-gradient(105deg, #5A5A5A 0%, #B8B8B8 20%, #EFEFEF 38%, #FAFAF8 50%, #EFEFEF 62%, #B8B8B8 80%, #5A5A5A 100%)` · Extrusion: `#343438`
- **IA** (grafito premium): `linear-gradient(135deg, #1A1E24 0%, #252B33 20%, #3A4050 40%, #626874 60%, #848A96 75%, #5A6070 88%, #2E333C 100%)` · Extrusion: `#1E2535` · Peak asimétrico al 75% evita banda blanca en la letra A.

### Scroll Reveal

Fade-up desde `translateY(28px)`, opacidad 0→1, duración 650ms, easing expo (`cubic-bezier(0.16,1,0.3,1)`). `viewport={{ once: true }}`. Delays escalonados: 100ms, 200ms, 300ms. `@media (prefers-reduced-motion: reduce)` con crossfade instantáneo como alternativa.

## 6. Do's and Don'ts

### Do:
- **Do** mantener Platinum Pearl en ≤20% de la superficie visible de cualquier pantalla. Su poder es su escasez y su cualidad metálica.
- **Do** usar la escala tonal navy (midnight-navy → navy-surface3) para indicar jerarquía de profundidad. Nunca sombras posicionales en superficies.
- **Do** verificar contraste WCAG AAA (7:1) para todo texto body. Ghost White (#F0EEE8) sobre Midnight Navy (#0C1228) ≥17:1 ✓. Static (#7A8398) sobre Midnight Navy ≈4.8:1 — solo para texto grande (≥18px o bold ≥14px).
- **Do** usar Syne exclusivamente para titulares, labels y logotipo. DM Sans para todo texto de cuerpo y UI.
- **Do** mantener radius en 2px en componentes de acción (botones, chips, badges). La forma ortogonal es identidad.
- **Do** incluir `prefers-reduced-motion: reduce` en todas las animaciones.
- **Do** nombrar cada CTA con verbo + objeto: "Solicitar cotización", "Ver servicios", "Enviar mensaje".
- **Do** usar `text-wrap: balance` en H1–H3 para distribución uniforme de líneas.
- **Do** preferir layouts tipo ledger (`divide-y`) sobre 3-column equal card grids.
- **Do** mantener el efecto 3D del wordmark sutil: insinuado al mover el cursor, nunca anunciado.

### Don't:
- **Don't** usar paleta pastel, formas redondeadas (>8px en acciones) o tono amigable-casual. AXUSIA no es Canva ni Notion.
- **Don't** usar gradientes azul-púrpura, neón sobre negro, o glows radiales (`box-shadow: 0 0 ...`). Ese es el lane de los clones de IA — AXUSIA usa sombras direccionales, no neón.
- **Don't** usar Signal Amber (#E8943A) ni colores naranja/cálidos. La paleta migró a Midnight Navy + Platinum Pearl — los tokens amber están deprecados.
- **Don't** usar `border-left` o `border-right` > 1px como stripe de acento decorativo. Reemplazar con fondo tonal.
- **Don't** usar `background-clip: text` con gradiente arbitrario. Solo se permite en el wordmark AXUS (gradiente platinum definido) y en IA (gradiente grafito definido). Gradient text libre está prohibido.
- **Don't** glassmorphism decorativo. El grain en `body::after` es la única textura del sistema. Blurs sobre tarjetas son ruido.
- **Don't** poner `.t-label` / `.eyebrow` en cada sección. Máximo en el 40% de las secciones de una página.
- **Don't** usar números de sección (01 / 02 / 03) como scaffolding por defecto. Solo cuando la secuencia numeral lleva información real.
- **Don't** usar frases vacías de marketing: "transformamos tu negocio", "soluciones de vanguardia", "ecosistema inteligente". Copy verificable y específico.
- **Don't** aplicar la animación GSAP de draw del logo en cualquier otro contexto. Es la firma del logo.
- **Don't** aumentar las capas o intensidad del efecto 3D del wordmark. La dirección ante cualquier feedback es MENOS — menos capas, menos opacidad, menos rango. El efecto se insinúa, no grita.
- **Don't** usar 3-column equal card grids. Usar ledger, grid fraccionado, o asimetría real.
