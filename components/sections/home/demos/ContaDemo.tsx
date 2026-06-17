const ROWS = [
  { label: "Factura #2341 · Proveedor A", value: "$1.200.000", status: "Registrada", accent: false },
  { label: "Factura #2342 · Servicios X",  value: "$480.000",  status: "Registrada", accent: false },
  { label: "Gasto operativo · Junio",       value: "$320.000",  status: "Registrada", accent: false },
  { label: "Total cobrado · Junio 2025",    value: "$4.200.000", status: "Procesado",  accent: true  },
];

export function ContaDemo() {
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
          Reporte · Junio 2025
        </span>
        <div
          className="px-2 py-0.5 rounded-[2px]"
          style={{ background: "rgba(78,205,196,0.12)", fontSize: "9px", color: "#4ECDC4", fontFamily: "sans-serif", letterSpacing: "0.08em", fontWeight: 600 }}
        >
          AUTO
        </div>
      </div>

      {/* Column headers */}
      <div
        className="grid px-4 py-1.5"
        style={{ gridTemplateColumns: "1fr auto auto", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        {["Concepto", "Monto", "Estado"].map((h) => (
          <span key={h} style={{ fontSize: "9px", color: "#4A5168", fontFamily: "sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {ROWS.map((row) => (
        <div
          key={row.label}
          className="grid px-4 py-2 items-center"
          style={{
            gridTemplateColumns: "1fr auto auto",
            gap: "8px",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
            background: row.accent ? "rgba(78,205,196,0.06)" : "transparent",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: row.accent ? "#F0EEE8" : "rgba(240,238,232,0.6)",
              fontFamily: "sans-serif",
              fontWeight: row.accent ? 600 : 400,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.label}
          </span>
          <span
            style={{
              fontSize: "11px",
              color: row.accent ? "#4ECDC4" : "#F0EEE8",
              fontFamily: "sans-serif",
              fontWeight: row.accent ? 700 : 500,
              whiteSpace: "nowrap",
            }}
          >
            {row.value}
          </span>
          <div className="flex items-center gap-1 justify-end">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: row.accent ? "#4ECDC4" : "rgba(78,205,196,0.5)" }}
            />
            <span
              style={{
                fontSize: "9px",
                color: row.accent ? "#4ECDC4" : "#4A5168",
                fontFamily: "sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {row.status}
            </span>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div
        className="px-4 py-2.5 flex items-center gap-1.5"
        style={{ background: "rgba(78,205,196,0.04)" }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ECDC4" }} />
        <span style={{ fontSize: "10px", color: "#4ECDC4", fontFamily: "sans-serif", letterSpacing: "0.04em" }}>
          Generado por n8n · 0 entrada manual
        </span>
      </div>
    </div>
  );
}
