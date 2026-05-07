/* CortexSection — Idêntico ao site referência areatec-tech-h9r3bj7r
   Layout: grid 2 colunas — texto à esquerda, DeviceMockup dashboard à direita
   Estilo light com fundo branco, badge tiffany pulsante mantido */

import { useRef, useState, useEffect } from "react";
import {
  Brain,
  ArrowRight,
  Check,
  Camera,
  ScanLine,
  Sparkles,
  FileCheck,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

function useSectionInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── DeviceMockup: CORTEX® AI Engine Dashboard ── */
function CortexDashboard() {
  const metrics = [
    { label: "Modelos Ativos", value: "7", sub: "Deep Learning" },
    { label: "Processamento", value: "2.4M", sub: "frames/dia" },
    { label: "Precisão Média", value: "99.7%", sub: "OCR + Detecção" },
  ];

  const pipeline: { label: string; color: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] = [
    { label: "Captura", color: "#60a5fa", icon: Camera },
    { label: "OCR", color: "#2F6FD0", icon: ScanLine },
    { label: "Análise IA", color: "#a78bfa", icon: Sparkles },
    { label: "Registro", color: "#34d399", icon: FileCheck },
    { label: "Validação", color: "#fbbf24", icon: ShieldCheck },
  ];

  const detections = [
    { type: "Placa", value: "ABC-1D23", conf: "99.8%" },
    { type: "Buraco", value: "Classe 3", conf: "97.2%" },
    { type: "Sinalização", value: "Pare", conf: "98.5%" },
  ];

  const models = [
    { model: "OCR Neural", perf: 99.7, color: "#2F6FD0" },
    { model: "Detecção Buracos", perf: 97.2, color: "#60a5fa" },
    { model: "Sinalização", perf: 98.5, color: "#a78bfa" },
    { model: "Busca Facial", perf: 96.1, color: "#34d399" },
  ];

  return (
    <div className="relative">
      {/* Device frame */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Browser chrome */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded-md px-3 py-1 text-[10px] text-slate-400 border border-slate-200 text-center font-mono">
              cortex.areatec.com.br
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="bg-[#0a0a1a] text-[10px] p-3 space-y-2">
          {/* Dashboard header */}
          <div className="bg-[#111128] border-b border-[#1e1e3a] px-3 py-2 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#2F6FD0] rounded flex items-center justify-center">
                <Brain className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-white text-[11px]">CORTEX® AI Engine</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[8px] text-green-400 font-medium">ONLINE</span>
            </div>
          </div>

          {/* Top metrics */}
          <div className="grid grid-cols-3 gap-2">
            {metrics.map((m) => (
              <div key={m.label} className="bg-[#111128] rounded-lg p-2 border border-[#1e1e3a]">
                <p className="text-[8px] text-[#2F6FD0] font-medium">{m.label}</p>
                <p className="font-bold text-white text-sm mt-0.5">{m.value}</p>
                <p className="text-[7px] text-gray-500">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div className="bg-[#111128] rounded-lg p-2 border border-[#1e1e3a]">
            <p className="text-[9px] font-semibold text-white mb-2">Pipeline de Processamento</p>
            <div className="flex items-center gap-1">
              {pipeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-1 flex-1">
                    <div className="flex flex-col items-center gap-0.5 flex-1">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: step.color + "20" }}
                      >
                        <Icon className="w-3 h-3" style={{ color: step.color }} />
                      </div>
                      <span className="text-[7px] text-gray-400">{step.label}</span>
                    </div>
                    {i < pipeline.length - 1 && (
                      <ChevronRight className="w-2.5 h-2.5 text-gray-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom grid: Detection + Performance */}
          <div className="grid grid-cols-2 gap-2">
            {/* Detection */}
            <div className="bg-[#111128] rounded-lg p-2 border border-[#1e1e3a]">
              <p className="text-[9px] font-semibold text-white mb-1">Detecção em Tempo Real</p>
              <div className="space-y-1">
                {detections.map((d) => (
                  <div key={d.type} className="flex items-center justify-between bg-[#0a0a1a] rounded px-1.5 py-1">
                    <span className="text-[8px] text-gray-400">{d.type}</span>
                    <span className="text-[8px] text-white font-mono">{d.value}</span>
                    <span className="text-[7px] text-green-400">{d.conf}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-[#111128] rounded-lg p-2 border border-[#1e1e3a]">
              <p className="text-[9px] font-semibold text-white mb-1">Performance dos Modelos</p>
              <div className="space-y-1.5">
                {models.map((m) => (
                  <div key={m.model}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[8px] text-gray-400">{m.model}</span>
                      <span className="text-[8px] text-white font-medium">{m.perf}%</span>
                    </div>
                    <div className="h-1 bg-[#1e1e3a] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${m.perf}%`, backgroundColor: m.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-[#2F6FD0]/5 via-transparent to-teal-500/5 rounded-3xl -z-10 blur-xl" />
    </div>
  );
}

/* ── Main Section ── */
export default function CortexSection() {
  const { ref, visible } = useSectionInView(0.1);

  const features = [
    "Leitura OCR de placas com 99.7% de precisão",
    "Detecção e classificação de buracos nas vias",
    "Análise automática de sinalização horizontal e vertical",
    "Busca facial inteligente com conformidade LGPD",
  ];

  return (
    <section id="cortex" className="py-20 lg:py-28" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div
            className="space-y-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Red label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
              <Brain className="w-3.5 h-3.5 text-[#2F6FD0]" />
              <span className="text-xs font-semibold text-[#2F6FD0] uppercase tracking-wider">
                Inteligência Artificial
              </span>
            </div>

            {/* Badge tiffany pulsante */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ABAB5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0ABAB5]" />
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0ABAB5" }}
              >
                Redes Neurais em Tempo Real
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              CORTEX® — O cérebro por trás da tecnologia
            </h2>

            {/* Description */}
            <p className="text-slate-500 leading-relaxed">
              Motor de IA com redes neurais profundas que processa milhões de dados urbanos em tempo real.
              Do reconhecimento de placas à detecção de buracos, o CORTEX® é o diferencial tecnológico da Areatec.
            </p>

            {/* Feature list */}
            <div className="space-y-3">
              {features.map((feat) => (
                <div key={feat} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#2F6FD0]" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#solucoes"
              className="inline-flex items-center gap-2 text-[#2F6FD0] font-medium text-sm hover:gap-3 transition-all"
            >
              Explorar CORTEX®
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right: DeviceMockup Dashboard */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <CortexDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
