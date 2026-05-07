// Navbar — Areatec Brand Guidelines Update
// Fixed top navbar with scroll-based glass effect, language dropdown (PT/EN/ES), mobile menu
// Logo: New SVG symbol + "Areatec" wordmark in Barlow Condensed
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Menu, X, Check } from "lucide-react";

const navLinks = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Tecnologias", href: "#diferenciais" },
  { label: "Setores", href: "#setores" },
  { label: "Blog", href: "#blog" },
  { label: "Sobre", href: "#sobre" },
];

const languages = [
  { code: "PT", label: "Português", flag: "🇧🇷" },
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
];

function AreatecLogoSVG({ variant = "light", size = 32 }: { variant?: "light" | "colored" | "dark"; size?: number }) {
  const fill = variant === "colored" ? "#2F6FD0" : variant === "light" ? "#FFFFFF" : "#21212D";
  return (
    <svg width={size} height={size} viewBox="0 0 316 316" fill={fill} xmlns="http://www.w3.org/2000/svg">
      {/* Right stem + top hook - traced from official logo */}
      <path d="M 271 0 L 281 2 L 290 6 L 296 10 L 305 19 L 305 20 L 307 22 L 308 25 L 311 29 L 312 34 L 313 35 L 313 38 L 314 39 L 314 44 L 315 45 L 315 271 L 314 272 L 314 277 L 313 278 L 311 286 L 307 293 L 304 296 L 304 297 L 296 305 L 290 309 L 281 313 L 271 315 L 240 315 L 240 97 L 239 96 L 238 90 L 234 85 L 234 84 L 230 80 L 222 76 L 128 75 L 117 72 L 109 67 L 102 60 L 102 59 L 98 54 L 98 52 L 96 48 L 96 45 L 95 44 L 95 31 L 96 30 L 96 27 L 97 26 L 97 24 L 100 18 L 102 16 L 102 14 L 104 13 L 110 7 L 119 2 L 128 0 Z" />
      {/* Left body - traced from official logo */}
      <path d="M 181 115 L 190 119 L 195 124 L 195 125 L 198 129 L 199 135 L 200 136 L 200 143 L 199 144 L 199 315 L 90 315 L 70 311 L 59 307 L 51 303 L 39 295 L 24 281 L 24 280 L 17 272 L 15 268 L 13 266 L 8 256 L 8 254 L 5 248 L 4 243 L 3 242 L 3 239 L 2 238 L 2 235 L 1 234 L 1 228 L 0 227 L 0 203 L 1 202 L 2 192 L 3 191 L 3 188 L 4 187 L 4 185 L 5 184 L 7 176 L 13 164 L 24 149 L 35 138 L 49 128 L 61 122 L 73 118 L 90 115 Z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("PT");
  const langRef = useRef<HTMLDivElement>(null);

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

  const selectLang = (code: string) => {
    setCurrentLang(code);
    setLangOpen(false);
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
        <nav className="flex items-center justify-between h-[72px] lg:h-20">
          {/* Logo — New Brand Guidelines SVG */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <AreatecLogoSVG
              variant={scrolled ? "colored" : "light"}
              size={34}
            />
            <span
              className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${scrolled ? "text-[#21212D]" : "text-white"}`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Areatec
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  scrolled
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                  scrolled
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-lg leading-none">🇧🇷</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="font-medium">{currentLang}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden"
                  >
                    <div className="p-1.5">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => selectLang(lang.code)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                            currentLang === lang.code
                              ? "bg-blue-50 text-[#2F6FD0]"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="text-base leading-none">{lang.flag}</span>
                          <div className="flex flex-col items-start">
                            <span className="font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lang.label}</span>
                            <span className="text-[10px] text-slate-400 font-medium" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{lang.code}</span>
                          </div>
                          {currentLang === lang.code && <Check className="w-4 h-4 text-[#2F6FD0] ml-auto" />}
                        </button>
                      ))}
                    </div>
                    <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100">
                      <p className="text-[10px] text-slate-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Tradução em breve</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#contato"
              className="px-5 py-2.5 bg-[#2F6FD0] text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:bg-[#2563C4] transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Fale Conosco
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-[#2F6FD0]" : "text-white"}`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100"
          >
            <div className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-slate-700 hover:text-[#2F6FD0] hover:bg-blue-50/50 rounded-lg transition-colors font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 pt-3 pb-1">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Idioma</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => selectLang(lang.code)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentLang === lang.code
                          ? "bg-blue-50 text-[#2F6FD0] border border-blue-200"
                          : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>
              <a
                href="#contato"
                onClick={() => setMobileOpen(false)}
                className="block mt-3 px-4 py-3 bg-[#2F6FD0] text-white text-center rounded-lg font-semibold hover:bg-[#2563C4] transition-colors"
              >
                Fale Conosco
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
