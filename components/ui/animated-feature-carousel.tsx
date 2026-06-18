"use client"

import { useCallback, useEffect, useState, type MouseEvent } from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
} from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ScrollSlide } from "@/types"

/* ─── Types ──────────────────────────────────────────────────────── */

type CardStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
  "--glow": string
  borderColor: string
}

export interface CarouselImage {
  primary: string
  secondary?: string
  alt: string
}

/* ─── Hooks ──────────────────────────────────────────────────────── */

function useNumberCycler(total: number, disabled = false, interval = 5500) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (disabled) return
    const id = setTimeout(() => setCurrent(prev => (prev + 1) % total), interval)
    return () => clearTimeout(id)
  }, [current, total, interval, disabled])

  const setStep = useCallback((i: number) => setCurrent(i % total), [total])
  return { current, setStep }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

/* ─── Image Display ──────────────────────────────────────────────── */

const IMG_BASE = "rounded-xl border border-border shadow-xl object-cover select-none"

function ImageDisplay({ image, tagColor }: { image: CarouselImage; tagColor: string }) {
  return (
    <div className="relative w-full h-full">
      {image.secondary ? (
        <>
          {/* Secondary — behind, offset right */}
          <img
            src={image.secondary}
            alt={image.alt}
            className={cn(IMG_BASE, "absolute")}
            style={{ width: "54%", left: "40%", top: "32%", maxWidth: "unset" }}
          />
          {/* Primary — front, offset left */}
          <img
            src={image.primary}
            alt={image.alt}
            className={cn(IMG_BASE, "absolute")}
            style={{ width: "52%", left: "2%", top: "10%", maxWidth: "unset" }}
          />
        </>
      ) : (
        <img
          src={image.primary}
          alt={image.alt}
          className={cn(IMG_BASE, "absolute")}
          style={{ width: "88%", left: "6%", top: "16%", maxWidth: "unset" }}
        />
      )}
      {/* Subtle color grade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${tagColor}08 0%, transparent 55%)` }}
      />
    </div>
  )
}

/* ─── Feature Card (mouse-glow wrapper) ──────────────────────────── */

function FeatureCard({
  children,
  step,
  slides,
}: {
  children: React.ReactNode
  step: number
  slides: ScrollSlide[]
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const xTemplate = useMotionTemplate`${mouseX}px`
  const yTemplate = useMotionTemplate`${mouseY}px`
  const isMobile = useIsMobile()
  const slide = slides[step]

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className="axusia-feature-card relative w-full overflow-hidden rounded-[4px] border bg-surface transition-[border-color] duration-500"
      onMouseMove={handleMouseMove}
      style={{
        "--x": xTemplate,
        "--y": yTemplate,
        "--glow": `${slide.tagColor}12`,
        borderColor: `${slide.tagColor}20`,
      } as CardStyle}
    >
      {children}
    </motion.div>
  )
}

/* ─── Steps Nav ──────────────────────────────────────────────────── */

const TEAL = "#4ECDC4"

function StepsNav({
  slides,
  current,
  onChange,
}: {
  slides: ScrollSlide[]
  current: number
  onChange: (i: number) => void
}) {
  return (
    <nav aria-label="Pasos" className="flex justify-center">
      <ol className="flex flex-wrap items-center justify-center gap-2" role="list">
        {slides.map((slide, i) => {
          const isCompleted = current > i
          const isCurrent   = current === i
          return (
            <motion.li
              key={slide.id}
              animate={{ scale: isCurrent ? 1 : 0.95, opacity: isCurrent ? 1 : 0.60 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => onChange(i)}
                className={cn(
                  "flex items-center gap-2.5 rounded-full px-3.5 py-1.5 transition-all duration-300",
                  isCurrent
                    ? "border bg-surface2"
                    : "bg-surface border border-border text-muted hover:text-text hover:bg-surface2"
                )}
                style={isCurrent ? { borderColor: `${slide.tagColor}50`, color: slide.tagColor } : {}}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                  {isCompleted
                    ? <Check className="h-3 w-3" style={{ color: TEAL }} />
                    : <span>{i + 1}</span>}
                </span>
                <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-[family-name:var(--font-syne)]">
                  {slide.tag}
                </span>
              </button>
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ─── Main Export ────────────────────────────────────────────────── */

export function FeatureCarousel({
  slides,
  images,
  controlledStep,
  onStepChange,
}: {
  slides: ScrollSlide[]
  images?: CarouselImage[]
  controlledStep?: number
  onStepChange?: (i: number) => void
}) {
  const isControlled = controlledStep !== undefined
  const { current: autoStep, setStep: setAutoStep } = useNumberCycler(slides.length, isControlled)

  const step     = isControlled ? controlledStep : autoStep
  const onChange = isControlled ? (onStepChange ?? (() => {})) : setAutoStep
  const slide    = slides[step]
  const image    = images?.[step]

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Card */}
      <FeatureCard step={step} slides={slides}>
        <div className="relative z-10 p-8 lg:p-12 min-h-[460px] grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8">

          {/* Counter */}
          <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
            <span className="text-xs text-muted font-[family-name:var(--font-syne)] tabular-nums">
              {String(step + 1).padStart(2, "0")}/{slides.length}
            </span>
          </div>

          {/* ── Left: text ─────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${step}`}
              className="flex flex-col justify-center gap-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-px flex-shrink-0" style={{ background: slide.tagColor }} />
                <span className="t-label" style={{ color: slide.tagColor }}>{slide.tag}</span>
              </div>

              <div>{slide.icon}</div>

              <h2 className="t-head text-[1.55rem] lg:text-[1.95rem] text-text max-w-[380px]">
                {slide.headline}
              </h2>

              <p className="font-[family-name:var(--font-dm)] text-text/75 text-[0.95rem] leading-relaxed max-w-[360px]">
                {slide.body}
              </p>

              <div
                className="flex items-baseline gap-3 pt-5 mt-auto"
                style={{ borderTop: `1px solid ${slide.tagColor}20` }}
              >
                <span
                  className="text-[2.4rem] font-bold font-[family-name:var(--font-syne)] leading-none"
                  style={{ color: slide.tagColor }}
                >
                  {slide.metric}
                </span>
                <span className="text-text/70 text-[0.85rem] font-[family-name:var(--font-dm)] leading-snug max-w-[180px]">
                  {slide.metricSub}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Right: image ───────────────────────────────────────── */}
          <div className="hidden lg:block relative overflow-hidden">
            {image && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${step}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ImageDisplay image={image} tagColor={slide.tagColor} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </FeatureCard>

      {/* Steps nav */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <StepsNav slides={slides} current={step} onChange={onChange} />
      </motion.div>
    </div>
  )
}
