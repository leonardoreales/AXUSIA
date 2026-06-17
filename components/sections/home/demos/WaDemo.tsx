export function WaDemo() {
  return (
    <div
      className="w-full max-w-[280px] rounded-[6px] overflow-hidden select-none"
      style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.07)" }}
      aria-hidden
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "#0d1f38", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[12px]"
          style={{ background: "rgba(180,189,210,0.15)", color: "#B4BDD2", fontFamily: "sans-serif", fontWeight: 700 }}
        >
          A
        </div>
        <div className="flex flex-col gap-0.5">
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#F0EEE8", fontFamily: "sans-serif" }}>AXUSIA Bot</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ECDC4" }} />
            <span style={{ fontSize: "10px", color: "#4ECDC4", fontFamily: "sans-serif" }}>En línea</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2.5 px-3 py-4">
        {/* User */}
        <div className="flex justify-end">
          <div
            className="px-3 py-2 rounded-[8px] rounded-br-[2px] max-w-[180px]"
            style={{ background: "rgba(180,189,210,0.18)", fontSize: "12px", color: "#F0EEE8", fontFamily: "sans-serif", lineHeight: 1.4 }}
          >
            ¿Tienen disponibilidad para mañana?
          </div>
        </div>

        {/* Bot */}
        <div className="flex justify-start">
          <div
            className="px-3 py-2 rounded-[8px] rounded-bl-[2px] max-w-[200px]"
            style={{ background: "rgba(255,255,255,0.06)", fontSize: "12px", color: "#F0EEE8", fontFamily: "sans-serif", lineHeight: 1.4 }}
          >
            ¡Hola! 👋 Sí tenemos espacio. ¿A qué hora te viene bien?
          </div>
        </div>

        {/* User */}
        <div className="flex justify-end">
          <div
            className="px-3 py-2 rounded-[8px] rounded-br-[2px]"
            style={{ background: "rgba(180,189,210,0.18)", fontSize: "12px", color: "#F0EEE8", fontFamily: "sans-serif", lineHeight: 1.4 }}
          >
            A las 10am
          </div>
        </div>

        {/* Bot confirm */}
        <div className="flex justify-start">
          <div
            className="px-3 py-2 rounded-[8px] rounded-bl-[2px] max-w-[200px]"
            style={{ background: "rgba(255,255,255,0.06)", fontSize: "12px", color: "#F0EEE8", fontFamily: "sans-serif", lineHeight: 1.4 }}
          >
            ✅ Cita confirmada para mañana a las 10:00am. Te recuerdo esta noche.
          </div>
        </div>
      </div>

      {/* Footer tag */}
      <div
        className="px-4 py-2.5 flex items-center gap-1.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0a1628" }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ECDC4" }} />
        <span style={{ fontSize: "10px", color: "#4ECDC4", fontFamily: "sans-serif", letterSpacing: "0.05em" }}>
          Automatizado · 0 intervención humana
        </span>
      </div>
    </div>
  );
}
