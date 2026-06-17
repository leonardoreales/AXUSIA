import { Resend } from "resend";
import type { ContactFormData } from "@/types";
import { WA_BASE } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(text: string): string {
  return text.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] ?? c)
  );
}

export async function sendContactEmail(data: ContactFormData) {
  const { nombre, empresa, whatsapp, email, sector, interes, proceso } = data;

  const html = `
    <h2>Nueva solicitud de diagnóstico — AXUSIA</h2>
    <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td><strong>Nombre</strong></td><td>${esc(nombre)}</td></tr>
      <tr><td><strong>Empresa</strong></td><td>${esc(empresa)}</td></tr>
      <tr><td><strong>WhatsApp</strong></td><td>${esc(whatsapp)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${esc(email)}</td></tr>
      <tr><td><strong>Sector</strong></td><td>${esc(sector)}</td></tr>
      <tr><td><strong>Interés</strong></td><td>${esc(interes)}</td></tr>
    </table>
    <h3>Proceso actual</h3>
    <p style="background:#f5f5f5;padding:16px;border-radius:8px">${esc(proceso).replace(/\n/g, "<br/>")}</p>
  `;

  return resend.emails.send({
    from: "AXUSIA <noreply@axusai.co>",
    to: ["hola@axusai.co"],
    replyTo: email,
    subject: `Diagnóstico: ${nombre} — ${empresa}`,
    html,
  });
}

export async function sendConfirmationEmail(to: string, nombre: string) {
  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <div style="background:#080B10;padding:32px;text-align:center;border-radius:4px 4px 0 0">
        <h1 style="color:#F0EEE8;font-size:28px;margin:0;letter-spacing:-1px">AXUSIA</h1>
        <p style="color:#7A8398;font-size:13px;margin:8px 0 0">Automatización con IA para tu negocio</p>
      </div>
      <div style="background:#ffffff;padding:40px 32px;border-radius:0 0 4px 4px;border:1px solid #e5e5e5;border-top:none">
        <h2 style="font-size:22px;margin:0 0 16px;color:#111">Hola, ${esc(nombre)} 👋</h2>
        <p style="color:#444;line-height:1.6;margin:0 0 24px">
          Recibimos tu solicitud de diagnóstico. En <strong>menos de 2 horas hábiles</strong> te contactamos
          por WhatsApp o email para coordinar una llamada de 30 minutos sin costo.
        </p>
        <div style="background:#f8f8f8;border-left:3px solid #E8943A;padding:20px 24px;border-radius:0 4px 4px 0;margin-bottom:28px">
          <p style="margin:0 0 12px;font-weight:600;font-size:14px;color:#111">Lo que pasa ahora:</p>
          <ol style="margin:0;padding-left:20px;color:#555;font-size:14px;line-height:1.8">
            <li>Revisamos la información de tu proceso</li>
            <li>Te escribimos para agendar el diagnóstico</li>
            <li>Llamada de 30 min — gratis, sin compromiso</li>
            <li>Te enviamos propuesta por escrito</li>
          </ol>
        </div>
        <p style="color:#888;font-size:13px;margin:0 0 24px">
          ¿Tienes algo urgente? Escríbenos directamente por WhatsApp:
          <br/>
          <a href="${WA_BASE}" style="color:#E8943A;text-decoration:none;font-weight:600">Abrir WhatsApp</a>
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:0 0 24px"/>
        <p style="color:#aaa;font-size:12px;margin:0;text-align:center">
          AXUSIA · Barranquilla, Colombia · axusai.co
        </p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: "AXUSIA <noreply@axusai.co>",
    to: [to],
    subject: "Recibimos tu solicitud — AXUSIA",
    html,
  });
}
