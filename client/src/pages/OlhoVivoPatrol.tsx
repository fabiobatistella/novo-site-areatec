// OlhoVivoPatrol — Página detalhada do produto Olho Vivo Patrol
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Eye, AlertTriangle, MapPin, Shield, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#2F6FD0]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-bold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Olho Vivo
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Olho Vivo Patrol
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Fiscalização inteligente com IA embarcada
          </p>
          <p className="text-base text-white/60 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            A fiscalização inteligente começa com tecnologia que compreende a realidade das ruas brasileiras. O Olho Vivo Patrol é mais que um veículo. É um sistema integrado de captura, processamento e prova jurídica de infrações.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

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
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#2F6FD0]/10 border border-[#2F6FD0]/20 flex items-center justify-center">
                <section.icon className="w-6 h-6 text-[#2F6FD0]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {section.title}
              </h2>
            </div>
            <p className="text-white/70 leading-relaxed text-base lg:text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {section.content}
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {section.image ? (
              <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_8px_32px_rgba(47,111,208,0.15)] group hover:shadow-[0_12px_48px_rgba(47,111,208,0.25)] transition-shadow duration-500">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-700"
                />
              </div>
            ) : (
              <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[0_8px_32px_rgba(47,111,208,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2F6FD0]/5 via-transparent to-emerald-500/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <section.icon className="w-24 h-24 text-[#2F6FD0]/30 mx-auto mb-4" />
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

export default function OlhoVivoPatrol() {
  const { ref: sectionsRef, visible: sectionsVisible } = useInViewSimple();
  const { t } = useLanguage();

  const techSections: TechSection[] = [
    {
      id: "cortex_ai",
      title: "CORTEX AI",
      icon: Brain,
      image: "/assets/screen_cortex_rastreamento.jpg",
      content: t("olhovivo_patrol.cortex.content"),
      side: "left",
    },
    {
      id: "ocr_motor",
      title: t("olhovivo_patrol.ocr.title"),
      icon: Eye,
      image: "/assets/screen_ocr_placa.jpg",
      content: t("olhovivo_patrol.ocr.content"),
      side: "right",
    },
    {
      id: "buracos",
      title: t("olhovivo_patrol.buracos.title"),
      icon: AlertTriangle,
      image: "/assets/screen_defeitos_dnit.jpg",
      content: t("olhovivo_patrol.buracos.content"),
      side: "left",
    },
    {
      id: "sinalizacao",
      title: t("olhovivo_patrol.sinalizacao.title"),
      icon: MapPin,
      image: "/assets/screen_sinalizacao_horizontal.jpg",
      content: t("olhovivo_patrol.sinalizacao.content"),
      side: "right",
    },
    {
      id: "anonimizacao",
      title: t("olhovivo_patrol.anonimizacao.title"),
      icon: Shield,
      image: "/assets/screen_busca_facial.jpg",
      content: t("olhovivo_patrol.anonimizacao.content"),
      side: "left",
    },
    {
      id: "geotrust",
      title: t("olhovivo_patrol.geotrust.title"),
      icon: MapPin,
      content: t("olhovivo_patrol.geotrust.content"),
      side: "right",
    },
    {
      id: "areachain",
      title: t("olhovivo_patrol.areachain.title"),
      icon: Lock,
      content: t("olhovivo_patrol.areachain.content"),
      side: "left",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <section ref={sectionsRef} className="relative py-12 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#2F6FD0]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]" />
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
      <section className="relative py-20 bg-gradient-to-b from-slate-900 to-[#21212D] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2F6FD0]/10 rounded-full blur-[120px] pointer-events-none" />
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
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2F6FD0] text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:bg-[#2563C4] transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {t("cta.primary")} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
