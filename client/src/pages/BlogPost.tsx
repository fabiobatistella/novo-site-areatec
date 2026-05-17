import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { blogArticles } from "@/data/blog";
import NotFound from "./NotFound";

function formatDate(dateStr: string, lang: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const locale = lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR";
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-2 my-4 pl-4">
          {currentList.map((item, i) => (
            <li key={i} className="text-slate-600 leading-relaxed flex gap-2">
              <span className="text-[#2F6FD0] mt-1.5 shrink-0">&#8226;</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>') }} />
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) { flushList(); return; }
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={`h2-${idx}`} className="text-2xl font-bold text-slate-900 mt-10 mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith("- ")) {
      currentList.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushList();
      elements.push(<p key={`ol-${idx}`} className="text-slate-600 leading-relaxed my-1 pl-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}><span className="text-[#2F6FD0] font-semibold mr-2">{trimmed.match(/^\d+/)?.[0]}.</span><span dangerouslySetInnerHTML={{ __html: trimmed.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>') }} /></p>);
    } else {
      flushList();
      elements.push(<p key={`p-${idx}`} className="text-slate-600 leading-relaxed my-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>') }} />);
    }
  });
  flushList();
  return <>{elements}</>;
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const { lang } = useLanguage();
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  const relatedArticles = blogArticles.filter((a) => a.slug !== slug).filter((a) => a.category === article.category || a.tags.some((t) => article.tags.includes(t))).slice(0, 3);
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": article.title[lang], "description": article.excerpt[lang], "image": `https://www.areatec.com.br${article.image}`, "datePublished": article.date, "author": { "@type": "Person", "name": "Fabio Batistella", "jobTitle": "CEO" }, "publisher": { "@type": "Organization", "name": "Areatec" } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.areatec.com.br/" }, { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.areatec.com.br/blog" }, { "@type": "ListItem", "position": 3, "name": article.title[lang] }] };
  return (
    <>
      <SEOHead title={`${article.title[lang]} | Blog Areatec`} description={article.excerpt[lang]} path={`/blog/${article.slug}`} type="article" image={`https://www.areatec.com.br${article.image}`} jsonLd={[articleSchema, breadcrumbSchema]} />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <section className="relative pt-28 pb-12 bg-gradient-to-b from-slate-900 via-[#21212D] to-slate-800 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-20 right-10 w-96 h-96 bg-[#2F6FD0]/10 rounded-full blur-[120px]" /></div>
            <div className="container relative max-w-3xl mx-auto">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-white/40 mb-8">
                <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/60 truncate max-w-[200px]">{article.title[lang]}</span>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-block px-2.5 py-1 text-[9px] font-bold text-white bg-gradient-to-r from-[#2F6FD0] to-blue-600 rounded-full tracking-wider uppercase shadow-sm mb-4">{article.category}</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{article.title[lang]}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" /><span className="font-medium text-white/70">Fabio Batistella</span></span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(article.date, lang)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
                </div>
              </motion.div>
            </div>
          </section>
          <div className="container max-w-3xl mx-auto -mt-4">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200">
              <img src={article.image} alt={article.title[lang]} className="w-full h-64 sm:h-80 object-cover" loading="eager" />
            </div>
          </div>
          <article className="container max-w-3xl mx-auto py-12 lg:py-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <MarkdownContent content={article.content[lang]} />
            </motion.div>
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (<span key={tag} className="px-3 py-1 text-xs font-medium text-slate-500 bg-slate-100 rounded-full">{tag}</span>))}
              </div>
            </div>
            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2F6FD0] to-blue-700 flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>FB</div>
                <div>
                  <p className="font-bold text-slate-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Fabio Batistella</p>
                  <p className="text-sm text-slate-500 mb-2">CEO, Areatec</p>
                  <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{lang === "en" ? "Over 30 years leading innovation in traffic enforcement technology." : lang === "es" ? "Mas de 30 anos liderando innovacion en tecnologia de fiscalizacion." : "Mais de 30 anos liderando inovacao em tecnologia para fiscalizacao de transito."}</p>
                </div>
              </div>
            </div>
          </article>
          {relatedArticles.length > 0 && (
            <section className="py-16 bg-slate-50 border-t border-slate-100">
              <div className="container max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{lang === "en" ? "Related Articles" : lang === "es" ? "Articulos Relacionados" : "Artigos Relacionados"}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((rel) => (
                    <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                      <div className="h-36 overflow-hidden"><img src={rel.image} alt={rel.title[lang]} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                      <div className="p-4">
                        <p className="text-xs text-slate-400 mb-2">{formatDate(rel.date, lang)}</p>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#2F6FD0] transition-colors line-clamp-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{rel.title[lang]}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
          <div className="container max-w-3xl mx-auto py-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#2F6FD0] font-semibold hover:text-blue-700 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {lang === "en" ? "Back to Blog" : lang === "es" ? "Volver al Blog" : "Voltar ao Blog"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
