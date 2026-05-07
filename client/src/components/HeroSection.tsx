// HeroSection — Areatec Original (Luminous Tech Noir)
// Full-screen hero with cinematic MP4 video background, animated stats bar
import { motion } from "framer-motion";
import { ArrowRight, Car } from "lucide-react";
import { useCountUp } from "@/hooks/useInView";

const HERO_VIDEO = "/manus-storage/video_areatec_final_ad696d7e.mp4";
const HERO_POSTER = "/manus-storage/keyframe_inicial_3318a362.png";

const heroStats = [
  { value: 200, suffix: "+", label: "CIDADES ATENDIDAS" },
  { value: 10, suffix: "M+", label: "PLACAS PROCESSADAS/MÊS" },
  { value: 30, suffix: "+", label: "ANOS DE EXPERIÊNCIA" },
  { value: 99.99, suffix: "%", label: "PRECISÃO OCR", isDecimal: true },
  { value: 15, suffix: "", label: "ESTADOS ATENDIDOS" },
  { value: 100000, suffix: "+", label: "VAGAS MONITORADAS" },
];

function StatItem({ value, suffix, label, isDecimal, delay }: { value: number; suffix: string; label: string; isDecimal?: boolean; delay: number }) {
  const { count, ref } = useCountUp(isDecimal ? Math.floor(value * 10) : value, 2500);
  const display = isDecimal ? (count / 10).toFixed(1) : count.toLocaleString("pt-BR");

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 + delay * 0.1 }}
      className="text-center"
    >
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {display}<span className="text-blue-400">{suffix}</span>
      </div>
      <div className="text-[10px] sm:text-xs text-white/60 mt-1 tracking-widest font-medium" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {label}
      </div>
    </motion.div>
  );
}

interface HeroSectionProps {
  onOpenVideo?: () => void;
}

export default function HeroSection({ onOpenVideo }: HeroSectionProps) {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background: cinematic video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Dark overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent" />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/6 w-72 h-72 bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative container pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#0ABAB5" }}
            />
            <span
              className="text-xs font-semibold text-white/90 tracking-wider uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Líder em Tecnologia para Cidades Inteligentes
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Transformamos dados urbanos
            <br />
            em{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                inteligência
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#2F6FD0] to-blue-600/50 rounded-full origin-left"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-white/70 max-w-xl leading-relaxed mb-10"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Do Veículo OCR com IA embarcada à plataforma Olho Vivo®, entregamos o ecossistema completo para fiscalização, zeladoria urbana e segurança pública.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#solucoes"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#2F6FD0] to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Explorar Soluções
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={onOpenVideo}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Car className="w-4 h-4" />
              Conheça o Veículo OCR
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative mt-auto">
        <div className="container">
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-t-2xl border border-white/10 border-b-0 px-6 py-8 lg:px-10 lg:py-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
              {heroStats.map((stat, idx) => (
                <StatItem key={stat.label} {...stat} delay={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
