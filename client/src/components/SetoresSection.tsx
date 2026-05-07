// SetoresSection — Areatec Original (Luminous Tech Noir)
// Grid of sector cards showing market verticals
import { motion } from "framer-motion";
import { Car, Building2, Truck, Leaf, Scale, Shield, Waves, Zap } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const setores = [
  { icon: Car, title: "Fiscalização de Trânsito", description: "Autuação automatizada e controle de tráfego urbano com OCR de alta precisão." },
  { icon: Building2, title: "Cidades Inteligentes", description: "Gestão integrada de ativos urbanos, zeladoria e segurança pública." },
  { icon: Truck, title: "Logística", description: "Rastreamento e controle de frotas com geolocalização de alta precisão." },
  { icon: Leaf, title: "Agronegócio", description: "Monitoramento de ativos rurais e controle de acesso em propriedades." },
  { icon: Scale, title: "Jurídico e Perícia", description: "Provas digitais com validade jurídica via AreaChain e GeoTrust." },
  { icon: Shield, title: "Seguros UBI", description: "Telemetria veicular para seguros baseados em comportamento de condução." },
  { icon: Waves, title: "Pedágio Free Flow", description: "Cobrança automática sem parada com integração a sistemas de back-office." },
  { icon: Zap, title: "Estacionamento Rotativo", description: "Gestão inteligente de vagas com emissão automatizada de autos de infração." },
];

export default function SetoresSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section
      id="setores"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50/80 overflow-hidden"
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
            Setores
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-6"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#0ABAB5" }} />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0ABAB5" }}>
              Uma Plataforma, Infinitas Aplicações
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {setores.map((setor, idx) => (
            <motion.div
              key={setor.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.07 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <setor.icon className="w-6 h-6 text-[#2F6FD0]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {setor.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{setor.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
