// Footer — Areatec + i18n
import { Mail, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function AreatecLogoSVG({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 316 316" fill="#2F6FD0" xmlns="http://www.w3.org/2000/svg">
      <path d="M 271 0 L 281 2 L 290 6 L 296 10 L 305 19 L 305 20 L 307 22 L 308 25 L 311 29 L 312 34 L 313 35 L 313 38 L 314 39 L 314 44 L 315 45 L 315 271 L 314 272 L 314 277 L 313 278 L 311 286 L 307 293 L 304 296 L 304 297 L 296 305 L 290 309 L 281 313 L 271 315 L 240 315 L 240 97 L 239 96 L 238 90 L 234 85 L 234 84 L 230 80 L 222 76 L 128 75 L 117 72 L 109 67 L 102 60 L 102 59 L 98 54 L 98 52 L 96 48 L 96 45 L 95 44 L 95 31 L 96 30 L 96 27 L 97 26 L 97 24 L 100 18 L 102 16 L 102 14 L 104 13 L 110 7 L 119 2 L 128 0 Z" />
      <path d="M 181 115 L 190 119 L 195 124 L 195 125 L 198 129 L 199 135 L 200 136 L 200 143 L 199 144 L 199 315 L 90 315 L 70 311 L 59 307 L 51 303 L 39 295 L 24 281 L 24 280 L 17 272 L 15 268 L 13 266 L 8 256 L 8 254 L 5 248 L 4 243 L 3 242 L 3 239 L 2 238 L 2 235 L 1 234 L 1 228 L 0 227 L 0 203 L 1 202 L 2 192 L 3 191 L 3 188 L 4 187 L 4 185 L 5 184 L 7 176 L 13 164 L 24 149 L 35 138 L 49 128 L 61 122 L 73 118 L 90 115 Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    [t("footer.solucoes")]: [
      { label: t("solucoes.1.title"), href: "#solucoes" },
      { label: t("solucoes.2.title"), href: "#solucoes" },
      { label: t("solucoes.3.title"), href: "#solucoes" },
      { label: t("solucoes.6.title"), href: "#solucoes" },
    ],
    [t("footer.tecnologias")]: [
      { label: "CORTEX Inteligência Artificial", href: "#cortex" },
      { label: "Olho Vivo", href: "#olho-vivo" },
      { label: "SyncRealTime", href: "#diferenciais" },
      { label: "GeoTrust", href: "#diferenciais" },
      { label: "AreaChain", href: "#diferenciais" },
    ],
    [t("footer.empresa")]: [
      { label: t("footer.sobre"), href: "#sobre" },
      { label: t("footer.blog"), href: "#blog" },
      { label: t("footer.contato"), href: "#contato" },
      { label: t("footer.privacidade"), href: "#" },
      { label: t("footer.termos"), href: "#" },
    ],
  };

  return (
    <footer className="bg-[#21212D] text-white pt-16 pb-8" role="contentinfo">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          <div>
            <a href="#inicio" className="flex items-center gap-2 mb-4">
              <AreatecLogoSVG size={32} />
              <span
                className="text-xl font-semibold tracking-tight text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Areatec
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              {t("footer.desc")}
            </p>
            <div className="space-y-2">
              <a href="mailto:contato@areatec.com.br" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#2F6FD0]" />
                contato@areatec.com.br
              </a>
              <a href="https://app.areatec.com.br" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Globe className="w-4 h-4 text-[#2F6FD0]" />
                app.areatec.com.br
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-sm font-semibold text-white mb-4 tracking-wider uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {category}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{t("footer.privacidade")}</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{t("footer.termos")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
