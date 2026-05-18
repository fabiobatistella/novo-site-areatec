// HardwareSection — Areatec Original (Luminous Tech Noir)
// Hardware components showcase with specs
import { motion } from "framer-motion";
import { Camera, Cpu, MapPin, Wifi, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const PUMATRONIX_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663455526845/hXvyxPx9ijVFAiJcdwhSdx/camera-ocr-rooftop_6a178888.jpg";

const components = [
  {
    icon: Camera,
    title: "Câmeras OCR de Alta Resolução",
    description: "Processamento CORTEX® AI embarcado — Reconhecimento de placas OCR com precisão de 99.7% em condições adversas.",
    specs: ["4MP Full HD", "IR Night Vision", "IP67 Resistente"],
  },
  {
    icon: Cpu,
    title: "Processamento Local",
    description: "Processamento de IA embarcado no veículo, sem dependência de internet para operação em campo.",
    specs: ["Edge AI", "GPU Embarcada", "Baixa Latência"],
  },
  {
    icon: MapPin,
    title: "GPS de Alta Precisão",
    description: "Geolocalização com validade jurídica usando padrão OSNMA/Galileo europeu.",
    specs: ["±10cm Precisão", "OSNMA/Galileo", "Validade Jurídica"],
  },
  {
    icon: Wifi,
    title: "Comunicação em Tempo Real",
    description: "Protocolo proprietário de comunicação em tempo real para sincronização de dados entre campo e backoffice.",
    specs: ["4G/5G", "SyncRealTime®", "<50ms Latência"],
  },
];

export default function HardwareSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section
      id="hardware"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-blue-500/8 rounded-full blur-[60px] pointer-events-none" />

      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Hardware
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-6"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#0ABAB5" }} />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0ABAB5" }}>
              99.7% de Precisão OCR
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Engenharia de precisão embarcada
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed"
          >
            Cada componente foi selecionado e integrado para operar em condições reais de campo, com máxima precisão e confiabilidade.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Component cards */}
          <div className="space-y-4">
            {components.map((comp, idx) => (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-blue-100 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <comp.icon className="w-5 h-5 text-[#2F6FD0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{comp.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{comp.description}</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {comp.specs.map((spec) => (
                      <span key={spec} className="px-1.5 py-0.5 text-[8px] font-bold text-blue-400 bg-blue-500/10 rounded tracking-wider uppercase">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="pt-2"
            >
              <a
                href="/contato"
                className="group inline-flex items-center gap-2 text-[#2F6FD0] font-semibold hover:text-blue-700 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Ver especificações completas
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right: Camera image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1),0_32px_64px_rgba(0,0,0,0.06)]">
              <img
                src={PUMATRONIX_IMAGE}
                alt="Câmera OCR Pumatronix montada no teto do veículo Areatec para leitura automática de placas em operação urbana"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent" />
              {/* Overlay badge */}
              <div className="absolute top-5 right-5 px-2 py-0.5 text-[9px] font-bold text-white bg-gradient-to-r from-[#2F6FD0] to-blue-600 rounded-full tracking-wider uppercase">
                Câmera OCR em Operação
              </div>
            </div>
            {/* Floating spec card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08),0_16px_32px_rgba(0,0,0,0.06)] border border-slate-100">
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Camera className="w-4 h-4 text-[#2F6FD0]" />
                <div>
                  <div className="text-xs font-bold text-slate-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Detecção em Tempo Real</div>
                  <div className="text-[10px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>99.7% precisão</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
