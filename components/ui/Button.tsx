"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  href?: string;
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
}

const SIZES: Record<Size, string> = {
  sm: "h-9 px-5 text-xs",
  md: "h-11 px-7 text-sm",
  lg: "h-[54px] px-9 text-[15px]",
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(105deg,#6A7A98_0%,#A8B4C8_28%,#D8DCE6_52%,#FFFEF8_62%,#C8CED8_78%,#6A7A98_100%)] text-bg border border-[rgba(180,189,210,0.25)] shadow-[0_2px_16px_rgba(180,189,210,0.18)] hover:brightness-[1.07] hover:shadow-[0_4px_28px_rgba(180,189,210,0.32)]",
  secondary:
    "bg-transparent text-text border border-[rgba(255,255,255,0.18)] hover:border-accent hover:text-accent hover:shadow-[0_2px_12px_rgba(180,189,210,0.12)]",
  ghost:
    "bg-transparent text-muted hover:text-text border border-transparent",
};

const BASE =
  "relative inline-flex items-center justify-center gap-2 group overflow-hidden " +
  "font-[family-name:var(--font-syne)] font-semibold tracking-wide " +
  "rounded-[2px] cursor-pointer select-none " +
  "transition-colors duration-200 " +
  "outline-none focus-visible:ring-2 focus-visible:ring-accent " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  href,
  external,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 240, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 240, damping: 22, mass: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    const el = elRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.22);
    my.set((e.clientY - r.top - r.height / 2) * 0.22);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const disabledCls =
    disabled || loading ? "opacity-40 cursor-not-allowed pointer-events-none" : "";

  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${disabledCls} ${className}`.trim();

  const inner = loading ? (
    <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" className="opacity-75" />
    </svg>
  ) : (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  const shine = variant === "primary" && (
    <span
      aria-hidden
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent
                 transition-transform duration-400 ease-in-out group-hover:translate-x-full pointer-events-none"
    />
  );

  if (href) {
    return (
      <motion.div
        ref={elRef as React.Ref<HTMLDivElement>}
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.97 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="inline-flex"
      >
        <Link
          href={href}
          className={cls}
          aria-label={ariaLabel}
          onClick={onClick}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {shine}
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={elRef as React.Ref<HTMLButtonElement>}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      type={type}
      disabled={disabled || loading}
      className={cls}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {shine}
      {inner}
    </motion.button>
  );
}
