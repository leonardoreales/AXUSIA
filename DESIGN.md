---
name: AXUS IA
description: Servicios de inteligencia artificial para PYMEs colombianas
colors:
  pitch-black: "#080B10"
  system-shell: "#0F1420"
  deep-shell: "#161C2E"
  layer-stack: "#1E2640"
  signal-amber: "#E8943A"
  active-pulse: "#4ECDC4"
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
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.pitch-black}"
    rounded: "{rounded.sharp}"
    padding: "0 36px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "#d4832e"
    textColor: "{colors.pitch-black}"
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

# Design System: AXUS IA

## 1. Overview

**Creative North Star: "El Terminal con Pulso"**

AXUS IA habita la estética del entorno de trabajo de alta precisión: la claridad del CLI, la densidad informativa de una workstation de ingeniería, la quietud funcional del terminal. No es oscuro por tendencia, es oscuro porque es el ambiente natural donde se construye y opera inteligencia artificial. El naranjo Signal Amber aparece como el cursor que parpadea en la línea de comandos: infrecuente, cargado de significado, siempre indicando que algo está listo para ejecutarse. El teal Active Pulse señala procesos en marcha, sistemas respondiendo, datos fluyendo.

El sistema rechaza tres caminos: el SaaS amigable-pastel (Canva, Notion) que diluye la propuesta técnica; las consultoras corporativas en azul marino que priorizan la distancia sobre la cercanía; y los clones de OpenAI con gradientes azul-púrpura que convirtieron "IA" en un género visual saturado. AXUS IA no declara que hace IA, demuestra que la hace con cada decisión de diseño.

La densidad es un valor, no un problema. Cada sección lleva información real, no relleno decorativo. Las superficies no tienen sombras convencionales: la profundidad emerge de capas tonales graduadas. El movimiento responde a interacciones, no improvisa coreografías.

**Key Characteristics:**
- Tema oscuro intencional, no derivativo del hype IA
- Signal Amber y Active Pulse como señales operacionales, no decoración
- Syne pesado (800) para display, DM Sans ligero (300) para cuerpo: la brecha es el motor de jerarquía
- Esquinas casi rectas (2px): precisión sobre suavidad
- Elevación tonal, sin box-shadow posicional en superficies
- Grain textural sutil sobre el fondo (no glassmorphism)
- Grain overlay en `body::after`: una textura de ambiente, nunca sobre componentes

## 2. Colors: La Paleta Operacional

Dos señales activas sobre una escala de oscuros nocturnos. El color aparece cuando algo importa.

### Primary
- **Signal Amber** (`#E8943A`): El color de acción del sistema. Botones CTA, la "IA" del logotipo, etiquetas `.t-label`, el punto del chip de disponibilidad, el after del `.eyebrow`, selecciones de texto (`::selection`). Su temperatura cálida sobre negro profundo produce el contraste más alto del sistema. Usado con parsimonia para preservar su peso.

### Secondary
- **Active Pulse** (`#4ECDC4`): Señal de proceso activo. Indicadores de estado secundario, acentos en secciones sin CTA primario, elementos que denotan "sistema respondiendo". Su temperatura fría contrasta con el calor del ámbar y distingue dos tipos de energía: acción (ámbar) y proceso (teal).

### Neutral
- **Pitch Black** (`#080B10`): Fondo de página. El nivel cero de la jerarquía tonal. El canvas del sistema.
- **System Shell** (`#0F1420`): Primera superficie — tarjetas en reposo, barra de navegación, footer.
- **Deep Shell** (`#161C2E`): Segunda superficie — paneles expandidos, contenedores internos, hover de tarjetas.
- **Layer Stack** (`#1E2640`): Tercera superficie — elementos elevados, active states de superficie.
- **Ghost White** (`#F0EEE8`): Texto principal de cuerpo. Ligeramente cálido para reducir fatiga visual en sesiones largas sobre fondo muy oscuro. Contraste vs Pitch Black: 18.7:1 (WCAG AAA ✓).
- **Static** (`#7A8398`): Texto secundario, captions, metadatos, placeholders. Solo para texto ≥18px o bold ≥14px sobre Pitch Black (contraste 4.8:1, WCAG AA ✓ para texto grande). Para texto pequeño normal: preferir Ghost White.
- **Dead Channel** (`#4A5168`): Texto terciario, elementos deshabilitados, bordes de texto. Nunca para texto informativo en tamaño body.

### Named Rules

**The Signal Rule.** Signal Amber ocupa ≤15% de cualquier pantalla. Su poder viene de la escasez: cuando aparece, indica acción. Diluirlo en fondos, texto de soporte o decoración destruye esa señal y convierte el sistema en lo que rechaza.

**The Tonal Depth Rule.** La profundidad emerge de la escala de superficies (pitch-black → system-shell → deep-shell → layer-stack), no de sombras con offset. Nunca usar `box-shadow` con `y-offset` positivo en superficies de contenido. El glow difuso de acento en botones y la transición entre niveles tonales es el único vocabulario de profundidad.

## 3. Typography: Precisión y Flujo

**Display Font:** Syne (400, 600, 700, 800 — Google Fonts)
**Body Font:** DM Sans (300, 400, 500 — Google Fonts)

**Character:** Syne es geométrico, compacto y de alta tensión: su 800 con tracking negativo construye autoridad técnica sin frialdad corporativa. DM Sans es humanista y ligero, la contraparte accesible que asegura que el cuerpo se lea sin esfuerzo. La brecha de peso (800 display / 300 body) es el motor de toda la jerarquía. Dos familias, propósitos opuestos, resultado unificado.

### Hierarchy
- **Display** (Syne 800, clamp(2.5rem → 5rem), lh 1.0, -1.5px tracking): Titulares de hero. Máximo uno por sección. `text-wrap: balance`.
- **Headline** (Syne 700, clamp(1.75rem → 3rem), lh 1.1, -0.5px tracking): Títulos de sección dentro de páginas. El pilar de la jerarquía de contenido. `text-wrap: balance`.
- **Title** (Syne 600, clamp(1.25rem → 1.75rem), lh 1.2, -0.25px tracking): Títulos de tarjeta, nombre de servicio, encabezados de panel de detalle.
- **Body** (DM Sans 300, 1rem / 16px, lh 1.6): Todo el texto corrido. Máximo 65ch de ancho de línea. `text-wrap: pretty` en párrafos largos.
- **Label** (Syne 600, 11px, 2px tracking, uppercase, Signal Amber): Etiquetas de categoría, eyebrows de sección. Uso máximo en 40% de las secciones de una página.

### Named Rules

**The Weight Contrast Rule.** Syne para estructura (titulares, labels), DM Sans para lectura (cuerpo, UI). Nunca Syne 700/800 en texto de cuerpo corrido. La separación de roles es la base de la jerarquía: violarlo aplana el sistema.

**The One Eyebrow Rule.** `.t-label` es un acento, no un scaffold. Máximo en el 40% de las secciones de cualquier página. Cuando aparece, debe señalar algo genuinamente categorial. Eyebrow en cada sección = AI grammar. Eyebrow deliberado = voz de marca.

## 4. Elevation: Profundidad Tonal

AXUS IA es un sistema de superficie plana con profundidad tonal graduada. No usa `box-shadow` con offset posicional en superficies. La jerarquía espacial se expresa a través de cuatro niveles de color de fondo: Pitch Black → System Shell → Deep Shell → Layer Stack. Subir un nivel en la jerarquía de contenido significa moverse un paso en esa escala, nunca flotarse sobre ella con sombras.

La única excepción son los **halos de acento**: glows radiales difusos exclusivamente en botones primarios y sus estados hover (`box-shadow: 0 0 28px rgba(232,148,58,0.30)` en reposo, `0 0 40px rgba(232,148,58,0.50)` en hover). No son sombras de elevación, son señales de energía y estado.

### Shadow Vocabulary
- **Accent Glow — reposo** (`box-shadow: 0 0 28px rgba(232,148,58,0.30)`): Solo en `button-primary`. Indica acción disponible.
- **Accent Glow — hover** (`box-shadow: 0 0 40px rgba(232,148,58,0.50)`): Amplifica la señal en el estado hover del `button-primary`.

### Named Rules

**The Flat-By-Default Rule.** Las superficies son planas en reposo. Los halos de acento solo existen en botones primarios. Usar `box-shadow` con offset Y positivo en tarjetas o paneles importa la estética SaaS-flotante que el sistema rechaza explícitamente.

## 5. Components

### Buttons

Forma casi ortogonal (2px radius). La angularidad es deliberada: precisión de herramienta, no suavidad de app de consumo. Tres variantes establecen jerarquía de intención clara.

- **Shape:** 2px radius. No redondear más — la ortogonalidad es identidad del sistema.
- **Primary:** Signal Amber fill (`#E8943A`), texto Pitch Black. Altura 54px (lg), 44px (md), 36px (sm). Glow difuso en reposo. Hover: ámbar más oscuro (`#d4832e`) + glow amplificado + shine sweep blanco-transparente. Mouse-follow spring (stiffness 240, damping 22). Tap scale 0.97.
- **Secondary:** Fondo transparente, borde `rgba(255,255,255,0.18)`, texto Ghost White. Hover: borde Signal Amber, texto Signal Amber, micro-glow tenue.
- **Ghost:** Fondo transparente, sin borde, texto Static. Hover: texto Ghost White. Para acciones de menor jerarquía.
- **Focus:** Ring 2px Signal Amber, `outline-offset: 3px`, sobre Pitch Black.
- **Disabled / Loading:** Opacidad 40%, `cursor: not-allowed`. El spinner de loading usa el mismo Signal Amber.

### Chips & Tags

- **Chip de disponibilidad:** Fondo `rgba(232,148,58,0.15)`, texto Ghost White, borde `rgba(232,148,58,0.20)`. Punto parpadeante en Signal Amber (`blink` keyframe). Uno por página. Señal de estado real, no decoración.
- **Tag:** Fondo `bg-surface2` (`#161C2E`), texto Static, sin borde. Categorización visual sin peso jerárquico.

### Cards / Containers

- **Corner Style:** 2px para tarjetas de datos y servicio; 4px para contenedores de sección más amplios.
- **Background:** `system-shell` (`#0F1420`) en reposo; `deep-shell` (`#161C2E`) en hover y paneles expandidos.
- **Shadow:** Ninguna. Borde `rgba(255,255,255,0.07)` para delimitación. En hover: borde `rgba(255,255,255,0.12)`.
- **Internal Padding:** 24–32px desktop, 16–20px mobile.
- **Transición de hover:** `background-color 200ms ease`, `border-color 200ms ease`. Sin transform ni sombra.

### Inputs / Fields

- **Style:** Fondo `system-shell` o `deep-shell`, borde `rgba(255,255,255,0.18)`, radius 4px. Sin fondo blanco bajo ninguna circunstancia.
- **Focus:** Outline 2px Signal Amber, `outline-offset: 2px`. El borde cambia a `border-accent`.
- **Placeholder:** Static (`#7A8398`) — verificar ≥4.5:1 sobre el fondo exacto del campo.
- **Error:** Texto de error en rojo funcional (`#E55B5B`), 13px DM Sans 400, debajo del campo. Sin background rojo.
- **Disabled:** Opacidad 50%, cursor `not-allowed`, sin hover.

### Navigation

- **Style:** Posición fija, fondo Pitch Black con leve transparencia (`rgba(8,11,16,0.92)`) + `backdrop-filter: blur(12px)`. Auto-hide en scroll hacia abajo, reveal en scroll hacia arriba.
- **Typography:** DM Sans 400, 14px, texto Ghost White. Link activo: Signal Amber. Hover: Signal Amber con `transition 200ms`.
- **Mobile:** Menú desplegable desde arriba (`slideDown` keyframe). Links en Syne 700, tamaño mayor para impacto táctil. Overlay oscuro sobre el contenido.
- **Logo en nav:** Tamaño `sm`, sin animación GSAP (la animación solo se ejecuta en el primer load de la sesión).

### Hexagon Logo (Componente Signature)

El mark es un hexágono SVG con animación de draw GSAP al cargar la página — `strokeDashoffset` de 100% a 0% en 1.2s con ease expo. La wordmark "AXUS**IA**" usa Syne 800 con "IA" en Signal Amber. Tres tamaños: `sm` (nav/footer, 28px mark), `md` (default, 40px), `lg` (hero, 64px). La animación de draw es la única animación auto-ejecutable en carga de página; todos los demás elementos usan `whileInView`.

### Scroll Reveal

Fade-up desde `translateY(28px)`, opacidad 0→1, duración 650ms, easing expo (`cubic-bezier(0.16,1,0.3,1)`). `viewport={{ once: true }}` — solo se activa una vez. Delays escalonados: `.reveal-d1` (100ms), `.reveal-d2` (200ms), `.reveal-d3` (300ms). Las transiciones base incluyen `@media (prefers-reduced-motion: reduce)` con crossfade instantáneo como alternativa.

## 6. Do's and Don'ts

### Do:
- **Do** mantener Signal Amber en ≤15% de la superficie visible de cualquier pantalla. Su poder es su escasez.
- **Do** usar la escala tonal (pitch-black → layer-stack) para indicar jerarquía de profundidad. Nunca sombras posicionales en superficies.
- **Do** verificar contraste WCAG AAA (7:1) para todo texto body. Ghost White (#F0EEE8) sobre Pitch Black (#080B10) = 18.7:1 ✓. Static (#7A8398) sobre Pitch Black = 4.8:1 — solo para texto grande (≥18px).
- **Do** usar Syne exclusivamente para titulares, labels y logotipo. DM Sans para todo texto de cuerpo y UI.
- **Do** mantener radius en 2px en componentes de acción (botones, chips, badges). La forma ortogonal es identidad.
- **Do** incluir `prefers-reduced-motion: reduce` en todas las animaciones.
- **Do** nombrar cada CTA con verbo + objeto: "Solicitar cotización", "Ver servicios", "Enviar mensaje".
- **Do** usar `text-wrap: balance` en H1–H3 para distribución uniforme de líneas.

### Don't:
- **Don't** usar paleta pastel, formas redondeadas (>8px en acciones) o tono amigable-casual. AXUS IA no es Canva ni Notion — es una herramienta técnica para negocios.
- **Don't** usar azul marino, gris corporativo frío, o estética de consultora distante (McKinsey, Accenture). La cercanía técnica es un diferenciador activo.
- **Don't** usar gradientes azul-púrpura, neón sobre negro, o glows en colores distintos al Signal Amber/Active Pulse. Ese es el lane de los clones de OpenAI — saturado y exactamente lo que AXUS IA no es.
- **Don't** usar `border-left` o `border-right` > 1px como stripe de acento decorativo en tarjetas o callouts. Reemplazar con fondo tonal.
- **Don't** usar `background-clip: text` con gradiente. Énfasis de texto = Signal Amber sólido o peso Syne 800. Gradient text está prohibido en el sistema.
- **Don't** glassmorphism decorativo. El grain en `body::after` es la única textura del sistema. Blurs sobre tarjetas o paneles de contenido son ruido.
- **Don't** poner `.t-label` / `.eyebrow` en cada sección. Máximo en el 40% de las secciones de una página. El eyebrow en cada sección es AI grammar.
- **Don't** usar números de sección (01 / 02 / 03) como scaffolding por defecto. Solo cuando la secuencia numeral lleva información real (un proceso ordenado, un flujo con pasos).
- **Don't** usar frases vacías de marketing: "transformamos tu negocio", "soluciones de vanguardia", "ecosistema inteligente". Cada pieza de copy debe decir algo verificable y específico.
- **Don't** aplicar la animación GSAP de draw del logo en cualquier otro contexto. Es la firma del logo, no un patrón reutilizable.