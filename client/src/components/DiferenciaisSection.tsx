// DiferenciaisSection — Areatec Original (Luminous Tech Noir)
// 6 differentiator cards with icons and metrics
import { motion } from "framer-motion";
import { Cpu, Shield, Zap, BarChart3, Globe, Lock } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const diferenciais = [
  {
    icon: Cpu,
    title: "Edge AI",
    description: "Motor de IA com redes neurais profundas que processa dados urbanos em tempo real, sem dependência de internet.",
    metric: "99.7%",
    metricLabel: "Precisão OCR",
  },
  {
    icon: Shield,
    title: "LGPD Compliant",
    description: "Todas as soluções em conformidade com a Lei Geral de Proteção de Dados, com garantias de privacidade.",
    metric: "100%",
    metricLabel: "Conformidade",
  },
  {
    icon: Zap,
    title: "SyncRealTime®",
    description: "Protocolo proprietário de comunicação em tempo real entre veículos e backoffice para sincronização instantânea.",
    metric: "<50ms",
    metricLabel: "Latência",
  },
  {
    icon: BarChart3,
    title: "Ecossistema Integrado",
    description: "Do hardware embarcado à plataforma de gestão, entregamos uma solução completa e proprietária de ponta a ponta.",
    metric: "12+",
    metricLabel: "Módulos",
  },
  {
    icon: Globe,
    title: "GeoTrust",
    description: "Geolocalização com validade jurídica usando padrão OSNMA/Galileo europeu para provas incontestáveis.",
    metric: "±10cm",
    metricLabel: "Precisão GPS",
  },
  {
    icon: Lock,
    title: "AreaChain",
    description: "Blockchain privada para cadeia de custódia digital — todas as provas digitais são armazenadas e auditadas.",
    metric: "256-bit",
    metricLabel: "Criptografia",
  },
];

export default function DiferenciaisSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section
      id="diferenciais"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-50/80 to-white overflow-hidden"
    >
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Diferenciais
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-6"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#0ABAB5" }} />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0ABAB5" }}>
              Desenvolvido do Zero pela Areatec
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Tecnologia proprietária de ponta a ponta
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed"
          >
            Cada componente foi desenvolvido para operar em condições reais de campo, com máxima precisão e confiabilidade.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {diferenciais.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="group bg-white rounded-2xl p-6 lg:p-8 text-center border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-[#2F6FD0]" />
              </div>
              <div className="mb-3">
                <span className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {item.metric}
                </span>
                <span className="block text-[10px] text-slate-400 tracking-widest font-medium mt-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {item.metricLabel}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
