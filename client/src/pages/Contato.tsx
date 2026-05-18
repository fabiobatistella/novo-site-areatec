// Contato — Professional contact page with visual interest cards + Supabase direct integration
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle, Car, ParkingCircle, Cpu, Handshake, MessageSquare, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

// ─── Supabase Config ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://zqyvrktovkhxjrfospjm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxeXZya3RvdmtoeGpyZm9zcGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzE1NDEsImV4cCI6MjA4OTQ0NzU0MX0.vTUrIQWQS88DDok7G4xHptzlCmxLfbSpygF7TYTifdo";

// ─── Schema.org ───────────────────────────────────────────────────────────────
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
      "streetAddress": "Rua Santos Dumont, 444, Vila Bressan",
      "addressLocality": "Araras",
      "addressRegion": "SP",
      "postalCode": "13600-650",
      "addressCountry": "BR",
    },
  },
};

// ─── Interest Cards Data ──────────────────────────────────────────────────────
interface InterestCard {
  value: string;
  icon: React.ReactNode;
  label: { pt: string; en: string; es: string };
}

const interestCards: InterestCard[] = [
  {
    value: "olhovivo-patrol",
    icon: <Car className="w-6 h-6" />,
    label: {
      pt: "Quero conhecer o Olho Vivo Patrol",
      en: "I want to learn about Olho Vivo Patrol",
      es: "Quiero conocer el Olho Vivo Patrol",
    },
  },
  {
    value: "olhovivo-parking",
    icon: <ParkingCircle className="w-6 h-6" />,
    label: {
      pt: "Quero conhecer o Olho Vivo Parking",
      en: "I want to learn about Olho Vivo Parking",
      es: "Quiero conocer el Olho Vivo Parking",
    },
  },
  {
    value: "geotrust-areachain",
    icon: <Cpu className="w-6 h-6" />,
    label: {
      pt: "Tenho interesse no GeoTrust/AreaChain",
      en: "I'm interested in GeoTrust/AreaChain",
      es: "Tengo interés en GeoTrust/AreaChain",
    },
  },
  {
    value: "parceiro-integrador",
    icon: <Handshake className="w-6 h-6" />,
    label: {
      pt: "Sou parceiro/integrador",
      en: "I'm a partner/integrator",
      es: "Soy socio/integrador",
    },
  },
  {
    value: "outro",
    icon: <MessageSquare className="w-6 h-6" />,
    label: {
      pt: "Outro assunto",
      en: "Other subject",
      es: "Otro asunto",
    },
  },
];

// ─── Labels i18n ──────────────────────────────────────────────────────────────
const labels = {
  pt: {
    pageTitle: "Estamos aqui para ajudar",
    pageSubtitle: "Nossa equipe responde em até 24 horas úteis",
    selectInterest: "Selecione seu interesse",
    nome: "Nome completo",
    email: "E-mail corporativo",
    whatsapp: "WhatsApp (opcional)",
    cidade: "Cidade / País",
    cargo: "Cargo / Função",
    mensagem: "Mensagem",
    enviar: "Enviar mensagem",
    enviando: "Enviando...",
    sucesso: "Mensagem enviada com sucesso. Nossa equipe entrará em contato em breve.",
    erro: "Ocorreu um erro ao enviar. Tente novamente ou entre em contato por telefone.",
    canaisTitle: "Canais alternativos",
    telefone: "Telefone",
    whatsappLabel: "WhatsApp",
    emailLabel: "E-mail",
    enderecoLabel: "Endereço",
    endereco: "Rua Santos Dumont, 444, Vila Bressan\nAraras, SP 13600-650\nCNPJ: 11.406.226/0001-03",
    horario: "Seg-Sex: 8h-18h",
    lgpd: "Seus dados estão protegidos conforme a LGPD",
    seoTitle: "Contato — Areatec | Fale com nossa equipe comercial",
    seoDesc: "Entre em contato com a Areatec para soluções de fiscalização de trânsito, estacionamento rotativo e cidades inteligentes. Atendimento comercial e técnico.",
  },
  en: {
    pageTitle: "We're here to help",
    pageSubtitle: "Our team responds within 24 business hours",
    selectInterest: "Select your interest",
    nome: "Full name",
    email: "Corporate email",
    whatsapp: "WhatsApp (optional)",
    cidade: "City / Country",
    cargo: "Position / Role",
    mensagem: "Message",
    enviar: "Send message",
    enviando: "Sending...",
    sucesso: "Message sent successfully. Our team will contact you shortly.",
    erro: "An error occurred while sending. Please try again or contact us by phone.",
    canaisTitle: "Alternative channels",
    telefone: "Phone",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    enderecoLabel: "Address",
    endereco: "Rua Santos Dumont, 444, Vila Bressan\nAraras, SP 13600-650, Brazil\nCNPJ: 11.406.226/0001-03",
    horario: "Mon-Fri: 8am-6pm (BRT)",
    lgpd: "Your data is protected under LGPD (Brazilian Data Protection Law)",
    seoTitle: "Contact — Areatec | Talk to our sales team",
    seoDesc: "Contact Areatec for traffic enforcement, rotary parking, and smart city solutions. Commercial and technical support.",
  },
  es: {
    pageTitle: "Estamos aquí para ayudar",
    pageSubtitle: "Nuestro equipo responde en hasta 24 horas hábiles",
    selectInterest: "Seleccione su interés",
    nome: "Nombre completo",
    email: "Correo corporativo",
    whatsapp: "WhatsApp (opcional)",
    cidade: "Ciudad / País",
    cargo: "Cargo / Función",
    mensagem: "Mensaje",
    enviar: "Enviar mensaje",
    enviando: "Enviando...",
    sucesso: "Mensaje enviado con éxito. Nuestro equipo se comunicará pronto.",
    erro: "Ocurrió un error al enviar. Intente nuevamente o comuníquese por teléfono.",
    canaisTitle: "Canales alternativos",
    telefone: "Teléfono",
    whatsappLabel: "WhatsApp",
    emailLabel: "Correo",
    enderecoLabel: "Dirección",
    endereco: "Rua Santos Dumont, 444, Vila Bressan\nAraras, SP 13600-650, Brasil\nCNPJ: 11.406.226/0001-03",
    horario: "Lun-Vie: 8h-18h (BRT)",
    lgpd: "Sus datos están protegidos conforme a la LGPD",
    seoTitle: "Contacto — Areatec | Hable con nuestro equipo comercial",
    seoDesc: "Contacte a Areatec para soluciones de fiscalización de tránsito, estacionamiento rotativo y ciudades inteligentes. Atención comercial y técnica.",
  },
};

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contato() {
  const { lang } = useLanguage();
  const l = labels[lang];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    cidade: "",
    cargo: "",
    mensagem: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length === 0) return;
    setStatus("sending");

    try {
      const payload = {
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp || null,
        interesse: selectedInterests.join(", "),
        cidade: form.cidade || null,
        cargo: form.cargo || null,
        mensagem: form.mensagem,
        lang,
        source: "website",
      };

      // Insert directly into Supabase via REST API
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_leads`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok || res.status === 201) {
        setStatus("success");
        setForm({ nome: "", email: "", whatsapp: "", cidade: "", cargo: "", mensagem: "" });
        setSelectedInterest("");
      } else {
        console.error("Supabase error:", await res.text());
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/30 focus:border-[#2F6FD0] transition-all duration-200 text-sm";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <>
      <SEOHead title={l.seoTitle} description={l.seoDesc} path="/contato" jsonLd={contactSchema} />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="relative pt-28 pb-16 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-800 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-10 w-96 h-96 bg-[#2F6FD0]/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px]" />
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

          {/* Interest Cards + Form */}
          <section className="py-16 lg:py-24 bg-slate-50/50">
            <div className="container max-w-5xl mx-auto">
              {/* Interest Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2
                  className="text-lg font-semibold text-slate-800 mb-5 text-center"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {l.selectInterest}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {interestCards.map((card) => (
                    <button
                      key={card.value}
                      type="button"
                      onClick={() => setSelectedInterests(prev => prev.includes(card.value) ? prev.filter(v => v !== card.value) : [...prev, card.value])}
                      className={`relative flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all duration-200 text-center group ${
                        selectedInterests.includes(card.value)
                          ? "border-[#2F6FD0] bg-blue-50/80 shadow-md shadow-blue-100"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          selectedInterests.includes(card.value)
                            ? "bg-[#2F6FD0] text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                        }`}
                      >
                        {card.icon}
                      </div>
                      <span
                        className={`text-xs font-medium leading-tight transition-colors duration-200 ${
                          selectedInterests.includes(card.value) ? "text-[#2F6FD0]" : "text-slate-600"
                        }`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {card.label[lang]}
                      </span>
                      {selectedInterests.includes(card.value) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#2F6FD0] rounded-full flex items-center justify-center"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Form + Sidebar */}
              <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-2"
                >
                  <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="nome" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.nome} *</label>
                        <input type="text" id="nome" name="nome" required value={form.nome} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.email} *</label>
                        <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="whatsapp" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.whatsapp}</label>
                        <input type="tel" id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={handleChange} className={inputClass} placeholder="+55 11 99128-7417" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      </div>
                      <div>
                        <label htmlFor="cidade" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.cidade}</label>
                        <input type="text" id="cidade" name="cidade" value={form.cidade} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cargo" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.cargo}</label>
                      <input type="text" id="cargo" name="cargo" value={form.cargo} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                    </div>
                    <div>
                      <label htmlFor="mensagem" className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.mensagem} *</label>
                      <textarea id="mensagem" name="mensagem" required rows={5} value={form.mensagem} onChange={handleChange} className={`${inputClass} resize-none`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                    </div>

                    {/* Status Messages */}
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm"
                      >
                        <CheckCircle className="w-5 h-5 shrink-0" />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.sucesso}</span>
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.erro}</span>
                      </motion.div>
                    )}

                    {/* Submit + LGPD */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={status === "sending" || selectedInterests.length === 0}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2F6FD0] text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:bg-[#2563C4] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {status === "sending" ? l.enviando : l.enviar}
                        <Send className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.lgpd}</span>
                      </div>
                      {/* Certification Badges */}
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                          <Shield className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] font-bold text-emerald-700 tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>ISO 9001</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                          <Shield className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-[10px] font-bold text-blue-700 tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>ISO 27001</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg">
                          <Shield className="w-3.5 h-3.5 text-purple-600" />
                          <span className="text-[10px] font-bold text-purple-700 tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>PCI DSS</span>
                        </div>
                      </div>
                    </div>
                  </form>
                </motion.div>

                {/* Contact Info Sidebar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-4"
                >
                  <h3
                    className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {l.canaisTitle}
                  </h3>

                  <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.telefone}</p>
                        <a href="tel:+551920421373" className="text-sm font-semibold text-slate-900 hover:text-[#2F6FD0] transition-colors">(19) 2042-1373</a>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <MessageCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.whatsappLabel}</p>
                        <a href="https://wa.me/5511991287417" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors">(11) 99128-7417</a>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.emailLabel}</p>
                        <a href="mailto:comercial@areatec.com.br" className="text-sm font-semibold text-slate-900 hover:text-[#2F6FD0] transition-colors">comercial@areatec.com.br</a>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.enderecoLabel}</p>
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
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5"
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
