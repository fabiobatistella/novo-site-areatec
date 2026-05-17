import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = "https://zqyvrktovkhxjrfospjm.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const EMAIL_TO = ["comercial@areatec.com.br", "contato@areatec.com.br"];
const EMAIL_CC = ["fbatistella@areatec.com.br"];

async function sendContactEmail(data: { nome: string; email: string; whatsapp: string; interesse: string; cidade: string; cargo: string; mensagem: string; lang: string; }) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({ host: smtpHost, port: parseInt(process.env.SMTP_PORT || "587"), secure: false, auth: { user: smtpUser, pass: smtpPass } });
    const htmlBody = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto"><div style="background:#2F6FD0;padding:20px;border-radius:8px 8px 0 0"><h2 style="color:white;margin:0">Novo contato via site Areatec</h2></div><div style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 0 8px 8px"><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px 0;font-weight:bold;color:#475569">Nome:</td><td style="padding:8px 0;color:#1e293b">${data.nome}</td></tr><tr><td style="padding:8px 0;font-weight:bold;color:#475569">E-mail:</td><td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#2F6FD0">${data.email}</a></td></tr><tr><td style="padding:8px 0;font-weight:bold;color:#475569">WhatsApp:</td><td style="padding:8px 0;color:#1e293b">${data.whatsapp||"N/A"}</td></tr><tr><td style="padding:8px 0;font-weight:bold;color:#475569">Interesse:</td><td style="padding:8px 0;color:#1e293b">${data.interesse}</td></tr><tr><td style="padding:8px 0;font-weight:bold;color:#475569">Cidade:</td><td style="padding:8px 0;color:#1e293b">${data.cidade||"N/A"}</td></tr><tr><td style="padding:8px 0;font-weight:bold;color:#475569">Cargo:</td><td style="padding:8px 0;color:#1e293b">${data.cargo||"N/A"}</td></tr></table><div style="margin-top:16px;padding:16px;background:white;border-radius:8px;border:1px solid #e2e8f0"><p style="font-weight:bold;color:#475569;margin:0 0 8px 0">Mensagem:</p><p style="color:#1e293b;margin:0;white-space:pre-wrap">${data.mensagem}</p></div><p style="margin-top:16px;font-size:12px;color:#94a3b8">Idioma: ${data.lang.toUpperCase()} | ${new Date().toISOString()}</p></div></div>`;
    await transporter.sendMail({ from: `"Areatec Website" <${smtpUser}>`, to: EMAIL_TO.join(", "), cc: EMAIL_CC.join(", "), replyTo: data.email, subject: `[Site Areatec] Novo contato: ${data.nome} - ${data.interesse}`, html: htmlBody });
    return true;
  }
  return false;
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json());

  app.post("/api/contact", async (req, res) => {
    try {
      const { nome, email, whatsapp, interesse, cidade, cargo, mensagem, lang } = req.body;
      if (!nome || !email || !interesse || !mensagem) return res.status(400).json({ error: "Missing required fields" });
      const { error: dbError } = await supabase.from("contact_leads").insert({ nome, email, whatsapp: whatsapp || null, interesse, cidade: cidade || null, cargo: cargo || null, mensagem, lang: lang || "pt", created_at: new Date().toISOString(), source: "website" });
      if (dbError) console.error("Supabase insert error:", dbError);
      try { await sendContactEmail({ nome, email, whatsapp, interesse, cidade, cargo, mensagem, lang }); } catch (emailErr) { console.error("Email send error:", emailErr); }
      return res.json({ success: true });
    } catch (err) {
      console.error("Contact API error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));
  app.get("*", (_req, res) => { res.sendFile(path.join(staticPath, "index.html")); });
  const port = process.env.PORT || 3000;
  server.listen(port, () => { console.log(`Server running on http://localhost:${port}/`); });
}

startServer().catch(console.error);
