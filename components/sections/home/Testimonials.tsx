import { Eyebrow } from "@/components/ui/Eyebrow";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-surface">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, rgba(180,189,210,0.04) 0%, transparent 55%)",
        }}
      />

      {/* Top border fade */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      {/* Header */}
      <div className="container mb-14 lg:mb-20">
        <div className="flex flex-col gap-4 max-w-[520px]">
          <Eyebrow>Clientes</Eyebrow>
          <h2 className="t-head text-[clamp(1.75rem,4vw,2.75rem)]">
            Lo que dicen quienes ya automatizaron
          </h2>
        </div>
      </div>

      {/* Full-width stagger carousel */}
      <StaggerTestimonials />
    </section>
  );
}
