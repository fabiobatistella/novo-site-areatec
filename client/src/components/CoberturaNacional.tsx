/* CoberturaNacional — Seção "Cobertura Nacional"
 * Design: Light cinematographic, azul Areatec #2F6FD0, tiffany #0ABAB5
 * Lista de cidades com bolinhas coloridas indicando serviços ativos
 */

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { MapPin } from "lucide-react";

type ServiceKey = "ocr" | "olho" | "digipare";

interface City {
  name: string;
  state: string;
  services: ServiceKey[];
}

const cities: City[] = [
  { name: "São Paulo", state: "SP", services: ["ocr", "olho", "digipare"] },
  { name: "Guarulhos", state: "SP", services: ["ocr", "olho", "digipare"] },
  { name: "Campinas", state: "SP", services: ["ocr", "olho"] },
  { name: "Sorocaba", state: "SP", services: ["ocr", "olho", "digipare"] },
  { name: "Ribeirão Preto", state: "SP", services: ["olho", "digipare"] },
  { name: "Araras", state: "SP", services: ["ocr", "olho", "digipare"] },
  { name: "Suzano", state: "SP", services: ["olho", "digipare"] },
  { name: "Itatiba", state: "SP", services: ["ocr", "digipare"] },
  { name: "Belo Horizonte", state: "MG", services: ["ocr", "olho", "digipare"] },
  { name: "Ipatinga", state: "MG", services: ["ocr", "olho"] },
  { name: "Cuiabá", state: "MT", services: ["olho", "digipare"] },
  { name: "Cachoeirinha", state: "RS", services: ["olho", "digipare"] },
];

const serviceConfig: Record<ServiceKey, { label: string; color: string; dotClass: string }> = {
  ocr: {
    label: "Veículo OCR",
    color: "bg-blue-600",
    dotClass: "bg-blue-600",
  },
  olho: {
    label: "Olho Vivo",
    color: "bg-[#0ABAB5]",
    dotClass: "bg-[#0ABAB5]",
  },
  digipare: {
    label: "DigiPare",
    color: "bg-amber-500",
    dotClass: "bg-amber-500",
  },
};

// Group cities by state
const groupedByState = cities.reduce<Record<string, City[]>>((acc, city) => {
  if (!acc[city.state]) acc[city.state] = [];
  acc[city.state].push(city);
  return acc;
}, {});

const stateOrder = ["SP", "MG", "MT", "RS"];
const stateNames: Record<string, string> = {
  SP: "São Paulo",
  MG: "Minas Gerais",
  MT: "Mato Grosso",
  RS: "Rio Grande do Sul",
};

export default function CoberturaNacional() {
  const { ref, isVisible } = useInView(0.05);

  return (
    <section
      ref={ref}
      id="cobertura"
      className="py-28 bg-white relative overflow-hidden"
    >
      {/* Subtle map-like background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
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
            Cobertura Nacional
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
                Presença em Todo o Brasil
              </span>
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            De capitais a cidades
            <br />
            <span className="text-[#2F6FD0]">do interior</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            A Areatec opera a infraestrutura de mobilidade e fiscalização em
            municípios de todos os portes — sempre com suporte local e SLA
            garantido.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-14"
        >
          {[
            { value: "200+", label: "Municípios" },
            { value: "4", label: "Estados" },
            { value: "5M+", label: "Placas/mês" },
            { value: "99.9%", label: "SLA Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold text-slate-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-1 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-6 mb-10"
        >
          {(Object.keys(serviceConfig) as ServiceKey[]).map((key) => {
            const svc = serviceConfig[key];
            return (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${svc.dotClass}`} />
                <span className="text-sm text-slate-600 font-medium">
                  {svc.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Cities grid by state */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stateOrder.map((stateCode, stateIdx) => {
            const stateCities = groupedByState[stateCode] || [];
            return (
              <motion.div
                key={stateCode}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + stateIdx * 0.1 }}
                className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* State header */}
                <div className="px-5 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2F6FD0]" />
                    <h3
                      className="text-sm font-bold text-slate-900 tracking-wide"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {stateNames[stateCode]}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono ml-auto">
                      {stateCode}
                    </span>
                  </div>
                </div>

                {/* Cities list */}
                <div className="divide-y divide-slate-50">
                  {stateCities.map((city) => (
                    <div
                      key={city.name}
                      className="px-5 py-3 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                    >
                      <span className="text-sm text-slate-700 font-medium">
                        {city.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {city.services.map((svc) => (
                          <div
                            key={svc}
                            className={`w-2.5 h-2.5 rounded-full ${serviceConfig[svc].dotClass}`}
                            title={serviceConfig[svc].label}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* State footer */}
                <div className="px-5 py-2.5 bg-slate-50/50 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    {stateCities.length} {stateCities.length === 1 ? "município" : "municípios"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-full border border-slate-100">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-slate-500">
              Operação ativa em <strong className="text-slate-700">200+ municípios</strong> com suporte local e SLA garantido
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
