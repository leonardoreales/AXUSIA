interface TagProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export function Tag({ children, className = "", accent = false }: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-1
        border rounded-[2px]
        text-[11px] font-[family-name:var(--font-syne)] font-medium tracking-wide
        transition-colors duration-150
        ${
          accent
            ? "bg-[rgba(232,148,58,0.08)] border-[rgba(232,148,58,0.2)] text-accent"
            : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-muted hover:border-[rgba(232,148,58,0.25)] hover:text-accent"
        }
        ${className}
      `}
    >
      {children}
    </span>
  );
}
