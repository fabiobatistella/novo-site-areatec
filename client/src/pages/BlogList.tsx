// BlogList — Areatec Blog listing page with SEO
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { blogArticles } from "@/data/blog";
import { Link } from "wouter";

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog Areatec",
  "description": "Artigos sobre fiscalizacao de transito, estacionamento rotativo, IA embarcada e cidades inteligentes.",
  "url": "https://www.areatec.com.br/blog",
  "publisher": { "@type": "Organization", "name": "Areatec", "url": "https://www.areatec.com.br" },
};

function formatDate(dateStr: string, lang: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const locale = lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR";
  return d.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogList() {
  const { lang } = useLanguage();
  return (
    <>
      <SEOHead
        title={lang === "en" ? "Blog \u2014 Areatec | Traffic Technology & Smart Cities" : lang === "es" ? "Blog \u2014 Areatec | Tecnolog\u00eda de Tr\u00e1nsito y Ciudades Inteligentes" : "Blog \u2014 Areatec | Tecnologia para Tr\u00e2nsito e Cidades Inteligentes"}
        description={lang === "en" ? "Articles about traffic enforcement, rotary parking, embedded AI, and smart cities by Areatec." : lang === "es" ? "Art\u00edculos sobre fiscalizaci\u00f3n de tr\u00e1nsito, estacionamiento rotativo, IA embarcada y ciudades inteligentes por Areatec." : "Artigos sobre fiscaliza\u00e7\u00e3o de tr\u00e2nsito, estacionamento rotativo, IA embarcada e cidades inteligentes pela Areatec."}
        path="/blog"
        jsonLd={blogListSchema}
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <section className="relative pt-28 pb-16 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-800 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-10 w-96 h-96 bg-[#2F6FD0]/10 rounded-full blur-[120px]" />
            </div>
            <div className="container relative">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-2xl mx-auto">
                <span className="inline-block text-xs font-semibold text-[#2F6FD0] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>CORTEX Areatec</span>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Blog</h1>
                <p className="text-lg text-white/60 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {lang === "en" ? "Technical insights on traffic enforcement, embedded AI, and smart city technology." : lang === "es" ? "Perspectivas t\u00e9cnicas sobre fiscalizaci\u00f3n de tr\u00e1nsito, IA embarcada y tecnolog\u00eda de ciudades inteligentes." : "Perspectivas t\u00e9cnicas sobre fiscaliza\u00e7\u00e3o de tr\u00e2nsito, IA embarcada e tecnologia para cidades inteligentes."}
                </p>
              </motion.div>
            </div>
          </section>
          <section className="py-16 lg:py-24 bg-white">
            <div className="container">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogArticles.map((article, idx) => (
                  <motion.div key={article.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.08 }}>
                    <Link href={`/blog/${article.slug}`} className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                      <div className="h-48 relative overflow-hidden bg-slate-100">
                        <img src={article.image} alt={article.title[lang]} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <span className="absolute top-4 right-4 px-2.5 py-1 text-[9px] font-bold text-white bg-gradient-to-r from-[#2F6FD0] to-blue-600 rounded-full tracking-wider uppercase shadow-sm">{article.category}</span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(article.date, lang)}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} {lang === "en" ? "read" : lang === "es" ? "lectura" : "leitura"}</span>
                        </div>
                        <h2 className="text-base font-bold text-slate-900 leading-snug mb-3 group-hover:text-[#2F6FD0] transition-colors line-clamp-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{article.title[lang]}</h2>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">{article.excerpt[lang]}</p>
                        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F6FD0] group-hover:gap-2.5 transition-all duration-300">
                          {lang === "en" ? "Read article" : lang === "es" ? "Leer art\u00edculo" : "Ler artigo"} <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
