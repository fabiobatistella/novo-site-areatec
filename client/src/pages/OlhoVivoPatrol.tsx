// OlhoVivoPatrol — Página detalhada do produto Olho Vivo Patrol + SEO
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Eye, AlertTriangle, MapPin, Shield, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import OptimizedImage from "@/components/OptimizedImage";
import { olhoVivoPatrolSchema } from "@/components/SchemaOrg";

function useInViewSimple(threshold = 0.05) {
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

function OlhoVivoSymbolInline({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M80 350.269C80 201.004 201.004 80 350.271 80H820.196C836.261 80 844.294 99.4342 832.918 110.777L655.97 287.207H422.343C347.71 287.207 287.208 347.708 287.208 422.341V655.967L110.777 832.914C99.4343 844.29 80 836.257 80 820.192V350.269Z" fill="#10B981"/>
      <path d="M944 673.731C944 822.996 822.996 944 673.729 944H203.804C187.739 944 179.706 924.566 191.082 913.223L368.03 736.793H601.657C676.29 736.793 736.792 676.292 736.792 601.659V368.033L913.223 191.086C924.566 179.71 944 187.743 944 203.808V673.731Z" fill="#10B981"/>
      <path d="M415.253 448.483C415.253 430.131 430.131 415.253 448.484 415.253H575.522C593.875 415.253 608.753 430.131 608.753 448.483V575.522C608.753 593.874 593.875 608.752 575.523 608.752H448.484C430.131 608.752 415.253 593.874 415.253 575.522V448.483Z" fill="#10B981"/>
    </svg>
  );
}

function PatrolHeroSection() {
  return (
    <section className="relative pt-28 pb-10 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-900 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2F6FD0]/10 border border-[#2F6FD0]/20 rounded-full mb-6">
            <span className="text-[10px] font-bold text-[#2F6FD0] tracking-[0.15em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Produto Areatec
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <OlhoVivoSymbolInline size={48} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Olho Vivo Patrol
            </h1>
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Fiscalização inteligente com IA embarcada
          </p>
          <p className="text-base text-white/60 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            A fiscalização inteligente começa com tecnologia que compreende a realidade das vias urbanas. O Olho Vivo Patrol é mais que um veículo. É um sistema integrado de captura, processamento e prova jurídica de infrações.
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
  imageAlt?: string;
  side: "left" | "right";
}

function TechSectionComponent({ section, isVisible }: { section: TechSection; isVisible: boolean }) {
  const isLeft = section.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative py-10 lg:py-14"
    >
      <div className="container">
        <article className={`flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 ${isLeft ? "" : "lg:flex-row-reverse"}`}>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#2F6FD0]/10 border border-[#2F6FD0]/20 flex items-center justify-center">
                <section.icon className="w-6 h-6 text-[#2F6FD0]" aria-hidden="true" />
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
            {section.image === "code_cpp" ? (
              <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_8px_32px_rgba(47,111,208,0.15)] hover:shadow-[0_12px_48px_rgba(47,111,208,0.25)] transition-shadow duration-500 bg-[#1a1b26] p-5" role="img" aria-label="Exemplo de código C++ do motor CORTEX AI da Areatec">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-[10px] text-white/40 font-mono">cortex_engine.cpp</span>
                </div>
                <div className="text-[10px] lg:text-[11px] leading-[1.7] overflow-hidden font-mono space-y-0.5">
                  <p><span className="text-purple-400">{"namespace"}</span><span className="text-cyan-300">{" Cortex"}</span><span className="text-white/70">{" {"}</span></p>
                  <p><span className="text-purple-400">{"class"}</span><span className="text-cyan-300">{" VehicleDetection"}</span><span className="text-white/70">{" {"}</span></p>
                  <p><span className="text-cyan-300">{"    VehicleResult"}</span><span className="text-yellow-300">{" detect"}</span><span className="text-white/70">{"("}</span><span className="text-cyan-300">{"Frame"}</span><span className="text-white/70">{"& frame) {"}</span></p>
                  <p><span className="text-cyan-300">{"        VehicleResult"}</span><span className="text-white/70">{" result{};"}</span></p>
                  <p><span className="text-purple-400">{"        auto"}</span><span className="text-white/70">{" plates = "}</span><span className="text-yellow-300">{"scan"}</span><span className="text-white/70">{"(frame);"}</span></p>
                  <p><span className="text-purple-400">{"        for"}</span><span className="text-white/70">{" ("}</span><span className="text-purple-400">{"auto"}</span><span className="text-white/70">{"& p : plates) {"}</span></p>
                  <p><span className="text-purple-400">{"            auto"}</span><span className="text-white/70">{" confidence = "}</span><span className="text-yellow-300">{"validate"}</span><span className="text-white/70">{"(p);"}</span></p>
                  <p><span className="text-purple-400">{"            if"}</span><span className="text-white/70">{" (confidence > "}</span><span className="text-orange-400">{"0.997"}</span><span className="text-white/70">{")"}</span></p>
                  <p><span className="text-white/70">{"                result."}</span><span className="text-yellow-300">{"add"}</span><span className="text-white/70">{"(p);"}</span></p>
                  <p><span className="text-white/70">{"        }"}</span></p>
                  <p><span className="text-purple-400">{"        return"}</span><span className="text-white/70">{" result;"}</span></p>
                  <p><span className="text-white/70">{"    }"}</span></p>
                  <p><span className="text-white/70">{"}"}</span></p>
                  <p><span className="text-white/70">{"}"}</span></p>
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(26,27,38,0.95) 100%)' }} />
              </div>
            ) : section.image ? (
              <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_8px_32px_rgba(47,111,208,0.15)] group hover:shadow-[0_12px_48px_rgba(47,111,208,0.25)] transition-shadow duration-500">
                <OptimizedImage
                  src={section.image}
                  alt={section.imageAlt || section.title}
                  className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[0_8px_32px_rgba(47,111,208,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2F6FD0]/5 via-transparent to-emerald-500/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <section.icon className="w-24 h-24 text-[#2F6FD0]/30 mx-auto mb-4" aria-hidden="true" />
                    <p className="text-white/40 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {section.id.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </motion.div>
  );
}

export default function OlhoVivoPatrol() {
  const { ref: sectionsRef, visible: sectionsVisible } = useInViewSimple(0.01);
  const { t, lang } = useLanguage();

  const techSections: TechSection[] = [
    {
      id: "cortex_ai",
      title: "CORTEX Inteligência Artificial",
      icon: Brain,
      image: "code_cpp",
      imageAlt: "Código C++ do motor CORTEX AI de reconhecimento de placas da Areatec",
      content: t("olhovivo_patrol.cortex.content"),
      side: "left",
    },
    {
      id: "ocr_motor",
      title: t("olhovivo_patrol.ocr.title"),
      icon: Eye,
      image: "/assets/tablet_ocr_interior.jpg",
      imageAlt: "Interior do veículo OCR Areatec com tablet mostrando leitura de placas em tempo real",
      content: t("olhovivo_patrol.ocr.content"),
      side: "right",
    },
    {
      id: "buracos",
      title: t("olhovivo_patrol.buracos.title"),
      icon: AlertTriangle,
      image: `/assets/manual_img_013.webp`,
      imageAlt: "Interface de Detecção e Classificação de Defeitos Viários - câmera frontal com bounding boxes em panela, remendo e trinca, tabela de classificação, mapa de calor",
      content: t("olhovivo_patrol.buracos.content"),
      side: "left",
    },
    {
      id: "sinalizacao",
      title: t("olhovivo_patrol.sinalizacao.title"),
      icon: MapPin,
      image: `/assets/manual_img_011.webp`,
      imageAlt: "Interface de Análise de Sinalização Horizontal - câmera com faixas de pedestres, linhas de divisão, classificação de condição",
      content: t("olhovivo_patrol.sinalizacao.content"),
      side: "right",
    },
    {
      id: "facial_recognition",
      title: t("olhovivo_patrol.facial_recognition.title"),
      icon: Shield,
      image: `/assets/manual_img_017.webp`,
      imageAlt: "Interface do Módulo de Busca Facial Inteligente - feed de câmera com faces anonimizadas, match detectado, painel LGPD Compliant",
      content: t("olhovivo_patrol.facial_recognition.content"),
      side: "left",
    },
    {
      id: "anonimizacao",
      title: t("olhovivo_patrol.anonimizacao.title"),
      icon: Shield,
      image: `/assets/synthetic_face_${lang}.webp`,
      imageAlt: "CORTEX AI facial anonymization showing before and after synthetic mask generation for LGPD compliance",
      content: t("olhovivo_patrol.anonimizacao.content"),
      side: "right",
    },
    {
      id: "geotrust",
      title: t("olhovivo_patrol.geotrust.title"),
      icon: MapPin,
      image: `/assets/geotrust_${lang}.webp`,
      imageAlt: lang === "en" ? "GeoTrust OSNMA dashboard showing authenticated position certificate with SHA-256 hash and digital signature verified" : lang === "es" ? "Panel GeoTrust OSNMA mostrando certificado de posición autenticada con firma digital verificada" : "Dashboard GeoTrust OSNMA mostrando certificado de posição autenticada com assinatura digital verificada",
      content: t("olhovivo_patrol.geotrust.content"),
      side: "left",
    },
    {
      id: "areachain",
      title: t("olhovivo_patrol.areachain.title"),
      icon: Lock,
      image: `/assets/areachain_${lang}.webp`,
      imageAlt: lang === "en" ? "AreaChain private blockchain dashboard showing OCR capture to SHA-256 hash to block record chain of custody flow" : lang === "es" ? "Panel blockchain privado AreaChain mostrando flujo de cadena de custodia desde captura OCR hasta hash SHA-256" : "Dashboard blockchain privado AreaChain mostrando fluxo de cadeia de custódia da captura OCR ao hash SHA-256",
      content: t("olhovivo_patrol.areachain.content"),
      side: "right",
    },
  ];

  return (
    <>
      <SEOHead
        title="Olho Vivo Patrol — Fiscalização Inteligente com IA Embarcada | Areatec"
        description="O Olho Vivo Patrol é o sistema integrado de fiscalização inteligente da Areatec com IA embarcada CORTEX. Leitura automática de placas com 99,9% de precisão, detecção de defeitos viários e cadeia de custódia digital."
        path="/olhovivo-patrol"
        jsonLd={olhoVivoPatrolSchema}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <PatrolHeroSection />
          <section ref={sectionsRef} className="relative py-4 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-900">
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
                  href="/contato"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2F6FD0] text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:bg-[#2563C4] transition-all duration-300 transform hover:-translate-y-0.5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {t("cta.primary")} <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
