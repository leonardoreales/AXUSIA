"use client";

import { useRef, useEffect, useId } from "react";
import Link from "next/link";


interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  href?: string;
  className?: string;
}

const SIZES = {
  sm: { mark: 28, text: "text-[15px]" },
  md: { mark: 36, text: "text-[19px]" },
  lg: { mark: 48, text: "text-[25px]" },
};

// Flat-top hexagon. A apex = midpoint of top edge (24, 7.55).
// A feet = lower-left (14.5, 40.45) and lower-right (33.5, 40.45) vertices.
// These 3 points ARE on the hex outline → single continuous stroke visual.
const HEX   = "M43,24 L33.5,7.55 L14.5,7.55 L5,24 L14.5,40.45 L33.5,40.45 Z";
const LEG_L = "M24,7.55 L14.5,40.45";
const LEG_R = "M24,7.55 L33.5,40.45";

const L3S = 0.60; // layer 3 starting scale (farthest back)
const L2S = 0.80; // layer 2 starting scale (middle depth)

export function Logo({
  size = "md",
  animated = true,
  href = "/",
  className = "",
}: LogoProps) {
  const rawId = useId();
  const uid   = `axus${rawId.replace(/:/g, "")}`;

  const hexRef     = useRef<SVGPathElement>(null);
  const hexFillRef = useRef<SVGPathElement>(null);
  const legLRef    = useRef<SVGPathElement>(null);
  const legRRef    = useRef<SVGPathElement>(null);
  const layer2Ref  = useRef<SVGGElement>(null);
  const layer3Ref  = useRef<SVGGElement>(null);

  const { mark, text } = SIZES[size];

  useEffect(() => {
    if (!animated) return;
    let mounted = true;
    let cleanup: (() => void) | undefined;

    import("gsap").then(({ default: gsap }) => {
      if (!mounted) return;
      const hex   = hexRef.current;
      const fill  = hexFillRef.current;
      const legL  = legLRef.current;
      const legR  = legRRef.current;
      const l2    = layer2Ref.current;
      const l3    = layer3Ref.current;
      if (!hex || !fill || !legL || !legR || !l2 || !l3) return;

      const ctx = gsap.context(() => {
        const hLen  = hex.getTotalLength();
        const llLen = legL.getTotalLength();
        const lrLen = legR.getTotalLength();

        // ── Initial state ──
        gsap.set(hex,  { strokeDasharray: hLen,  strokeDashoffset: hLen });
        gsap.set(legL, { strokeDasharray: llLen, strokeDashoffset: llLen });
        gsap.set(legR, { strokeDasharray: lrLen, strokeDashoffset: lrLen });
        gsap.set(fill, { opacity: 0 });
        // Holographic layers: start small (deep) and blurred
        gsap.set(l3, { opacity: 0, scale: L3S, transformOrigin: "24px 24px", filter: "blur(1.8px)" });
        gsap.set(l2, { opacity: 0, scale: L2S, transformOrigin: "24px 24px", filter: "blur(0.7px)" });

        const tl = gsap.timeline({ delay: 0.15 });

        // ── Phase 1: Hex outline draws (1.05s) ──
        tl.to(hex,  { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" }, 0)
          .to(fill, { opacity: 0.95,        duration: 0.95, ease: "power2.out"  }, 0.12)
          // Legs shoot from apex as hex finishes
          .to(legL, { strokeDashoffset: 0, duration: 0.52, ease: "power3.out"  }, 1.0)
          .to(legR, { strokeDashoffset: 0, duration: 0.52, ease: "power3.out"  }, 1.12)

        // ── Phase 3: Holographic layers materialize at depth (0.58s) ──
          .to(l3, { opacity: 0.4, duration: 0.58, ease: "power2.out" }, 2.1)
          .to(l2, { opacity: 0.5, duration: 0.58, ease: "power2.out" }, 2.1)

        // ── Phase 4: Layers converge forward from behind ──
          .to(l3, {
            scale: 1, opacity: 0.65, filter: "blur(0px)",
            duration: 1.7, ease: "expo.out",
          }, 2.68)
          .to(l2, {
            scale: 1, opacity: 0.75, filter: "blur(0px)",
            duration: 1.5, ease: "expo.out",
          }, 3.03)

        // ── Phase 5: Layers dissolve after merge ──
          .to(l3, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 4.9)
          .to(l2, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 4.9);
      });
      cleanup = () => ctx.revert();
    });

    return () => { mounted = false; cleanup?.(); };
  }, [animated]);

  const mark_el = (
    <svg
      width={mark}
      height={mark}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B4BDD2" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.08" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Layer 3 — back depth (teal) */}
      <g ref={layer3Ref} opacity={0}>
        <path d={HEX} stroke="#4ECDC4" strokeWidth="1" fill="none" />
        <path d={LEG_L} stroke="#4ECDC4" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} fill="none" />
        <path d={LEG_R} stroke="#4ECDC4" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} fill="none" />
      </g>

      {/* Layer 2 — mid depth (orange) */}
      <g ref={layer2Ref} opacity={0}>
        <path d={HEX} stroke="#B4BDD2" strokeWidth="1.2" fill="rgba(180,189,210,0.05)" />
        <path d={LEG_L} stroke="#B4BDD2" strokeWidth="1.4" strokeLinecap="round" opacity={0.6} fill="none" />
        <path d={LEG_R} stroke="#B4BDD2" strokeWidth="1.4" strokeLinecap="round" opacity={0.6} fill="none" />
      </g>

      {/* Layer 1 — main mark */}
      <path
        ref={hexFillRef}
        d={HEX}
        fill={`url(#${uid}-fill)`}
        opacity={animated ? 0 : 0.95}
      />
      <path
        ref={hexRef}
        d={HEX}
        stroke="#B4BDD2"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        filter={`url(#${uid}-glow)`}
      />
      <path
        ref={legLRef}
        d={LEG_L}
        stroke="#B4BDD2"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        ref={legRRef}
        d={LEG_R}
        stroke="#B4BDD2"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  const wordmark = (
    <span
      className={`font-[family-name:var(--font-syne)] leading-none tracking-[-0.3px] ${text}`}
      style={{ fontWeight: 800 }}
    >
      AXUS<span style={{ color: "#B4BDD2" }}>IA</span>
    </span>
  );

  const content = (
    <span className={`inline-flex items-center gap-[10px] ${className}`}>
      {mark_el}
      {wordmark}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
