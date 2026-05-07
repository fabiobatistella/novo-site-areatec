// SistemaIntegrado — Areatec Original (Luminous Tech Noir)
// 3-column cards for the 3 operational fronts of the OCR Vehicle
import { motion } from "framer-motion";
import { Shield, Zap, Users, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const frentes = [
  {
    icon: Shield,
    title: "Frente de Fiscalização",
    description: "Estacionamento rotativo com OCR — captura automática de placas, verificação de regularidade e geração de autos de infração com prova material.",
    isNew: true,
    iconBg: "bg-blue-50",
    iconColor: "text-[#2F6FD0]",
    color: "from-[#2F6FD0] to-blue-600",
  },
  {
    icon: Zap,
    title: "Frente de Zeladoria Urbana",
    description: "Administração de ativos públicos — inventário de sinalização vertical, análise de sinalização horizontal, detecção de buracos e monitoramento de caçambas.",
    isNew: true,
    iconBg: "bg-blue-50",
    iconColor: "text-[#2F6FD0]",
    color: "from-[#2F6FD0] to-blue-600",
  },
  {
    icon: Users,
    title: "Frente de Segurança Pública",
    description: "Busca facial inteligente com CORTEX® — identificação de pessoas com conformidade LGPD e garantias de privacidade.",
    isNew: false,
    iconBg: "bg-blue-50",
    iconColor: "text-[#2F6FD0]",
    color: "from-[#2F6FD0] to-blue-600",
  },
];

export default function SistemaIntegrado() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section
      id="veiculo-ocr"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50/80 overflow-hidden"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

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
            Sistema Integrado
          </motion.span>
          {/* Tiffany badge — identical to Hero badge, positioned between label and title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-6"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#0ABAB5" }}
            />
            <span
              className="text-xs font-semibold tracking-wider uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0ABAB5" }}
            >
              Inteligência que Transforma Cidades
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Três frentes, um único veículo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed"
          >
            O Veículo OCR da Areatec opera simultaneamente em fiscalização, zeladoria urbana e segurança pública.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {frentes.map((frente, idx) => (
            <motion.div
              key={frente.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
              className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
            >
              {frente.isNew && (
                <span className="absolute top-6 right-6 px-2.5 py-1 text-[10px] font-bold text-white bg-gradient-to-r from-[#2F6FD0] to-blue-600 rounded-full tracking-wider uppercase shadow-sm">
                  Novo
                </span>
              )}
              <div className={`w-14 h-14 rounded-xl ${frente.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <frente.icon className={`w-7 h-7 ${frente.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {frente.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-[15px]">{frente.description}</p>
              <div className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${frente.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#veiculo-detalhes"
            className="inline-flex items-center gap-2 text-[#2F6FD0] font-semibold hover:text-blue-700 transition-colors group"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ver detalhes do Veículo OCR
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
