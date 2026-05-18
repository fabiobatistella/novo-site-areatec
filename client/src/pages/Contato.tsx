import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle,
  Car, ParkingCircle, Cpu, Handshake, MessageSquare, Package, Shield,
  Clock, ChevronDown, Users, Building2, Search, ArrowLeft, ArrowRight,
  SkipForward
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

// ─── Supabase Config ─────────────────────────────────────────────────────────
const SUPABASE_URL = "https://zqyvrktovkhxjrfospjm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxeXZya3RvdmtoeGpyZm9zcGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzE1NDEsImV4cCI6MjA4OTQ0NzU0MX0.vTUrIQWQS88DDok7G4xHptzlCmxLfbSpygF7TYTifdo";

// ─── Schema.org ──────────────────────────────────────────────────────────────
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

// ─── Complete Country List (all countries with flag emoji and DDI) ────────────
interface Country {
  code: string;
  name: string;
  ddi: string;
  flag: string;
}

const allCountries: Country[] = [
  { code: "BR", name: "Brasil", ddi: "+55", flag: "🇧🇷" },
  { code: "AF", name: "Afeganistão", ddi: "+93", flag: "🇦🇫" },
  { code: "ZA", name: "África do Sul", ddi: "+27", flag: "🇿🇦" },
  { code: "AL", name: "Albânia", ddi: "+355", flag: "🇦🇱" },
  { code: "DE", name: "Alemanha", ddi: "+49", flag: "🇩🇪" },
  { code: "AD", name: "Andorra", ddi: "+376", flag: "🇦🇩" },
  { code: "AO", name: "Angola", ddi: "+244", flag: "🇦🇴" },
  { code: "AG", name: "Antígua e Barbuda", ddi: "+1268", flag: "🇦🇬" },
  { code: "SA", name: "Arábia Saudita", ddi: "+966", flag: "🇸🇦" },
  { code: "DZ", name: "Argélia", ddi: "+213", flag: "🇩🇿" },
  { code: "AR", name: "Argentina", ddi: "+54", flag: "🇦🇷" },
  { code: "AM", name: "Armênia", ddi: "+374", flag: "🇦🇲" },
  { code: "AU", name: "Austrália", ddi: "+61", flag: "🇦🇺" },
  { code: "AT", name: "Áustria", ddi: "+43", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijão", ddi: "+994", flag: "🇦🇿" },
  { code: "BS", name: "Bahamas", ddi: "+1242", flag: "🇧🇸" },
  { code: "BH", name: "Bahrein", ddi: "+973", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", ddi: "+880", flag: "🇧🇩" },
  { code: "BB", name: "Barbados", ddi: "+1246", flag: "🇧🇧" },
  { code: "BY", name: "Belarus", ddi: "+375", flag: "🇧🇾" },
  { code: "BE", name: "Bélgica", ddi: "+32", flag: "🇧🇪" },
  { code: "BZ", name: "Belize", ddi: "+501", flag: "🇧🇿" },
  { code: "BJ", name: "Benin", ddi: "+229", flag: "🇧🇯" },
  { code: "BO", name: "Bolívia", ddi: "+591", flag: "🇧🇴" },
  { code: "BA", name: "Bósnia e Herzegovina", ddi: "+387", flag: "🇧🇦" },
  { code: "BW", name: "Botsuana", ddi: "+267", flag: "🇧🇼" },
  { code: "BN", name: "Brunei", ddi: "+673", flag: "🇧🇳" },
  { code: "BG", name: "Bulgária", ddi: "+359", flag: "🇧🇬" },
  { code: "BF", name: "Burkina Faso", ddi: "+226", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", ddi: "+257", flag: "🇧🇮" },
  { code: "BT", name: "Butão", ddi: "+975", flag: "🇧🇹" },
  { code: "CV", name: "Cabo Verde", ddi: "+238", flag: "🇨🇻" },
  { code: "CM", name: "Camarões", ddi: "+237", flag: "🇨🇲" },
  { code: "KH", name: "Camboja", ddi: "+855", flag: "🇰🇭" },
  { code: "CA", name: "Canadá", ddi: "+1", flag: "🇨🇦" },
  { code: "QA", name: "Catar", ddi: "+974", flag: "🇶🇦" },
  { code: "KZ", name: "Cazaquistão", ddi: "+7", flag: "🇰🇿" },
  { code: "TD", name: "Chade", ddi: "+235", flag: "🇹🇩" },
  { code: "CL", name: "Chile", ddi: "+56", flag: "🇨🇱" },
  { code: "CN", name: "China", ddi: "+86", flag: "🇨🇳" },
  { code: "CY", name: "Chipre", ddi: "+357", flag: "🇨🇾" },
  { code: "CO", name: "Colômbia", ddi: "+57", flag: "🇨🇴" },
  { code: "KM", name: "Comores", ddi: "+269", flag: "🇰🇲" },
  { code: "CG", name: "Congo", ddi: "+242", flag: "🇨🇬" },
  { code: "CD", name: "Congo (RDC)", ddi: "+243", flag: "🇨🇩" },
  { code: "KP", name: "Coreia do Norte", ddi: "+850", flag: "🇰🇵" },
  { code: "KR", name: "Coreia do Sul", ddi: "+82", flag: "🇰🇷" },
  { code: "CI", name: "Costa do Marfim", ddi: "+225", flag: "🇨🇮" },
  { code: "CR", name: "Costa Rica", ddi: "+506", flag: "🇨🇷" },
  { code: "HR", name: "Croácia", ddi: "+385", flag: "🇭🇷" },
  { code: "CU", name: "Cuba", ddi: "+53", flag: "🇨🇺" },
  { code: "DK", name: "Dinamarca", ddi: "+45", flag: "🇩🇰" },
  { code: "DJ", name: "Djibuti", ddi: "+253", flag: "🇩🇯" },
  { code: "DM", name: "Dominica", ddi: "+1767", flag: "🇩🇲" },
  { code: "EG", name: "Egito", ddi: "+20", flag: "🇪🇬" },
  { code: "SV", name: "El Salvador", ddi: "+503", flag: "🇸🇻" },
  { code: "AE", name: "Emirados Árabes", ddi: "+971", flag: "🇦🇪" },
  { code: "EC", name: "Equador", ddi: "+593", flag: "🇪🇨" },
  { code: "ER", name: "Eritreia", ddi: "+291", flag: "🇪🇷" },
  { code: "SK", name: "Eslováquia", ddi: "+421", flag: "🇸🇰" },
  { code: "SI", name: "Eslovênia", ddi: "+386", flag: "🇸🇮" },
  { code: "ES", name: "Espanha", ddi: "+34", flag: "🇪🇸" },
  { code: "US", name: "Estados Unidos", ddi: "+1", flag: "🇺🇸" },
  { code: "EE", name: "Estônia", ddi: "+372", flag: "🇪🇪" },
  { code: "ET", name: "Etiópia", ddi: "+251", flag: "🇪🇹" },
  { code: "FJ", name: "Fiji", ddi: "+679", flag: "🇫🇯" },
  { code: "PH", name: "Filipinas", ddi: "+63", flag: "🇵🇭" },
  { code: "FI", name: "Finlândia", ddi: "+358", flag: "🇫🇮" },
  { code: "FR", name: "França", ddi: "+33", flag: "🇫🇷" },
  { code: "GA", name: "Gabão", ddi: "+241", flag: "🇬🇦" },
  { code: "GM", name: "Gâmbia", ddi: "+220", flag: "🇬🇲" },
  { code: "GH", name: "Gana", ddi: "+233", flag: "🇬🇭" },
  { code: "GE", name: "Geórgia", ddi: "+995", flag: "🇬🇪" },
  { code: "GR", name: "Grécia", ddi: "+30", flag: "🇬🇷" },
  { code: "GD", name: "Granada", ddi: "+1473", flag: "🇬🇩" },
  { code: "GT", name: "Guatemala", ddi: "+502", flag: "🇬🇹" },
  { code: "GY", name: "Guiana", ddi: "+592", flag: "🇬🇾" },
  { code: "GN", name: "Guiné", ddi: "+224", flag: "🇬🇳" },
  { code: "GQ", name: "Guiné Equatorial", ddi: "+240", flag: "🇬🇶" },
  { code: "GW", name: "Guiné-Bissau", ddi: "+245", flag: "🇬🇼" },
  { code: "HT", name: "Haiti", ddi: "+509", flag: "🇭🇹" },
  { code: "HN", name: "Honduras", ddi: "+504", flag: "🇭🇳" },
  { code: "HU", name: "Hungria", ddi: "+36", flag: "🇭🇺" },
  { code: "YE", name: "Iêmen", ddi: "+967", flag: "🇾🇪" },
  { code: "IN", name: "Índia", ddi: "+91", flag: "🇮🇳" },
  { code: "ID", name: "Indonésia", ddi: "+62", flag: "🇮🇩" },
  { code: "IQ", name: "Iraque", ddi: "+964", flag: "🇮🇶" },
  { code: "IR", name: "Irã", ddi: "+98", flag: "🇮🇷" },
  { code: "IE", name: "Irlanda", ddi: "+353", flag: "🇮🇪" },
  { code: "IS", name: "Islândia", ddi: "+354", flag: "🇮🇸" },
  { code: "IL", name: "Israel", ddi: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Itália", ddi: "+39", flag: "🇮🇹" },
  { code: "JM", name: "Jamaica", ddi: "+1876", flag: "🇯🇲" },
  { code: "JP", name: "Japão", ddi: "+81", flag: "🇯🇵" },
  { code: "JO", name: "Jordânia", ddi: "+962", flag: "🇯🇴" },
  { code: "KW", name: "Kuwait", ddi: "+965", flag: "🇰🇼" },
  { code: "LA", name: "Laos", ddi: "+856", flag: "🇱🇦" },
  { code: "LS", name: "Lesoto", ddi: "+266", flag: "🇱🇸" },
  { code: "LV", name: "Letônia", ddi: "+371", flag: "🇱🇻" },
  { code: "LB", name: "Líbano", ddi: "+961", flag: "🇱🇧" },
  { code: "LR", name: "Libéria", ddi: "+231", flag: "🇱🇷" },
  { code: "LY", name: "Líbia", ddi: "+218", flag: "🇱🇾" },
  { code: "LI", name: "Liechtenstein", ddi: "+423", flag: "🇱🇮" },
  { code: "LT", name: "Lituânia", ddi: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxemburgo", ddi: "+352", flag: "🇱🇺" },
  { code: "MK", name: "Macedônia do Norte", ddi: "+389", flag: "🇲🇰" },
  { code: "MG", name: "Madagascar", ddi: "+261", flag: "🇲🇬" },
  { code: "MY", name: "Malásia", ddi: "+60", flag: "🇲🇾" },
  { code: "MW", name: "Malawi", ddi: "+265", flag: "🇲🇼" },
  { code: "MV", name: "Maldivas", ddi: "+960", flag: "🇲🇻" },
  { code: "ML", name: "Mali", ddi: "+223", flag: "🇲🇱" },
  { code: "MT", name: "Malta", ddi: "+356", flag: "🇲🇹" },
  { code: "MA", name: "Marrocos", ddi: "+212", flag: "🇲🇦" },
  { code: "MU", name: "Maurício", ddi: "+230", flag: "🇲🇺" },
  { code: "MR", name: "Mauritânia", ddi: "+222", flag: "🇲🇷" },
  { code: "MX", name: "México", ddi: "+52", flag: "🇲🇽" },
  { code: "MM", name: "Mianmar", ddi: "+95", flag: "🇲🇲" },
  { code: "MZ", name: "Moçambique", ddi: "+258", flag: "🇲🇿" },
  { code: "MD", name: "Moldávia", ddi: "+373", flag: "🇲🇩" },
  { code: "MC", name: "Mônaco", ddi: "+377", flag: "🇲🇨" },
  { code: "MN", name: "Mongólia", ddi: "+976", flag: "🇲🇳" },
  { code: "ME", name: "Montenegro", ddi: "+382", flag: "🇲🇪" },
  { code: "NA", name: "Namíbia", ddi: "+264", flag: "🇳🇦" },
  { code: "NP", name: "Nepal", ddi: "+977", flag: "🇳🇵" },
  { code: "NI", name: "Nicarágua", ddi: "+505", flag: "🇳🇮" },
  { code: "NE", name: "Níger", ddi: "+227", flag: "🇳🇪" },
  { code: "NG", name: "Nigéria", ddi: "+234", flag: "🇳🇬" },
  { code: "NO", name: "Noruega", ddi: "+47", flag: "🇳🇴" },
  { code: "NZ", name: "Nova Zelândia", ddi: "+64", flag: "🇳🇿" },
  { code: "OM", name: "Omã", ddi: "+968", flag: "🇴🇲" },
  { code: "NL", name: "Países Baixos", ddi: "+31", flag: "🇳🇱" },
  { code: "PK", name: "Paquistão", ddi: "+92", flag: "🇵🇰" },
  { code: "PA", name: "Panamá", ddi: "+507", flag: "🇵🇦" },
  { code: "PG", name: "Papua Nova Guiné", ddi: "+675", flag: "🇵🇬" },
  { code: "PY", name: "Paraguai", ddi: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru", ddi: "+51", flag: "🇵🇪" },
  { code: "PL", name: "Polônia", ddi: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", ddi: "+351", flag: "🇵🇹" },
  { code: "KE", name: "Quênia", ddi: "+254", flag: "🇰🇪" },
  { code: "KG", name: "Quirguistão", ddi: "+996", flag: "🇰🇬" },
  { code: "GB", name: "Reino Unido", ddi: "+44", flag: "🇬🇧" },
  { code: "CF", name: "Rep. Centro-Africana", ddi: "+236", flag: "🇨🇫" },
  { code: "DO", name: "Rep. Dominicana", ddi: "+1809", flag: "🇩🇴" },
  { code: "CZ", name: "Rep. Tcheca", ddi: "+420", flag: "🇨🇿" },
  { code: "RO", name: "Romênia", ddi: "+40", flag: "🇷🇴" },
  { code: "RW", name: "Ruanda", ddi: "+250", flag: "🇷🇼" },
  { code: "RU", name: "Rússia", ddi: "+7", flag: "🇷🇺" },
  { code: "WS", name: "Samoa", ddi: "+685", flag: "🇼🇸" },
  { code: "LC", name: "Santa Lúcia", ddi: "+1758", flag: "🇱🇨" },
  { code: "SN", name: "Senegal", ddi: "+221", flag: "🇸🇳" },
  { code: "SL", name: "Serra Leoa", ddi: "+232", flag: "🇸🇱" },
  { code: "RS", name: "Sérvia", ddi: "+381", flag: "🇷🇸" },
  { code: "SG", name: "Singapura", ddi: "+65", flag: "🇸🇬" },
  { code: "SY", name: "Síria", ddi: "+963", flag: "🇸🇾" },
  { code: "SO", name: "Somália", ddi: "+252", flag: "🇸🇴" },
  { code: "LK", name: "Sri Lanka", ddi: "+94", flag: "🇱🇰" },
  { code: "SE", name: "Suécia", ddi: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Suíça", ddi: "+41", flag: "🇨🇭" },
  { code: "SR", name: "Suriname", ddi: "+597", flag: "🇸🇷" },
  { code: "TH", name: "Tailândia", ddi: "+66", flag: "🇹🇭" },
  { code: "TW", name: "Taiwan", ddi: "+886", flag: "🇹🇼" },
  { code: "TZ", name: "Tanzânia", ddi: "+255", flag: "🇹🇿" },
  { code: "TJ", name: "Tajiquistão", ddi: "+992", flag: "🇹🇯" },
  { code: "TL", name: "Timor-Leste", ddi: "+670", flag: "🇹🇱" },
  { code: "TG", name: "Togo", ddi: "+228", flag: "🇹🇬" },
  { code: "TO", name: "Tonga", ddi: "+676", flag: "🇹🇴" },
  { code: "TT", name: "Trinidad e Tobago", ddi: "+1868", flag: "🇹🇹" },
  { code: "TN", name: "Tunísia", ddi: "+216", flag: "🇹🇳" },
  { code: "TM", name: "Turcomenistão", ddi: "+993", flag: "🇹🇲" },
  { code: "TR", name: "Turquia", ddi: "+90", flag: "🇹🇷" },
  { code: "UA", name: "Ucrânia", ddi: "+380", flag: "🇺🇦" },
  { code: "UG", name: "Uganda", ddi: "+256", flag: "🇺🇬" },
  { code: "UY", name: "Uruguai", ddi: "+598", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbequistão", ddi: "+998", flag: "🇺🇿" },
  { code: "VU", name: "Vanuatu", ddi: "+678", flag: "🇻🇺" },
  { code: "VE", name: "Venezuela", ddi: "+58", flag: "🇻🇪" },
  { code: "VN", name: "Vietnã", ddi: "+84", flag: "🇻🇳" },
  { code: "ZM", name: "Zâmbia", ddi: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbábue", ddi: "+263", flag: "🇿🇼" },
];

// ─── Interest Cards Data ─────────────────────────────────────────────────────
interface InterestCard {
  value: string;
  icon: React.ReactNode;
  label: { pt: string; en: string; es: string };
  desc: { pt: string; en: string; es: string };
}

const interestCards: InterestCard[] = [
  {
    value: "olhovivo-patrol",
    icon: <Car className="w-5 h-5" />,
    label: { pt: "Olho Vivo Patrol", en: "Olho Vivo Patrol", es: "Olho Vivo Patrol" },
    desc: { pt: "Fiscalização OCR veicular", en: "Vehicle OCR enforcement", es: "Fiscalización OCR vehicular" },
  },
  {
    value: "olhovivo-parking",
    icon: <ParkingCircle className="w-5 h-5" />,
    label: { pt: "Olho Vivo Parking", en: "Olho Vivo Parking", es: "Olho Vivo Parking" },
    desc: { pt: "Zona azul digital", en: "Digital blue zone", es: "Zona azul digital" },
  },
  {
    value: "geotrust-areachain",
    icon: <Cpu className="w-5 h-5" />,
    label: { pt: "GeoTrust / AreaChain", en: "GeoTrust / AreaChain", es: "GeoTrust / AreaChain" },
    desc: { pt: "Geolocalização autenticada", en: "Authenticated geolocation", es: "Geolocalización autenticada" },
  },
  {
    value: "parceiro-integrador",
    icon: <Handshake className="w-5 h-5" />,
    label: { pt: "Sou parceiro/integrador", en: "I'm a partner/integrator", es: "Soy socio/integrador" },
    desc: { pt: "Parcerias e integrações", en: "Partnerships & integrations", es: "Alianzas e integraciones" },
  },
  {
    value: "outro-produto",
    icon: <Package className="w-5 h-5" />,
    label: { pt: "Outro Produto", en: "Other Product", es: "Otro Producto" },
    desc: { pt: "Descreva o que procura", en: "Describe what you need", es: "Describa lo que busca" },
  },
  {
    value: "outro-assunto",
    icon: <MessageSquare className="w-5 h-5" />,
    label: { pt: "Outro Assunto", en: "Other Subject", es: "Otro Asunto" },
    desc: { pt: "Dúvidas gerais", en: "General questions", es: "Preguntas generales" },
  },
];

// ─── Labels i18n ─────────────────────────────────────────────────────────────
const labels = {
  pt: {
    pageTitle: "Vamos conversar sobre seu projeto",
    pageSubtitle: "Resposta em até 24 horas úteis. Sem compromisso, sem pressão.",
    selectInterest: "Sobre o que você gostaria de conversar?",
    selectInterestSub: "Selecione um ou mais temas para direcionarmos sua mensagem ao especialista certo.",
    nome: "Nome completo",
    email: "E-mail corporativo",
    telefone: "Telefone",
    telefonePlaceholder: "Número de telefone",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "Mesmo número ou outro",
    empresa: "Empresa",
    cidade: "Cidade / País",
    cargo: "Cargo / Função",
    mensagem: "Como podemos ajudar?",
    mensagemPlaceholder: "Conte brevemente sobre seu projeto, desafio ou dúvida...",
    outroProdutoPlaceholder: "Qual produto ou solução você procura?",
    enviar: "Enviar mensagem",
    enviando: "Enviando...",
    sucesso: "Mensagem recebida. Um especialista entrará em contato em breve.",
    erro: "Ocorreu um erro ao enviar. Tente novamente ou entre em contato por telefone.",
    canaisTitle: "Fale diretamente",
    telefoneLabel: "Telefone",
    whatsappLabel: "WhatsApp",
    emailLabel: "E-mail",
    enderecoLabel: "Endereço",
    endereco: "Rua Santos Dumont, 444, Vila Bressan\nAraras, SP 13600-650",
    cnpj: "CNPJ: 11.406.226/0001-03",
    horario: "Seg-Sex: 8h-18h",
    lgpd: "Seus dados estão protegidos conforme a LGPD. Não compartilhamos com terceiros.",
    socialProof: "+200 municípios atendidos em todo o Brasil",
    whatsappCta: "Conversar no WhatsApp",
    opcional: "opcional",
    seoTitle: "Contato — Areatec | Fale com nossa equipe comercial",
    seoDesc: "Entre em contato com a Areatec para soluções de fiscalização de trânsito, estacionamento rotativo e cidades inteligentes. Atendimento comercial e técnico.",
    trustResponse: "Resposta rápida",
    trustResponseDesc: "Até 24h úteis",
    trustSecurity: "Dados seguros",
    trustSecurityDesc: "LGPD compliant",
    trustExperts: "Especialistas",
    trustExpertsDesc: "Equipe dedicada",
    searchCountry: "Buscar país...",
    step1Title: "Interesse",
    step2Title: "Dados básicos",
    step3Title: "Complementar",
    next: "Próximo",
    back: "Voltar",
    skipAndSend: "Pular e enviar",
    step3Headline: "Quer nos contar mais?",
    step3Sub: "Esses dados são opcionais, mas nos ajudam a personalizar o atendimento.",
    step2Headline: "Seus dados de contato",
    step2Sub: "Precisamos apenas do essencial para retornar sua mensagem.",
  },
  en: {
    pageTitle: "Let's talk about your project",
    pageSubtitle: "Response within 24 business hours. No commitment, no pressure.",
    selectInterest: "What would you like to discuss?",
    selectInterestSub: "Select one or more topics so we can route your message to the right specialist.",
    nome: "Full name",
    email: "Corporate email",
    telefone: "Phone",
    telefonePlaceholder: "Phone number",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "Same number or another",
    empresa: "Company",
    cidade: "City / Country",
    cargo: "Position / Role",
    mensagem: "How can we help?",
    mensagemPlaceholder: "Briefly tell us about your project, challenge, or question...",
    outroProdutoPlaceholder: "What product or solution are you looking for?",
    enviar: "Send message",
    enviando: "Sending...",
    sucesso: "Message received. A specialist will contact you shortly.",
    erro: "An error occurred while sending. Please try again or contact us by phone.",
    canaisTitle: "Contact directly",
    telefoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    enderecoLabel: "Address",
    endereco: "Rua Santos Dumont, 444, Vila Bressan\nAraras, SP 13600-650, Brazil",
    cnpj: "CNPJ: 11.406.226/0001-03",
    horario: "Mon-Fri: 8am-6pm (BRT)",
    lgpd: "Your data is protected under LGPD. We do not share with third parties.",
    socialProof: "+200 municipalities served across Brazil",
    whatsappCta: "Chat on WhatsApp",
    opcional: "optional",
    seoTitle: "Contact — Areatec | Talk to our sales team",
    seoDesc: "Contact Areatec for traffic enforcement, rotary parking, and smart city solutions. Commercial and technical support.",
    trustResponse: "Fast response",
    trustResponseDesc: "Within 24h",
    trustSecurity: "Secure data",
    trustSecurityDesc: "LGPD compliant",
    trustExperts: "Experts",
    trustExpertsDesc: "Dedicated team",
    searchCountry: "Search country...",
    step1Title: "Interest",
    step2Title: "Basic info",
    step3Title: "Additional",
    next: "Next",
    back: "Back",
    skipAndSend: "Skip & send",
    step3Headline: "Want to tell us more?",
    step3Sub: "These fields are optional, but help us personalize your experience.",
    step2Headline: "Your contact details",
    step2Sub: "We only need the essentials to get back to you.",
  },
  es: {
    pageTitle: "Hablemos sobre su proyecto",
    pageSubtitle: "Respuesta en hasta 24 horas hábiles. Sin compromiso, sin presión.",
    selectInterest: "¿Sobre qué le gustaría conversar?",
    selectInterestSub: "Seleccione uno o más temas para direccionar su mensaje al especialista correcto.",
    nome: "Nombre completo",
    email: "Correo corporativo",
    telefone: "Teléfono",
    telefonePlaceholder: "Número de teléfono",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "Mismo número u otro",
    empresa: "Empresa",
    cidade: "Ciudad / País",
    cargo: "Cargo / Función",
    mensagem: "¿Cómo podemos ayudar?",
    mensagemPlaceholder: "Cuéntenos brevemente sobre su proyecto, desafío o duda...",
    outroProdutoPlaceholder: "¿Qué producto o solución busca?",
    enviar: "Enviar mensaje",
    enviando: "Enviando...",
    sucesso: "Mensaje recibido. Un especialista se comunicará pronto.",
    erro: "Ocurrió un error al enviar. Intente nuevamente o comuníquese por teléfono.",
    canaisTitle: "Contacto directo",
    telefoneLabel: "Teléfono",
    whatsappLabel: "WhatsApp",
    emailLabel: "Correo",
    enderecoLabel: "Dirección",
    endereco: "Rua Santos Dumont, 444, Vila Bressan\nAraras, SP 13600-650, Brasil",
    cnpj: "CNPJ: 11.406.226/0001-03",
    horario: "Lun-Vie: 8h-18h (BRT)",
    lgpd: "Sus datos están protegidos conforme a la LGPD. No compartimos con terceros.",
    socialProof: "+200 municipios atendidos en todo Brasil",
    whatsappCta: "Chatear por WhatsApp",
    opcional: "opcional",
    seoTitle: "Contacto — Areatec | Hable con nuestro equipo comercial",
    seoDesc: "Contacte a Areatec para soluciones de fiscalización de tránsito, estacionamiento rotativo y ciudades inteligentes. Atención comercial y técnica.",
    trustResponse: "Respuesta rápida",
    trustResponseDesc: "Hasta 24h",
    trustSecurity: "Datos seguros",
    trustSecurityDesc: "LGPD compliant",
    trustExperts: "Especialistas",
    trustExpertsDesc: "Equipo dedicado",
    searchCountry: "Buscar país...",
    step1Title: "Interés",
    step2Title: "Datos básicos",
    step3Title: "Complementar",
    next: "Siguiente",
    back: "Volver",
    skipAndSend: "Saltar y enviar",
    step3Headline: "¿Quiere contarnos más?",
    step3Sub: "Estos campos son opcionales, pero nos ayudan a personalizar la atención.",
    step2Headline: "Sus datos de contacto",
    step2Sub: "Solo necesitamos lo esencial para responderle.",
  },
};

type FormStatus = "idle" | "sending" | "success" | "error";

// ─── Country Selector Component (Searchable) ─────────────────────────────────
function CountrySelector({
  selectedCountry,
  onSelect,
  searchPlaceholder,
}: {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
  searchPlaceholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = useMemo(() => {
    if (!search) return allCountries;
    const q = search.toLowerCase();
    return allCountries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.ddi.includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [search]);

  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
        aria-label="Select country code"
      >
        <span className="text-base leading-none">{selectedCountry.flag}</span>
        <span className="text-sm font-medium text-slate-700" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {selectedCountry.ddi}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 z-50 overflow-hidden"
          >
            <div className="p-2 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-400 text-center">
                  {search ? "Nenhum país encontrado" : ""}
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => { onSelect(country); setOpen(false); setSearch(""); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-blue-50 transition-colors ${
                      selectedCountry.code === country.code ? "bg-blue-50/70" : ""
                    }`}
                  >
                    <span className="text-lg leading-none flex-shrink-0">{country.flag}</span>
                    <span className="text-sm text-slate-700 flex-1 truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {country.name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex-shrink-0">{country.ddi}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Step Progress Bar Component ─────────────────────────────────────────────
function StepProgressBar({ currentStep, labels: stepLabels }: { currentStep: number; labels: string[] }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
        {/* Progress line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-[#2F6FD0] z-0"
          initial={false}
          animate={{ width: `${((currentStep - 1) / (stepLabels.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {stepLabels.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;
          return (
            <div key={idx} className="flex flex-col items-center z-10 relative">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${
                  isCompleted
                    ? "bg-[#2F6FD0] border-[#2F6FD0] text-white"
                    : isActive
                    ? "bg-white border-[#2F6FD0] text-[#2F6FD0] shadow-lg shadow-[#2F6FD0]/20"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : stepNum}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium whitespace-nowrap ${
                  isActive ? "text-[#2F6FD0]" : isCompleted ? "text-slate-600" : "text-slate-400"
                }`}
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Slide Variants for Framer Motion ────────────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Contato() {
  const { lang } = useLanguage();
  const l = labels[lang];

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>(allCountries[0]);
  const [outroProdutoText, setOutroProdutoText] = useState("");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    whatsapp: "",
    empresa: "",
    cidade: "",
    cargo: "",
    mensagem: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleInterest = (value: string) => {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const goNext = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const canProceedStep1 = selectedInterests.length > 0;
  const canProceedStep2 = form.nome.trim() !== "" && form.email.trim() !== "" && form.mensagem.trim() !== "";

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const interessesList = [...selectedInterests];
      if (selectedInterests.includes("outro-produto") && outroProdutoText) {
        const idx = interessesList.indexOf("outro-produto");
        interessesList[idx] = `outro-produto: ${outroProdutoText}`;
      }

      const fullPhone = form.telefone ? `${selectedCountry.ddi} ${form.telefone}` : null;
      const whatsappValue = form.whatsapp || fullPhone || null;

      const cargoValue = form.empresa
        ? (form.cargo ? `${form.cargo} — ${form.empresa}` : form.empresa)
        : (form.cargo || null);

      const payload: Record<string, string | null> = {
        nome: form.nome,
        email: form.email,
        whatsapp: whatsappValue,
        interesse: interessesList.join(", "),
        cidade: form.cidade || null,
        cargo: cargoValue,
        mensagem: form.mensagem,
        lang,
        source: "website",
        created_at: new Date().toISOString(),
      };

      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== null)
      );

      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(cleanPayload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 3) {
      handleSubmit();
    } else if (currentStep === 2) {
      goNext();
    }
  };

  const handleSkipAndSend = () => {
    handleSubmit();
  };

  const stepLabels = [l.step1Title, l.step2Title, l.step3Title];

  return (
    <>
      <SEOHead title={l.seoTitle} description={l.seoDesc} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-32 pb-16 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2F6FD0] rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2F6FD0] rounded-full blur-3xl" />
            </div>
            <div className="relative max-w-4xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-300 text-sm font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {l.socialProof}
                  </span>
                </div>
                <h1
                  className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {l.pageTitle}
                </h1>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {l.pageSubtitle}
                </p>
              </motion.div>
              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6 mt-8"
              >
                {[
                  { icon: <Clock className="w-4 h-4" />, title: l.trustResponse, desc: l.trustResponseDesc },
                  { icon: <Shield className="w-4 h-4" />, title: l.trustSecurity, desc: l.trustSecurityDesc },
                  { icon: <Users className="w-4 h-4" />, title: l.trustExperts, desc: l.trustExpertsDesc },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#2F6FD0]/20 flex items-center justify-center text-[#2F6FD0]">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-white text-sm font-semibold">{item.title}</p>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Form Section */}
          <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Form Column (2/3) */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10"
                  >
                    {/* Step Progress Bar */}
                    <StepProgressBar currentStep={currentStep} labels={stepLabels} />

                    {/* Success State */}
                    {status === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-emerald-600" />
                        </div>
                        <p className="text-lg font-semibold text-slate-800 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {l.sucesso}
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleFormSubmit}>
                        {/* Animated Steps Container */}
                        <div className="relative overflow-hidden min-h-[380px]">
                          <AnimatePresence initial={false} custom={direction} mode="wait">
                            {/* Step 1: Interests */}
                            {currentStep === 1 && (
                              <motion.div
                                key="step1"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="w-full"
                              >
                                <h2
                                  className="text-xl font-bold text-slate-800 mb-2"
                                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                  {l.selectInterest}
                                </h2>
                                <p className="text-sm text-slate-500 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                  {l.selectInterestSub}
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {interestCards.map((card) => {
                                    const isSelected = selectedInterests.includes(card.value);
                                    return (
                                      <button
                                        key={card.value}
                                        type="button"
                                        onClick={() => toggleInterest(card.value)}
                                        className={`relative flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all duration-200 ${
                                          isSelected
                                            ? "border-[#2F6FD0] bg-[#2F6FD0]/5 shadow-md shadow-[#2F6FD0]/10"
                                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                        }`}
                                      >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                                          isSelected ? "bg-[#2F6FD0]/10 text-[#2F6FD0]" : "bg-slate-100 text-slate-500"
                                        }`}>
                                          {card.icon}
                                        </div>
                                        <span className="text-xs font-semibold text-slate-700 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                          {card.label[lang]}
                                        </span>
                                        <span className="text-[10px] text-slate-400 mt-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                          {card.desc[lang]}
                                        </span>
                                        {isSelected && (
                                          <div className="absolute top-2 right-2 w-5 h-5 bg-[#2F6FD0] rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-3 h-3 text-white" />
                                          </div>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                                {/* Outro Produto text field */}
                                <AnimatePresence>
                                  {selectedInterests.includes("outro-produto") && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="mt-4"
                                    >
                                      <input
                                        type="text"
                                        value={outroProdutoText}
                                        onChange={(e) => setOutroProdutoText(e.target.value)}
                                        placeholder={l.outroProdutoPlaceholder}
                                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                      />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            )}

                            {/* Step 2: Basic Data */}
                            {currentStep === 2 && (
                              <motion.div
                                key="step2"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="w-full"
                              >
                                <h2
                                  className="text-xl font-bold text-slate-800 mb-2"
                                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                  {l.step2Headline}
                                </h2>
                                <p className="text-sm text-slate-500 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                  {l.step2Sub}
                                </p>
                                <div className="space-y-5">
                                  {/* Nome */}
                                  <div>
                                    <label htmlFor="nome" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                      {l.nome} *
                                    </label>
                                    <input
                                      id="nome"
                                      name="nome"
                                      type="text"
                                      required
                                      value={form.nome}
                                      onChange={handleChange}
                                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all"
                                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    />
                                  </div>
                                  {/* Email */}
                                  <div>
                                    <label htmlFor="email" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                      {l.email} *
                                    </label>
                                    <input
                                      id="email"
                                      name="email"
                                      type="email"
                                      required
                                      value={form.email}
                                      onChange={handleChange}
                                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all"
                                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    />
                                  </div>
                                  {/* Mensagem */}
                                  <div>
                                    <label htmlFor="mensagem" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                      {l.mensagem} *
                                    </label>
                                    <textarea
                                      id="mensagem"
                                      name="mensagem"
                                      required
                                      rows={4}
                                      value={form.mensagem}
                                      onChange={handleChange}
                                      placeholder={l.mensagemPlaceholder}
                                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all resize-none"
                                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* Step 3: Optional Data */}
                            {currentStep === 3 && (
                              <motion.div
                                key="step3"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="w-full"
                              >
                                <h2
                                  className="text-xl font-bold text-slate-800 mb-2"
                                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                  {l.step3Headline}
                                </h2>
                                <p className="text-sm text-slate-500 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                  {l.step3Sub}
                                </p>
                                <div className="space-y-5">
                                  {/* Telefone with Country Selector */}
                                  <div>
                                    <label htmlFor="telefone" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                      {l.telefone} <span className="text-slate-400 normal-case">({l.opcional})</span>
                                    </label>
                                    <div className="flex gap-2">
                                      <CountrySelector
                                        selectedCountry={selectedCountry}
                                        onSelect={setSelectedCountry}
                                        searchPlaceholder={l.searchCountry}
                                      />
                                      <input
                                        id="telefone"
                                        name="telefone"
                                        type="tel"
                                        value={form.telefone}
                                        onChange={handleChange}
                                        placeholder={l.telefonePlaceholder}
                                        className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                      />
                                    </div>
                                  </div>
                                  {/* WhatsApp */}
                                  <div>
                                    <label htmlFor="whatsapp" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                      {l.whatsapp} <span className="text-slate-400 normal-case">({l.opcional})</span>
                                    </label>
                                    <input
                                      id="whatsapp"
                                      name="whatsapp"
                                      type="tel"
                                      value={form.whatsapp}
                                      onChange={handleChange}
                                      placeholder={l.whatsappPlaceholder}
                                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all"
                                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    />
                                  </div>
                                  {/* Empresa + Cargo */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label htmlFor="empresa" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                        {l.empresa} <span className="text-slate-400 normal-case">({l.opcional})</span>
                                      </label>
                                      <input
                                        id="empresa"
                                        name="empresa"
                                        type="text"
                                        value={form.empresa}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="cargo" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                        {l.cargo} <span className="text-slate-400 normal-case">({l.opcional})</span>
                                      </label>
                                      <input
                                        id="cargo"
                                        name="cargo"
                                        type="text"
                                        value={form.cargo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                      />
                                    </div>
                                  </div>
                                  {/* Cidade */}
                                  <div>
                                    <label htmlFor="cidade" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                      {l.cidade} <span className="text-slate-400 normal-case">({l.opcional})</span>
                                    </label>
                                    <input
                                      id="cidade"
                                      name="cidade"
                                      type="text"
                                      value={form.cidade}
                                      onChange={handleChange}
                                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all"
                                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                          {/* Back button */}
                          <div>
                            {currentStep > 1 && (
                              <button
                                type="button"
                                onClick={goBack}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                <ArrowLeft className="w-4 h-4" />
                                {l.back}
                              </button>
                            )}
                          </div>

                          {/* Right side buttons */}
                          <div className="flex items-center gap-3">
                            {/* Skip and Send (only on step 3) */}
                            {currentStep === 3 && (
                              <button
                                type="button"
                                onClick={handleSkipAndSend}
                                disabled={status === "sending"}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                <SkipForward className="w-4 h-4" />
                                {l.skipAndSend}
                              </button>
                            )}

                            {/* Next / Send button */}
                            {currentStep === 1 && (
                              <button
                                type="button"
                                onClick={goNext}
                                disabled={!canProceedStep1}
                                className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#2F6FD0] rounded-lg hover:bg-[#2563b8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#2F6FD0]/20"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                {l.next}
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}
                            {currentStep === 2 && (
                              <button
                                type="submit"
                                disabled={!canProceedStep2}
                                className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#2F6FD0] rounded-lg hover:bg-[#2563b8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#2F6FD0]/20"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                {l.next}
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}
                            {currentStep === 3 && (
                              <button
                                type="submit"
                                disabled={status === "sending"}
                                className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#2F6FD0] rounded-lg hover:bg-[#2563b8] transition-colors disabled:opacity-50 shadow-lg shadow-[#2F6FD0]/20"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                {status === "sending" ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {l.enviando}
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-4 h-4" />
                                    {l.enviar}
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Error message */}
                        <AnimatePresence>
                          {status === "error" && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                            >
                              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                              <p className="text-sm text-red-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                {l.erro}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </form>
                    )}

                    {/* LGPD + Trust Bar */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <div className="flex items-start gap-2 mb-4">
                        <Shield className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-slate-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {l.lgpd}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          Certificados
                        </span>
                        {["ISO 9001", "ISO 27001", "PCI DSS", "SENATRAN"].map((cert) => (
                          <span
                            key={cert}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-200 rounded-full text-slate-600"
                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                          >
                            <Shield className="w-3 h-3 text-[#2F6FD0]" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar (1/3) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h3
                    className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {l.canaisTitle}
                  </h3>
                  {/* Telefone */}
                  <a href="tel:+551920421373" className="block p-4 bg-white rounded-xl border border-slate-200 hover:border-[#2F6FD0]/30 hover:bg-blue-50/30 transition-all duration-200 group shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2F6FD0]/20 transition-colors">
                        <Phone className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.telefoneLabel}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-[#2F6FD0] transition-colors">
                          (19) 2042-1373
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* WhatsApp */}
                  <a href="https://wa.me/5511991287417" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-200 group shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                        <MessageCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.whatsappLabel}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          (11) 99128-7417
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* Email */}
                  <a href="mailto:comercial@areatec.com.br" className="block p-4 bg-white rounded-xl border border-slate-200 hover:border-[#2F6FD0]/30 hover:bg-blue-50/30 transition-all duration-200 group shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2F6FD0]/20 transition-colors">
                        <Mail className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.emailLabel}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-[#2F6FD0] transition-colors">
                          comercial@areatec.com.br
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* Endereço */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.enderecoLabel}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                          {l.endereco}
                        </p>
                        <p className="text-xs text-slate-500 mt-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.cnpj}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{l.horario}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/5511991287417"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 mt-6"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {l.whatsappCta}
                  </a>
                  {/* Social Proof Mini */}
                  <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-100 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F6FD0]/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-[#2F6FD0]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">+200</p>
                        <p className="text-[10px] text-slate-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {lang === "en" ? "Municipalities trust Areatec" : lang === "es" ? "Municipios confían en Areatec" : "Municípios confiam na Areatec"}
                        </p>
                      </div>
                    </div>
                  </div>
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
