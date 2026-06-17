import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <section className="relative min-h-[80dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(232,148,58,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container relative flex flex-col items-center text-center gap-8 py-28">
        {/* 404 number */}
        <div
          className="t-display select-none"
          style={{
            fontSize: "clamp(6rem,18vw,12rem)",
            color: "rgba(240,238,232,0.04)",
            letterSpacing: "-4px",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          404
        </div>

        {/* Eyebrow + heading stacked over the 404 */}
        <div className="flex flex-col items-center gap-4 -mt-[clamp(4rem,12vw,8rem)]">
          <Eyebrow animate={false}>Error 404</Eyebrow>
          <h1 className="t-head text-[clamp(1.75rem,4vw,2.5rem)] max-w-[480px]">
            Esta página no existe
          </h1>
          <p className="text-muted font-[family-name:var(--font-dm)] text-[1rem] max-w-[360px] leading-relaxed">
            El enlace está roto o la URL no es válida. Desde aquí puedes
            volver al inicio.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" href="/">
            Volver al inicio
          </Button>
          <Button variant="ghost" href="/servicios">
            Ver servicios
          </Button>
        </div>
      </div>
    </section>
  );
}
