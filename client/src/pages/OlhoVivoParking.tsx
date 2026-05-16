// OlhoVivoParking — Página detalhada do produto Olho Vivo Parking
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, CreditCard, Smartphone, Store, MonitorSmartphone, Car, BarChart3, Network, SmartphoneNfc } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Hook para detecção de visibilidade ── */
function useInViewSimple(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Hero Section ── */
function HeroSection({ t }: { t: (k: string) => string }) {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#2F6FD0]/5 rounded-full blur-[100px]" />
      </div>
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-bold text-emerald-500 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Olho Vivo
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {t("solucoes.2.title")}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {t("solucoes.2.tagline")}
          </p>
          <p className="text-base text-white/60 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {t("solucoes.2.description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Seção individual de tecnologia ── */
interface TechSection {
  id: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  content: string;
  image?: string;
  side: "left" | "right";
}

function TechSectionComponent({ section, isVisible }: { section: TechSection; isVisible: boolean }) {
  const isLeft = section.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative py-16 lg:py-20"
    >
      <div className="container">
        <div className={`flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 ${isLeft ? "" : "lg:flex-row-reverse"}`}>
          {/* Text content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <section.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {section.title}
              </h2>
            </div>
            <p className="text-white/70 leading-relaxed text-base lg:text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {section.content}
            </p>
          </div>

          {/* Visual element */}
          <div className="flex-1 flex items-center justify-center">
            {section.image ? (
              <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_8px_32px_rgba(16,185,129,0.15)] group hover:shadow-[0_12px_48px_rgba(16,185,129,0.25)] transition-shadow duration-500">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ) : (
              <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[0_8px_32px_rgba(16,185,129,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-[#2F6FD0]/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <section.icon className="w-24 h-24 text-emerald-500/30 mx-auto mb-4" />
                    <p className="text-white/40 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {section.id.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ── */
export default function OlhoVivoParking() {
  const { ref: sectionsRef, visible: sectionsVisible } = useInViewSimple();
  const { t } = useLanguage();

  const techSections: TechSection[] = [
    {
      id: "telemetria",
      title: t("olhovivo_parking.telemetria.title"),
      icon: Activity,
      image: "/assets/screen_cortex_rastreamento.jpg",
      content: t("olhovivo_parking.telemetria.content"),
      side: "left",
    },
    {
      id: "financeiro",
      title: t("olhovivo_parking.financeiro.title"),
      icon: CreditCard,
      content: t("olhovivo_parking.financeiro.content"),
      side: "right",
    },
    {
      id: "fiscalizacao",
      title: t("olhovivo_parking.fiscalizacao.title"),
      icon: Smartphone,
      image: "/assets/screen_cortex_rastreamento.jpg",
      content: t("olhovivo_parking.fiscalizacao.content"),
      side: "left",
    },
    {
      id: "pdv_fixo",
      title: t("olhovivo_parking.pdv_fixo.title"),
      icon: Store,
      content: t("olhovivo_parking.pdv_fixo.content"),
      side: "right",
    },
    {
      id: "totens",
      title: t("olhovivo_parking.totens.title"),
      icon: MonitorSmartphone,
      content: t("olhovivo_parking.totens.content"),
      side: "left",
    },
    {
      id: "parquimetros",
      title: t("olhovivo_parking.parquimetros.title"),
      icon: Car,
      content: t("olhovivo_parking.parquimetros.content"),
      side: "right",
    },
    {
      id: "dashboards",
      title: t("olhovivo_parking.dashboards.title"),
      icon: BarChart3,
      content: t("olhovivo_parking.dashboards.content"),
      side: "left",
    },
    {
      id: "integracao",
      title: t("olhovivo_parking.integracao.title"),
      icon: Network,
      content: t("olhovivo_parking.integracao.content"),
      side: "right",
    },
    {
      id: "digipare",
      title: t("olhovivo_parking.digipare.title"),
      icon: SmartphoneNfc,
      content: t("olhovivo_parking.digipare.content"),
      side: "left",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection t={t} />

      {/* Tech Sections */}
      <section ref={sectionsRef} className="relative py-12 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#2F6FD0]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative">
          {techSections.map((section) => (
            <TechSectionComponent
              key={section.id}
              section={section}
              isVisible={sectionsVisible}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 to-[#21212D] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        </div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {t("cta.title")}
            </h2>
            <p className="text-white/70 mb-8 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("cta.subtitle")}
            </p>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:bg-emerald-500 transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {t("cta.secondary")} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
