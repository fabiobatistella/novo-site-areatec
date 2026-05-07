// OlhoVivoSection — Areatec Original (Luminous Tech Noir)
// Platform showcase with dashboard mockup and feature list
import { motion } from "framer-motion";
import { Map, BarChart3, AlertTriangle, FileText, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const features = [
  { icon: Map, title: "Mapa da Frota", description: "Monitoramento geográfico da frota em tempo real" },
  { icon: AlertTriangle, title: "Incidências", description: "Detecção em Tempo Real" },
  { icon: BarChart3, title: "Dashboards", description: "Dashboards de fiscalização e zeladoria urbana" },
  { icon: FileText, title: "Relatórios", description: "Relatórios automatizados para prestação de contas" },
];

const dashboardStats = [
  { label: "Placas lidas hoje", value: "2.4M", change: "+12%" },
  { label: "Infrações geradas", value: "1.847", change: "+8%" },
  { label: "Buracos detectados", value: "234", change: "Novo" },
  { label: "Precisão média", value: "99.8%", change: "Estável" },
];

interface OlhoVivoSectionProps {
  onOpenVideo?: () => void;
}

export default function OlhoVivoSection({ onOpenVideo }: OlhoVivoSectionProps) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section
      id="olho-vivo"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 lg:py-32 bg-slate-50/80 overflow-hidden"
    >
      <div className="absolute bottom-1/3 left-1/6 w-72 h-72 bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span
              className="block text-xs font-semibold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Olho Vivo®
            </span>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-6"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#0ABAB5" }} />
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0ABAB5" }}>
                Comando Total da Operação
              </span>
            </motion.div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Olho Vivo® — Visibilidade total da operação
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              Plataforma de gestão e monitoramento urbano com dashboards inteligentes e análise de dados. Centro de comando para toda a operação de fiscalização e zeladoria.
            </p>

            <div className="space-y-4">
              {features.map((feat, idx) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-blue-100 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <feat.icon className="w-4 h-4 text-[#2F6FD0]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>{feat.title}</div>
                    <div className="text-xs text-slate-400">{feat.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-8"
            >
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 text-[#2F6FD0] font-semibold hover:text-blue-700 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Explorar Olho Vivo®
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-slate-900 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15),0_32px_64px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-slate-400 mb-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>OLHO VIVO® DASHBOARD</div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Operação em tempo real</div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-green-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  LIVE
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {dashboardStats.map((stat) => (
                  <div key={stat.label} className="bg-slate-800/60 rounded-xl p-3">
                    <div className="text-[10px] text-slate-400 mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{stat.label}</div>
                    <div className="text-xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{stat.value}</div>
                    <div className="text-[10px] text-green-400 font-medium mt-0.5">{stat.change}</div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="h-24 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-700 opacity-90" />
                <div className="relative flex items-center gap-2 text-slate-300 text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  <Map className="w-4 h-4 text-blue-500" />
                  Monitoramento Geográfico
                </div>
                {/* Fake map dots */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/80"
                    style={{ left: `${15 + i * 10}%`, top: `${20 + (i % 3) * 25}%` }}
                  />
                ))}
              </div>

              {/* Bottom bar */}
              <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500">
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>app.areatec.com.br</span>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-green-400" />
                  <span>Sistema operacional</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
