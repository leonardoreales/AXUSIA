import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#080B10",
          padding: "80px 96px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Amber glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(180,189,210,0.22) 0%, transparent 65%)",
          }}
        />
        {/* Teal glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(78,205,196,0.14) 0%, transparent 65%)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#B4BDD2",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "#B4BDD2" }} />
            Automatización IA · Colombia
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 800,
              color: "#F0EEE8",
              lineHeight: 1,
              letterSpacing: "-3px",
            }}
          >
            AXUSIA
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 300,
              color: "rgba(240,238,232,0.65)",
              lineHeight: 1.3,
              maxWidth: "680px",
            }}
          >
            Tu negocio trabajando solo mientras tú duermes.
          </div>

          {/* Pills */}
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {["Agente WhatsApp IA", "Automatización Contable", "Captura de Leads"].map((label) => (
              <div
                key={label}
                style={{
                  padding: "8px 16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  background: "rgba(255,255,255,0.03)",
                  color: "#7A8398",
                  fontSize: "13px",
                  fontWeight: 400,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Domain bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "96px",
            fontSize: "18px",
            color: "rgba(240,238,232,0.25)",
            fontWeight: 400,
            letterSpacing: "1px",
          }}
        >
          axusai.co
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
