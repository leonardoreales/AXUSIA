"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FeatureCarousel, type CarouselImage } from "@/components/ui/animated-feature-carousel"
import { SCROLL_SLIDES } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

/* ─── Images per slide ───────────────────────────────────────────── */

const IMAGES: CarouselImage[] = [
  {
    // El Problema — manual task overload
    primary:   "/images/scrollcard/problema-1.jpg",
    secondary: "/images/scrollcard/problema-2.jpg",
    alt: "Tareas manuales acumuladas sin automatizar",
  },
  {
    // La Solución — AI agent / automation
    primary:   "/images/scrollcard/solucion-1.jpg",
    secondary: "/images/scrollcard/solucion-2.jpg",
    alt: "Agente de IA procesando automáticamente",
  },
  {
    // La Implementación — development / setup
    primary: "/images/scrollcard/implementacion.jpg",
    alt: "Implementación rápida en 72 horas",
  },
  {
    // Los Resultados — metrics / dashboard
    primary: "/images/scrollcard/resultados.jpg",
    alt: "Resultados medibles desde la primera semana",
  },
]

/* ─── Component ──────────────────────────────────────────────────── */

export function ScrollCard() {
  const [step, setStep] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const prevStep   = useRef(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: false,
        onUpdate: (self) => {
          const idx = Math.min(
            SCROLL_SLIDES.length - 1,
            Math.floor(self.progress * SCROLL_SLIDES.length)
          )
          if (idx !== prevStep.current) {
            setStep(idx)
            prevStep.current = idx
          }
        },
      })
    }, wrapper)

    return () => ctx.revert()
  }, [])

  /* Jump to a specific slide via smooth scroll */
  const goTo = (i: number) => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const sectionH  = wrapper.offsetHeight
    const segH      = sectionH / SCROLL_SLIDES.length
    const target    = wrapper.offsetTop + segH * i + segH * 0.5
    window.scrollTo({ top: target - window.innerHeight * 0.5, behavior: "smooth" })
  }

  return (
    /* 400 vh wrapper — ScrollTrigger pins within */
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${SCROLL_SLIDES.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100dvh] flex items-center py-12 overflow-hidden">
        <div className="container-sm w-full">
          <FeatureCarousel
            slides={SCROLL_SLIDES}
            images={IMAGES}
            controlledStep={step}
            onStepChange={goTo}
          />
        </div>

        {/* Scroll hint — first slide only */}
        <AnimatePresence>
          {step === 0 && (
            <motion.div
              className="absolute bottom-10 right-10 hidden lg:flex items-center gap-2 text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <span className="text-xs font-[family-name:var(--font-dm)] tracking-wide">scroll</span>
              <motion.svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              >
                <path
                  d="M12 5v14M5 12l7 7 7-7"
                  stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
