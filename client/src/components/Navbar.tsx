// Navbar — Areatec Mega Menu (Minimalist 3-Column Layout)
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Check,
  Car,
  ParkingCircle,
  MapPin,
  Link2,
  BrainCircuit,
  ScanFace,
  EyeOff,
  CircleAlert,
  Signpost,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { Link, useLocation } from "wouter";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "en", label: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "es", label: "Español", flag: "\u{1F1EA}\u{1F1F8}" },
];

function AreatecLogoSVG({ variant = "light", size = 32 }: { variant?: "light" | "colored" | "dark"; size?: number }) {
  const fill = variant === "colored" ? "#2F6FD0" : variant === "light" ? "#FFFFFF" : "#21212D";
  return (
    <svg width={size} height={size} viewBox="0 0 316 316" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M 271 0 L 281 2 L 290 6 L 296 10 L 305 19 L 305 20 L 307 22 L 308 25 L 311 29 L 312 34 L 313 35 L 313 38 L 314 39 L 314 44 L 315 45 L 315 271 L 314 272 L 314 277 L 313 278 L 311 286 L 307 293 L 304 296 L 304 297 L 296 305 L 290 309 L 281 313 L 271 315 L 240 315 L 240 97 L 239 96 L 238 90 L 234 85 L 234 84 L 230 80 L 222 76 L 128 75 L 117 72 L 109 67 L 102 60 L 102 59 L 98 54 L 98 52 L 96 48 L 96 45 L 95 44 L 95 31 L 96 30 L 96 27 L 97 26 L 97 24 L 100 18 L 102 16 L 102 14 L 104 13 L 110 7 L 119 2 L 128 0 Z" />
      <path d="M 181 115 L 190 119 L 195 124 L 195 125 L 198 129 L 199 135 L 200 136 L 200 143 L 199 144 L 199 315 L 90 315 L 70 311 L 59 307 L 51 303 L 39 295 L 24 281 L 24 280 L 17 272 L 15 268 L 13 266 L 8 256 L 8 254 L 5 248 L 4 243 L 3 242 L 3 239 L 2 238 L 2 235 L 1 234 L 1 228 L 0 227 L 0 203 L 1 202 L 2 192 L 3 191 L 3 188 L 4 187 L 4 185 L 5 184 L 7 176 L 13 164 L 24 149 L 35 138 L 49 128 L 61 122 L 73 118 L 90 115 Z" />
    </svg>
  );
}

// ─── Mega Menu Data ───────────────────────────────────────────────────────────

interface MegaMenuItem {
  id: string;
  label: string;
  href: string;
  desc: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
}

interface NavDropdown {
  label: string;
  items: { label: string; href: string; desc?: string }[];
  megaItems?: MegaMenuItem[];
  isMega?: boolean;
}

function getMegaMenuData(lang: Language): { products: MegaMenuItem[]; technology: MegaMenuItem[] } {
  return {
    products: [
      {
        id: "patrol",
        label: "Olho Vivo Patrol",
        href: "/olhovivo-patrol",
        desc: lang === "en" ? "Intelligent traffic enforcement with embedded AI, OCR and real-time processing." : lang === "es" ? "Fiscalización inteligente de tránsito con IA embarcada, OCR y procesamiento en tiempo real." : "Fiscalização inteligente de trânsito com IA embarcada, OCR e processamento em tempo real.",
        features: lang === "en" ? ["OCR in motion", "99.2% accuracy", "Real-time processing"] : lang === "es" ? ["OCR en movimiento", "99.2% precisión", "Procesamiento en tiempo real"] : ["OCR em movimento", "99,2% de acurácia", "Processamento em tempo real"],
        icon: <Car className="w-5 h-5" />,
        image: "/assets/hb20_areatec_rack_final.webp",
      },
      {
        id: "parking",
        label: "Olho Vivo Parking",
        href: "/olhovivo-parking",
        desc: lang === "en" ? "Digital rotary parking with automatic plate recognition and mobile payment." : lang === "es" ? "Estacionamiento rotativo digital con reconocimiento automático de placas y pago móvil." : "Estacionamento rotativo digital com reconhecimento automático de placas e pagamento mobile.",
        features: lang === "en" ? ["Plate recognition", "Mobile payment", "Real-time monitoring"] : lang === "es" ? ["Reconocimiento de placas", "Pago móvil", "Monitoreo en tiempo real"] : ["Reconhecimento de placas", "Pagamento mobile", "Monitoramento em tempo real"],
        icon: <ParkingCircle className="w-5 h-5" />,
        image: "/assets/parking_hero_smart.webp",
      },
      {
        id: "geotrust",
        label: "GeoTrust",
        href: "/olhovivo-patrol#geotrust",
        desc: lang === "en" ? "Cryptographically authenticated geolocation ensuring legal validity of evidence." : lang === "es" ? "Geolocalización autenticada criptográficamente garantizando validez legal de evidencias." : "Geolocalização autenticada criptograficamente garantindo validade jurídica das evidências.",
        features: lang === "en" ? ["Crypto authentication", "Legal validity", "Tamper-proof"] : lang === "es" ? ["Autenticación cripto", "Validez legal", "A prueba de manipulación"] : ["Autenticação cripto", "Validade jurídica", "À prova de adulteração"],
        icon: <MapPin className="w-5 h-5" />,
        image: `/assets/geotrust_${lang}.webp`,
      },
      {
        id: "areachain",
        label: "AreaChain",
        href: "/olhovivo-patrol#areachain",
        desc: lang === "en" ? "Blockchain-based chain of custody for immutable digital evidence management." : lang === "es" ? "Cadena de custodia basada en blockchain para gestión inmutable de evidencias digitales." : "Cadeia de custódia baseada em blockchain para gestão imutável de evidências digitais.",
        features: lang === "en" ? ["Blockchain registry", "Immutable evidence", "Full traceability"] : lang === "es" ? ["Registro blockchain", "Evidencia inmutable", "Trazabilidad total"] : ["Registro blockchain", "Evidência imutável", "Rastreabilidade total"],
        icon: <Link2 className="w-5 h-5" />,
        image: `/assets/areachain_${lang}.webp`,
      },
    ],
    technology: [
      {
        id: "cortex",
        label: "CORTEX AI",
        href: "/olhovivo-patrol#cortex_ai",
        desc: lang === "en" ? "Proprietary embedded AI engine powering all Areatec products with edge computing." : lang === "es" ? "Motor de IA embarcado propietario que impulsa todos los productos Areatec con edge computing." : "Motor de IA embarcado proprietário que impulsiona todos os produtos Areatec com edge computing.",
        features: lang === "en" ? ["Edge computing", "Real-time inference", "Self-learning"] : lang === "es" ? ["Edge computing", "Inferencia en tiempo real", "Auto-aprendizaje"] : ["Edge computing", "Inferência em tempo real", "Auto-aprendizado"],
        icon: <BrainCircuit className="w-5 h-5" />,
        image: "/assets/screen_cortex_rastreamento.webp",
      },
      {
        id: "facial",
        label: "AreaFace",
        href: "/olhovivo-patrol#reconhecimento_facial",
        desc: lang === "en" ? "Facial recognition in motion for public safety and access control applications." : lang === "es" ? "Reconocimiento facial en movimiento para seguridad pública y control de acceso." : "Reconhecimento facial em movimento para segurança pública e controle de acesso.",
        features: lang === "en" ? ["Recognition in motion", "Alert database", "98.7% accuracy"] : lang === "es" ? ["Reconocimiento en movimiento", "Base de alertas", "98.7% precisión"] : ["Reconhecimento em movimento", "Base de alertas", "98,7% de acurácia"],
        icon: <ScanFace className="w-5 h-5" />,
        image: "/assets/screen_busca_facial.webp",
      },
      {
        id: "blur",
        label: lang === "en" ? "Intelligent Blur" : lang === "es" ? "Blur Inteligente" : "Blur Inteligente",
        href: "/olhovivo-patrol#anonimizacao",
        desc: lang === "en" ? "AI-powered facial anonymization compliant with LGPD/GDPR privacy regulations." : lang === "es" ? "Anonimización facial por IA compatible con regulaciones de privacidad LGPD/GDPR." : "Anonimização facial por IA em conformidade com regulações de privacidade LGPD/GDPR.",
        features: lang === "en" ? ["LGPD/GDPR compliant", "Automatic blur", "Selective processing"] : lang === "es" ? ["Compatible LGPD/GDPR", "Blur automático", "Procesamiento selectivo"] : ["Conformidade LGPD/GDPR", "Blur automático", "Processamento seletivo"],
        icon: <EyeOff className="w-5 h-5" />,
        image: "/assets/blur_anonymization_ai.webp",
      },
      {
        id: "buracos",
        label: lang === "en" ? "Pothole Detection" : lang === "es" ? "Detección de Baches" : "Detecção de Buracos",
        href: "/olhovivo-patrol#zeladoria",
        desc: lang === "en" ? "Automated road surface defect detection for urban stewardship and maintenance." : lang === "es" ? "Detección automatizada de defectos en la superficie vial para gestión urbana." : "Detecção automatizada de defeitos no pavimento para zeladoria urbana e manutenção.",
        features: lang === "en" ? ["Automatic detection", "Severity classification", "GPS mapping"] : lang === "es" ? ["Detección automática", "Clasificación de severidad", "Mapeo GPS"] : ["Detecção automática", "Classificação de severidade", "Mapeamento GPS"],
        icon: <CircleAlert className="w-5 h-5" />,
        image: "/assets/screen_zeladoria_buracos.webp",
      },
      {
        id: "sinalizacao",
        label: lang === "en" ? "Signage Detection" : lang === "es" ? "Detección de Señalización" : "Sinalização",
        href: "/olhovivo-patrol#sinalizacao",
        desc: lang === "en" ? "Automated road signage inventory and condition assessment via computer vision." : lang === "es" ? "Inventario automatizado de señalización vial y evaluación de condición por visión computacional." : "Inventário automatizado de sinalização viária e avaliação de condição por visão computacional.",
        features: lang === "en" ? ["Automatic inventory", "Condition assessment", "Maintenance alerts"] : lang === "es" ? ["Inventario automático", "Evaluación de condición", "Alertas de mantenimiento"] : ["Inventário automático", "Avaliação de condição", "Alertas de manutenção"],
        icon: <Signpost className="w-5 h-5" />,
        image: "/assets/screen_sinalizacao_horizontal.webp",
      },
    ],
  };
}

// ─── Mega Menu Panel (3-Column: Categories | Image | Details) ────────────────

function MegaMenuPanel({
  items,
  onClose,
}: {
  items: MegaMenuItem[];
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);
  const activeItem = items[activeIndex];
  const panelRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [items.length, onClose]
  );

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[860px] bg-[#0f1021]/[0.98] backdrop-blur-3xl rounded-2xl border border-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden"
      role="menu"
      aria-label="Mega menu"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="grid grid-cols-[220px_1fr_260px] min-h-[380px]">
        {/* Column 1: Category Navigation */}
        <nav className="py-4 px-3 border-r border-white/[0.05]" aria-label="Categorias">
          <div className="space-y-0.5">
            {items.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => {
                    setActiveIndex(idx);
                    setImageLoaded(false);
                  }}
                  onFocus={() => setActiveIndex(idx)}
                  role="menuitem"
                  aria-current={isActive ? "true" : undefined}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? "bg-[#2F6FD0]/15 text-white"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isActive
                        ? "bg-[#2F6FD0] text-white shadow-lg shadow-blue-500/20"
                        : "bg-white/[0.05] text-white/40"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className="text-[13px] font-medium leading-tight truncate"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.label}
                  </span>
                  <ChevronRight
                    className={`w-3 h-3 ml-auto shrink-0 transition-all duration-200 ${
                      isActive ? "text-[#2F6FD0] opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </nav>

        {/* Column 2: Product Image */}
        <div className="relative flex items-center justify-center p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.image}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: imageLoaded ? 1 : 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src={activeItem.image}
                alt={activeItem.label}
                className="max-w-full max-h-[300px] w-auto h-auto object-contain rounded-xl"
                loading="eager"
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>
          </AnimatePresence>
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-gradient-radial from-[#2F6FD0]/[0.04] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Column 3: Description & Features */}
        <div className="py-5 px-5 border-l border-white/[0.05] flex flex-col justify-between">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <h3
                  className="text-white text-[15px] font-semibold mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {activeItem.label}
                </h3>
                <p
                  className="text-white/45 text-xs leading-relaxed mb-5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {activeItem.desc}
                </p>
                <div className="space-y-2">
                  {activeItem.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2F6FD0] shrink-0" />
                      <span
                        className="text-white/60 text-xs"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA Link */}
          <div className="mt-4">
            {(() => {
              const isInternal = activeItem.href.startsWith("/") && !activeItem.href.startsWith("/#");
              const Comp = isInternal ? Link : "a";
              return (
                <Comp
                  href={activeItem.href}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-[#2F6FD0] text-xs font-semibold hover:text-blue-300 transition-colors duration-200 group/cta"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {activeItem.label === "CORTEX AI" ? "Explorar" : (
                    activeItem.href.includes("patrol") || activeItem.href.includes("parking")
                      ? "Ver produto"
                      : "Saiba mais"
                  )}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </Comp>
              );
            })()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Simple Dropdown Panel (for Cases, Blog, Empresa) ─────────────────────────

function SimpleDropdownPanel({
  items,
  onClose,
}: {
  items: { label: string; href: string; desc?: string }[];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden"
      role="menu"
    >
      <div className="p-1.5">
        {items.map((item) => {
          const isInternal = item.href.startsWith("/") && !item.href.startsWith("/#");
          if (isInternal) {
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                role="menuitem"
                className="block px-3 py-2.5 rounded-lg hover:bg-blue-50/80 transition-colors group/item"
              >
                <span className="block text-sm font-semibold text-slate-800 group-hover/item:text-[#2F6FD0] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {item.label}
                </span>
                {item.desc && (
                  <span className="block text-xs text-slate-400 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {item.desc}
                  </span>
                )}
              </Link>
            );
          }
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              role="menuitem"
              className="block px-3 py-2.5 rounded-lg hover:bg-blue-50/80 transition-colors group/item"
            >
              <span className="block text-sm font-semibold text-slate-800 group-hover/item:text-[#2F6FD0] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {item.label}
              </span>
              {item.desc && (
                <span className="block text-xs text-slate-400 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {item.desc}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [location] = useLocation();

  const megaData = getMegaMenuData(lang);

  const productsLabel = lang === "en" ? "Products" : lang === "es" ? "Productos" : "Produtos";
  const technologyLabel = lang === "en" ? "Technology" : lang === "es" ? "Tecnología" : "Tecnologia";

  const navDropdowns: NavDropdown[] = [
    {
      label: productsLabel,
      isMega: true,
      megaItems: megaData.products,
      items: megaData.products.map((p) => ({ label: p.label, href: p.href, desc: p.desc })),
    },
    {
      label: technologyLabel,
      isMega: true,
      megaItems: megaData.technology,
      items: megaData.technology.map((t) => ({ label: t.label, href: t.href, desc: t.desc })),
    },
    {
      label: "Cases",
      items: [
        { label: lang === "en" ? "Traffic Enforcement" : lang === "es" ? "Fiscalización de Tránsito" : "Fiscalização de Trânsito", href: "/#setores", desc: lang === "en" ? "200+ cities in operation" : lang === "es" ? "200+ ciudades en operación" : "200+ cidades em operação" },
        { label: lang === "en" ? "Rotary Parking" : lang === "es" ? "Estacionamiento Rotativo" : "Estacionamento Rotativo", href: "/#setores", desc: lang === "en" ? "1M+ daily transactions" : lang === "es" ? "1M+ transacciones diarias" : "1M+ transações diárias" },
        { label: lang === "en" ? "Urban Stewardship" : lang === "es" ? "Gestión Urbana" : "Zeladoria Urbana", href: "/#setores", desc: lang === "en" ? "Automated city inventory" : lang === "es" ? "Inventario automatizado de la ciudad" : "Inventário automatizado da cidade" },
      ],
    },
    {
      label: "Blog",
      items: [
        { label: lang === "en" ? "All Articles" : lang === "es" ? "Todos los Artículos" : "Todos os Artigos", href: "/blog" },
        { label: lang === "en" ? "Technology" : lang === "es" ? "Tecnología" : "Tecnologia", href: "/blog" },
        { label: lang === "en" ? "Smart City" : lang === "es" ? "Ciudad Inteligente" : "Cidade Inteligente", href: "/blog" },
      ],
    },
    {
      label: lang === "en" ? "Company" : lang === "es" ? "Empresa" : "Empresa",
      items: [
        { label: lang === "en" ? "About Areatec" : lang === "es" ? "Sobre Areatec" : "Sobre a Areatec", href: "/#sobre", desc: lang === "en" ? "30+ years of innovation" : lang === "es" ? "30+ años de innovación" : "30+ anos de inovação" },
        { label: lang === "en" ? "History" : lang === "es" ? "Historia" : "História", href: "/#sobre" },
        { label: lang === "en" ? "Certifications" : lang === "es" ? "Certificaciones" : "Certificações", href: "/#diferenciais" },
        { label: lang === "en" ? "Contact" : lang === "es" ? "Contacto" : "Contato", href: "/contato" },
      ],
    },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) ?? languages[0];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectLang = (code: Language) => {
    setLang(code);
    setLangOpen(false);
  };

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 180);
  }, []);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, []);

  const handleNavClick = (href: string) => {
    closeDropdown();
    if (href.startsWith("/#") && location === "/") {
      const el = document.querySelector(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav aria-label="Navegação principal" className="flex items-center justify-between h-[72px] lg:h-20">
          <Link href="/" aria-label="Areatec - Ir para o início" className="flex items-center gap-2 group">
            <AreatecLogoSVG variant={scrolled ? "colored" : "light"} size={34} />
            <span
              className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${scrolled ? "text-[#21212D]" : "text-white"}`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Areatec
            </span>
          </Link>

          {/* Desktop Nav with Mega Menus + Simple Dropdowns */}
          <div className="hidden lg:flex items-center gap-0.5" role="menubar">
            {navDropdowns.map((dropdown) => (
              <div
                key={dropdown.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(dropdown.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === dropdown.label}
                  className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    scrolled
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  } ${activeDropdown === dropdown.label ? (scrolled ? "text-slate-900 bg-slate-100/80" : "text-white bg-white/10") : ""}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {dropdown.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === dropdown.label ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === dropdown.label && (
                    dropdown.isMega && dropdown.megaItems ? (
                      <MegaMenuPanel
                        items={dropdown.megaItems}
                        onClose={closeDropdown}
                      />
                    ) : (
                      <SimpleDropdownPanel
                        items={dropdown.items}
                        onClose={closeDropdown}
                      />
                    )
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Selecionar idioma"
                aria-expanded={langOpen}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                  scrolled
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-lg leading-none">{currentLangObj.flag}</span>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="font-medium">{currentLangObj.code.toUpperCase()}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden"
                  >
                    <div className="p-1.5">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => selectLang(l.code)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                            lang === l.code
                              ? "bg-blue-50 text-[#2F6FD0]"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="text-base leading-none">{l.flag}</span>
                          <div className="flex flex-col items-start">
                            <span className="font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.label}</span>
                            <span className="text-[10px] text-slate-400 font-medium" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.code.toUpperCase()}</span>
                          </div>
                          {lang === l.code && <Check className="w-4 h-4 text-[#2F6FD0] ml-auto" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href="/contato"
              className="px-5 py-2.5 bg-[#2F6FD0] text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:bg-[#2563C4] transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {lang === "en" ? "Contact Us" : lang === "es" ? "Contáctenos" : "Fale Conosco"}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-[#2F6FD0]" : "text-white"}`}
          >
            {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 max-h-[80vh] overflow-y-auto"
          >
            <div className="container py-4 space-y-1">
              {navDropdowns.map((dropdown) => (
                <MobileDropdown key={dropdown.label} dropdown={dropdown} onNavigate={() => setMobileOpen(false)} />
              ))}
              <div className="px-4 pt-3 pb-1">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {lang === "en" ? "Language" : lang === "es" ? "Idioma" : "Idioma"}
                </p>
                <div className="flex gap-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => selectLang(l.code)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        lang === l.code
                          ? "bg-blue-50 text-[#2F6FD0] border border-blue-200"
                          : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-sm">{l.flag}</span>
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Link
                href="/contato"
                onClick={() => setMobileOpen(false)}
                className="block mt-3 mx-4 py-3 bg-[#2F6FD0] text-white text-center rounded-lg font-semibold hover:bg-[#2563C4] transition-colors"
              >
                {lang === "en" ? "Contact Us" : lang === "es" ? "Contáctenos" : "Fale Conosco"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    {/* Backdrop overlay when mega menu is open */}
    <AnimatePresence>
      {activeDropdown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setActiveDropdown(null)}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
    </>
  );
}

// ─── Mobile Dropdown ─────────────────────────────────────────────────────────

function MobileDropdown({ dropdown, onNavigate }: { dropdown: NavDropdown; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-[#2F6FD0] hover:bg-blue-50/50 rounded-lg transition-colors font-medium"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {dropdown.label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-6 pb-2 space-y-0.5">
              {dropdown.items.map((item) => {
                const isInternal = item.href.startsWith("/") && !item.href.startsWith("/#");
                if (isInternal) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onNavigate}
                      className="block px-3 py-2 text-sm text-slate-600 hover:text-[#2F6FD0] hover:bg-blue-50/50 rounded-lg transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className="block px-3 py-2 text-sm text-slate-600 hover:text-[#2F6FD0] hover:bg-blue-50/50 rounded-lg transition-colors"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
