"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"

interface Particle {
  x: number
  y: number
  speed: number
  opacity: number
  fadeDelay: number
  fadeStart: number
  fadingOut: boolean
  reset(): void
  update(): void
  draw(ctx: CanvasRenderingContext2D): void
}

function makeParticle(canvas: HTMLCanvasElement): Particle {
  const p: Particle = {
    x: 0, y: 0, speed: 0, opacity: 1, fadeDelay: 0, fadeStart: 0, fadingOut: false,
    reset() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.speed = Math.random() / 5 + 0.1
      this.opacity = 1
      this.fadeDelay = Math.random() * 600 + 100
      this.fadeStart = Date.now() + this.fadeDelay
      this.fadingOut = false
    },
    update() {
      this.y -= this.speed
      if (this.y < 0) this.reset()
      if (!this.fadingOut && Date.now() > this.fadeStart) this.fadingOut = true
      if (this.fadingOut) {
        this.opacity -= 0.008
        if (this.opacity <= 0) this.reset()
      }
    },
    draw(ctx: CanvasRenderingContext2D) {
      if (Math.random() > 0.3) {
        ctx.fillStyle = `rgba(180, ${189 + Math.floor(Math.random() * 21)}, 210, ${this.opacity * 0.45})`
      } else {
        ctx.fillStyle = `rgba(78, 205, ${188 + Math.floor(Math.random() * 30)}, ${this.opacity * 0.35})`
      }
      ctx.fillRect(this.x, this.y, 0.5, Math.random() * 2.5 + 1)
    },
  }
  p.reset()
  p.y = Math.random() * canvas.height
  return p
}

export function ParticleCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let started = false

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      canvas.width = rect.width
      canvas.height = rect.height
      const n = Math.floor((canvas.width * canvas.height) / 6000)
      particlesRef.current = Array.from({ length: n }, () => makeParticle(canvas))
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach(p => { p.update(); p.draw(ctx) })
      rafRef.current = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (!started && canvas.width > 0) {
        started = true
        loop()
      }
    })
    ro.observe(canvas)

    return () => {
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}

interface SpotlightConfig { rot: string; dur: string; delay: string; reverse?: boolean }

const SPOTLIGHTS: SpotlightConfig[] = [
  { rot: "rotate(22deg)",  dur: "17s", delay: "0s"   },
  { rot: "rotate(-22deg)", dur: "14s", delay: "0.3s" },
  { rot: "rotate(0deg)",   dur: "21s", delay: "0.6s", reverse: true },
]

const ACCENT_TOPS = [8, 14, 21, 29, 36]
const EXTRUSION_COUNT = 6

/* AXUS — platinum/pearl: diagonal metallic sweep, static (no backgroundSize — keeps background-clip:text reliable) */
const AXUS_EXTRUDE  = "#343438"
const AXUS_ECHO     = "rgba(230,230,230,0.08)"
const AXUS_GRADIENT = "linear-gradient(105deg, #5A5A5A 0%, #B8B8B8 20%, #EFEFEF 38%, #FAFAF8 50%, #EFEFEF 62%, #B8B8B8 80%, #5A5A5A 100%)"

/* IA — grafito premium: charcoal profundo que sube a slate medio — más oscuro y cargado que AXUS */
const IA_EXTRUDE  = "#1E2535"
const IA_ECHO     = "rgba(80,86,98,0.18)"
const IA_SHADOW   = "0 0 16px rgba(80,86,98,0.22)"
const IA_GRADIENT = "linear-gradient(135deg, #1A1E24 0%, #252B33 20%, #3A4050 40%, #626874 60%, #848A96 75%, #5A6070 88%, #2E333C 100%)"

export function AxusiaParticleHero() {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 28 })
  // Face moves 25% as much as shadow → pop-out illusion
  const faceX = useTransform(springX, v => rm ? 0 : v * 0.25)
  const faceY = useTransform(springY, v => rm ? 0 : v * 0.25)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (rm) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width * 10)
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height * 6)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: "var(--color-bg)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (!rm) { mouseX.set(0); mouseY.set(0) } }}
    >
      {/* Spotlight beams */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {SPOTLIGHTS.map(({ rot, dur, delay, reverse }, i) => (
          <div
            key={i}
            style={{
              borderRadius: "0 0 50% 50%",
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              top: "72px",
              width: "min(30rem, 90vw)",
              height: "85vh",
              backgroundImage:
                "conic-gradient(from 0deg at 50% -5%, transparent 45%, rgba(180,189,210,.14) 49%, rgba(180,189,210,.24) 50%, rgba(180,189,210,.14) 51%, transparent 55%)",
              transformOrigin: "50% 0",
              filter: "blur(22px)",
              transform: rot,
              animation: `axusia-loadrot 2s ease-in-out ${delay} both, axusia-spotlight ${dur} ease-in-out ${delay} infinite${reverse ? " reverse" : ""}`,
            }}
          />
        ))}
      </div>

      {/* Particle canvas */}
      <ParticleCanvas className="absolute inset-0 pointer-events-none" />

      {/* Horizontal accent lines */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {ACCENT_TOPS.map((top, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(180,189,210,.09), transparent)",
              opacity: 0,
              transform: "scale(0)",
              animation: `axusia-accent 2s ease-out ${2 + i * 0.15}s forwards`,
            }}
          />
        ))}
      </div>

      {/* AXUS IA wordmark — centered */}
      <div
        className="relative flex flex-col items-center justify-center min-h-[100dvh]"
        style={{ zIndex: 2 }}
      >
        <div
          style={{
            opacity: 0,
            animation: "axusia-load 2s ease-in-out 0.6s forwards",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "inline-block" }}>
            <div style={{ position: "relative", display: "inline-block" }}>

              {/* 3D extrusion block — sigue al cursor completo (sombra) */}
              <motion.div
                aria-hidden
                style={{ x: springX, y: springY, position: "absolute", inset: 0, pointerEvents: "none" }}
              >
                {Array.from({ length: EXTRUSION_COUNT }, (_, i) => (
                  <p
                    key={i}
                    style={{
                      position: "absolute",
                      top: `${(i + 1) * 1.0}px`,
                      left: `${(i + 1) * 0.7}px`,
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(3.5rem, 13vw, 11rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                      opacity: Math.max(0, 0.28 - i * 0.038),
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    <span style={{ color: AXUS_EXTRUDE }}>AXUS </span>
                    <span style={{ color: IA_EXTRUDE }}>IA</span>
                  </p>
                ))}
                {/* Blur echo */}
                <p
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3.5rem, 13vw, 11rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    filter: "blur(18px) opacity(0.06)",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  <span style={{ color: AXUS_ECHO }}>AXUS </span>
                  <span style={{ color: IA_ECHO }}>IA</span>
                </p>
              </motion.div>

              {/* Cara — se mueve 25% menos → ilusión de pop-out 3D */}
              <motion.p
                style={{
                  x: faceX,
                  y: faceY,
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.5rem, 13vw, 11rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    backgroundImage: AXUS_GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 20px rgba(255,255,255,0.06)",
                    display: "inline",
                  } as React.CSSProperties}
                >
                  AXUS{" "}
                </span>
                <span
                  style={{
                    backgroundImage: IA_GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: IA_SHADOW,
                    display: "inline",
                  } as React.CSSProperties}
                >
                  IA
                </span>
              </motion.p>
            </div>
          </div>

          {/* Subtitle */}
          <p
            style={{
              marginTop: "1.8rem",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.65rem, 1.4vw, 0.9rem)",
              color: "rgba(240,238,232,0.38)",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              opacity: 0,
              transform: "translateY(1.2em)",
              animation:
                "axusia-load 2s ease-out 2.2s forwards, axusia-up 1.4s ease-out 2.2s forwards",
            }}
          >
            Automatización con IA · Barranquilla, Colombia
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
            animation: "axusia-load 2s ease-out 3.2s forwards",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              color: "rgba(122,131,152,0.55)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <span
            style={{
              width: "1px",
              height: "2rem",
              background:
                "linear-gradient(to bottom, rgba(180,189,210,0.4), transparent)",
            }}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-bg))",
          zIndex: 3,
        }}
      />
    </section>
  )
}
