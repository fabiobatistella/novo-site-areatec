// Navbar — Areatec Brand Guidelines + i18n + Mega Menu with product images
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Check, Car, ParkingCircle, MapPin, Link2, Brain, ScanFace, EyeOff } from "lucide-react";
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
  label: string;
  href: string;
  desc: string;
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
        label: "Olho Vivo Patrol",
        href: "/olhovivo-patrol",
        desc: lang === "en" ? "Intelligent traffic enforcement" : lang === "es" ? "Fiscalización inteligente de tránsito" : "Fiscalização inteligente de trânsito",
        icon: <Car className="w-5 h-5" />,
        image: "/assets/hb20_areatec_rack_final.webp",
      },
      {
        label: "Olho Vivo Parking",
        href: "/olhovivo-parking",
        desc: lang === "en" ? "Digital rotary parking" : lang === "es" ? "Estacionamiento rotativo digital" : "Estacionamento rotativo digital",
        icon: <ParkingCircle className="w-5 h-5" />,
        image: "/assets/parking_hero_smart.webp",
      },
      {
        label: "GeoTrust",
        href: "/olhovivo-patrol#geotrust",
        desc: lang === "en" ? "Authenticated geolocation" : lang === "es" ? "Geolocalización autenticada" : "Geolocalização autenticada",
        icon: <MapPin className="w-5 h-5" />,
        image: "/assets/geotrust_crypto_ai.webp",
      },
      {
        label: "AreaChain",
        href: "/olhovivo-patrol#areachain",
        desc: lang === "en" ? "Blockchain chain of custody" : lang === "es" ? "Blockchain cadena de custodia" : "Blockchain cadeia de custódia",
        icon: <Link2 className="w-5 h-5" />,
        image: "/assets/areachain_blockchain_ai.webp",
      },
    ],
    technology: [
      {
        label: lang === "en" ? "CORTEX Artificial Intelligence" : lang === "es" ? "CORTEX Inteligencia Artificial" : "CORTEX Inteligência Artificial",
        href: "/olhovivo-patrol#cortex_ai",
        desc: lang === "en" ? "Embedded AI engine" : lang === "es" ? "Motor de IA embarcado" : "Motor de IA embarcado",
        icon: <Brain className="w-5 h-5" />,
        image: "/assets/screen_cortex_rastreamento.webp",
      },
      {
        label: "AreaFace",
        href: "/olhovivo-patrol#reconhecimento_facial",
        desc: lang === "en" ? "Facial recognition in motion" : lang === "es" ? "Reconocimiento facial en movimiento" : "Reconhecimento facial em movimento",
        icon: <ScanFace className="w-5 h-5" />,
        image: "/assets/screen_busca_facial.webp",
      },
      {
        label: lang === "en" ? "Intelligent Blur" : lang === "es" ? "Blur Inteligente" : "Blur Inteligente",
        href: "/olhovivo-patrol#anonimizacao",
        desc: lang === "en" ? "AI-powered facial anonymization" : lang === "es" ? "Anonimización facial por IA" : "Anonimização facial por IA",
        icon: <EyeOff className="w-5 h-5" />,
        image: "/assets/blur_anonymization_ai.webp",
      },
    ],
  };
}

// ─── Mega Menu Panel ──────────────────────────────────────────────────────────

function MegaMenuPanel({
  items,
  onClose,
}: {
  items: MegaMenuItem[];
  onClose: () => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const currentImage = items[hoveredIndex]?.image ?? items[0]?.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-[#1a1a2e]/[0.98] backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      <div className="grid grid-cols-[1fr_280px] min-h-[320px]">
        {/* Left: product list */}
        <div className="p-3">
          {items.map((item, idx) => {
            const isInternal = item.href.startsWith("/") && !item.href.startsWith("/#");
            const Comp = isInternal ? Link : "a";
            const linkProps = isInternal
              ? { href: item.href, onClick: onClose }
              : { href: item.href, onClick: onClose };

            return (
              <Comp
                key={item.label}
                {...(linkProps as any)}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`flex items-start gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 group/item cursor-pointer ${
                  hoveredIndex === idx
                    ? "bg-white/[0.08]"
                    : "hover:bg-white/[0.05]"
                }`}
              >
                <div
                  className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    hoveredIndex === idx
                      ? "bg-[#2F6FD0] text-white"
                      : "bg-white/[0.06] text-white/50 group-hover/item:text-white/70"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`block text-sm font-semibold transition-colors duration-200 ${
                      hoveredIndex === idx ? "text-white" : "text-white/80 group-hover/item:text-white"
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="block text-xs text-white/40 mt-0.5 leading-relaxed"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.desc}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 -rotate-90 mt-1 shrink-0 transition-all duration-200 ${
                    hoveredIndex === idx
                      ? "text-[#2F6FD0] translate-x-0.5"
                      : "text-white/20"
                  }`}
                />
              </Comp>
            );
          })}
        </div>

        {/* Right: product image preview */}
        <div className="relative border-l border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center p-5"
            >
              <img
                src={currentImage}
                alt={items[hoveredIndex]?.label ?? ""}
                className="w-full h-full object-cover rounded-xl shadow-lg"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1a2e] to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span
              className="text-[10px] font-semibold text-white/30 uppercase tracking-widest"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {items[hoveredIndex]?.label}
            </span>
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
      className="absolute top-full left-0 mt-1 w-64 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden"
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
        { label: lang === "en" ? "Smart City" : lang === "es" ? "Ciudad Inteligente" : "Smart City", href: "/blog" },
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
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
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
          <div className="hidden lg:flex items-center gap-0.5">
            {navDropdowns.map((dropdown) => (
              <div
                key={dropdown.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(dropdown.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
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

      {/* Mobile Menu — keeps simple list behavior */}
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
  );
}

// ─── Mobile Dropdown (unchanged behavior) ─────────────────────────────────────

function MobileDropdown({ dropdown, onNavigate }: { dropdown: NavDropdown; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
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
