import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail, sendConfirmationEmail } from "@/lib/email";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const schema = z.object({
  nombre:   z.string().min(2),
  empresa:  z.string().min(2),
  whatsapp: z.string().min(7),
  email:    z.string().email(),
  sector:   z.string().min(1),
  interes:  z.string().min(1),
  proceso:  z.string().min(20),
});

// Only active when Upstash env vars are configured
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5, "1 h"),
        analytics: true,
      })
    : null;

export async function POST(req: NextRequest) {
  if (ratelimit) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Demasiadas solicitudes. Inténtalo de nuevo en 1 hora." },
        { status: 429 },
      );
    }
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);

    await sendContactEmail(data);

    // Fire-and-forget — don't fail the request if confirmation email errors
    sendConfirmationEmail(data.email, data.nombre).catch((err) => {
      console.error("[contacto/route] confirmation email failed:", err);
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos o inválidos." },
        { status: 400 },
      );
    }
    console.error("[contacto/route]", err);
    return NextResponse.json(
      { success: false, error: "Error interno. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
