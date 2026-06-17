const COLUMNS = [
  {
    label: "Nuevo",
    count: 3,
    color: "#E8943A",
    leads: [
      { name: "C. Martínez", source: "Instagram" },
      { name: "R. Pérez",    source: "Web"       },
      { name: "M. García",   source: "WhatsApp"  },
    ],
  },
  {
    label: "Calificado",
    count: 2,
    color: "#4ECDC4",
    leads: [
      { name: "A. López",   source: "Facebook" },
      { name: "J. Torres",  source: "Web"      },
    ],
  },
  {
    label: "Cerrado",
    count: 1,
    color: "#F0EEE8",
    leads: [
      { name: "L. Vargas", source: "WhatsApp" },
    ],
  },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2);
}

export function LeadsDemo() {
  return (
    <div
      className="w-full max-w-[300px] rounded-[6px] overflow-hidden select-none"
      style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.07)" }}
      aria-hidden
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: "#0d1f38", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#F0EEE8", fontFamily: "sans-serif" }}>
          Pipeline · Esta semana
        </span>
        <span style={{ fontSize: "10px", color: "#7A8398", fontFamily: "sans-serif" }}>
          6 leads
        </span>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-3 gap-px p-2" style={{ background: "rgba(255,255,255,0.03)" }}>
        {COLUMNS.map((col) => (
          <div
            key={col.label}
            className="flex flex-col gap-1.5 p-2 rounded-[4px]"
            style={{ background: "#0a1628" }}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-0.5">
              <span style={{ fontSize: "9px", color: col.color, fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {col.label}
              </span>
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: `${col.color}18`, fontSize: "9px", color: col.color, fontFamily: "sans-serif", fontWeight: 700 }}
              >
                {col.count}
              </span>
            </div>

            {/* Lead chips */}
            {col.leads.map((lead) => (
              <div
                key={lead.name}
                className="flex flex-col gap-0.5 px-2 py-1.5 rounded-[3px]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderLeft: `2px solid ${col.color}50`,
                }}
              >
                <span style={{ fontSize: "10px", color: "#F0EEE8", fontFamily: "sans-serif", fontWeight: 500 }}>
                  {getInitials(lead.name)}. {lead.name.split(" ")[1]}
                </span>
                <span style={{ fontSize: "9px", color: "#4A5168", fontFamily: "sans-serif" }}>
                  {lead.source}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2.5 flex items-center gap-1.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#E8943A" }} />
        <span style={{ fontSize: "10px", color: "#7A8398", fontFamily: "sans-serif" }}>
          12 leads capturados este mes
        </span>
      </div>
    </div>
  );
}
