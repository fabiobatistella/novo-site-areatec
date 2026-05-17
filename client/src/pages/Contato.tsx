// Contato — Professional contact form with Supabase integration
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contato Areatec",
  "url": "https://www.areatec.com.br/contato",
  "mainEntity": {
    "@type": "Organization",
    "name": "Areatec",
    "telephone": "+551920421373",
    "email": "comercial@areatec.com.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Tiradentes, 700",
      "addressLocality": "Araras",
      "addressRegion": "SP",
      "postalCode": "13600-000",
      "addressCountry": "BR",
    },
  },
};

const interestOptions = {
  pt: [
    { value: "", label: "Selecione seu interesse" },
    { value: "olhovivo-patrol", label: "Olho Vivo Patrol (Fiscalização de Trânsito)" },
    { value: "olhovivo-parking", label: "Olho Vivo Parking (Estacionamento Rotativo)" },
    { value: "geotrust", label: "GeoTrust (Geolocalização Autenticada)" },
    { value: "areachain", label: "AreaChain (Blockchain / Cadeia de Custódia)" },
    { value: "areaface", label: "AreaFace (Reconhecimento Facial)" },
    { value: "zeladoria", label: "Zeladoria Urbana Inteligente" },
    { value: "licitacao", label: "Licitação / Edital" },
    { value: "parceria", label: "Parceria Comercial / Consórcio" },
    { value: "outro", label: "Outro" },
  ],
  en: [
    { value: "", label: "Select your interest" },
    { value: "olhovivo-patrol", label: "Olho Vivo Patrol (Traffic Enforcement)" },
    { value: "olhovivo-parking", label: "Olho Vivo Parking (Rotary Parking)" },
    { value: "geotrust", label: "GeoTrust (Authenticated Geolocation)" },
    { value: "areachain", label: "AreaChain (Blockchain / Chain of Custody)" },
    { value: "areaface", label: "AreaFace (Facial Recognition)" },
    { value: "zeladoria", label: "Intelligent Urban Stewardship" },
    { value: "licitacao", label: "Tender / RFP" },
    { value: "parceria", label: "Commercial Partnership / Consortium" },
    { value: "outro", label: "Other" },
  ],
  es: [
    { value: "", label: "Seleccione su interés" },
    { value: "olhovivo-patrol", label: "Olho Vivo Patrol (Fiscalización de Tránsito)" },
    { value: "olhovivo-parking", label: "Olho Vivo Parking (Estacionamiento Rotativo)" },
    { value: "geotrust", label: "GeoTrust (Geolocalización Autenticada)" },
    { value: "areachain", label: "AreaChain (Blockchain / Cadena de Custodia)" },
    { value: "areaface", label: "AreaFace (Reconocimiento Facial)" },
    { value: "zeladoria", label: "Gestión Urbana Inteligente" },
    { value: "licitacao", label: "Licitación" },
    { value: "parceria", label: "Alianza Comercial / Consorcio" },
    { value: "outro", label: "Otro" },
  ],
};

const labels = {
  pt: {
    pageTitle: "Fale Conosco",
    pageSubtitle: "Entre em contato com nossa equipe comercial. Responderemos em até 24 horas.",
    nome: "Nome completo",
    email: "E-mail corporativo",
    whatsapp: "WhatsApp (com DDD)",
    interesse: "Interesse",
    cidade: "Cidade / País",
    cargo: "Cargo / Função",
    mensagem: "Mensagem",
    enviar: "Enviar mensagem",
    enviando: "Enviando...",
    sucesso: "Mensagem enviada com sucesso. Nossa equipe entrará em contato em breve.",
    erro: "Ocorreu um erro ao enviar. Tente novamente ou entre em contato por telefone.",
    telefone: "Telefone",
    whatsappLabel: "WhatsApp",
    emailLabel: "E-mail",
    enderecoLabel: "Endereço",
    endereco: "Rua Tiradentes, 700\nAraras, SP 13600-000",
    horario: "Seg-Sex: 8h-18h",
    seoTitle: "Contato — Areatec | Fale com nossa equipe comercial",
    seoDesc: "Entre em contato com a Areatec para soluções de fiscalização de trânsito, estacionamento rotativo e cidades inteligentes. Atendimento comercial e técnico.",
  },
  en: {
    pageTitle: "Contact Us",
    pageSubtitle: "Get in touch with our sales team. We will respond within 24 hours.",
    nome: "Full name",
    email: "Corporate email",
    whatsapp: "WhatsApp (with country code)",
    interesse: "Interest",
    cidade: "City / Country",
    cargo: "Position / Role",
    mensagem: "Message",
    enviar: "Send message",
    enviando: "Sending...",
    sucesso: "Message sent successfully. Our team will contact you shortly.",
    erro: "An error occurred while sending. Please try again or contact us by phone.",
    telefone: "Phone",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    enderecoLabel: "Address",
    endereco: "Rua Tiradentes, 700\nAraras, SP 13600-000, Brazil",
    horario: "Mon-Fri: 8am-6pm (BRT)",
    seoTitle: "Contact — Areatec | Talk to our sales team",
    seoDesc: "Contact Areatec for traffic enforcement, rotary parking, and smart city solutions. Commercial and technical support.",
  },
  es: {
    pageTitle: "Contáctenos",
    pageSubtitle: "Comuníquese con nuestro equipo comercial. Responderemos en hasta 24 horas.",
    nome: "Nombre completo",
    email: "Correo corporativo",
    whatsapp: "WhatsApp (con código de país)",
    interesse: "Interés",
    cidade: "Ciudad / País",
    cargo: "Cargo / Función",
    mensagem: "Mensaje",
    enviar: "Enviar mensaje",
    enviando: "Enviando...",
    sucesso: "Mensaje enviado con éxito. Nuestro equipo se comunicará pronto.",
    erro: "Ocurrió un error al enviar. Intente nuevamente o comuníquese por teléfono.",
    telefone: "Teléfono",
    whatsappLabel: "WhatsApp",
    emailLabel: "Correo",
    enderecoLabel: "Dirección",
    endereco: "Rua Tiradentes, 700\nAraras, SP 13600-000, Brasil",
    horario: "Lun-Vie: 8h-18h (BRT)",
    seoTitle: "Contacto — Areatec | Hable con nuestro equipo comercial",
    seoDesc: "Contacte a Areatec para soluciones de fiscalización de tránsito, estacionamiento rotativo y ciudades inteligentes. Atención comercial y técnica.",
  },
};

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contato() {
  const { lang } = useLanguage();
  const l = labels[lang];
  const options = interestOptions[lang];

  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    interesse: "",
    cidade: "",
    cargo: "",
    mensagem: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ nome: "", email: "", whatsapp: "", interesse: "", cidade: "", cargo: "", mensagem: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/30 focus:border-[#2F6FD0] transition-all duration-200 text-sm";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <>
      <SEOHead title={l.seoTitle} description={l.seoDesc} path="/contato" jsonLd={contactSchema} />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="relative pt-28 pb-12 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-800 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-10 w-96 h-96 bg-[#2F6FD0]/10 rounded-full blur-[120px]" />
            </div>
            <div className="container relative text-center max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-block text-xs font-semibold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  CORTEX Areatec
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {l.pageTitle}
                </h1>
                <p className="text-lg text-white/60 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {l.pageSubtitle}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Form + Contact Info */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="container max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2"
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="nome" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.nome}</label>
                        <input type="text" id="nome" name="nome" required value={form.nome} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.email}</label>
                        <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="whatsapp" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.whatsapp}</label>
                        <input type="tel" id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={handleChange} className={inputClass} placeholder="+55 11 99128-7417" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      </div>
                      <div>
                        <label htmlFor="interesse" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.interesse}</label>
                        <select id="interesse" name="interesse" required value={form.interesse} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {options.map((opt) => (
                            <option key={opt.value} value={opt.value} disabled={opt.value === ""}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="cidade" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.cidade}</label>
                        <input type="text" id="cidade" name="cidade" value={form.cidade} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      </div>
                      <div>
                        <label htmlFor="cargo" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.cargo}</label>
                        <input type="text" id="cargo" name="cargo" value={form.cargo} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="mensagem" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.mensagem}</label>
                      <textarea id="mensagem" name="mensagem" required rows={5} value={form.mensagem} onChange={handleChange} className={`${inputClass} resize-none`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                    </div>

                    {status === "success" && (
                      <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
                        <CheckCircle className="w-5 h-5 shrink-0" />
                        {l.sucesso}
                      </div>
                    )}
                    {status === "error" && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {l.erro}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2F6FD0] text-white font-semibold rounded-lg shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:bg-[#2563C4] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {status === "sending" ? l.enviando : l.enviar}
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>

                {/* Contact Info Sidebar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.telefone}</p>
                        <a href="tel:+551920421373" className="text-sm font-semibold text-slate-900 hover:text-[#2F6FD0] transition-colors">(19) 2042-1373</a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.whatsappLabel}</p>
                        <a href="https://wa.me/5511991287417" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors">(11) 99128-7417</a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.emailLabel}</p>
                        <a href="mailto:comercial@areatec.com.br" className="text-sm font-semibold text-slate-900 hover:text-[#2F6FD0] transition-colors">comercial@areatec.com.br</a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.enderecoLabel}</p>
                        <p className="text-sm font-semibold text-slate-900 whitespace-pre-line">{l.endereco}</p>
                        <p className="text-xs text-slate-500 mt-1">{l.horario}</p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/5511991287417"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {lang === "en" ? "Chat on WhatsApp" : lang === "es" ? "Chatear por WhatsApp" : "Conversar no WhatsApp"}
                  </a>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
