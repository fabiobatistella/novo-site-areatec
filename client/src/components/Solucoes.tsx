// Solucoes — Areatec (7 Products) + i18n + Olho Vivo Official Logo
import { motion } from "framer-motion";
import { FileText, Radio, Satellite, Bike, ArrowRight, ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "@/components/OptimizedImage";





/* ── Olho Vivo Official Symbol (inline SVG) ── */
function OlhoVivoSymbol({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Olho Vivo">
      <path d="M80 350.269C80 201.004 201.004 80 350.271 80H820.196C836.261 80 844.294 99.4342 832.918 110.777L655.97 287.207H422.343C347.71 287.207 287.208 347.708 287.208 422.341V655.967L110.777 832.914C99.4343 844.29 80 836.257 80 820.192V350.269Z" fill="#10B981"/>
      <path d="M944 673.731C944 822.996 822.996 944 673.729 944H203.804C187.739 944 179.706 924.566 191.082 913.223L368.03 736.793H601.657C676.29 736.793 736.792 676.292 736.792 601.659V368.033L913.223 191.086C924.566 179.71 944 187.743 944 203.808V673.731Z" fill="#10B981"/>
      <path d="M415.253 448.483C415.253 430.131 430.131 415.253 448.484 415.253H575.522C593.875 415.253 608.753 430.131 608.753 448.483V575.522C608.753 593.874 593.875 608.752 575.523 608.752H448.484C430.131 608.752 415.253 593.874 415.253 575.522V448.483Z" fill="#10B981"/>
    </svg>
  );
}

/* ── Digipare Symbol (official SVG logo - #23B4C1) ── */
function DigipareSymbol({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Digipare">
      <path d="M944 674C944 823.117 823.117 944 674 944H147.5C110.221 944 80 913.779 80 876.5V737H602C676.558 737 737 676.558 737 602V422C737 347.442 676.558 287 602 287H449C429.118 287 413 303.118 413 323V593C413 612.882 396.882 629 377 629H80V147.5C80 110.221 110.221 80 147.5 80H674C823.117 80 944 200.883 944 350V674Z" fill="#23B4C1"/>
    </svg>
  );
}


/* ── Areatec Logo White (for overlay on AI images) ── */
function AreatecLogoWhite({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 316 316" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Areatec">
      <path d="M 271 0 L 281 2 L 290 6 L 296 10 L 305 19 L 305 20 L 307 22 L 308 25 L 311 29 L 312 34 L 313 35 L 313 38 L 314 39 L 314 44 L 315 45 L 315 271 L 314 272 L 314 277 L 313 278 L 311 286 L 307 293 L 304 296 L 304 297 L 296 305 L 290 309 L 281 313 L 271 315 L 240 315 L 240 97 L 239 96 L 238 90 L 234 85 L 234 84 L 230 80 L 222 76 L 128 75 L 117 72 L 109 67 L 102 60 L 102 59 L 98 54 L 98 52 L 96 48 L 96 45 L 95 44 L 95 31 L 96 30 L 96 27 L 97 26 L 97 24 L 100 18 L 102 16 L 102 14 L 104 13 L 110 7 L 119 2 L 128 0 Z" />
      <path d="M 181 115 L 190 119 L 195 124 L 195 125 L 198 129 L 199 135 L 200 136 L 200 143 L 199 144 L 199 315 L 90 315 L 70 311 L 59 307 L 51 303 L 39 295 L 24 281 L 24 280 L 17 272 L 15 268 L 13 266 L 8 256 L 8 254 L 5 248 L 4 243 L 3 242 L 3 239 L 2 238 L 2 235 L 1 234 L 1 228 L 0 227 L 0 203 L 1 202 L 2 192 L 3 191 L 3 188 L 4 187 L 4 185 L 5 184 L 7 176 L 13 164 L 24 149 L 35 138 L 49 128 L 61 122 L 73 118 L 90 115 Z" />
    </svg>
  );
}

/* ── Data ── */
interface Solucao {
  icon: React.ElementType | null;
  customIcon?: "olhovivo" | "digipare";
  titleKey: string;
  taglineKey: string;
  descriptionKey: string;
  tag: string;
  tagColor: string;
  featured?: boolean;
  semifeatured?: boolean;
  partnership?: boolean;
  partnerUrl?: string;
}

const solucoes: Solucao[] = [
  {
    icon: null,
    customIcon: "olhovivo",
    titleKey: "solucoes.1.title",
    taglineKey: "solucoes.1.tagline",
    descriptionKey: "solucoes.1.description",
    tag: "OCR + IA",
    tagColor: "bg-blue-50 text-[#2F6FD0] border border-blue-200",
    featured: true,
  },
  {
    icon: null,
    customIcon: "olhovivo",
    titleKey: "solucoes.2.title",
    taglineKey: "solucoes.2.tagline",
    descriptionKey: "solucoes.2.description",
    tag: "Zona Azul",
    tagColor: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    semifeatured: true,
  },
  {
    icon: null,
    customIcon: "digipare",
    titleKey: "solucoes.3.title",
    taglineKey: "solucoes.3.tagline",
    descriptionKey: "solucoes.3.description",
    tag: "App",
    tagColor: "bg-[#23b4c1]/10 text-[#23b4c1] border border-[#23b4c1]/30",
  },
  {
    icon: FileText,
    titleKey: "solucoes.4.title",
    taglineKey: "solucoes.4.tagline",
    descriptionKey: "solucoes.4.description",
    tag: "Multas",
    tagColor: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  {
    icon: Radio,
    titleKey: "solucoes.5.title",
    taglineKey: "solucoes.5.tagline",
    descriptionKey: "solucoes.5.description",
    tag: "IoT",
    tagColor: "bg-violet-50 text-violet-700 border border-violet-200",
  },
  {
    icon: Satellite,
    titleKey: "solucoes.6.title",
    taglineKey: "solucoes.6.tagline",
    descriptionKey: "solucoes.6.description",
    tag: "GNSS",
    tagColor: "bg-sky-50 text-sky-700 border border-sky-200",
  },
  {
    icon: Bike,
    titleKey: "solucoes.7.title",
    taglineKey: "solucoes.7.tagline",
    descriptionKey: "solucoes.7.description",
    tag: "Parceria",
    tagColor: "bg-lime-50 text-lime-700 border border-lime-200",
    partnership: true,
    partnerUrl: "https://bikeep.com",
  },
];

/* ── Icon renderer ── */
function SolIcon({ sol, size = 24 }: { sol: Solucao; size?: number }) {
  if (sol.customIcon === "olhovivo") return <OlhoVivoSymbol size={size} />;
  if (sol.customIcon === "digipare") return <DigipareSymbol size={size} />;
  if (sol.icon) {
    const Icon = sol.icon;
    return <Icon className="text-[#2F6FD0]" style={{ width: size, height: size }} />;
  }
  return null;
}

/* ── Featured Card (Olho Vivo Patrol) — Hero-on-top layout ── */
function FeaturedCard({ sol, isVisible, t }: { sol: Solucao; isVisible: boolean; t: (k: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="relative group bg-gradient-to-br from-[#21212D] to-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2F6FD0]/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/8 rounded-full blur-[60px] pointer-events-none" />

      {/* Hero image */}
      <div className="relative w-full h-48 lg:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#21212D] via-transparent to-transparent z-10 pointer-events-none" />
        <OptimizedImage
          src="/assets/hb20_areatec_rack_final.png"
          alt="Veículo HB20 Areatec equipado com câmeras OCR e IA embarcada para fiscalização inteligente de trânsito"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="relative p-8 lg:p-10">
        {/* Brand + tag row */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
            <OlhoVivoSymbol size={24} />
            <span className="text-[11px] font-bold text-emerald-400 tracking-[0.12em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Olho Vivo®
            </span>
          </div>
          <span className={`px-3 py-1 text-[10px] font-bold rounded-full tracking-wider uppercase ${sol.tagColor}`}>
            {sol.tag}
          </span>
        </div>

        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          {t(sol.titleKey)}
        </h3>
        <p className="text-sm text-emerald-400/80 font-medium mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t(sol.taglineKey)}
        </p>
        <p className="text-white/70 leading-relaxed text-sm lg:text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t(sol.descriptionKey)}
        </p>

        {/* Stats + Achievement Badge */}
        <div className="flex flex-col gap-4 mt-6 mb-6">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                <span className="text-[#2F6FD0]">99,9</span>%
              </div>
              <div className="text-[10px] text-white/50 tracking-wider uppercase mt-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {t("solucoes.precisao_ocr")}
              </div>
            </div>
          </div>
          {/* Achievement Seal — World Record Badge */}
          <div className="relative inline-flex items-center gap-4 max-w-md">
            {/* Shield/Badge Icon */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-[2px] shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-900/90 to-amber-950/95 flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="url(#goldGrad)" strokeWidth="1.5" />
                    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="url(#goldGrad)" strokeWidth="1" />
                    <line x1="3" y1="12" x2="21" y2="12" stroke="url(#goldGrad)" strokeWidth="1" />
                    <line x1="5" y1="7" x2="19" y2="7" stroke="url(#goldGrad)" strokeWidth="0.7" />
                    <line x1="5" y1="17" x2="19" y2="17" stroke="url(#goldGrad)" strokeWidth="0.7" />
                    <path d="M12 2l1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 7.9 9.6 9.2l.5-2.6L8.2 4.8l2.6-.4L12 2z" fill="url(#goldGrad)" />
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="24" y2="24">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="50%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#D97706" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <svg className="absolute -left-2 top-1 w-5 h-14 text-amber-500/60" viewBox="0 0 20 56" fill="currentColor">
                <path d="M16 4c-4 4-8 12-8 24s4 20 8 24c-8-4-14-14-14-24S8 8 16 4z" />
              </svg>
              <svg className="absolute -right-2 top-1 w-5 h-14 text-amber-500/60" viewBox="0 0 20 56" fill="currentColor">
                <path d="M4 4c4 4 8 12 8 24s-4 20-8 24c8-4 14-14 14-24S12 8 4 4z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-amber-500/80 tracking-[0.2em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                World Record
              </span>
              <h3 className="text-[12px] lg:text-[13px] font-bold leading-snug bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.02em' }}>
                A maior frota de veículos OCR para estacionamento rotativo do planeta
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-2.5 h-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[8px] text-amber-500/60 tracking-wider uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  +100 veículos em uma mesma cidade
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <a href="/olhovivo-patrol" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2F6FD0] text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:bg-[#2563C4] transition-all duration-300 transform hover:-translate-y-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {t("solucoes.saiba_mais")} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Semi-featured Card (Olho Vivo Parking) — Dark Theme ── */
function SemiFeaturedCard({ sol, isVisible, t }: { sol: Solucao; isVisible: boolean; t: (k: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.35 }}
      className="relative group bg-gradient-to-br from-[#21212D] to-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2F6FD0]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/8 rounded-full blur-[60px] pointer-events-none" />

      {/* Hero image with Areatec logo overlay */}
      <div className="relative w-full h-48 lg:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#21212D] via-transparent to-transparent z-10 pointer-events-none" />
        <OptimizedImage
          src="/assets/parking_hero_smart.jpg"
          alt="Vista aérea de Zona Azul Inteligente com monitoramento digital de vagas ocupadas e livres pelo sistema Olho Vivo Parking da Areatec"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

      </div>

      {/* Content */}
      <div className="relative p-7 lg:p-8">
        {/* Brand + tag row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
            <OlhoVivoSymbol size={22} />
            <span className="text-[10px] font-bold text-emerald-400 tracking-[0.12em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Olho Vivo®
            </span>
          </div>
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}>
            {sol.tag}
          </span>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          {t(sol.titleKey)}
        </h3>
        <p className="text-xs text-emerald-400/80 font-medium mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t(sol.taglineKey)}
        </p>
        <p className="text-white/70 leading-relaxed text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t(sol.descriptionKey)}
        </p>
        <div className="mt-6">
          <a href="/olhovivo-parking" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2F6FD0] text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:bg-[#2563C4] transition-all duration-300 transform hover:-translate-y-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {t("solucoes.saiba_mais")} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Standard Card ── */
function SolutionCard({ sol, idx, isVisible, t }: { sol: Solucao; idx: number; isVisible: boolean; t: (k: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + idx * 0.08 }}
      className="group bg-white rounded-2xl p-6 lg:p-7 border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <SolIcon sol={sol} size={24} />
        </div>
        <div className="flex items-center gap-2">
          {sol.partnership && (
            <span className="px-2 py-0.5 text-[9px] font-bold rounded-full tracking-wider uppercase bg-slate-100 text-slate-500 border border-slate-200">
              {t("solucoes.parceria")}
            </span>
          )}
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full tracking-wider uppercase ${sol.tagColor}`}>
            {sol.tag}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {t(sol.titleKey)}
      </h3>
      <p className="text-xs text-[#2F6FD0] font-medium mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {t(sol.taglineKey)}
      </p>
      <p className="text-slate-500 leading-relaxed text-sm flex-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {t(sol.descriptionKey)}
      </p>
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <a href="#contato" className="flex items-center gap-1.5 text-sm font-semibold text-[#2F6FD0] hover:text-blue-700 transition-colors group/link" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t("solucoes.saiba_mais")} <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </a>
        {sol.partnerUrl && (
          <a href={sol.partnerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            bikeep.com <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function Solucoes() {
  const { ref, isVisible } = useInView(0.1);
  const { t } = useLanguage();

  const featured = solucoes.find((s) => s.featured)!;
  const semifeatured = solucoes.find((s) => s.semifeatured)!;
  const standard = solucoes.filter((s) => !s.featured && !s.semifeatured);

  return (
    <section id="solucoes" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {t("solucoes.label")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t("solucoes.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {t("solucoes.subtitle")}
          </motion.p>
        </div>

        {/* Featured: Olho Vivo Patrol */}
        <div className="mb-6 lg:mb-8">
          <FeaturedCard sol={featured} isVisible={isVisible} t={t} />
        </div>

        {/* Semi-featured: Olho Vivo Parking */}
        <div className="mb-6 lg:mb-8">
          <SemiFeaturedCard sol={semifeatured} isVisible={isVisible} t={t} />
        </div>

        {/* Standard grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6">
          {standard.map((sol, idx) => (
            <SolutionCard key={sol.titleKey} sol={sol} idx={idx} isVisible={isVisible} t={t} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center mt-14"
        >
          <a href="#contato" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#2F6FD0] to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {t("solucoes.cta")} <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
