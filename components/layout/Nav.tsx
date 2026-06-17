"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  /* ─── Scroll behavior ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── GSAP cinematic entrance ─────────────────────────── */
  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-nav-item]", {
        y: -18,
        opacity: 0,
        stagger: 0.065,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.2,
        clearProps: "all",
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  /* ─── Body lock ───────────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Main nav bar ─────────────────────────────────── */}
      <motion.header
        ref={navRef}
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-[background,border-color,backdrop-filter] duration-300
          ${scrolled
            ? "bg-[rgba(8,11,16,0.82)] backdrop-blur-2xl border-b border-border"
            : "bg-transparent"
          }
        `}
      >
        <div className="container">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <div data-nav-item>
              <Logo size="md" animated href="/" />
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    data-nav-item
                    className={`
                      relative py-1 text-sm
                      font-[family-name:var(--font-syne)] font-medium
                      transition-colors duration-200 outline-none
                      focus-visible:text-accent
                      ${active ? "text-accent" : "text-muted hover:text-text"}
                    `}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-px left-0 right-0 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: CTA + hamburger */}
            <div className="flex items-center gap-3">
              <div
                data-nav-item
                className="hidden xl:flex items-center gap-2 px-3 py-2
                           font-[family-name:var(--font-syne)] text-[11px] font-semibold
                           uppercase tracking-[0.14em] text-teal"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M20 10c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                Barranquilla
              </div>

              <div data-nav-item className="hidden md:block">
                <Button variant="primary" size="sm" href="/contacto">
                  Agendar diagnóstico
                </Button>
              </div>

              {/* Hamburger button */}
              <button
                data-nav-item
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden relative w-11 h-11 flex items-center justify-center
                           rounded-sm transition-colors duration-200 hover:bg-[rgba(255,255,255,0.05)]"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                <span className="relative w-5 h-4 flex flex-col justify-between">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute w-5 h-px bg-text left-0 origin-center"
                      style={{ top: i === 0 ? 0 : i === 1 ? 7 : 14 }}
                      animate={
                        menuOpen
                          ? {
                              rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                              y: i === 0 ? 7 : i === 2 ? -7 : 0,
                              opacity: i === 1 ? 0 : 1,
                            }
                          : { rotate: 0, y: 0, opacity: 1 }
                      }
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ))}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile full-screen overlay ───────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col"
          >
            {/* Subtle grid pattern */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(180,189,210,0.4) 1px, transparent 1px), " +
                  "linear-gradient(90deg, rgba(180,189,210,0.4) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />

            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(180,189,210,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Links */}
            <nav
              className="relative flex-1 flex flex-col items-start justify-center
                         container gap-6 pt-20"
              aria-label="Menú móvil"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{
                    duration: 0.48,
                    delay: i * 0.07 + 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      t-display text-[clamp(2.5rem,8vw,4rem)]
                      transition-colors duration-200 leading-tight
                      ${pathname === link.href
                        ? "text-accent"
                        : "text-text hover:text-accent"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.48, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <Button variant="primary" size="lg" href="/contacto">
                  Agendar diagnóstico
                </Button>
              </motion.div>
            </nav>

            {/* Bottom accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-px bg-[rgba(180,189,210,0.2)] origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
