/* NucleoTecnologico — Seção "Núcleo Tecnológico"
 * Design: Light cinematographic, azul Areatec #2F6FD0, tiffany #0ABAB5
 * Painéis de código com syntax highlighting + cards de tecnologia
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  Brain,
  Wifi,
  Target,
  Satellite,
  Link2,
  ChevronRight,
  Terminal,
  Code2,
} from "lucide-react";

const technologies = [
  {
    id: "cortex",
    icon: Brain,
    title: "AreaCORTEX Inteligência Artificial",
    subtitle: "Edge Computing",
    description:
      "Motor de IA proprietário de geolocalização e contexto urbano embarcado nos veículos OCR. Processa posição centimétrica (GPS 4 constelações, ±0.03m) para decisão em tempo real.",
    tags: ["Edge Computing", "Focal Loss AI", "GPS 4 Constelações", "<200ms"],
    language: "TypeScript",
    code: `class CortexEngine {
  private model: NeuralNetwork;
  private gps: GPSReceiver;

  async processFrame(frame: CameraFrame) {
    const plate = await this.model.detect(frame);
    const position = this.gps.getPosition();

    if (plate.confidence > 0.97) {
      return {
        plate: plate.text,
        lat: position.lat,
        lng: position.lng,
        timestamp: Date.now(),
        accuracy: '±0.03m'
      };
    }
  }
}`,
  },
  {
    id: "datarace",
    icon: Wifi,
    title: "DATARACE Protocol",
    subtitle: "TCP/UDP Híbrido",
    description:
      "Protocolo proprietário TCP/UDP híbrido para redes celulares instáveis em ambientes urbanos. Garante sincronização mesmo em zonas de baixo sinal, com retry inteligente e compressão adaptativa.",
    tags: ["TCP/UDP Híbrido", "Retry Inteligente", "Compressão", "99.9% Entrega"],
    language: "TypeScript",
    code: `class DataRaceProtocol {
  private mode: 'tcp' | 'udp' = 'tcp';
  private compressionLevel = 6;
  private signalThreshold = -85;

  async send(payload: Evidence) {
    const signal = this.getSignalStrength();

    if (signal > this.signalThreshold) {
      return this.tcpSend(payload);
    }

    // Fallback UDP com retry
    return this.udpSendWithRetry(
      payload,
      { maxRetries: 5, backoff: 'exp' }
    );
  }
}`,
  },
  {
    id: "focalloss",
    icon: Target,
    title: "Focal Loss AI",
    subtitle: "Detecção de Infrações Raras",
    description:
      "Técnica de Focal Loss para detecção de infrações raras em ambientes com 99% de ruído visual. Redes neurais treinadas com dados reais de operação urbana brasileira.",
    tags: ["Focal Loss", "Neural Network", "PyTorch", "99.7% Precisão"],
    language: "Python",
    code: `class FocalLoss(nn.Module):
    def __init__(self, alpha=0.25, gamma=2.0):
        super().__init__()
        self.alpha = alpha
        self.gamma = gamma

    def forward(self, pred, target):
        bce = F.binary_cross_entropy_with_logits(
            pred, target, reduction='none'
        )
        pt = torch.exp(-bce)
        focal_weight = self.alpha * (1 - pt) ** self.gamma

        return (focal_weight * bce).mean()

# Treinado com 50M+ amostras reais`,
  },
  {
    id: "geotrust",
    icon: Satellite,
    title: "GeoTrust OSNMA",
    subtitle: "Anti-Spoofing",
    description:
      "Sistema de autenticação de posicionamento baseado no protocolo Galileo OSNMA. Garante que coordenadas GPS não foram falsificadas, validando juridicamente a localização de cada infração.",
    tags: ["Galileo OSNMA", "Anti-Spoofing", "Validação Jurídica", "4 Constelações"],
    language: "TypeScript",
    code: `class GeoTrustValidator {
  private osnmaKey: CryptoKey;
  private constellations = ['GPS', 'Galileo',
    'GLONASS', 'BeiDou'];

  async authenticate(signal: GNSSSignal) {
    const auth = await this.osnmaVerify(signal);

    if (!auth.valid) {
      throw new SpoofingDetected(signal);
    }

    return {
      position: auth.position,
      accuracy: auth.accuracy,
      legalValidity: true,
      constellation: auth.source
    };
  }
}`,
  },
  {
    id: "areachain",
    icon: Link2,
    title: "AreaChain",
    subtitle: "Blockchain Evidence",
    description:
      "Cada infração registrada é assinada criptograficamente e ancorada em blockchain, garantindo rastreabilidade e imutabilidade das evidências — válidas juridicamente.",
    tags: ["Blockchain", "AES-256", "Hash SHA-256", "Imutabilidade"],
    language: "TypeScript",
    code: `class AreaChain {
  private chain: Block[] = [];

  async hashEvidence(evidence: Evidence) {
    const payload = JSON.stringify({
      plate: evidence.plate,
      location: evidence.gps,
      timestamp: evidence.timestamp,
      images: evidence.imageHashes
    });

    const hash = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(payload)
    );

    return this.addBlock(hash, evidence);
  }
}`,
  },
];

function CodePanel({ code, language }: { code: string; language: string }) {
  // Simple syntax highlighting
  const highlightCode = (raw: string, lang: string) => {
    const keywords =
      lang === "Python"
        ? ["class", "def", "self", "return", "if", "import", "from", "async", "await", "super", "True", "False", "None"]
        : ["class", "const", "let", "async", "await", "return", "if", "throw", "new", "private", "public", "import", "from", "export"];

    const typeKeywords =
      lang === "Python"
        ? ["nn.Module", "torch", "F", "nn"]
        : ["string", "number", "boolean", "void", "Promise", "CryptoKey"];

    return raw.split("\n").map((line, i) => {
      let highlighted = line
        // Comments
        .replace(/(\/\/.*$)/g, '<span class="text-slate-400 italic">$1</span>')
        .replace(/(#.*$)/g, '<span class="text-slate-400 italic">$1</span>')
        // Strings
        .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="text-emerald-600">$1</span>')
        // Numbers
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-amber-600">$1</span>');

      // Keywords
      keywords.forEach((kw) => {
        const regex = new RegExp(`\\b(${kw})\\b`, "g");
        highlighted = highlighted.replace(
          regex,
          '<span class="text-blue-500 font-semibold">$1</span>'
        );
      });

      // Type keywords
      typeKeywords.forEach((kw) => {
        const escapedKw = kw.replace(/\./g, "\\.");
        const regex = new RegExp(`\\b(${escapedKw})\\b`, "g");
        highlighted = highlighted.replace(
          regex,
          '<span class="text-[#0ABAB5]">$1</span>'
        );
      });

      return (
        <div key={i} className="flex">
          <span className="w-8 text-right pr-3 text-slate-300 select-none text-xs shrink-0">
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-slate-400 ml-2" />
          <span className="text-xs text-slate-400 font-mono">areatec-core</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
          {language}
        </span>
      </div>
      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-[13px] leading-relaxed font-mono text-slate-200">
          {highlightCode(code, language)}
        </pre>
      </div>
    </div>
  );
}

export default function NucleoTecnologico() {
  const { ref, isVisible } = useInView(0.05);
  const [activeTab, setActiveTab] = useState(0);
  const active = technologies[activeTab];

  return (
    <section
      ref={ref}
      id="nucleo-tech"
      className="py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-bold text-[#2F6FD0] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Núcleo Tecnológico
          </span>

          {/* Badge tiffany pulsante */}
          <div className="flex justify-center mt-4 mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ABAB5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0ABAB5]" />
              </span>
              <span
                className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#0ABAB5]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Forjado em Operação Real
              </span>
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Tecnologia que nenhum
            <br />
            <span className="text-[#2F6FD0]">laboratório consegue replicar</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Cada componente tecnológico da Areatec foi forjado em operação real — ruas
            com ruído, redes instáveis, chuva, trânsito e pressão de gestores municipais.
          </p>
        </motion.div>

        {/* Architecture label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-300" />
          <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <Code2 className="w-3.5 h-3.5 text-blue-500" />
            <span
              className="text-[10px] font-bold text-[#2F6FD0] tracking-[0.15em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              CORTEX Inteligência Artificial / Operation Layer
            </span>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-300" />
        </motion.div>

        {/* Tech tabs + Code panel layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left: Tech tabs */}
          <div className="lg:col-span-5 space-y-3">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              const isActive = idx === activeTab;
              return (
                <button
                  key={tech.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "bg-white border-blue-200 shadow-[0_4px_20px_rgba(220,38,38,0.08)]"
                      : "bg-white/50 border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isActive ? "bg-blue-50" : "bg-slate-50"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? "text-[#2F6FD0]" : "text-slate-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`text-sm font-bold transition-colors duration-300 ${
                            isActive ? "text-slate-900" : "text-slate-600"
                          }`}
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          {tech.title}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {tech.subtitle}
                        </span>
                      </div>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="text-xs text-slate-500 mt-1.5 leading-relaxed"
                        >
                          {tech.description}
                        </motion.p>
                      )}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="flex flex-wrap gap-1.5 mt-2.5"
                        >
                          {tech.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[9px] font-semibold bg-slate-100 text-slate-500 rounded-md tracking-wide uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-0.5 transition-all duration-300 ${
                        isActive
                          ? "text-blue-500 rotate-90"
                          : "text-slate-300"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Code panel */}
          <div className="lg:col-span-7">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CodePanel code={active.code} language={active.language} />
            </motion.div>

            {/* Bottom info bar */}
            <div className="mt-4 flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-500 font-mono">
                  Produção — 200+ municípios
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                  Latência &lt;200ms
                </span>
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                  99.7% Precisão
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
