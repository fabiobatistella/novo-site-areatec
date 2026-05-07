// BlogSection — Areatec Original (Luminous Tech Noir)
// 3 article cards with placeholder image area (gradient + letter)
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const articles = [
  {
    category: "Inovação",
    date: "15 Mar 2026",
    readTime: "6 min",
    title: "Zeladoria Urbana: Como a IA está transformando a gestão de ativos públicos",
    excerpt: "Descubra como o novo módulo de Zeladoria Urbana do Veículo OCR utiliza inteligência artificial para inventariar sinalização, detectar buracos e monitorar caçambas automaticamente.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455526845/hXvyxPx9ijVFAiJcdwhSdx/blog-zeladoria-urbana-j7oaZhWz8NMYnDo2TnkiFa.webp",
  },
  {
    category: "Tecnologia",
    date: "8 Mar 2026",
    readTime: "4 min",
    title: "GeoTrust: Geolocalização com validade jurídica chega ao mercado brasileiro",
    excerpt: "A Areatec lança o GeoTrust, solução de geolocalização baseada no padrão OSNMA/Galileo europeu que garante validade jurídica às coordenadas registradas.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455526845/hXvyxPx9ijVFAiJcdwhSdx/blog-geotrust-MsmPG5H32h9HbKDyEg5oRo.webp",
  },
  {
    category: "Segurança",
    date: "1 Mar 2026",
    readTime: "5 min",
    title: "AreaChain: Blockchain privada para cadeia de custódia digital",
    excerpt: "Conheça como a blockchain privada da Areatec garante a integridade e rastreabilidade de todas as provas digitais coletadas em campo.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455526845/hXvyxPx9ijVFAiJcdwhSdx/blog-areachain-B9FeHe8TLzPisFfjqsJJBb.webp",
  },
];

export default function BlogSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section
      id="blog"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="absolute bottom-1/3 left-1/6 w-72 h-72 bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative">
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="block text-xs font-semibold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Blog
            </motion.span>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#0ABAB5" }} />
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0ABAB5" }}>
                Conhecimento que Transforma
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Últimas novidades
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="#"
            className="hidden sm:inline-flex items-center gap-2 text-[#2F6FD0] font-semibold hover:text-blue-700 transition-colors group shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, idx) => (
            <motion.a
              key={article.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Article image */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-4 right-4 px-2.5 py-1 text-[9px] font-bold text-white bg-gradient-to-r from-[#2F6FD0] to-blue-600 rounded-full tracking-wider uppercase shadow-sm">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime} de leitura</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-3 group-hover:text-[#2F6FD0] transition-colors" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{article.excerpt}</p>
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F6FD0] group-hover:gap-2.5 transition-all duration-300">
                  Ler artigo <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="sm:hidden text-center mt-8"
        >
          <a href="#" className="inline-flex items-center gap-2 text-[#2F6FD0] font-semibold hover:text-blue-700 transition-colors group">
            Ver todos os artigos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
