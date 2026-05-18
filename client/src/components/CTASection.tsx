// CTASection — Areatec + i18n
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const CTA_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663455526845/8qVNj49snqzVP2qLuHSLCr/cta-cityscape-myLvYUBhk3w4MoyWy3uL77.webp";

interface CTASectionProps {
  onOpenVideo?: () => void;
}

export default function CTASection({ onOpenVideo }: CTASectionProps) {
  const { ref, isVisible } = useInView(0.1);
  const { t } = useLanguage();

  return (
    <section
      id="contato"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img src={CTA_IMAGE} alt="Vista aérea de cidade brasileira ao entardecer representando a cobertura nacional da Areatec" className="w-full h-full object-cover" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/75 to-slate-900/90" />
      </div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold text-blue-400 tracking-[0.2em] uppercase mb-6"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {t("cta.label")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t("cta.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70 leading-relaxed mb-10"
          >
            {t("cta.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/contato"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#2F6FD0] to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {t("cta.primary")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={onOpenVideo}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <Phone className="w-4 h-4 text-blue-400" />
              {t("cta.secondary")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm"
          >
            <a href="mailto:comercial@areatec.com.br" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail className="w-4 h-4 text-blue-400" />
              comercial@areatec.com.br
            </a>
            <span className="hidden sm:block w-px h-4 bg-white/20" />
            <a href="https://wa.me/5511991287417" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone className="w-4 h-4 text-blue-400" />
              (11) 99128-7417
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
