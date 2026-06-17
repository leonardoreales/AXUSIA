import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, WA_BASE, SOCIAL_LINKS } from "@/lib/constants";

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-bg">
      {/* Subtle top glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[480px] max-w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(180,189,210,0.35), transparent)",
        }}
      />

      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_auto]">

          {/* ─── Brand column ───────────────────────── */}
          <div className="flex flex-col gap-5 max-w-[280px]">
            <Logo size="md" animated={false} href="/" />
            <p className="text-sm text-muted leading-relaxed font-[family-name:var(--font-dm)]">
              Automatización con inteligencia artificial para empresas en
              Barranquilla y el Caribe colombiano.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={WA_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2.5 w-fit
                px-4 py-2.5 rounded-[4px]
                border border-[rgba(255,255,255,0.08)]
                bg-[rgba(255,255,255,0.03)]
                text-[13px] font-[family-name:var(--font-syne)] font-medium
                text-text
                transition-all duration-200
                hover:border-[rgba(78,205,196,0.3)] hover:text-teal
                hover:bg-[rgba(78,205,196,0.04)]
              "
            >
              {/* WhatsApp icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="shrink-0 text-teal"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
              </svg>
              Escríbenos por WhatsApp
            </a>

            {/* Social links */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    w-8 h-8 flex items-center justify-center rounded-[2px]
                    border border-[rgba(255,255,255,0.07)]
                    text-muted transition-all duration-200
                    hover:text-text hover:border-[rgba(255,255,255,0.15)]
                    hover:bg-[rgba(255,255,255,0.03)]
                  "
                >
                  {social.icon === "linkedin" ? <LinkedInIcon /> : <InstagramIcon />}
                </a>
              ))}
            </div>
          </div>

          {/* ─── Navigation ─────────────────────────── */}
          <div className="flex flex-col gap-4">
            <p className="t-label text-[10px] mb-1">Navegación</p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="
                    text-sm font-[family-name:var(--font-dm)]
                    text-muted transition-colors duration-150
                    hover:text-text
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ─── Contact info ────────────────────────── */}
          <div className="flex flex-col gap-4">
            <p className="t-label text-[10px] mb-1">Contacto</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hola@axusai.co"
                className="
                  text-sm font-[family-name:var(--font-dm)]
                  text-muted transition-colors duration-150
                  hover:text-accent
                "
              >
                hola@axusai.co
              </a>
              <p className="text-sm font-[family-name:var(--font-dm)] text-muted">
                Barranquilla, Colombia
              </p>
              <p className="text-sm font-[family-name:var(--font-dm)] text-muted">
                Lun–Vie · 8am – 6pm
              </p>
            </div>
          </div>
        </div>

        {/* ─── Bottom bar ─────────────────────────────── */}
        <div className="mt-14 pt-6 border-t border-[rgba(255,255,255,0.05)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-muted font-[family-name:var(--font-dm)]">
              © {year} AXUSIA · Barranquilla, Colombia ·{" "}
              <span className="text-muted2">axusai.co</span>
            </p>
            <p className="text-[11px] text-muted2 font-[family-name:var(--font-dm)]">
              Automatización IA · Agentes · Integraciones
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
