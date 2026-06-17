"use client";

interface ChipProps {
  label?: string;
  variant?: "available" | "live" | "soon";
  className?: string;
}

const VARIANTS = {
  available: {
    dot: "bg-teal animate-[blink_2s_ease-in-out_infinite]",
    container: "bg-[rgba(78,205,196,0.07)] border-[rgba(78,205,196,0.2)] text-teal",
  },
  live: {
    dot: "bg-accent animate-[blink_1.5s_ease-in-out_infinite]",
    container: "bg-[rgba(180,189,210,0.07)] border-[rgba(180,189,210,0.2)] text-accent",
  },
  soon: {
    dot: "bg-muted",
    container: "bg-[rgba(122,131,152,0.07)] border-[rgba(122,131,152,0.15)] text-muted",
  },
};

export function Chip({
  label = "Disponible en Barranquilla",
  variant = "available",
  className = "",
}: ChipProps) {
  const v = VARIANTS[variant];
  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-3 py-[7px]
        border rounded-full
        text-[10px] font-[family-name:var(--font-syne)] font-semibold
        tracking-[1.5px] uppercase
        ${v.container}
        ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${v.dot}`} />
      {label}
    </span>
  );
}
