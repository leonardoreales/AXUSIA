"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCROLL_SLIDES as SLIDES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const EASE_IN: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT: [number, number, number, number] = [0.4, 0, 1, 1];

/* ─── Card face animation variants ───────────────────────────────── */
const CARD_VARIANTS = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_IN },
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.35, ease: EASE_OUT },
  }),
};

/* ─── Progress dots ───────────────────────────────────────────────── */
function Dots({ active, count, onClick }: { active: number; count: number; onClick: (i: number) => void }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          aria-label={`Ir a paso ${i + 1}`}
          className="relative flex items-center justify-center w-3 h-3 group"
        >
          <span
            className="block rounded-full transition-all duration-400"
            style={{
              width: active === i ? 10 : 6,
              height: active === i ? 10 : 6,
              background: active === i
                ? SLIDES[i].tagColor
                : "rgba(255,255,255,0.2)",
              boxShadow: active === i
                ? `0 0 12px ${SLIDES[i].tagColor}66`
                : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────── */
export function ScrollCard() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevActive = useRef(0);

  /* Scroll trigger: maps 0→1 progress to 4 slides */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: false,
        onUpdate: (self) => {
          const idx = Math.min(
            SLIDES.length - 1,
            Math.floor(self.progress * SLIDES.length)
          );
          if (idx !== prevActive.current) {
            setDir(idx > prevActive.current ? 1 : -1);
            setActive(idx);
            prevActive.current = idx;
          }
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  const goTo = (i: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const sectionH = wrapper.offsetHeight;
    const targetScroll =
      wrapper.offsetTop + (i / SLIDES.length) * sectionH + sectionH / SLIDES.length / 2;
    window.scrollTo({ top: targetScroll - window.innerHeight / 2, behavior: "smooth" });
  };

  const slide = SLIDES[active];

  return (
    /* 400vh wrapper — ScrollTrigger pins within this */
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${SLIDES.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden">

        {/* Background ambient glow — follows active slide */}
        <motion.div
          key={`bg-${active}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          aria-hidden
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${slide.tagColor}0D 0%, transparent 70%)`,
            }}
          />
        </motion.div>

        {/* Layout */}
        <div className="container relative z-10 flex items-center justify-center gap-8 lg:gap-16">

          {/* Left — card */}
          <div className="flex-1 flex items-center justify-center" style={{ perspective: "1200px" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={CARD_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-[480px] rounded-[4px] p-8 lg:p-10 relative"
                style={{
                  background: slide.bg,
                  border: `1px solid ${slide.border}`,
                  backdropFilter: "blur(12px)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card inner glow edge */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${slide.tagColor}10 0%, transparent 60%)`,
                  }}
                  aria-hidden
                />

                {/* Tag */}
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-8 h-px"
                    style={{ background: slide.tagColor }}
                  />
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.15em] font-[family-name:var(--font-syne)]"
                    style={{ color: slide.tagColor }}
                  >
                    {slide.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6">{slide.icon}</div>

                {/* Headline */}
                <h2 className="t-head text-[1.6rem] lg:text-[2rem] leading-tight mb-5 text-text">
                  {slide.headline}
                </h2>

                {/* Body */}
                <p className="text-text/75 text-[1rem] leading-relaxed font-[family-name:var(--font-dm)] mb-8">
                  {slide.body}
                </p>

                {/* Metric */}
                <div
                  className="flex items-baseline gap-3 pt-6"
                  style={{ borderTop: `1px solid ${slide.border}` }}
                >
                  <span
                    className="text-[2.5rem] font-bold font-[family-name:var(--font-syne)] leading-none"
                    style={{
                      color: slide.tagColor,
                      textShadow: `0 0 30px ${slide.tagColor}40`,
                    }}
                  >
                    {slide.metric}
                  </span>
                  <span className="text-text/75 text-sm font-[family-name:var(--font-dm)] leading-snug max-w-[180px]">
                    {slide.metricSub}
                  </span>
                </div>

                {/* Step counter */}
                <div className="absolute top-8 right-8 lg:top-10 lg:right-10">
                  <span className="text-xs text-muted font-[family-name:var(--font-syne)] tabular-nums">
                    {String(active + 1).padStart(2, "0")}/{SLIDES.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — dots nav */}
          <div className="hidden lg:flex flex-col items-center gap-2">
            <Dots active={active} count={SLIDES.length} onClick={goTo} />
          </div>
        </div>

        {/* Bottom dots (mobile) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 lg:hidden">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? 24 : 8,
                height: 8,
                background: active === i ? s.tagColor : "rgba(255,255,255,0.2)",
              }}
              aria-label={`Paso ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll hint — only on first slide */}
        <AnimatePresence>
          {active === 0 && (
            <motion.div
              className="absolute bottom-10 right-10 hidden lg:flex items-center gap-2 text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <span className="text-xs font-[family-name:var(--font-dm)] tracking-wide">
                scroll
              </span>
              <motion.svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              >
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
