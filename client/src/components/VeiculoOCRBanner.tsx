// VeiculoOCRBanner — Areatec Original (Luminous Tech Noir)
// Banner with HB20 realistic photo and feature chips
import { motion } from "framer-motion";
import { Camera, Cpu, MapPin, Wifi, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const HB20_IMAGE = "/manus-storage/keyframe_inicial_3318a362.png";
const features = [
  { icon: Camera, label: "Câmeras OCR de Alta Resolução" },
  { icon: Cpu, label: "Processamento Edge AI" },
  { icon: MapPin, label: "GPS de Alta Precisão" },
  { icon: Wifi, label: "Comunicação em Tempo Real" },
];

interface VeiculoOCRBannerProps {
  onOpenVideo?: () => void;
}

export default function VeiculoOCRBanner({ onOpenVideo }: VeiculoOCRBannerProps) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section
      id="veiculo-detalhes"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.4) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span
              className="block text-xs font-semibold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Veículo OCR
            </span>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-6"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#0ABAB5" }} />
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0ABAB5" }}>
                IA Embarcada em Movimento
              </span>
            </motion.div>
            <h3
              className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 leading-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Tecnologia em movimento
            </h3>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              IA embarcada, câmeras de alta resolução e processamento em tempo real — tudo integrado em um único veículo HB20 equipado com a mais avançada tecnologia de fiscalização.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {features.map((feat, idx) => (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.08 }}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-blue-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 group"
                >
                  <feat.icon className="w-4 h-4 text-[#2F6FD0] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-slate-700 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {feat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-8"
            >
              <button
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2 text-[#2F6FD0] font-semibold hover:text-blue-700 transition-colors group"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Conheça o Veículo OCR
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 to-slate-100/40 rounded-3xl blur-2xl scale-90" />
            <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.10),0_32px_80px_rgba(0,0,0,0.07)] bg-white p-4 lg:p-6">
              <img
                src={HB20_IMAGE}
                alt="Veículo HB20 Areatec em operação OCR em rua brasileira"
                className="w-full h-auto object-cover rounded-xl max-h-[400px]"
              />
              {/* CORTEX badge */}
              <div className="absolute -bottom-3 -left-3 lg:bottom-4 lg:left-4 bg-white rounded-xl px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.10),0_16px_32px_rgba(0,0,0,0.06)] border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2F6FD0] to-blue-700 flex items-center justify-center shadow-sm shadow-blue-600/20">
                    <span className="text-white font-bold text-xs" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>AI</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CORTEX® AI Engine</div>
                    <div className="text-[10px] text-slate-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Processamento em tempo real</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
