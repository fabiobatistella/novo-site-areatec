/* ExpansaoGlobal — Seção "Expansão Global"
 * Design: Light cinematographic, azul Areatec #2F6FD0, tiffany #0ABAB5
 * Bandeiras dos países com informações sobre a expansão internacional
 * Exclui Angola e Moçambique (os 2 últimos após Espanha)
 */

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Globe, ArrowRight } from "lucide-react";

interface Country {
  flag: string;
  name: string;
  region: string;
  status: string;
  desc: string;
}

const countries: Country[] = [
  {
    flag: "🇧🇷",
    name: "Brasil",
    region: "América do Sul",
    status: "Operação Ativa",
    desc: "200+ municípios, maior frota OCR do mundo. Base de operações e centro de P&D.",
  },
  {
    flag: "🇵🇹",
    name: "Portugal",
    region: "Europa",
    status: "Em Expansão",
    desc: "Mercado estratégico na Europa. Idioma nativo e regulamentação compatível com o modelo Areatec.",
  },
  {
    flag: "🇦🇷",
    name: "Argentina",
    region: "América do Sul",
    status: "Prospecção",
    desc: "Mercado vizinho com alta demanda por fiscalização digital e estacionamento rotativo.",
  },
  {
    flag: "🇨🇴",
    name: "Colômbia",
    region: "América Latina",
    status: "Prospecção",
    desc: "Cidades em rápida urbanização com necessidade de soluções inteligentes de mobilidade.",
  },
  {
    flag: "🇲🇽",
    name: "México",
    region: "América Latina",
    status: "Prospecção",
    desc: "Maior mercado hispânico. Cidades como CDMX e Guadalajara buscam tecnologia de fiscalização.",
  },
  {
    flag: "🇨🇱",
    name: "Chile",
    region: "América do Sul",
    status: "Prospecção",
    desc: "Mercado maduro em smart city com infraestrutura tecnológica avançada na região.",
  },
  {
    flag: "🇵🇪",
    name: "Peru",
    region: "América do Sul",
    status: "Prospecção",
    desc: "Lima e cidades em crescimento demandam soluções de mobilidade e segurança urbana.",
  },
  {
    flag: "🇪🇸",
    name: "Espanha",
    region: "Europa",
    status: "Em Expansão",
    desc: "Hub europeu estratégico. Regulamentação de trânsito avançada e mercado de smart cities.",
  },
];

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Operação Ativa": { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  "Em Expansão": { bg: "bg-[#0ABAB5]/10", text: "text-[#0ABAB5]", dot: "bg-[#0ABAB5]" },
  "Prospecção": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
};

export default function ExpansaoGlobal() {
  const { ref, isVisible } = useInView(0.05);

  return (
    <section
      ref={ref}
      id="expansao"
      className="py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
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
            Expansão Global
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
                Da Liderança Brasileira à Escala Global
              </span>
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Modelo replicável para
            <br />
            <span className="text-[#2F6FD0]">cidades do mundo</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            O modelo operacional da Areatec — provado em mais de 200 municípios, com a maior frota OCR do mundo — é diretamente replicável em cidades da América Latina e Europa.
          </p>
        </motion.div>

        {/* Flags marquee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 md:gap-6 mb-14 flex-wrap"
        >
          {countries.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl mb-1">{country.flag}</div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {country.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Country cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {countries.map((country, i) => {
            const statusStyle = statusColors[country.status] || statusColors["Prospecção"];
            return (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                className="group bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all duration-300"
              >
                {/* Card header */}
                <div className="px-5 py-4 border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h3
                        className="text-sm font-bold text-slate-900"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {country.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                        {country.region}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-5 py-4">
                  {/* Status badge */}
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusStyle.bg} mb-3`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} ${country.status === "Operação Ativa" ? "animate-pulse" : ""}`} />
                    <span className={`text-[10px] font-semibold tracking-wide uppercase ${statusStyle.text}`}>
                      {country.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {country.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-14 text-center"
        >
          <a
            href="/contato"
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-sm tracking-wide uppercase hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <Globe className="w-4 h-4" />
            Falar Sobre Expansão
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
