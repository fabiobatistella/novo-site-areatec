// Solucoes — Areatec Original (Luminous Tech Noir)
// Grid of solution cards with icons and descriptions
import { motion } from "framer-motion";
import { Car, MapPin, Eye, Shield, Zap, BarChart3, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const solucoes = [
  {
    icon: Car,
    title: "Fiscalização de Trânsito",
    description: "Leitura OCR de placas com 99.7% de precisão para autuação automatizada e controle de tráfego urbano.",
    tag: "OCR",
    tagColor: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  {
    icon: MapPin,
    title: "Estacionamento Rotativo",
    description: "Gestão inteligente de vagas com captura automática de placas e emissão de autos de infração com prova material.",
    tag: "Gestão",
    tagColor: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  {
    icon: Eye,
    title: "Zeladoria Urbana",
    description: "Detecção de buracos, inventário de sinalização e monitoramento de ativos públicos com IA embarcada.",
    tag: "IA",
    tagColor: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  {
    icon: Shield,
    title: "Segurança Pública",
    description: "Busca facial inteligente com conformidade LGPD e identificação de pessoas em tempo real.",
    tag: "LGPD",
    tagColor: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  {
    icon: Zap,
    title: "Pedágio Free Flow",
    description: "Cobrança automática sem parada com leitura de placas e integração com sistemas de back-office.",
    tag: "Free Flow",
    tagColor: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  {
    icon: BarChart3,
    title: "Análise de Dados Urbanos",
    description: "Dashboards de fiscalização e zeladoria urbana com relatórios automatizados para prestação de contas.",
    tag: "Analytics",
    tagColor: "bg-blue-50 text-blue-700 border border-blue-200",
  },
];

export default function Solucoes() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section
      id="solucoes"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Soluções
          </motion.span>
          {/* Tiffany badge — between label and title */}
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
              Do Dado à Decisão em Tempo Real
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Tecnologia aplicada a diversos setores
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed"
          >
            Nossas soluções atendem desde a fiscalização de trânsito até o agronegócio, adaptando-se às necessidades específicas de cada setor.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {solucoes.map((sol, idx) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="group bg-white rounded-2xl p-6 lg:p-8 border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <sol.icon className="w-6 h-6 text-[#2F6FD0]" />
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full tracking-wider uppercase ${sol.tagColor}`}>
                  {sol.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {sol.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">{sol.description}</p>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#2F6FD0] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Saiba mais <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#contato"
            className="inline-flex items-center gap-2 text-[#2F6FD0] font-semibold hover:text-blue-700 transition-colors group"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ver todas as soluções
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
