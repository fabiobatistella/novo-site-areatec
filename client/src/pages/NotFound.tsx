import { Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md px-6">
        <div className="text-8xl font-bold text-[#2F6FD0] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          {t("notfound.title")}
        </h1>
        <p className="text-slate-500 mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t("notfound.desc")}
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2F6FD0] text-white font-semibold rounded-xl hover:bg-[#2563C4] transition-colors"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <Home className="w-4 h-4" />
          {t("notfound.cta")}
        </a>
      </div>
    </div>
  );
}
