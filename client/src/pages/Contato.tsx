// Contato — Redesign UX/UI completo para máxima conversão
// Seletor de país com busca (todos os países), fix layout telefone, fix Supabase
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle,
  Car, ParkingCircle, Cpu, Handshake, MessageSquare, Package, Shield,
  Clock, ChevronDown, Users, Building2, Search
} from "lucide-react";
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

// ─── Complete Country List (all countries with flag emoji and DDI) ─────────────
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
  { code: "SZ", name: "Eswatini", ddi: "+268", flag: "🇸🇿" },
  { code: "ET", name: "Etiópia", ddi: "+251", flag: "🇪🇹" },
  { code: "FJ", name: "Fiji", ddi: "+679", flag: "🇫🇯" },
  { code: "PH", name: "Filipinas", ddi: "+63", flag: "🇵🇭" },
  { code: "FI", name: "Finlândia", ddi: "+358", flag: "🇫🇮" },
  { code: "FR", name: "França", ddi: "+33", flag: "🇫🇷" },
  { code: "GA", name: "Gabão", ddi: "+241", flag: "🇬🇦" },
  { code: "GM", name: "Gâmbia", ddi: "+220", flag: "🇬🇲" },
  { code: "GH", name: "Gana", ddi: "+233", flag: "🇬🇭" },
  { code: "GE", name: "Geórgia", ddi: "+995", flag: "🇬🇪" },
  { code: "GD", name: "Granada", ddi: "+1473", flag: "🇬🇩" },
  { code: "GR", name: "Grécia", ddi: "+30", flag: "🇬🇷" },
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
  { code: "CF", name: "República Centro-Africana", ddi: "+236", flag: "🇨🇫" },
  { code: "DO", name: "República Dominicana", ddi: "+1809", flag: "🇩🇴" },
  { code: "CZ", name: "República Tcheca", ddi: "+420", flag: "🇨🇿" },
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

// ─── Interest Cards Data ──────────────────────────────────────────────────────
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

// ─── Labels i18n ──────────────────────────────────────────────────────────────
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
  onSelect: (c: Country) => void;
  searchPlaceholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [open]);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return allCountries;
    const q = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return allCountries.filter((c) => {
      const name = c.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const ddi = c.ddi;
      const code = c.code.toLowerCase();
      return name.includes(q) || ddi.includes(q) || code.includes(q);
    });
  }, [search]);

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-[46px] px-3 bg-slate-50 border border-slate-200 rounded-l-xl text-sm hover:bg-slate-100 transition-colors min-w-[100px] justify-between"
        aria-label="Select country code"
      >
        <span className="text-base leading-none">{selectedCountry.flag}</span>
        <span className="text-slate-700 font-medium text-xs whitespace-nowrap" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {selectedCountry.ddi}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 z-50 overflow-hidden"
          >
            {/* Search input */}
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
            {/* Country list */}
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contato() {
  const { lang } = useLanguage();
  const l = labels[lang];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Build interests list with "outro-produto" detail
      const interessesList = [...selectedInterests];
      if (selectedInterests.includes("outro-produto") && outroProdutoText) {
        const idx = interessesList.indexOf("outro-produto");
        interessesList[idx] = `outro-produto: ${outroProdutoText}`;
      }

      // Build whatsapp field: use telefone with DDI if provided, or whatsapp field
      const fullPhone = form.telefone ? `${selectedCountry.ddi} ${form.telefone}` : null;
      const whatsappValue = form.whatsapp || fullPhone || null;

      // Build cargo field: include empresa info if provided
      const cargoValue = form.empresa
        ? (form.cargo ? `${form.cargo} — ${form.empresa}` : form.empresa)
        : (form.cargo || null);

      // Payload matching exact Supabase columns:
      // nome, email, whatsapp, interesse, cidade, cargo, mensagem, lang, source, created_at
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

      // Remove null values to avoid sending them
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== null)
      );

      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_leads`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal",
        },
        body: JSON.stringify(cleanPayload),
      });

      if (res.ok || res.status === 201) {
        setStatus("success");
        setForm({ nome: "", email: "", telefone: "", whatsapp: "", empresa: "", cidade: "", cargo: "", mensagem: "" });
        setSelectedInterests([]);
        setOutroProdutoText("");
      } else {
        const errText = await res.text();
        console.error("Supabase error:", errText);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    }
  };

  const inputClass = "w-full h-[46px] px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all duration-200 text-sm";
  const textareaClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all duration-200 text-sm resize-none";
  const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <>
      <SEOHead title={l.seoTitle} description={l.seoDesc} path="/contato" jsonLd={contactSchema} />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          {/* Hero Section */}
          <section className="relative pt-28 pb-20 bg-gradient-to-b from-slate-900 via-[#1a1a2e] to-slate-800 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 right-[10%] w-[500px] h-[500px] bg-[#2F6FD0]/8 rounded-full blur-[150px]" />
              <div className="absolute bottom-0 left-[20%] w-80 h-80 bg-blue-400/5 rounded-full blur-[120px]" />
            </div>
            <div className="container relative max-w-3xl mx-auto text-center px-4">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[11px] font-medium text-white/70 tracking-wide" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {l.socialProof}
                  </span>
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {l.pageTitle}
                </h1>
                <p
                  className="text-base sm:text-lg text-white/55 leading-relaxed max-w-xl mx-auto"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {l.pageSubtitle}
                </p>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-wrap items-center justify-center gap-6 mt-10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#2F6FD0]" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white/90">{l.trustResponse}</p>
                    <p className="text-[10px] text-white/40">{l.trustResponseDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white/90">{l.trustSecurity}</p>
                    <p className="text-[10px] text-white/40">{l.trustSecurityDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white/90">{l.trustExperts}</p>
                    <p className="text-[10px] text-white/40">{l.trustExpertsDesc}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Interest Cards */}
          <section className="py-12 lg:py-16 bg-slate-50/60">
            <div className="container max-w-5xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <h2
                  className="text-xl sm:text-2xl font-bold text-slate-800 mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {l.selectInterest}
                </h2>
                <p className="text-sm text-slate-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {l.selectInterestSub}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
              >
                {interestCards.map((card, idx) => (
                  <motion.button
                    key={card.value}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * idx }}
                    onClick={() => toggleInterest(card.value)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center group cursor-pointer ${
                      selectedInterests.includes(card.value)
                        ? "border-[#2F6FD0] bg-blue-50/80 shadow-md shadow-blue-100/50"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        selectedInterests.includes(card.value)
                          ? "bg-[#2F6FD0] text-white shadow-md shadow-blue-200"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                      }`}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <span
                        className={`text-[11px] font-bold leading-tight block transition-colors duration-200 ${
                          selectedInterests.includes(card.value) ? "text-[#2F6FD0]" : "text-slate-700"
                        }`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {card.label[lang]}
                      </span>
                      <span className="text-[9px] text-slate-400 mt-0.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {card.desc[lang]}
                      </span>
                    </div>
                    {selectedInterests.includes(card.value) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#2F6FD0] rounded-full flex items-center justify-center shadow-sm"
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Outro Produto - campo livre */}
              <AnimatePresence>
                {selectedInterests.includes("outro-produto") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 max-w-lg mx-auto overflow-hidden"
                  >
                    <input
                      type="text"
                      value={outroProdutoText}
                      onChange={(e) => setOutroProdutoText(e.target.value)}
                      placeholder={l.outroProdutoPlaceholder}
                      className={`${inputClass} border-[#2F6FD0]/30 bg-blue-50/30`}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Form + Sidebar */}
          <section className="py-12 lg:py-20 bg-white">
            <div className="container max-w-6xl mx-auto px-4">
              <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-2"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Nome + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="nome" className={labelClass} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.nome} *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          name="nome"
                          required
                          value={form.nome}
                          onChange={handleChange}
                          className={inputClass}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.email} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className={inputClass}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        />
                      </div>
                    </div>

                    {/* Row 2: Telefone com seletor de país + WhatsApp */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="telefone" className={labelClass} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.telefone} <span className="text-slate-300 font-normal lowercase">({l.opcional})</span>
                        </label>
                        <div className="flex items-stretch">
                          <CountrySelector
                            selectedCountry={selectedCountry}
                            onSelect={setSelectedCountry}
                            searchPlaceholder={l.searchCountry}
                          />
                          <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            placeholder={l.telefonePlaceholder}
                            className="flex-1 min-w-0 h-[46px] px-4 py-3 bg-white border border-slate-200 border-l-0 rounded-r-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F6FD0]/20 focus:border-[#2F6FD0] transition-all duration-200 text-sm"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="whatsapp" className={labelClass} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.whatsapp} <span className="text-slate-300 font-normal lowercase">({l.opcional})</span>
                        </label>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={form.whatsapp}
                          onChange={handleChange}
                          placeholder={l.whatsappPlaceholder}
                          className={inputClass}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        />
                      </div>
                    </div>

                    {/* Row 3: Empresa + Cargo */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="empresa" className={labelClass} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.empresa} <span className="text-slate-300 font-normal lowercase">({l.opcional})</span>
                        </label>
                        <input
                          type="text"
                          id="empresa"
                          name="empresa"
                          value={form.empresa}
                          onChange={handleChange}
                          className={inputClass}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="cargo" className={labelClass} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {l.cargo} <span className="text-slate-300 font-normal lowercase">({l.opcional})</span>
                        </label>
                        <input
                          type="text"
                          id="cargo"
                          name="cargo"
                          value={form.cargo}
                          onChange={handleChange}
                          className={inputClass}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        />
                      </div>
                    </div>

                    {/* Row 4: Cidade */}
                    <div>
                      <label htmlFor="cidade" className={labelClass} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {l.cidade} <span className="text-slate-300 font-normal lowercase">({l.opcional})</span>
                      </label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={form.cidade}
                        onChange={handleChange}
                        className={inputClass}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>

                    {/* Row 5: Mensagem */}
                    <div>
                      <label htmlFor="mensagem" className={labelClass} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
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
                        className={textareaClass}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>

                    {/* Status Messages */}
                    <AnimatePresence>
                      {status === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700"
                        >
                          <CheckCircle className="w-5 h-5 shrink-0" />
                          <span className="text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.sucesso}</span>
                        </motion.div>
                      )}
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                        >
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          <span className="text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.erro}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit + LGPD */}
                    <div className="flex flex-col gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-[#2F6FD0] text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:bg-[#2563C4] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none text-base"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {status === "sending" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {l.enviando}
                          </>
                        ) : (
                          <>
                            {l.enviar}
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.lgpd}</span>
                      </div>
                    </div>

                    {/* Trust Bar - Certifications */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-6 border-t border-slate-100">
                      <span
                        className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mr-1"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {lang === "en" ? "Certified" : "Certificados"}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-50/50 border border-emerald-200/70 rounded-full shadow-sm">
                        <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                        <span className="text-[10px] font-bold text-emerald-800 tracking-wide" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>ISO 9001</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-50/50 border border-blue-200/70 rounded-full shadow-sm">
                        <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="M12 8v4m0 4h.01" />
                        </svg>
                        <span className="text-[10px] font-bold text-blue-800 tracking-wide" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>ISO 27001</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-50/50 border border-purple-200/70 rounded-full shadow-sm">
                        <svg className="w-3.5 h-3.5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        <span className="text-[10px] font-bold text-purple-800 tracking-wide" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>PCI DSS</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-50/50 border border-amber-200/70 rounded-full shadow-sm">
                        <svg className="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 12l2 2 4-4" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span className="text-[10px] font-bold text-amber-800 tracking-wide" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>SENATRAN</span>
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
                    className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {l.canaisTitle}
                  </h3>

                  {/* Telefone */}
                  <a href="tel:+551920421373" className="block p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#2F6FD0]/30 hover:bg-blue-50/30 transition-all duration-200 group">
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
                  <a href="https://wa.me/5511991287417" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-300/50 hover:bg-emerald-50/30 transition-all duration-200 group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
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
                  <a href="mailto:comercial@areatec.com.br" className="block p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#2F6FD0]/30 hover:bg-blue-50/30 transition-all duration-200 group">
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
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
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
