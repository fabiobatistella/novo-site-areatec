// HeroSection — Areatec Original (Luminous Tech Noir) + i18n
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useCountUp } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_VIDEO = "/assets/video_areatec_final.mp4";
const HERO_POSTER = "/assets/keyframe_inicial.png";

const SEGMENT_2_START = 7;

interface CaptionProps {
  title: string;
  subtitle: string;
  visible: boolean;
}

function VideoCaption({ title, subtitle, visible }: CaptionProps) {
  return (
    <div
      className={`hidden md:block absolute bottom-36 lg:bottom-40 left-10 lg:left-16 z-10 transition-opacity duration-1000 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h3
        className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)",
        }}
      >
        {title}
      </h3>
      <p
        className="text-sm sm:text-base lg:text-lg font-light text-white/85 mt-1"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          textShadow: "0 2px 6px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

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
        <span className="text-blue-400">{suffix.startsWith('+') ? '+' : ''}</span>{display}<span className="text-blue-400">{suffix.startsWith('+') ? suffix.slice(1) : suffix}</span>
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
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeCaption, setActiveCaption] = useState<1 | 2>(1);

  const heroStats = [
    { value: 200, suffix: "+", label: t("hero.stat.cidades") },
    { value: 10, suffix: "M+", label: t("hero.stat.placas") },
    { value: 30, suffix: "+", label: t("hero.stat.anos") },
    { value: 99.9, suffix: "%", label: t("hero.stat.precisao"), isDecimal: true },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      setActiveCaption(time < SEGMENT_2_START ? 1 : 2);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent" />
      </div>

      <VideoCaption
        title={t("hero.caption1.title")}
        subtitle={t("hero.caption1.subtitle")}
        visible={activeCaption === 1}
      />
      <VideoCaption
        title={t("hero.caption2.title")}
        subtitle={t("hero.caption2.subtitle")}
        visible={activeCaption === 2}
      />

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/6 w-72 h-72 bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative container pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t("hero.headline1")}
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                {t("hero.headline2")}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#2F6FD0] to-blue-600/50 rounded-full origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-white/70 max-w-xl leading-relaxed mb-10"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#solucoes"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#2F6FD0] to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {t("hero.cta.primary")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contato"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <MessageCircle className="w-4 h-4" />
              {t("hero.cta.secondary")}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="relative mt-auto">
        <div className="container">
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-t-2xl border border-white/10 border-b-0 px-6 py-8 lg:px-10 lg:py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
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
